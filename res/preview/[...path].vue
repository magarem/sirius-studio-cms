<<template>
  <div class="container py-1">
    <div v-if="loading" class="text-gray-500">Carregando...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <!-- <h2 class="text-xl font-semibold">{{ item.label }}</h2> -->
      <div v-if="false">{{ frontmatter.title }}</div>!!!oo!!!
      <div class=" _p-4 rounded prose _-mt-[10px]">
        <template v-for="(part, index) in parsedContent" :key="index">
          <component
            v-if="part.type === 'component'"
            :is="part.name"
            v-bind="part.props"
          >
            {{ part.content }}
          </component>
          <span v-else v-html="part.content"></span>
        </template>
      </div>
      <div class="mb-5">
        <ChildLinks/>
      </div>
      
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default', // Ignorar layout
});
import { ref, onMounted, resolveComponent } from "vue";
import { useRoute } from "vue-router";
import MarkdownIt from "markdown-it";

// Markdown-it configuration
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

const frontmatter = ref({}); // Frontmatter data
const item = ref(null); // Item data
const loading = ref(true); // Loading state
const error = ref(null); // Error state
const route = useRoute(); // Current route
const parsedContent = ref([]); // Parsed content with components
let components_list = [];
const fetchItemData = async _path => {
  try {
    loading.value = true;
    error.value = null;

    const data = await $fetch(`/api/findItemByPath`, {
      params: { _path }
    });

    item.value = data.body.data; // Save the returned data
    frontmatter.value = item.value.frontmatter; // Save the frontmatter
    components_list = extractComponentNames(item.value.content);
    // alert(components_list)

    parseMarkdownWithComponents(item.value.content || "");
  } catch (err) {
    console.error(err);
    error.value = err?.response?.data?.message || "Erro ao carregar o item.";
  } finally {
    loading.value = false;
  }
};

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
onMounted(() => {
  const _path = `/${route.params.path.join("/") || ""}`;
  fetchItemData(_path);
});
</script>

<style scoped>
.container {
  max-width: 800px;
}

/* Markdown styles */
.prose {
  _line-height: 1.8;
  color: #333;
}

.prose h1,
.prose h2,
.prose h3 {
  color: #111;
}

.prose h1 {
  font-size: 20px;
}

.prose a {
  color: #1a73e8;
  text-decoration: none;
}

.prose a:hover {
  text-decoration: underline;
}
</style>
>