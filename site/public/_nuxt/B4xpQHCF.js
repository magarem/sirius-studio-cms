const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./rXQOdwbr.js","./CJXs7yOK.js","./DtNhWe0n.js","./B3dQZfUN.js","./C-v3KzvZ.js"])))=>i.map(i=>d[i]);
import{h as f,u as m}from"./B3dQZfUN.js";import{u as v}from"./CnW6uLa9.js";import{u as l,R as d,S as g,T as y,A as h,G as _,H as w,J as p,U as C,n as P}from"./CJXs7yOK.js";import{q as $,w as c,e as x,s as N,j as T,u as E}from"./DtNhWe0n.js";import{_ as S}from"./y-44xBUM.js";const j=async t=>{const{content:e}=l().public;typeof(t==null?void 0:t.params)!="function"&&(t=$(t));const n=t.params(),o=e.experimental.stripQueryParameters?c(`/navigation/${`${f(n)}.${e.integrity}`}/${x(n)}.json`):c(`/navigation/${f(n)}.${e.integrity}.json`);if(N())return(await d(()=>import("./rXQOdwbr.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(i=>i.generateNavigation))(n);const a=await $fetch(o,{method:"GET",responseType:"json",params:e.experimental.stripQueryParameters?void 0:{_params:T(n),previewToken:m().getPreviewToken()}});if(typeof a=="string"&&a.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return a},R="$s";function b(...t){const e=typeof t[t.length-1]=="string"?t.pop():void 0;typeof t[0]!="string"&&t.unshift(e);const[n,o]=t;if(!n||typeof n!="string")throw new TypeError("[nuxt] [useState] key must be a string: "+n);if(o!==void 0&&typeof o!="function")throw new Error("[nuxt] [useState] init must be a function: "+o);const a=R+n,r=g(),i=y(r.payload.state,a);if(i.value===void 0&&o){const s=o();if(h(s))return r.payload.state[a]=s,s;i.value=s}return i}const A=_({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(t){const{query:e}=C(t),n=P(()=>{var a;return typeof((a=e.value)==null?void 0:a.params)=="function"?e.value.params():e.value});if(!n.value&&b("dd-navigation").value){const{navigation:a}=E();return{navigation:a}}const{data:o}=await v(`content-navigation-${f(n.value)}`,()=>j(n.value));return{navigation:o}},render(t){const e=w(),{navigation:n}=t,o=i=>p(S,{to:i._path},()=>i.title),a=(i,s)=>p("ul",s?{"data-level":s}:null,i.map(u=>u.children?p("li",null,[o(u),a(u.children,s+1)]):p("li",null,o(u)))),r=i=>a(i,0);return e!=null&&e.default?e.default({navigation:n,...this.$attrs}):r(n)}}),G=A;export{G as default};