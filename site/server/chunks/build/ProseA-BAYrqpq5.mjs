import { _ as __nuxt_component_0 } from './nuxt-link-Doyn4RKF.mjs';
import { defineComponent, mergeProps, withCtx, renderSlot, useSSRContext } from 'file:///home/maga/dev/sirius-studio-cms/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderSlot } from 'file:///home/maga/dev/sirius-studio-cms/node_modules/vue/server-renderer/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/ufo/dist/index.mjs';
import './server.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/h3/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/unified/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/remark-parse/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/remark-rehype/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/remark-mdc/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/defu/dist/defu.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/remark-gfm/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/rehype-external-links/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/rehype-sort-attributes/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/rehype-raw/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/detab/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/scule/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/micromark-util-sanitize-uri/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/hast-util-to-string/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/github-slugger/index.js';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/destr/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/hookable/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/klona/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/unstorage/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/unstorage/drivers/fs.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/radix3/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/unctx/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/pathe/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/@iconify/utils/lib/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/ohash/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/unenv/runtime/npm/consola.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/unhead/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/@iconify/vue/dist/iconify.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProseA",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      default: ""
    },
    target: {
      type: String,
      default: void 0,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        href: props.href,
        target: props.target
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProseA-BAYrqpq5.mjs.map
