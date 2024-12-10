<template>
    <div>
    <ul>
        <li
            draggable="true"
            @dragstart="onDragStart(node, index)"
            @dragover.prevent
            @drop="onDrop(node, index)"
            v-for="(node, index) in normalizedNodes"
            :key="node?._id"
            :style="{ paddingLeft: `${level * 7}px` }"
            _class="p-2 border mb-1 bg-gray-800 text-white rounded"
        >
            <div class="flex items-center space-x-2 hover:bg-slate-700 p-1 rounded cursor-pointer"
                @click="toggleNode(node?._id, node)">
                <!-- Expand/Collapse Icon -->
                <span v-if="node?.children && node?.children.length" class="text-blue-500">
                    {{ isOpen(node?._id) ? '-' : '+' }}
                </span>
                <span v-else class="text-gray-400">•</span>
                <!-- Node Label -->
                <span
                class=" text-white"
                    :class="{ 'font-bold text-black': node?._type === 'folder', 'text-gray-700': node?._type === 'page' }">
                    {{ node?.label }}
                </span>
            </div>
            <!-- Recursive Rendering for Children -->
            <TreeView
                v-if="node?.children && node?.children.length && isOpen(node?._id)"
                @node-click="emit('node-click', $event)"
                :nodes="node?.children"
                :level="level + 1"
                @node-reorder="emit('node-reorder', props.nodes)" 
                
            />
        </li>
    </ul>
    
</div>
</template>
<script setup>
// Props para receber a lista de nós e o nível de hierarquia
const props = defineProps({
    nodes: {
        type: [Array, Object], // Aceita Array ou Objeto
        required: true,
    },
    level: {
        type: Number,
        default: 0, // Nível inicial
    },
});

// Estado local para controlar quais nós estão abertos
const openNodes = ref(new Set());
const emit = defineEmits(['node-click', 'node-reorder']);

// Variáveis para armazenar o item arrastado
let draggedItem = null;
let draggedIndex = null;

// Função chamada ao iniciar o arrasto
const onDragStart = (node, index) => {
    // alert(JSON.stringify(node.parentId))
    draggedItem = node; // Armazena o nó sendo arrastado
    draggedIndex = index; // Armazena o índice do item arrastado
};

// Função para finalizar o arrasto
const onDrop = (targetNode, targetIndex) => {
    if (draggedItem && draggedIndex !== null && draggedIndex !== targetIndex) {
        // Remove o item da posição original
        props.nodes.splice(draggedIndex, 1);
        // Insere o item na nova posição
        props.nodes.splice(targetIndex, 0, draggedItem);
        // Emite a árvore atualizada ao componente pai
        emit('node-reorder', props.nodes);

        // Reseta os estados locais
        draggedItem = null;
        draggedIndex = null;
    }
};






// Função para alternar o estado de abertura dos nós
const toggleNode = (id, node) => {
    if (openNodes.value.has(id)) {
        openNodes.value.delete(id);
    } else {
        openNodes.value.add(id);
    }
    emit('node-click', node);
};

// Função para verificar se um nó está aberto
const isOpen = (id) => openNodes.value.has(id);

// Normalizar nodes para tratar o objeto raiz como um array
const normalizedNodes = computed(() => (Array.isArray(props.nodes) ? props.nodes : [props.nodes]));


// Função para salvar os dados no backend
const saveReorderedData = async (data) => {
  await $fetch('/api/save-nodes', {
    method: 'POST',
    body: { nodes: data },
  });
};
</script>
<style scoped>
li {
    cursor: grab;
}

li:active {
    cursor: grabbing;
    opacity: 0.5;
}

li.dragging {
    background-color: #4a5568; /* Cinza escuro */
    color: white;
}

</style>