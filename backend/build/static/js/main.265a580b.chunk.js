(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{25:function(e,t,n){},26:function(e,t,n){},27:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var c=n(2),s=n.n(c),r=n(17),a=n.n(r),o=(n(25),n(4)),i=(n(26),n(27),n(0)),l=function(e){var t=e.title,n=void 0===t?"TITLE":t,c=e.type,s=void 0===c?"text":c,r=e.onChange;return Object(i.jsxs)("div",{className:"option",children:[Object(i.jsx)("h5",{className:"oTitle",children:n}),"text"===s?Object(i.jsx)("input",{type:"text",className:"textInput",onChange:r}):"number"===s?Object(i.jsx)("input",{type:"slider",className:"numberInput",onChange:r}):"toggle"===s?Object(i.jsxs)("label",{className:"switch",children:[Object(i.jsx)("input",{type:"checkbox",onChange:r}),Object(i.jsx)("span",{className:"slider"})]}):Object(i.jsx)("input",{type:"text",className:"textInput",onChange:r})]})},j=n(6),u=n.n(j);var p=function(){var e=Object(c.useState)(""),t=Object(o.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)(!1),a=Object(o.a)(r,2),j=a[0],p=a[1],h=Object(c.useState)(-1),b=Object(o.a)(h,2),d=b[0],O=b[1],x=Object(c.useState)(!1),g=Object(o.a)(x,2),m=g[0],f=g[1],y=Object(c.useState)(""),N=Object(o.a)(y,2),C=N[0],v=N[1];return Object(i.jsxs)("div",{className:"app",children:[Object(i.jsx)("h1",{className:"title",children:"URL Shortener"}),""!==C&&Object(i.jsxs)("div",{className:"outputContainer",children:[Object(i.jsx)("h3",{className:"outputTitle",children:"New Link, click to copy"}),Object(i.jsx)("h4",{onClick:function(){navigator.clipboard.writeText(C)},className:"output",children:C})]}),Object(i.jsxs)("form",{className:"form",onSubmit:function(e){e.preventDefault(),u.a.post("/api/links",{maxUses:d,tracking:m,url:n},{withCredentials:!0}).then((function(e){console.log(e),v("https://teenie.herokuapp.com/".concat(e.data.url))}))},children:[Object(i.jsx)("input",{type:"text",className:"input",placeholder:"Enter URL to shorten",onChange:function(e){return s(e.target.value)}}),Object(i.jsx)("input",{className:"shorten",type:"submit",value:"Shorten!"}),Object(i.jsxs)("div",{className:"optsContainer",children:[j?Object(i.jsx)("p",{onClick:function(){return p((function(e){return!e}))},className:"toggleOpts",children:"Advanced\u25b2"}):Object(i.jsx)("p",{onClick:function(){return p((function(e){return!e}))},className:"toggleOpts",children:"Advanced\u25bc"}),j&&Object(i.jsxs)("div",{className:"options",children:[Object(i.jsx)(l,{title:"Limit",type:"number",onChange:function(e){O(e.target.value)}}),Object(i.jsx)(l,{title:"tracking",type:"toggle",onChange:function(e){f(e.target.checked)}})]})]})]}),Object(i.jsx)("footer",{children:Object(i.jsxs)("p",{children:["A Project by ",Object(i.jsx)("a",{href:"https://github.com/KronsyC",target:"_blank",rel:"noreferrer",children:"KronsyC"})]})})]})},h=n(18);u.a.get("/api/register",{withCredentials:!0}).then((function(e){e.data||u.a.post("/api/register",{},{withCredentials:!0}).then((function(e){console.log("Successfully Registered"),console.log(e)}))})),a.a.render(Object(i.jsxs)(s.a.StrictMode,{children:[Object(i.jsxs)(h.a,{children:[Object(i.jsx)("title",{children:"Teenie - Url Shortener"}),Object(i.jsx)("meta",{property:"og:title",content:"Teenie - Url Shortener"}),Object(i.jsx)("meta",{property:"og:description",content:"A Url Shortener by KronsyC"}),Object(i.jsx)("meta",{property:"og:url",content:"https://teenie.herokuapp.com"}),Object(i.jsx)("meta",{property:"og:image",content:"/adachi.jpg"})]}),Object(i.jsx)(p,{})]}),document.getElementById("root"))}},[[50,1,2]]]);
//# sourceMappingURL=main.265a580b.chunk.js.map