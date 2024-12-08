import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'file:///home/maga/dev/sirius5/node_modules/vue/server-renderer/index.mjs';
import { ref, useSSRContext } from 'file:///home/maga/dev/sirius5/node_modules/vue/index.mjs';
import { useRoute } from 'file:///home/maga/dev/sirius5/node_modules/vue-router/dist/vue-router.node.mjs';
import { u as useAsyncData } from './asyncData-BoUfFElq.mjs';
import { q as queryContent } from './query-YPcIhk4w.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/ufo/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/ohash/dist/index.mjs';
import './preview-Bx0ME4K2.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/cookie-es/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/destr/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/klona/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
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
import 'file:///home/maga/dev/sirius5/node_modules/hookable/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/unenv/runtime/fetch/index.mjs';
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
import 'file:///home/maga/dev/sirius5/node_modules/unenv/runtime/npm/consola.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/unhead/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/@iconify/vue/dist/iconify.mjs';

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
//# sourceMappingURL=ChildLinks-DQqlcDGY.mjs.map
