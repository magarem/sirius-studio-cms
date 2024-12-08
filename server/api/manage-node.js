import { defineEventHandler, readBody } from 'h3';
import { promises as fs } from 'fs';
import { join } from 'path';
import { generateSlug } from '~/utils/helpers';

const filePath = join(process.cwd(), 'public', 'data', 'nodes.json'); // Caminho para o arquivo JSON


const sqliteDataSave = async (data) => {

    console.log('sqliteDataSave:', data);
    try {
        const response = await $fetch('/api/upsert-sqlite', {
            method: 'POST',
            body: data
        });
        return response;
    } catch (error) {
        console.error('Erro ao chamar a segunda API:', error);
        throw new Error('Erro ao processar a requisição');
    }
};


/**
 * Lê o conteúdo do arquivo JSON ou retorna um objeto padrão se o arquivo não existir.
 */
const readJsonFile = async () => {
    try {
        const rawData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return { _id: '0', _path: '/', _type: 'folder', label: 'content', children: [] };
        }
        throw error;
    }
};



/**
 * Escreve os dados no arquivo JSON.
 * @param {Object} data - Dados a serem salvos no arquivo JSON.
 */
const writeJsonFile = async (data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

/**
 * Atualiza ou adiciona um nó recursivamente.
 * Atualiza o `_path` do nó com base no `_path` do pai e no `label` do nó.
 * @param {Object} parentNode - Nó atual sendo processado.
 * @param {String} parentId - ID do nó pai onde o novo nó será adicionado.
 * @param {Object} newNode - O nó a ser adicionado ou atualizado.
 * @returns {Boolean} - Retorna `true` se o nó foi adicionado ou atualizado.
 */
const addOrUpdateNodeRecursively = (parentNode, parentId, newNode) => {
    if (parentNode._id === parentId) {
        if (!parentNode.children) {
            parentNode.children = [];
        }

        // Atualiza o _path do novo nó
        const computedPath = `${parentNode._path.replace(/\/$/, '')}/${generateSlug(newNode.label)}`.replace(/\/+/g, '/');
        newNode._path = computedPath;

        // Verifica se o nó já existe entre os filhos
        const index = parentNode.children.findIndex((child) => child._id === newNode._id);
        if (index !== -1) {
            // Atualiza o nó existente
            parentNode.children[index] = { ...parentNode.children[index], ...newNode };
        } else {
            // Adiciona o novo nó como filho
            parentNode.children.push(newNode);
        }
        return true;
    }

    // Percorre os filhos recursivamente
    for (const child of parentNode.children) {
        if (addOrUpdateNodeRecursively(child, parentId, newNode)) {
            return true;
        }
    }

    return false; // Nó pai não encontrado neste ramo
};

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { action, parentId, node } = body;

    if (!action) {
        return { status: 400, message: 'Ação é necessária (list, add, update).' };
    }

    try {
        const jsonData = await readJsonFile();

        switch (action) {
            case 'list': {
                // Retorna a estrutura completa de nós
                return { status: 200, nodes: jsonData };
            }
            
            case 'get': {
                // Retorna a estrutura completa de nós
                return { status: 200, nodes: jsonData };
            }

            case 'add':
            case 'update': {
                if (!parentId || !node || !node._id || !node.label) {
                    return { status: 400, message: 'Parâmetros inválidos. "parentId", "node._id" e "node.label" são obrigatórios.' };
                }

                // Atualiza ou adiciona o nó
                const updated = addOrUpdateNodeRecursively(jsonData, parentId, node);

                if (!updated) {
                    return { status: 404, message: 'Nó pai não encontrado.' };
                }

                // Salva as alterações no arquivo JSON
                await writeJsonFile(jsonData);

                const secondApiResponse = await sqliteDataSave(node);

                return { status: 200, message: 'Nó adicionado/atualizado com sucesso.' };
            }

            default:
                return { status: 400, message: 'Ação inválida. Use "list", "add", ou "update".' };
        }
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return { status: 500, message: 'Erro interno no servidor.' };
    }
});
