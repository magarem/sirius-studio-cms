import { readFile } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const path = query.path;

  // Carrega a árvore de nós
  const nodes = JSON.parse(await readFile(join(process.cwd(), 'server/data/nodes.json'), 'utf-8'));

  // Função recursiva para buscar o nó
  function findNodeByPath(node, targetPath) {
    if (node._path === targetPath) return node;
    if (node.children) {
      for (const child of node.children) {
        const result = findNodeByPath(child, targetPath);
        if (result) return result;
      }
    }
    return null;
  }

  return findNodeByPath(nodes, path) || {};
});
