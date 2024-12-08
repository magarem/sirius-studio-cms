import { _ as __nuxt_component_0 } from './nuxt-link-Doyn4RKF.mjs';
import { ref, mergeProps, withCtx, createTextVNode, toDisplayString, unref, computed, useSSRContext } from 'file:///home/maga/dev/sirius5/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'file:///home/maga/dev/sirius5/node_modules/vue/server-renderer/index.mjs';
import { useRoute } from 'file:///home/maga/dev/sirius5/node_modules/vue-router/dist/vue-router.node.mjs';
import { _ as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/ufo/dist/index.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
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
import 'file:///home/maga/dev/sirius5/node_modules/@iconify/vue/dist/iconify.mjs';

const _sfc_main$2 = {
  __name: "Breadcrumbs",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const breadcrumbs = computed(() => {
      const pathArray = route.path.split("/").filter(Boolean);
      return pathArray.map((segment, index) => {
        const path = "/" + pathArray.slice(0, index + 1).join("/");
        const label = decodeURIComponent(segment).replace(/-/g, " ");
        return { label, path };
      });
    });
    const isHome = computed(() => route.path === "/");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        "aria-label": "breadcrumb",
        class: "breadcrumb"
      }, _attrs))} data-v-0092138c><ol data-v-0092138c>`);
      if (!unref(isHome)) {
        _push(`<li data-v-0092138c>`);
        _push(ssrRenderComponent(_component_nuxt_link, { to: "/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(breadcrumbs), (crumb, index) => {
        _push(`<li data-v-0092138c>`);
        if (index === unref(breadcrumbs).length - 1) {
          _push(`<span data-v-0092138c>${ssrInterpolate(crumb.label)}</span>`);
        } else {
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: crumb.path
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(crumb.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(crumb.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ol></nav>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Breadcrumbs.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0092138c"]]);
const _sfc_main$1 = {
  __name: "MenuItem",
  __ssrInlineRender: true,
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const config = useRuntimeConfig();
    console.log(config.public.isGenerate);
    const isGenerate = ref(config.public.isGenerate);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      const _component_MenuItem = _sfc_main$1;
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "relative group" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        external: unref(isGenerate),
        to: __props.item._path,
        class: "block px-4 py-2 hover:bg-gray-600 hover:text-blue-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.item.label)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.item.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.item.children && __props.item.children.length) {
        _push(`<ul class="absolute left-full top-0 mt-1 bg-gray-700 text-white rounded shadow-lg hidden group-hover:block"><!--[-->`);
        ssrRenderList(__props.item.children, (child) => {
          _push(ssrRenderComponent(_component_MenuItem, {
            key: child._id,
            item: child
          }, null, _parent));
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MenuItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    console.log(config.public.isGenerate);
    const isGenerate = ref(config.public.isGenerate);
    const menuItems = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      const _component_Breadcrumbs = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col min-h-screen" }, _attrs))} data-v-dceea405><header class="bg-gray-800 text-white py-4" data-v-dceea405><div class="container mx-auto flex justify-between items-center" data-v-dceea405><h1 class="text-xl font-bold" data-v-dceea405>Meu Site</h1><nav class="bg-gray-800 text-white p-4" data-v-dceea405><ul class="flex space-x-4" data-v-dceea405><!--[-->`);
      ssrRenderList(menuItems.value, (item) => {
        _push(`<li class="relative group" data-v-dceea405>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          external: isGenerate.value,
          to: item._path,
          class: "hover:underline hover:text-blue-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        if (item.children && item.children.length) {
          _push(`<ul class="absolute left-0 mt-1 bg-gray-700 text-white rounded shadow-lg hidden group-hover:block" data-v-dceea405><!--[-->`);
          ssrRenderList(item.children, (child) => {
            _push(ssrRenderComponent(_sfc_main$1, {
              key: child._id,
              item: child
            }, null, _parent));
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav></div></header><main class="flex-1 container mx-auto pt-8 pb-0" data-v-dceea405>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-gray-900 text-gray-400 py-6" data-v-dceea405><div class="container mx-auto text-center" data-v-dceea405><p data-v-dceea405> \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Meu Site. Todos os direitos reservados. </p><p data-v-dceea405> Feito com <span class="text-red-500" data-v-dceea405>\u2764</span> por <a href="https://meusite.com" class="text-blue-400 hover:underline" data-v-dceea405>Meu Nome</a>. </p></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dceea405"]]);

export { _default as default };
//# sourceMappingURL=default-DWRP4zT1.mjs.map
