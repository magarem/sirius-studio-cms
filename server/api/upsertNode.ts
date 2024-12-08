import { defineEventHandler, readBody } from 'h3'
import fs from 'fs/promises'
import path from 'path'
import sqlite3 from 'sqlite3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validação do corpo
  if (!body._id || !body.label || !body._type) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Campos obrigatórios faltando no objeto.',
    })
  }

  const { parentId } = body // Parent ID fornecido no formulário
  const jsonFilePath = path.resolve('server/data/nodes.json')
  const dbFilePath = path.resolve('server/data/database.db')

  try {
    // 1. Carregar o JSON existente
    let jsonData: any
    try {
      const fileContent = await fs.readFile(jsonFilePath, 'utf-8')
      jsonData = JSON.parse(fileContent)
    } catch (err) {
      console.warn('Arquivo não encontrado ou inválido, criando um novo objeto.')
      jsonData = {
        _id: '0',
        _path: '/',
        _type: 'folder',
        label: 'content',
        children: [],
      }
    }

    // 2. Função para encontrar e atualizar ou adicionar o nó
    const updateOrAddNode = (parentNode: any, newNode: any, nodeId: string | null) => {
      // Se `parentId` não for fornecido, atualiza pelo `_id` diretamente
      if (!nodeId) {
        // Atualiza o próprio nó, se for o nó correspondente
        if (parentNode._id === newNode._id) {
          parentNode.label = newNode.label
          parentNode._path = newNode._path
          parentNode._slug = newNode._slug
          parentNode._type = newNode._type
          parentNode._image = newNode._image
          parentNode.content = newNode.content || ''
          parentNode.children = newNode.children || []
          return true
        }

        // Procura recursivamente pelos filhos
        for (const child of parentNode.children) {
          if (updateOrAddNode(child, newNode, null)) {
            return true
          }
        }

        return false // Nó não encontrado
      }

      // Adiciona ou atualiza como filho do nó pai fornecido
      if (parentNode._id === nodeId) {
        const index = parentNode.children.findIndex((child: any) => child._id === newNode._id)

        if (index !== -1) {
          // Atualiza o nó existente
          parentNode.children[index] = newNode
        } else {
          // Adiciona o novo nó como filho
          parentNode.children.push(newNode)
        }
        return true
      }

      // Procura o pai na hierarquia recursivamente
      for (const child of parentNode.children) {
        if (updateOrAddNode(child, newNode, nodeId)) {
          return true
        }
      }

      return false // Nó pai não encontrado
    }

    // 3. Executar a lógica de upsert
    const nodeProcessed = updateOrAddNode(jsonData, {
      _id: body._id,
      label: body.label,
      _slug: body._slug,
      _path: body._path,
      _type: body._type,
      _image: body._image,
      content: body.content || '',
      children: body.children || [],
    }, parentId)

    if (!nodeProcessed) {
      throw createError({
        statusCode: 400,
        statusMessage: parentId
          ? 'Parent ID não encontrado na hierarquia.'
          : '_id não encontrado na hierarquia.',
      })
    }

    // 4. Salvar o JSON atualizado
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8')

    // 5. Upsert no banco SQLite
    const db = new sqlite3.Database(dbFilePath)

    // Criar tabela se não existir
    await new Promise((resolve, reject) => {
      db.run(
        `
        CREATE TABLE IF NOT EXISTS content (
          _id TEXT PRIMARY KEY,
          _type TEXT,
          label TEXT,
          content TEXT
        )
        `,
        (err) => (err ? reject(err) : resolve(true))
      )
    })

    // Inserir ou atualizar o nó no SQLite
    await new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO content (_id, _type, label, content)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(_id) DO UPDATE SET
          _type = excluded._type,
          label = excluded.label,
          content = excluded.content
        `,
        [body._id, body._type, body.label, body.content || ''],
        (err) => (err ? reject(err) : resolve(true))
      )
    })

    db.close()

    return {
      status: 'success',
      message: 'Nó adicionado ou atualizado com sucesso no JSON e SQLite!',
    }
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro durante o processamento: ' + err.message,
    })
  }
})
