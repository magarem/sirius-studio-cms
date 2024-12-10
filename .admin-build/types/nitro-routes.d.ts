// Generated by nitro
import type { Serialize, Simplify } from "nitropack/types";
declare module "nitropack/types" {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/add-node': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/add-node').default>>>>
    }
    '/api/compileContent': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/compileContent').default>>>>
    }
    '/api/conteudo/:id': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/conteudo/[id]').default>>>>
    }
    '/api/findItemByPath': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/findItemByPath').default>>>>
    }
    '/api/generate': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/generate.post').default>>>>
    }
    '/api/get-node': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/get-node').default>>>>
    }
    '/api/getNode': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/getNode').default>>>>
    }
    '/api/getNodeByPath': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/getNodeByPath').default>>>>
    }
    '/api/getNodeByPath/**:path': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/getNodeByPath/[...path]').default>>>>
    }
    '/api/getPage': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/getPage').default>>>>
    }
    '/api/getRecord': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/getRecord').default>>>>
    }
    '/api/manage-node': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/manage-node').default>>>>
    }
    '/api/manage-sqlite': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/manage-sqlite').default>>>>
    }
    '/api/nodes': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/nodes').default>>>>
    }
    '/api/parse-frontmatter': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/parse-frontmatter.post').default>>>>
    }
    '/api/save-nodes': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/save-nodes.post').default>>>>
    }
    '/api/upsert-sqlite': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/upsert-sqlite').default>>>>
    }
    '/api/upsertNode': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/upsertNode').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
    '/api/_nuxt_icon/:collection': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@nuxt/icon/dist/runtime/server/api').default>>>>
    }
    '/api/_content/query/:qid/**:params': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/query/:qid': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/query': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/cache.json': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@nuxt/content/dist/runtime/server/api/cache').default>>>>
    }
    '/api/_content/navigation/:qid/**:params': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
    '/api/_content/navigation/:qid': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
    '/api/_content/navigation': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
  }
}
export {}