<script setup>
// Metainformações da página
definePageMeta({
  layout: "none", // Define que esta página não usará nenhum layout
  prerender: false // Desativa a pré-renderização desta página
});

import { ref } from "vue";
import { marked } from "marked";
import TreeView from "~/components/TreeView.vue";
import { generateUUID } from "~/utils/helpers";

// Estados reativos para controle de visibilidade das colunas
const isLeftOpen = ref(true);
const isCenterOpen = ref(true);
const isRightOpen = ref(true);

const markdownContent = ref("");
const selectedOption = ref("");
const selectedNode = ref(null);
const sidebarOpen = ref(true);
let data = ref();
let tela = ref();
const nodeSelected = ref({
  _id: "",
  label: "",
  _slug: "",
  _image: "",
  children: [],
  content: ""
});
let _path_ = "";
// Tabs state
const tabs = ref([]);
const btnMover_label = ref("Mover");
const btnCopiar_label = ref("Copiar");
const activeTab = ref(null);
const activeTabContent = ref("");
const refreshTree = ref(0);
let father_path = "";
let flgTab = ref("metatags");
let flg_appendNewFile = false;
let vaiMover = false;
let vaiCopiar = false;

// Funções de alternância de visibilidade
function toggleLeft() {
  isLeftOpen.value = !isLeftOpen.value;
}

function toggleCenter() {
  isCenterOpen.value = !isCenterOpen.value;
}

function toggleRight() {
  isRightOpen.value = !isRightOpen.value;
}

// Função para remover o frontmatter
function removeFrontmatter(md) {
  return md.replace(/^---[\s\S]*?---/, "").trim();
}

const renderedMarkdown = computed(() =>
  marked(removeFrontmatter(nodeSelected.value.content))
);

// Manipulador de eventos
function handleChange(event) {
  const selectedAction = event.target.value;
  const actions = {
    appendFile,
    deleteItem,
    move,
    copy
  };

  // Chama a função correspondente
  if (actions[selectedAction]) {
    actions[selectedAction]();
  } else {
    console.warn("Ação não encontrada:", selectedAction);
  }
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

// Objeto reativo para gerenciar estado e função
const compiler = reactive({
  loading: false,
  message: "",
  async compileSite() {
    this.loading = true;
    this.message = "";
    try {
      const response = await fetch("/api/compileContent", {
        method: "POST"
      });
      const data = await response.json();
      if (data.success) {
        this.message = "Site compilado com sucesso!";
      } else {
        this.message = "Erro ao compilar o site.";
      }
    } catch (error) {
      console.error("Erro:", error);
      this.message = "Erro ao compilar o site.";
    } finally {
      this.loading = false;
    }
  }
});

// const compileSite = async () => {
//   const response = await fetch("/api/compile", {
//     method: "POST",
//     headers: {
//       Authorization: "Bearer my-secure-token"
//     }
//   });
// };

const tabSet = tab => {
  flgTab.value = tab;
};

const deleteItem = () => {
  const wasDeleted = deleteNodeById(data.value, nodeSelected.value._id);
  if (wasDeleted) saveReorderedTree(data.value);
};

function deleteNodeById(tree, targetId) {
  // Função recursiva para buscar e excluir o nó
  function removeNode(nodes, targetId) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      // Verifica se o nó atual é o alvo
      if (node._id === targetId) {
        nodes.splice(i, 1); // Remove o nó encontrado
        return true; // Retorna sucesso
      }
      // Se o nó tiver filhos, chama recursivamente
      if (node.children && node.children.length > 0) {
        const result = removeNode(node.children, targetId);
        if (result) return true; // Se encontrou nos filhos, retorna sucesso
      }
    }
    return false; // Retorna falso se o nó não foi encontrado
  }

  // Inicia a busca e exclusão no nível raiz
  return removeNode(tree.children, targetId);
}

const move = () => {
  vaiMover = true;
  btnMover_label.value = "Selecione o destino";
};

const copy = () => {
  vaiCopiar = true;
  btnCopiar_label.value = "Selecione o destino";
};

function copyNodeByPath(tree, fromPath, toPath) {
  // Função para encontrar o nó de origem
  function findNode(nodes, path) {
    for (const node of nodes) {
      if (node._path === path) {
        return node;
      }
      if (node.children && node.children.length > 0) {
        const result = findNode(node.children, path);
        if (result) return result;
      }
    }
    return null;
  }

  // Função para gerar um novo ID (exemplo: UUID simples)
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Função para atualizar o _path e _id recursivamente
  function updatePathsAndIds(node, parentPath) {
    node._id = generateUUID(); // Gera um novo _id
    node._path = `${parentPath}/${node._slug}`.replace("//", "/");
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => updatePathsAndIds(child, node._path));
    }
  }

  // Função para encontrar o nó de destino
  function findNodeByPath(nodes, path) {
    for (const node of nodes) {
      if (node._path === path) {
        return node;
      }
      if (node.children && node.children.length > 0) {
        const result = findNodeByPath(node.children, path);
        if (result) return result;
      }
    }
    return null;
  }

  // Encontrar o nó de origem
  const fromNode = findNode(tree.children, fromPath);
  if (!fromNode) {
    console.warn(`Nó de origem não encontrado: ${fromPath}`);
    return false;
  }

  // Encontrar o nó de destino
  const targetNode = findNodeByPath(tree.children, toPath);
  if (!targetNode) {
    console.warn(`Nó de destino não encontrado: ${toPath}`);
    return false;
  }

  // Garantir que o destino tenha um array `children`
  if (!targetNode.children) {
    targetNode.children = [];
  }

  // Criar uma cópia profunda do nó de origem
  const copiedNode = JSON.parse(JSON.stringify(fromNode));

  // Atualizar os caminhos e IDs do nó copiado
  updatePathsAndIds(copiedNode, targetNode._path);

  // Adicionar o nó ao destino
  targetNode.children.push(copiedNode);
  selectedOption.value = "";
  return true;
}

function moveNodeByPath(tree, fromPath, toPath) {
  // Função para encontrar e remover o nó de origem
  function findAndRemoveNode(nodes, path) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node._path === path) {
        return nodes.splice(i, 1)[0]; // Remove e retorna o nó
      }
      if (node.children && node.children.length > 0) {
        const result = findAndRemoveNode(node.children, path);
        if (result) return result;
      }
    }
    return null;
  }

  // Função para encontrar o nó de destino
  function findNode(nodes, path) {
    if (path === "/") return tree; // Retorna a raiz se o destino for "/"
    for (const node of nodes) {
      if (node._path === path) {
        return node;
      }
      if (node.children && node.children.length > 0) {
        const result = findNode(node.children, path);
        if (result) return result;
      }
    }
    return null;
  }

  // Função para atualizar o _path recursivamente
  function updatePaths(node, parentPath) {
    node._path = `${parentPath}/${node._slug}`.replace("//", "/");
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => updatePaths(child, node._path));
    }
  }

  // Enforce reactivity with Vue 3
  function forceReactivity(nodes) {
    return JSON.parse(JSON.stringify(nodes));
  }

  // Remover o nó de origem
  const fromNode = findAndRemoveNode(tree.children, fromPath);
  if (!fromNode) {
    console.warn(`Nó de origem não encontrado: ${fromPath}`);
    return false;
  }

  // Se o destino for a raiz ("/"), adiciona diretamente na raiz
  if (toPath === "/") {
    fromNode.parentId = null; // Remove o parentId para a raiz
    updatePaths(fromNode, ""); // Atualiza o _path como se fosse na raiz
    tree.children.push(fromNode); // Adiciona o nó à raiz
    tree.children = forceReactivity(tree.children); // Força a reatividade
    return true;
  }

  // Encontrar o nó de destino
  const targetNode = findNode(tree.children, toPath);
  if (!targetNode) {
    console.warn(`Nó de destino não encontrado: ${toPath}`);
    return false;
  }

  // Garantir que o destino tenha um array `children`
  if (!targetNode.children) {
    targetNode.children = [];
  }

  // Atualizar o parentId e o _path do nó movido
  fromNode.parentId = targetNode._id;
  updatePaths(fromNode, targetNode._path);

  // Adicionar o nó ao destino
  targetNode.children.push(fromNode);

  // Atualizar a árvore inteira para forçar reatividade
  tree.children = forceReactivity(tree.children);
  return true;
}

const saveReorderedTree = async updatedTree => {
  try {
    // Atualiza a estrutura local
    data.value = updatedTree;

    // Salva no backend
    await $fetch("/api/save-nodes", {
      method: "POST",
      body: { nodes: updatedTree }
    });

    console.log("Árvore salva com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar a árvore:", error);
  }
};

const generateSlug = () => {
  nodeSelected.value._slug = nodeSelected.value.label
    .toLowerCase()
    .normalize("NFD") // Remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-"); // Substitui espaços por hifens
  // nodeSelected.value._path = getPathBeforeLastSegment(nodeSelected.value._path)
  if (flg_appendNewFile) {
    nodeSelected.value._path = (
      father_path +
      "/" +
      nodeSelected.value._slug
    ).replace("//", "/");
  } else {
    nodeSelected.value._path =
      getPathBeforeLastSegment(nodeSelected.value._path) +
      "/" +
      nodeSelected.value._slug.replace("//", "/");
  }
};

// Função para adicionar ou atualizar um nó
const submitForm = async () => {
  console.log(33, nodeSelected.value.content);
  console.log(331, activeTabContent.value);
  try {
    const res = await $fetch("/api/upsertNode", {
      method: "POST",
      body: { ...nodeSelected.value, content: nodeSelected.value.content }
    });
    fetchData();
  } catch (error) {
    console.error("Erro ao enviar o nó:", error);
    alert("Erro ao enviar o nó.");
  }
};

const appendFile = () => {
  flg_appendNewFile = true;
  father_path = nodeSelected.value._path.replace("//", "/");
  nodeSelected.value = {
    _id: generateUUID(),
    parentId: nodeSelected.value._id, // ID do nó pai fornecido
    label: "",
    _path: father_path,
    _type: "page",
    _slug: "",
    content: "",
    children: [] // Inicializado vazio para futuras adições
  };
  selectedOption.value = "";
  activeTabContent.value = "";
};

const fetchData = async () => {
  try {
    // const response = await fetch("/data/nodes.json");
    const response = await fetch("/api/nodes");

    data.value = await response.json();
    console.log(22, data.value);
  } catch (error) {
    console.error("Failed to fetch JSON:", error);
  }
};

function getPathBeforeLastSegment(path) {
  // Remove uma barra final, se existir, e divide a string em segmentos
  const segments = path.replace(/\/$/, "").split("/");
  // Remove o último segmento
  segments.pop();
  // Junta os segmentos restantes com "/"
  return segments.join("/");
}

const handleNodeClick = async node => {
  if (vaiMover) {
    vaiMover = false;
    btnMover_label.value = "Mover";
    if (moveNodeByPath(data.value, nodeSelected.value._path, node._path)) {
      // Reatribuir a árvore para garantir reatividade
      saveReorderedTree(data.value);
      console.log("Nó movido com sucesso!");
    }
  }

  if (vaiCopiar) {
    vaiCopiar = false;
    btnCopiar_label.value = "Copiar";
    if (copyNodeByPath(data.value, nodeSelected.value._path, node._path)) {
      // Reatribuir a árvore para garantir reatividade
      saveReorderedTree(data.value);
      console.log("Nó copiado com sucesso!");
    }
  }

  if (node?._id) {
    const { data } = await useAsyncData("nodeDetails", () =>
      $fetch(`/api/getNode?_id=${node._id}`)
    );
    const { data: data2 } = await useAsyncData("recordDetails", () =>
      $fetch(`/api/getRecord?_id=${node._id}`)
    );

    nodeSelected.value = {};
    nodeSelected.value = { ...data.value.node, ...data2.value?.data };
    // delete nodeSelected.value.children;
    activeTabContent.value = data2.value?.data.content.replace(/\\n/g, "\n");
  }
};

fetchData();
</script>
<style scoped>
button {
  @apply bg-blue-500 text-white text-sm px-1 py-1;
}

textarea {
  font-family: monospace;
  font-size: 16px;
  line-height: 1.6;
}
</style>
<template>
  <div class="h-screen flex flex-col">
    <!-- Cabeçalho -->
    <header
      class="h-10 bg-gray-800 text-white flex items-center justify-center"
    >
      Círius CMS
    </header>

    <!-- Conteúdo Principal -->
    <div class="flex flex-1">
      <!-- Coluna de Controle (Ícones) -->
      <aside
        class="w-16 bg-gray-900 text-white flex flex-col items-center py-4 space-y-4"
      >
        <!-- Botão para abrir/fechar a coluna da esquerda -->
        <button
          @click="toggleLeft"
          class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center"
        >
          L
        </button>

        <!-- Botão para abrir/fechar o editor do centro -->
        <button
          @click="toggleCenter"
          class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center"
        >
          C
        </button>

        <!-- Botão para abrir/fechar a coluna da direita -->
        <button
          @click="toggleRight"
          class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center"
        >
          R
        </button>
      </aside>

      <!-- Coluna Esquerda -->
      <aside
        v-if="isLeftOpen"
        :class="[
          isRightOpen && !isCenterOpen
            ? 'w-1/5'
            : isCenterOpen || isRightOpen
            ? 'w-1/5'
            : 'flex-grow',
          'bg-gray-800 text-white _flex _items-center _justify-center'
        ]"
      >
        <div class="bg-gray-700 text-white py-2 px-4">
          <h2 class="font-bold text-sm">Páginas</h2>
        </div>

        <div class="w-fill">
          <select
            id="options"
            name="options"
            class="md:hidden block w-full border bg-slate-400 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            @change="handleChange"
            v-model="selectedOption"
          >
            <option value="" disabled selected>Ações</option>
            <option value="appendFile">Novo</option>
            <option value="deleteItem">Excluir</option>
            <option value="move">{{ btnMover_label }}</option>
            <option value="copy">{{ btnCopiar_label }}</option>
          </select>
        </div>

        <div class="w-full mt-3 inline-flex hidden sm:block text-center">
          <button
            class="rounded-l"
            @click="appendFile"
            v-show="nodeSelected._id"
            type="button"
          >
            Novo
          </button>
          <button
            @click="deleteItem"
            v-show="nodeSelected._id"
            :disabled="!nodeSelected._id"
            type="button"
          >
            Excluir
          </button>
          <button
            @click="move"
            v-show="nodeSelected._id"
            :disabled="!nodeSelected._id"
            type="button"
          >
            {{ btnMover_label }}
          </button>
          <button
            class="rounded-r"
            @click="copy"
            v-show="nodeSelected._id"
            :disabled="!nodeSelected._id"
            type="button"
          >
            {{ btnCopiar_label }}
          </button>
        </div>
        <div class="p-2">
          <TreeView
            :key="refreshTree"
            :nodes="data"
            @node-click="handleNodeClick"
            @node-reorder="saveReorderedTree"
          />
        </div>
      </aside>

      <!-- Coluna do Centro -->
      <main
        v-if="isCenterOpen"
        class="flex-1 flex-col bg-gray-600 _p-4 flex _items-center _justify-center"
      >
        <div class="bg-gray-700 text-white py-2 px-4 w-full">
          <h2 class="font-bold text-sm">Conteúdo</h2>
        </div>
        <textarea
          v-model="nodeSelected.content"
          class="w-full h-full bg-gray-900 text-white p-2 _rounded resize-none focus:outline-none"
          placeholder="Digite aqui..."
        ></textarea>
      </main>

      <!-- Coluna Direita -->
      <aside
        v-if="isRightOpen"
        :class="[
          isCenterOpen ? 'w-1/3' : isLeftOpen ? 'flex-grow' : 'flex-grow',
          'bg-gray-800 text-white _flex _items-center _justify-center'
        ]"
      >
        <!-- Barra de Título -->
        <div class="bg-gray-700 text-white py-2 px-4">
          <h2 class="font-bold text-sm">Preview</h2>
        </div>
        <div
          v-html="renderedMarkdown"
          class="prose max-w-none p-3 text-white"
        ></div>
      </aside>
    </div>

    <!-- Rodapé -->
    <footer class=" bg-gray-800 text-white flex items-center justify-center">
      Rodapé
    </footer>
  </div>
</template>
