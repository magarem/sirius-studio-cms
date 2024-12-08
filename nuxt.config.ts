import extractPathsAsync from "./scripts/extractPathsAsync";
import {defineNuxtConfig} from "nuxt/config";
export default defineNuxtConfig(async () => {
  const routes = await extractPathsAsync();
  console.log("routes:", routes);
  const isGenerate = process.argv.includes("generate");
  console.log("process.argv:", process.argv);
  // const apiRoutes = routes.map(item=>"/api/getNodeByPath" + item)
  // console.log("routes.map:", apiRoutes);

  return {
    runtimeConfig: {
      public: {
        isGenerate // Define se é build ou generate
      }
    },
    compatibilityDate: "2024-04-03",
    nitro: {
      prerender: {
        ignore: [
          "/treeview" // Exclui a página /treeview
        ],
        routes: [
          ...routes,
          "/api/nodes"
        ] 
      },
      output: {
        dir: isGenerate
          ? "site"
          : "admin", // Diretórios separados
        publicDir: isGenerate
          ? "site/public"
          : "admin/public",
        serverDir: isGenerate
          ? "site/server"
          : "admin/server"
      }
    },
    generate: {
      routes,
      dir: "site" // Diretório para o site estático
    },
    buildDir: isGenerate
      ? ".site-build"
      : ".admin-build", // Diferentes diretórios temporários
    devtools: {
      enabled: true
    },
    css: ["~/assets/css/main.css"],
    content: {
      documentDriven: false
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    },
    modules: ["@nuxt/icon", "@nuxtjs/tailwindcss", "@nuxt/content"]
  };
});
