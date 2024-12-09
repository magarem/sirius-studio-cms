import { defineEventHandler, createError } from 'file:///home/maga/dev/sirius-studio-cms/node_modules/h3/dist/index.mjs';
import { readFile } from 'fs/promises';
import { join } from 'path';

const ____path_ = defineEventHandler(async (event) => {
  const { path } = event.context.params;
  console.log("path:::", path);
  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "O par\xE2metro 'path' \xE9 obrigat\xF3rio."
    });
  }
  const filePath = join(process.cwd(), "server/data/nodes.json");
  const tree = JSON.parse(await readFile(filePath, "utf-8"));
  function findNodeByPath(node2, targetPath) {
    const currentPath = "/" + targetPath;
    if (node2._path === currentPath) {
      return node2;
    }
    if (node2.children) {
      for (const child of node2.children) {
        const result = findNodeByPath(child, targetPath);
        if (result) return result;
      }
    }
    return null;
  }
  const node = findNodeByPath(tree, path);
  if (!node) {
    throw createError({
      statusCode: 404,
      statusMessage: `Nenhum n\xF3 encontrado para o path`
    });
  }
  return node;
});

export { ____path_ as default };
//# sourceMappingURL=_...path_.mjs.map
