import { d as defineEventHandler, g as getQuery, c as createError } from '../../nitro/nitro.mjs';
import sqlite3 from 'sqlite3';
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
