<template>
  <div class="h-screen flex flex-col bg-gray-900 text-white">
    <!-- Top Menu -->
    <header class="h-12 bg-gray-800 flex items-center px-4">
      <div class=" text-lg">Círius</div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Side Menu -->
      <aside
        class="w-64 bg-gray-100 p-1 border-r border-gray-300 hidden md:block"
      >
        <TreeView
          :key="refreshTree"
          :nodes="data"
          @node-click="handleNodeClick"
          @node-reorder="saveReorderedTree"
        />
      </aside>
      <main class="flex-1 bg-gray-900 overflow-hidden flex flex-col">
        <div class="ml-4">
          <button @click="refreshTree++">Refresh</button>
          <button type="button" @click="tabSet('metatags')">Metatags</button>
          <button @click="tabSet('content')" type="button">Conteúdo</button>
          <button @click="compiler.compileSite" :disabled="compiler.loading">
            {{ compiler.loading ? "Compilando..." : "Compilar Site" }}
          </button>
        </div>
        <!-- Tab Bar -->
        <!-- <div class="h-10 bg-gray-800 border-b border-gray-700 flex items-center px-4 space-x-4">
                    <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                        class="px-4 py-2 rounded hover:bg-gray-700" :class="{ 'bg-gray-700': activeTab === tab.id }">
                        {{ tab.label }}
                    </button>
                </div> -->

        <!-- Editor Content -->
        <div class="flex-1 overflow-auto p-4 bg-gray-900">
          <form @submit.prevent="submitForm">
            <div class="mb-4" v-show="false">
              <label for="_id" class="block text-sm font-medium text-gray-200"
                >ID</label
              >
              <input
                v-model="nodeSelected._id"
                type="text"
                id="label"
                class="mt-1 block w-full  bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div class="mb-2">
              <label for="label" class="block text-sm font-medium text-gray-200"
                >Label</label
              >
              <input
                v-model="nodeSelected.label"
                @input="generateSlug"
                type="text"
                id="label"
                class="mt-1 block w-full  bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div class="mb-4">
              <div class="inline-flex">
                <button
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800  py-2 px-4 rounded-l"
                  @click="appendFile"
                  v-show="nodeSelected._id"
                  type="button"
                >
                  Novo
                </button>
                <button
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800  py-2 px-4"
                  @click="deleteItem"
                  v-show="nodeSelected._id"
                  :disabled="!nodeSelected._id"
                  type="button"
                >
                  Excluir
                </button>
                <button
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800  py-2 px-4 "
                  @click="move"
                  v-show="nodeSelected._id"
                  :disabled="!nodeSelected._id"
                  type="button"
                >
                  {{ btnMover_label }}
                </button>
                <button
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800  py-2 px-4 rounded-r"
                  @click="copy"
                  v-show="nodeSelected._id"
                  :disabled="!nodeSelected._id"
                  type="button"
                >
                  {{ btnCopiar_label }}
                </button>
              </div>
            </div>
            <div v-if="flgTab === 'metatags'">
              <div class="mb-4">
                <label
                  for="label"
                  class="block text-sm font-medium text-gray-200"
                  >Slug</label
                >
                <input
                  v-model="nodeSelected._slug"
                  type="text"
                  id="label"
                  class="mt-1 block w-full  bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="type"
                  class="block text-sm font-medium text-gray-200"
                  >Tipo</label
                >
                <input
                  v-model="nodeSelected._type"
                  type="text"
                  id="type"
                  maxlength="20"
                  class="mt-1 block w-full  bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="path"
                  class="block text-sm font-medium text-gray-200"
                  >Path</label
                >
                <input
                  v-model="nodeSelected._path"
                  type="text"
                  id="path"
                  class="mt-1 block w-full  bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div class="mb-4">
                <label
                  for="image"
                  class="block text-sm font-medium text-gray-200"
                  >Image</label
                >
                <input
                  v-model="nodeSelected._image"
                  type="text"
                  id="image"
                  class="mt-1 block w-full  bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div class="mb-4" v-show="false">
                <label
                  for="type"
                  class="block text-sm font-medium text-gray-200"
                  >Parent_id</label
                >
                <input
                  v-model="nodeSelected.parentId"
                  type="text"
                  id="type"
                  maxlength="20"
                  class="mt-1 block w-full  bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div class="h-full">
              <label
                for="type"
                class="mb-2 block text-sm font-medium text-gray-200"
                >Conteúdo</label
              >
              <textarea
                v-model="activeTabContent"
                class="w-full h-full min-h-[250px]  bg-gray-800 text-white border-none resize-none p-2 rounded"
              ></textarea>
            </div>

            <button type="submit">Salvar</button>
          </form>
        </div>
      </main>
      <aside
        class="w-64 bg-gray-100 p-1 border-r border-gray-300 hidden md:block"
      ></aside>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "none", // Define que esta página não usará nenhum layout
  prerender: false
});

import TreeView from "~/components/TreeView.vue";
import { generateUUID } from "~/utils/helpers";
const selectedNode = ref(null);
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

// Objeto reativo para gerenciar estado e função
const compiler = reactive({
  loading: false,
  message: "",
  async compileSite() {
    this.loading = true;
    this.message = "";
    try {
      alert()
      const response = await fetch("/api/compileContent", {
        method: "POST",
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
  },
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
  try {
    const res = await $fetch("/api/upsertNode", {
      method: "POST",
      body: { ...nodeSelected.value, content: activeTabContent.value }
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
  activeTabContent.value = "";
};

const fetchData = async () => {
  try {
    // const response = await fetch("/data/nodes.json");
    const response = await $fetch("/api/nodes");
    data.value = await response;
    console.log(data.value);
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
  @apply bg-blue-500 text-white text-sm px-2 py-1;
}

textarea {
  font-family: monospace;
  font-size: 14px;
  line-height: 1.6;
}
</style>
