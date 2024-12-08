<template>
    <div class="alert bg-blue-100 text-orange-400 p-4 rounded">
     
        <slot />
    </div>
  </template>
  
  <script setup>

const props = defineProps({
    message: {
        type: String,
        required: false,
    },
});

  </script>
  
  <style scoped>
  .alert {
    border-left: 5px solid #ff0000;
  }
  </style>
  