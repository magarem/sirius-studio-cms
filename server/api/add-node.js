import { readFile, writeFile } from 'fs/promises';
import path from 'path';



export default defineEventHandler(async (event) => {
  // Extrai o `_path` do nó pai e os dados do novo nó do corpo da requisição
  const { parentPath, newNode } = await readBody(event);

  if (!parentPath || !newNode) {
    return { error: "Os parâmetros `parentPath` e `newNode` são necessários." };
  }

  const filePath = path.resolve('server/data/nodes.json');

  try {
    // Carrega e parseia o conteúdo do arquivo JSON
    const fileContent = await readFile(filePath, 'utf8');
    const nodes = JSON.parse(fileContent);

    console.log('nodes:', nodes);
    // Função recursiva para buscar o nó pelo campo `_path`
    
    function findNodeByPath(node, targetPath) {
        // Verifica se o _path do nó atual é o que estamos procurando
        if (node._path === targetPath) {
          return node;
        }
      
        // Se o nó possui filhos, percorre recursivamente
        if (node.children && node.children.length > 0) {
          for (let child of node.children) {
            const found = findNodeByPath(child, targetPath);
            if (found) return found;
          }
        }
      
        // Retorna null se não encontrar o nó
        return null;
      }
      
    console.log('---');
    // Busca o nó pai pelo `parentPath` fornecido
    const parentNode = findNodeByPath(nodes, parentPath);
    console.log('parentNode:', parentNode);
    if (!parentNode) {
      return { error: `Nó pai com _path "${parentPath}" não encontrado.` };
    }

    // Adiciona o novo nó aos filhos do nó pai
    if (!parentNode.children) {
      parentNode.children = []; // Garante que o campo `children` exista
    }
    parentNode.children.push(newNode);

    // Salva o arquivo JSON atualizado
    await writeFile(filePath, JSON.stringify(nodes, null, 2), 'utf8');

    // Retorna uma resposta de sucesso
    return { message: "Nó adicionado com sucesso.", node: newNode };
  } catch (error) {
    console.error("Erro ao acessar o arquivo JSON:", error);
    return { error: "Erro ao acessar os dados." };
  }
});
