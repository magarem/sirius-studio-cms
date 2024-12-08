import _sfc_main$1 from './ContentRenderer-DNu4jE6i.mjs';
import { ref, withAsyncContext, resolveComponent, unref, createVNode, resolveDynamicComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import MarkdownIt from 'markdown-it';
import { useRoute } from 'vue-router';
import { _ as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { u as useAsyncData } from './asyncData-OL5apFi5.mjs';
import { q as queryContent } from './query-CoHg93T8.mjs';
import './ContentRendererMarkdown-TS2RkINj.mjs';
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
import 'property-information';
import './node-hwMnPqaI.mjs';
import './preview-DBzy3xpV.mjs';
import 'unhead';
import '@unhead/shared';
import '@iconify/vue';

const _sfc_main = {
  __name: "[...path]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b;
    let __temp, __restore;
    const config = useRuntimeConfig();
    console.log(config.public.isGenerate);
    const route = useRoute();
    const isGenerate = ref(config.public.isGenerate);
    const frontmatter = ref({});
    const item = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const pathChildrens = ref([]);
    const tela = ref([]);
    const parsedContent = ref([]);
    let components_list = [];
    const data = ref(null);
    if (isGenerate.value) {
      console.log("!!!");
      const { data: fetchedData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
        "hello",
        () => {
          var _a2;
          return queryContent(`/${((_a2 = route.params.path) == null ? void 0 : _a2.join("/")) || ""}`).findOne();
        }
      )), __temp = await __temp, __restore(), __temp);
      data.value = fetchedData.value;
      const folderPath = `/${(_a = route.params.path) == null ? void 0 : _a.join("/")}`;
      pathChildrens.value = ([__temp, __restore] = withAsyncContext(() => queryContent(folderPath).where({ _path: { $ne: data.value._path } }).sort("title", "asc").find()), __temp = await __temp, __restore(), __temp);
      tela.value = pathChildrens.value.map((item2) => [item2.title, item2._path]);
      console.log((_b = route.params.path) == null ? void 0 : _b.join("/"));
    } else {
      let replaceMultipleWords = function(string, wordsToReplace, replacement) {
        if (!Array.isArray(wordsToReplace)) {
          throw new Error("O segundo argumento deve ser um array.");
        }
        const regex = new RegExp(wordsToReplace.join("|"), "g");
        return string.replace(regex, replacement);
      }, extractComponentNames = function(markdown) {
        const componentRegex = /<([A-Z][A-Za-z0-9]*)\b[^>]*>/g;
        const componentNames = /* @__PURE__ */ new Set();
        let match;
        while ((match = componentRegex.exec(markdown)) !== null) {
          componentNames.add(match[1]);
        }
        return Array.from(componentNames);
      };
      console.log("build!");
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true
      });
      console.log("111>>>>");
      const cleanRenderedHTML = (html) => {
        return replaceMultipleWords(html, components_list, "");
      };
      const parseMarkdownWithComponents = (markdown) => {
        const componentRegex = /<([A-Z][A-Za-z0-9]*)\b([^>]*)>(.*?)<\/\1>/gs;
        const replacedMarkdown = markdown.replace(
          componentRegex,
          (_, name) => `[[COMPONENT-${name}-${parsedContent.value.length}]]`
        );
        const htmlParts = md.render(replacedMarkdown).split(/\[\[COMPONENT-(.+?)-(\d+)\]\]/);
        parsedContent.value = htmlParts.map((part, index) => {
          if (index % 3 === 2) {
            const componentName = htmlParts[index - 1];
            const componentIndex = parseInt(part, 10);
            const { name, props, content } = extractComponentData(
              markdown,
              componentName,
              componentIndex
            );
            return {
              type: "component",
              name: resolveComponent(name),
              // Certifica que está resolvendo corretamente
              props,
              content
            };
          }
          return { type: "text", content: cleanRenderedHTML(part) };
        });
      };
      const extractComponentData = (markdown, componentName, componentIndex) => {
        const componentRegex = new RegExp(
          `<${componentName}\\b([^>]*)>(.*?)</${componentName}>`,
          "gs"
        );
        const match = Array.from(markdown.matchAll(componentRegex))[componentIndex];
        if (!match) return null;
        const [, attrs, content] = match;
        return {
          name: componentName,
          props: extractProps(attrs),
          content: content.trim()
        };
      };
      const extractProps = (attributesString) => {
        const props = {};
        const attributesRegex = /([a-zA-Z0-9-]+)="([^"]*)"/g;
        let match;
        while (match = attributesRegex.exec(attributesString)) {
          props[match[1]] = match[2];
        }
        return props;
      };
      async function fetchData() {
        var _a2, _b2;
        try {
          loading.value = true;
          error.value = null;
          const _path = `/${route.params.path.join("/") || ""}`;
          const data2 = await $fetch(`/api/findItemByPath`, {
            params: { _path }
          });
          item.value = data2.body.data;
          frontmatter.value = item.value.frontmatter;
          components_list = extractComponentNames(item.value.content);
          console.log(">>>>");
          parseMarkdownWithComponents(item.value.content || "");
        } catch (err) {
          console.error(err);
          error.value = ((_b2 = (_a2 = err == null ? void 0 : err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b2.message) || "Erro ao carregar o item.";
        } finally {
          loading.value = false;
        }
      }
      fetchData();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-9d96bbaa>`);
      if (unref(isGenerate)) {
        _push(`<div data-v-9d96bbaa>`);
        _push(ssrRenderComponent(_component_ContentRenderer, {
          value: unref(data),
          class: "content-styled"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="container py-1" data-v-9d96bbaa>`);
        if (unref(loading)) {
          _push(`<div class="text-gray-500" data-v-9d96bbaa>Carregando...</div>`);
        } else if (unref(error)) {
          _push(`<div class="text-red-500" data-v-9d96bbaa>${ssrInterpolate(unref(error))}</div>`);
        } else {
          _push(`<div data-v-9d96bbaa>`);
          {
            _push(`<!---->`);
          }
          _push(`<div class="_p-4 rounded prose _-mt-[10px]" data-v-9d96bbaa><!--[-->`);
          ssrRenderList(unref(parsedContent), (part, index) => {
            var _a2;
            _push(`<!--[-->`);
            if (part.type === "component") {
              ssrRenderVNode(_push, createVNode(resolveDynamicComponent(part.name), mergeProps({ ref_for: true }, part.props), {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(part.content)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(part.content), 1)
                    ];
                  }
                }),
                _: 2
              }), _parent);
            } else {
              _push(`<span class="content-styled" data-v-9d96bbaa>${(_a2 = part.content) != null ? _a2 : ""}</span>`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></div></div>`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...path].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____path_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9d96bbaa"]]);

export { ____path_ as default };
//# sourceMappingURL=_...path_-COw_1R5F.mjs.map
