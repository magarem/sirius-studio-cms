<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="_id">ID</label>
          <input v-model="formData._id" type="text" id="_id" required />
        </div>
  
        <div>
          <label for="parentId">Parent ID</label>
          <input v-model="formData.parentId" type="text" id="parentId" placeholder="Opcional: ID do nó pai" />
        </div>
  
        <div>
          <label for="label">Label</label>
          <input v-model="formData.label" type="text" id="label" required />
        </div>
  
        <div>
          <label for="_path">Path</label>
          <input v-model="formData._path" type="text" id="_path" required />
        </div>
  
        <div>
          <label for="_type">Type</label>
          <select v-model="formData._type" id="_type" required>
            <option value="folder">Folder</option>
            <option value="page">Page</option>
          </select>
        </div>
  
        <div>
          <label for="content">Content (Markdown)</label>
          <textarea v-model="formData.content" id="content" rows="5" placeholder="Insira o conteúdo em Markdown"></textarea>
        </div>
  
        <button type="submit">Enviar</button>
      </form>
  
      <div v-if="response">
        <h2>Resposta</h2>
        <pre>{{ response }}</pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const formData = ref({
    _id: '',
    parentId: '', // ID do nó pai fornecido
    label: '',
    _path: '',
    _type: 'page',
    content: '',
    children: [], // Inicializado vazio para futuras adições
  })
  
  const response = ref(null)
  
  const submitForm = async () => {
    try {
      const res = await $fetch('/api/upsertNode', {
        method: 'POST',
        body: formData.value,
      })
      response.value = res
      alert('Nó enviado com sucesso!')
    } catch (error) {
      console.error('Erro ao enviar o nó:', error)
      alert('Erro ao enviar o nó.')
    }
  }
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
  }
  
  form {
    max-width: 500px;
    margin: 0 auto;
  }
  
  form div {
    margin-bottom: 1em;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  
  input,
  select,
  textarea {
    width: 100%;
    padding: 0.5em;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    padding: 0.75em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  