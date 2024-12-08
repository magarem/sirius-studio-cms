<template>
    <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-4">Criar Página</h1>
  
      <form @submit.prevent="handleSubmit">
        <!-- Campo Título -->
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
          <input
            v-model="title"
            @input="generateLabelAndSlug"
            type="text"
            id="title"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Digite o título da página"
            required
          />
        </div>
  
        <!-- Campo Label -->
        <div class="mb-4">
          <label for="label" class="block text-sm font-medium text-gray-700">Label</label>
          <input
            v-model="label"
            type="text"
            id="label"
            maxlength="20"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Digite o rótulo (máx. 20 caracteres)"
            required
          />
          <small class="text-gray-500">Restam {{ 20 - label.length }} caracteres.</small>
        </div>
  
        <!-- Campo Slug -->
        <div class="mb-4">
          <label for="slug" class="block text-sm font-medium text-gray-700">Slug</label>
          <input
            v-model="slug"
            type="text"
            id="slug"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Digite o slug"
            required
          />
          <small class="text-gray-500">Este será o identificador único na URL.</small>
        </div>
  
        <!-- Botão de Submissão -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Salvar Página
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Referências reativas para os campos
  const title = ref("");
  const label = ref("");
  const slug = ref("");
  
  // Função para gerar o slug
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD") // Decompor caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remover marcas de diacríticos (acentos)
      .replace(/ç/g, "c") // Substituir 'ç' por 'c'
      .replace(/[^a-z0-9\s-]/g, "") // Remover caracteres especiais
      .replace(/\s+/g, "-") // Substituir espaços por hifens
      .replace(/-+/g, "-") // Garantir que não haja múltiplos hifens
      .trim(); // Remover espaços extras
  };
  
  // Função para gerar Label e Slug automaticamente
  const generateLabelAndSlug = () => {
    label.value = title.value.slice(0, 20); // Limitar a 20 caracteres
    slug.value = generateSlug(title.value);
  };
  
  // Função para submissão
  const handleSubmit = () => {
    console.log("Título:", title.value);
    console.log("Label:", label.value);
    console.log("Slug:", slug.value);
  
    // Aqui você pode enviar os dados para a API ou realizar outra lógica
    alert("Página salva com sucesso!");
  };
  </script>
  