import { readFile } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const { path } = event.context.params; // Captura o parâmetro dinâmico como array
   
  
    // const fullPath = '/' + path.join('/'); 
    console.log('path:::', path);
    if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "O parâmetro 'path' é obrigatório.",
    });
  }

  // Lê o arquivo JSON contendo a árvore
  const filePath = join(process.cwd(), 'server/data/nodes.json');
  const tree = JSON.parse(await readFile(filePath, 'utf-8'));

  // Função recursiva para encontrar o nó pelo _path
  function findNodeByPath(node, targetPath) {
    const currentPath = '/' + targetPath; // Reconstrói o path
    if (node._path === currentPath) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const result = findNodeByPath(child, targetPath);
        if (result) return result;
      }
    }
    return null;
  }

  // Busca o nó correspondente ao _path
  const node = findNodeByPath(tree, path);

  if (!node) {
    throw createError({
      statusCode: 404,
      statusMessage: `Nenhum nó encontrado para o path`,
    });
  }

  return node;
});
