import { d as defineEventHandler, g as getQuery, c as createError } from '../../nitro/nitro.mjs';
import Database from 'better-sqlite3';
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

const getPage = defineEventHandler((event) => {
  const query = getQuery(event);
  const db = new Database("server/data/database.db", { readonly: true });
  const page = db.prepare("SELECT * FROM content WHERE _id = ?").get(query.path.split("/")[1]);
  console.log("page", page);
  if (!page) {
    throw createError({ statusCode: 404, message: "P\xE1gina n\xE3o encontrada no banco de dados" });
  }
  return page;
});

export { getPage as default };
//# sourceMappingURL=getPage.mjs.map
