(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const Ad="modulepreload",Rd=function(n){return"/thesis-track/"+n},Ga={},Sd=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(t.map(h=>{if(h=Rd(h),h in Ga)return;Ga[h]=!0;const d=h.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${p}`))return;const y=document.createElement("link");if(y.rel=d?"stylesheet":Ad,d||(y.as="script"),y.crossOrigin="",y.href=h,c&&y.setAttribute("nonce",c),document.head.appendChild(y),d)return new Promise((b,R)=>{y.addEventListener("load",b),y.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return r.then(a=>{for(const c of a||[])c.status==="rejected"&&o(c.reason);return e().catch(o)})};var Ka={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let r=n.charCodeAt(i);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},Pd=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const r=n[t++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){const o=n[t++];e[i++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=n[t++],a=n[t++],c=n[t++],h=((r&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;e[i++]=String.fromCharCode(55296+(h>>10)),e[i++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],a=n[t++];e[i++]=String.fromCharCode((r&15)<<12|(o&63)<<6|a&63)}}return e.join("")},dc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<n.length;r+=3){const o=n[r],a=r+1<n.length,c=a?n[r+1]:0,h=r+2<n.length,d=h?n[r+2]:0,p=o>>2,y=(o&3)<<4|c>>4;let b=(c&15)<<2|d>>6,R=d&63;h||(R=64,a||(b=64)),i.push(t[p],t[y],t[b],t[R])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(hc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Pd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<n.length;){const o=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const d=r<n.length?t[n.charAt(r)]:64;++r;const y=r<n.length?t[n.charAt(r)]:64;if(++r,o==null||c==null||d==null||y==null)throw new Cd;const b=o<<2|c>>4;if(i.push(b),d!==64){const R=c<<4&240|d>>2;if(i.push(R),y!==64){const D=d<<6&192|y;i.push(D)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Cd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const kd=function(n){const e=hc(n);return dc.encodeByteArray(e,!0)},Xi=function(n){return kd(n).replace(/\./g,"")},fc=function(n){try{return dc.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd=()=>Dd().__FIREBASE_DEFAULTS__,Vd=()=>{if(typeof process>"u"||typeof Ka>"u")return;const n=Ka.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Od=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&fc(n[1]);return e&&JSON.parse(e)},fr=()=>{try{return Nd()||Vd()||Od()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},pc=n=>{var e,t;return(t=(e=fr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Ld=n=>{const e=pc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},mc=()=>{var n;return(n=fr())===null||n===void 0?void 0:n.config},gc=n=>{var e;return(e=fr())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Md(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",r=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Xi(JSON.stringify(t)),Xi(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ud(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Te())}function Fd(){var n;const e=(n=fr())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Bd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function jd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function $d(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function qd(){const n=Te();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function zd(){return!Fd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Hd(){try{return typeof indexedDB=="object"}catch{return!1}}function Wd(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var o;e(((o=r.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gd="FirebaseError";class et extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Gd,Object.setPrototypeOf(this,et.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ti.prototype.create)}}class ti{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},r=`${this.service}/${e}`,o=this.errors[e],a=o?Kd(o,i):"Error",c=`${this.serviceName}: ${a} (${r}).`;return new et(r,c,i)}}function Kd(n,e){return n.replace(Qd,(t,i)=>{const r=e[i];return r!=null?String(r):`<${i}?>`})}const Qd=/\{\$([^}]+)}/g;function Jd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Yi(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const r of t){if(!i.includes(r))return!1;const o=n[r],a=e[r];if(Qa(o)&&Qa(a)){if(!Yi(o,a))return!1}else if(o!==a)return!1}for(const r of i)if(!t.includes(r))return!1;return!0}function Qa(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Xd(n,e){const t=new Yd(n,e);return t.subscribe.bind(t)}class Yd{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let r;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Zd(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:i},r.next===void 0&&(r.next=cs),r.error===void 0&&(r.error=cs),r.complete===void 0&&(r.complete=cs);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Zd(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function cs(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(n){return n&&n._delegate?n._delegate:n}class Nt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new xd;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(o){if(r)return null;throw o}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(nf(e))try{this.getOrInitializeService({instanceIdentifier:wt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:r});i.resolve(o)}catch{}}}}clearInstance(e=wt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=wt){return this.instances.has(e)}getOptions(e=wt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);i===c&&a.resolve(r)}return r}onInit(e,t){var i;const r=this.normalizeInstanceIdentifier(t),o=(i=this.onInitCallbacks.get(r))!==null&&i!==void 0?i:new Set;o.add(e),this.onInitCallbacks.set(r,o);const a=this.instances.get(r);return a&&e(a,r),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const r of i)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:tf(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=wt){return this.component?this.component.multipleInstances?e:wt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function tf(n){return n===wt?void 0:n}function nf(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ef(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})($||($={}));const sf={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},of=$.INFO,af={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},lf=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),r=af[e];if(r)console[r](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Js{constructor(e){this.name=e,this._logLevel=of,this._logHandler=lf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in $))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?sf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...e),this._logHandler(this,$.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...e),this._logHandler(this,$.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,$.INFO,...e),this._logHandler(this,$.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,$.WARN,...e),this._logHandler(this,$.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...e),this._logHandler(this,$.ERROR,...e)}}const cf=(n,e)=>e.some(t=>n instanceof t);let Ja,Xa;function uf(){return Ja||(Ja=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hf(){return Xa||(Xa=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const _c=new WeakMap,Ts=new WeakMap,yc=new WeakMap,us=new WeakMap,Xs=new WeakMap;function df(n){const e=new Promise((t,i)=>{const r=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(ut(n.result)),r()},a=()=>{i(n.error),r()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&_c.set(t,n)}).catch(()=>{}),Xs.set(e,n),e}function ff(n){if(Ts.has(n))return;const e=new Promise((t,i)=>{const r=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),r()},a=()=>{i(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Ts.set(n,e)}let ws={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ts.get(n);if(e==="objectStoreNames")return n.objectStoreNames||yc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ut(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function pf(n){ws=n(ws)}function mf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(hs(this),e,...t);return yc.set(i,e.sort?e.sort():[e]),ut(i)}:hf().includes(n)?function(...e){return n.apply(hs(this),e),ut(_c.get(this))}:function(...e){return ut(n.apply(hs(this),e))}}function gf(n){return typeof n=="function"?mf(n):(n instanceof IDBTransaction&&ff(n),cf(n,uf())?new Proxy(n,ws):n)}function ut(n){if(n instanceof IDBRequest)return df(n);if(us.has(n))return us.get(n);const e=gf(n);return e!==n&&(us.set(n,e),Xs.set(e,n)),e}const hs=n=>Xs.get(n);function _f(n,e,{blocked:t,upgrade:i,blocking:r,terminated:o}={}){const a=indexedDB.open(n,e),c=ut(a);return i&&a.addEventListener("upgradeneeded",h=>{i(ut(a.result),h.oldVersion,h.newVersion,ut(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),c.then(h=>{o&&h.addEventListener("close",()=>o()),r&&h.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const yf=["get","getKey","getAll","getAllKeys","count"],vf=["put","add","delete","clear"],ds=new Map;function Ya(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ds.get(e))return ds.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,r=vf.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(r||yf.includes(t)))return;const o=async function(a,...c){const h=this.transaction(a,r?"readwrite":"readonly");let d=h.store;return i&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),r&&h.done]))[0]};return ds.set(e,o),o}pf(n=>({...n,get:(e,t,i)=>Ya(e,t)||n.get(e,t,i),has:(e,t)=>!!Ya(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(If(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function If(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const bs="@firebase/app",Za="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je=new Js("@firebase/app"),Tf="@firebase/app-compat",wf="@firebase/analytics-compat",bf="@firebase/analytics",Af="@firebase/app-check-compat",Rf="@firebase/app-check",Sf="@firebase/auth",Pf="@firebase/auth-compat",Cf="@firebase/database",kf="@firebase/data-connect",Df="@firebase/database-compat",Nf="@firebase/functions",Vf="@firebase/functions-compat",Of="@firebase/installations",Lf="@firebase/installations-compat",xf="@firebase/messaging",Mf="@firebase/messaging-compat",Uf="@firebase/performance",Ff="@firebase/performance-compat",Bf="@firebase/remote-config",jf="@firebase/remote-config-compat",$f="@firebase/storage",qf="@firebase/storage-compat",zf="@firebase/firestore",Hf="@firebase/vertexai-preview",Wf="@firebase/firestore-compat",Gf="firebase",Kf="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As="[DEFAULT]",Qf={[bs]:"fire-core",[Tf]:"fire-core-compat",[bf]:"fire-analytics",[wf]:"fire-analytics-compat",[Rf]:"fire-app-check",[Af]:"fire-app-check-compat",[Sf]:"fire-auth",[Pf]:"fire-auth-compat",[Cf]:"fire-rtdb",[kf]:"fire-data-connect",[Df]:"fire-rtdb-compat",[Nf]:"fire-fn",[Vf]:"fire-fn-compat",[Of]:"fire-iid",[Lf]:"fire-iid-compat",[xf]:"fire-fcm",[Mf]:"fire-fcm-compat",[Uf]:"fire-perf",[Ff]:"fire-perf-compat",[Bf]:"fire-rc",[jf]:"fire-rc-compat",[$f]:"fire-gcs",[qf]:"fire-gcs-compat",[zf]:"fire-fst",[Wf]:"fire-fst-compat",[Hf]:"fire-vertex","fire-js":"fire-js",[Gf]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zi=new Map,Jf=new Map,Rs=new Map;function el(n,e){try{n.container.addComponent(e)}catch(t){Je.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function nn(n){const e=n.name;if(Rs.has(e))return Je.debug(`There were multiple attempts to register component ${e}.`),!1;Rs.set(e,n);for(const t of Zi.values())el(t,n);for(const t of Jf.values())el(t,n);return!0}function Ys(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ze(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ht=new ti("app","Firebase",Xf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Nt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ht.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn=Kf;function vc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:As,automaticDataCollectionEnabled:!1},e),r=i.name;if(typeof r!="string"||!r)throw ht.create("bad-app-name",{appName:String(r)});if(t||(t=mc()),!t)throw ht.create("no-options");const o=Zi.get(r);if(o){if(Yi(t,o.options)&&Yi(i,o.config))return o;throw ht.create("duplicate-app",{appName:r})}const a=new rf(r);for(const h of Rs.values())a.addComponent(h);const c=new Yf(t,i,a);return Zi.set(r,c),c}function Ec(n=As){const e=Zi.get(n);if(!e&&n===As&&mc())return vc();if(!e)throw ht.create("no-app",{appName:n});return e}function dt(n,e,t){var i;let r=(i=Qf[n])!==null&&i!==void 0?i:n;t&&(r+=`-${t}`);const o=r.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const c=[`Unable to register library "${r}" with version "${e}":`];o&&c.push(`library name "${r}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Je.warn(c.join(" "));return}nn(new Nt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf="firebase-heartbeat-database",ep=1,Gn="firebase-heartbeat-store";let fs=null;function Ic(){return fs||(fs=_f(Zf,ep,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Gn)}catch(t){console.warn(t)}}}}).catch(n=>{throw ht.create("idb-open",{originalErrorMessage:n.message})})),fs}async function tp(n){try{const t=(await Ic()).transaction(Gn),i=await t.objectStore(Gn).get(Tc(n));return await t.done,i}catch(e){if(e instanceof et)Je.warn(e.message);else{const t=ht.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Je.warn(t.message)}}}async function tl(n,e){try{const i=(await Ic()).transaction(Gn,"readwrite");await i.objectStore(Gn).put(e,Tc(n)),await i.done}catch(t){if(t instanceof et)Je.warn(t.message);else{const i=ht.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Je.warn(i.message)}}}function Tc(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const np=1024,ip=30*24*60*60*1e3;class rp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new op(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=nl();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const c=new Date(a.date).valueOf();return Date.now()-c<=ip}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Je.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=nl(),{heartbeatsToSend:i,unsentEntries:r}=sp(this._heartbeatsCache.heartbeats),o=Xi(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Je.warn(t),""}}}function nl(){return new Date().toISOString().substring(0,10)}function sp(n,e=np){const t=[];let i=n.slice();for(const r of n){const o=t.find(a=>a.agent===r.agent);if(o){if(o.dates.push(r.date),il(t)>e){o.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),il(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class op{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Hd()?Wd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await tp(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return tl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return tl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function il(n){return Xi(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ap(n){nn(new Nt("platform-logger",e=>new Ef(e),"PRIVATE")),nn(new Nt("heartbeat",e=>new rp(e),"PRIVATE")),dt(bs,Za,n),dt(bs,Za,"esm2017"),dt("fire-js","")}ap("");var lp="firebase",cp="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */dt(lp,cp,"app");function Zs(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(n);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(n,i[r])&&(t[i[r]]=n[i[r]]);return t}function wc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const up=wc,bc=new ti("auth","Firebase",wc());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er=new Js("@firebase/auth");function hp(n,...e){er.logLevel<=$.WARN&&er.warn(`Auth (${hn}): ${n}`,...e)}function ji(n,...e){er.logLevel<=$.ERROR&&er.error(`Auth (${hn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(n,...e){throw to(n,...e)}function Ne(n,...e){return to(n,...e)}function eo(n,e,t){const i=Object.assign(Object.assign({},up()),{[e]:t});return new ti("auth","Firebase",i).create(e,{appName:n.name})}function Rt(n){return eo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function dp(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&Me(n,"argument-error"),eo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function to(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return bc.create(n,...e)}function M(n,e,...t){if(!n)throw to(e,...t)}function He(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ji(e),new Error(e)}function Xe(n,e){n||He(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function fp(){return rl()==="http:"||rl()==="https:"}function rl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(fp()||jd()||"connection"in navigator)?navigator.onLine:!0}function mp(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t){this.shortDelay=e,this.longDelay=t,Xe(t>e,"Short delay should be less than long delay!"),this.isMobile=Ud()||$d()}get(){return pp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function no(n,e){Xe(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;He("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;He("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;He("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _p=new ii(3e4,6e4);function io(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function dn(n,e,t,i,r={}){return Rc(n,r,async()=>{let o={},a={};i&&(e==="GET"?a=i:o={body:JSON.stringify(i)});const c=ni(Object.assign({key:n.config.apiKey},a)).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:h},o);return Bd()||(d.referrerPolicy="no-referrer"),Ac.fetch()(Sc(n,n.config.apiHost,t,c),d)})}async function Rc(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},gp),e);try{const r=new vp(n),o=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Li(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const c=o.ok?a.errorMessage:a.error.message,[h,d]=c.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw Li(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw Li(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw Li(n,"user-disabled",a);const p=i[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw eo(n,p,d);Me(n,p)}}catch(r){if(r instanceof et)throw r;Me(n,"network-request-failed",{message:String(r)})}}async function yp(n,e,t,i,r={}){const o=await dn(n,e,t,i,r);return"mfaPendingCredential"in o&&Me(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Sc(n,e,t,i){const r=`${e}${t}?${i}`;return n.config.emulator?no(n.config,r):`${n.config.apiScheme}://${r}`}class vp{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Ne(this.auth,"network-request-failed")),_p.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Li(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const r=Ne(n,e,i);return r.customData._tokenResponse=t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ep(n,e){return dn(n,"POST","/v1/accounts:delete",e)}async function Pc(n,e){return dn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ip(n,e=!1){const t=ue(n),i=await t.getIdToken(e),r=ro(i);M(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const o=typeof r.firebase=="object"?r.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:r,token:i,authTime:jn(ps(r.auth_time)),issuedAtTime:jn(ps(r.iat)),expirationTime:jn(ps(r.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function ps(n){return Number(n)*1e3}function ro(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return ji("JWT malformed, contained fewer than 3 sections"),null;try{const r=fc(t);return r?JSON.parse(r):(ji("Failed to decode base64 JWT payload"),null)}catch(r){return ji("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function sl(n){const e=ro(n);return M(e,"internal-error"),M(typeof e.exp<"u","internal-error"),M(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kn(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof et&&Tp(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Tp({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const r=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=jn(this.lastLoginAt),this.creationTime=jn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tr(n){var e;const t=n.auth,i=await n.getIdToken(),r=await Kn(n,Pc(t,{idToken:i}));M(r==null?void 0:r.users.length,t,"internal-error");const o=r.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Cc(o.providerUserInfo):[],c=Ap(n.providerData,a),h=n.isAnonymous,d=!(n.email&&o.passwordHash)&&!(c!=null&&c.length),p=h?d:!1,y={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new Ps(o.createdAt,o.lastLoginAt),isAnonymous:p};Object.assign(n,y)}async function bp(n){const e=ue(n);await tr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Ap(n,e){return[...n.filter(i=>!e.some(r=>r.providerId===i.providerId)),...e]}function Cc(n){return n.map(e=>{var{providerId:t}=e,i=Zs(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rp(n,e){const t=await Rc(n,{},async()=>{const i=ni({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:o}=n.config,a=Sc(n,r,"/v1/token",`key=${o}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Ac.fetch()(a,{method:"POST",headers:c,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Sp(n,e){return dn(n,"POST","/v2/accounts:revokeToken",io(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){M(e.idToken,"internal-error"),M(typeof e.idToken<"u","internal-error"),M(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):sl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){M(e.length!==0,"internal-error");const t=sl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(M(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:r,expiresIn:o}=await Rp(e,t);this.updateTokensAndExpiration(i,r,Number(o))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:r,expirationTime:o}=t,a=new Xt;return i&&(M(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),r&&(M(typeof r=="string","internal-error",{appName:e}),a.accessToken=r),o&&(M(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Xt,this.toJSON())}_performRefresh(){return He("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(n,e){M(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class We{constructor(e){var{uid:t,auth:i,stsTokenManager:r}=e,o=Zs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new wp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Ps(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Kn(this,this.stsTokenManager.getToken(this.auth,e));return M(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ip(this,e)}reload(){return bp(this)}_assign(e){this!==e&&(M(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new We(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){M(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await tr(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ze(this.auth.app))return Promise.reject(Rt(this.auth));const e=await this.getIdToken();return await Kn(this,Ep(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,r,o,a,c,h,d,p;const y=(i=t.displayName)!==null&&i!==void 0?i:void 0,b=(r=t.email)!==null&&r!==void 0?r:void 0,R=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,D=(a=t.photoURL)!==null&&a!==void 0?a:void 0,V=(c=t.tenantId)!==null&&c!==void 0?c:void 0,k=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,q=(d=t.createdAt)!==null&&d!==void 0?d:void 0,G=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:K,emailVerified:ne,isAnonymous:ke,providerData:ie,stsTokenManager:E}=t;M(K&&E,e,"internal-error");const m=Xt.fromJSON(this.name,E);M(typeof K=="string",e,"internal-error"),st(y,e.name),st(b,e.name),M(typeof ne=="boolean",e,"internal-error"),M(typeof ke=="boolean",e,"internal-error"),st(R,e.name),st(D,e.name),st(V,e.name),st(k,e.name),st(q,e.name),st(G,e.name);const _=new We({uid:K,auth:e,email:b,emailVerified:ne,displayName:y,isAnonymous:ke,photoURL:D,phoneNumber:R,tenantId:V,stsTokenManager:m,createdAt:q,lastLoginAt:G});return ie&&Array.isArray(ie)&&(_.providerData=ie.map(v=>Object.assign({},v))),k&&(_._redirectEventId=k),_}static async _fromIdTokenResponse(e,t,i=!1){const r=new Xt;r.updateFromServerResponse(t);const o=new We({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await tr(o),o}static async _fromGetAccountInfoResponse(e,t,i){const r=t.users[0];M(r.localId!==void 0,"internal-error");const o=r.providerUserInfo!==void 0?Cc(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!(o!=null&&o.length),c=new Xt;c.updateFromIdToken(i);const h=new We({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new Ps(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,d),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol=new Map;function Ge(n){Xe(n instanceof Function,"Expected a class definition");let e=ol.get(n);return e?(Xe(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ol.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}kc.type="NONE";const al=kc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $i(n,e,t){return`firebase:${n}:${e}:${t}`}class Yt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:r,name:o}=this.auth;this.fullUserKey=$i(this.userKey,r.apiKey,o),this.fullPersistenceKey=$i("persistence",r.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?We._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Yt(Ge(al),e,i);const r=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=r[0]||Ge(al);const a=$i(i,e.config.apiKey,e.name);let c=null;for(const d of t)try{const p=await d._get(a);if(p){const y=We._fromJSON(e,p);d!==o&&(c=y),o=d;break}}catch{}const h=r.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new Yt(o,e,i):(o=h[0],c&&await o._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new Yt(o,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ll(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Oc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Dc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(xc(e))return"Blackberry";if(Mc(e))return"Webos";if(Nc(e))return"Safari";if((e.includes("chrome/")||Vc(e))&&!e.includes("edge/"))return"Chrome";if(Lc(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Dc(n=Te()){return/firefox\//i.test(n)}function Nc(n=Te()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Vc(n=Te()){return/crios\//i.test(n)}function Oc(n=Te()){return/iemobile/i.test(n)}function Lc(n=Te()){return/android/i.test(n)}function xc(n=Te()){return/blackberry/i.test(n)}function Mc(n=Te()){return/webos/i.test(n)}function so(n=Te()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Pp(n=Te()){var e;return so(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Cp(){return qd()&&document.documentMode===10}function Uc(n=Te()){return so(n)||Lc(n)||Mc(n)||xc(n)||/windows phone/i.test(n)||Oc(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fc(n,e=[]){let t;switch(n){case"Browser":t=ll(Te());break;case"Worker":t=`${ll(Te())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${hn}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=o=>new Promise((a,c)=>{try{const h=e(o);a(h)}catch(h){c(h)}});i.onAbort=t,this.queue.push(i);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dp(n,e={}){return dn(n,"GET","/v2/passwordPolicy",io(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Np=6;class Vp{constructor(e){var t,i,r,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Np,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(r=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&r!==void 0?r:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,r,o,a,c;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(i=h.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),h.isValid&&(h.isValid=(r=h.containsLowercaseLetter)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(a=h.containsNumericCharacter)!==null&&a!==void 0?a:!0),h.isValid&&(h.isValid=(c=h.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),h}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let r=0;r<e.length;r++)i=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,r,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e,t,i,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new cl(this),this.idTokenSubscription=new cl(this),this.beforeStateQueue=new kp(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=bc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ge(t)),this._initializationPromise=this.queue(async()=>{var i,r;if(!this._deleted&&(this.persistenceManager=await Yt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Pc(this,{idToken:e}),i=await We._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ze(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let r=i,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=r==null?void 0:r._redirectEventId,h=await this.tryRedirectSignIn(e);(!a||a===c)&&(h!=null&&h.user)&&(r=h.user,o=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return M(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await tr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=mp()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ze(this.app))return Promise.reject(Rt(this));const t=e?ue(e):null;return t&&M(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&M(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ze(this.app)?Promise.reject(Rt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ze(this.app)?Promise.reject(Rt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ge(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Dp(this),t=new Vp(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ti("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Sp(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ge(e)||this._popupRedirectResolver;M(t,this,"argument-error"),this.redirectPersistenceManager=await Yt.create(this,[Ge(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,r){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(M(c,this,"internal-error"),c.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,i,r);return()=>{a=!0,h()}}else{const h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return M(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Fc(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&hp(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function pr(n){return ue(n)}class cl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Xd(t=>this.observer=t)}get next(){return M(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Lp(n){oo=n}function xp(n){return oo.loadJS(n)}function Mp(){return oo.gapiScript}function Up(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fp(n,e){const t=Ys(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),o=t.getOptions();if(Yi(o,e??{}))return r;Me(r,"already-initialized")}return t.initialize({options:e})}function Bp(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Ge);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function jp(n,e,t){const i=pr(n);M(i._canInitEmulator,i,"emulator-config-failed"),M(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const r=!1,o=Bc(e),{host:a,port:c}=$p(e),h=c===null?"":`:${c}`;i.config.emulator={url:`${o}//${a}${h}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:r})}),qp()}function Bc(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function $p(n){const e=Bc(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){const o=r[1];return{host:o,port:ul(i.substr(o.length+1))}}else{const[o,a]=i.split(":");return{host:o,port:ul(a)}}}function ul(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function qp(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return He("not implemented")}_getIdTokenResponse(e){return He("not implemented")}_linkToIdToken(e,t){return He("not implemented")}_getReauthenticationResolver(e){return He("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zt(n,e){return yp(n,"POST","/v1/accounts:signInWithIdp",io(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zp="http://localhost";class Vt extends jc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Vt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Me("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r}=t,o=Zs(t,["providerId","signInMethod"]);if(!i||!r)return null;const a=new Vt(i,r);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Zt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Zt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Zt(e,t)}buildRequest(){const e={requestUri:zp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ni(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri extends ao{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot extends ri{constructor(){super("facebook.com")}static credential(e){return Vt._fromParams({providerId:ot.PROVIDER_ID,signInMethod:ot.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ot.credentialFromTaggedObject(e)}static credentialFromError(e){return ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ot.credential(e.oauthAccessToken)}catch{return null}}}ot.FACEBOOK_SIGN_IN_METHOD="facebook.com";ot.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe extends ri{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Vt._fromParams({providerId:qe.PROVIDER_ID,signInMethod:qe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return qe.credentialFromTaggedObject(e)}static credentialFromError(e){return qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return qe.credential(t,i)}catch{return null}}}qe.GOOGLE_SIGN_IN_METHOD="google.com";qe.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at extends ri{constructor(){super("github.com")}static credential(e){return Vt._fromParams({providerId:at.PROVIDER_ID,signInMethod:at.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return at.credentialFromTaggedObject(e)}static credentialFromError(e){return at.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return at.credential(e.oauthAccessToken)}catch{return null}}}at.GITHUB_SIGN_IN_METHOD="github.com";at.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt extends ri{constructor(){super("twitter.com")}static credential(e,t){return Vt._fromParams({providerId:lt.PROVIDER_ID,signInMethod:lt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return lt.credentialFromTaggedObject(e)}static credentialFromError(e){return lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return lt.credential(t,i)}catch{return null}}}lt.TWITTER_SIGN_IN_METHOD="twitter.com";lt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,r=!1){const o=await We._fromIdTokenResponse(e,i,r),a=hl(i);return new rn({user:o,providerId:a,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const r=hl(i);return new rn({user:e,providerId:r,_tokenResponse:i,operationType:t})}}function hl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr extends et{constructor(e,t,i,r){var o;super(t.code,t.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,nr.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,r){return new nr(e,t,i,r)}}function $c(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?nr._fromErrorAndOperation(n,o,e,i):o})}async function Hp(n,e,t=!1){const i=await Kn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return rn._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wp(n,e,t=!1){const{auth:i}=n;if(ze(i.app))return Promise.reject(Rt(i));const r="reauthenticate";try{const o=await Kn(n,$c(i,r,e,n),t);M(o.idToken,i,"internal-error");const a=ro(o.idToken);M(a,i,"internal-error");const{sub:c}=a;return M(n.uid===c,i,"user-mismatch"),rn._forOperation(n,r,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Me(i,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gp(n,e,t=!1){if(ze(n.app))return Promise.reject(Rt(n));const i="signIn",r=await $c(n,i,e),o=await rn._fromIdTokenResponse(n,i,r);return t||await n._updateCurrentUser(o.user),o}function Kp(n,e,t,i){return ue(n).onIdTokenChanged(e,t,i)}function Qp(n,e,t){return ue(n).beforeAuthStateChanged(e,t)}function Jp(n,e,t,i){return ue(n).onAuthStateChanged(e,t,i)}function Xp(n){return ue(n).signOut()}const ir="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ir,"1"),this.storage.removeItem(ir),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yp=1e3,Zp=10;class zc extends qc{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Uc(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),r=this.localCache[t];i!==r&&e(t,r,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,h)=>{this.notifyListeners(a,h)});return}const i=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const a=this.storage.getItem(i);!t&&this.localCache[i]===a||this.notifyListeners(i,a)},o=this.storage.getItem(i);Cp()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Zp):r()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Yp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}zc.type="LOCAL";const em=zc;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc extends qc{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Hc.type="SESSION";const Wc=Hc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const i=new mr(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:r,data:o}=t.data,a=this.handlersMap[r];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:r});const c=Array.from(a).map(async d=>d(t.origin,o)),h=await tm(c);t.ports[0].postMessage({status:"done",eventId:i,eventType:r,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}mr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lo(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let o,a;return new Promise((c,h)=>{const d=lo("",20);r.port1.start();const p=setTimeout(()=>{h(new Error("unsupported_event"))},i);a={messageChannel:r,onMessage(y){const b=y;if(b.data.eventId===d)switch(b.data.status){case"ack":clearTimeout(p),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),c(b.data.response);break;default:clearTimeout(p),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(){return window}function im(n){Oe().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gc(){return typeof Oe().WorkerGlobalScope<"u"&&typeof Oe().importScripts=="function"}async function rm(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sm(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function om(){return Gc()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kc="firebaseLocalStorageDb",am=1,rr="firebaseLocalStorage",Qc="fbase_key";class si{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function gr(n,e){return n.transaction([rr],e?"readwrite":"readonly").objectStore(rr)}function lm(){const n=indexedDB.deleteDatabase(Kc);return new si(n).toPromise()}function Cs(){const n=indexedDB.open(Kc,am);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(rr,{keyPath:Qc})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(rr)?e(i):(i.close(),await lm(),e(await Cs()))})})}async function dl(n,e,t){const i=gr(n,!0).put({[Qc]:e,value:t});return new si(i).toPromise()}async function cm(n,e){const t=gr(n,!1).get(e),i=await new si(t).toPromise();return i===void 0?null:i.value}function fl(n,e){const t=gr(n,!0).delete(e);return new si(t).toPromise()}const um=800,hm=3;class Jc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Cs(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>hm)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Gc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=mr._getInstance(om()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await rm(),!this.activeServiceWorker)return;this.sender=new nm(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sm()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Cs();return await dl(e,ir,"1"),await fl(e,ir),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>dl(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>cm(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>fl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const o=gr(r,!1).getAll();return new si(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:r,value:o}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(o)&&(this.notifyListeners(r,o),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!i.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),um)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Jc.type="LOCAL";const dm=Jc;new ii(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xc(n,e){return e?Ge(e):(M(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co extends jc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Zt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Zt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Zt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function fm(n){return Gp(n.auth,new co(n),n.bypassAuthState)}function pm(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),Wp(t,new co(n),n.bypassAuthState)}async function mm(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),Hp(t,new co(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc{constructor(e,t,i,r,o=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:r,tenantId:o,error:a,type:c}=e;if(a){this.reject(a);return}const h={auth:this.auth,requestUri:t,sessionId:i,tenantId:o||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(h))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return fm;case"linkViaPopup":case"linkViaRedirect":return mm;case"reauthViaPopup":case"reauthViaRedirect":return pm;default:Me(this.auth,"internal-error")}}resolve(e){Xe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Xe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gm=new ii(2e3,1e4);async function _m(n,e,t){if(ze(n.app))return Promise.reject(Ne(n,"operation-not-supported-in-this-environment"));const i=pr(n);dp(n,e,ao);const r=Xc(i,t);return new bt(i,"signInViaPopup",e,r).executeNotNull()}class bt extends Yc{constructor(e,t,i,r,o){super(e,t,r,o),this.provider=i,this.authWindow=null,this.pollId=null,bt.currentPopupAction&&bt.currentPopupAction.cancel(),bt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return M(e,this.auth,"internal-error"),e}async onExecution(){Xe(this.filter.length===1,"Popup operations only handle one event");const e=lo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ne(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ne(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,bt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ne(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,gm.get())};e()}}bt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ym="pendingRedirect",qi=new Map;class vm extends Yc{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=qi.get(this.auth._key());if(!e){try{const i=await Em(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}qi.set(this.auth._key(),e)}return this.bypassAuthState||qi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Em(n,e){const t=wm(e),i=Tm(n);if(!await i._isAvailable())return!1;const r=await i._get(t)==="true";return await i._remove(t),r}function Im(n,e){qi.set(n._key(),e)}function Tm(n){return Ge(n._redirectPersistence)}function wm(n){return $i(ym,n.config.apiKey,n.name)}async function bm(n,e,t=!1){if(ze(n.app))return Promise.reject(Rt(n));const i=pr(n),r=Xc(i,e),a=await new vm(i,r,t).execute();return a&&!t&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Am=10*60*1e3;class Rm{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Sm(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Zc(e)){const r=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(Ne(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Am&&this.cachedEventUids.clear(),this.cachedEventUids.has(pl(e))}saveEventToCache(e){this.cachedEventUids.add(pl(e)),this.lastProcessedEventTime=Date.now()}}function pl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Zc({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Sm(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Zc(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pm(n,e={}){return dn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cm=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,km=/^https?/;async function Dm(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Pm(n);for(const t of e)try{if(Nm(t))return}catch{}Me(n,"unauthorized-domain")}function Nm(n){const e=Ss(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===i}if(!km.test(t))return!1;if(Cm.test(n))return i===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vm=new ii(3e4,6e4);function ml(){const n=Oe().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Om(n){return new Promise((e,t)=>{var i,r,o;function a(){ml(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ml(),t(Ne(n,"network-request-failed"))},timeout:Vm.get()})}if(!((r=(i=Oe().gapi)===null||i===void 0?void 0:i.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((o=Oe().gapi)===null||o===void 0)&&o.load)a();else{const c=Up("iframefcb");return Oe()[c]=()=>{gapi.load?a():t(Ne(n,"network-request-failed"))},xp(`${Mp()}?onload=${c}`).catch(h=>t(h))}}).catch(e=>{throw zi=null,e})}let zi=null;function Lm(n){return zi=zi||Om(n),zi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xm=new ii(5e3,15e3),Mm="__/auth/iframe",Um="emulator/auth/iframe",Fm={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Bm=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jm(n){const e=n.config;M(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?no(e,Um):`https://${n.config.authDomain}/${Mm}`,i={apiKey:e.apiKey,appName:n.name,v:hn},r=Bm.get(n.config.apiHost);r&&(i.eid=r);const o=n._getFrameworks();return o.length&&(i.fw=o.join(",")),`${t}?${ni(i).slice(1)}`}async function $m(n){const e=await Lm(n),t=Oe().gapi;return M(t,n,"internal-error"),e.open({where:document.body,url:jm(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Fm,dontclear:!0},i=>new Promise(async(r,o)=>{await i.restyle({setHideOnLeave:!1});const a=Ne(n,"network-request-failed"),c=Oe().setTimeout(()=>{o(a)},xm.get());function h(){Oe().clearTimeout(c),r(i)}i.ping(h).then(h,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qm={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},zm=500,Hm=600,Wm="_blank",Gm="http://localhost";class gl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Km(n,e,t,i=zm,r=Hm){const o=Math.max((window.screen.availHeight-r)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let c="";const h=Object.assign(Object.assign({},qm),{width:i.toString(),height:r.toString(),top:o,left:a}),d=Te().toLowerCase();t&&(c=Vc(d)?Wm:t),Dc(d)&&(e=e||Gm,h.scrollbars="yes");const p=Object.entries(h).reduce((b,[R,D])=>`${b}${R}=${D},`,"");if(Pp(d)&&c!=="_self")return Qm(e||"",c),new gl(null);const y=window.open(e||"",c,p);M(y,n,"popup-blocked");try{y.focus()}catch{}return new gl(y)}function Qm(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jm="__/auth/handler",Xm="emulator/auth/handler",Ym=encodeURIComponent("fac");async function _l(n,e,t,i,r,o){M(n.config.authDomain,n,"auth-domain-config-required"),M(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:hn,eventId:r};if(e instanceof ao){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Jd(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,y]of Object.entries({}))a[p]=y}if(e instanceof ri){const p=e.getScopes().filter(y=>y!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const h=await n._getAppCheckToken(),d=h?`#${Ym}=${encodeURIComponent(h)}`:"";return`${Zm(n)}?${ni(c).slice(1)}${d}`}function Zm({config:n}){return n.emulator?no(n,Xm):`https://${n.authDomain}/${Jm}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms="webStorageSupport";class eg{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Wc,this._completeRedirectFn=bm,this._overrideRedirectResult=Im}async _openPopup(e,t,i,r){var o;Xe((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await _l(e,t,i,Ss(),r);return Km(e,a,lo())}async _openRedirect(e,t,i,r){await this._originValidation(e);const o=await _l(e,t,i,Ss(),r);return im(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:o}=this.eventManagers[t];return r?Promise.resolve(r):(Xe(o,"If manager is not set, promise should be"),o)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await $m(e),i=new Rm(e);return t.register("authEvent",r=>(M(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:i.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ms,{type:ms},r=>{var o;const a=(o=r==null?void 0:r[0])===null||o===void 0?void 0:o[ms];a!==void 0&&t(!!a),Me(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Dm(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Uc()||Nc()||so()}}const tg=eg;var yl="@firebase/auth",vl="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){M(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ig(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function rg(n){nn(new Nt("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=i.options;M(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const h={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Fc(n)},d=new Op(i,r,o,h);return Bp(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),nn(new Nt("auth-internal",e=>{const t=pr(e.getProvider("auth").getImmediate());return(i=>new ng(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),dt(yl,vl,ig(n)),dt(yl,vl,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sg=5*60,og=gc("authIdTokenMaxAge")||sg;let El=null;const ag=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>og)return;const r=t==null?void 0:t.token;El!==r&&(El=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function lg(n=Ec()){const e=Ys(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Fp(n,{popupRedirectResolver:tg,persistence:[dm,em,Wc]}),i=gc("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(i,location.origin);if(location.origin===o.origin){const a=ag(o.toString());Qp(t,a,()=>a(t.currentUser)),Kp(t,c=>a(c))}}const r=pc("auth");return r&&jp(t,`http://${r}`),t}function cg(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Lp({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=r=>{const o=Ne("internal-error");o.customData=r,t(o)},i.type="text/javascript",i.charset="UTF-8",cg().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});rg("Browser");var Il=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var St,eu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,m){function _(){}_.prototype=m.prototype,E.D=m.prototype,E.prototype=new _,E.prototype.constructor=E,E.C=function(v,I,w){for(var g=Array(arguments.length-2),Be=2;Be<arguments.length;Be++)g[Be-2]=arguments[Be];return m.prototype[I].apply(v,g)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,t),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(E,m,_){_||(_=0);var v=Array(16);if(typeof m=="string")for(var I=0;16>I;++I)v[I]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(I=0;16>I;++I)v[I]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=E.g[0],_=E.g[1],I=E.g[2];var w=E.g[3],g=m+(w^_&(I^w))+v[0]+3614090360&4294967295;m=_+(g<<7&4294967295|g>>>25),g=w+(I^m&(_^I))+v[1]+3905402710&4294967295,w=m+(g<<12&4294967295|g>>>20),g=I+(_^w&(m^_))+v[2]+606105819&4294967295,I=w+(g<<17&4294967295|g>>>15),g=_+(m^I&(w^m))+v[3]+3250441966&4294967295,_=I+(g<<22&4294967295|g>>>10),g=m+(w^_&(I^w))+v[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(I^m&(_^I))+v[5]+1200080426&4294967295,w=m+(g<<12&4294967295|g>>>20),g=I+(_^w&(m^_))+v[6]+2821735955&4294967295,I=w+(g<<17&4294967295|g>>>15),g=_+(m^I&(w^m))+v[7]+4249261313&4294967295,_=I+(g<<22&4294967295|g>>>10),g=m+(w^_&(I^w))+v[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(I^m&(_^I))+v[9]+2336552879&4294967295,w=m+(g<<12&4294967295|g>>>20),g=I+(_^w&(m^_))+v[10]+4294925233&4294967295,I=w+(g<<17&4294967295|g>>>15),g=_+(m^I&(w^m))+v[11]+2304563134&4294967295,_=I+(g<<22&4294967295|g>>>10),g=m+(w^_&(I^w))+v[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(I^m&(_^I))+v[13]+4254626195&4294967295,w=m+(g<<12&4294967295|g>>>20),g=I+(_^w&(m^_))+v[14]+2792965006&4294967295,I=w+(g<<17&4294967295|g>>>15),g=_+(m^I&(w^m))+v[15]+1236535329&4294967295,_=I+(g<<22&4294967295|g>>>10),g=m+(I^w&(_^I))+v[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^I&(m^_))+v[6]+3225465664&4294967295,w=m+(g<<9&4294967295|g>>>23),g=I+(m^_&(w^m))+v[11]+643717713&4294967295,I=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(I^w))+v[0]+3921069994&4294967295,_=I+(g<<20&4294967295|g>>>12),g=m+(I^w&(_^I))+v[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^I&(m^_))+v[10]+38016083&4294967295,w=m+(g<<9&4294967295|g>>>23),g=I+(m^_&(w^m))+v[15]+3634488961&4294967295,I=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(I^w))+v[4]+3889429448&4294967295,_=I+(g<<20&4294967295|g>>>12),g=m+(I^w&(_^I))+v[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^I&(m^_))+v[14]+3275163606&4294967295,w=m+(g<<9&4294967295|g>>>23),g=I+(m^_&(w^m))+v[3]+4107603335&4294967295,I=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(I^w))+v[8]+1163531501&4294967295,_=I+(g<<20&4294967295|g>>>12),g=m+(I^w&(_^I))+v[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^I&(m^_))+v[2]+4243563512&4294967295,w=m+(g<<9&4294967295|g>>>23),g=I+(m^_&(w^m))+v[7]+1735328473&4294967295,I=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(I^w))+v[12]+2368359562&4294967295,_=I+(g<<20&4294967295|g>>>12),g=m+(_^I^w)+v[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^I)+v[8]+2272392833&4294967295,w=m+(g<<11&4294967295|g>>>21),g=I+(w^m^_)+v[11]+1839030562&4294967295,I=w+(g<<16&4294967295|g>>>16),g=_+(I^w^m)+v[14]+4259657740&4294967295,_=I+(g<<23&4294967295|g>>>9),g=m+(_^I^w)+v[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^I)+v[4]+1272893353&4294967295,w=m+(g<<11&4294967295|g>>>21),g=I+(w^m^_)+v[7]+4139469664&4294967295,I=w+(g<<16&4294967295|g>>>16),g=_+(I^w^m)+v[10]+3200236656&4294967295,_=I+(g<<23&4294967295|g>>>9),g=m+(_^I^w)+v[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^I)+v[0]+3936430074&4294967295,w=m+(g<<11&4294967295|g>>>21),g=I+(w^m^_)+v[3]+3572445317&4294967295,I=w+(g<<16&4294967295|g>>>16),g=_+(I^w^m)+v[6]+76029189&4294967295,_=I+(g<<23&4294967295|g>>>9),g=m+(_^I^w)+v[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^I)+v[12]+3873151461&4294967295,w=m+(g<<11&4294967295|g>>>21),g=I+(w^m^_)+v[15]+530742520&4294967295,I=w+(g<<16&4294967295|g>>>16),g=_+(I^w^m)+v[2]+3299628645&4294967295,_=I+(g<<23&4294967295|g>>>9),g=m+(I^(_|~w))+v[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~I))+v[7]+1126891415&4294967295,w=m+(g<<10&4294967295|g>>>22),g=I+(m^(w|~_))+v[14]+2878612391&4294967295,I=w+(g<<15&4294967295|g>>>17),g=_+(w^(I|~m))+v[5]+4237533241&4294967295,_=I+(g<<21&4294967295|g>>>11),g=m+(I^(_|~w))+v[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~I))+v[3]+2399980690&4294967295,w=m+(g<<10&4294967295|g>>>22),g=I+(m^(w|~_))+v[10]+4293915773&4294967295,I=w+(g<<15&4294967295|g>>>17),g=_+(w^(I|~m))+v[1]+2240044497&4294967295,_=I+(g<<21&4294967295|g>>>11),g=m+(I^(_|~w))+v[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~I))+v[15]+4264355552&4294967295,w=m+(g<<10&4294967295|g>>>22),g=I+(m^(w|~_))+v[6]+2734768916&4294967295,I=w+(g<<15&4294967295|g>>>17),g=_+(w^(I|~m))+v[13]+1309151649&4294967295,_=I+(g<<21&4294967295|g>>>11),g=m+(I^(_|~w))+v[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~I))+v[11]+3174756917&4294967295,w=m+(g<<10&4294967295|g>>>22),g=I+(m^(w|~_))+v[2]+718787259&4294967295,I=w+(g<<15&4294967295|g>>>17),g=_+(w^(I|~m))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(I+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+I&4294967295,E.g[3]=E.g[3]+w&4294967295}i.prototype.u=function(E,m){m===void 0&&(m=E.length);for(var _=m-this.blockSize,v=this.B,I=this.h,w=0;w<m;){if(I==0)for(;w<=_;)r(this,E,w),w+=this.blockSize;if(typeof E=="string"){for(;w<m;)if(v[I++]=E.charCodeAt(w++),I==this.blockSize){r(this,v),I=0;break}}else for(;w<m;)if(v[I++]=E[w++],I==this.blockSize){r(this,v),I=0;break}}this.h=I,this.o+=m},i.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;var _=8*this.o;for(m=E.length-8;m<E.length;++m)E[m]=_&255,_/=256;for(this.u(E),E=Array(16),m=_=0;4>m;++m)for(var v=0;32>v;v+=8)E[_++]=this.g[m]>>>v&255;return E};function o(E,m){var _=c;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=m(E)}function a(E,m){this.h=m;for(var _=[],v=!0,I=E.length-1;0<=I;I--){var w=E[I]|0;v&&w==m||(_[I]=w,v=!1)}this.g=_}var c={};function h(E){return-128<=E&&128>E?o(E,function(m){return new a([m|0],0>m?-1:0)}):new a([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return y;if(0>E)return k(d(-E));for(var m=[],_=1,v=0;E>=_;v++)m[v]=E/_|0,_*=4294967296;return new a(m,0)}function p(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return k(p(E.substring(1),m));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(m,8)),v=y,I=0;I<E.length;I+=8){var w=Math.min(8,E.length-I),g=parseInt(E.substring(I,I+w),m);8>w?(w=d(Math.pow(m,w)),v=v.j(w).add(d(g))):(v=v.j(_),v=v.add(d(g)))}return v}var y=h(0),b=h(1),R=h(16777216);n=a.prototype,n.m=function(){if(V(this))return-k(this).m();for(var E=0,m=1,_=0;_<this.g.length;_++){var v=this.i(_);E+=(0<=v?v:4294967296+v)*m,m*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(D(this))return"0";if(V(this))return"-"+k(this).toString(E);for(var m=d(Math.pow(E,6)),_=this,v="";;){var I=ne(_,m).g;_=q(_,I.j(m));var w=((0<_.g.length?_.g[0]:_.h)>>>0).toString(E);if(_=I,D(_))return w+v;for(;6>w.length;)w="0"+w;v=w+v}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function D(E){if(E.h!=0)return!1;for(var m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function V(E){return E.h==-1}n.l=function(E){return E=q(this,E),V(E)?-1:D(E)?0:1};function k(E){for(var m=E.g.length,_=[],v=0;v<m;v++)_[v]=~E.g[v];return new a(_,~E.h).add(b)}n.abs=function(){return V(this)?k(this):this},n.add=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0,I=0;I<=m;I++){var w=v+(this.i(I)&65535)+(E.i(I)&65535),g=(w>>>16)+(this.i(I)>>>16)+(E.i(I)>>>16);v=g>>>16,w&=65535,g&=65535,_[I]=g<<16|w}return new a(_,_[_.length-1]&-2147483648?-1:0)};function q(E,m){return E.add(k(m))}n.j=function(E){if(D(this)||D(E))return y;if(V(this))return V(E)?k(this).j(k(E)):k(k(this).j(E));if(V(E))return k(this.j(k(E)));if(0>this.l(R)&&0>E.l(R))return d(this.m()*E.m());for(var m=this.g.length+E.g.length,_=[],v=0;v<2*m;v++)_[v]=0;for(v=0;v<this.g.length;v++)for(var I=0;I<E.g.length;I++){var w=this.i(v)>>>16,g=this.i(v)&65535,Be=E.i(I)>>>16,vn=E.i(I)&65535;_[2*v+2*I]+=g*vn,G(_,2*v+2*I),_[2*v+2*I+1]+=w*vn,G(_,2*v+2*I+1),_[2*v+2*I+1]+=g*Be,G(_,2*v+2*I+1),_[2*v+2*I+2]+=w*Be,G(_,2*v+2*I+2)}for(v=0;v<m;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=m;v<2*m;v++)_[v]=0;return new a(_,0)};function G(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function K(E,m){this.g=E,this.h=m}function ne(E,m){if(D(m))throw Error("division by zero");if(D(E))return new K(y,y);if(V(E))return m=ne(k(E),m),new K(k(m.g),k(m.h));if(V(m))return m=ne(E,k(m)),new K(k(m.g),m.h);if(30<E.g.length){if(V(E)||V(m))throw Error("slowDivide_ only works with positive integers.");for(var _=b,v=m;0>=v.l(E);)_=ke(_),v=ke(v);var I=ie(_,1),w=ie(v,1);for(v=ie(v,2),_=ie(_,2);!D(v);){var g=w.add(v);0>=g.l(E)&&(I=I.add(_),w=g),v=ie(v,1),_=ie(_,1)}return m=q(E,I.j(m)),new K(I,m)}for(I=y;0<=E.l(m);){for(_=Math.max(1,Math.floor(E.m()/m.m())),v=Math.ceil(Math.log(_)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),w=d(_),g=w.j(m);V(g)||0<g.l(E);)_-=v,w=d(_),g=w.j(m);D(w)&&(w=b),I=I.add(w),E=q(E,g)}return new K(I,E)}n.A=function(E){return ne(this,E).h},n.and=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)&E.i(v);return new a(_,this.h&E.h)},n.or=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)|E.i(v);return new a(_,this.h|E.h)},n.xor=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)^E.i(v);return new a(_,this.h^E.h)};function ke(E){for(var m=E.g.length+1,_=[],v=0;v<m;v++)_[v]=E.i(v)<<1|E.i(v-1)>>>31;return new a(_,E.h)}function ie(E,m){var _=m>>5;m%=32;for(var v=E.g.length-_,I=[],w=0;w<v;w++)I[w]=0<m?E.i(w+_)>>>m|E.i(w+_+1)<<32-m:E.i(w+_);return new a(I,E.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,eu=i,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,St=a}).apply(typeof Il<"u"?Il:typeof self<"u"?self:typeof window<"u"?window:{});var xi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var tu,Un,nu,Hi,ks,iu,ru,su;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,l,u){return s==Array.prototype||s==Object.prototype||(s[l]=u.value),s};function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof xi=="object"&&xi];for(var l=0;l<s.length;++l){var u=s[l];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var i=t(this);function r(s,l){if(l)e:{var u=i;s=s.split(".");for(var f=0;f<s.length-1;f++){var T=s[f];if(!(T in u))break e;u=u[T]}s=s[s.length-1],f=u[s],l=l(f),l!=f&&l!=null&&e(u,s,{configurable:!0,writable:!0,value:l})}}function o(s,l){s instanceof String&&(s+="");var u=0,f=!1,T={next:function(){if(!f&&u<s.length){var A=u++;return{value:l(A,s[A]),done:!1}}return f=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}r("Array.prototype.values",function(s){return s||function(){return o(this,function(l,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function h(s){var l=typeof s;return l=l!="object"?l:s?Array.isArray(s)?"array":l:"null",l=="array"||l=="object"&&typeof s.length=="number"}function d(s){var l=typeof s;return l=="object"&&s!=null||l=="function"}function p(s,l,u){return s.call.apply(s.bind,arguments)}function y(s,l,u){if(!s)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,f),s.apply(l,T)}}return function(){return s.apply(l,arguments)}}function b(s,l,u){return b=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:y,b.apply(null,arguments)}function R(s,l){var u=Array.prototype.slice.call(arguments,1);return function(){var f=u.slice();return f.push.apply(f,arguments),s.apply(this,f)}}function D(s,l){function u(){}u.prototype=l.prototype,s.aa=l.prototype,s.prototype=new u,s.prototype.constructor=s,s.Qb=function(f,T,A){for(var C=Array(arguments.length-2),J=2;J<arguments.length;J++)C[J-2]=arguments[J];return l.prototype[T].apply(f,C)}}function V(s){const l=s.length;if(0<l){const u=Array(l);for(let f=0;f<l;f++)u[f]=s[f];return u}return[]}function k(s,l){for(let u=1;u<arguments.length;u++){const f=arguments[u];if(h(f)){const T=s.length||0,A=f.length||0;s.length=T+A;for(let C=0;C<A;C++)s[T+C]=f[C]}else s.push(f)}}class q{constructor(l,u){this.i=l,this.j=u,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function G(s){return/^[\s\xa0]*$/.test(s)}function K(){var s=c.navigator;return s&&(s=s.userAgent)?s:""}function ne(s){return ne[" "](s),s}ne[" "]=function(){};var ke=K().indexOf("Gecko")!=-1&&!(K().toLowerCase().indexOf("webkit")!=-1&&K().indexOf("Edge")==-1)&&!(K().indexOf("Trident")!=-1||K().indexOf("MSIE")!=-1)&&K().indexOf("Edge")==-1;function ie(s,l,u){for(const f in s)l.call(u,s[f],f,s)}function E(s,l){for(const u in s)l.call(void 0,s[u],u,s)}function m(s){const l={};for(const u in s)l[u]=s[u];return l}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(s,l){let u,f;for(let T=1;T<arguments.length;T++){f=arguments[T];for(u in f)s[u]=f[u];for(let A=0;A<_.length;A++)u=_[A],Object.prototype.hasOwnProperty.call(f,u)&&(s[u]=f[u])}}function I(s){var l=1;s=s.split(":");const u=[];for(;0<l&&s.length;)u.push(s.shift()),l--;return s.length&&u.push(s.join(":")),u}function w(s){c.setTimeout(()=>{throw s},0)}function g(){var s=Fr;let l=null;return s.g&&(l=s.g,s.g=s.g.next,s.g||(s.h=null),l.next=null),l}class Be{constructor(){this.h=this.g=null}add(l,u){const f=vn.get();f.set(l,u),this.h?this.h.next=f:this.g=f,this.h=f}}var vn=new q(()=>new zh,s=>s.reset());class zh{constructor(){this.next=this.g=this.h=null}set(l,u){this.h=l,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let En,In=!1,Fr=new Be,Go=()=>{const s=c.Promise.resolve(void 0);En=()=>{s.then(Hh)}};var Hh=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(u){w(u)}var l=vn;l.j(s),100>l.h&&(l.h++,s.next=l.g,l.g=s)}In=!1};function tt(){this.s=this.s,this.C=this.C}tt.prototype.s=!1,tt.prototype.ma=function(){this.s||(this.s=!0,this.N())},tt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function me(s,l){this.type=s,this.g=this.target=l,this.defaultPrevented=!1}me.prototype.h=function(){this.defaultPrevented=!0};var Wh=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,l=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const u=()=>{};c.addEventListener("test",u,l),c.removeEventListener("test",u,l)}catch{}return s}();function Tn(s,l){if(me.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var u=this.type=s.type,f=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=l,l=s.relatedTarget){if(ke){e:{try{ne(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else u=="mouseover"?l=s.fromElement:u=="mouseout"&&(l=s.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:Gh[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&Tn.aa.h.call(this)}}D(Tn,me);var Gh={2:"touch",3:"pen",4:"mouse"};Tn.prototype.h=function(){Tn.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var gi="closure_listenable_"+(1e6*Math.random()|0),Kh=0;function Qh(s,l,u,f,T){this.listener=s,this.proxy=null,this.src=l,this.type=u,this.capture=!!f,this.ha=T,this.key=++Kh,this.da=this.fa=!1}function _i(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function yi(s){this.src=s,this.g={},this.h=0}yi.prototype.add=function(s,l,u,f,T){var A=s.toString();s=this.g[A],s||(s=this.g[A]=[],this.h++);var C=jr(s,l,f,T);return-1<C?(l=s[C],u||(l.fa=!1)):(l=new Qh(l,this.src,A,!!f,T),l.fa=u,s.push(l)),l};function Br(s,l){var u=l.type;if(u in s.g){var f=s.g[u],T=Array.prototype.indexOf.call(f,l,void 0),A;(A=0<=T)&&Array.prototype.splice.call(f,T,1),A&&(_i(l),s.g[u].length==0&&(delete s.g[u],s.h--))}}function jr(s,l,u,f){for(var T=0;T<s.length;++T){var A=s[T];if(!A.da&&A.listener==l&&A.capture==!!u&&A.ha==f)return T}return-1}var $r="closure_lm_"+(1e6*Math.random()|0),qr={};function Ko(s,l,u,f,T){if(Array.isArray(l)){for(var A=0;A<l.length;A++)Ko(s,l[A],u,f,T);return null}return u=Xo(u),s&&s[gi]?s.K(l,u,d(f)?!!f.capture:!1,T):Jh(s,l,u,!1,f,T)}function Jh(s,l,u,f,T,A){if(!l)throw Error("Invalid event type");var C=d(T)?!!T.capture:!!T,J=Hr(s);if(J||(s[$r]=J=new yi(s)),u=J.add(l,u,f,C,A),u.proxy)return u;if(f=Xh(),u.proxy=f,f.src=s,f.listener=u,s.addEventListener)Wh||(T=C),T===void 0&&(T=!1),s.addEventListener(l.toString(),f,T);else if(s.attachEvent)s.attachEvent(Jo(l.toString()),f);else if(s.addListener&&s.removeListener)s.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Xh(){function s(u){return l.call(s.src,s.listener,u)}const l=Yh;return s}function Qo(s,l,u,f,T){if(Array.isArray(l))for(var A=0;A<l.length;A++)Qo(s,l[A],u,f,T);else f=d(f)?!!f.capture:!!f,u=Xo(u),s&&s[gi]?(s=s.i,l=String(l).toString(),l in s.g&&(A=s.g[l],u=jr(A,u,f,T),-1<u&&(_i(A[u]),Array.prototype.splice.call(A,u,1),A.length==0&&(delete s.g[l],s.h--)))):s&&(s=Hr(s))&&(l=s.g[l.toString()],s=-1,l&&(s=jr(l,u,f,T)),(u=-1<s?l[s]:null)&&zr(u))}function zr(s){if(typeof s!="number"&&s&&!s.da){var l=s.src;if(l&&l[gi])Br(l.i,s);else{var u=s.type,f=s.proxy;l.removeEventListener?l.removeEventListener(u,f,s.capture):l.detachEvent?l.detachEvent(Jo(u),f):l.addListener&&l.removeListener&&l.removeListener(f),(u=Hr(l))?(Br(u,s),u.h==0&&(u.src=null,l[$r]=null)):_i(s)}}}function Jo(s){return s in qr?qr[s]:qr[s]="on"+s}function Yh(s,l){if(s.da)s=!0;else{l=new Tn(l,this);var u=s.listener,f=s.ha||s.src;s.fa&&zr(s),s=u.call(f,l)}return s}function Hr(s){return s=s[$r],s instanceof yi?s:null}var Wr="__closure_events_fn_"+(1e9*Math.random()>>>0);function Xo(s){return typeof s=="function"?s:(s[Wr]||(s[Wr]=function(l){return s.handleEvent(l)}),s[Wr])}function ge(){tt.call(this),this.i=new yi(this),this.M=this,this.F=null}D(ge,tt),ge.prototype[gi]=!0,ge.prototype.removeEventListener=function(s,l,u,f){Qo(this,s,l,u,f)};function we(s,l){var u,f=s.F;if(f)for(u=[];f;f=f.F)u.push(f);if(s=s.M,f=l.type||l,typeof l=="string")l=new me(l,s);else if(l instanceof me)l.target=l.target||s;else{var T=l;l=new me(f,s),v(l,T)}if(T=!0,u)for(var A=u.length-1;0<=A;A--){var C=l.g=u[A];T=vi(C,f,!0,l)&&T}if(C=l.g=s,T=vi(C,f,!0,l)&&T,T=vi(C,f,!1,l)&&T,u)for(A=0;A<u.length;A++)C=l.g=u[A],T=vi(C,f,!1,l)&&T}ge.prototype.N=function(){if(ge.aa.N.call(this),this.i){var s=this.i,l;for(l in s.g){for(var u=s.g[l],f=0;f<u.length;f++)_i(u[f]);delete s.g[l],s.h--}}this.F=null},ge.prototype.K=function(s,l,u,f){return this.i.add(String(s),l,!1,u,f)},ge.prototype.L=function(s,l,u,f){return this.i.add(String(s),l,!0,u,f)};function vi(s,l,u,f){if(l=s.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,A=0;A<l.length;++A){var C=l[A];if(C&&!C.da&&C.capture==u){var J=C.listener,de=C.ha||C.src;C.fa&&Br(s.i,C),T=J.call(de,f)!==!1&&T}}return T&&!f.defaultPrevented}function Yo(s,l,u){if(typeof s=="function")u&&(s=b(s,u));else if(s&&typeof s.handleEvent=="function")s=b(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(s,l||0)}function Zo(s){s.g=Yo(()=>{s.g=null,s.i&&(s.i=!1,Zo(s))},s.l);const l=s.h;s.h=null,s.m.apply(null,l)}class Zh extends tt{constructor(l,u){super(),this.m=l,this.l=u,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Zo(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function wn(s){tt.call(this),this.h=s,this.g={}}D(wn,tt);var ea=[];function ta(s){ie(s.g,function(l,u){this.g.hasOwnProperty(u)&&zr(l)},s),s.g={}}wn.prototype.N=function(){wn.aa.N.call(this),ta(this)},wn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Gr=c.JSON.stringify,ed=c.JSON.parse,td=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function Kr(){}Kr.prototype.h=null;function na(s){return s.h||(s.h=s.i())}function ia(){}var bn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Qr(){me.call(this,"d")}D(Qr,me);function Jr(){me.call(this,"c")}D(Jr,me);var vt={},ra=null;function Ei(){return ra=ra||new ge}vt.La="serverreachability";function sa(s){me.call(this,vt.La,s)}D(sa,me);function An(s){const l=Ei();we(l,new sa(l))}vt.STAT_EVENT="statevent";function oa(s,l){me.call(this,vt.STAT_EVENT,s),this.stat=l}D(oa,me);function be(s){const l=Ei();we(l,new oa(l,s))}vt.Ma="timingevent";function aa(s,l){me.call(this,vt.Ma,s),this.size=l}D(aa,me);function Rn(s,l){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},l)}function Sn(){this.g=!0}Sn.prototype.xa=function(){this.g=!1};function nd(s,l,u,f,T,A){s.info(function(){if(s.g)if(A)for(var C="",J=A.split("&"),de=0;de<J.length;de++){var H=J[de].split("=");if(1<H.length){var _e=H[0];H=H[1];var ye=_e.split("_");C=2<=ye.length&&ye[1]=="type"?C+(_e+"="+H+"&"):C+(_e+"=redacted&")}}else C=null;else C=A;return"XMLHTTP REQ ("+f+") [attempt "+T+"]: "+l+`
`+u+`
`+C})}function id(s,l,u,f,T,A,C){s.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+T+"]: "+l+`
`+u+`
`+A+" "+C})}function $t(s,l,u,f){s.info(function(){return"XMLHTTP TEXT ("+l+"): "+sd(s,u)+(f?" "+f:"")})}function rd(s,l){s.info(function(){return"TIMEOUT: "+l})}Sn.prototype.info=function(){};function sd(s,l){if(!s.g)return l;if(!l)return null;try{var u=JSON.parse(l);if(u){for(s=0;s<u.length;s++)if(Array.isArray(u[s])){var f=u[s];if(!(2>f.length)){var T=f[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var C=1;C<T.length;C++)T[C]=""}}}}return Gr(u)}catch{return l}}var Ii={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},la={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Xr;function Ti(){}D(Ti,Kr),Ti.prototype.g=function(){return new XMLHttpRequest},Ti.prototype.i=function(){return{}},Xr=new Ti;function nt(s,l,u,f){this.j=s,this.i=l,this.l=u,this.R=f||1,this.U=new wn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ca}function ca(){this.i=null,this.g="",this.h=!1}var ua={},Yr={};function Zr(s,l,u){s.L=1,s.v=Ri(je(l)),s.m=u,s.P=!0,ha(s,null)}function ha(s,l){s.F=Date.now(),wi(s),s.A=je(s.v);var u=s.A,f=s.R;Array.isArray(f)||(f=[String(f)]),Aa(u.i,"t",f),s.C=0,u=s.j.J,s.h=new ca,s.g=qa(s.j,u?l:null,!s.m),0<s.O&&(s.M=new Zh(b(s.Y,s,s.g),s.O)),l=s.U,u=s.g,f=s.ca;var T="readystatechange";Array.isArray(T)||(T&&(ea[0]=T.toString()),T=ea);for(var A=0;A<T.length;A++){var C=Ko(u,T[A],f||l.handleEvent,!1,l.h||l);if(!C)break;l.g[C.key]=C}l=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,l)):(s.u="GET",s.g.ea(s.A,s.u,null,l)),An(),nd(s.i,s.u,s.A,s.l,s.R,s.m)}nt.prototype.ca=function(s){s=s.target;const l=this.M;l&&$e(s)==3?l.j():this.Y(s)},nt.prototype.Y=function(s){try{if(s==this.g)e:{const ye=$e(this.g);var l=this.g.Ba();const Ht=this.g.Z();if(!(3>ye)&&(ye!=3||this.g&&(this.h.h||this.g.oa()||Na(this.g)))){this.J||ye!=4||l==7||(l==8||0>=Ht?An(3):An(2)),es(this);var u=this.g.Z();this.X=u;t:if(da(this)){var f=Na(this.g);s="";var T=f.length,A=$e(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Et(this),Pn(this);var C="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,s+=this.h.i.decode(f[l],{stream:!(A&&l==T-1)});f.length=0,this.h.g+=s,this.C=0,C=this.h.g}else C=this.g.oa();if(this.o=u==200,id(this.i,this.u,this.A,this.l,this.R,ye,u),this.o){if(this.T&&!this.K){t:{if(this.g){var J,de=this.g;if((J=de.g?de.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!G(J)){var H=J;break t}}H=null}if(u=H)$t(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ts(this,u);else{this.o=!1,this.s=3,be(12),Et(this),Pn(this);break e}}if(this.P){u=!0;let De;for(;!this.J&&this.C<C.length;)if(De=od(this,C),De==Yr){ye==4&&(this.s=4,be(14),u=!1),$t(this.i,this.l,null,"[Incomplete Response]");break}else if(De==ua){this.s=4,be(15),$t(this.i,this.l,C,"[Invalid Chunk]"),u=!1;break}else $t(this.i,this.l,De,null),ts(this,De);if(da(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ye!=4||C.length!=0||this.h.h||(this.s=1,be(16),u=!1),this.o=this.o&&u,!u)$t(this.i,this.l,C,"[Invalid Chunked Response]"),Et(this),Pn(this);else if(0<C.length&&!this.W){this.W=!0;var _e=this.j;_e.g==this&&_e.ba&&!_e.M&&(_e.j.info("Great, no buffering proxy detected. Bytes received: "+C.length),as(_e),_e.M=!0,be(11))}}else $t(this.i,this.l,C,null),ts(this,C);ye==4&&Et(this),this.o&&!this.J&&(ye==4?Fa(this.j,this):(this.o=!1,wi(this)))}else wd(this.g),u==400&&0<C.indexOf("Unknown SID")?(this.s=3,be(12)):(this.s=0,be(13)),Et(this),Pn(this)}}}catch{}finally{}};function da(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function od(s,l){var u=s.C,f=l.indexOf(`
`,u);return f==-1?Yr:(u=Number(l.substring(u,f)),isNaN(u)?ua:(f+=1,f+u>l.length?Yr:(l=l.slice(f,f+u),s.C=f+u,l)))}nt.prototype.cancel=function(){this.J=!0,Et(this)};function wi(s){s.S=Date.now()+s.I,fa(s,s.I)}function fa(s,l){if(s.B!=null)throw Error("WatchDog timer not null");s.B=Rn(b(s.ba,s),l)}function es(s){s.B&&(c.clearTimeout(s.B),s.B=null)}nt.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(rd(this.i,this.A),this.L!=2&&(An(),be(17)),Et(this),this.s=2,Pn(this)):fa(this,this.S-s)};function Pn(s){s.j.G==0||s.J||Fa(s.j,s)}function Et(s){es(s);var l=s.M;l&&typeof l.ma=="function"&&l.ma(),s.M=null,ta(s.U),s.g&&(l=s.g,s.g=null,l.abort(),l.ma())}function ts(s,l){try{var u=s.j;if(u.G!=0&&(u.g==s||ns(u.h,s))){if(!s.K&&ns(u.h,s)&&u.G==3){try{var f=u.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var T=f;if(T[0]==0){e:if(!u.u){if(u.g)if(u.g.F+3e3<s.F)Ni(u),ki(u);else break e;os(u),be(18)}}else u.za=T[1],0<u.za-u.T&&37500>T[2]&&u.F&&u.v==0&&!u.C&&(u.C=Rn(b(u.Za,u),6e3));if(1>=ga(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else Tt(u,11)}else if((s.K||u.g==s)&&Ni(u),!G(l))for(T=u.Da.g.parse(l),l=0;l<T.length;l++){let H=T[l];if(u.T=H[0],H=H[1],u.G==2)if(H[0]=="c"){u.K=H[1],u.ia=H[2];const _e=H[3];_e!=null&&(u.la=_e,u.j.info("VER="+u.la));const ye=H[4];ye!=null&&(u.Aa=ye,u.j.info("SVER="+u.Aa));const Ht=H[5];Ht!=null&&typeof Ht=="number"&&0<Ht&&(f=1.5*Ht,u.L=f,u.j.info("backChannelRequestTimeoutMs_="+f)),f=u;const De=s.g;if(De){const Oi=De.g?De.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Oi){var A=f.h;A.g||Oi.indexOf("spdy")==-1&&Oi.indexOf("quic")==-1&&Oi.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(is(A,A.h),A.h=null))}if(f.D){const ls=De.g?De.g.getResponseHeader("X-HTTP-Session-Id"):null;ls&&(f.ya=ls,X(f.I,f.D,ls))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-s.F,u.j.info("Handshake RTT: "+u.R+"ms")),f=u;var C=s;if(f.qa=$a(f,f.J?f.ia:null,f.W),C.K){_a(f.h,C);var J=C,de=f.L;de&&(J.I=de),J.B&&(es(J),wi(J)),f.g=C}else Ma(f);0<u.i.length&&Di(u)}else H[0]!="stop"&&H[0]!="close"||Tt(u,7);else u.G==3&&(H[0]=="stop"||H[0]=="close"?H[0]=="stop"?Tt(u,7):ss(u):H[0]!="noop"&&u.l&&u.l.ta(H),u.v=0)}}An(4)}catch{}}var ad=class{constructor(s,l){this.g=s,this.map=l}};function pa(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ma(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function ga(s){return s.h?1:s.g?s.g.size:0}function ns(s,l){return s.h?s.h==l:s.g?s.g.has(l):!1}function is(s,l){s.g?s.g.add(l):s.h=l}function _a(s,l){s.h&&s.h==l?s.h=null:s.g&&s.g.has(l)&&s.g.delete(l)}pa.prototype.cancel=function(){if(this.i=ya(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function ya(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let l=s.i;for(const u of s.g.values())l=l.concat(u.D);return l}return V(s.i)}function ld(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var l=[],u=s.length,f=0;f<u;f++)l.push(s[f]);return l}l=[],u=0;for(f in s)l[u++]=s[f];return l}function cd(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var l=[];s=s.length;for(var u=0;u<s;u++)l.push(u);return l}l=[],u=0;for(const f in s)l[u++]=f;return l}}}function va(s,l){if(s.forEach&&typeof s.forEach=="function")s.forEach(l,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,l,void 0);else for(var u=cd(s),f=ld(s),T=f.length,A=0;A<T;A++)l.call(void 0,f[A],u&&u[A],s)}var Ea=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ud(s,l){if(s){s=s.split("&");for(var u=0;u<s.length;u++){var f=s[u].indexOf("="),T=null;if(0<=f){var A=s[u].substring(0,f);T=s[u].substring(f+1)}else A=s[u];l(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function It(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof It){this.h=s.h,bi(this,s.j),this.o=s.o,this.g=s.g,Ai(this,s.s),this.l=s.l;var l=s.i,u=new Dn;u.i=l.i,l.g&&(u.g=new Map(l.g),u.h=l.h),Ia(this,u),this.m=s.m}else s&&(l=String(s).match(Ea))?(this.h=!1,bi(this,l[1]||"",!0),this.o=Cn(l[2]||""),this.g=Cn(l[3]||"",!0),Ai(this,l[4]),this.l=Cn(l[5]||"",!0),Ia(this,l[6]||"",!0),this.m=Cn(l[7]||"")):(this.h=!1,this.i=new Dn(null,this.h))}It.prototype.toString=function(){var s=[],l=this.j;l&&s.push(kn(l,Ta,!0),":");var u=this.g;return(u||l=="file")&&(s.push("//"),(l=this.o)&&s.push(kn(l,Ta,!0),"@"),s.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&s.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&s.push("/"),s.push(kn(u,u.charAt(0)=="/"?fd:dd,!0))),(u=this.i.toString())&&s.push("?",u),(u=this.m)&&s.push("#",kn(u,md)),s.join("")};function je(s){return new It(s)}function bi(s,l,u){s.j=u?Cn(l,!0):l,s.j&&(s.j=s.j.replace(/:$/,""))}function Ai(s,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);s.s=l}else s.s=null}function Ia(s,l,u){l instanceof Dn?(s.i=l,gd(s.i,s.h)):(u||(l=kn(l,pd)),s.i=new Dn(l,s.h))}function X(s,l,u){s.i.set(l,u)}function Ri(s){return X(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function Cn(s,l){return s?l?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function kn(s,l,u){return typeof s=="string"?(s=encodeURI(s).replace(l,hd),u&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function hd(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Ta=/[#\/\?@]/g,dd=/[#\?:]/g,fd=/[#\?]/g,pd=/[#\?@]/g,md=/#/g;function Dn(s,l){this.h=this.g=null,this.i=s||null,this.j=!!l}function it(s){s.g||(s.g=new Map,s.h=0,s.i&&ud(s.i,function(l,u){s.add(decodeURIComponent(l.replace(/\+/g," ")),u)}))}n=Dn.prototype,n.add=function(s,l){it(this),this.i=null,s=qt(this,s);var u=this.g.get(s);return u||this.g.set(s,u=[]),u.push(l),this.h+=1,this};function wa(s,l){it(s),l=qt(s,l),s.g.has(l)&&(s.i=null,s.h-=s.g.get(l).length,s.g.delete(l))}function ba(s,l){return it(s),l=qt(s,l),s.g.has(l)}n.forEach=function(s,l){it(this),this.g.forEach(function(u,f){u.forEach(function(T){s.call(l,T,f,this)},this)},this)},n.na=function(){it(this);const s=Array.from(this.g.values()),l=Array.from(this.g.keys()),u=[];for(let f=0;f<l.length;f++){const T=s[f];for(let A=0;A<T.length;A++)u.push(l[f])}return u},n.V=function(s){it(this);let l=[];if(typeof s=="string")ba(this,s)&&(l=l.concat(this.g.get(qt(this,s))));else{s=Array.from(this.g.values());for(let u=0;u<s.length;u++)l=l.concat(s[u])}return l},n.set=function(s,l){return it(this),this.i=null,s=qt(this,s),ba(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[l]),this.h+=1,this},n.get=function(s,l){return s?(s=this.V(s),0<s.length?String(s[0]):l):l};function Aa(s,l,u){wa(s,l),0<u.length&&(s.i=null,s.g.set(qt(s,l),V(u)),s.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],l=Array.from(this.g.keys());for(var u=0;u<l.length;u++){var f=l[u];const A=encodeURIComponent(String(f)),C=this.V(f);for(f=0;f<C.length;f++){var T=A;C[f]!==""&&(T+="="+encodeURIComponent(String(C[f]))),s.push(T)}}return this.i=s.join("&")};function qt(s,l){return l=String(l),s.j&&(l=l.toLowerCase()),l}function gd(s,l){l&&!s.j&&(it(s),s.i=null,s.g.forEach(function(u,f){var T=f.toLowerCase();f!=T&&(wa(this,f),Aa(this,T,u))},s)),s.j=l}function _d(s,l){const u=new Sn;if(c.Image){const f=new Image;f.onload=R(rt,u,"TestLoadImage: loaded",!0,l,f),f.onerror=R(rt,u,"TestLoadImage: error",!1,l,f),f.onabort=R(rt,u,"TestLoadImage: abort",!1,l,f),f.ontimeout=R(rt,u,"TestLoadImage: timeout",!1,l,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=s}else l(!1)}function yd(s,l){const u=new Sn,f=new AbortController,T=setTimeout(()=>{f.abort(),rt(u,"TestPingServer: timeout",!1,l)},1e4);fetch(s,{signal:f.signal}).then(A=>{clearTimeout(T),A.ok?rt(u,"TestPingServer: ok",!0,l):rt(u,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),rt(u,"TestPingServer: error",!1,l)})}function rt(s,l,u,f,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),f(u)}catch{}}function vd(){this.g=new td}function Ed(s,l,u){const f=u||"";try{va(s,function(T,A){let C=T;d(T)&&(C=Gr(T)),l.push(f+A+"="+encodeURIComponent(C))})}catch(T){throw l.push(f+"type="+encodeURIComponent("_badmap")),T}}function Si(s){this.l=s.Ub||null,this.j=s.eb||!1}D(Si,Kr),Si.prototype.g=function(){return new Pi(this.l,this.j)},Si.prototype.i=function(s){return function(){return s}}({});function Pi(s,l){ge.call(this),this.D=s,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(Pi,ge),n=Pi.prototype,n.open=function(s,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=l,this.readyState=1,Vn(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(l.body=s),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Nn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Vn(this)),this.g&&(this.readyState=3,Vn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ra(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ra(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var l=s.value?s.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!s.done}))&&(this.response=this.responseText+=l)}s.done?Nn(this):Vn(this),this.readyState==3&&Ra(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,Nn(this))},n.Qa=function(s){this.g&&(this.response=s,Nn(this))},n.ga=function(){this.g&&Nn(this)};function Nn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,Vn(s)}n.setRequestHeader=function(s,l){this.u.append(s,l)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],l=this.h.entries();for(var u=l.next();!u.done;)u=u.value,s.push(u[0]+": "+u[1]),u=l.next();return s.join(`\r
`)};function Vn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Pi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Sa(s){let l="";return ie(s,function(u,f){l+=f,l+=":",l+=u,l+=`\r
`}),l}function rs(s,l,u){e:{for(f in u){var f=!1;break e}f=!0}f||(u=Sa(u),typeof s=="string"?u!=null&&encodeURIComponent(String(u)):X(s,l,u))}function ee(s){ge.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(ee,ge);var Id=/^https?$/i,Td=["POST","PUT"];n=ee.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,l,u,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);l=l?l.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Xr.g(),this.v=this.o?na(this.o):na(Xr),this.g.onreadystatechange=b(this.Ea,this);try{this.B=!0,this.g.open(l,String(s),!0),this.B=!1}catch(A){Pa(this,A);return}if(s=u||"",u=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var T in f)u.set(T,f[T]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const A of f.keys())u.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(u.keys()).find(A=>A.toLowerCase()=="content-type"),T=c.FormData&&s instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Td,l,void 0))||f||T||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,C]of u)this.g.setRequestHeader(A,C);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Da(this),this.u=!0,this.g.send(s),this.u=!1}catch(A){Pa(this,A)}};function Pa(s,l){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=l,s.m=5,Ca(s),Ci(s)}function Ca(s){s.A||(s.A=!0,we(s,"complete"),we(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,we(this,"complete"),we(this,"abort"),Ci(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ci(this,!0)),ee.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ka(this):this.bb())},n.bb=function(){ka(this)};function ka(s){if(s.h&&typeof a<"u"&&(!s.v[1]||$e(s)!=4||s.Z()!=2)){if(s.u&&$e(s)==4)Yo(s.Ea,0,s);else if(we(s,"readystatechange"),$e(s)==4){s.h=!1;try{const C=s.Z();e:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var u;if(!(u=l)){var f;if(f=C===0){var T=String(s.D).match(Ea)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),f=!Id.test(T?T.toLowerCase():"")}u=f}if(u)we(s,"complete"),we(s,"success");else{s.m=6;try{var A=2<$e(s)?s.g.statusText:""}catch{A=""}s.l=A+" ["+s.Z()+"]",Ca(s)}}finally{Ci(s)}}}}function Ci(s,l){if(s.g){Da(s);const u=s.g,f=s.v[0]?()=>{}:null;s.g=null,s.v=null,l||we(s,"ready");try{u.onreadystatechange=f}catch{}}}function Da(s){s.I&&(c.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function $e(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<$e(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var l=this.g.responseText;return s&&l.indexOf(s)==0&&(l=l.substring(s.length)),ed(l)}};function Na(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function wd(s){const l={};s=(s.g&&2<=$e(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<s.length;f++){if(G(s[f]))continue;var u=I(s[f]);const T=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const A=l[T]||[];l[T]=A,A.push(u)}E(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function On(s,l,u){return u&&u.internalChannelParams&&u.internalChannelParams[s]||l}function Va(s){this.Aa=0,this.i=[],this.j=new Sn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=On("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=On("baseRetryDelayMs",5e3,s),this.cb=On("retryDelaySeedMs",1e4,s),this.Wa=On("forwardChannelMaxRetries",2,s),this.wa=On("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new pa(s&&s.concurrentRequestLimit),this.Da=new vd,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Va.prototype,n.la=8,n.G=1,n.connect=function(s,l,u,f){be(0),this.W=s,this.H=l||{},u&&f!==void 0&&(this.H.OSID=u,this.H.OAID=f),this.F=this.X,this.I=$a(this,null,this.W),Di(this)};function ss(s){if(Oa(s),s.G==3){var l=s.U++,u=je(s.I);if(X(u,"SID",s.K),X(u,"RID",l),X(u,"TYPE","terminate"),Ln(s,u),l=new nt(s,s.j,l),l.L=2,l.v=Ri(je(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=l.v,u=!0),u||(l.g=qa(l.j,null),l.g.ea(l.v)),l.F=Date.now(),wi(l)}ja(s)}function ki(s){s.g&&(as(s),s.g.cancel(),s.g=null)}function Oa(s){ki(s),s.u&&(c.clearTimeout(s.u),s.u=null),Ni(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&c.clearTimeout(s.s),s.s=null)}function Di(s){if(!ma(s.h)&&!s.s){s.s=!0;var l=s.Ga;En||Go(),In||(En(),In=!0),Fr.add(l,s),s.B=0}}function bd(s,l){return ga(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=l.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=Rn(b(s.Ga,s,l),Ba(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const T=new nt(this,this.j,s);let A=this.o;if(this.S&&(A?(A=m(A),v(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)e:{for(var l=0,u=0;u<this.i.length;u++){t:{var f=this.i[u];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=u;break e}if(l===4096||u===this.i.length-1){l=u+1;break e}}l=1e3}else l=1e3;l=xa(this,T,l),u=je(this.I),X(u,"RID",s),X(u,"CVER",22),this.D&&X(u,"X-HTTP-Session-Id",this.D),Ln(this,u),A&&(this.O?l="headers="+encodeURIComponent(String(Sa(A)))+"&"+l:this.m&&rs(u,this.m,A)),is(this.h,T),this.Ua&&X(u,"TYPE","init"),this.P?(X(u,"$req",l),X(u,"SID","null"),T.T=!0,Zr(T,u,null)):Zr(T,u,l),this.G=2}}else this.G==3&&(s?La(this,s):this.i.length==0||ma(this.h)||La(this))};function La(s,l){var u;l?u=l.l:u=s.U++;const f=je(s.I);X(f,"SID",s.K),X(f,"RID",u),X(f,"AID",s.T),Ln(s,f),s.m&&s.o&&rs(f,s.m,s.o),u=new nt(s,s.j,u,s.B+1),s.m===null&&(u.H=s.o),l&&(s.i=l.D.concat(s.i)),l=xa(s,u,1e3),u.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),is(s.h,u),Zr(u,f,l)}function Ln(s,l){s.H&&ie(s.H,function(u,f){X(l,f,u)}),s.l&&va({},function(u,f){X(l,f,u)})}function xa(s,l,u){u=Math.min(s.i.length,u);var f=s.l?b(s.l.Na,s.l,s):null;e:{var T=s.i;let A=-1;for(;;){const C=["count="+u];A==-1?0<u?(A=T[0].g,C.push("ofs="+A)):A=0:C.push("ofs="+A);let J=!0;for(let de=0;de<u;de++){let H=T[de].g;const _e=T[de].map;if(H-=A,0>H)A=Math.max(0,T[de].g-100),J=!1;else try{Ed(_e,C,"req"+H+"_")}catch{f&&f(_e)}}if(J){f=C.join("&");break e}}}return s=s.i.splice(0,u),l.D=s,f}function Ma(s){if(!s.g&&!s.u){s.Y=1;var l=s.Fa;En||Go(),In||(En(),In=!0),Fr.add(l,s),s.v=0}}function os(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=Rn(b(s.Fa,s),Ba(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,Ua(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=Rn(b(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,be(10),ki(this),Ua(this))};function as(s){s.A!=null&&(c.clearTimeout(s.A),s.A=null)}function Ua(s){s.g=new nt(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var l=je(s.qa);X(l,"RID","rpc"),X(l,"SID",s.K),X(l,"AID",s.T),X(l,"CI",s.F?"0":"1"),!s.F&&s.ja&&X(l,"TO",s.ja),X(l,"TYPE","xmlhttp"),Ln(s,l),s.m&&s.o&&rs(l,s.m,s.o),s.L&&(s.g.I=s.L);var u=s.g;s=s.ia,u.L=1,u.v=Ri(je(l)),u.m=null,u.P=!0,ha(u,s)}n.Za=function(){this.C!=null&&(this.C=null,ki(this),os(this),be(19))};function Ni(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function Fa(s,l){var u=null;if(s.g==l){Ni(s),as(s),s.g=null;var f=2}else if(ns(s.h,l))u=l.D,_a(s.h,l),f=1;else return;if(s.G!=0){if(l.o)if(f==1){u=l.m?l.m.length:0,l=Date.now()-l.F;var T=s.B;f=Ei(),we(f,new aa(f,u)),Di(s)}else Ma(s);else if(T=l.s,T==3||T==0&&0<l.X||!(f==1&&bd(s,l)||f==2&&os(s)))switch(u&&0<u.length&&(l=s.h,l.i=l.i.concat(u)),T){case 1:Tt(s,5);break;case 4:Tt(s,10);break;case 3:Tt(s,6);break;default:Tt(s,2)}}}function Ba(s,l){let u=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(u*=2),u*l}function Tt(s,l){if(s.j.info("Error code "+l),l==2){var u=b(s.fb,s),f=s.Xa;const T=!f;f=new It(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||bi(f,"https"),Ri(f),T?_d(f.toString(),u):yd(f.toString(),u)}else be(2);s.G=0,s.l&&s.l.sa(l),ja(s),Oa(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),be(2)):(this.j.info("Failed to ping google.com"),be(1))};function ja(s){if(s.G=0,s.ka=[],s.l){const l=ya(s.h);(l.length!=0||s.i.length!=0)&&(k(s.ka,l),k(s.ka,s.i),s.h.i.length=0,V(s.i),s.i.length=0),s.l.ra()}}function $a(s,l,u){var f=u instanceof It?je(u):new It(u);if(f.g!="")l&&(f.g=l+"."+f.g),Ai(f,f.s);else{var T=c.location;f=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var A=new It(null);f&&bi(A,f),l&&(A.g=l),T&&Ai(A,T),u&&(A.l=u),f=A}return u=s.D,l=s.ya,u&&l&&X(f,u,l),X(f,"VER",s.la),Ln(s,f),f}function qa(s,l,u){if(l&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=s.Ca&&!s.pa?new ee(new Si({eb:u})):new ee(s.pa),l.Ha(s.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function za(){}n=za.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Vi(){}Vi.prototype.g=function(s,l){return new Se(s,l)};function Se(s,l){ge.call(this),this.g=new Va(l),this.l=s,this.h=l&&l.messageUrlParams||null,s=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(s?s["X-WebChannel-Content-Type"]=l.messageContentType:s={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(s?s["X-WebChannel-Client-Profile"]=l.va:s={"X-WebChannel-Client-Profile":l.va}),this.g.S=s,(s=l&&l.Sb)&&!G(s)&&(this.g.m=s),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!G(l)&&(this.g.D=l,s=this.h,s!==null&&l in s&&(s=this.h,l in s&&delete s[l])),this.j=new zt(this)}D(Se,ge),Se.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Se.prototype.close=function(){ss(this.g)},Se.prototype.o=function(s){var l=this.g;if(typeof s=="string"){var u={};u.__data__=s,s=u}else this.u&&(u={},u.__data__=Gr(s),s=u);l.i.push(new ad(l.Ya++,s)),l.G==3&&Di(l)},Se.prototype.N=function(){this.g.l=null,delete this.j,ss(this.g),delete this.g,Se.aa.N.call(this)};function Ha(s){Qr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var l=s.__sm__;if(l){e:{for(const u in l){s=u;break e}s=void 0}(this.i=s)&&(s=this.i,l=l!==null&&s in l?l[s]:void 0),this.data=l}else this.data=s}D(Ha,Qr);function Wa(){Jr.call(this),this.status=1}D(Wa,Jr);function zt(s){this.g=s}D(zt,za),zt.prototype.ua=function(){we(this.g,"a")},zt.prototype.ta=function(s){we(this.g,new Ha(s))},zt.prototype.sa=function(s){we(this.g,new Wa)},zt.prototype.ra=function(){we(this.g,"b")},Vi.prototype.createWebChannel=Vi.prototype.g,Se.prototype.send=Se.prototype.o,Se.prototype.open=Se.prototype.m,Se.prototype.close=Se.prototype.close,su=function(){return new Vi},ru=function(){return Ei()},iu=vt,ks={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ii.NO_ERROR=0,Ii.TIMEOUT=8,Ii.HTTP_ERROR=6,Hi=Ii,la.COMPLETE="complete",nu=la,ia.EventType=bn,bn.OPEN="a",bn.CLOSE="b",bn.ERROR="c",bn.MESSAGE="d",ge.prototype.listen=ge.prototype.K,Un=ia,ee.prototype.listenOnce=ee.prototype.L,ee.prototype.getLastError=ee.prototype.Ka,ee.prototype.getLastErrorCode=ee.prototype.Ba,ee.prototype.getStatus=ee.prototype.Z,ee.prototype.getResponseJson=ee.prototype.Oa,ee.prototype.getResponseText=ee.prototype.oa,ee.prototype.send=ee.prototype.ea,ee.prototype.setWithCredentials=ee.prototype.Ha,tu=ee}).apply(typeof xi<"u"?xi:typeof self<"u"?self:typeof window<"u"?window:{});const Tl="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ee.UNAUTHENTICATED=new Ee(null),Ee.GOOGLE_CREDENTIALS=new Ee("google-credentials-uid"),Ee.FIRST_PARTY=new Ee("first-party-uid"),Ee.MOCK_USER=new Ee("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ot=new Js("@firebase/firestore");function xn(){return Ot.logLevel}function N(n,...e){if(Ot.logLevel<=$.DEBUG){const t=e.map(uo);Ot.debug(`Firestore (${fn}): ${n}`,...t)}}function Ye(n,...e){if(Ot.logLevel<=$.ERROR){const t=e.map(uo);Ot.error(`Firestore (${fn}): ${n}`,...t)}}function Lt(n,...e){if(Ot.logLevel<=$.WARN){const t=e.map(uo);Ot.warn(`Firestore (${fn}): ${n}`,...t)}}function uo(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n="Unexpected state"){const e=`FIRESTORE (${fn}) INTERNAL ASSERTION FAILED: `+n;throw Ye(e),new Error(e)}function Q(n,e){n||U()}function B(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class L extends et{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class au{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ee.UNAUTHENTICATED))}shutdown(){}}class ug{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class hg{constructor(e){this.t=e,this.currentUser=Ee.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Q(this.o===void 0);let i=this.i;const r=h=>this.i!==i?(i=this.i,t(h)):Promise.resolve();let o=new ft;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new ft,e.enqueueRetryable(()=>r(this.currentUser))};const a=()=>{const h=o;e.enqueueRetryable(async()=>{await h.promise,await r(this.currentUser)})},c=h=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new ft)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(Q(typeof i.accessToken=="string"),new ou(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string"),new Ee(e)}}class dg{constructor(e,t,i){this.l=e,this.h=t,this.P=i,this.type="FirstParty",this.user=Ee.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class fg{constructor(e,t,i){this.l=e,this.h=t,this.P=i}getToken(){return Promise.resolve(new dg(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Ee.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class pg{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class mg{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Q(this.o===void 0);const i=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>i(o))};const r=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>r(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?r(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Q(typeof t.token=="string"),this.R=t.token,new pg(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let i="";for(;i.length<20;){const r=gg(40);for(let o=0;o<r.length;++o)i.length<20&&r[o]<t&&(i+=e.charAt(r[o]%e.length))}return i}}function W(n,e){return n<e?-1:n>e?1:0}function sn(n,e,t){return n.length===e.length&&n.every((i,r)=>t(i,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new L(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new L(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new L(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new L(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor(1e6*(e-1e3*t));return new oe(t,i)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?W(this.nanoseconds,e.nanoseconds):W(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.timestamp=e}static fromTimestamp(e){return new F(e)}static min(){return new F(new oe(0,0))}static max(){return new F(new oe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e,t,i){t===void 0?t=0:t>e.length&&U(),i===void 0?i=e.length-t:i>e.length-t&&U(),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return Qn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Qn?e.forEach(i=>{t.push(i)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let r=0;r<i;r++){const o=e.get(r),a=t.get(r);if(o<a)return-1;if(o>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Y extends Qn{construct(e,t,i){return new Y(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new L(S.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter(r=>r.length>0))}return new Y(t)}static emptyPath(){return new Y([])}}const _g=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ce extends Qn{construct(e,t,i){return new ce(e,t,i)}static isValidIdentifier(e){return _g.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ce.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ce(["__name__"])}static fromServerFormat(e){const t=[];let i="",r=0;const o=()=>{if(i.length===0)throw new L(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let a=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new L(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[r+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new L(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=h,r+=2}else c==="`"?(a=!a,r++):c!=="."||a?(i+=c,r++):(o(),r++)}if(o(),a)throw new L(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ce(t)}static emptyPath(){return new ce([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.path=e}static fromPath(e){return new x(Y.fromString(e))}static fromName(e){return new x(Y.fromString(e).popFirst(5))}static empty(){return new x(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Y.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new x(new Y(e.slice()))}}function yg(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,r=F.fromTimestamp(i===1e9?new oe(t+1,0):new oe(t,i));return new pt(r,x.empty(),e)}function vg(n){return new pt(n.readTime,n.key,-1)}class pt{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new pt(F.min(),x.empty(),-1)}static max(){return new pt(F.max(),x.empty(),-1)}}function Eg(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(n.documentKey,e.documentKey),t!==0?t:W(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ig="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Tg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oi(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==Ig)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((i,r)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(i,r)},this.catchCallback=o=>{this.wrapFailure(t,o).next(i,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,i)=>{t(e)})}static reject(e){return new P((t,i)=>{i(e)})}static waitFor(e){return new P((t,i)=>{let r=0,o=0,a=!1;e.forEach(c=>{++r,c.next(()=>{++o,a&&o===r&&t()},h=>i(h))}),a=!0,o===r&&t()})}static or(e){let t=P.resolve(!1);for(const i of e)t=t.next(r=>r?P.resolve(r):i());return t}static forEach(e,t){const i=[];return e.forEach((r,o)=>{i.push(t.call(this,r,o))}),this.waitFor(i)}static mapArray(e,t){return new P((i,r)=>{const o=e.length,a=new Array(o);let c=0;for(let h=0;h<o;h++){const d=h;t(e[d]).next(p=>{a[d]=p,++c,c===o&&i(a)},p=>r(p))}})}static doWhile(e,t){return new P((i,r)=>{const o=()=>{e()===!0?t().next(()=>{o()},r):i()};o()})}}function wg(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ai(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ie(i),this.se=i=>t.writeSequenceNumber(i))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}fo.oe=-1;function _r(n){return n==null}function sr(n){return n===0&&1/n==-1/0}function bg(n){return typeof n=="number"&&Number.isInteger(n)&&!sr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Ft(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function lu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e,t){this.comparator=e,this.root=t||fe.EMPTY}insert(e,t){return new Z(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,fe.BLACK,null,null))}remove(e){return new Z(this.comparator,this.root.remove(e,this.comparator).copy(null,null,fe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const r=this.comparator(e,i.key);if(r===0)return t+i.left.size;r<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,i)=>(e(t,i),!1))}toString(){const e=[];return this.inorderTraversal((t,i)=>(e.push(`${t}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Mi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Mi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Mi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Mi(this.root,e,this.comparator,!0)}}class Mi{constructor(e,t,i,r){this.isReverse=r,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?i(e.key,t):1,t&&r&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class fe{constructor(e,t,i,r,o){this.key=e,this.value=t,this.color=i??fe.RED,this.left=r??fe.EMPTY,this.right=o??fe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,r,o){return new fe(e??this.key,t??this.value,i??this.color,r??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let r=this;const o=i(e,r.key);return r=o<0?r.copy(null,null,null,r.left.insert(e,t,i),null):o===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,i)),r.fixUp()}removeMin(){if(this.left.isEmpty())return fe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return fe.EMPTY;i=r.right.min(),r=r.copy(i.key,i.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,fe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,fe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw U();const e=this.left.check();if(e!==this.right.check())throw U();return e+(this.isRed()?0:1)}}fe.EMPTY=null,fe.RED=!0,fe.BLACK=!1;fe.EMPTY=new class{constructor(){this.size=0}get key(){throw U()}get value(){throw U()}get color(){throw U()}get left(){throw U()}get right(){throw U()}copy(e,t,i,r,o){return this}insert(e,t,i){return new fe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.comparator=e,this.data=new Z(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,i)=>(e(t),!1))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const r=i.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new bl(this.data.getIterator())}getIteratorFrom(e){return new bl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(i=>{t=t.add(i)}),t}isEqual(e){if(!(e instanceof pe)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,o=i.getNext().key;if(this.comparator(r,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new pe(this.comparator);return t.data=e,t}}class bl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.fields=e,e.sort(ce.comparator)}static empty(){return new Pe([])}unionWith(e){let t=new pe(ce.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new Pe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return sn(this.fields,e.fields,(t,i)=>t.isEqual(i))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new cu("Invalid base64 string: "+o):o}}(e);return new he(t)}static fromUint8Array(e){const t=function(r){let o="";for(let a=0;a<r.length;++a)o+=String.fromCharCode(r[a]);return o}(e);return new he(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const i=new Uint8Array(t.length);for(let r=0;r<t.length;r++)i[r]=t.charCodeAt(r);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return W(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}he.EMPTY_BYTE_STRING=new he("");const Ag=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function mt(n){if(Q(!!n),typeof n=="string"){let e=0;const t=Ag.exec(n);if(Q(!!t),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:re(n.seconds),nanos:re(n.nanos)}}function re(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function xt(n){return typeof n=="string"?he.fromBase64String(n):he.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function po(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function mo(n){const e=n.mapValue.fields.__previous_value__;return po(e)?mo(e):e}function Jn(n){const e=mt(n.mapValue.fields.__local_write_time__.timestampValue);return new oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{constructor(e,t,i,r,o,a,c,h,d){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=r,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=d}}class on{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new on("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof on&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui={mapValue:{}};function Mt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?po(n)?4:Pg(n)?9007199254740991:Sg(n)?10:11:U()}function Ue(n,e){if(n===e)return!0;const t=Mt(n);if(t!==Mt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Jn(n).isEqual(Jn(e));case 3:return function(r,o){if(typeof r.timestampValue=="string"&&typeof o.timestampValue=="string"&&r.timestampValue.length===o.timestampValue.length)return r.timestampValue===o.timestampValue;const a=mt(r.timestampValue),c=mt(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,o){return xt(r.bytesValue).isEqual(xt(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,o){return re(r.geoPointValue.latitude)===re(o.geoPointValue.latitude)&&re(r.geoPointValue.longitude)===re(o.geoPointValue.longitude)}(n,e);case 2:return function(r,o){if("integerValue"in r&&"integerValue"in o)return re(r.integerValue)===re(o.integerValue);if("doubleValue"in r&&"doubleValue"in o){const a=re(r.doubleValue),c=re(o.doubleValue);return a===c?sr(a)===sr(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return sn(n.arrayValue.values||[],e.arrayValue.values||[],Ue);case 10:case 11:return function(r,o){const a=r.mapValue.fields||{},c=o.mapValue.fields||{};if(wl(a)!==wl(c))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(c[h]===void 0||!Ue(a[h],c[h])))return!1;return!0}(n,e);default:return U()}}function Xn(n,e){return(n.values||[]).find(t=>Ue(t,e))!==void 0}function an(n,e){if(n===e)return 0;const t=Mt(n),i=Mt(e);if(t!==i)return W(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return W(n.booleanValue,e.booleanValue);case 2:return function(o,a){const c=re(o.integerValue||o.doubleValue),h=re(a.integerValue||a.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,e);case 3:return Al(n.timestampValue,e.timestampValue);case 4:return Al(Jn(n),Jn(e));case 5:return W(n.stringValue,e.stringValue);case 6:return function(o,a){const c=xt(o),h=xt(a);return c.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){const c=o.split("/"),h=a.split("/");for(let d=0;d<c.length&&d<h.length;d++){const p=W(c[d],h[d]);if(p!==0)return p}return W(c.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){const c=W(re(o.latitude),re(a.latitude));return c!==0?c:W(re(o.longitude),re(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Rl(n.arrayValue,e.arrayValue);case 10:return function(o,a){var c,h,d,p;const y=o.fields||{},b=a.fields||{},R=(c=y.value)===null||c===void 0?void 0:c.arrayValue,D=(h=b.value)===null||h===void 0?void 0:h.arrayValue,V=W(((d=R==null?void 0:R.values)===null||d===void 0?void 0:d.length)||0,((p=D==null?void 0:D.values)===null||p===void 0?void 0:p.length)||0);return V!==0?V:Rl(R,D)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===Ui.mapValue&&a===Ui.mapValue)return 0;if(o===Ui.mapValue)return 1;if(a===Ui.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),d=a.fields||{},p=Object.keys(d);h.sort(),p.sort();for(let y=0;y<h.length&&y<p.length;++y){const b=W(h[y],p[y]);if(b!==0)return b;const R=an(c[h[y]],d[p[y]]);if(R!==0)return R}return W(h.length,p.length)}(n.mapValue,e.mapValue);default:throw U()}}function Al(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return W(n,e);const t=mt(n),i=mt(e),r=W(t.seconds,i.seconds);return r!==0?r:W(t.nanos,i.nanos)}function Rl(n,e){const t=n.values||[],i=e.values||[];for(let r=0;r<t.length&&r<i.length;++r){const o=an(t[r],i[r]);if(o)return o}return W(t.length,i.length)}function ln(n){return Ds(n)}function Ds(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const i=mt(t);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return xt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return x.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let i="[",r=!0;for(const o of t.values||[])r?r=!1:i+=",",i+=Ds(o);return i+"]"}(n.arrayValue):"mapValue"in n?function(t){const i=Object.keys(t.fields||{}).sort();let r="{",o=!0;for(const a of i)o?o=!1:r+=",",r+=`${a}:${Ds(t.fields[a])}`;return r+"}"}(n.mapValue):U()}function Ns(n){return!!n&&"integerValue"in n}function go(n){return!!n&&"arrayValue"in n}function Sl(n){return!!n&&"nullValue"in n}function Pl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Wi(n){return!!n&&"mapValue"in n}function Sg(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function $n(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Ft(n.mapValue.fields,(t,i)=>e.mapValue.fields[t]=$n(i)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=$n(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Pg(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.value=e}static empty(){return new Ae({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!Wi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=$n(t)}setAll(e){let t=ce.emptyPath(),i={},r=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const h=this.getFieldsMap(t);this.applyChanges(h,i,r),i={},r=[],t=c.popLast()}a?i[c.lastSegment()]=$n(a):r.push(c.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,i,r)}delete(e){const t=this.field(e.popLast());Wi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ue(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let r=t.mapValue.fields[e.get(i)];Wi(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,i){Ft(t,(r,o)=>e[r]=o);for(const r of i)delete e[r]}clone(){return new Ae($n(this.value))}}function uu(n){const e=[];return Ft(n.fields,(t,i)=>{const r=new ce([t]);if(Wi(i)){const o=uu(i.mapValue).fields;if(o.length===0)e.push(r);else for(const a of o)e.push(r.child(a))}else e.push(r)}),new Pe(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e,t,i,r,o,a,c){this.key=e,this.documentType=t,this.version=i,this.readTime=r,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ie(e,0,F.min(),F.min(),F.min(),Ae.empty(),0)}static newFoundDocument(e,t,i,r){return new Ie(e,1,t,F.min(),i,r,0)}static newNoDocument(e,t){return new Ie(e,2,t,F.min(),F.min(),Ae.empty(),0)}static newUnknownDocument(e,t){return new Ie(e,3,t,F.min(),F.min(),Ae.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(F.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ae.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ae.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ie&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ie(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(e,t){this.position=e,this.inclusive=t}}function Cl(n,e,t){let i=0;for(let r=0;r<n.position.length;r++){const o=e[r],a=n.position[r];if(o.field.isKeyField()?i=x.comparator(x.fromName(a.referenceValue),t.key):i=an(a,t.data.field(o.field)),o.dir==="desc"&&(i*=-1),i!==0)break}return i}function kl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ue(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(e,t="asc"){this.field=e,this.dir=t}}function Cg(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{}class ae extends hu{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new Dg(e,t,i):t==="array-contains"?new Og(e,i):t==="in"?new Lg(e,i):t==="not-in"?new xg(e,i):t==="array-contains-any"?new Mg(e,i):new ae(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new Ng(e,i):new Vg(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(an(t,this.value)):t!==null&&Mt(this.value)===Mt(t)&&this.matchesComparison(an(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Fe extends hu{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new Fe(e,t)}matches(e){return du(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function du(n){return n.op==="and"}function fu(n){return kg(n)&&du(n)}function kg(n){for(const e of n.filters)if(e instanceof Fe)return!1;return!0}function Vs(n){if(n instanceof ae)return n.field.canonicalString()+n.op.toString()+ln(n.value);if(fu(n))return n.filters.map(e=>Vs(e)).join(",");{const e=n.filters.map(t=>Vs(t)).join(",");return`${n.op}(${e})`}}function pu(n,e){return n instanceof ae?function(i,r){return r instanceof ae&&i.op===r.op&&i.field.isEqual(r.field)&&Ue(i.value,r.value)}(n,e):n instanceof Fe?function(i,r){return r instanceof Fe&&i.op===r.op&&i.filters.length===r.filters.length?i.filters.reduce((o,a,c)=>o&&pu(a,r.filters[c]),!0):!1}(n,e):void U()}function mu(n){return n instanceof ae?function(t){return`${t.field.canonicalString()} ${t.op} ${ln(t.value)}`}(n):n instanceof Fe?function(t){return t.op.toString()+" {"+t.getFilters().map(mu).join(" ,")+"}"}(n):"Filter"}class Dg extends ae{constructor(e,t,i){super(e,t,i),this.key=x.fromName(i.referenceValue)}matches(e){const t=x.comparator(e.key,this.key);return this.matchesComparison(t)}}class Ng extends ae{constructor(e,t){super(e,"in",t),this.keys=gu("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Vg extends ae{constructor(e,t){super(e,"not-in",t),this.keys=gu("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function gu(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(i=>x.fromName(i.referenceValue))}class Og extends ae{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return go(t)&&Xn(t.arrayValue,this.value)}}class Lg extends ae{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Xn(this.value.arrayValue,t)}}class xg extends ae{constructor(e,t){super(e,"not-in",t)}matches(e){if(Xn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Xn(this.value.arrayValue,t)}}class Mg extends ae{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!go(t)||!t.arrayValue.values)&&t.arrayValue.values.some(i=>Xn(this.value.arrayValue,i))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e,t=null,i=[],r=[],o=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=r,this.limit=o,this.startAt=a,this.endAt=c,this.ue=null}}function Dl(n,e=null,t=[],i=[],r=null,o=null,a=null){return new Ug(n,e,t,i,r,o,a)}function _o(n){const e=B(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(i=>Vs(i)).join(","),t+="|ob:",t+=e.orderBy.map(i=>function(o){return o.field.canonicalString()+o.dir}(i)).join(","),_r(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(i=>ln(i)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(i=>ln(i)).join(",")),e.ue=t}return e.ue}function yo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Cg(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!pu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!kl(n.startAt,e.startAt)&&kl(n.endAt,e.endAt)}function Os(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e,t=null,i=[],r=[],o=null,a="F",c=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=r,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Fg(n,e,t,i,r,o,a,c){return new yr(n,e,t,i,r,o,a,c)}function vo(n){return new yr(n)}function Nl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Bg(n){return n.collectionGroup!==null}function qn(n){const e=B(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new pe(ce.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new ar(o,i))}),t.has(ce.keyField().canonicalString())||e.ce.push(new ar(ce.keyField(),i))}return e.ce}function Le(n){const e=B(n);return e.le||(e.le=jg(e,qn(n))),e.le}function jg(n,e){if(n.limitType==="F")return Dl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(r=>{const o=r.dir==="desc"?"asc":"desc";return new ar(r.field,o)});const t=n.endAt?new or(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new or(n.startAt.position,n.startAt.inclusive):null;return Dl(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function Ls(n,e,t){return new yr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function vr(n,e){return yo(Le(n),Le(e))&&n.limitType===e.limitType}function _u(n){return`${_o(Le(n))}|lt:${n.limitType}`}function Gt(n){return`Query(target=${function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map(r=>mu(r)).join(", ")}]`),_r(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map(r=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(r)).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map(r=>ln(r)).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map(r=>ln(r)).join(",")),`Target(${i})`}(Le(n))}; limitType=${n.limitType})`}function Er(n,e){return e.isFoundDocument()&&function(i,r){const o=r.key.path;return i.collectionGroup!==null?r.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(o):x.isDocumentKey(i.path)?i.path.isEqual(o):i.path.isImmediateParentOf(o)}(n,e)&&function(i,r){for(const o of qn(i))if(!o.field.isKeyField()&&r.data.field(o.field)===null)return!1;return!0}(n,e)&&function(i,r){for(const o of i.filters)if(!o.matches(r))return!1;return!0}(n,e)&&function(i,r){return!(i.startAt&&!function(a,c,h){const d=Cl(a,c,h);return a.inclusive?d<=0:d<0}(i.startAt,qn(i),r)||i.endAt&&!function(a,c,h){const d=Cl(a,c,h);return a.inclusive?d>=0:d>0}(i.endAt,qn(i),r))}(n,e)}function $g(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function yu(n){return(e,t)=>{let i=!1;for(const r of qn(n)){const o=qg(r,e,t);if(o!==0)return o;i=i||r.field.isKeyField()}return 0}}function qg(n,e,t){const i=n.field.isKeyField()?x.comparator(e.key,t.key):function(o,a,c){const h=a.data.field(o),d=c.data.field(o);return h!==null&&d!==null?an(h,d):U()}(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return U()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[r,o]of i)if(this.equalsFn(r,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),r=this.inner[i];if(r===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let o=0;o<r.length;o++)if(this.equalsFn(r[o][0],e))return void(r[o]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return i.length===1?delete this.inner[t]:i.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Ft(this.inner,(t,i)=>{for(const[r,o]of i)e(r,o)})}isEmpty(){return lu(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zg=new Z(x.comparator);function Ze(){return zg}const vu=new Z(x.comparator);function Fn(...n){let e=vu;for(const t of n)e=e.insert(t.key,t);return e}function Eu(n){let e=vu;return n.forEach((t,i)=>e=e.insert(t,i.overlayedDocument)),e}function At(){return zn()}function Iu(){return zn()}function zn(){return new pn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Hg=new Z(x.comparator),Wg=new pe(x.comparator);function j(...n){let e=Wg;for(const t of n)e=e.add(t);return e}const Gg=new pe(W);function Kg(){return Gg}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:sr(e)?"-0":e}}function Tu(n){return{integerValue:""+n}}function Qg(n,e){return bg(e)?Tu(e):Eo(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(){this._=void 0}}function Jg(n,e,t){return n instanceof Yn?function(r,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return o&&po(o)&&(o=mo(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(t,e):n instanceof Zn?bu(n,e):n instanceof ei?Au(n,e):function(r,o){const a=wu(r,o),c=Vl(a)+Vl(r.Pe);return Ns(a)&&Ns(r.Pe)?Tu(c):Eo(r.serializer,c)}(n,e)}function Xg(n,e,t){return n instanceof Zn?bu(n,e):n instanceof ei?Au(n,e):t}function wu(n,e){return n instanceof lr?function(i){return Ns(i)||function(o){return!!o&&"doubleValue"in o}(i)}(e)?e:{integerValue:0}:null}class Yn extends Ir{}class Zn extends Ir{constructor(e){super(),this.elements=e}}function bu(n,e){const t=Ru(e);for(const i of n.elements)t.some(r=>Ue(r,i))||t.push(i);return{arrayValue:{values:t}}}class ei extends Ir{constructor(e){super(),this.elements=e}}function Au(n,e){let t=Ru(e);for(const i of n.elements)t=t.filter(r=>!Ue(r,i));return{arrayValue:{values:t}}}class lr extends Ir{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Vl(n){return re(n.integerValue||n.doubleValue)}function Ru(n){return go(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(e,t){this.field=e,this.transform=t}}function Zg(n,e){return n.field.isEqual(e.field)&&function(i,r){return i instanceof Zn&&r instanceof Zn||i instanceof ei&&r instanceof ei?sn(i.elements,r.elements,Ue):i instanceof lr&&r instanceof lr?Ue(i.Pe,r.Pe):i instanceof Yn&&r instanceof Yn}(n.transform,e.transform)}class e_{constructor(e,t){this.version=e,this.transformResults=t}}class Ce{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ce}static exists(e){return new Ce(void 0,e)}static updateTime(e){return new Ce(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Gi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Tr{}function Su(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new wr(n.key,Ce.none()):new li(n.key,n.data,Ce.none());{const t=n.data,i=Ae.empty();let r=new pe(ce.comparator);for(let o of e.fields)if(!r.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?i.delete(o):i.set(o,a),r=r.add(o)}return new yt(n.key,i,new Pe(r.toArray()),Ce.none())}}function t_(n,e,t){n instanceof li?function(r,o,a){const c=r.value.clone(),h=Ll(r.fieldTransforms,o,a.transformResults);c.setAll(h),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof yt?function(r,o,a){if(!Gi(r.precondition,o))return void o.convertToUnknownDocument(a.version);const c=Ll(r.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Pu(r)),h.setAll(c),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,e,t):function(r,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Hn(n,e,t,i){return n instanceof li?function(o,a,c,h){if(!Gi(o.precondition,a))return c;const d=o.value.clone(),p=xl(o.fieldTransforms,h,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,i):n instanceof yt?function(o,a,c,h){if(!Gi(o.precondition,a))return c;const d=xl(o.fieldTransforms,h,a),p=a.data;return p.setAll(Pu(o)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(y=>y.field))}(n,e,t,i):function(o,a,c){return Gi(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function n_(n,e){let t=null;for(const i of n.fieldTransforms){const r=e.data.field(i.field),o=wu(i.transform,r||null);o!=null&&(t===null&&(t=Ae.empty()),t.set(i.field,o))}return t||null}function Ol(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(i,r){return i===void 0&&r===void 0||!(!i||!r)&&sn(i,r,(o,a)=>Zg(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class li extends Tr{constructor(e,t,i,r=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class yt extends Tr{constructor(e,t,i,r,o=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=r,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Pu(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}}),e}function Ll(n,e,t){const i=new Map;Q(n.length===t.length);for(let r=0;r<t.length;r++){const o=n[r],a=o.transform,c=e.data.field(o.field);i.set(o.field,Xg(a,c,t[r]))}return i}function xl(n,e,t){const i=new Map;for(const r of n){const o=r.transform,a=t.data.field(r.field);i.set(r.field,Jg(o,a,e))}return i}class wr extends Tr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class i_ extends Tr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e,t,i,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=r}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const o=this.mutations[r];o.key.isEqual(e.key)&&t_(o,e,i[r])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=Hn(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=Hn(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=Iu();return this.mutations.forEach(r=>{const o=e.get(r.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=t.has(r.key)?null:c;const h=Su(a,c);h!==null&&i.set(r.key,h),a.isValidDocument()||a.convertToNoDocument(F.min())}),i}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),j())}isEqual(e){return this.batchId===e.batchId&&sn(this.mutations,e.mutations,(t,i)=>Ol(t,i))&&sn(this.baseMutations,e.baseMutations,(t,i)=>Ol(t,i))}}class Io{constructor(e,t,i,r){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=r}static from(e,t,i){Q(e.mutations.length===i.length);let r=function(){return Hg}();const o=e.mutations;for(let a=0;a<o.length;a++)r=r.insert(o[a].key,i[a].version);return new Io(e,t,i,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var se,z;function a_(n){switch(n){default:return U();case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0}}function Cu(n){if(n===void 0)return Ye("GRPC error has no .code"),S.UNKNOWN;switch(n){case se.OK:return S.OK;case se.CANCELLED:return S.CANCELLED;case se.UNKNOWN:return S.UNKNOWN;case se.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case se.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case se.INTERNAL:return S.INTERNAL;case se.UNAVAILABLE:return S.UNAVAILABLE;case se.UNAUTHENTICATED:return S.UNAUTHENTICATED;case se.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case se.NOT_FOUND:return S.NOT_FOUND;case se.ALREADY_EXISTS:return S.ALREADY_EXISTS;case se.PERMISSION_DENIED:return S.PERMISSION_DENIED;case se.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case se.ABORTED:return S.ABORTED;case se.OUT_OF_RANGE:return S.OUT_OF_RANGE;case se.UNIMPLEMENTED:return S.UNIMPLEMENTED;case se.DATA_LOSS:return S.DATA_LOSS;default:return U()}}(z=se||(se={}))[z.OK=0]="OK",z[z.CANCELLED=1]="CANCELLED",z[z.UNKNOWN=2]="UNKNOWN",z[z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",z[z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",z[z.NOT_FOUND=5]="NOT_FOUND",z[z.ALREADY_EXISTS=6]="ALREADY_EXISTS",z[z.PERMISSION_DENIED=7]="PERMISSION_DENIED",z[z.UNAUTHENTICATED=16]="UNAUTHENTICATED",z[z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",z[z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",z[z.ABORTED=10]="ABORTED",z[z.OUT_OF_RANGE=11]="OUT_OF_RANGE",z[z.UNIMPLEMENTED=12]="UNIMPLEMENTED",z[z.INTERNAL=13]="INTERNAL",z[z.UNAVAILABLE=14]="UNAVAILABLE",z[z.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l_(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c_=new St([4294967295,4294967295],0);function Ml(n){const e=l_().encode(n),t=new eu;return t.update(e),new Uint8Array(t.digest())}function Ul(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),i=e.getUint32(4,!0),r=e.getUint32(8,!0),o=e.getUint32(12,!0);return[new St([t,i],0),new St([r,o],0)]}class To{constructor(e,t,i){if(this.bitmap=e,this.padding=t,this.hashCount=i,t<0||t>=8)throw new Bn(`Invalid padding: ${t}`);if(i<0)throw new Bn(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new Bn(`Invalid hash count: ${i}`);if(e.length===0&&t!==0)throw new Bn(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=St.fromNumber(this.Ie)}Ee(e,t,i){let r=e.add(t.multiply(St.fromNumber(i)));return r.compare(c_)===1&&(r=new St([r.getBits(0),r.getBits(1)],0)),r.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=Ml(e),[i,r]=Ul(t);for(let o=0;o<this.hashCount;o++){const a=this.Ee(i,r,o);if(!this.de(a))return!1}return!0}static create(e,t,i){const r=e%8==0?0:8-e%8,o=new Uint8Array(Math.ceil(e/8)),a=new To(o,r,t);return i.forEach(c=>a.insert(c)),a}insert(e){if(this.Ie===0)return;const t=Ml(e),[i,r]=Ul(t);for(let o=0;o<this.hashCount;o++){const a=this.Ee(i,r,o);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),i=e%8;this.bitmap[t]|=1<<i}}class Bn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t,i,r,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=r,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,i){const r=new Map;return r.set(e,ci.createSynthesizedTargetChangeForCurrentChange(e,t,i)),new br(F.min(),r,new Z(W),Ze(),j())}}class ci{constructor(e,t,i,r,o){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=r,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(e,t,i){return new ci(i,t,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(e,t,i,r){this.Re=e,this.removedTargetIds=t,this.key=i,this.Ve=r}}class ku{constructor(e,t){this.targetId=e,this.me=t}}class Du{constructor(e,t,i=he.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=r}}class Fl{constructor(){this.fe=0,this.ge=jl(),this.pe=he.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=j(),t=j(),i=j();return this.ge.forEach((r,o)=>{switch(o){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:i=i.add(r);break;default:U()}}),new ci(this.pe,this.ye,e,t,i)}Ce(){this.we=!1,this.ge=jl()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Q(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class u_{constructor(e){this.Le=e,this.Be=new Map,this.ke=Ze(),this.qe=Bl(),this.Qe=new Z(W)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const i=this.Ge(t);switch(e.state){case 0:this.ze(t)&&i.De(e.resumeToken);break;case 1:i.Oe(),i.Se||i.Ce(),i.De(e.resumeToken);break;case 2:i.Oe(),i.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(i.Ne(),i.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),i.De(e.resumeToken));break;default:U()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((i,r)=>{this.ze(r)&&t(r)})}He(e){const t=e.targetId,i=e.me.count,r=this.Je(t);if(r){const o=r.target;if(Os(o))if(i===0){const a=new x(o.path);this.Ue(t,a,Ie.newNoDocument(a,F.min()))}else Q(i===1);else{const a=this.Ye(t);if(a!==i){const c=this.Ze(e),h=c?this.Xe(c,e,a):1;if(h!==0){this.je(t);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,d)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:i="",padding:r=0},hashCount:o=0}=t;let a,c;try{a=xt(i).toUint8Array()}catch(h){if(h instanceof cu)return Lt("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new To(a,r,o)}catch(h){return Lt(h instanceof Bn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.Ie===0?null:c}Xe(e,t,i){return t.me.count===i-this.nt(e,t.targetId)?0:2}nt(e,t){const i=this.Le.getRemoteKeysForTarget(t);let r=0;return i.forEach(o=>{const a=this.Le.tt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,o,null),r++)}),r}rt(e){const t=new Map;this.Be.forEach((o,a)=>{const c=this.Je(a);if(c){if(o.current&&Os(c.target)){const h=new x(c.target.path);this.ke.get(h)!==null||this.it(a,h)||this.Ue(a,h,Ie.newNoDocument(h,e))}o.be&&(t.set(a,o.ve()),o.Ce())}});let i=j();this.qe.forEach((o,a)=>{let c=!0;a.forEachWhile(h=>{const d=this.Je(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(i=i.add(o))}),this.ke.forEach((o,a)=>a.setReadTime(e));const r=new br(e,t,this.Qe,this.ke,i);return this.ke=Ze(),this.qe=Bl(),this.Qe=new Z(W),r}$e(e,t){if(!this.ze(e))return;const i=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,i),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,i){if(!this.ze(e))return;const r=this.Ge(e);this.it(e,t)?r.Fe(t,1):r.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),i&&(this.ke=this.ke.insert(t,i))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Fl,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new pe(W),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Fl),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Bl(){return new Z(x.comparator)}function jl(){return new Z(x.comparator)}const h_={asc:"ASCENDING",desc:"DESCENDING"},d_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},f_={and:"AND",or:"OR"};class p_{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function xs(n,e){return n.useProto3Json||_r(e)?e:{value:e}}function cr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Nu(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function m_(n,e){return cr(n,e.toTimestamp())}function xe(n){return Q(!!n),F.fromTimestamp(function(t){const i=mt(t);return new oe(i.seconds,i.nanos)}(n))}function wo(n,e){return Ms(n,e).canonicalString()}function Ms(n,e){const t=function(r){return new Y(["projects",r.projectId,"databases",r.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Vu(n){const e=Y.fromString(n);return Q(Uu(e)),e}function Us(n,e){return wo(n.databaseId,e.path)}function gs(n,e){const t=Vu(e);if(t.get(1)!==n.databaseId.projectId)throw new L(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new L(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new x(Lu(t))}function Ou(n,e){return wo(n.databaseId,e)}function g_(n){const e=Vu(n);return e.length===4?Y.emptyPath():Lu(e)}function Fs(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Lu(n){return Q(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function $l(n,e,t){return{name:Us(n,e),fields:t.value.mapValue.fields}}function __(n,e){let t;if("targetChange"in e){e.targetChange;const i=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:U()}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],o=function(d,p){return d.useProto3Json?(Q(p===void 0||typeof p=="string"),he.fromBase64String(p||"")):(Q(p===void 0||p instanceof Buffer||p instanceof Uint8Array),he.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const p=d.code===void 0?S.UNKNOWN:Cu(d.code);return new L(p,d.message||"")}(a);t=new Du(i,r,o,c||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const r=gs(n,i.document.name),o=xe(i.document.updateTime),a=i.document.createTime?xe(i.document.createTime):F.min(),c=new Ae({mapValue:{fields:i.document.fields}}),h=Ie.newFoundDocument(r,o,a,c),d=i.targetIds||[],p=i.removedTargetIds||[];t=new Ki(d,p,h.key,h)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const r=gs(n,i.document),o=i.readTime?xe(i.readTime):F.min(),a=Ie.newNoDocument(r,o),c=i.removedTargetIds||[];t=new Ki([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const r=gs(n,i.document),o=i.removedTargetIds||[];t=new Ki([],o,r,null)}else{if(!("filter"in e))return U();{e.filter;const i=e.filter;i.targetId;const{count:r=0,unchangedNames:o}=i,a=new o_(r,o),c=i.targetId;t=new ku(c,a)}}return t}function y_(n,e){let t;if(e instanceof li)t={update:$l(n,e.key,e.value)};else if(e instanceof wr)t={delete:Us(n,e.key)};else if(e instanceof yt)t={update:$l(n,e.key,e.data),updateMask:S_(e.fieldMask)};else{if(!(e instanceof i_))return U();t={verify:Us(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(i=>function(o,a){const c=a.transform;if(c instanceof Yn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Zn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof ei)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof lr)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw U()}(0,i))),e.precondition.isNone||(t.currentDocument=function(r,o){return o.updateTime!==void 0?{updateTime:m_(r,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:U()}(n,e.precondition)),t}function v_(n,e){return n&&n.length>0?(Q(e!==void 0),n.map(t=>function(r,o){let a=r.updateTime?xe(r.updateTime):xe(o);return a.isEqual(F.min())&&(a=xe(o)),new e_(a,r.transformResults||[])}(t,e))):[]}function E_(n,e){return{documents:[Ou(n,e.path)]}}function I_(n,e){const t={structuredQuery:{}},i=e.path;let r;e.collectionGroup!==null?(r=i,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=i.popLast(),t.structuredQuery.from=[{collectionId:i.lastSegment()}]),t.parent=Ou(n,r);const o=function(d){if(d.length!==0)return Mu(Fe.create(d,"and"))}(e.filters);o&&(t.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(p=>function(b){return{field:Kt(b.field),direction:b_(b.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=xs(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:t,parent:r}}function T_(n){let e=g_(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let r=null;if(i>0){Q(i===1);const p=t.from[0];p.allDescendants?r=p.collectionId:e=e.child(p.collectionId)}let o=[];t.where&&(o=function(y){const b=xu(y);return b instanceof Fe&&fu(b)?b.getFilters():[b]}(t.where));let a=[];t.orderBy&&(a=function(y){return y.map(b=>function(D){return new ar(Qt(D.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(b))}(t.orderBy));let c=null;t.limit&&(c=function(y){let b;return b=typeof y=="object"?y.value:y,_r(b)?null:b}(t.limit));let h=null;t.startAt&&(h=function(y){const b=!!y.before,R=y.values||[];return new or(R,b)}(t.startAt));let d=null;return t.endAt&&(d=function(y){const b=!y.before,R=y.values||[];return new or(R,b)}(t.endAt)),Fg(e,r,a,o,c,"F",h,d)}function w_(n,e){const t=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function xu(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=Qt(t.unaryFilter.field);return ae.create(i,"==",{doubleValue:NaN});case"IS_NULL":const r=Qt(t.unaryFilter.field);return ae.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Qt(t.unaryFilter.field);return ae.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Qt(t.unaryFilter.field);return ae.create(a,"!=",{nullValue:"NULL_VALUE"});default:return U()}}(n):n.fieldFilter!==void 0?function(t){return ae.create(Qt(t.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return U()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Fe.create(t.compositeFilter.filters.map(i=>xu(i)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return U()}}(t.compositeFilter.op))}(n):U()}function b_(n){return h_[n]}function A_(n){return d_[n]}function R_(n){return f_[n]}function Kt(n){return{fieldPath:n.canonicalString()}}function Qt(n){return ce.fromServerFormat(n.fieldPath)}function Mu(n){return n instanceof ae?function(t){if(t.op==="=="){if(Pl(t.value))return{unaryFilter:{field:Kt(t.field),op:"IS_NAN"}};if(Sl(t.value))return{unaryFilter:{field:Kt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Pl(t.value))return{unaryFilter:{field:Kt(t.field),op:"IS_NOT_NAN"}};if(Sl(t.value))return{unaryFilter:{field:Kt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Kt(t.field),op:A_(t.op),value:t.value}}}(n):n instanceof Fe?function(t){const i=t.getFilters().map(r=>Mu(r));return i.length===1?i[0]:{compositeFilter:{op:R_(t.op),filters:i}}}(n):U()}function S_(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Uu(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,t,i,r,o=F.min(),a=F.min(),c=he.EMPTY_BYTE_STRING,h=null){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=r,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(e){return new ct(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ct(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ct(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ct(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(e){this.ct=e}}function C_(n){const e=T_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ls(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(){this.un=new D_}addToCollectionParentIndex(e,t){return this.un.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(pt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(pt.min())}updateCollectionGroup(e,t,i){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class D_{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),r=this.index[t]||new pe(Y.comparator),o=!r.has(i);return this.index[t]=r.add(i),o}has(e){const t=e.lastSegment(),i=e.popLast(),r=this.index[t];return r&&r.has(i)}getEntries(e){return(this.index[e]||new pe(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new cn(0)}static kn(){return new cn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(){this.changes=new pn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ie.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?P.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V_{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(e,t,i,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=r}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(i=r,this.remoteDocumentCache.getEntry(e,t))).next(r=>(i!==null&&Hn(i.mutation,r,Pe.empty(),oe.now()),r))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.getLocalViewOfDocuments(e,i,j()).next(()=>i))}getLocalViewOfDocuments(e,t,i=j()){const r=At();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,i).next(o=>{let a=Fn();return o.forEach((c,h)=>{a=a.insert(c,h.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const i=At();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,j()))}populateOverlays(e,t,i){const r=[];return i.forEach(o=>{t.has(o)||r.push(o)}),this.documentOverlayCache.getOverlays(e,r).next(o=>{o.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,i,r){let o=Ze();const a=zn(),c=function(){return zn()}();return t.forEach((h,d)=>{const p=i.get(d.key);r.has(d.key)&&(p===void 0||p.mutation instanceof yt)?o=o.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),Hn(p.mutation,d,p.mutation.getFieldMask(),oe.now())):a.set(d.key,Pe.empty())}),this.recalculateAndSaveOverlays(e,o).next(h=>(h.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var y;return c.set(d,new V_(p,(y=a.get(d))!==null&&y!==void 0?y:null))}),c))}recalculateAndSaveOverlays(e,t){const i=zn();let r=new Z((a,c)=>a-c),o=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(h=>{const d=t.get(h);if(d===null)return;let p=i.get(h)||Pe.empty();p=c.applyToLocalView(d,p),i.set(h,p);const y=(r.get(c.batchId)||j()).add(h);r=r.insert(c.batchId,y)})}).next(()=>{const a=[],c=r.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),d=h.key,p=h.value,y=Iu();p.forEach(b=>{if(!o.has(b)){const R=Su(t.get(b),i.get(b));R!==null&&y.set(b,R),o=o.add(b)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,y))}return P.waitFor(a)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,t,i,r){return function(a){return x.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Bg(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,r):this.getDocumentsMatchingCollectionQuery(e,t,i,r)}getNextDocuments(e,t,i,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,r).next(o=>{const a=r-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,r-o.size):P.resolve(At());let c=-1,h=o;return a.next(d=>P.forEach(d,(p,y)=>(c<y.largestBatchId&&(c=y.largestBatchId),o.get(p)?P.resolve():this.remoteDocumentCache.getEntry(e,p).next(b=>{h=h.insert(p,b)}))).next(()=>this.populateOverlays(e,d,o)).next(()=>this.computeViews(e,h,d,j())).next(p=>({batchId:c,changes:Eu(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next(i=>{let r=Fn();return i.isFoundDocument()&&(r=r.insert(i.key,i)),r})}getDocumentsMatchingCollectionGroupQuery(e,t,i,r){const o=t.collectionGroup;let a=Fn();return this.indexManager.getCollectionParents(e,o).next(c=>P.forEach(c,h=>{const d=function(y,b){return new yr(b,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,d,i,r).next(p=>{p.forEach((y,b)=>{a=a.insert(y,b)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,i,r){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,o,r))).next(a=>{o.forEach((h,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,Ie.newInvalidDocument(p)))});let c=Fn();return a.forEach((h,d)=>{const p=o.get(h);p!==void 0&&Hn(p.mutation,d,Pe.empty(),oe.now()),Er(t,d)&&(c=c.insert(h,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L_{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return P.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(r){return{id:r.id,version:r.version,createTime:xe(r.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(r){return{name:r.name,query:C_(r.bundledQuery),readTime:xe(r.readTime)}}(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(){this.overlays=new Z(x.comparator),this.Ir=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const i=At();return P.forEach(t,r=>this.getOverlay(e,r).next(o=>{o!==null&&i.set(r,o)})).next(()=>i)}saveOverlays(e,t,i){return i.forEach((r,o)=>{this.ht(e,t,o)}),P.resolve()}removeOverlaysForBatchId(e,t,i){const r=this.Ir.get(i);return r!==void 0&&(r.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(i)),P.resolve()}getOverlaysForCollection(e,t,i){const r=At(),o=t.length+1,a=new x(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const h=c.getNext().value,d=h.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>i&&r.set(h.getKey(),h)}return P.resolve(r)}getOverlaysForCollectionGroup(e,t,i,r){let o=new Z((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>i){let p=o.get(d.largestBatchId);p===null&&(p=At(),o=o.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=At(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=r)););return P.resolve(c)}ht(e,t,i){const r=this.overlays.get(i.key);if(r!==null){const a=this.Ir.get(r.largestBatchId).delete(i.key);this.Ir.set(r.largestBatchId,a)}this.overlays=this.overlays.insert(i.key,new s_(t,i));let o=this.Ir.get(t);o===void 0&&(o=j(),this.Ir.set(t,o)),this.Ir.set(t,o.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(){this.sessionToken=he.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(){this.Tr=new pe(le.Er),this.dr=new pe(le.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const i=new le(e,t);this.Tr=this.Tr.add(i),this.dr=this.dr.add(i)}Rr(e,t){e.forEach(i=>this.addReference(i,t))}removeReference(e,t){this.Vr(new le(e,t))}mr(e,t){e.forEach(i=>this.removeReference(i,t))}gr(e){const t=new x(new Y([])),i=new le(t,e),r=new le(t,e+1),o=[];return this.dr.forEachInRange([i,r],a=>{this.Vr(a),o.push(a.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new x(new Y([])),i=new le(t,e),r=new le(t,e+1);let o=j();return this.dr.forEachInRange([i,r],a=>{o=o.add(a.key)}),o}containsKey(e){const t=new le(e,0),i=this.Tr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class le{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return x.comparator(e.key,t.key)||W(e.wr,t.wr)}static Ar(e,t){return W(e.wr,t.wr)||x.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new pe(le.Er)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,r){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new r_(o,t,i,r);this.mutationQueue.push(a);for(const c of r)this.br=this.br.add(new le(c.key,o)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,r=this.vr(i),o=r<0?0:r;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new le(t,0),r=new le(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([i,r],a=>{const c=this.Dr(a.wr);o.push(c)}),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new pe(W);return t.forEach(r=>{const o=new le(r,0),a=new le(r,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,a],c=>{i=i.add(c.wr)})}),P.resolve(this.Cr(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,r=i.length+1;let o=i;x.isDocumentKey(o)||(o=o.child(""));const a=new le(new x(o),0);let c=new pe(W);return this.br.forEachWhile(h=>{const d=h.key.path;return!!i.isPrefixOf(d)&&(d.length===r&&(c=c.add(h.wr)),!0)},a),P.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(i=>{const r=this.Dr(i);r!==null&&t.push(r)}),t}removeMutationBatch(e,t){Q(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let i=this.br;return P.forEach(t.mutations,r=>{const o=new le(r.key,t.batchId);return i=i.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.br=i})}On(e){}containsKey(e,t){const i=new le(t,0),r=this.br.firstAfterOrEqual(i);return P.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e){this.Mr=e,this.docs=function(){return new Z(x.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,r=this.docs.get(i),o=r?r.size:0,a=this.Mr(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return P.resolve(i?i.document.mutableCopy():Ie.newInvalidDocument(t))}getEntries(e,t){let i=Ze();return t.forEach(r=>{const o=this.docs.get(r);i=i.insert(r,o?o.document.mutableCopy():Ie.newInvalidDocument(r))}),P.resolve(i)}getDocumentsMatchingQuery(e,t,i,r){let o=Ze();const a=t.path,c=new x(a.child("")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:d,value:{document:p}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Eg(vg(p),i)<=0||(r.has(p.key)||Er(t,p))&&(o=o.insert(p.key,p.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(e,t,i,r){U()}Or(e,t){return P.forEach(this.docs,i=>t(i))}newChangeBuffer(e){return new B_(this)}getSize(e){return P.resolve(this.size)}}class B_ extends N_{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((i,r)=>{r.isValidDocument()?t.push(this.cr.addEntry(e,r)):this.cr.removeEntry(i)}),P.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j_{constructor(e){this.persistence=e,this.Nr=new pn(t=>_o(t),yo),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.Lr=0,this.Br=new bo,this.targetCount=0,this.kr=cn.Bn()}forEachTarget(e,t){return this.Nr.forEach((i,r)=>t(r)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.Lr&&(this.Lr=t),P.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new cn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Kn(t),P.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,i){let r=0;const o=[];return this.Nr.forEach((a,c)=>{c.sequenceNumber<=t&&i.get(c.targetId)===null&&(this.Nr.delete(a),o.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)}),P.waitFor(o).next(()=>r)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const i=this.Nr.get(t)||null;return P.resolve(i)}addMatchingKeys(e,t,i){return this.Br.Rr(t,i),P.resolve()}removeMatchingKeys(e,t,i){this.Br.mr(t,i);const r=this.persistence.referenceDelegate,o=[];return r&&t.forEach(a=>{o.push(r.markPotentiallyOrphaned(e,a))}),P.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const i=this.Br.yr(t);return P.resolve(i)}containsKey(e,t){return P.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $_{constructor(e,t){this.qr={},this.overlays={},this.Qr=new fo(0),this.Kr=!1,this.Kr=!0,this.$r=new M_,this.referenceDelegate=e(this),this.Ur=new j_(this),this.indexManager=new k_,this.remoteDocumentCache=function(r){return new F_(r)}(i=>this.referenceDelegate.Wr(i)),this.serializer=new P_(t),this.Gr=new L_(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new x_,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this.qr[e.toKey()];return i||(i=new U_(t,this.referenceDelegate),this.qr[e.toKey()]=i),i}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,i){N("MemoryPersistence","Starting transaction:",e);const r=new q_(this.Qr.next());return this.referenceDelegate.zr(),i(r).next(o=>this.referenceDelegate.jr(r).next(()=>o)).toPromise().then(o=>(r.raiseOnCommittedEvent(),o))}Hr(e,t){return P.or(Object.values(this.qr).map(i=>()=>i.containsKey(e,t)))}}class q_ extends Tg{constructor(e){super(),this.currentSequenceNumber=e}}class Ao{constructor(e){this.persistence=e,this.Jr=new bo,this.Yr=null}static Zr(e){return new Ao(e)}get Xr(){if(this.Yr)return this.Yr;throw U()}addReference(e,t,i){return this.Jr.addReference(i,t),this.Xr.delete(i.toString()),P.resolve()}removeReference(e,t,i){return this.Jr.removeReference(i,t),this.Xr.add(i.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),P.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(r=>this.Xr.add(r.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next(r=>{r.forEach(o=>this.Xr.add(o.toString()))}).next(()=>i.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Xr,i=>{const r=x.fromPath(i);return this.ei(e,r).next(o=>{o||t.removeEntry(r,F.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(i=>{i?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return P.or([()=>P.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e,t,i,r){this.targetId=e,this.fromCache=t,this.$i=i,this.Ui=r}static Wi(e,t){let i=j(),r=j();for(const o of t.docChanges)switch(o.type){case 0:i=i.add(o.doc.key);break;case 1:r=r.add(o.doc.key)}return new Ro(e,t.fromCache,i,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z_{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return zd()?8:wg(Te())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,i,r){const o={result:null};return this.Yi(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Zi(e,t,r,i).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new z_;return this.Xi(e,t,a).next(c=>{if(o.result=c,this.zi)return this.es(e,t,a,c.size)})}).next(()=>o.result)}es(e,t,i,r){return i.documentReadCount<this.ji?(xn()<=$.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Gt(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),P.resolve()):(xn()<=$.DEBUG&&N("QueryEngine","Query:",Gt(t),"scans",i.documentReadCount,"local documents and returns",r,"documents as results."),i.documentReadCount>this.Hi*r?(xn()<=$.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Gt(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Le(t))):P.resolve())}Yi(e,t){if(Nl(t))return P.resolve(null);let i=Le(t);return this.indexManager.getIndexType(e,i).next(r=>r===0?null:(t.limit!==null&&r===1&&(t=Ls(t,null,"F"),i=Le(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next(o=>{const a=j(...o);return this.Ji.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,i).next(h=>{const d=this.ts(t,c);return this.ns(t,d,a,h.readTime)?this.Yi(e,Ls(t,null,"F")):this.rs(e,d,t,h)}))})))}Zi(e,t,i,r){return Nl(t)||r.isEqual(F.min())?P.resolve(null):this.Ji.getDocuments(e,i).next(o=>{const a=this.ts(t,o);return this.ns(t,a,i,r)?P.resolve(null):(xn()<=$.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Gt(t)),this.rs(e,a,t,yg(r,-1)).next(c=>c))})}ts(e,t){let i=new pe(yu(e));return t.forEach((r,o)=>{Er(e,o)&&(i=i.add(o))}),i}ns(e,t,i,r){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(r)>0)}Xi(e,t,i){return xn()<=$.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Gt(t)),this.Ji.getDocumentsMatchingQuery(e,t,pt.min(),i)}rs(e,t,i,r){return this.Ji.getDocumentsMatchingQuery(e,i,r).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(e,t,i,r){this.persistence=e,this.ss=t,this.serializer=r,this.os=new Z(W),this._s=new pn(o=>_o(o),yo),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(i)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new O_(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function G_(n,e,t,i){return new W_(n,e,t,i)}async function Fu(n,e){const t=B(n);return await t.persistence.runTransaction("Handle user change","readonly",i=>{let r;return t.mutationQueue.getAllMutationBatches(i).next(o=>(r=o,t.ls(e),t.mutationQueue.getAllMutationBatches(i))).next(o=>{const a=[],c=[];let h=j();for(const d of r){a.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}for(const d of o){c.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}return t.localDocuments.getDocuments(i,h).next(d=>({hs:d,removedBatchIds:a,addedBatchIds:c}))})})}function K_(n,e){const t=B(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const r=e.batch.keys(),o=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,h,d,p){const y=d.batch,b=y.keys();let R=P.resolve();return b.forEach(D=>{R=R.next(()=>p.getEntry(h,D)).next(V=>{const k=d.docVersions.get(D);Q(k!==null),V.version.compareTo(k)<0&&(y.applyToRemoteDocument(V,d),V.isValidDocument()&&(V.setReadTime(d.commitVersion),p.addEntry(V)))})}),R.next(()=>c.mutationQueue.removeMutationBatch(h,y))}(t,i,e,o).next(()=>o.apply(i)).next(()=>t.mutationQueue.performConsistencyCheck(i)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(i,r,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(c){let h=j();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(h=h.add(c.batch.mutations[d].key));return h}(e))).next(()=>t.localDocuments.getDocuments(i,r))})}function Bu(n){const e=B(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Q_(n,e){const t=B(n),i=e.snapshotVersion;let r=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});r=t.os;const c=[];e.targetChanges.forEach((p,y)=>{const b=r.get(y);if(!b)return;c.push(t.Ur.removeMatchingKeys(o,p.removedDocuments,y).next(()=>t.Ur.addMatchingKeys(o,p.addedDocuments,y)));let R=b.withSequenceNumber(o.currentSequenceNumber);e.targetMismatches.get(y)!==null?R=R.withResumeToken(he.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):p.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(p.resumeToken,i)),r=r.insert(y,R),function(V,k,q){return V.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=3e8?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0}(b,R,p)&&c.push(t.Ur.updateTargetData(o,R))});let h=Ze(),d=j();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(o,p))}),c.push(J_(o,a,e.documentUpdates).next(p=>{h=p.Ps,d=p.Is})),!i.isEqual(F.min())){const p=t.Ur.getLastRemoteSnapshotVersion(o).next(y=>t.Ur.setTargetsMetadata(o,o.currentSequenceNumber,i));c.push(p)}return P.waitFor(c).next(()=>a.apply(o)).next(()=>t.localDocuments.getLocalViewOfDocuments(o,h,d)).next(()=>h)}).then(o=>(t.os=r,o))}function J_(n,e,t){let i=j(),r=j();return t.forEach(o=>i=i.add(o)),e.getEntries(n,i).next(o=>{let a=Ze();return t.forEach((c,h)=>{const d=o.get(c);h.isFoundDocument()!==d.isFoundDocument()&&(r=r.add(c)),h.isNoDocument()&&h.version.isEqual(F.min())?(e.removeEntry(c,h.readTime),a=a.insert(c,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(h),a=a.insert(c,h)):N("LocalStore","Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",h.version)}),{Ps:a,Is:r}})}function X_(n,e){const t=B(n);return t.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}function Y_(n,e){const t=B(n);return t.persistence.runTransaction("Allocate target","readwrite",i=>{let r;return t.Ur.getTargetData(i,e).next(o=>o?(r=o,P.resolve(r)):t.Ur.allocateTargetId(i).next(a=>(r=new ct(e,a,"TargetPurposeListen",i.currentSequenceNumber),t.Ur.addTargetData(i,r).next(()=>r))))}).then(i=>{const r=t.os.get(i.targetId);return(r===null||i.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(t.os=t.os.insert(i.targetId,i),t._s.set(e,i.targetId)),i})}async function Bs(n,e,t){const i=B(n),r=i.os.get(e),o=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",o,a=>i.persistence.referenceDelegate.removeTarget(a,r))}catch(a){if(!ai(a))throw a;N("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}i.os=i.os.remove(e),i._s.delete(r.target)}function ql(n,e,t){const i=B(n);let r=F.min(),o=j();return i.persistence.runTransaction("Execute query","readwrite",a=>function(h,d,p){const y=B(h),b=y._s.get(p);return b!==void 0?P.resolve(y.os.get(b)):y.Ur.getTargetData(d,p)}(i,a,Le(e)).next(c=>{if(c)return r=c.lastLimboFreeSnapshotVersion,i.Ur.getMatchingKeysForTargetId(a,c.targetId).next(h=>{o=h})}).next(()=>i.ss.getDocumentsMatchingQuery(a,e,t?r:F.min(),t?o:j())).next(c=>(Z_(i,$g(e),c),{documents:c,Ts:o})))}function Z_(n,e,t){let i=n.us.get(e)||F.min();t.forEach((r,o)=>{o.readTime.compareTo(i)>0&&(i=o.readTime)}),n.us.set(e,i)}class zl{constructor(){this.activeTargetIds=Kg()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class ey{constructor(){this.so=new zl,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,i){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new zl,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){N("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){N("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fi=null;function _s(){return Fi===null?Fi=function(){return 268435456+Math.round(2147483648*Math.random())}():Fi++,"0x"+Fi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ny={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iy{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ve="WebChannelConnection";class ry extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const i=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=i+"://"+t.host,this.vo=`projects/${r}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${r}`:`project_id=${r}&database_id=${o}`}get Fo(){return!1}Mo(t,i,r,o,a){const c=_s(),h=this.xo(t,i.toUriEncodedString());N("RestConnection",`Sending RPC '${t}' ${c}:`,h,r);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,o,a),this.No(t,h,d,r).then(p=>(N("RestConnection",`Received RPC '${t}' ${c}: `,p),p),p=>{throw Lt("RestConnection",`RPC '${t}' ${c} failed with error: `,p,"url: ",h,"request:",r),p})}Lo(t,i,r,o,a,c){return this.Mo(t,i,r,o,a)}Oo(t,i,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+fn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),i&&i.headers.forEach((o,a)=>t[a]=o),r&&r.headers.forEach((o,a)=>t[a]=o)}xo(t,i){const r=ny[t];return`${this.Do}/v1/${i}:${r}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,i,r){const o=_s();return new Promise((a,c)=>{const h=new tu;h.setWithCredentials(!0),h.listenOnce(nu.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Hi.NO_ERROR:const p=h.getResponseJson();N(ve,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),a(p);break;case Hi.TIMEOUT:N(ve,`RPC '${e}' ${o} timed out`),c(new L(S.DEADLINE_EXCEEDED,"Request time out"));break;case Hi.HTTP_ERROR:const y=h.getStatus();if(N(ve,`RPC '${e}' ${o} failed with status:`,y,"response text:",h.getResponseText()),y>0){let b=h.getResponseJson();Array.isArray(b)&&(b=b[0]);const R=b==null?void 0:b.error;if(R&&R.status&&R.message){const D=function(k){const q=k.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(q)>=0?q:S.UNKNOWN}(R.status);c(new L(D,R.message))}else c(new L(S.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new L(S.UNAVAILABLE,"Connection failed."));break;default:U()}}finally{N(ve,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(r);N(ve,`RPC '${e}' ${o} sending request:`,r),h.send(t,"POST",d,i,15)})}Bo(e,t,i){const r=_s(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=su(),c=ru(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,t,i),h.encodeInitMessageHeaders=!0;const p=o.join("");N(ve,`Creating RPC '${e}' stream ${r}: ${p}`,h);const y=a.createWebChannel(p,h);let b=!1,R=!1;const D=new iy({Io:k=>{R?N(ve,`Not sending because RPC '${e}' stream ${r} is closed:`,k):(b||(N(ve,`Opening RPC '${e}' stream ${r} transport.`),y.open(),b=!0),N(ve,`RPC '${e}' stream ${r} sending:`,k),y.send(k))},To:()=>y.close()}),V=(k,q,G)=>{k.listen(q,K=>{try{G(K)}catch(ne){setTimeout(()=>{throw ne},0)}})};return V(y,Un.EventType.OPEN,()=>{R||(N(ve,`RPC '${e}' stream ${r} transport opened.`),D.yo())}),V(y,Un.EventType.CLOSE,()=>{R||(R=!0,N(ve,`RPC '${e}' stream ${r} transport closed`),D.So())}),V(y,Un.EventType.ERROR,k=>{R||(R=!0,Lt(ve,`RPC '${e}' stream ${r} transport errored:`,k),D.So(new L(S.UNAVAILABLE,"The operation could not be completed")))}),V(y,Un.EventType.MESSAGE,k=>{var q;if(!R){const G=k.data[0];Q(!!G);const K=G,ne=K.error||((q=K[0])===null||q===void 0?void 0:q.error);if(ne){N(ve,`RPC '${e}' stream ${r} received error:`,ne);const ke=ne.status;let ie=function(_){const v=se[_];if(v!==void 0)return Cu(v)}(ke),E=ne.message;ie===void 0&&(ie=S.INTERNAL,E="Unknown error status: "+ke+" with message "+ne.message),R=!0,D.So(new L(ie,E)),y.close()}else N(ve,`RPC '${e}' stream ${r} received:`,G),D.bo(G)}}),V(c,iu.STAT_EVENT,k=>{k.stat===ks.PROXY?N(ve,`RPC '${e}' stream ${r} detected buffering proxy`):k.stat===ks.NOPROXY&&N(ve,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{D.wo()},0),D}}function ys(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ar(n){return new p_(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e,t,i=1e3,r=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=i,this.qo=r,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),i=Math.max(0,Date.now()-this.Uo),r=Math.max(0,t-i);r>0&&N("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,r,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(e,t,i,r,o,a,c,h){this.ui=e,this.Ho=i,this.Jo=r,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new ju(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(Ye(t.toString()),Ye("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,r])=>{this.Yo===t&&this.P_(i,r)},i=>{e(()=>{const r=new L(S.UNKNOWN,"Fetching auth token failed: "+i.message);return this.I_(r)})})}P_(e,t){const i=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{i(()=>this.listener.Eo())}),this.stream.Ro(()=>{i(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(r=>{i(()=>this.I_(r))}),this.stream.onMessage(r=>{i(()=>++this.e_==1?this.E_(r):this.onNext(r))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return N("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(N("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class sy extends $u{constructor(e,t,i,r,o,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,r,a),this.serializer=o}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=__(this.serializer,e),i=function(o){if(!("targetChange"in o))return F.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?F.min():a.readTime?xe(a.readTime):F.min()}(e);return this.listener.d_(t,i)}A_(e){const t={};t.database=Fs(this.serializer),t.addTarget=function(o,a){let c;const h=a.target;if(c=Os(h)?{documents:E_(o,h)}:{query:I_(o,h)._t},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Nu(o,a.resumeToken);const d=xs(o,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(F.min())>0){c.readTime=cr(o,a.snapshotVersion.toTimestamp());const d=xs(o,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const i=w_(this.serializer,e);i&&(t.labels=i),this.a_(t)}R_(e){const t={};t.database=Fs(this.serializer),t.removeTarget=e,this.a_(t)}}class oy extends $u{constructor(e,t,i,r,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,r,a),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Q(!!e.streamToken),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Q(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=v_(e.writeResults,e.commitTime),i=xe(e.commitTime);return this.listener.g_(i,t)}p_(){const e={};e.database=Fs(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(i=>y_(this.serializer,i))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ay extends class{}{constructor(e,t,i,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=r,this.y_=!1}w_(){if(this.y_)throw new L(S.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,i,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Mo(e,Ms(t,i),r,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new L(S.UNKNOWN,o.toString())})}Lo(e,t,i,r,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Lo(e,Ms(t,i),r,a,c,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new L(S.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class ly{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Ye(t),this.D_=!1):N("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cy{constructor(e,t,i,r,o){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(a=>{i.enqueueAndForget(async()=>{Bt(this)&&(N("RemoteStore","Restarting streams for network reachability change."),await async function(h){const d=B(h);d.L_.add(4),await ui(d),d.q_.set("Unknown"),d.L_.delete(4),await Rr(d)}(this))})}),this.q_=new ly(i,r)}}async function Rr(n){if(Bt(n))for(const e of n.B_)await e(!0)}async function ui(n){for(const e of n.B_)await e(!1)}function qu(n,e){const t=B(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),ko(t)?Co(t):mn(t).r_()&&Po(t,e))}function So(n,e){const t=B(n),i=mn(t);t.N_.delete(e),i.r_()&&zu(t,e),t.N_.size===0&&(i.r_()?i.o_():Bt(t)&&t.q_.set("Unknown"))}function Po(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(F.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}mn(n).A_(e)}function zu(n,e){n.Q_.xe(e),mn(n).R_(e)}function Co(n){n.Q_=new u_({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),mn(n).start(),n.q_.v_()}function ko(n){return Bt(n)&&!mn(n).n_()&&n.N_.size>0}function Bt(n){return B(n).L_.size===0}function Hu(n){n.Q_=void 0}async function uy(n){n.q_.set("Online")}async function hy(n){n.N_.forEach((e,t)=>{Po(n,e)})}async function dy(n,e){Hu(n),ko(n)?(n.q_.M_(e),Co(n)):n.q_.set("Unknown")}async function fy(n,e,t){if(n.q_.set("Online"),e instanceof Du&&e.state===2&&e.cause)try{await async function(r,o){const a=o.cause;for(const c of o.targetIds)r.N_.has(c)&&(await r.remoteSyncer.rejectListen(c,a),r.N_.delete(c),r.Q_.removeTarget(c))}(n,e)}catch(i){N("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),i),await ur(n,i)}else if(e instanceof Ki?n.Q_.Ke(e):e instanceof ku?n.Q_.He(e):n.Q_.We(e),!t.isEqual(F.min()))try{const i=await Bu(n.localStore);t.compareTo(i)>=0&&await function(o,a){const c=o.Q_.rt(a);return c.targetChanges.forEach((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const p=o.N_.get(d);p&&o.N_.set(d,p.withResumeToken(h.resumeToken,a))}}),c.targetMismatches.forEach((h,d)=>{const p=o.N_.get(h);if(!p)return;o.N_.set(h,p.withResumeToken(he.EMPTY_BYTE_STRING,p.snapshotVersion)),zu(o,h);const y=new ct(p.target,h,d,p.sequenceNumber);Po(o,y)}),o.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(i){N("RemoteStore","Failed to raise snapshot:",i),await ur(n,i)}}async function ur(n,e,t){if(!ai(e))throw e;n.L_.add(1),await ui(n),n.q_.set("Offline"),t||(t=()=>Bu(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{N("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Rr(n)})}function Wu(n,e){return e().catch(t=>ur(n,t,e))}async function Sr(n){const e=B(n),t=gt(e);let i=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;py(e);)try{const r=await X_(e.localStore,i);if(r===null){e.O_.length===0&&t.o_();break}i=r.batchId,my(e,r)}catch(r){await ur(e,r)}Gu(e)&&Ku(e)}function py(n){return Bt(n)&&n.O_.length<10}function my(n,e){n.O_.push(e);const t=gt(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Gu(n){return Bt(n)&&!gt(n).n_()&&n.O_.length>0}function Ku(n){gt(n).start()}async function gy(n){gt(n).p_()}async function _y(n){const e=gt(n);for(const t of n.O_)e.m_(t.mutations)}async function yy(n,e,t){const i=n.O_.shift(),r=Io.from(i,e,t);await Wu(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await Sr(n)}async function vy(n,e){e&&gt(n).V_&&await async function(i,r){if(function(a){return a_(a)&&a!==S.ABORTED}(r.code)){const o=i.O_.shift();gt(i).s_(),await Wu(i,()=>i.remoteSyncer.rejectFailedWrite(o.batchId,r)),await Sr(i)}}(n,e),Gu(n)&&Ku(n)}async function Wl(n,e){const t=B(n);t.asyncQueue.verifyOperationInProgress(),N("RemoteStore","RemoteStore received new credentials");const i=Bt(t);t.L_.add(3),await ui(t),i&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Rr(t)}async function Ey(n,e){const t=B(n);e?(t.L_.delete(2),await Rr(t)):e||(t.L_.add(2),await ui(t),t.q_.set("Unknown"))}function mn(n){return n.K_||(n.K_=function(t,i,r){const o=B(t);return o.w_(),new sy(i,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,r)}(n.datastore,n.asyncQueue,{Eo:uy.bind(null,n),Ro:hy.bind(null,n),mo:dy.bind(null,n),d_:fy.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),ko(n)?Co(n):n.q_.set("Unknown")):(await n.K_.stop(),Hu(n))})),n.K_}function gt(n){return n.U_||(n.U_=function(t,i,r){const o=B(t);return o.w_(),new oy(i,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,r)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:gy.bind(null,n),mo:vy.bind(null,n),f_:_y.bind(null,n),g_:yy.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await Sr(n)):(await n.U_.stop(),n.O_.length>0&&(N("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(e,t,i,r,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=r,this.removalCallback=o,this.deferred=new ft,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,r,o){const a=Date.now()+i,c=new Do(e,t,a,r,o);return c.start(i),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new L(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function No(n,e){if(Ye("AsyncQueue",`${e}: ${n}`),ai(n))return new L(S.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e){this.comparator=e?(t,i)=>e(t,i)||x.comparator(t.key,i.key):(t,i)=>x.comparator(t.key,i.key),this.keyedMap=Fn(),this.sortedSet=new Z(this.comparator)}static emptySet(e){return new en(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,i)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof en)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){const r=t.getNext().key,o=i.getNext().key;if(!r.isEqual(o))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const i=new en;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(){this.W_=new Z(x.comparator)}track(e){const t=e.doc.key,i=this.W_.get(t);i?e.type!==0&&i.type===3?this.W_=this.W_.insert(t,e):e.type===3&&i.type!==1?this.W_=this.W_.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.W_=this.W_.remove(t):e.type===1&&i.type===2?this.W_=this.W_.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):U():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,i)=>{e.push(i)}),e}}class un{constructor(e,t,i,r,o,a,c,h,d){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=r,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(e,t,i,r,o){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new un(e,t,en.emptySet(t),a,i,r,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&vr(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==i[r].type||!t[r].doc.isEqual(i[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iy{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class Ty{constructor(){this.queries=Kl(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,i){const r=B(t),o=r.queries;r.queries=Kl(),o.forEach((a,c)=>{for(const h of c.j_)h.onError(i)})})(this,new L(S.ABORTED,"Firestore shutting down"))}}function Kl(){return new pn(n=>_u(n),vr)}async function Qu(n,e){const t=B(n);let i=3;const r=e.query;let o=t.queries.get(r);o?!o.H_()&&e.J_()&&(i=2):(o=new Iy,i=e.J_()?0:1);try{switch(i){case 0:o.z_=await t.onListen(r,!0);break;case 1:o.z_=await t.onListen(r,!1);break;case 2:await t.onFirstRemoteStoreListen(r)}}catch(a){const c=No(a,`Initialization of query '${Gt(e.query)}' failed`);return void e.onError(c)}t.queries.set(r,o),o.j_.push(e),e.Z_(t.onlineState),o.z_&&e.X_(o.z_)&&Vo(t)}async function Ju(n,e){const t=B(n),i=e.query;let r=3;const o=t.queries.get(i);if(o){const a=o.j_.indexOf(e);a>=0&&(o.j_.splice(a,1),o.j_.length===0?r=e.J_()?0:1:!o.H_()&&e.J_()&&(r=2))}switch(r){case 0:return t.queries.delete(i),t.onUnlisten(i,!0);case 1:return t.queries.delete(i),t.onUnlisten(i,!1);case 2:return t.onLastRemoteStoreUnlisten(i);default:return}}function wy(n,e){const t=B(n);let i=!1;for(const r of e){const o=r.query,a=t.queries.get(o);if(a){for(const c of a.j_)c.X_(r)&&(i=!0);a.z_=r}}i&&Vo(t)}function by(n,e,t){const i=B(n),r=i.queries.get(e);if(r)for(const o of r.j_)o.onError(t);i.queries.delete(e)}function Vo(n){n.Y_.forEach(e=>{e.next()})}var js,Ql;(Ql=js||(js={})).ea="default",Ql.Cache="cache";class Xu{constructor(e,t,i){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=i||{}}X_(e){if(!this.options.includeMetadataChanges){const i=[];for(const r of e.docChanges)r.type!==3&&i.push(r);e=new un(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const i=t!=="Offline";return(!this.options._a||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=un.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==js.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(e){this.key=e}}class Zu{constructor(e){this.key=e}}class Ay{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=j(),this.mutatedKeys=j(),this.Aa=yu(e),this.Ra=new en(this.Aa)}get Va(){return this.Ta}ma(e,t){const i=t?t.fa:new Gl,r=t?t.Ra:this.Ra;let o=t?t.mutatedKeys:this.mutatedKeys,a=r,c=!1;const h=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,d=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((p,y)=>{const b=r.get(p),R=Er(this.query,y)?y:null,D=!!b&&this.mutatedKeys.has(b.key),V=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let k=!1;b&&R?b.data.isEqual(R.data)?D!==V&&(i.track({type:3,doc:R}),k=!0):this.ga(b,R)||(i.track({type:2,doc:R}),k=!0,(h&&this.Aa(R,h)>0||d&&this.Aa(R,d)<0)&&(c=!0)):!b&&R?(i.track({type:0,doc:R}),k=!0):b&&!R&&(i.track({type:1,doc:b}),k=!0,(h||d)&&(c=!0)),k&&(R?(a=a.add(R),o=V?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),i.track({type:1,doc:p})}return{Ra:a,fa:i,ns:c,mutatedKeys:o}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i,r){const o=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((p,y)=>function(R,D){const V=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U()}};return V(R)-V(D)}(p.type,y.type)||this.Aa(p.doc,y.doc)),this.pa(i),r=r!=null&&r;const c=t&&!r?this.ya():[],h=this.da.size===0&&this.current&&!r?1:0,d=h!==this.Ea;return this.Ea=h,a.length!==0||d?{snapshot:new un(this.query,e.Ra,o,a,e.mutatedKeys,h===0,d,!1,!!i&&i.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Gl,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=j(),this.Ra.forEach(i=>{this.Sa(i.key)&&(this.da=this.da.add(i.key))});const t=[];return e.forEach(i=>{this.da.has(i)||t.push(new Zu(i))}),this.da.forEach(i=>{e.has(i)||t.push(new Yu(i))}),t}ba(e){this.Ta=e.Ts,this.da=j();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return un.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class Ry{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}}class Sy{constructor(e){this.key=e,this.va=!1}}class Py{constructor(e,t,i,r,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=r,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new pn(c=>_u(c),vr),this.Ma=new Map,this.xa=new Set,this.Oa=new Z(x.comparator),this.Na=new Map,this.La=new bo,this.Ba={},this.ka=new Map,this.qa=cn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Cy(n,e,t=!0){const i=sh(n);let r;const o=i.Fa.get(e);return o?(i.sharedClientState.addLocalQueryTarget(o.targetId),r=o.view.Da()):r=await eh(i,e,t,!0),r}async function ky(n,e){const t=sh(n);await eh(t,e,!0,!1)}async function eh(n,e,t,i){const r=await Y_(n.localStore,Le(e)),o=r.targetId,a=n.sharedClientState.addLocalQueryTarget(o,t);let c;return i&&(c=await Dy(n,e,o,a==="current",r.resumeToken)),n.isPrimaryClient&&t&&qu(n.remoteStore,r),c}async function Dy(n,e,t,i,r){n.Ka=(y,b,R)=>async function(V,k,q,G){let K=k.view.ma(q);K.ns&&(K=await ql(V.localStore,k.query,!1).then(({documents:E})=>k.view.ma(E,K)));const ne=G&&G.targetChanges.get(k.targetId),ke=G&&G.targetMismatches.get(k.targetId)!=null,ie=k.view.applyChanges(K,V.isPrimaryClient,ne,ke);return Xl(V,k.targetId,ie.wa),ie.snapshot}(n,y,b,R);const o=await ql(n.localStore,e,!0),a=new Ay(e,o.Ts),c=a.ma(o.documents),h=ci.createSynthesizedTargetChangeForCurrentChange(t,i&&n.onlineState!=="Offline",r),d=a.applyChanges(c,n.isPrimaryClient,h);Xl(n,t,d.wa);const p=new Ry(e,t,a);return n.Fa.set(e,p),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),d.snapshot}async function Ny(n,e,t){const i=B(n),r=i.Fa.get(e),o=i.Ma.get(r.targetId);if(o.length>1)return i.Ma.set(r.targetId,o.filter(a=>!vr(a,e))),void i.Fa.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(r.targetId),i.sharedClientState.isActiveQueryTarget(r.targetId)||await Bs(i.localStore,r.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(r.targetId),t&&So(i.remoteStore,r.targetId),$s(i,r.targetId)}).catch(oi)):($s(i,r.targetId),await Bs(i.localStore,r.targetId,!0))}async function Vy(n,e){const t=B(n),i=t.Fa.get(e),r=t.Ma.get(i.targetId);t.isPrimaryClient&&r.length===1&&(t.sharedClientState.removeLocalQueryTarget(i.targetId),So(t.remoteStore,i.targetId))}async function Oy(n,e,t){const i=jy(n);try{const r=await function(a,c){const h=B(a),d=oe.now(),p=c.reduce((R,D)=>R.add(D.key),j());let y,b;return h.persistence.runTransaction("Locally write mutations","readwrite",R=>{let D=Ze(),V=j();return h.cs.getEntries(R,p).next(k=>{D=k,D.forEach((q,G)=>{G.isValidDocument()||(V=V.add(q))})}).next(()=>h.localDocuments.getOverlayedDocuments(R,D)).next(k=>{y=k;const q=[];for(const G of c){const K=n_(G,y.get(G.key).overlayedDocument);K!=null&&q.push(new yt(G.key,K,uu(K.value.mapValue),Ce.exists(!0)))}return h.mutationQueue.addMutationBatch(R,d,q,c)}).next(k=>{b=k;const q=k.applyToLocalDocumentSet(y,V);return h.documentOverlayCache.saveOverlays(R,k.batchId,q)})}).then(()=>({batchId:b.batchId,changes:Eu(y)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(r.batchId),function(a,c,h){let d=a.Ba[a.currentUser.toKey()];d||(d=new Z(W)),d=d.insert(c,h),a.Ba[a.currentUser.toKey()]=d}(i,r.batchId,t),await hi(i,r.changes),await Sr(i.remoteStore)}catch(r){const o=No(r,"Failed to persist write");t.reject(o)}}async function th(n,e){const t=B(n);try{const i=await Q_(t.localStore,e);e.targetChanges.forEach((r,o)=>{const a=t.Na.get(o);a&&(Q(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1),r.addedDocuments.size>0?a.va=!0:r.modifiedDocuments.size>0?Q(a.va):r.removedDocuments.size>0&&(Q(a.va),a.va=!1))}),await hi(t,i,e)}catch(i){await oi(i)}}function Jl(n,e,t){const i=B(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const r=[];i.Fa.forEach((o,a)=>{const c=a.view.Z_(e);c.snapshot&&r.push(c.snapshot)}),function(a,c){const h=B(a);h.onlineState=c;let d=!1;h.queries.forEach((p,y)=>{for(const b of y.j_)b.Z_(c)&&(d=!0)}),d&&Vo(h)}(i.eventManager,e),r.length&&i.Ca.d_(r),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function Ly(n,e,t){const i=B(n);i.sharedClientState.updateQueryState(e,"rejected",t);const r=i.Na.get(e),o=r&&r.key;if(o){let a=new Z(x.comparator);a=a.insert(o,Ie.newNoDocument(o,F.min()));const c=j().add(o),h=new br(F.min(),new Map,new Z(W),a,c);await th(i,h),i.Oa=i.Oa.remove(o),i.Na.delete(e),Oo(i)}else await Bs(i.localStore,e,!1).then(()=>$s(i,e,t)).catch(oi)}async function xy(n,e){const t=B(n),i=e.batch.batchId;try{const r=await K_(t.localStore,e);ih(t,i,null),nh(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await hi(t,r)}catch(r){await oi(r)}}async function My(n,e,t){const i=B(n);try{const r=await function(a,c){const h=B(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return h.mutationQueue.lookupMutationBatch(d,c).next(y=>(Q(y!==null),p=y.keys(),h.mutationQueue.removeMutationBatch(d,y))).next(()=>h.mutationQueue.performConsistencyCheck(d)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>h.localDocuments.getDocuments(d,p))})}(i.localStore,e);ih(i,e,t),nh(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await hi(i,r)}catch(r){await oi(r)}}function nh(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function ih(n,e,t){const i=B(n);let r=i.Ba[i.currentUser.toKey()];if(r){const o=r.get(e);o&&(t?o.reject(t):o.resolve(),r=r.remove(e)),i.Ba[i.currentUser.toKey()]=r}}function $s(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const i of n.Ma.get(e))n.Fa.delete(i),t&&n.Ca.$a(i,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(i=>{n.La.containsKey(i)||rh(n,i)})}function rh(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(So(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),Oo(n))}function Xl(n,e,t){for(const i of t)i instanceof Yu?(n.La.addReference(i.key,e),Uy(n,i)):i instanceof Zu?(N("SyncEngine","Document no longer in limbo: "+i.key),n.La.removeReference(i.key,e),n.La.containsKey(i.key)||rh(n,i.key)):U()}function Uy(n,e){const t=e.key,i=t.path.canonicalString();n.Oa.get(t)||n.xa.has(i)||(N("SyncEngine","New document in limbo: "+t),n.xa.add(i),Oo(n))}function Oo(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new x(Y.fromString(e)),i=n.qa.next();n.Na.set(i,new Sy(t)),n.Oa=n.Oa.insert(t,i),qu(n.remoteStore,new ct(Le(vo(t.path)),i,"TargetPurposeLimboResolution",fo.oe))}}async function hi(n,e,t){const i=B(n),r=[],o=[],a=[];i.Fa.isEmpty()||(i.Fa.forEach((c,h)=>{a.push(i.Ka(h,e,t).then(d=>{var p;if((d||t)&&i.isPrimaryClient){const y=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(h.targetId))===null||p===void 0?void 0:p.current;i.sharedClientState.updateQueryState(h.targetId,y?"current":"not-current")}if(d){r.push(d);const y=Ro.Wi(h.targetId,d);o.push(y)}}))}),await Promise.all(a),i.Ca.d_(r),await async function(h,d){const p=B(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>P.forEach(d,b=>P.forEach(b.$i,R=>p.persistence.referenceDelegate.addReference(y,b.targetId,R)).next(()=>P.forEach(b.Ui,R=>p.persistence.referenceDelegate.removeReference(y,b.targetId,R)))))}catch(y){if(!ai(y))throw y;N("LocalStore","Failed to update sequence numbers: "+y)}for(const y of d){const b=y.targetId;if(!y.fromCache){const R=p.os.get(b),D=R.snapshotVersion,V=R.withLastLimboFreeSnapshotVersion(D);p.os=p.os.insert(b,V)}}}(i.localStore,o))}async function Fy(n,e){const t=B(n);if(!t.currentUser.isEqual(e)){N("SyncEngine","User change. New user:",e.toKey());const i=await Fu(t.localStore,e);t.currentUser=e,function(o,a){o.ka.forEach(c=>{c.forEach(h=>{h.reject(new L(S.CANCELLED,a))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await hi(t,i.hs)}}function By(n,e){const t=B(n),i=t.Na.get(e);if(i&&i.va)return j().add(i.key);{let r=j();const o=t.Ma.get(e);if(!o)return r;for(const a of o){const c=t.Fa.get(a);r=r.unionWith(c.view.Va)}return r}}function sh(n){const e=B(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=th.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=By.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Ly.bind(null,e),e.Ca.d_=wy.bind(null,e.eventManager),e.Ca.$a=by.bind(null,e.eventManager),e}function jy(n){const e=B(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=xy.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=My.bind(null,e),e}class hr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ar(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return G_(this.persistence,new H_,e.initialUser,this.serializer)}Ga(e){return new $_(Ao.Zr,this.serializer)}Wa(e){return new ey}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}hr.provider={build:()=>new hr};class qs{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>Jl(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=Fy.bind(null,this.syncEngine),await Ey(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Ty}()}createDatastore(e){const t=Ar(e.databaseInfo.databaseId),i=function(o){return new ry(o)}(e.databaseInfo);return function(o,a,c,h){return new ay(o,a,c,h)}(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return function(i,r,o,a,c){return new cy(i,r,o,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Jl(this.syncEngine,t,0),function(){return Hl.D()?new Hl:new ty}())}createSyncEngine(e,t){return function(r,o,a,c,h,d,p){const y=new Py(r,o,a,c,h,d);return p&&(y.Qa=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(r){const o=B(r);N("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await ui(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}qs.provider={build:()=>new qs};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Ye("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(e,t,i,r,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this.databaseInfo=r,this.user=Ee.UNAUTHENTICATED,this.clientId=ho.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(i,async a=>{N("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(i,a=>(N("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ft;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=No(t,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}async function vs(n,e){n.asyncQueue.verifyOperationInProgress(),N("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener(async r=>{i.isEqual(r)||(await Fu(e.localStore,r),i=r)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Yl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await qy(n);N("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(i=>Wl(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,r)=>Wl(e.remoteStore,r)),n._onlineComponents=e}async function qy(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N("FirestoreClient","Using user provided OfflineComponentProvider");try{await vs(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(r){return r.name==="FirebaseError"?r.code===S.FAILED_PRECONDITION||r.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(t))throw t;Lt("Error using user provided cache. Falling back to memory cache: "+t),await vs(n,new hr)}}else N("FirestoreClient","Using default OfflineComponentProvider"),await vs(n,new hr);return n._offlineComponents}async function ah(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N("FirestoreClient","Using user provided OnlineComponentProvider"),await Yl(n,n._uninitializedComponentsProvider._online)):(N("FirestoreClient","Using default OnlineComponentProvider"),await Yl(n,new qs))),n._onlineComponents}function zy(n){return ah(n).then(e=>e.syncEngine)}async function zs(n){const e=await ah(n),t=e.eventManager;return t.onListen=Cy.bind(null,e.syncEngine),t.onUnlisten=Ny.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=ky.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Vy.bind(null,e.syncEngine),t}function Hy(n,e,t={}){const i=new ft;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,c,h,d){const p=new oh({next:b=>{p.Za(),a.enqueueAndForget(()=>Ju(o,y)),b.fromCache&&h.source==="server"?d.reject(new L(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(b)},error:b=>d.reject(b)}),y=new Xu(c,p,{includeMetadataChanges:!0,_a:!0});return Qu(o,y)}(await zs(n),n.asyncQueue,e,t,i)),i.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ch(n,e,t){if(!t)throw new L(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function uh(n,e,t,i){if(e===!0&&i===!0)throw new L(S.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ec(n){if(!x.isDocumentKey(n))throw new L(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function tc(n){if(x.isDocumentKey(n))throw new L(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Lo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U()}function Ve(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new L(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Lo(n);throw new L(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e){var t,i;if(e.host===void 0){if(e.ssl!==void 0)throw new L(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new L(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}uh("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=lh((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new L(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new L(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new L(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,r){return i.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Pr{constructor(e,t,i,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new nc({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new L(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new nc(e),e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new au;switch(i.type){case"firstParty":return new fg(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new L(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const i=Zl.get(t);i&&(N("ComponentProvider","Removing Datastore"),Zl.delete(t),i.terminate())}(this),Promise.resolve()}}function hh(n,e,t,i={}){var r;const o=(n=Ve(n,Pr))._getSettings(),a=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&Lt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),i.mockUserToken){let c,h;if(typeof i.mockUserToken=="string")c=i.mockUserToken,h=Ee.MOCK_USER;else{c=Md(i.mockUserToken,(r=n._app)===null||r===void 0?void 0:r.options.projectId);const d=i.mockUserToken.sub||i.mockUserToken.user_id;if(!d)throw new L(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new Ee(d)}n._authCredentials=new ug(new ou(c,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new gn(this.firestore,e,this._query)}}class Re{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ke(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Re(this.firestore,e,this._key)}}class Ke extends gn{constructor(e,t,i){super(e,t,vo(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Re(this.firestore,null,new x(e))}withConverter(e){return new Ke(this.firestore,e,this._path)}}function dh(n,e,...t){if(n=ue(n),ch("collection","path",e),n instanceof Pr){const i=Y.fromString(e,...t);return tc(i),new Ke(n,null,i)}{if(!(n instanceof Re||n instanceof Ke))throw new L(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(Y.fromString(e,...t));return tc(i),new Ke(n.firestore,null,i)}}function fh(n,e,...t){if(n=ue(n),arguments.length===1&&(e=ho.newId()),ch("doc","path",e),n instanceof Pr){const i=Y.fromString(e,...t);return ec(i),new Re(n,null,new x(i))}{if(!(n instanceof Re||n instanceof Ke))throw new L(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(Y.fromString(e,...t));return ec(i),new Re(n.firestore,n instanceof Ke?n.converter:null,new x(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new ju(this,"async_queue_retry"),this.Vu=()=>{const i=ys();i&&N("AsyncQueue","Visibility state changed to "+i.visibilityState),this.t_.jo()},this.mu=e;const t=ys();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=ys();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new ft;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!ai(e))throw e;N("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(i=>{this.Eu=i,this.du=!1;const r=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(i);throw Ye("INTERNAL UNHANDLED ERROR: ",r),i}).then(i=>(this.du=!1,i))));return this.mu=t,t}enqueueAfterDelay(e,t,i){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const r=Do.createAndSchedule(this,e,t,i,o=>this.yu(o));return this.Tu.push(r),r}fu(){this.Eu&&U()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function rc(n){return function(t,i){if(typeof t!="object"||t===null)return!1;const r=t;for(const o of i)if(o in r&&typeof r[o]=="function")return!0;return!1}(n,["next","error","complete"])}class _t extends Pr{constructor(e,t,i,r){super(e,t,i,r),this.type="firestore",this._queue=new ic,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ic(e),this._firestoreClient=void 0,await e}}}function ph(n,e){const t=typeof n=="object"?n:Ec(),i=typeof n=="string"?n:"(default)",r=Ys(t,"firestore").getImmediate({identifier:i});if(!r._initialized){const o=Ld("firestore");o&&hh(r,...o)}return r}function di(n){if(n._terminated)throw new L(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Wy(n),n._firestoreClient}function Wy(n){var e,t,i;const r=n._freezeSettings(),o=function(c,h,d,p){return new Rg(c,h,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,lh(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,r);n._componentsProvider||!((t=r.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((i=r.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),n._firestoreClient=new $y(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ut(he.fromBase64String(e))}catch(t){throw new L(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ut(he.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new L(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ce(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new L(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new L(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return W(this._lat,e._lat)||W(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,r){if(i.length!==r.length)return!1;for(let o=0;o<i.length;++o)if(i[o]!==r[o])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gy=/^__.*__$/;class Ky{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new yt(e,this.data,this.fieldMask,t,this.fieldTransforms):new li(e,this.data,t,this.fieldTransforms)}}class mh{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new yt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function gh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U()}}class xo{constructor(e,t,i,r,o,a){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=r,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new xo(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),r=this.Fu({path:i,xu:!1});return r.Ou(e),r}Nu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),r=this.Fu({path:i,xu:!1});return r.vu(),r}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return dr(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(gh(this.Cu)&&Gy.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Qy{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||Ar(e)}Qu(e,t,i,r=!1){return new xo({Cu:e,methodName:t,qu:i,path:ce.emptyPath(),xu:!1,ku:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _h(n){const e=n._freezeSettings(),t=Ar(n._databaseId);return new Qy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function yh(n,e,t,i,r,o={}){const a=n.Qu(o.merge||o.mergeFields?2:0,e,t,r);Uo("Data must be an object, but it was:",a,i);const c=vh(i,a);let h,d;if(o.merge)h=new Pe(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const p=[];for(const y of o.mergeFields){const b=Hs(e,y,t);if(!a.contains(b))throw new L(S.INVALID_ARGUMENT,`Field '${b}' is specified in your field mask but missing from your input data.`);Ih(p,b)||p.push(b)}h=new Pe(p),d=a.fieldTransforms.filter(y=>h.covers(y.field))}else h=null,d=a.fieldTransforms;return new Ky(new Ae(c),h,d)}class Dr extends pi{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Dr}}class Mo extends pi{_toFieldTransform(e){return new Yg(e.path,new Yn)}isEqual(e){return e instanceof Mo}}function Jy(n,e,t,i){const r=n.Qu(1,e,t);Uo("Data must be an object, but it was:",r,i);const o=[],a=Ae.empty();Ft(i,(h,d)=>{const p=Fo(e,h,t);d=ue(d);const y=r.Nu(p);if(d instanceof Dr)o.push(p);else{const b=Nr(d,y);b!=null&&(o.push(p),a.set(p,b))}});const c=new Pe(o);return new mh(a,c,r.fieldTransforms)}function Xy(n,e,t,i,r,o){const a=n.Qu(1,e,t),c=[Hs(e,i,t)],h=[r];if(o.length%2!=0)throw new L(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let b=0;b<o.length;b+=2)c.push(Hs(e,o[b])),h.push(o[b+1]);const d=[],p=Ae.empty();for(let b=c.length-1;b>=0;--b)if(!Ih(d,c[b])){const R=c[b];let D=h[b];D=ue(D);const V=a.Nu(R);if(D instanceof Dr)d.push(R);else{const k=Nr(D,V);k!=null&&(d.push(R),p.set(R,k))}}const y=new Pe(d);return new mh(p,y,a.fieldTransforms)}function Nr(n,e){if(Eh(n=ue(n)))return Uo("Unsupported field value:",e,n),vh(n,e);if(n instanceof pi)return function(i,r){if(!gh(r.Cu))throw r.Bu(`${i._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Bu(`${i._methodName}() is not currently supported inside arrays`);const o=i._toFieldTransform(r);o&&r.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(i,r){const o=[];let a=0;for(const c of i){let h=Nr(c,r.Lu(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,e)}return function(i,r){if((i=ue(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return Qg(r.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const o=oe.fromDate(i);return{timestampValue:cr(r.serializer,o)}}if(i instanceof oe){const o=new oe(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:cr(r.serializer,o)}}if(i instanceof Cr)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Ut)return{bytesValue:Nu(r.serializer,i._byteString)};if(i instanceof Re){const o=r.databaseId,a=i.firestore._databaseId;if(!a.isEqual(o))throw r.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:wo(i.firestore._databaseId||r.databaseId,i._key.path)}}if(i instanceof kr)return function(a,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw c.Bu("VectorValues must only contain numeric values.");return Eo(c.serializer,h)})}}}}}}(i,r);throw r.Bu(`Unsupported field value: ${Lo(i)}`)}(n,e)}function vh(n,e){const t={};return lu(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ft(n,(i,r)=>{const o=Nr(r,e.Mu(i));o!=null&&(t[i]=o)}),{mapValue:{fields:t}}}function Eh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof Cr||n instanceof Ut||n instanceof Re||n instanceof pi||n instanceof kr)}function Uo(n,e,t){if(!Eh(t)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(t)){const i=Lo(t);throw i==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+i)}}function Hs(n,e,t){if((e=ue(e))instanceof fi)return e._internalPath;if(typeof e=="string")return Fo(n,e);throw dr("Field path arguments must be of type string or ",n,!1,void 0,t)}const Yy=new RegExp("[~\\*/\\[\\]]");function Fo(n,e,t){if(e.search(Yy)>=0)throw dr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new fi(...e.split("."))._internalPath}catch{throw dr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function dr(n,e,t,i,r){const o=i&&!i.isEmpty(),a=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${i}`),a&&(h+=` in document ${r}`),h+=")"),new L(S.INVALID_ARGUMENT,c+n+h)}function Ih(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(e,t,i,r,o){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=r,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Zy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(wh("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Zy extends Th{data(){return super.data()}}function wh(n,e){return typeof e=="string"?Fo(n,e):e instanceof fi?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bh(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new L(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ah{convertValue(e,t="none"){switch(Mt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return re(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(xt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw U()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const i={};return Ft(e,(r,o)=>{i[r]=this.convertValue(o,t)}),i}convertVectorValue(e){var t,i,r;const o=(r=(i=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||i===void 0?void 0:i.values)===null||r===void 0?void 0:r.map(a=>re(a.doubleValue));return new kr(o)}convertGeoPoint(e){return new Cr(re(e.latitude),re(e.longitude))}convertArray(e,t){return(e.values||[]).map(i=>this.convertValue(i,t))}convertServerTimestamp(e,t){switch(t){case"previous":const i=mo(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(Jn(e));default:return null}}convertTimestamp(e){const t=mt(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const i=Y.fromString(e);Q(Uu(i));const r=new on(i.get(1),i.get(3)),o=new x(i.popFirst(5));return r.isEqual(t)||Ye(`Document ${o} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rh(n,e,t){let i;return i=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Bo extends Th{constructor(e,t,i,r,o,a){super(e,t,i,r,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Wn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(wh("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}}class Wn extends Bo{data(e={}){return super.data(e)}}class jo{constructor(e,t,i,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Jt(r.hasPendingWrites,r.fromCache),this.query=i}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(i=>{e.call(t,new Wn(this._firestore,this._userDataWriter,i.key,i,new Jt(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new L(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,o){if(r._snapshot.oldDocs.isEmpty()){let a=0;return r._snapshot.docChanges.map(c=>{const h=new Wn(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Jt(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);return c.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(c=>o||c.type!==3).map(c=>{const h=new Wn(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Jt(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);let d=-1,p=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),p=a.indexOf(c.doc.key)),{type:ev(c.type),doc:h,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function ev(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U()}}class $o extends Ah{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ut(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Re(this.firestore,null,t)}}function tv(n){n=Ve(n,gn);const e=Ve(n.firestore,_t),t=di(e),i=new $o(e);return bh(n._query),Hy(t,n._query).then(r=>new jo(e,i,n,r))}function qo(n,e,t){n=Ve(n,Re);const i=Ve(n.firestore,_t),r=Rh(n.converter,e,t);return Vr(i,[yh(_h(i),"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,Ce.none())])}function Sh(n){return Vr(Ve(n.firestore,_t),[new wr(n._key,Ce.none())])}function Ph(n,...e){var t,i,r;n=ue(n);let o={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||rc(e[a])||(o=e[a],a++);const c={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(rc(e[a])){const y=e[a];e[a]=(t=y.next)===null||t===void 0?void 0:t.bind(y),e[a+1]=(i=y.error)===null||i===void 0?void 0:i.bind(y),e[a+2]=(r=y.complete)===null||r===void 0?void 0:r.bind(y)}let h,d,p;if(n instanceof Re)d=Ve(n.firestore,_t),p=vo(n._key.path),h={next:y=>{e[a]&&e[a](nv(d,n,y))},error:e[a+1],complete:e[a+2]};else{const y=Ve(n,gn);d=Ve(y.firestore,_t),p=y._query;const b=new $o(d);h={next:R=>{e[a]&&e[a](new jo(d,b,y,R))},error:e[a+1],complete:e[a+2]},bh(n._query)}return function(b,R,D,V){const k=new oh(V),q=new Xu(R,k,D);return b.asyncQueue.enqueueAndForget(async()=>Qu(await zs(b),q)),()=>{k.Za(),b.asyncQueue.enqueueAndForget(async()=>Ju(await zs(b),q))}}(di(d),p,c,h)}function Vr(n,e){return function(i,r){const o=new ft;return i.asyncQueue.enqueueAndForget(async()=>Oy(await zy(i),r,o)),o.promise}(di(n),e)}function nv(n,e,t){const i=t.docs.get(e._key),r=new $o(n);return new Bo(n,r,e._key,i,new Jt(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=_h(e)}set(e,t,i){this._verifyNotCommitted();const r=Es(e,this._firestore),o=Rh(r.converter,t,i),a=yh(this._dataReader,"WriteBatch.set",r._key,o,r.converter!==null,i);return this._mutations.push(a.toMutation(r._key,Ce.none())),this}update(e,t,i,...r){this._verifyNotCommitted();const o=Es(e,this._firestore);let a;return a=typeof(t=ue(t))=="string"||t instanceof fi?Xy(this._dataReader,"WriteBatch.update",o._key,t,i,r):Jy(this._dataReader,"WriteBatch.update",o._key,t),this._mutations.push(a.toMutation(o._key,Ce.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Es(e,this._firestore);return this._mutations=this._mutations.concat(new wr(t._key,Ce.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new L(S.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Es(n,e){if((n=ue(n)).firestore!==e)throw new L(S.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function Or(){return new Mo("serverTimestamp")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kh(n){return di(n=Ve(n,_t)),new Ch(n,e=>Vr(n,e))}(function(e,t=!0){(function(r){fn=r})(hn),nn(new Nt("firestore",(i,{instanceIdentifier:r,options:o})=>{const a=i.getProvider("app").getImmediate(),c=new _t(new hg(i.getProvider("auth-internal")),new mg(i.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new L(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new on(d.options.projectId,p)}(a,r),a);return o=Object.assign({useFetchStreams:t},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),dt(Tl,"4.7.3",e),dt(Tl,"4.7.3","esm2017")})();const iv=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Ah,Bytes:Ut,CollectionReference:Ke,DocumentReference:Re,DocumentSnapshot:Bo,FieldPath:fi,FieldValue:pi,Firestore:_t,FirestoreError:L,GeoPoint:Cr,Query:gn,QueryDocumentSnapshot:Wn,QuerySnapshot:jo,SnapshotMetadata:Jt,Timestamp:oe,VectorValue:kr,WriteBatch:Ch,_AutoId:ho,_ByteString:he,_DatabaseId:on,_DocumentKey:x,_EmptyAuthCredentialsProvider:au,_FieldPath:ce,_cast:Ve,_logWarn:Lt,_validateIsNotUsedTogether:uh,collection:dh,connectFirestoreEmulator:hh,deleteDoc:Sh,doc:fh,ensureFirestoreConfigured:di,executeWrite:Vr,getDocs:tv,getFirestore:ph,onSnapshot:Ph,serverTimestamp:Or,setDoc:qo,writeBatch:kh},Symbol.toStringTag,{value:"Module"})),rv={apiKey:"AIzaSyCn7qGtB-x0icxG6l4HVI31HlZcBgkoR6s",authDomain:"mythesis-ba271.firebaseapp.com",projectId:"mythesis-ba271",storageBucket:"mythesis-ba271.firebasestorage.app",messagingSenderId:"293637871197",appId:"1:293637871197:web:6aef04f68906bcf5491fb4"},Dh=vc(rv),Lr=lg(Dh),zo=ph(Dh),Nh=new qe;Nh.setCustomParameters({prompt:"select_account"});async function sv(){try{await _m(Lr,Nh)}catch(n){throw console.error("Login error:",n),n}}async function ov(){await Xp(Lr)}function av(n){return Jp(Lr,n)}function Vh(){var n;return((n=Lr.currentUser)==null?void 0:n.uid)||null}function Oh(n){const e=Vh();if(!e)throw new Error("Not logged in");return dh(zo,"users",e,n)}function xr(n,e){const t=Vh();if(!t)throw new Error("Not logged in");return fh(zo,"users",t,n,e)}async function lv(n,e){const t=xr(n,e.id);await qo(t,{...e,_updatedAt:Or()},{merge:!0})}async function cv(n,e){const t=xr(n,e);await Sh(t)}function uv(n,e){const t=Oh(n);return Ph(t,i=>{const r=i.docs.map(o=>{const a=o.data();return delete a._updatedAt,a});e(r)},i=>{console.error(`Firestore ${n} error:`,i)})}async function hv(n,e){const{getDocs:t}=await Sd(async()=>{const{getDocs:o}=await Promise.resolve().then(()=>iv);return{getDocs:o}},void 0),i=Oh(n);if((await t(i)).empty){const o=kh(zo);e.forEach(a=>{const c=xr(n,a.id);o.set(c,{...a,_updatedAt:Or()})}),await o.commit(),console.log(`[Firebase] Seeded ${e.length} items → ${n}`)}}async function dv(n){const e=xr("meta","info");await qo(e,{displayName:n.displayName||"",email:n.email||"",photoURL:n.photoURL||"",lastSeen:Or()},{merge:!0})}function mi(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Ho(){return new Date().toISOString().split("T")[0]}const fv=[{id:"1.0",phase:"Phase 1 — Upload & Job Management",phaseNum:1,title:"Upload & Async Job Management",desc:"User upload dokumen, backend buat job_id, trigger async worker",algos:["Async queue","Job state machine"],status:"belum",llm:!1,note:""},{id:"4.1",phase:"Phase 2 — Document Intelligence",phaseNum:2,title:"Page Classification",desc:"Klasifikasi halaman SU Page 1, SU Page 2, Buku Tanah",algos:["Layout classifier","Keyword detection"],status:"belum",llm:!1,note:""},{id:"4.2",phase:"Phase 3 — SU Page 1 Textual Pipeline",phaseNum:3,title:"OCR Extraction SU Page 1",desc:"Ekstraksi teks raw dari SU halaman pertama",algos:["Vision OCR model"],status:"belum",llm:!1,note:""},{id:"4.3",phase:"Phase 3 — SU Page 1 Textual Pipeline",phaseNum:3,title:"Metadata Structured Extraction",desc:"Ekstraksi field terstruktur: nomor SU, desa, luas, tahun, hak",algos:["Prompt-based JSON extraction"],status:"belum",llm:!0,note:""},{id:"4.4",phase:"Phase 4 — SU Page 2 Spatial Pipeline",phaseNum:4,title:"Image Enhancement",desc:"Gamma correction, contrast adjustment, histogram normalization untuk garis kadaster tipis",algos:["Gamma correction","Contrast adjustment","Histogram normalization"],status:"belum",llm:!1,note:""},{id:"4.5",phase:"Phase 4 — SU Page 2 Spatial Pipeline",phaseNum:4,title:"SAM Segmentation",desc:"Segment Anything Model untuk menghasilkan binary mask polygon kadaster",algos:["Segment Anything Model","Seed-based segmentation"],status:"belum",llm:!1,note:""},{id:"4.6",phase:"Phase 4 — SU Page 2 Spatial Pipeline",phaseNum:4,title:"Contour & Polygon Extraction",desc:"Deteksi tepi dan ekstraksi polygon dari hasil SAM",algos:["Canny Edge Detection","Contour detection","Polygon approximation"],status:"belum",llm:!1,note:""},{id:"4.7",phase:"Phase 4 — SU Page 2 Spatial Pipeline",phaseNum:4,title:"Geometric Regularization",desc:"Simplifikasi geometri, preservasi topologi, remove redundan vertices",algos:["Simplify geometry","Topology preservation"],status:"belum",llm:!1,note:""},{id:"4.8",phase:"Phase 4 — SU Page 2 Spatial Pipeline",phaseNum:4,title:"DPI-Based Scaling",desc:"Konversi pixel ke meter berdasarkan DPI scan · Scale = DPI / 0.0254",algos:["DPI scaling formula"],status:"belum",llm:!1,note:""},{id:"4.9",phase:"Phase 4 — SU Page 2 Spatial Pipeline",phaseNum:4,title:"Internal Quality Evaluation",desc:"Skor reliabilitas sketch: area diff, intersection check, precision/recall proxy",algos:["Area difference","Intersection check","Precision/Recall proxy"],status:"belum",llm:!1,note:""},{id:"4.10",phase:"Phase 5 — Buku Tanah Pipeline",phaseNum:5,title:"OCR Extraction Buku Tanah",desc:"Ekstraksi teks dari halaman Buku Tanah",algos:["Vision OCR model"],status:"belum",llm:!1,note:""},{id:"4.11",phase:"Phase 5 — Buku Tanah Pipeline",phaseNum:5,title:"Boundary Semantic Parsing",desc:"Ekstraksi semantik batas: utara sungai, timur jalan desa",algos:["Prompt-based relation extraction"],status:"belum",llm:!0,note:""},{id:"6.0",phase:"Phase 6 — Constraint Consolidation",phaseNum:6,title:"Constraint Consolidation",desc:"Gabungkan metadata, shape features, reliability score, boundary semantics → Unified Constraint JSON",algos:["Entity resolution","Synonym normalization"],status:"belum",llm:!0,note:""},{id:"7.0",phase:"Phase 7 — Prior Precomputation",phaseNum:7,title:"Prior Precomputation (Offline)",desc:"KDE dan GMM per desa untuk prior raster · output: prior_raster_desa.tif",algos:["Kernel Density Estimation","Gaussian Mixture Model","Analog block density"],status:"belum",llm:!1,note:""},{id:"8.0",phase:"Phase 8 — Local Inference Window",phaseNum:8,title:"Local Inference Window",desc:"Resolve desa polygon, expand bounding box, generate grid resolusi 10m",algos:["Spatial grid generation"],status:"belum",llm:!1,note:""},{id:"4.12",phase:"Phase 9 — Bayesian Inference Engine",phaseNum:9,title:"Likelihood Computation",desc:"Hitung AreaLikelihood, BoundaryLikelihood, ShapeLikelihood, OrientationLikelihood, AnalogLikelihood per grid cell",algos:["Probabilistic scoring","Spatial likelihood functions"],status:"belum",llm:!1,note:""},{id:"4.13",phase:"Phase 9 — Bayesian Inference Engine",phaseNum:9,title:"Posterior Computation",desc:"Posterior(L) ∝ Prior(L) × Likelihood(L) · normalisasi posterior",algos:["Bayesian update","Normalization"],status:"belum",llm:!1,note:""},{id:"4.14",phase:"Phase 9 — Bayesian Inference Engine",phaseNum:9,title:"MAP Estimation",desc:"L_MAP = argmax Posterior(L)",algos:["Maximum A Posteriori"],status:"belum",llm:!1,note:""},{id:"4.15",phase:"Phase 9 — Bayesian Inference Engine",phaseNum:9,title:"Credible Region Extraction",desc:"Sort grid by posterior desc, accumulate until α (50/75/90/95%), raster to polygon",algos:["Credible interval accumulation","Raster to vector"],status:"belum",llm:!1,note:""},{id:"4.16",phase:"Phase 9 — Bayesian Inference Engine",phaseNum:9,title:"Entropy Calculation",desc:"H = -Σ P log P untuk uncertainty visualization & reliability score",algos:["Shannon entropy"],status:"belum",llm:!1,note:""},{id:"10.0",phase:"Phase 10 — Result Storage",phaseNum:10,title:"Result Storage & Caching",desc:"Simpan MAP point, posterior raster, credible region polygons · Cache Redis",algos:["Redis caching","GeoJSON storage","Raster store"],status:"belum",llm:!1,note:""},{id:"11.0",phase:"Phase 11 — Interactive Web Map",phaseNum:11,title:"Interactive Web Map",desc:"Probability heatmap, credible region polygons, MAP marker, layer controls, confidence slider",algos:["Mapbox GL","Deck.gl","WebGL heatmap"],status:"belum",llm:!1,note:""},{id:"12.0",phase:"Phase 12 — Human-in-the-Loop",phaseNum:12,title:"Human-in-the-Loop Correction",desc:"Move/remove vertex, rotate polygon, undo, re-run Bayesian inference dinamis",algos:["Interactive geometry editing","Dynamic re-inference"],status:"belum",llm:!1,note:""},{id:"7.x",phase:"Phase 7 — LLM Orchestration Layer",phaseNum:7,title:"LLM as Conversational Orchestrator",desc:"Chat-driven UI · LLM narasikan status backend · constraint clarification · what-if simulation",algos:["Prompt engineering","State machine chat","Async status narration"],status:"belum",llm:!0,note:""},{id:"OPT",phase:"Optional — Explanation Generation",phaseNum:13,title:"Natural Language Explanation",desc:'LLM generate narasi penjelasan hasil Bayesian per klik "Explain Result"',algos:["Narrative generation","Evidence summarization"],status:"belum",llm:!0,note:""}],pv=[{id:"m1",title:"Bab 2 — Tinjauan Pustaka",desc:"",deadline:"2026-05-20",progress:65,color:"#7C3AED"},{id:"m2",title:"Bab 3 — Metodologi",desc:"",deadline:"2026-05-22",progress:20,color:"#2563EB"},{id:"m3",title:"Bab 4 — Implementasi & Eksperimen",desc:"",deadline:"2026-05-25",progress:5,color:"#16A34A"},{id:"m4",title:"Bab 5 — Kesimpulan",desc:"",deadline:"2026-06-10",progress:0,color:"#D97706"},{id:"m5",title:"Sidang Tesis",desc:"Presentasi akhir tesis",deadline:"2026-07-01",progress:0,color:"#DC2626"},{id:"m6",title:"Revisi & Pengumpulan",desc:"",deadline:"2026-07-15",progress:0,color:"#7C3AED"}],mv=[{id:"j1",date:"2026-05-20",title:"Mulai eksplorasi dataset BERT",body:"Mengeksplorasi dataset untuk fine-tuning BERT. Mencoba beberapa preprocessing approach."},{id:"j2",date:"2026-05-21",title:"Debugging model — loss tidak konvergen",body:"Loss masih tidak konvergen setelah 10 epoch. Perlu cek learning rate scheduler dan batch size."},{id:"j3",date:"2026-05-22",title:"Review paper IGLPIS framework",body:"Membaca ulang full_framework.pdf dan memetakan setiap fase ke task implementasi."}],gv=[{id:"r1",title:"Segment Anything Model (SAM)",author:"Kirillov et al.",year:"2023",url:"https://arxiv.org/abs/2304.02643",tags:["segmentation","vision"],note:"Foundation model untuk segmentasi interaktif. Relevan untuk Phase 4.5"},{id:"r2",title:"Bayesian Spatial Inference for Cadastral Systems",author:"Smith et al.",year:"2021",url:"",tags:["bayesian","cadastral"],note:"Pendekatan Bayesian untuk inferensi posisi kadaster berbasis evidence."},{id:"r3",title:"Pattern Recognition and Machine Learning",author:"Bishop, C.",year:"2006",url:"",tags:["GMM","prior","bayesian"],note:"Reference klasik untuk GMM, digunakan di Phase 7."}],_v=[{id:"n1",date:"2026-05-21",color:"#7C3AED",title:"Ide: Hybrid attention mechanism",body:"Coba gabungkan spatial attention dengan semantic attention untuk likelihood computation",tags:["ide","algoritma"]},{id:"n2",date:"2026-05-22",color:"#D97706",title:"TODO: Cek GPU quota",body:"Pastikan quota GPU cukup untuk SAM inference batch sebelum mulai eksperimen skala penuh",tags:["todo"]},{id:"n3",date:"2026-05-22",color:"#2563EB",title:"Formula F1-score weighted",body:"F1 = 2 * (precision * recall) / (precision + recall) — gunakan weighted untuk kelas imbalance",tags:["formula"]}],O={iglpis:[],milestones:[],jurnal:[],refs:[],notes:[],user:null,ready:!1};let Ws=null;function yv(n){Ws=n}function vv(){Ws&&Ws()}const Gs=[],Qi=["iglpis","milestones","jurnal","refs","notes"],Ev={iglpis:fv,milestones:pv,jurnal:mv,refs:gv,notes:_v};async function Iv(){for(const e of Qi)await hv(e,Ev[e]);let n=0;for(const e of Qi){const t=uv(e,i=>{O[e]=i,n++,n>=Qi.length&&!O.ready&&(O.ready=!0,document.getElementById("loading-screen").style.display="none"),O.ready&&vv()});Gs.push(t)}}function Tv(){Gs.forEach(n=>n()),Gs.length=0,Qi.forEach(n=>{O[n]=[]}),O.user=null,O.ready=!1}async function jt(n,e){await lv(n,e)}async function Mr(n,e){await cv(n,e)}function wv(){const n=document.createElement("div");n.innerHTML=`

  <!-- ── Quick Note ──────────────────────────────────── -->
  <div class="modal-backdrop" id="modal-quicknote">
    <div class="modal" style="max-width:480px">
      <div class="modal-header">
        <span class="modal-title">Quick Note</span>
        <button class="icon-btn" id="close-quicknote"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="field-group">
          <label class="field-label">Judul (opsional)</label>
          <input type="text" id="qn-title" placeholder="Judul singkat...">
        </div>
        <div class="field-group">
          <label class="field-label">Catatan</label>
          <textarea id="qn-body" style="min-height:160px" placeholder="Tulis ide, algoritma, atau catatan cepat..."></textarea>
        </div>
        <div class="field-group">
          <label class="field-label">Tag</label>
          <div class="tag-input-wrap" id="qn-tags-wrap">
            <input class="tag-real-input" id="qn-tag-input" placeholder="+ tag (Enter)">
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">Warna</label>
          <div class="color-dots" id="qn-colors">
            <div class="color-dot selected" style="background:#7C3AED" data-color="#7C3AED"></div>
            <div class="color-dot" style="background:#2563EB" data-color="#2563EB"></div>
            <div class="color-dot" style="background:#16A34A" data-color="#16A34A"></div>
            <div class="color-dot" style="background:#D97706" data-color="#D97706"></div>
            <div class="color-dot" style="background:#DC2626" data-color="#DC2626"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="cancel-quicknote">Batal</button>
        <button class="btn btn-primary" id="save-quicknote">Simpan</button>
      </div>
    </div>
  </div>

  <!-- ── Jurnal ───────────────────────────────────────── -->
  <div class="modal-backdrop" id="modal-jurnal">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="jurnal-modal-title">Jurnal Baru</span>
        <button class="icon-btn" id="close-jurnal"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="field-group">
          <label class="field-label">Judul</label>
          <input type="text" id="j-title" placeholder="Judul entri jurnal...">
        </div>
        <div class="field-group">
          <label class="field-label">Tanggal</label>
          <input type="date" id="j-date">
        </div>
        <div class="field-group">
          <label class="field-label">Catatan Riset</label>
          <textarea id="j-body" style="min-height:180px" placeholder="Tulis catatan riset hari ini..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="j-delete-btn" style="margin-right:auto;display:none">Hapus</button>
        <button class="btn btn-ghost" id="cancel-jurnal">Batal</button>
        <button class="btn btn-primary" id="save-jurnal">Simpan</button>
      </div>
    </div>
  </div>

  <!-- ── Milestone ────────────────────────────────────── -->
  <div class="modal-backdrop" id="modal-milestone">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="ms-modal-title">Milestone Baru</span>
        <button class="icon-btn" id="close-milestone"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="field-group">
          <label class="field-label">Judul Milestone</label>
          <input type="text" id="ms-title" placeholder="Nama bab atau tahap...">
        </div>
        <div class="field-group">
          <label class="field-label">Deskripsi (opsional)</label>
          <textarea id="ms-desc" style="min-height:60px" placeholder="Deskripsi singkat..."></textarea>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label class="field-label">Deadline</label>
            <input type="date" id="ms-date">
          </div>
          <div class="field-group">
            <label class="field-label">Progres: <span id="ms-pct-label">0%</span></label>
            <div class="range-wrap">
              <input type="range" min="0" max="100" value="0" step="1" id="ms-progress">
              <span class="range-val" id="ms-pct-show">0%</span>
            </div>
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">Warna</label>
          <div class="color-dots" id="ms-colors">
            <div class="color-dot selected" style="background:#7C3AED" data-color="#7C3AED"></div>
            <div class="color-dot" style="background:#2563EB" data-color="#2563EB"></div>
            <div class="color-dot" style="background:#16A34A" data-color="#16A34A"></div>
            <div class="color-dot" style="background:#D97706" data-color="#D97706"></div>
            <div class="color-dot" style="background:#DC2626" data-color="#DC2626"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="ms-delete-btn" style="margin-right:auto;display:none">Hapus</button>
        <button class="btn btn-ghost" id="cancel-milestone">Batal</button>
        <button class="btn btn-primary" id="save-milestone">Simpan</button>
      </div>
    </div>
  </div>

  <!-- ── Referensi ────────────────────────────────────── -->
  <div class="modal-backdrop" id="modal-referensi">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="ref-modal-title">Referensi Baru</span>
        <button class="icon-btn" id="close-referensi"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="field-group">
          <label class="field-label">Judul</label>
          <input type="text" id="ref-title" placeholder="Judul paper / buku...">
        </div>
        <div class="field-row">
          <div class="field-group">
            <label class="field-label">Penulis</label>
            <input type="text" id="ref-author" placeholder="Nama penulis...">
          </div>
          <div class="field-group">
            <label class="field-label">Tahun</label>
            <input type="number" id="ref-year" placeholder="2024" min="1900" max="2030">
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">URL / DOI</label>
          <input type="text" id="ref-url" placeholder="https://...">
        </div>
        <div class="field-group">
          <label class="field-label">Tag</label>
          <div class="tag-input-wrap" id="ref-tags-wrap">
            <input class="tag-real-input" id="ref-tag-input" placeholder="+ tag (Enter)">
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">Catatan</label>
          <textarea id="ref-note" style="min-height:70px" placeholder="Catatan singkat..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="ref-delete-btn" style="margin-right:auto;display:none">Hapus</button>
        <button class="btn btn-ghost" id="cancel-referensi">Batal</button>
        <button class="btn btn-primary" id="save-referensi">Simpan</button>
      </div>
    </div>
  </div>

  <!-- ── IGLPIS Komponen ───────────────────────────────── -->
  <div class="modal-backdrop" id="modal-iglpis">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="ig-modal-title">Komponen Baru</span>
        <button class="icon-btn" id="close-iglpis"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="field-row">
          <div class="field-group">
            <label class="field-label">Fase</label>
            <input type="text" id="ig-phase" placeholder="Phase 4 — SU Page 2 Spatial Pipeline">
          </div>
          <div class="field-group">
            <label class="field-label">No. Fase</label>
            <input type="number" id="ig-phase-num" placeholder="4" min="1" max="20">
          </div>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label class="field-label">ID</label>
            <input type="text" id="ig-id" placeholder="4.5">
          </div>
          <div class="field-group">
            <label class="field-label">Judul</label>
            <input type="text" id="ig-title" placeholder="Nama komponen / algoritma...">
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">Deskripsi</label>
          <textarea id="ig-desc" style="min-height:60px" placeholder="Penjelasan singkat komponen ini..."></textarea>
        </div>
        <div class="field-group">
          <label class="field-label">Algoritma <span style="color:var(--text3);font-size:11px">(Enter untuk tambah)</span></label>
          <div class="algo-input-wrap" id="ig-algos-wrap">
            <input class="algo-real-input" id="ig-algo-input" placeholder="Nama algoritma...">
          </div>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label class="field-label">Status</label>
            <select id="ig-status">
              <option value="belum">Belum Mulai</option>
              <option value="riset">Riset</option>
              <option value="dikerjakan">Dikerjakan</option>
              <option value="testing">Testing</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
          <div class="field-group" style="display:flex;align-items:flex-end;padding-bottom:4px">
            <label class="llm-toggle">
              <input type="checkbox" id="ig-llm">
              <i class="ti ti-robot"></i> Pakai LLM
            </label>
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">Catatan Implementasi</label>
          <textarea id="ig-note" style="min-height:90px" placeholder="Hambatan, referensi kode, progress teknis..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="ig-delete-btn" style="margin-right:auto;display:none">Hapus</button>
        <button class="btn btn-ghost" id="cancel-iglpis">Batal</button>
        <button class="btn btn-primary" id="ig-save-btn">Tambah</button>
      </div>
    </div>
  </div>

  <!-- ── Comp Note ────────────────────────────────────── -->
  <div class="modal-backdrop" id="modal-comp-note">
    <div class="modal" style="max-width:440px">
      <div class="modal-header">
        <span class="modal-title" id="cn-modal-title">Catatan Implementasi</span>
        <button class="icon-btn" id="close-comp-note"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <textarea id="cn-body" style="min-height:140px" placeholder="Catatan implementasi, hambatan, referensi kode..."></textarea>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="cancel-comp-note">Batal</button>
        <button class="btn btn-primary" id="save-comp-note">Simpan</button>
      </div>
    </div>
  </div>
  `,document.body.appendChild(n)}const Qe={qn:[],ref:[]};let Pt=[];function Ur(n){const e=n==="qn"?"qn-tags-wrap":"ref-tags-wrap",t=n==="qn"?"qn-tag-input":"ref-tag-input",i=document.getElementById(e),r=document.getElementById(t);!i||!r||([...i.querySelectorAll(".tag-chip")].forEach(o=>o.remove()),Qe[n].forEach(o=>{const a=document.createElement("div");a.className="tag-chip",a.innerHTML=o+' <span class="remove-tag" data-tag="'+o+'" data-ctx="'+n+'">×</span>',i.insertBefore(a,r)}),i.querySelectorAll(".remove-tag").forEach(o=>{o.addEventListener("click",()=>{Qe[n]=Qe[n].filter(a=>a!==o.dataset.tag),Ur(n)})}))}function Wo(){const n=document.getElementById("ig-algos-wrap"),e=document.getElementById("ig-algo-input");!n||!e||([...n.querySelectorAll(".algo-chip")].forEach(t=>t.remove()),Pt.forEach(t=>{const i=document.createElement("div");i.className="algo-chip",i.innerHTML=t+' <button data-algo="'+t+'">×</button>',i.querySelector("button").addEventListener("click",()=>{Pt=Pt.filter(r=>r!==t),Wo()}),n.insertBefore(i,e)}))}function _n(n){var e;(e=document.getElementById(n))==null||e.classList.add("open")}function te(n){var e;(e=document.getElementById(n))==null||e.classList.remove("open")}function bv(){document.querySelectorAll(".modal-backdrop").forEach(n=>{n.addEventListener("click",e=>{e.target===n&&n.classList.remove("open")})})}function sc(n,e){if(n.key==="Enter"||n.key===","){n.preventDefault();const t=n.target.value.trim().replace(",","");t&&!Qe[e].includes(t)&&(Qe[e].push(t),Ur(e)),n.target.value=""}}function Av(n){if(n.key==="Enter"){n.preventDefault();const e=n.target.value.trim();e&&!Pt.includes(e)&&(Pt.push(e),Wo()),n.target.value=""}}function Rv(n){n.closest(".color-dots").querySelectorAll(".color-dot").forEach(e=>e.classList.remove("selected")),n.classList.add("selected")}function Lh(n){var e;return((e=document.querySelector("#"+n+" .color-dot.selected"))==null?void 0:e.dataset.color)||"#7C3AED"}function xh(){Qe.qn=[],document.getElementById("qn-title").value="",document.getElementById("qn-body").value="",Ur("qn"),document.querySelectorAll("#qn-colors .color-dot").forEach((n,e)=>n.classList.toggle("selected",e===0)),_n("modal-quicknote")}async function Sv(){const n=document.getElementById("qn-body").value.trim();if(!n)return;const e={id:mi(),title:document.getElementById("qn-title").value.trim(),body:n,tags:[...Qe.qn],color:Lh("qn-colors"),date:Ho()};O.notes.unshift(e),te("modal-quicknote"),await jt("notes",e)}let Ct=null;function oc(n){Ct=n||null;const e=n?O.jurnal.find(t=>t.id===n):null;document.getElementById("jurnal-modal-title").textContent=e?"Edit Jurnal":"Jurnal Baru",document.getElementById("j-title").value=(e==null?void 0:e.title)||"",document.getElementById("j-date").value=(e==null?void 0:e.date)||Ho(),document.getElementById("j-body").value=(e==null?void 0:e.body)||"",document.getElementById("j-delete-btn").style.display=e?"block":"none",_n("modal-jurnal")}async function Pv(){const n=document.getElementById("j-title").value.trim();if(!n)return;const e={id:Ct||mi(),title:n,body:document.getElementById("j-body").value.trim(),date:document.getElementById("j-date").value};if(Ct){const t=O.jurnal.findIndex(i=>i.id===Ct);t>-1&&(O.jurnal[t]=e)}else O.jurnal.unshift(e);te("modal-jurnal"),await jt("jurnal",e)}async function Cv(){Ct&&(O.jurnal=O.jurnal.filter(n=>n.id!==Ct),te("modal-jurnal"),await Mr("jurnal",Ct))}let kt=null;function ac(n){kt=n||null;const e=n?O.milestones.find(t=>t.id===n):null;document.getElementById("ms-modal-title").textContent=e?"Edit Milestone":"Milestone Baru",document.getElementById("ms-title").value=(e==null?void 0:e.title)||"",document.getElementById("ms-desc").value=(e==null?void 0:e.desc)||"",document.getElementById("ms-date").value=(e==null?void 0:e.deadline)||Ho(),document.getElementById("ms-progress").value=(e==null?void 0:e.progress)??0,document.getElementById("ms-pct-label").textContent=((e==null?void 0:e.progress)??0)+"%",document.getElementById("ms-pct-show").textContent=((e==null?void 0:e.progress)??0)+"%",document.getElementById("ms-delete-btn").style.display=e?"block":"none",document.querySelectorAll("#ms-colors .color-dot").forEach(t=>{t.classList.toggle("selected",t.dataset.color===((e==null?void 0:e.color)||"#7C3AED"))}),document.getElementById("ms-progress").oninput=function(){document.getElementById("ms-pct-label").textContent=this.value+"%",document.getElementById("ms-pct-show").textContent=this.value+"%"},_n("modal-milestone")}async function kv(){const n=document.getElementById("ms-title").value.trim();if(!n)return;const e={id:kt||mi(),title:n,desc:document.getElementById("ms-desc").value.trim(),deadline:document.getElementById("ms-date").value,progress:parseInt(document.getElementById("ms-progress").value),color:Lh("ms-colors")};if(kt){const t=O.milestones.findIndex(i=>i.id===kt);t>-1&&(O.milestones[t]=e)}else O.milestones.push(e);te("modal-milestone"),await jt("milestones",e)}async function Dv(){kt&&(O.milestones=O.milestones.filter(n=>n.id!==kt),te("modal-milestone"),await Mr("milestones",kt))}let Dt=null;function lc(n){Dt=n||null;const e=n?O.refs.find(t=>t.id===n):null;document.getElementById("ref-modal-title").textContent=e?"Edit Referensi":"Referensi Baru",document.getElementById("ref-title").value=(e==null?void 0:e.title)||"",document.getElementById("ref-author").value=(e==null?void 0:e.author)||"",document.getElementById("ref-year").value=(e==null?void 0:e.year)||"",document.getElementById("ref-url").value=(e==null?void 0:e.url)||"",document.getElementById("ref-note").value=(e==null?void 0:e.note)||"",document.getElementById("ref-delete-btn").style.display=e?"block":"none",Qe.ref=e?[...e.tags]:[],Ur("ref"),_n("modal-referensi")}async function Nv(){const n=document.getElementById("ref-title").value.trim();if(!n)return;const e={id:Dt||mi(),title:n,author:document.getElementById("ref-author").value.trim(),year:document.getElementById("ref-year").value,url:document.getElementById("ref-url").value.trim(),note:document.getElementById("ref-note").value.trim(),tags:[...Qe.ref]};if(Dt){const t=O.refs.findIndex(i=>i.id===Dt);t>-1&&(O.refs[t]=e)}else O.refs.push(e);te("modal-referensi"),await jt("refs",e)}async function Vv(){Dt&&(O.refs=O.refs.filter(n=>n.id!==Dt),te("modal-referensi"),await Mr("refs",Dt))}let tn=null;function cc(n){tn=n||null;const e=n?O.iglpis.find(t=>t.id===n):null;document.getElementById("ig-modal-title").textContent=e?"Edit Komponen":"Komponen Baru",document.getElementById("ig-save-btn").textContent=e?"Simpan":"Tambah",document.getElementById("ig-phase").value=(e==null?void 0:e.phase)||"",document.getElementById("ig-phase-num").value=(e==null?void 0:e.phaseNum)||"",document.getElementById("ig-id").value=(e==null?void 0:e.id)||"",document.getElementById("ig-title").value=(e==null?void 0:e.title)||"",document.getElementById("ig-desc").value=(e==null?void 0:e.desc)||"",document.getElementById("ig-status").value=(e==null?void 0:e.status)||"belum",document.getElementById("ig-llm").checked=(e==null?void 0:e.llm)||!1,document.getElementById("ig-note").value=(e==null?void 0:e.note)||"",document.getElementById("ig-delete-btn").style.display=e?"block":"none",Pt=e?[...e.algos]:[],Wo(),_n("modal-iglpis")}async function Ov(){const n=document.getElementById("ig-title").value.trim(),e=document.getElementById("ig-phase").value.trim();if(!n||!e)return;const i={id:document.getElementById("ig-id").value.trim()||mi(),phase:e,phaseNum:parseInt(document.getElementById("ig-phase-num").value)||99,title:n,desc:document.getElementById("ig-desc").value.trim(),algos:[...Pt],status:document.getElementById("ig-status").value,llm:document.getElementById("ig-llm").checked,note:document.getElementById("ig-note").value.trim()};if(tn){const r=O.iglpis.findIndex(o=>o.id===tn);r>-1&&(O.iglpis[r]=i)}else O.iglpis.push(i);te("modal-iglpis"),await jt("iglpis",i)}async function Lv(){tn&&(O.iglpis=O.iglpis.filter(n=>n.id!==tn),te("modal-iglpis"),await Mr("iglpis",tn))}let Mh=null;function xv(n){Mh=n;const e=O.iglpis.find(t=>t.id===n);document.getElementById("cn-modal-title").textContent=(e==null?void 0:e.title)||"Catatan",document.getElementById("cn-body").value=(e==null?void 0:e.note)||"",_n("modal-comp-note")}async function Mv(){const n=O.iglpis.find(e=>e.id===Mh);n&&(n.note=document.getElementById("cn-body").value.trim(),te("modal-comp-note"),await jt("iglpis",n))}async function Uv(n,e){const t=O.iglpis.find(i=>i.id===n);t&&(t.status=e,await jt("iglpis",t))}function Uh(){return new Date().toISOString().split("T")[0]}function Fh(n){return n?new Date(n+"T00:00:00").toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}):""}function Fv(n){const e=new Date(n+"T00:00:00"),t=new Date;return t.setHours(0,0,0,0),Math.ceil((e-t)/864e5)}function Bh(n){const e=Fv(n);return e<0?{cls:"deadline-late",text:`${Math.abs(e)}h telat`}:e===0?{cls:"deadline-late",text:"Hari ini!"}:e<=3?{cls:"deadline-soon",text:`${e}h lagi`}:{cls:"deadline-ok",text:`${e}h lagi`}}function Bv(n){const e=n.toLowerCase();return e.includes("debug")||e.includes("error")||e.includes("bug")?"🐛":e.includes("review")||e.includes("baca")||e.includes("paper")?"📖":e.includes("ide")||e.includes("idea")?"💡":"⚡"}function jv(n){return n.length?Math.round(n.reduce((e,t)=>e+t.progress,0)/n.length):0}function $v(n){const e={};return n.forEach(t=>{e[t.phase]||(e[t.phase]={name:t.phase,num:t.phaseNum,items:[]}),e[t.phase].items.push(t)}),Object.values(e).sort((t,i)=>t.num-i.num)}function yn(n){document.getElementById("topbar-action").innerHTML=n}function uc(n){var c,h,d;yn("");const e=jv(O.milestones),t=O.milestones.filter(p=>p.progress===100).length,i=O.iglpis.filter(p=>p.status==="selesai").length,r=[...O.milestones].sort((p,y)=>new Date(p.deadline)-new Date(y.deadline)).slice(0,3),o=[...O.jurnal].sort((p,y)=>new Date(y.date)-new Date(p.date)).slice(0,2),a=O.notes.slice(0,3);n.innerHTML=`
    <div class="progress-wrap">
      <div class="progress-label">Progres Tesis</div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between">
        <div class="progress-pct">${e}%</div>
        <div class="progress-meta">${t}/${O.milestones.length} milestone selesai</div>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width:${e}%"></div>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon" style="color:var(--purple2)">◎</div>
        <div class="stat-value">${O.milestones.length}</div>
        <div class="stat-label">Milestone</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="color:var(--blue2)">📖</div>
        <div class="stat-value">${O.jurnal.length}</div>
        <div class="stat-label">Jurnal</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="color:var(--amber2)">📝</div>
        <div class="stat-value">${O.notes.length}</div>
        <div class="stat-label">Quick Notes</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="color:var(--green2)">✓</div>
        <div class="stat-value">${i}</div>
        <div class="stat-label">IGLPIS Selesai</div>
      </div>
    </div>

    <div class="two-col">
      <div class="card">
        <div class="section-title">
          Deadline Terdekat
          <span class="see-all" id="goto-milestone">Lihat semua →</span>
        </div>
        ${r.length?r.map(p=>{const y=Bh(p.deadline);return`<div class="milestone-item">
            <div class="milestone-header">
              <span class="milestone-name">${p.title}</span>
              <span class="milestone-deadline ${y.cls}">${y.text}</span>
            </div>
            <div class="milestone-track">
              <div class="milestone-fill" style="width:${p.progress}%;background:${p.color}"></div>
            </div>
          </div>`}).join(""):'<div style="color:var(--text3);font-size:13px;padding:14px 0">Belum ada milestone</div>'}
      </div>

      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="card" style="flex:1">
          <div class="section-title">
            Jurnal Terbaru
            <span class="see-all" id="goto-jurnal">Lihat →</span>
          </div>
          ${o.map(p=>`
            <div class="journal-item">
              <div class="journal-meta">
                <span>${Bv(p.title)}</span>
                <span class="journal-date">${p.date}</span>
              </div>
              <div class="journal-title">${p.title}</div>
              <div class="journal-preview">${p.body}</div>
            </div>
          `).join("")||'<div style="color:var(--text3);font-size:13px;padding:8px 0">Belum ada jurnal</div>'}
        </div>

        <div class="card" style="flex:1">
          <div class="section-title">
            Quick Notes
            <span class="see-all" id="goto-notes">Lihat →</span>
          </div>
          ${a.map(p=>`
            <span class="note-tag" style="background:${p.color}22;color:${p.color};border:1px solid ${p.color}44">
              ${p.title.slice(0,28)}${p.title.length>28?"…":""}
            </span>
          `).join("")||'<div style="color:var(--text3);font-size:13px">Belum ada quick note</div>'}
        </div>
      </div>
    </div>
  `,(c=n.querySelector("#goto-milestone"))==null||c.addEventListener("click",()=>Ji("milestone")),(h=n.querySelector("#goto-jurnal"))==null||h.addEventListener("click",()=>Ji("jurnal")),(d=n.querySelector("#goto-notes"))==null||d.addEventListener("click",()=>Ji("notes"))}function qv(n){var t;yn('<button id="btn-new-jurnal"><i class="ti ti-plus"></i> Tulis Hari Ini</button>'),(t=document.getElementById("btn-new-jurnal"))==null||t.addEventListener("click",()=>oc());const e=[...O.jurnal].sort((i,r)=>new Date(r.date)-new Date(i.date));n.innerHTML=e.length?`
    <div style="max-width:720px;margin:0 auto">
      ${e.map(i=>`
        <div style="display:flex;gap:16px;margin-bottom:20px">
          <div style="display:flex;flex-direction:column;align-items:center;padding-top:4px">
            <div style="width:10px;height:10px;border-radius:50%;background:var(--purple);flex-shrink:0"></div>
            <div style="width:1px;flex:1;background:var(--border);margin-top:6px"></div>
          </div>
          <div class="card" style="flex:1;cursor:pointer" data-jid="${i.id}">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <div style="font-size:16px;font-weight:700;color:var(--text)">${i.title}</div>
              <div style="font-size:11px;color:var(--text3);font-family:'JetBrains Mono',monospace">${i.date}</div>
            </div>
            <div style="font-size:13px;color:var(--text2);line-height:1.7;white-space:pre-wrap">${i.body}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `:'<div class="empty-state"><i class="ti ti-book"></i><p>Belum ada jurnal. Mulai tulis hari ini!</p></div>',n.querySelectorAll("[data-jid]").forEach(i=>{i.addEventListener("click",()=>oc(i.dataset.jid))})}function zv(n){var t;yn('<button id="btn-new-ms"><i class="ti ti-plus"></i> Tambah Milestone</button>'),(t=document.getElementById("btn-new-ms"))==null||t.addEventListener("click",()=>ac());const e=[...O.milestones].sort((i,r)=>new Date(i.deadline)-new Date(r.deadline));n.innerHTML=e.length?e.map(i=>{const r=Bh(i.deadline);return`
      <div class="card" style="margin-bottom:12px;cursor:pointer" data-mid="${i.id}">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px">
          <div style="flex:1">
            <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:4px">${i.title}</div>
            ${i.desc?`<div style="font-size:12px;color:var(--text2);margin-bottom:8px">${i.desc}</div>`:""}
            <div style="display:flex;align-items:center;gap:10px;margin-top:10px">
              <div class="milestone-track" style="flex:1">
                <div class="milestone-fill" style="width:${i.progress}%;background:${i.color}"></div>
              </div>
              <span style="font-size:12px;font-family:'JetBrains Mono',monospace;color:${i.color};min-width:32px">${i.progress}%</span>
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:11px;font-family:'JetBrains Mono',monospace;color:var(--text3);margin-bottom:4px">${i.deadline}</div>
            <div class="milestone-deadline ${r.cls}">${r.text}</div>
          </div>
        </div>
      </div>
    `}).join(""):'<div class="empty-state"><i class="ti ti-target"></i><p>Belum ada milestone</p></div>',n.querySelectorAll("[data-mid]").forEach(i=>{i.addEventListener("click",()=>ac(i.dataset.mid))})}let Is="",Mn="";function Ks(n){var i,r;yn('<button id="btn-new-ref"><i class="ti ti-plus"></i> Tambah Referensi</button>'),(i=document.getElementById("btn-new-ref"))==null||i.addEventListener("click",()=>lc());const e=[...new Set(O.refs.flatMap(o=>o.tags))],t=O.refs.filter(o=>{const a=Is.toLowerCase(),c=!a||o.title.toLowerCase().includes(a)||(o.author||"").toLowerCase().includes(a)||o.tags.join(" ").toLowerCase().includes(a),h=!Mn||o.tags.includes(Mn);return c&&h});n.innerHTML=`
    <div class="search-wrap">
      <i class="ti ti-search search-icon"></i>
      <input class="search-box" id="ref-search" placeholder="Cari referensi..." value="${Is}">
    </div>
    <div class="filter-tabs">
      <button class="filter-tab ${Mn?"":"active"}" data-tag="">Semua (${O.refs.length})</button>
      ${e.map(o=>`<button class="filter-tab ${Mn===o?"active":""}" data-tag="${o}">${o}</button>`).join("")}
    </div>
    ${t.length?t.map(o=>`
      <div class="ref-item" data-rid="${o.id}">
        <div class="ref-title">${o.title}</div>
        <div class="ref-meta">${o.author||""}${o.author&&o.year?" · ":""}${o.year||""}</div>
        ${o.url?`<div style="font-size:11px;color:var(--blue2);margin-top:3px;font-family:'JetBrains Mono',monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${o.url}</div>`:""}
        ${o.note?`<div class="ref-note">${o.note}</div>`:""}
        <div style="margin-top:8px">${o.tags.map(a=>`<span class="note-tag" style="background:rgba(124,58,237,0.15);color:var(--purple2);border:1px solid rgba(124,58,237,0.3)">${a}</span>`).join("")}</div>
      </div>
    `).join(""):'<div class="empty-state"><i class="ti ti-books"></i><p>Tidak ada referensi ditemukan</p></div>'}
  `,(r=n.querySelector("#ref-search"))==null||r.addEventListener("input",o=>{Is=o.target.value,Ks(n)}),n.querySelectorAll("[data-tag]").forEach(o=>{o.addEventListener("click",()=>{Mn=o.dataset.tag,Ks(n)})}),n.querySelectorAll("[data-rid]").forEach(o=>{o.addEventListener("click",()=>lc(o.dataset.rid))})}let Bi="";function Qs(n){var t,i;yn('<button id="btn-new-note"><i class="ti ti-plus"></i> Quick Note</button>'),(t=document.getElementById("btn-new-note"))==null||t.addEventListener("click",xh);const e=O.notes.filter(r=>{if(!Bi)return!0;const o=Bi.toLowerCase();return r.title.toLowerCase().includes(o)||r.body.toLowerCase().includes(o)||r.tags.join(" ").toLowerCase().includes(o)});n.innerHTML=`
    <div class="search-wrap">
      <i class="ti ti-search search-icon"></i>
      <input class="search-box" id="note-search" placeholder="Cari note..." value="${Bi}">
    </div>
    ${e.length?e.map(r=>`
      <div class="note-card" style="border-left-color:${r.color}">
        <div style="display:flex;align-items:start;justify-content:space-between">
          <div class="note-title">${r.title||"Tanpa judul"}</div>
          <button class="delete-btn" data-nid="${r.id}"><i class="ti ti-trash"></i></button>
        </div>
        <div class="note-body">${r.body}</div>
        <div class="note-footer">
          <div>${r.tags.map(o=>`<span class="note-tag" style="background:${r.color}22;color:${r.color};border:1px solid ${r.color}44">${o}</span>`).join("")}</div>
          <div class="note-time">${r.date}</div>
        </div>
      </div>
    `).join(""):'<div class="empty-state"><i class="ti ti-note"></i><p>Belum ada quick note</p></div>'}
  `,(i=n.querySelector("#note-search"))==null||i.addEventListener("input",r=>{Bi=r.target.value,Qs(n)}),n.querySelectorAll(".delete-btn[data-nid]").forEach(r=>{r.addEventListener("click",async()=>{O.notes=O.notes.filter(o=>o.id!==r.dataset.nid),await persist("notes"),Qs(n)})})}let Wt="all";function jh(n){var h;yn('<button id="btn-new-ig"><i class="ti ti-plus"></i> Tambah Komponen</button>'),(h=document.getElementById("btn-new-ig"))==null||h.addEventListener("click",()=>cc());const e=O.iglpis.length,t=O.iglpis.filter(d=>d.status==="selesai").length,i=O.iglpis.filter(d=>d.status==="riset").length,r=O.iglpis.filter(d=>d.status==="dikerjakan"||d.status==="testing").length,o=e?Math.round(t/e*100):0,a=[{key:"all",label:`Semua (${e})`},{key:"belum",label:`Belum Mulai (${e-t-i-r})`},{key:"riset",label:`Riset (${i})`},{key:"dikerjakan",label:`Dikerjakan / Testing (${r})`},{key:"selesai",label:`Selesai (${t})`}],c=$v(O.iglpis);n.innerHTML=`
    <div class="overall-progress">
      <div class="progress-label">Progres Implementasi</div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between">
        <div class="progress-pct">${o}%</div>
        <div class="progress-meta">${t}/${e} komponen selesai</div>
      </div>
      <div class="progress-bar-track" style="margin-top:12px">
        <div class="progress-bar-fill" style="width:${o}%"></div>
      </div>
    </div>

    <div class="iglpis-stats">
      <div class="stat-card"><div class="stat-value" style="color:var(--text3)">${e-t-i-r}</div><div class="stat-label">Belum Mulai</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--amber2)">${i}</div><div class="stat-label">Riset</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--blue2)">${r}</div><div class="stat-label">Dikerjakan / Testing</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--green2)">${t}</div><div class="stat-label">Selesai</div></div>
    </div>

    <div class="filter-tabs">
      ${a.map(d=>`<button class="filter-tab ${Wt===d.key?"active":""}" data-filter="${d.key}">${d.label}</button>`).join("")}
    </div>

    ${c.map(d=>{const p=Wt==="all"?d.items:d.items.filter(R=>Wt==="dikerjakan"?R.status==="dikerjakan"||R.status==="testing":R.status===Wt);if(!p.length&&Wt!=="all")return"";const y=d.items.filter(R=>R.status==="selesai").length,b=d.items.length?Math.round(y/d.items.length*100):0;return`
        <div class="phase-block" id="ph-${d.num}">
          <div class="phase-header">
            <div style="display:flex;align-items:center;gap:8px">
              <i class="ti ti-chevron-down chevron" style="font-size:14px;color:var(--text3)"></i>
              <span class="phase-title">${d.name}</span>
            </div>
            <div class="phase-meta">
              <span class="phase-progress">${y}/${d.items.length} selesai</span>
              <span class="phase-pct">${b}%</span>
            </div>
          </div>
          <div class="phase-progress-bar">
            <div class="phase-progress-fill" style="width:${b}%"></div>
          </div>
          <div class="component-list">
            ${p.map(R=>`
                <div class="component-item">
                  <div class="component-dot ${{belum:"dot-belum",riset:"dot-riset",dikerjakan:"dot-dikerjakan",testing:"dot-testing",selesai:"dot-selesai"}[R.status]||"dot-belum"}"></div>
                  <div class="component-info">
                    <div class="component-id">${R.id}</div>
                    <div class="component-name">${R.title}</div>
                    <div class="component-desc">${R.desc}</div>
                    <div class="component-algos">
                      ${R.algos.map(V=>`<span class="algo-tag">${V}</span>`).join("")}
                      ${R.llm?'<span class="llm-badge">LLM</span>':""}
                    </div>
                    ${R.note?`<div class="comp-note-view">${R.note}</div>`:""}
                  </div>
                  <div class="component-actions">
                    <select class="status-select" data-cid="${R.id}">
                      <option value="belum"      ${R.status==="belum"?"selected":""}>Belum Mulai</option>
                      <option value="riset"      ${R.status==="riset"?"selected":""}>Riset</option>
                      <option value="dikerjakan" ${R.status==="dikerjakan"?"selected":""}>Dikerjakan</option>
                      <option value="testing"    ${R.status==="testing"?"selected":""}>Testing</option>
                      <option value="selesai"    ${R.status==="selesai"?"selected":""}>Selesai</option>
                    </select>
                    <button class="icon-btn" data-note-cid="${R.id}" title="Catatan"><i class="ti ti-note"></i></button>
                    <button class="icon-btn" data-edit-cid="${R.id}" title="Edit"><i class="ti ti-pencil"></i></button>
                  </div>
                </div>
              `).join("")}
          </div>
        </div>
      `}).join("")}
  `,n.querySelectorAll("[data-filter]").forEach(d=>{d.addEventListener("click",()=>{Wt=d.dataset.filter,jh(n)})}),n.querySelectorAll(".phase-header").forEach(d=>{d.addEventListener("click",()=>d.closest(".phase-block").classList.toggle("phase-collapsed"))}),n.querySelectorAll(".status-select[data-cid]").forEach(d=>{d.addEventListener("change",async()=>{await Uv(d.dataset.cid,d.value)})}),n.querySelectorAll("[data-note-cid]").forEach(d=>{d.addEventListener("click",()=>xv(d.dataset.noteCid))}),n.querySelectorAll("[data-edit-cid]").forEach(d=>{d.addEventListener("click",()=>cc(d.dataset.editCid))})}function Hv(n){const e=n.photoURL?`<img src="${n.photoURL}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;">`:`<div style="width:28px;height:28px;border-radius:50%;background:var(--purple);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:white">${(n.displayName||"U")[0].toUpperCase()}</div>`;document.getElementById("app").innerHTML=`
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-title">ThesisTrack</div>
        <div class="logo-sub">IGLPIS · Progres Tesisku</div>
      </div>
      <ul class="nav-list" id="nav">
        <li class="nav-item active" data-page="dashboard"><i class="ti ti-layout-dashboard"></i> Dashboard</li>
        <li class="nav-item" data-page="jurnal"><i class="ti ti-book"></i> Jurnal</li>
        <li class="nav-item" data-page="milestone"><i class="ti ti-target"></i> Milestone</li>
        <li class="nav-item" data-page="referensi"><i class="ti ti-books"></i> Referensi</li>
        <li class="nav-item" data-page="notes"><i class="ti ti-note"></i> Quick Notes</li>
        <li class="nav-item" data-page="iglpis"><i class="ti ti-circuit-board"></i> IGLPIS</li>
      </ul>
      <div class="sidebar-bottom">
        <button class="quick-note-btn" id="sidebar-quick-note">
          <i class="ti ti-plus"></i> Quick Note
        </button>
        <div style="
          display:flex;align-items:center;gap:8px;
          margin-top:10px;padding:8px 4px;
          border-top:1px solid var(--border);
        ">
          ${e}
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n.displayName||"User"}</div>
            <div style="font-size:10px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n.email||""}</div>
          </div>
          <button id="btn-logout" title="Logout" style="
            background:none;border:1px solid var(--border);
            color:var(--text3);border-radius:6px;
            padding:4px 6px;cursor:pointer;font-size:13px;
            transition:all 0.15s;
          "><i class="ti ti-logout"></i></button>
        </div>
      </div>
    </aside>

    <div class="main">
      <div class="topbar">
        <div>
          <div class="topbar-title" id="topbar-title">Dashboard</div>
          <div class="topbar-sub" id="topbar-sub">${Fh(Uh())}</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="font-size:10px;color:var(--green2);font-family:'JetBrains Mono',monospace;
               background:rgba(22,163,74,0.1);border:1px solid rgba(22,163,74,0.2);
               padding:3px 8px;border-radius:99px;display:flex;align-items:center;gap:5px">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--green2);display:inline-block"></span>
            Realtime Sync
          </div>
          <div class="topbar-action" id="topbar-action"></div>
        </div>
      </div>
      <div class="content" id="content">
        <div class="empty-state" style="padding-top:80px">
          <div style="
            width:36px;height:36px;border-radius:50%;
            border:3px solid var(--border);
            border-top-color:var(--purple);
            animation:spin 0.8s linear infinite;
            margin:0 auto 16px;
          "></div>
          <p>Memuat data...</p>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
        </div>
      </div>
    </div>
  `}let $h="dashboard";const Wv={dashboard:{title:"Dashboard",sub:Fh(Uh())},jurnal:{title:"Jurnal Riset",sub:"Catatan harian riset"},milestone:{title:"Milestone & Deadline",sub:"Tracking bab & tahap tesis"},referensi:{title:"Referensi",sub:"Daftar referensi & bahan bacaan"},notes:{title:"Quick Notes",sub:"Ide dan catatan cepat"},iglpis:{title:"IGLPIS Framework",sub:"Integrated Geo-Legal Probabilistic Inference System"}};function Ji(n){$h=n,document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.page===n)});const e=Wv[n]||{};document.getElementById("topbar-title").textContent=e.title||n,document.getElementById("topbar-sub").textContent=e.sub||"",qh()}function qh(){if(!O.ready)return;const n=document.getElementById("content");if(!n)return;({dashboard:uc,jurnal:qv,milestone:zv,referensi:Ks,notes:Qs,iglpis:jh}[$h]||uc)(n)}function Gv(){var e,t,i,r,o;const n=(a,c)=>{var h;return(h=document.getElementById(a))==null?void 0:h.addEventListener("click",c)};n("sidebar-quick-note",xh),n("close-quicknote",()=>te("modal-quicknote")),n("cancel-quicknote",()=>te("modal-quicknote")),n("save-quicknote",Sv),n("close-jurnal",()=>te("modal-jurnal")),n("cancel-jurnal",()=>te("modal-jurnal")),n("save-jurnal",Pv),n("j-delete-btn",Cv),n("close-milestone",()=>te("modal-milestone")),n("cancel-milestone",()=>te("modal-milestone")),n("save-milestone",kv),n("ms-delete-btn",Dv),n("close-referensi",()=>te("modal-referensi")),n("cancel-referensi",()=>te("modal-referensi")),n("save-referensi",Nv),n("ref-delete-btn",Vv),n("close-iglpis",()=>te("modal-iglpis")),n("cancel-iglpis",()=>te("modal-iglpis")),n("ig-save-btn",Ov),n("ig-delete-btn",Lv),n("close-comp-note",()=>te("modal-comp-note")),n("cancel-comp-note",()=>te("modal-comp-note")),n("save-comp-note",Mv),(e=document.getElementById("qn-tag-input"))==null||e.addEventListener("keydown",a=>sc(a,"qn")),(t=document.getElementById("ref-tag-input"))==null||t.addEventListener("keydown",a=>sc(a,"ref")),(i=document.getElementById("ig-algo-input"))==null||i.addEventListener("keydown",Av),(r=document.getElementById("qn-tags-wrap"))==null||r.addEventListener("click",()=>{var a;return(a=document.getElementById("qn-tag-input"))==null?void 0:a.focus()}),(o=document.getElementById("ref-tags-wrap"))==null||o.addEventListener("click",()=>{var a;return(a=document.getElementById("ref-tag-input"))==null?void 0:a.focus()}),document.querySelectorAll(".color-dot").forEach(a=>{a.addEventListener("click",function(){Rv(this)})}),n("btn-logout",async()=>{Tv(),document.getElementById("app").innerHTML="",await ov()})}function Kv(){document.getElementById("loading-screen").style.display="none";const n=document.getElementById("login-screen");n.style.display="flex",document.getElementById("btn-google-login").addEventListener("click",async()=>{document.getElementById("btn-google-login").textContent="Menghubungkan...",document.getElementById("btn-google-login").disabled=!0;try{await sv()}catch{document.getElementById("btn-google-login").innerHTML=`
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.3-.15-2.6-.4-3.9z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.2 8 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.4-5.1l-6.2-5.2C29.3 35.2 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.7 35.7 16.3 40 24 40v4z"/>
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.1-2.1 3.9-3.8 5.2l6.2 5.2C37.3 40.1 44 35 44 24c0-1.3-.15-2.6-.4-3.9z"/>
        </svg>
        Masuk dengan Google
      `,document.getElementById("btn-google-login").disabled=!1}})}async function Qv(n){document.getElementById("login-screen").style.display="none",document.getElementById("loading-screen").style.display="flex",document.getElementById("loading-status").textContent="Menyinkronkan data...",O.user=n,await dv(n),Hv(n),wv(),bv(),Gv(),yv(qh),document.getElementById("nav").addEventListener("click",e=>{const t=e.target.closest("[data-page]");t&&Ji(t.dataset.page)}),await Iv()}av(async n=>{n?await Qv(n):Kv()});
