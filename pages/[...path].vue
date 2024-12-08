<script setup>
import MarkdownIt from "markdown-it";
import { useRoute } from "vue-router";
const config = useRuntimeConfig();
console.log(config.public.isGenerate);
const route = useRoute();
const isGenerate = ref(config.public.isGenerate);
const frontmatter = ref({}); // Frontmatter data
const item = ref(null); // Item data
const loading = ref(true); // Loading state
const error = ref(null); // Error state
const pathChildrens = ref([]); //
const tela = ref([]); //
const parsedContent = ref([]); // Parsed content with components
let components_list = [];
const data = ref(null);
if (isGenerate.value) {
  console.log("!!!");
  const { data: fetchedData } = await useAsyncData("hello", () =>
    queryContent(`/${route.params.path?.join("/") || ""}`).findOne()
  );
  data.value = fetchedData.value;

  // Consulta todos os arquivos na mesma pasta
  const folderPath = `/${route.params.path?.join("/")}`;
  pathChildrens.value = await queryContent(folderPath)
    .where({ _path: { $ne: data.value._path } }) // Exclui o próprio index.md
    .sort("title", "asc") // Ordena pelo título
    .find();

  tela.value = pathChildrens.value.map(item => [item.title, item._path]);
  console.log(route.params.path?.join("/"));
} else {
  console.log("build!");
  // Markdown-it configuration
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });
  console.log("111>>>>");

  function replaceMultipleWords(string, wordsToReplace, replacement) {
    if (!Array.isArray(wordsToReplace)) {
      throw new Error("O segundo argumento deve ser um array.");
    }

    // Cria uma expressão regular com as palavras a serem substituídas
    const regex = new RegExp(wordsToReplace.join("|"), "g");

    // Substitui as palavras na string
    return string.replace(regex, replacement);
  }

  const cleanRenderedHTML = html => {
    // alert(replaceMultipleWords(html, components_list, ""))
    return replaceMultipleWords(html, components_list, "");
  };

  function extractComponentNames(markdown) {
    // Expressão regular para encontrar componentes no formato <Componente ...></Componente>
    const componentRegex = /<([A-Z][A-Za-z0-9]*)\b[^>]*>/g;

    const componentNames = new Set(); // Usando Set para evitar duplicados
    let match;

    while ((match = componentRegex.exec(markdown)) !== null) {
      componentNames.add(match[1]); // Adiciona o nome do componente encontrado
    }

    return Array.from(componentNames); // Converte para array
  }

  const parseMarkdownWithComponents = markdown => {
    const componentRegex = /<([A-Z][A-Za-z0-9]*)\b([^>]*)>(.*?)<\/\1>/gs;

    // Substitui os componentes no Markdown por placeholders
    const replacedMarkdown = markdown.replace(
      componentRegex,
      (_, name) => `[[COMPONENT-${name}-${parsedContent.value.length}]]`
    );

    // Renderiza o Markdown
    const htmlParts = md
      .render(replacedMarkdown)
      .split(/\[\[COMPONENT-(.+?)-(\d+)\]\]/);

    // Preenche o `parsedContent`
    parsedContent.value = htmlParts.map((part, index) => {
      if (index % 3 === 2) {
        const componentName = htmlParts[index - 1];
        const componentIndex = parseInt(part, 10);
        const { name, props, content } = extractComponentData(
          markdown,
          componentName,
          componentIndex
        );

        return {
          type: "component",
          name: resolveComponent(name), // Certifica que está resolvendo corretamente
          props,
          content
        };
      }

      // Limpa textos residuais
      return { type: "text", content: cleanRenderedHTML(part) };
    });
  };

  const extractComponentData = (markdown, componentName, componentIndex) => {
    const componentRegex = new RegExp(
      `<${componentName}\\b([^>]*)>(.*?)</${componentName}>`,
      "gs"
    );
    const match = Array.from(markdown.matchAll(componentRegex))[componentIndex];
    if (!match) return null;

    const [, attrs, content] = match;

    return {
      name: componentName,
      props: extractProps(attrs),
      content: content.trim()
    };
  };

  const extractProps = attributesString => {
    const props = {};
    const attributesRegex = /([a-zA-Z0-9-]+)="([^"]*)"/g;
    let match;

    while ((match = attributesRegex.exec(attributesString))) {
      props[match[1]] = match[2];
    }

    return props;
  };

  // Fetch item data on component mount
  //  onMounted(() => {
  //     const _path = `/${route.params.path.join("/") || ""}`;
  //     fetchItemData(_path);
  //   });

  async function fetchData() {
    try {
      loading.value = true;
      error.value = null;
      const _path = `/${route.params.path.join("/") || ""}`;
      const data = await $fetch(`/api/findItemByPath`, {
        params: { _path }
      });

      item.value = data.body.data; // Save the returned data
      frontmatter.value = item.value.frontmatter; // Save the frontmatter
      components_list = extractComponentNames(item.value.content);
      // alert(components_list)
      console.log(">>>>");
      parseMarkdownWithComponents(item.value.content || "");
    } catch (err) {
      console.error(err);
      error.value = err?.response?.data?.message || "Erro ao carregar o item.";
    } finally {
      loading.value = false;
    }
  }

  fetchData();
}
</script>

<template>
  <div>
    <div v-if="isGenerate">
      <!-- >>-{{ data }} -->
      <ContentRenderer :value="data" class="content-styled"/>
    </div>
    <div v-else class="container py-1">
      <div v-if="loading" class="text-gray-500">Carregando...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else>
        <!-- <h2 class="text-xl font-semibold">{{ item.label }}</h2> -->
        <div v-if="false">{{ frontmatter.title }}</div>
        <div class=" _p-4 rounded prose _-mt-[10px]">
          <template v-for="(part, index) in parsedContent" :key="index">
            <component
              v-if="part.type === 'component'"
              :is="part.name"
              v-bind="part.props"
            >
              {{ part.content }}
            </component>
            <span v-else v-html="part.content" class="content-styled"></span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content-styled h1 {
  font-size: 2rem;
  color: #4a90e2;
}
.content-styled p {
  line-height: 1.8;
  margin-bottom: 1rem;
}
.content-styled ul {
  list-style-type: square;
  margin-left: 1.5rem;
}
</style>
