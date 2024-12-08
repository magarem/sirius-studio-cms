import { d as defineEventHandler, g as getQuery, c as createError } from '../../nitro/nitro.mjs';
import { promises } from 'fs';
import path from 'path';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

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
const getNode = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { _id } = query;
  if (!_id) {
    throw createError({
      statusCode: 400,
      statusMessage: "O par\xE2metro _id \xE9 obrigat\xF3rio."
    });
  }
  try {
    const filePath = path.resolve("server/data/nodes.json");
    const fileData = await promises.readFile(filePath, "utf-8");
    const rootNode = JSON.parse(fileData);
    const node = findNodeById(rootNode, _id);
    if (!node) {
      throw createError({
        statusCode: 404,
        statusMessage: `Nenhum n\xF3 encontrado com _id: ${_id}.`
      });
    }
    return { node };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao processar a solicita\xE7\xE3o: ${error.message}`
    });
  }
});

export { getNode as default };
//# sourceMappingURL=getNode.mjs.map
