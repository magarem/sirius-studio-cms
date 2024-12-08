import { defineEventHandler, getQuery, createError } from 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import Database from 'file:///home/maga/dev/sirius5/node_modules/better-sqlite3/lib/index.js';

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
