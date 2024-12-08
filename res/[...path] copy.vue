<template>
    <div class="container py-1">
      <div v-if="loading" class="text-gray-500">Carregando...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else>
        <!-- <h1 class="text-3xl font-bold mb-4">{{ document.title || "Sem título" }}</h1> -->
        <ContentRenderer :value="document" />
        <!-- <div class="prose max-w-none" v-html="document.body"></div> -->
      </div>
    </div>
  </template>
  
  <script setup>
//   definePageMeta({
//   layout: false, // Define que esta página não usará nenhum layout
// });
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const document = ref({});
  const loading = ref(true);
  const error = ref(null);
  const route = useRoute();
  
  const fetchContentData = async (_path) => {
    try {
      loading.value = true;
      error.value = null;
  
      // Faça a requisição direta para buscar o conteúdo
    //   const response = await $fetch(`/content${_path}.json`);
      // const { data:response } = await useAsyncData('hello', () => queryContent(_path).findOne())
      const { data: response } = await useContent(_path).findOne()
      //   const response = await $fetch(`/content${_path}.md`);
      document.value = response.value
    } catch (err) {
      console.error(err);
      error.value = err.message || "Erro ao carregar o conteúdo.";
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    const _path = `/${route.params.path?.join("/") || "index"}`;
    fetchContentData(_path);
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  
  /* Markdown styles */
  .prose {
    line-height: 1.8;
    color: #333;
  }
  
  .prose h1,
  .prose h2,
  .prose h3 {
    color: #111;
  }
  
  .prose h1 {
    font-size: 50px;
  }
  
  .prose a {
    color: #1a73e8;
    text-decoration: none;
  }
  
  .prose a:hover {
    text-decoration: underline;
  }
  </style>
  