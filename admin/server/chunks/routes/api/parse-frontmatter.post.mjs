import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import yaml from 'js-yaml';
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

const parseFrontmatter_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body || !body.markdown) {
    return { error: "Markdown content is required." };
  }
  const markdownContent = body.markdown;
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/m;
  const match = markdownContent.match(frontmatterRegex);
  if (!match) {
    return { error: "No frontmatter found in the provided Markdown." };
  }
  try {
    const frontmatterContent = match[1];
    const frontmatterObject = yaml.load(frontmatterContent);
    return { frontmatter: frontmatterObject };
  } catch (error) {
    return { error: "Failed to parse frontmatter.", details: error.message };
  }
});

export { parseFrontmatter_post as default };
//# sourceMappingURL=parse-frontmatter.post.mjs.map
