import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import sqlite3 from 'sqlite3';

// Diretório e arquivos a serem criados
const dataDir = join(process.cwd(), 'server', 'data');
const nodesFile = join(dataDir, 'nodes.json');
const databaseFile = join(dataDir, 'database.db');

// Conteúdo inicial para nodes.json
const initialNodes = {
  _id: "0",
  _path: "/",
  _type: "folder",
  _slug: "content",
  label: "content",
  children: [{
    _id: "home",
    _path: "/home",
    _type: "page",
    label: "Home",
    content: "Bem vindo"
  }]
};

// Registro inicial para o banco de dados
const initialRecord = [{
  _id: "0",
  _type: "folder",
  _slug: "content",
  label: "Content",
  content: ""
},
{
  _id: "home",
  _type: "page",
  _slug: "home",
  label: "Home",
  content: "Bem vindo!"
}]


// Função para criar o diretório, se não existir
function ensureDirectoryExistence(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
    console.log(`Diretório criado: ${dirPath}`);
  }
}

// Função para criar nodes.json
function createNodesFile() {
  writeFileSync(nodesFile, JSON.stringify(initialNodes, null, 2));
  console.log(`Arquivo criado: ${nodesFile}`);
}

// Função para criar e inicializar o banco de dados SQLite
function createDatabase() {
  const db = new sqlite3.Database(databaseFile, (err) => {
    if (err) {
      console.error("Erro ao criar o banco de dados:", err.message);
      return;
    }
    console.log(`Banco de dados criado: ${databaseFile}`);
  });

  db.serialize(() => {
    // Criação da tabela
    db.run(
      `CREATE TABLE IF NOT EXISTS content (
        _id TEXT PRIMARY KEY,
        _type TEXT,
        label TEXT,
        content TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Erro ao criar a tabela:", err.message);
          return;
        }
        console.log("Tabela 'content' criada.");
      }
    );

    // Inserção do registro inicial
    const insertStmt = db.prepare(
      `INSERT INTO content (_id, _type, label, content) VALUES (?, ?, ?, ?)`
    );
    insertStmt.run(
      initialRecord[0]._id,
      initialRecord[0]._type,
      initialRecord[0].label,
      initialRecord[0].content,
      (err) => {
        if (err) {
          console.error("Erro ao inserir o registro inicial:", err.message);
        } else {
          console.log("Registro inicial inserido.");
        }
      }
    );

    insertStmt.run(
      initialRecord[1]._id,
      initialRecord[1]._type,
      initialRecord[1].label,
      initialRecord[1].content,
      (err) => {
        if (err) {
          console.error("Erro ao inserir o registro inicial:", err.message);
        } else {
          console.log("Registro inicial inserido.");
        }
      }
    );

    insertStmt.finalize();
  });

  db.close((err) => {
    if (err) {
      console.error("Erro ao fechar o banco de dados:", err.message);
    } else {
      console.log("Banco de dados fechado.");
    }
  });
}

// Execução do script
ensureDirectoryExistence(dataDir);
createNodesFile();
createDatabase();
