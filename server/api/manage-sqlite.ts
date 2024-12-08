import { defineEventHandler, readBody } from "h3";
import sqlite3 from "sqlite3";
import { join } from "path";

const dbPath = join(process.cwd(), "data", "nodes_contents.db");

/**
 * Inicializa o banco de dados e cria a tabela `content` se ela não existir.
 */
const initializeDatabase = (): void => {
  const db = new sqlite3.Database(dbPath);
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS content (
        _id TEXT PRIMARY KEY,
        _type TEXT NOT NULL, 
        label TEXT NOT NULL,
        content TEXT NOT NULL
      )`,
    );
  });
  db.close();
};

/**
 * Insere ou atualiza os dados na tabela `content`.
 * @param _id - O identificador único.
 * @param _type - O tipo de conteúdo.
 * @param label - O label a ser armazenado.
 * @param content - O conteúdo a ser armazenado.
 */
const upsertContent = (
  _id: string,
  _type: string,
  label: string,
  content: string,
): Promise<void> => {
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

const getRecord = (_id: string) => {
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
      },
    );
  });
};

export default defineEventHandler(async (event) => {
  const { action, _id, _type, label, content } = await readBody(event);

  initializeDatabase(); // Certifica-se de que o banco de dados e a tabela existem
  const db = new sqlite3.Database(dbPath);
  try {
    if (action === "get") {
      const ret = await getRecord(_id);
      return ret
    }

    if (action === "save") {
      await upsertContent(_id, _type, label, content); // Insere ou atualiza o registro
      return { status: 200, message: "Conteúdo salvo com sucesso." };
    }
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return { status: 500, message: "Erro interno ao processar o conteúdo." };
  }
});
