(this["webpackJsonpdebt-manager"]=this["webpackJsonpdebt-manager"]||[]).push([[0],{13:function(n,t,e){n.exports={container:"transaction-card_container__3DRZs",amount:"transaction-card_amount__2OhU9"}},14:function(n,t,e){n.exports={container:"total_container__s0tCK",totalValue:"total_totalValue__YSOQf"}},32:function(n,t,e){},41:function(n,t,e){"use strict";e.r(t);var a=e(4),c=e(8),o=e.n(c),i=e(16),r=e.n(i),s=(e(32),e(17)),u=e(25),l=e(18),d=e(26),j=e(21),m=e(24),b=e.n(m),f=e(13),h=e.n(f),O=Object(c.memo)((function(n){return Object(a.jsxs)("div",{className:h.a.container,children:[Object(a.jsxs)("div",{children:["Transaction #",n.count]}),Object(a.jsxs)("div",{children:["Amount: ",Object(a.jsxs)("span",{className:h.a.amount,children:[n.amount," \u20bd"]})]}),Object(a.jsxs)("div",{children:["From: ",n.date]})]})})),p=e(14),g=e.n(p),x=function(n){return Object(a.jsxs)("div",{className:g.a.container,children:["It remains to pay off:"," ",Object(a.jsxs)("span",{className:g.a.totalValue,children:[n.initialDebt-n.total," \u20bd"]})]})};function _(){var n=Object(s.a)(["\n          {\n            allTransactions {\n              edges {\n                node {\n                  body {\n                    __typename\n                    ... on TransactionBodyTransactions {\n                      type\n                      label\n                      fields {\n                        amount\n                        date\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        "]);return _=function(){return n},n}var v=new j.a({link:Object(l.PrismicLink)({uri:"https://debt-manager.prismic.io/graphql"}),cache:new d.a});var y=function(n){return n.map((function(n){return n.amount})).reduce((function(n,t){return n+t}))},T=function(){var n=Object(c.useState)(null),t=Object(u.a)(n,2),e=t[0],o=t[1];return Object(c.useEffect)((function(){v.query({query:b()(_())}).then((function(n){console.log(n);var t=n.data.allTransactions.edges[0].node.body[0].fields;o(t)})).catch((function(n){console.error(n)}))}),[]),e?Object(a.jsxs)("div",{children:[e.map((function(n,t){return Object(a.jsx)(O,{count:t,amount:n.amount,date:new Intl.DateTimeFormat("en-US",{dateStyle:"full",timeStyle:"long"}).format(new Date(n.date))},"".concat(n.amount,"_").concat(n.date))})),Object(a.jsx)(x,{initialDebt:96500,total:y(e)})]}):Object(a.jsx)("div",{children:"Loading..."})},S=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,42)).then((function(t){var e=t.getCLS,a=t.getFID,c=t.getFCP,o=t.getLCP,i=t.getTTFB;e(n),a(n),c(n),o(n),i(n)}))};r.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(T,{})}),document.getElementById("root")),S()}},[[41,1,2]]]);
//# sourceMappingURL=main.ed1b2c86.chunk.js.map