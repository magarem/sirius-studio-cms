import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { readFileSync } from 'fs';
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

const nodes = defineEventHandler(() => {
  const filePath = path.resolve("server/data/nodes.json");
  const nodes = JSON.parse(readFileSync(filePath, "utf-8"));
  return nodes;
});

export { nodes as default };
//# sourceMappingURL=nodes.mjs.map
