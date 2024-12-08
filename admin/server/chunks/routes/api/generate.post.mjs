import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { exec } from 'child_process';
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

const generate_post = defineEventHandler(async (event) => {
  const projectDir = path.resolve("/home/maga/dev/sirius5");
  const generateSite = () => {
    return new Promise((resolve, reject) => {
      exec("npm run generate", { cwd: projectDir }, (error, stdout, stderr) => {
        if (error) {
          reject(stderr || stdout);
        } else {
          resolve(stdout);
        }
      });
    });
  };
  try {
    console.log("Iniciando a gera\xE7\xE3o do site...");
    const output = await generateSite();
    console.log("Site gerado com sucesso!");
    return { success: true, message: "Site gerado com sucesso!", output };
  } catch (error) {
    console.error("Erro ao gerar o site:", error);
    throw createError({
      statusCode: 500,
      message: `Erro ao gerar o site: ${error}`
    });
  }
});

export { generate_post as default };
//# sourceMappingURL=generate.post.mjs.map
