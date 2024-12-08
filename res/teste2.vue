<template>
  <button @click="compileContent">Compilar Páginas</button>
</template>

<script setup>
const compileContent = async () => {
  try {
    const response = await fetch('/api/compileContent', {
      method: 'POST',
    });
    const data = await response.json();
    console.log('Resposta da API:', data);
    alert('Páginas compiladas com sucesso!');
  } catch (error) {
    console.error('Erro ao compilar páginas:', error);
    alert('Erro ao compilar páginas.');
  }
};
</script>
