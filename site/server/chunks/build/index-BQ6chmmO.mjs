import { defineComponent, computed, h, onServerPrefetch, Suspense } from 'file:///home/maga/dev/sirius-studio-cms/node_modules/vue/index.mjs';
import { getIcon, loadIcon as loadIcon$1, Icon } from 'file:///home/maga/dev/sirius-studio-cms/node_modules/@iconify/vue/dist/iconify.mjs';
import { getIconCSS } from 'file:///home/maga/dev/sirius-studio-cms/node_modules/@iconify/utils/lib/css/icon.mjs';
import { b as useNuxtApp, j as useAppConfig, u as useRuntimeConfig } from './server.mjs';
import { u as useHead } from './index-DyoJ9r-N.mjs';
import { u as useAsyncData } from './asyncData-BoUfFElq.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/h3/dist/index.mjs';
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/ufo/dist/index.mjs';
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
import 'file:///home/maga/dev/sirius-studio-cms/node_modules/vue/server-renderer/index.mjs';

async function loadIcon(name, timeout) {
  if (!name)
    return null;
  const _icon = getIcon(name);
  if (_icon)
    return _icon;
  let timeoutWarn;
  const load = loadIcon$1(name).catch(() => {
    console.warn(`[Icon] failed to load icon \`${name}\``);
    return null;
  });
  if (timeout > 0)
    await Promise.race([
      load,
      new Promise((resolve) => {
        timeoutWarn = setTimeout(() => {
          console.warn(`[Icon] loading icon \`${name}\` timed out after ${timeout}ms`);
          resolve();
        }, timeout);
      })
    ]).finally(() => clearTimeout(timeoutWarn));
  else
    await load;
  return getIcon(name);
}
function useResolvedName(getName) {
  const options = useAppConfig().icon;
  const collections = (options.collections || []).sort((a, b) => b.length - a.length);
  return computed(() => {
    var _a;
    const name = getName();
    const bare = name.startsWith(options.cssSelectorPrefix) ? name.slice(options.cssSelectorPrefix.length) : name;
    const resolved = ((_a = options.aliases) == null ? void 0 : _a[bare]) || bare;
    if (!resolved.includes(":")) {
      const collection = collections.find((c) => resolved.startsWith(c + "-"));
      return collection ? collection + ":" + resolved.slice(collection.length + 1) : resolved;
    }
    return resolved;
  });
}
const SYMBOL_SERVER_CSS = "NUXT_ICONS_SERVER_CSS";
function escapeCssSelector(selector) {
  return selector.replace(/([^\w-])/g, "\\$1");
}
const NuxtIconCss = /* @__PURE__ */ defineComponent({
  name: "NuxtIconCss",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: Function,
      required: false
    }
  },
  setup(props) {
    var _a;
    const nuxt = useNuxtApp();
    const options = useAppConfig().icon;
    const cssClass = computed(() => props.name ? options.cssSelectorPrefix + props.name : "");
    const selector = computed(() => "." + escapeCssSelector(cssClass.value));
    function getCSS(icon, withLayer = true) {
      let iconSelector = selector.value;
      if (options.cssWherePseudo) {
        iconSelector = `:where(${iconSelector})`;
      }
      const css = getIconCSS(icon, {
        iconSelector,
        format: "compressed",
        customise: props.customize
      });
      if (options.cssLayer && withLayer) {
        return `@layer ${options.cssLayer} { ${css} }`;
      }
      return css;
    }
    {
      const configs = useRuntimeConfig().icon || {};
      if (!((_a = configs == null ? void 0 : configs.serverKnownCssClasses) == null ? void 0 : _a.includes(cssClass.value))) {
        onServerPrefetch(async () => {
          const icon = await loadIcon(props.name, options.fetchTimeout).catch(() => null);
          if (!icon)
            return null;
          let ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS];
          if (!ssrCSS) {
            ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS] = /* @__PURE__ */ new Map();
            nuxt.runWithContext(() => {
              useHead({
                style: [
                  () => {
                    const sep = "";
                    let css = Array.from(ssrCSS.values()).sort().join(sep);
                    if (options.cssLayer) {
                      css = `@layer ${options.cssLayer} {${sep}${css}${sep}}`;
                    }
                    return { innerHTML: css };
                  }
                ]
              }, {
                tagPriority: "low"
              });
            });
          }
          if (props.name && !ssrCSS.has(props.name)) {
            const css = getCSS(icon, false);
            ssrCSS.set(props.name, css);
          }
          return null;
        });
      }
    }
    return () => h("span", { class: ["iconify", cssClass.value] });
  }
});
const NuxtIconSvg = /* @__PURE__ */ defineComponent({
  name: "NuxtIconSvg",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: Function,
      required: false
    }
  },
  async setup(props, { slots }) {
    useNuxtApp();
    const options = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const storeKey = "i-" + name.value;
    if (name.value) {
      {
        useAsyncData(
          storeKey,
          () => loadIcon(name.value, options.fetchTimeout),
          { deep: false }
        );
      }
    }
    return () => h(Icon, {
      icon: name.value,
      ssr: true,
      // Iconify uses `customise`, where we expose `customize` for consistency
      customise: props.customize
    }, slots);
  }
});
const index = defineComponent({
  name: "NuxtIcon",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      required: false,
      default: null
    },
    customize: {
      type: Function,
      required: false
    },
    suspensible: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props, { slots, attrs }) {
    const nuxtApp = useNuxtApp();
    const runtimeOptions = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const component = computed(
      () => {
        var _a;
        return ((_a = nuxtApp.vueApp) == null ? void 0 : _a.component(name.value)) || ((props.mode || runtimeOptions.mode) === "svg" ? NuxtIconSvg : NuxtIconCss);
      }
    );
    const style = computed(() => {
      const size = props.size || runtimeOptions.size;
      return size ? { fontSize: Number.isNaN(+size) ? size : size + "px" } : null;
    });
    const customize = props.customize || runtimeOptions.customize;
    return () => h(
      Suspense,
      { suspensible: props.suspensible },
      {
        default: () => h(
          component.value,
          {
            ...runtimeOptions.attrs,
            ...attrs,
            name: name.value,
            class: [
              runtimeOptions.class,
              attrs.class
            ],
            style: [
              style.value,
              attrs.style
            ],
            customize
          },
          slots
        ),
        fallback: () => h("span", { class: "iconify iconify-loading" })
      }
    );
  }
});

export { index as default };
//# sourceMappingURL=index-BQ6chmmO.mjs.map
