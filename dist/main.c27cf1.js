!function(t){var n={};function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)r.d(e,o,function(n){return t[n]}.bind(null,o));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=14)}([function(t,n,r){var e=r(1);t.exports=!e((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n){t.exports={}},function(t,n,r){(function(n){var r=function(t){return t&&t.Math==Math&&t};t.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n&&n)||Function("return this")()}).call(this,r(19))},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,r){"use strict";var e=r(3),o=r(20).f,u=r(27),i=r(2),c=r(28),f=r(30),a=r(8),s=function(t){var n=function(n,r,e){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,r)}return new t(n,r,e)}return t.apply(this,arguments)};return n.prototype=t.prototype,n};t.exports=function(t,n){var r,p,l,y,v,d,h,b,g=t.target,x=t.global,w=t.stat,m=t.proto,j=x?e:w?e[g]:(e[g]||{}).prototype,O=x?i:i[g]||(i[g]={}),S=O.prototype;for(l in n)r=!u(x?l:g+(w?".":"#")+l,t.forced)&&j&&a(j,l),v=O[l],r&&(d=t.noTargetGet?(b=o(j,l))&&b.value:j[l]),y=r&&d?d:n[l],r&&typeof v==typeof y||(h=t.bind&&r?c(y,e):t.wrap&&r?s(y):m&&"function"==typeof y?c(Function.call,y):y,(t.sham||y&&y.sham||v&&v.sham)&&f(h,"sham",!0),O[l]=h,m&&(a(i,p=g+"Prototype")||f(i,p,{}),i[p][l]=y,t.real&&S&&!S[l]&&f(S,l,y)))}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(4);t.exports=function(t,n){if(!e(t))return t;var r,o;if(n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!e(o=r.call(t)))return o;if(!n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n){var r={}.hasOwnProperty;t.exports=function(t,n){return r.call(t,n)}},function(t,n,r){var e=r(0),o=r(1),u=r(26);t.exports=!e&&!o((function(){return 7!=Object.defineProperty(u("div"),"a",{get:function(){return 7}}).a}))},function(t,n,r){var e=r(0),o=r(9),u=r(31),i=r(7),c=Object.defineProperty;n.f=e?c:function(t,n,r){if(u(t),n=i(n,!0),u(r),o)try{return c(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[n]=r.value),t}},function(t,n,r){t.exports=r(16)},function(t,n){t.exports=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}},function(t,n,r){var e=r(33);function o(t,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),e(t,o.key,o)}}t.exports=function(t,n,r){return n&&o(t.prototype,n),r&&o(t,r),t}},function(t,n,r){t.exports=r(15)},function(t,n,r){"use strict";r.r(n);var e=r(11),o=r.n(e),u=r(12),i=r.n(u),c=r(13),f=r.n(c),a=(r(37),function(){function t(n){i()(this,t),this.name=n}return f()(t,[{key:"getName",value:function(){return this.name}}]),t}());"dev"===DEV&&console.log("dev");new a("dog");fetch("/user").then((function(t){return t.json()})).then((function(t){return console.log(t)})).catch((function(t){return console.log(t)})),fetch("/login/account",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:o()({username:"admin",password:"888888"})}).then((function(t){return t.json()})).then((function(t){return console.log(t)})).catch((function(t){return console.log(t)}))},function(t,n,r){var e=r(17);t.exports=e},function(t,n,r){r(18);var e=r(2);e.JSON||(e.JSON={stringify:JSON.stringify}),t.exports=function(t,n,r){return e.JSON.stringify.apply(null,arguments)}},function(t,n,r){var e=r(5),o=r(32),u=r(1),i=o("JSON","stringify"),c=/[\uD800-\uDFFF]/g,f=/^[\uD800-\uDBFF]$/,a=/^[\uDC00-\uDFFF]$/,s=function(t,n,r){var e=r.charAt(n-1),o=r.charAt(n+1);return f.test(t)&&!a.test(o)||a.test(t)&&!f.test(e)?"\\u"+t.charCodeAt(0).toString(16):t},p=u((function(){return'"\\udf06\\ud834"'!==i("\udf06\ud834")||'"\\udead"'!==i("\udead")}));i&&e({target:"JSON",stat:!0,forced:p},{stringify:function(t,n,r){var e=i.apply(null,arguments);return"string"==typeof e?e.replace(c,s):e}})},function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,n,r){var e=r(0),o=r(21),u=r(6),i=r(22),c=r(7),f=r(8),a=r(9),s=Object.getOwnPropertyDescriptor;n.f=e?s:function(t,n){if(t=i(t),n=c(n,!0),a)try{return s(t,n)}catch(t){}if(f(t,n))return u(!o.f.call(t,n),t[n])}},function(t,n,r){"use strict";var e={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,u=o&&!e.call({1:2},1);n.f=u?function(t){var n=o(this,t);return!!n&&n.enumerable}:e},function(t,n,r){var e=r(23),o=r(25);t.exports=function(t){return e(o(t))}},function(t,n,r){var e=r(1),o=r(24),u="".split;t.exports=e((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?u.call(t,""):Object(t)}:Object},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,n,r){var e=r(3),o=r(4),u=e.document,i=o(u)&&o(u.createElement);t.exports=function(t){return i?u.createElement(t):{}}},function(t,n,r){var e=r(1),o=/#|\.prototype\./,u=function(t,n){var r=c[i(t)];return r==a||r!=f&&("function"==typeof n?e(n):!!n)},i=u.normalize=function(t){return String(t).replace(o,".").toLowerCase()},c=u.data={},f=u.NATIVE="N",a=u.POLYFILL="P";t.exports=u},function(t,n,r){var e=r(29);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 0:return function(){return t.call(n)};case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,n,r){var e=r(0),o=r(10),u=r(6);t.exports=e?function(t,n,r){return o.f(t,n,u(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n,r){var e=r(4);t.exports=function(t){if(!e(t))throw TypeError(String(t)+" is not an object");return t}},function(t,n,r){var e=r(2),o=r(3),u=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,n){return arguments.length<2?u(e[t])||u(o[t]):e[t]&&e[t][n]||o[t]&&o[t][n]}},function(t,n,r){t.exports=r(34)},function(t,n,r){var e=r(35);t.exports=e},function(t,n,r){r(36);var e=r(2).Object,o=t.exports=function(t,n,r){return e.defineProperty(t,n,r)};e.defineProperty.sham&&(o.sham=!0)},function(t,n,r){var e=r(5),o=r(0);e({target:"Object",stat:!0,forced:!o,sham:!o},{defineProperty:r(10).f})},function(t,n,r){}]);
//# sourceMappingURL=main.c27cf1.js.map