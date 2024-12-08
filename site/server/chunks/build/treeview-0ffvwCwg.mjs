import { ref, reactive, mergeProps, computed, unref, useSSRContext } from 'file:///home/maga/dev/sirius5/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from 'file:///home/maga/dev/sirius5/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useAsyncData } from './asyncData-BoUfFElq.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/ufo/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/unified/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/remark-parse/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/remark-rehype/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/remark-mdc/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/defu/dist/defu.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/remark-gfm/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/rehype-external-links/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/rehype-sort-attributes/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/rehype-raw/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/detab/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/scule/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/micromark-util-sanitize-uri/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/hast-util-to-string/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/github-slugger/index.js';
import 'file:///home/maga/dev/sirius5/node_modules/destr/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/hookable/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/klona/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/unstorage/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/unstorage/drivers/fs.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/radix3/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/unctx/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///home/maga/dev/sirius5/node_modules/pathe/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/@iconify/utils/lib/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/ohash/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/unenv/runtime/npm/consola.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/unhead/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/@iconify/vue/dist/iconify.mjs';

const _sfc_main$1 = {
  __name: "TreeView",
  __ssrInlineRender: true,
  props: {
    nodes: {
      type: [Array, Object],
      // Aceita Array ou Objeto
      required: true
    },
    level: {
      type: Number,
      default: 0
      // Nível inicial
    }
  },
  emits: ["node-click", "node-reorder"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const openNodes = ref(/* @__PURE__ */ new Set());
    const emit = __emit;
    const isOpen = (id) => openNodes.value.has(id);
    const normalizedNodes = computed(() => Array.isArray(props.nodes) ? props.nodes : [props.nodes]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TreeView = TreeView;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-c355017c><ul data-v-c355017c><!--[-->`);
      ssrRenderList(unref(normalizedNodes), (node, index) => {
        _push(`<li draggable="true" style="${ssrRenderStyle({ paddingLeft: `${__props.level * 7}px` })}" _class="p-2 border mb-1 bg-gray-800 text-white rounded" data-v-c355017c><div class="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded cursor-pointer" data-v-c355017c>`);
        if ((node == null ? void 0 : node.children) && (node == null ? void 0 : node.children.length)) {
          _push(`<span class="text-blue-500" data-v-c355017c>${ssrInterpolate(isOpen(node == null ? void 0 : node._id) ? "-" : "+")}</span>`);
        } else {
          _push(`<span class="text-gray-400" data-v-c355017c>\u2022</span>`);
        }
        _push(`<span class="${ssrRenderClass({ "font-bold text-black": (node == null ? void 0 : node._type) === "folder", "text-gray-700": (node == null ? void 0 : node._type) === "page" })}" data-v-c355017c>${ssrInterpolate(node == null ? void 0 : node.label)}</span></div>`);
        if ((node == null ? void 0 : node.children) && (node == null ? void 0 : node.children.length) && isOpen(node == null ? void 0 : node._id)) {
          _push(ssrRenderComponent(_component_TreeView, {
            onNodeClick: ($event) => emit("node-click", $event),
            nodes: node == null ? void 0 : node.children,
            level: __props.level + 1,
            onNodeReorder: ($event) => emit("node-reorder", props.nodes)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TreeView.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TreeView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c355017c"]]);
const _sfc_main = {
  __name: "treeview",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    let data = ref();
    ref();
    const nodeSelected = ref({
      _id: "",
      label: "",
      _slug: "",
      _image: "",
      children: [],
      content: ""
    });
    ref([]);
    const btnMover_label = ref("Mover");
    const btnCopiar_label = ref("Copiar");
    ref(null);
    const activeTabContent = ref("");
    const refreshTree = ref(0);
    let flgTab = ref("metatags");
    const compiler = reactive({
      loading: false,
      message: "",
      async compileSite() {
        this.loading = true;
        this.message = "";
        try {
          alert();
          const response = await fetch("/api/compileContent", {
            method: "POST"
          });
          const data2 = await response.json();
          if (data2.success) {
            this.message = "Site compilado com sucesso!";
          } else {
            this.message = "Erro ao compilar o site.";
          }
        } catch (error) {
          console.error("Erro:", error);
          this.message = "Erro ao compilar o site.";
        } finally {
          this.loading = false;
        }
      }
    });
    const saveReorderedTree = async (updatedTree) => {
      try {
        data.value = updatedTree;
        await $fetch("/api/save-nodes", {
          method: "POST",
          body: { nodes: updatedTree }
        });
        console.log("\xC1rvore salva com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar a \xE1rvore:", error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await $fetch("/api/nodes");
        data.value = await response;
        console.log(data.value);
      } catch (error) {
        console.error("Failed to fetch JSON:", error);
      }
    };
    const handleNodeClick = async (node) => {
      var _a, _b;
      if (node == null ? void 0 : node._id) {
        const { data: data2 } = await useAsyncData(
          "nodeDetails",
          () => $fetch(`/api/getNode?_id=${node._id}`)
        );
        const { data: data22 } = await useAsyncData(
          "recordDetails",
          () => $fetch(`/api/getRecord?_id=${node._id}`)
        );
        nodeSelected.value = {};
        nodeSelected.value = { ...data2.value.node, ...(_a = data22.value) == null ? void 0 : _a.data };
        activeTabContent.value = (_b = data22.value) == null ? void 0 : _b.data.content.replace(/\\n/g, "\n");
      }
    };
    fetchData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen flex flex-col bg-gray-900 text-white" }, _attrs))} data-v-e872c904><header class="h-12 bg-gray-800 flex items-center px-4" data-v-e872c904><div class="text-lg" data-v-e872c904>C\xEDrius</div></header><div class="flex flex-1 overflow-hidden" data-v-e872c904><aside class="w-64 bg-gray-100 p-1 border-r border-gray-300 hidden md:block" data-v-e872c904>`);
      _push(ssrRenderComponent(TreeView, {
        key: unref(refreshTree),
        nodes: unref(data),
        onNodeClick: handleNodeClick,
        onNodeReorder: saveReorderedTree
      }, null, _parent));
      _push(`</aside><main class="flex-1 bg-gray-900 overflow-hidden flex flex-col" data-v-e872c904><div class="ml-4" data-v-e872c904><button data-v-e872c904>Refresh</button><button type="button" data-v-e872c904>Metatags</button><button type="button" data-v-e872c904>Conte\xFAdo</button><button${ssrIncludeBooleanAttr(unref(compiler).loading) ? " disabled" : ""} data-v-e872c904>${ssrInterpolate(unref(compiler).loading ? "Compilando..." : "Compilar Site")}</button></div><div class="flex-1 overflow-auto p-4 bg-gray-900" data-v-e872c904><form data-v-e872c904><div class="mb-4" style="${ssrRenderStyle({ display: "none" })}" data-v-e872c904><label for="_id" class="block text-sm font-medium text-gray-200" data-v-e872c904>ID</label><input${ssrRenderAttr("value", unref(nodeSelected)._id)} type="text" id="label" class="mt-1 block w-full bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required data-v-e872c904></div><div class="mb-2" data-v-e872c904><label for="label" class="block text-sm font-medium text-gray-200" data-v-e872c904>Label</label><input${ssrRenderAttr("value", unref(nodeSelected).label)} type="text" id="label" class="mt-1 block w-full bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required data-v-e872c904></div><div class="mb-4" data-v-e872c904><div class="inline-flex" data-v-e872c904><button class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l" style="${ssrRenderStyle(unref(nodeSelected)._id ? null : { display: "none" })}" type="button" data-v-e872c904> Novo </button><button class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4" style="${ssrRenderStyle(unref(nodeSelected)._id ? null : { display: "none" })}"${ssrIncludeBooleanAttr(!unref(nodeSelected)._id) ? " disabled" : ""} type="button" data-v-e872c904> Excluir </button><button class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4" style="${ssrRenderStyle(unref(nodeSelected)._id ? null : { display: "none" })}"${ssrIncludeBooleanAttr(!unref(nodeSelected)._id) ? " disabled" : ""} type="button" data-v-e872c904>${ssrInterpolate(unref(btnMover_label))}</button><button class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r" style="${ssrRenderStyle(unref(nodeSelected)._id ? null : { display: "none" })}"${ssrIncludeBooleanAttr(!unref(nodeSelected)._id) ? " disabled" : ""} type="button" data-v-e872c904>${ssrInterpolate(unref(btnCopiar_label))}</button></div></div>`);
      if (unref(flgTab) === "metatags") {
        _push(`<div data-v-e872c904><div class="mb-4" data-v-e872c904><label for="label" class="block text-sm font-medium text-gray-200" data-v-e872c904>Slug</label><input${ssrRenderAttr("value", unref(nodeSelected)._slug)} type="text" id="label" class="mt-1 block w-full bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required data-v-e872c904></div><div class="mb-4" data-v-e872c904><label for="type" class="block text-sm font-medium text-gray-200" data-v-e872c904>Tipo</label><input${ssrRenderAttr("value", unref(nodeSelected)._type)} type="text" id="type" maxlength="20" class="mt-1 block w-full bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required data-v-e872c904></div><div class="mb-4" data-v-e872c904><label for="path" class="block text-sm font-medium text-gray-200" data-v-e872c904>Path</label><input${ssrRenderAttr("value", unref(nodeSelected)._path)} type="text" id="path" class="mt-1 block w-full bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" data-v-e872c904></div><div class="mb-4" data-v-e872c904><label for="image" class="block text-sm font-medium text-gray-200" data-v-e872c904>Image</label><input${ssrRenderAttr("value", unref(nodeSelected)._image)} type="text" id="image" class="mt-1 block w-full bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" data-v-e872c904></div><div class="mb-4" style="${ssrRenderStyle({ display: "none" })}" data-v-e872c904><label for="type" class="block text-sm font-medium text-gray-200" data-v-e872c904>Parent_id</label><input${ssrRenderAttr("value", unref(nodeSelected).parentId)} type="text" id="type" maxlength="20" class="mt-1 block w-full bg-gray-800 text-white p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" data-v-e872c904></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="h-full" data-v-e872c904><label for="type" class="mb-2 block text-sm font-medium text-gray-200" data-v-e872c904>Conte\xFAdo</label><textarea class="w-full h-full min-h-[250px] bg-gray-800 text-white border-none resize-none p-2 rounded" data-v-e872c904>${ssrInterpolate(unref(activeTabContent))}</textarea></div><button type="submit" data-v-e872c904>Salvar</button></form></div></main><aside class="w-64 bg-gray-100 p-1 border-r border-gray-300 hidden md:block" data-v-e872c904></aside></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/treeview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const treeview = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e872c904"]]);

export { treeview as default };
//# sourceMappingURL=treeview-0ffvwCwg.mjs.map
