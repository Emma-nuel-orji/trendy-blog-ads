/*! This file is auto-generated */
(()=>{"use strict";var e={d:(o,t)=>{for(var n in t)e.o(t,n)&&!e.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:t[n]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{createBlobURL:()=>n,downloadBlob:()=>c,getBlobByURL:()=>r,getBlobTypeByURL:()=>d,isBlobURL:()=>l,revokeBlobURL:()=>i});const t={};function n(e){const o=window.URL.createObjectURL(e);return t[o]=e,o}function r(e){return t[e]}function d(e){return r(e)?.type.split("/")[0]}function i(e){t[e]&&window.URL.revokeObjectURL(e),delete t[e]}function l(e){return!(!e||!e.indexOf)&&0===e.indexOf("blob:")}function c(e,o,t=""){if(!e||!o)return;const n=new window.Blob([o],{type:t}),r=window.URL.createObjectURL(n),d=document.createElement("a");d.href=r,d.download=e,d.style.display="none",document.body.appendChild(d),d.click(),document.body.removeChild(d),window.URL.revokeObjectURL(r)}(window.wp=window.wp||{}).blob=o})();