import { defineEventHandler, readBody, createError } from 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import fs from 'fs/promises';
import path from 'path';
import sqlite3 from 'file:///home/maga/dev/sirius5/node_modules/sqlite3/lib/sqlite3.js';

const upsertNode = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body._id || !body.label || !body._type) {
    throw createError({
      statusCode: 400,
      statusMessage: "Campos obrigat\xF3rios faltando no objeto."
    });
  }
  const { parentId } = body;
  const jsonFilePath = path.resolve("server/data/nodes.json");
  const dbFilePath = path.resolve("server/data/database.db");
  try {
    let jsonData;
    try {
      const fileContent = await fs.readFile(jsonFilePath, "utf-8");
      jsonData = JSON.parse(fileContent);
    } catch (err) {
      console.warn("Arquivo n\xE3o encontrado ou inv\xE1lido, criando um novo objeto.");
      jsonData = {
        _id: "0",
        _path: "/",
        _type: "folder",
        label: "content",
        children: []
      };
    }
    const updateOrAddNode = (parentNode, newNode, nodeId) => {
      if (!nodeId) {
        if (parentNode._id === newNode._id) {
          parentNode.label = newNode.label;
          parentNode._path = newNode._path;
          parentNode._slug = newNode._slug;
          parentNode._type = newNode._type;
          parentNode._image = newNode._image;
          parentNode.content = newNode.content || "";
          parentNode.children = newNode.children || [];
          return true;
        }
        for (const child of parentNode.children) {
          if (updateOrAddNode(child, newNode, null)) {
            return true;
          }
        }
        return false;
      }
      if (parentNode._id === nodeId) {
        const index = parentNode.children.findIndex((child) => child._id === newNode._id);
        if (index !== -1) {
          parentNode.children[index] = newNode;
        } else {
          parentNode.children.push(newNode);
        }
        return true;
      }
      for (const child of parentNode.children) {
        if (updateOrAddNode(child, newNode, nodeId)) {
          return true;
        }
      }
      return false;
    };
    const nodeProcessed = updateOrAddNode(jsonData, {
      _id: body._id,
      label: body.label,
      _slug: body._slug,
      _path: body._path,
      _type: body._type,
      _image: body._image,
      content: body.content || "",
      children: body.children || []
    }, parentId);
    if (!nodeProcessed) {
      throw createError({
        statusCode: 400,
        statusMessage: parentId ? "Parent ID n\xE3o encontrado na hierarquia." : "_id n\xE3o encontrado na hierarquia."
      });
    }
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf-8");
    const db = new sqlite3.Database(dbFilePath);
    await new Promise((resolve, reject) => {
      db.run(
        `
        CREATE TABLE IF NOT EXISTS content (
          _id TEXT PRIMARY KEY,
          _type TEXT,
          label TEXT,
          content TEXT
        )
        `,
        (err) => err ? reject(err) : resolve(true)
      );
    });
    await new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO content (_id, _type, label, content)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(_id) DO UPDATE SET
          _type = excluded._type,
          label = excluded.label,
          content = excluded.content
        `,
        [body._id, body._type, body.label, body.content || ""],
        (err) => err ? reject(err) : resolve(true)
      );
    });
    db.close();
    return {
      status: "success",
      message: "N\xF3 adicionado ou atualizado com sucesso no JSON e SQLite!"
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Erro durante o processamento: " + err.message
    });
  }
});

export { upsertNode as default };
//# sourceMappingURL=upsertNode.mjs.map
