import{_ as v}from"./y-44xBUM.js";import{_ as M,e as N,n as B,o as t,c as n,a as o,h as m,b,w as f,d as c,i as k,F as x,j as g,t as h,k as w,u as G,r as y,af as j,B as C}from"./CJXs7yOK.js";const F={"aria-label":"breadcrumb",class:"breadcrumb"},S={key:0},V={key:0},D={__name:"Breadcrumbs",setup(r){const l=N(),u=B(()=>{const i=l.path.split("/").filter(Boolean);return i.map((s,e)=>{const a="/"+i.slice(0,e+1).join("/");return{label:decodeURIComponent(s).replace(/-/g," "),path:a}})}),d=B(()=>l.path==="/");return(i,s)=>{const e=v;return t(),n("nav",F,[o("ol",null,[m(d)?k("",!0):(t(),n("li",S,[b(e,{to:"/"},{default:f(()=>s[0]||(s[0]=[c("Home")])),_:1})])),(t(!0),n(x,null,g(m(u),(a,p)=>(t(),n("li",{key:p},[p===m(u).length-1?(t(),n("span",V,h(a.label),1)):(t(),w(e,{key:1,to:a.path},{default:f(()=>[c(h(a.label),1)]),_:2},1032,["to"]))]))),128))])])}}},R=M(D,[["__scopeId","data-v-0092138c"]]),E={class:"relative group"},H={key:0,class:"absolute left-full top-0 mt-1 bg-gray-700 text-white rounded shadow-lg hidden group-hover:block"},I={__name:"MenuItem",props:{item:{type:Object,required:!0}},setup(r){const l=G();console.log(l.public.isGenerate);const u=y(l.public.isGenerate);return(d,i)=>{const s=v,e=I;return t(),n("li",E,[b(s,{external:m(u),to:r.item._path,class:"block px-4 py-2 hover:bg-gray-600 hover:text-blue-400"},{default:f(()=>[c(h(r.item.label),1)]),_:1},8,["external","to"]),r.item.children&&r.item.children.length?(t(),n("ul",H,[(t(!0),n(x,null,g(r.item.children,a=>(t(),w(e,{key:a._id,item:a},null,8,["item"]))),128))])):k("",!0)])}}},T={class:"flex flex-col min-h-screen"},q={class:"bg-gray-800 text-white py-4"},A={class:"container mx-auto flex justify-between items-center"},L={class:"bg-gray-800 text-white p-4"},O={class:"flex space-x-4"},U={key:0,class:"absolute left-0 mt-1 bg-gray-700 text-white rounded shadow-lg hidden group-hover:block"},Y={class:"flex-1 container mx-auto pt-8 pb-0"},z={class:"bg-gray-900 text-gray-400 py-6"},J={class:"container mx-auto text-center"},K={__name:"default",setup(r){const l=G();console.log(l.public.isGenerate);const u=y(l.public.isGenerate),d=y([]),i=async()=>{try{const s=await $fetch("/api/nodes");d.value=s.children.map(e=>({_id:e._id,label:e.label,_path:e._path,children:e.children||[]}))}catch(s){console.error("Erro ao carregar o menu:",s)}};return j(()=>{i()}),(s,e)=>{const a=v,p=R;return t(),n("div",T,[o("header",q,[o("div",A,[e[0]||(e[0]=o("h1",{class:"text-xl font-bold"},"Meu Site",-1)),o("nav",L,[o("ul",O,[(t(!0),n(x,null,g(d.value,_=>(t(),n("li",{key:_._id,class:"relative group"},[b(a,{external:u.value,to:_._path,class:"hover:underline hover:text-blue-400"},{default:f(()=>[c(h(_.label),1)]),_:2},1032,["external","to"]),_.children&&_.children.length?(t(),n("ul",U,[(t(!0),n(x,null,g(_.children,$=>(t(),w(I,{key:$._id,item:$},null,8,["item"]))),128))])):k("",!0)]))),128))])])])]),o("main",Y,[b(p),C(s.$slots,"default",{},void 0,!0)]),o("footer",z,[o("div",J,[o("p",null," © "+h(new Date().getFullYear())+" Meu Site. Todos os direitos reservados. ",1),e[1]||(e[1]=o("p",null,[c(" Feito com "),o("span",{class:"text-red-500"},"❤"),c(" por "),o("a",{href:"https://meusite.com",class:"text-blue-400 hover:underline"},"Meu Nome"),c(". ")],-1))])])])}}},W=M(K,[["__scopeId","data-v-dceea405"]]);export{W as default};
