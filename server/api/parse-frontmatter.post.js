import yaml from "js-yaml";

export default defineEventHandler(async (event) => {
  // Obter o conteúdo enviado no corpo da requisição
  const body = await readBody(event);

  if (!body || !body.markdown) {
    return { error: "Markdown content is required." };
  }

  const markdownContent = body.markdown;

  // Regex para capturar o frontmatter
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/m;
  const match = markdownContent.match(frontmatterRegex);

  if (!match) {
    return { error: "No frontmatter found in the provided Markdown." };
  }

  try {
    // Extrair o frontmatter
    const frontmatterContent = match[1];
    // Parsear o frontmatter (YAML) para um objeto
    const frontmatterObject = yaml.load(frontmatterContent);

    return { frontmatter: frontmatterObject };
  } catch (error) {
    return { error: "Failed to parse frontmatter.", details: error.message };
  }
});
