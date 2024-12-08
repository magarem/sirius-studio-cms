import sqlite3 from "sqlite3";
import path from "path";

export default defineEventHandler(async (event) => {
  // Obter o _id da entrada
  const query = getQuery(event);
  const { _id } = query;

  if (!_id) {
    throw createError({
      statusCode: 400,
      statusMessage: "O parâmetro _id é obrigatório.",
    });
  }

  // Caminho para o banco de dados SQLite
  const dbPath = path.resolve("server/data/database.db");

  // Função para buscar o registro no banco
  const getRecordById = (db, id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM content WHERE _id = ?`; // Substitua 'records' pelo nome da sua tabela
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
    // Conectar ao banco de dados
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        throw createError({
          statusCode: 500,
          statusMessage: `Erro ao conectar ao banco de dados: ${err.message}`,
        });
      }
    });

    // Buscar o registro pelo _id
    const record = await getRecordById(db, _id);

    // Fechar o banco de dados
    db.close();

    if (!record) {
      throw createError({
        statusCode: 404,
        statusMessage: `Nenhum registro encontrado com _id: ${_id}.`,
      });
    }

    // Retornar o registro encontrado
    return { data: record };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao processar a solicitação: ${error.message}`,
    });
  }
});
