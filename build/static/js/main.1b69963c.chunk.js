(this.webpackJsonpex2_forms=this.webpackJsonpex2_forms||[]).push([[0],{40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var s=n(16),c=n.n(s),a=n(4),r=n(2),o=n(3),u=n.n(o),i="/api/persons",d={getAll:function(){return u.a.get(i).then((function(e){return e.data}))},create:function(e){return u.a.post(i,e).then((function(e){return e.data}))},update:function(e,t){return u.a.put("".concat(i,"/").concat(e),t).then((function(e){return e.data}))},deleteEntry:function(e){return u.a.delete("".concat(i,"/").concat(e)).then("success")}},b=n(0),m=function(e){var t=e.persons,n=e.setNewNameFilter,s=e.newNameFilter,c=e.setPersons,a=e.setResponseStatus,r=e.setMessage,o=t.filter((function(e){return e.name.includes(s)}));return Object(b.jsxs)("div",{children:["filter by name:"," ",Object(b.jsx)("input",{value:s,onChange:function(e){n(e.target.value)}}),Object(b.jsx)("h2",{children:"Numbers"}),Object(b.jsx)("ul",{children:o.map((function(e){return Object(b.jsxs)("li",{children:[e.name," ",e.number," ",Object(b.jsx)("button",{onClick:function(){return function(e){window.confirm("Do you want to delete entry: ".concat(e.name,"?"))&&(d.deleteEntry(e.id).then((function(){return console.log("Successfully deleted")})).catch((function(e){a("error"),r("Could not delete entry\n".concat(e)),setTimeout((function(){a(""),r("")}),5e3)})),c(t.filter((function(t){return t.id!==e.id}))))}(e)},children:"delete"})]},e.id)}))})]})},l=function(e){return Object(b.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n=e.persons.find((function(t){return t.name===e.newName})),s={name:e.newName,number:e.newNumber};void 0!==n?window.confirm("".concat(n.name," already exists in the phonebook. Replace number?"))&&d.update(n.id,s).then((function(t){e.setPersons(e.persons.map((function(e){return e.id===t.id?t:e}))),e.setResponseStatus("success"),e.setMessage("".concat(t.name," updated")),setTimeout((function(){e.setResponseStatus(""),e.setMessage("")}),5e3),e.setNewName(""),e.setNewNumber("")})).catch((function(t){e.setResponseStatus("error"),e.setMessage("Item cold not be changed. \n".concat(t)),setTimeout((function(){e.setResponseStatus(""),e.setMessage("")}),5e3)})):d.create(s).then((function(t){e.setPersons(e.persons.concat(t)),e.setNewName(""),e.setNewNumber(""),e.setResponseStatus("success"),e.setMessage("".concat(t.name," added")),setTimeout((function(){e.setResponseStatus(""),e.setMessage("")}),5e3)})).catch((function(t){e.setResponseStatus("error"),e.setMessage("Item cold not be added. \n".concat(t.response.data)),setTimeout((function(){e.setResponseStatus(""),e.setMessage("")}),5e3)}))},children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:e.newName,onChange:function(t){e.setNewName(t.target.value)}})]}),Object(b.jsxs)("div",{children:["number: ",Object(b.jsx)("input",{value:e.newNumber,onChange:function(t){e.setNewNumber(t.target.value)}})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"add"})})]})},j=function(e){var t=e.message,n=e.responseStatus;return"success"===n?Object(b.jsx)("div",{className:"success",children:t}):"error"===n?Object(b.jsx)("div",{className:"error",children:t}):null},f=function(){var e=Object(r.useState)([]),t=Object(a.a)(e,2),n=t[0],s=t[1],c=Object(r.useState)(""),o=Object(a.a)(c,2),i=o[0],d=o[1],f=Object(r.useState)(""),p=Object(a.a)(f,2),h=p[0],O=p[1];Object(r.useEffect)((function(){u.a.get("/api/persons").then((function(e){return s(e.data)})).catch((function(e){d("error"),O("Failure to get stuff from db")}))}),[]);var N=Object(r.useState)(""),g=Object(a.a)(N,2),w=g[0],x=g[1],v=Object(r.useState)(""),S=Object(a.a)(v,2),R=S[0],M=S[1],y=Object(r.useState)(""),P=Object(a.a)(y,2),k=P[0],C=P[1];return Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Phonebook!"}),Object(b.jsx)(j,{message:h,responseStatus:i}),Object(b.jsx)(l,{persons:n,newName:w,setNewName:x,newNumber:R,setNewNumber:M,setPersons:s,setResponseStatus:d,setMessage:O}),Object(b.jsx)(m,{persons:n,setNewNameFilter:C,newNameFilter:k,setPersons:s,setResponseStatus:d,setMessage:O})]})};n(40);c.a.render(Object(b.jsx)(f,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.1b69963c.chunk.js.map