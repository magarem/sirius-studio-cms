import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { readFileSync } from 'fs';
import { resolve } from 'path';
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
  const nodesFilePath = resolve(process.cwd(), "server", "data", "nodes.json");
  try {
    const data = JSON.parse(readFileSync(nodesFilePath, "utf-8"));
    console.log("data>>>", data);
    return data;
  } catch (error) {
    console.error("Erro ao carregar nodes.json:", error.message);
    return { success: false, error: error.message };
  }
});

export { nodes as default };
//# sourceMappingURL=nodes.mjs.map
