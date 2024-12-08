import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import Database from 'better-sqlite3';
import { join } from 'path';
import matter from 'gray-matter';
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

const _id_ = defineEventHandler((event) => {
  const dbPath = join(process.cwd(), "data", "content.db");
  const db = new Database(dbPath, { verbose: console.log });
  const { id } = event.context.params;
  try {
    const stmt = db.prepare("SELECT * FROM content WHERE id = ?");
    const row = stmt.get(id);
    const { data: frontmatter, content: markdownContent } = matter(row.body);
    return { frontmatter, markdownContent };
  } finally {
    db.close();
  }
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
