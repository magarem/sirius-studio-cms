<template>
  <div class="flex flex-col min-h-screen">
    <!-- Barra de Navegação -->
    <header class="bg-gray-800 text-white py-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Meu Site</h1>
        <nav class="bg-gray-800 text-white p-4">
          <ul class="flex space-x-4">
            <li
              v-for="item in menuItems"
              :key="item._id"
              class="relative group"
            >
              <nuxt-link
                :external="isGenerate"
                :to="item._path"
                class="hover:underline hover:text-blue-400"
              >
                {{ item.label }}
              </nuxt-link>
              <!-- Submenu -->
              <ul
                v-if="item.children && item.children.length"
                class="absolute left-0 mt-1 bg-gray-700 text-white rounded shadow-lg hidden group-hover:block"
              >
                <MenuItem
                  v-for="child in item.children"
                  :key="child._id"
                  :item="child"
                />
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="flex-1 container mx-auto pt-8 pb-0">
      <Breadcrumbs />
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-6">
      <div class="container mx-auto text-center">
        <p>
          &copy; {{ new Date().getFullYear() }} Meu Site. Todos os direitos
          reservados.
        </p>
        <p>
          Feito com <span class="text-red-500">❤</span> por
          <a href="https://meusite.com" class="text-blue-400 hover:underline"
            >Meu Nome</a
          >.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MenuItem from "@/components/MenuItem.vue"; // Componente recursivo
const config = useRuntimeConfig();
console.log(config.public.isGenerate);
const isGenerate = ref(config.public.isGenerate);

const menuItems = ref([]);

const fetchMenuData = async () => {
  try {
    // Carrega o JSON de nodes
    // const data = await $fetch("/data/nodes.json");
    const data = await $fetch("/api/nodes");
    // Prepara o menu com os subníveis
    menuItems.value = data.children.map(node => ({
      _id: node._id,
      label: node.label,
      _path: node._path,
      children: node.children || []
    }));
  } catch (error) {
    console.error("Erro ao carregar o menu:", error);
  }
};

// Carrega os dados do menu ao montar o componente
onMounted(() => {
  fetchMenuData();
});
</script>

<style scoped>
/* Estilo adicional para o menu */
.container {
  max-width: 800px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  position: relative;
}

nav ul ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: none;
}

.group:hover ul {
  display: block;
}
</style>
