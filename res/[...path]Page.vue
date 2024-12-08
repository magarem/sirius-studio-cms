<template>
    <div>
      <!-- <h1>{{ page.title }}</h1> -->
      <div v-html="page?.content"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const page = ref(null);
  
  onMounted(async () => {
    const route = useRoute();
  
    // Une os segmentos da rota para formar o caminho completo
    const fullPath = route.params.path.join('/');
    // Faz uma requisição para obter os dados do SQLite com base no path
    const data = await $fetch(`/api/getPage`, {
      params: { path: `/${fullPath}` },
    });
  
    if (!data) {
      console.error('Página não encontrada:', fullPath);
      return;
    }
  
    page.value = data;
  });
  </script>
  