<template>
    <div class="modal">
        <div class="modal-content">
            <h3>Editar Nó</h3>
            <!-- <input v-model="node.label" type="text" /> -->
            <button @click="close">Salvar</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    node: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["close"]);

const close = () => {
    emit("close");
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
}
.modal-content {
    width: 300px;
    height: 200px;
    background: white;
    padding: 20px;
    border-radius: 5px;
}
</style>
