import { defineEventHandler, readBody } from 'file:///home/maga/dev/sirius-studio-cms/node_modules/h3/dist/index.mjs';
import yaml from 'file:///home/maga/dev/sirius-studio-cms/node_modules/js-yaml/dist/js-yaml.mjs';

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
