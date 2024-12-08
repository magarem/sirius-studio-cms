import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
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

const saveNodes_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { nodes } = body;
    if (!nodes) {
      throw new Error("Nenhum dado fornecido");
    }
    const filePath = path.resolve("server/data/nodes.json");
    await promises.writeFile(filePath, JSON.stringify(nodes, null, 2), "utf-8");
    return { status: 200, message: "\xC1rvore salva com sucesso!" };
  } catch (error) {
    console.error("Erro ao salvar a \xE1rvore:", error);
    return { status: 500, message: "Erro interno do servidor" };
  }
});

export { saveNodes_post as default };
//# sourceMappingURL=save-nodes.post.mjs.map
