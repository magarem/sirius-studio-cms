import { defineEventHandler, readBody } from 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import sqlite3 from 'file:///home/maga/dev/sirius5/node_modules/sqlite3/lib/sqlite3.js';
import { join } from 'path';

const dbPath = join(process.cwd(), "data", "nodes_contents.db");
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
const getRecord = (_id) => {
  if (!_id) {
    return { status: 400, message: "Missing _id parameter." };
  }
  const db = new sqlite3.Database(dbPath);
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT content FROM content WHERE _id = ?",
      [_id],
      (err, row) => {
        db.close();
        if (err) {
          reject({ status: 500, message: "Error fetching content." });
        } else if (row) {
          resolve({ status: 200, content: row.content });
        } else {
          resolve({ status: 404, message: "Content not found." });
        }
      }
    );
  });
};
const manageSqlite = defineEventHandler(async (event) => {
  const { action, _id, _type, label, content } = await readBody(event);
  initializeDatabase();
  new sqlite3.Database(dbPath);
  try {
    if (action === "get") {
      const ret = await getRecord(_id);
      return ret;
    }
    if (action === "save") {
      await upsertContent(_id, _type, label, content);
      return { status: 200, message: "Conte\xFAdo salvo com sucesso." };
    }
  } catch (error) {
    console.error("Erro ao processar a requisi\xE7\xE3o:", error);
    return { status: 500, message: "Erro interno ao processar o conte\xFAdo." };
  }
});

export { manageSqlite as default };
//# sourceMappingURL=manage-sqlite.mjs.map
