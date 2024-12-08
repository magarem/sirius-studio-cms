<template>
    <div class="container">
        <h1>Manage Nodes</h1>

        <!-- Formulário para adicionar ou atualizar um nó -->
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="parentId">Parent Node ID</label>
                <select v-model="form.parentId" id="parentId" >
                    <option v-for="node in flattenedNodes" :key="node._id" :value="node._id">
                        {{ node.label }} ({{ node._id }})
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="id">Node ID</label>
                <input type="text" id="id" v-model="form._id"  />
                <button @click="loadNode">Load</button>
            </div>

            <div class="form-group">
                <label for="label">Node Label</label>
                <input type="text" id="label" v-model="form.label" placeholder="Enter Node Label"  />
            </div>

            <div class="form-group">
                <label for="parentType">Tipo</label>
                <select v-model="form._type" id="parentType" >
                    <option v-for="item in form_types_options" :key="item" :value="item">
                        {{ item }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="conteudo">Conteúdo</label>
                <textarea v-model="form.content" class="editor"></textarea>
            </div>

            <button type="submit">Add/Update Node</button>
        </form>

        <!-- Exibir mensagem de sucesso ou erro -->
        <p v-if="message" class="message">{{ message }}</p>

        <!-- Exibir a estrutura atual dos nós -->
        <h2>Current Node Tree</h2>
        <pre>{{ nodes }}</pre>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { generateUUID } from '~/utils/helpers';

// Estado local
const nodes = ref([]); // Armazena os nós existentes
const flattenedNodes = ref([]); // Lista achatada para o dropdown
const form = ref({
    parentId: '', // ID do nó pai
    _id: generateUUID(), // ID do nó
    label: '', // Rótulo do nó
    _path: '', // Caminho do nó
    _type: 'page', // Tipo padrão
    content: '',
    children: [] // Lista de filhos padrão
});

const form_types_options = ref(['page', 'album'])
const message = ref('');


const loadNodes = async () => {
    try {
        const response = await fetch('/api/update-node', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'list' })
        });

        const result = await response.json();

        if (result.status === 200) {
            // Garante que estamos lidando com o nó raiz
            const rootNode = result.nodes;
            nodes.value = rootNode; // Armazena a estrutura completa no estado local
            flattenedNodes.value = flattenTreeWithRoot(rootNode); // Gera a lista achatada com o nó raiz
        } else {
            message.value = result.message || 'Failed to load nodes.';
        }
    } catch (error) {
        console.error('Error loading nodes:', error);
        message.value = 'Error loading nodes.';
    }
};

const loadNode = async () => {
    try {
        alert(form.value._id)
        if (false) {
            const response = await fetch('/api/manage-node', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get', _id: form.value._id })
            });

            const result = await response.json();

            if (result.status === 200) {
                // Garante que estamos lidando com o nó raiz
                const rootNode = result.nodes;
                nodes.value = rootNode; // Armazena a estrutura completa no estado local
                flattenedNodes.value = flattenTreeWithRoot(rootNode); // Gera a lista achatada com o nó raiz
            } else {
                message.value = result.message || 'Failed to load nodes.';
            }
        }

    } catch (error) {
        console.error('Error loading nodes:', error);
        message.value = 'Error loading nodes.';
    }
};

// Função para achatar a estrutura hierárquica de nós
const flattenNodes = (nodes, parentPath = '') => {
    if (!Array.isArray(nodes)) {
        console.error('flattenNodes: Esperado um array, recebido:', nodes);
        return [];
    }

    return nodes.reduce((acc, node) => {
        acc.push({
            _id: node._id,
            label: `${parentPath}/${node.label}`.replace(/\/+/g, '/'),
            _path: node._path,
            _type: node._type
        });

        if (node.children && Array.isArray(node.children)) {
            acc.push(...flattenNodes(node.children, `${parentPath}/${node.label}`));
        }

        return acc;
    }, []);
};

// Função para incluir o nó raiz e achatar a árvore
const flattenTreeWithRoot = (rootNode) => {
    if (!rootNode || typeof rootNode !== 'object') {
        console.error('flattenTreeWithRoot: Nó raiz inválido:', rootNode);
        return [];
    }

    return [
        {
            _id: rootNode._id,
            label: rootNode.label,
            _path: rootNode._path,
            _type: rootNode._type
        },
        ...flattenNodes(rootNode.children || [], rootNode._path)
    ];
};

// Função para adicionar ou atualizar um nó
const handleSubmit = async () => {
    try {
        const response = await fetch('/api/update-node', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                parentId: form.value.parentId,
                action: 'update',
                node: {
                    _id: form.value._id,
                    label: form.value.label,
                    _path: form.value._path,
                    _type: form.value._type,
                    content: form.value.content,
                    children: form.value.children
                }
            })
        });

        const result = await response.json();
        message.value = result.message;
        if (result.status === 200) {
            await loadNodes(); // Recarrega os nós após a adição/atualização
            form.value = { parentId: '', _id: '', label: '', _path: '', _type: 'page', content: '', children: [] }; // Reseta o formulário
        }
    } catch (error) {
        console.error('Error updating node:', error);
        message.value = 'Error updating node.';
    }
};

// Carrega os nós ao montar o componente
onMounted(loadNodes);
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

form {
    margin-bottom: 20px;
    background-color: #f9f9f9;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

form .form-group {
    margin-bottom: 10px;
}

form label {
    display: block;
    margin-bottom: 5px;
}

form input,
form select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.message {
    color: green;
    font-weight: bold;
    margin-top: 10px;
}

pre {
    background-color: #f5f5f5;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.editor-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 780px;
    margin: 0 auto;
}

.editor {
    width: 100%;
    height: 400px;

}
</style>