import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { ref, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { u as useAsyncData } from './asyncData-OL5apFi5.mjs';
import { q as queryContent } from './query-CoHg93T8.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';
import './preview-DBzy3xpV.mjs';
import 'unhead';
import '@unhead/shared';
import '@iconify/vue';

const _sfc_main = {
  __name: "ChildLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const tela = ref([]);
    ref([]);
    const children = ref([]);
    const route = useRoute();
    console.log("route.params.path:", route.params.path);
    const fetchChildren = async (parentPath2) => {
      var _a;
      try {
        const folderPath = `/${(_a = route.params.path) == null ? void 0 : _a.join("/")}`;
        console.log("folderPath:", folderPath);
        const { data: pathChildrens, error } = await useAsyncData(
          () => queryContent(folderPath).where({ _path: { $ne: folderPath } }).sort("title", "asc").find(),
          "$HbAESKaaoZ"
        );
        console.log("pathChildrens>>", pathChildrens.value);
        tela.value = pathChildrens.value.map((item) => [item.title, item._path]);
        const path = parentPath2 || "";
      } catch (error) {
        console.error("Erro ao buscar os filhos:", error);
      }
    };
    const parentPath = route.path.slice(1);
    fetchChildren(parentPath);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d41e23de><ul data-v-d41e23de><!--[-->`);
      ssrRenderList(tela.value, (item) => {
        _push(`<li data-v-d41e23de><a${ssrRenderAttr("href", item[1])} data-v-d41e23de>${ssrInterpolate(item[0])}</a></li>`);
      });
      _push(`<!--]--></ul>`);
      if (children.value.length === 0) {
        _push(`<div class="text-gray-500" data-v-d41e23de></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/ChildLinks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ChildLinks = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d41e23de"]]);

export { ChildLinks as default };
//# sourceMappingURL=ChildLinks-jCN6gek3.mjs.map
