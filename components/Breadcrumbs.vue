<template>
    <nav aria-label="breadcrumb" class="breadcrumb">
      <ol>
        <li v-if="!isHome">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <span v-if="index === breadcrumbs.length - 1">{{ crumb.label }}</span>
          <nuxt-link v-else :to="crumb.path">{{ crumb.label }}</nuxt-link>
        </li>
      </ol>
    </nav>
  </template>
  
  <script setup>
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  
  const breadcrumbs = computed(() => {
    const pathArray = route.path.split("/").filter(Boolean);
  
    return pathArray.map((segment, index) => {
      const path = "/" + pathArray.slice(0, index + 1).join("/");
      const label = decodeURIComponent(segment).replace(/-/g, " ");
  
      return { label, path };
    });
  });
  
  // Verifica se a página atual é a home
  const isHome = computed(() => route.path === "/");
  </script>
  
  <style scoped>
  .breadcrumb ol {
    display: flex;
    list-style: none;
    padding: 0;
  }
  
  .breadcrumb ol li {
    display: inline;
  }
  
  .breadcrumb ol li:not(:last-child)::after {
    content: ">";
    margin: 0 0.5rem;
    color: #666;
  }
  </style>
  