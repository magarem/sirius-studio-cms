<template>
    <div>
        <h1>Adicionar Novo Nó</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="_id">ID:</label>
                <input type="text" id="_id" v-model="formData._id" readonly />
            </div>
            <div>
                <label for="_type">Tipo:</label>
                <input type="text" id="_type" v-model="formData._type" placeholder="Digite o tipo do nó" />
            </div>
            <div>
                <label for="label">Label:</label>
                <input type="text" id="label" v-model="formData.label" placeholder="Digite o label do nó" />
            </div>
            <div>
                <label for="parentPath">Caminho do Nó Pai:</label>
                <input type="text" id="parentPath" v-model="formData.page_body" placeholder="Digite o _path do nó pai" />
            </div>
            <div v-if="formData._type=='page'">
                <label for="parentPath">page_body:</label>
                <textarea  id="page_body" v-model="page_body" />
            </div>
            <button type="submit">Salvar</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { nanoid } from 'nanoid';
// let _path = ''
function str_sanitize(str) {
    return str
        .toLowerCase()                         // Converte para minúsculas
        .trim()                                // Remove espaços extras no início e no final
        .normalize("NFD")                      // Normaliza para separar caracteres especiais (como acentos)
        .replace(/[\u0300-\u036f]/g, "")       // Remove diacríticos (acentos e similares)
        .replace(/[^a-z0-9\s-]/g, "")          // Remove caracteres especiais, mantendo letras, números, espaços e hífens
        .replace(/\s+/g, "-")                  // Substitui espaços por hífens
        .replace(/-+/g, "-");                  // Remove hífens duplicados
}

// Estado do formulário
const formData = ref({
    _id: nanoid(),      // Gera um ID exclusivo ao carregar a página
    _type: '',
    label: '',
    page_body: ''
});

const parentPath = ref(''); // Caminho do nó pai fornecido pelo usuário
const message = ref(''); // Mensagem de status
let data = ref(''); // Mensagem de status

// Função para enviar o formulário
async function submitForm() {
    // Gera o _path automaticamente com base no parentPath e no label
    // if (parentPath.value == '/') parentPath.value = ''

   const _path = `${parentPath.value=='/'?'':parentPath.value}/${str_sanitize(formData.value.label).toLowerCase()}`;

    // Novo nó com o _path gerado
    const newNode = {
        ...formData.value,
        _path,
        children: []
    };

    try {
        // Chamada para a API de adicionar nó
        const data = await $fetch('/api/add-node', {
            method: 'POST',
            body: { parentPath: parentPath.value, newNode }
        });
        message.value = data.value || 'Nó adicionado com sucesso.';

        // Reset no ID e campos do formulário
        formData.value._id = nanoid();
        formData.value._type = '';
        formData.value.label = '';
        parentPath.value = '';
    } catch (error) {
        message.value = 'Erro ao adicionar o nó.';
        console.error(error);
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
}

div {
    margin-bottom: 1em;
}
</style>