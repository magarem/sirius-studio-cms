<template>
  <div>
    <ul>
      <li v-for="item in tela" :key="item._path">
        <a :href="item[1]">{{ item[0] }}</a>
      </li>
    </ul>
    <div v-if="children.length === 0" class="text-gray-500"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const tela = ref([]);
const pathChildrens = ref([]);
// Dados dos filhos do item atual
const children = ref([]);

// Obtém a rota atual
const route = useRoute();
console.log('route.params.path:', route.params.path)
// Carrega os dados dos filhos
const fetchChildren = async parentPath => {
  try {
    // Consulta todos os arquivos na mesma pasta
    const folderPath = `/${route.params.path?.join("/")}`;
    console.log('folderPath:', folderPath)
    const { data: pathChildrens, error } = await useAsyncData(() =>
      queryContent(folderPath)
        .where({ _path: { $ne: folderPath } }) // Exclui o index.md
        .sort("title", "asc")
        .find()
    );

    console.log('pathChildrens>>', pathChildrens.value);

    tela.value = pathChildrens.value.map(item => [item.title, item._path]);

    const path = parentPath || ""; // Remove apenas o primeiro '/' da rota
    // const data = await $fetch(`/api/getNodeByPath/${path}`);

    // const data = await $fetch("/api/findItemByPath", {
    //   params: { _path: parentPath }
    // });

    // const { data, error } = await useFetch("/api/findItemByPath", {
    //   params: { _path: parentPath },
    //   server: true // Garante que a chamada será resolvida no servidor
    // });

    // console.log("data:", data);

    // if (error.value) {
    //   console.error("Erro ao buscar dados:", error.value);
    // }

    // Verifica se o item possui filhos
    // if (data.children) {
    //   children.value = data.children;
    // } else {
    //   children.value = [];
    // }
  } catch (error) {
    console.error("Erro ao buscar os filhos:", error);
  }
};

// Quando o componente for montado
// onMounted(() => {
  // const parentPath = `/${route.params.path?.join("/") || ""}`;
  const parentPath = route.path.slice(1); // Remove a barra inicial
  fetchChildren(parentPath);
// });
</script>

<style scoped>
ul {
  list-style-type: disc;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}
</style>
