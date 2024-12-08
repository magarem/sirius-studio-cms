<template>
  <li class="relative group">
    <!-- <RouterLink
        :to="item._path"
        class="block px-4 py-2 hover:bg-gray-600 hover:text-blue-400"
      >
        {{ item.label }}
      </RouterLink> -->
    <nuxt-link
      :external="isGenerate"
      :to="item._path"
      class="block px-4 py-2 hover:bg-gray-600 hover:text-blue-400"
    >
      {{ item.label }}
    </nuxt-link>
    <ul
      v-if="item.children && item.children.length"
      class="absolute left-full top-0 mt-1 bg-gray-700 text-white rounded shadow-lg hidden group-hover:block"
    >
      <MenuItem v-for="child in item.children" :key="child._id" :item="child" />
    </ul>
  </li>
</template>

<script setup>
definePageMeta({
  layout: false // Ignorar layout
});

const config = useRuntimeConfig();
console.log(config.public.isGenerate);
const isGenerate = ref(config.public.isGenerate);
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>
