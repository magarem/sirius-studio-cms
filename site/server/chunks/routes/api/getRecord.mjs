import { defineEventHandler, getQuery, createError } from 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import sqlite3 from 'file:///home/maga/dev/sirius5/node_modules/sqlite3/lib/sqlite3.js';
import path from 'path';

const getRecord = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { _id } = query;
  if (!_id) {
    throw createError({
      statusCode: 400,
      statusMessage: "O par\xE2metro _id \xE9 obrigat\xF3rio."
    });
  }
  const dbPath = path.resolve("server/data/database.db");
  const getRecordById = (db, id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM content WHERE _id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };
  try {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        throw createError({
          statusCode: 500,
          statusMessage: `Erro ao conectar ao banco de dados: ${err.message}`
        });
      }
    });
    const record = await getRecordById(db, _id);
    db.close();
    if (!record) {
      throw createError({
        statusCode: 404,
        statusMessage: `Nenhum registro encontrado com _id: ${_id}.`
      });
    }
    return { data: record };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao processar a solicita\xE7\xE3o: ${error.message}`
    });
  }
});

export { getRecord as default };
//# sourceMappingURL=getRecord.mjs.map
