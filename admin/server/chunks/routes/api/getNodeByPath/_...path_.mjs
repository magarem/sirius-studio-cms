import { d as defineEventHandler, c as createError } from '../../../nitro/nitro.mjs';
import { readFile } from 'fs/promises';
import { join } from 'path';
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
