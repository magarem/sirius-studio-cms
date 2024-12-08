import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import sqlite3 from 'sqlite3';
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

const dbPath = join(process.cwd(), "public", "data", "nodes_contents.db");
const initializeDatabase = () => {
  const db = new sqlite3.Database(dbPath);
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS content (
        _id TEXT PRIMARY KEY,
        _type TEXT NOT NULL, 
        label TEXT NOT NULL,
        content TEXT NOT NULL
      )`
    );
  });
  db.close();
};
const upsertContent = (_id, _type, label, content) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    const query = `
      INSERT INTO content (_id, _type, label, content)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(_id) DO UPDATE SET
        _type = excluded._type,
        label = excluded.label,
        content = excluded.content
    `;
    db.run(query, [_id, _type, label, content], (err) => {
      db.close();
      if (err) return reject(err);
      resolve();
    });
  });
};
const upsertSqlite = defineEventHandler(async (event) => {
  const { _id, _type, label, content } = await readBody(event);
  console.log(_id, _type, label, content);
  if (!_id || !_type || content === void 0) {
    return { status: 400, message: 'Par\xE2metros inv\xE1lidos. "_id", "_type" e "content" s\xE3o obrigat\xF3rios.' };
  }
  try {
    initializeDatabase();
    await upsertContent(_id, _type, label, content);
    return { status: 200, message: "Conte\xFAdo salvo com sucesso." };
  } catch (error) {
    console.error("Erro ao processar a requisi\xE7\xE3o:", error);
    return { status: 500, message: "Erro interno ao processar o conte\xFAdo." };
  }
});

export { upsertSqlite as default };
//# sourceMappingURL=upsert-sqlite.mjs.map
