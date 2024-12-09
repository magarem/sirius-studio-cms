import { defineEventHandler, getQuery } from 'file:///home/maga/dev/sirius-studio-cms/node_modules/h3/dist/index.mjs';
import { readFile } from 'fs/promises';
import { join } from 'path';

const getNodeByPath = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const path = query.path;
  const nodes = JSON.parse(await readFile(join(process.cwd(), "server/data/nodes.json"), "utf-8"));
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

export { getNodeByPath as default };
//# sourceMappingURL=getNodeByPath.mjs.map
