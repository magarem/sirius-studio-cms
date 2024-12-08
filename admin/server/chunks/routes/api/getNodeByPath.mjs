import { d as defineEventHandler, g as getQuery } from '../../nitro/nitro.mjs';
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
