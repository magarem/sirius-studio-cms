import { promises as fs } from 'fs';
import path from 'path';

// Função recursiva para encontrar o nó pelo _id
function findNodeById(node, id) {
  if (node._id === id) {
    return node;
  }
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export default defineEventHandler(async (event) => {
  // Obter o _id da entrada
  const query = getQuery(event);
  const { _id } = query;

  if (!_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'O parâmetro _id é obrigatório.',
    });
  }

  try {
    // Caminho para o arquivo nodes.json
    const filePath = path.resolve('server/data/nodes.json');
    
    // Ler e parsear o arquivo JSON
    const fileData = await fs.readFile(filePath, 'utf-8');
    const rootNode = JSON.parse(fileData);

    // Buscar o nó correspondente ao _id
    const node = findNodeById(rootNode, _id);

    if (!node) {
      throw createError({
        statusCode: 404,
        statusMessage: `Nenhum nó encontrado com _id: ${_id}.`,
      });
    }

    // Retornar o nó encontrado
    return { node };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao processar a solicitação: ${error.message}`,
    });
  }
});
