<template>
  <div class="alert content-styled bg-blue-100 text-blue-800 p-4 rounded">
    <h1>{{ props.message }}</h1>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: false
  }
});
</script>

<style scoped>
.alert {
  border-left: 5px solid #007bff;
}

.content-styled h1 {
  font-size: 2rem;
  color: #4a90e2;
}
.content-styled p {
  line-height: 1.8;
  margin-bottom: 1rem;
}
.content-styled ul {
  list-style-type: square;
  margin-left: 1.5rem;
}
</style>
