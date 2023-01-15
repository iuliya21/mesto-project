(()=>{"use strict";var e="popup_opened",t=document.querySelectorAll(".popup"),n=document.querySelector(".popup_type_card").querySelector(".popup__form"),r=function(t){t.classList.add(e),document.addEventListener("keydown",c)},o=function(t){t.classList.remove(e),document.removeEventListener("keydown",c)};function c(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");o(t)}}t.forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__button-close"))&&o(e)}))}));var i=document.querySelector(".elements");function u(e){i.prepend(e)}var a={currentUrl:"https://nomoreparties.co/v1/plus-cohort-18",headers:{authorization:"5316090b-29fc-4b6a-8b2f-268d3472034e","Content-Type":"application/json"}},l=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var d,p,f,m,_,y,v=document.querySelector(".profile__button-pencil"),h=document.querySelector(".profile__button"),S=document.querySelector(".popup_type_edit"),b=S.querySelector(".popup__button"),q=document.querySelector(".popup_type_card"),L=q.querySelector(".popup__form-text_input_place"),C=q.querySelector(".popup__form-text_input_link"),E=q.querySelector(".popup__form"),k=document.querySelector(".profile"),x=document.querySelector(".popup_type_profile-photo"),g=x.querySelector(".popup__form"),A=x.querySelector(".popup__button"),U=x.querySelector(".popup__form-text_input_photo-link"),j=document.querySelector(".profile__title"),O=document.querySelector(".profile__paragraph"),w=document.querySelector(".popup__form"),T=w.querySelector(".popup__form-text_input_name"),P=w.querySelector(".popup__form-text_input_job"),D=E.querySelector(".popup__button"),B=document.querySelector(".profile__photo"),M=document.querySelector(".profile__photo-edit"),N=document.querySelector("#template-card").content.querySelector(".elements-item"),I=document.querySelector(".popup_type_image"),J=document.querySelector(".popup-image__photo"),H=document.querySelector(".popup-image__description"),V=function(e){var t=N.cloneNode(!0),n=t.querySelector(".elements-item__title"),o=t.querySelector(".elements-item__photo"),c=t.querySelector(".elements-item__button"),i=t.querySelector(".elements-item__like"),u=t.querySelector(".elements-item__counter-like");return o.addEventListener("click",(function(){J.alt=e.name,J.src=e.link,H.textContent=e.name,r(I)})),n.textContent=e.name,o.src=e.link,o.alt=e.name,k.id===e.owner._id&&c.classList.add("elements-item__button_active"),c.addEventListener("click",(function(){var n;(n=e._id,fetch("".concat(a.currentUrl,"/cards/").concat(n),{method:"DELETE",headers:a.headers}).then((function(e){return l(e)}))).then((function(){!function(e){e.remove()}(t)})).catch((function(e){console.error(e)}))})),i.addEventListener("click",(function(t){var n;t.target.classList.contains("elements-item__like_active")?function(e){return fetch("".concat(a.currentUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:a.headers}).then((function(e){return l(e)}))}(e._id).then((function(e){t.target.classList.remove("elements-item__like_active"),0===e.likes.length?u.textContent="":u.textContent=e.likes.length})).catch((function(e){console.error(e)})):(n=e._id,fetch("".concat(a.currentUrl,"/cards/likes/").concat(n),{method:"PUT",headers:a.headers}).then((function(e){return l(e)}))).then((function(e){t.target.classList.add("elements-item__like_active"),u.textContent=e.likes.length})).catch((function(e){console.error(e)}))})),0===e.likes.length?u.textContent="":u.textContent=e.likes.length,e.likes.forEach((function(e){Object.values(e).includes(k.id)&&i.classList.add("elements-item__like_active")})),t};Promise.all([fetch("".concat(a.currentUrl,"/users/me"),{headers:a.headers}).then((function(e){return l(e)})),fetch("".concat(a.currentUrl,"/cards"),{headers:a.headers}).then((function(e){return l(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,i,u=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];k.id=o._id,j.textContent=o.name,O.textContent=o.about,B.src=o.avatar,c.reverse().forEach((function(e){u(V(e))}))})).catch((function(e){console.error(e)})),B.addEventListener("mouseover",(function(){M.style.visibility="visible"})),M.addEventListener("mouseout",(function(){M.style.visibility="hidden"})),M.addEventListener("mouseover",(function(){M.style.visibility="visible"})),g.addEventListener("submit",(function(e){var t;e.preventDefault(),A.textContent="Сохранение...",(t=U.value,fetch("".concat(a.currentUrl,"/users/me/avatar"),{method:"PATCH",headers:a.headers,body:JSON.stringify({avatar:t})}).then((function(e){return l(e)}))).then((function(e){B.src=e.avatar,B.alt=e.avatar,o(x)})).catch((function(e){console.error(e)})).finally((function(){A.textContent="Сохранить"}))})),M.addEventListener("click",(function(){r(x)})),v.addEventListener("click",(function(){r(S),T.value=j.textContent,P.value=O.textContent})),h.addEventListener("click",(function(){r(q),n.reset(),D.classList.add("popup__button_disabled"),D.setAttribute("disabled","disabled")})),w.addEventListener("submit",(function(e){var t,n;e.preventDefault(),b.textContent="Сохранение...",(t=T.value,n=P.value,fetch("".concat(a.currentUrl,"/users/me"),{method:"PATCH",headers:a.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return l(e)}))).then((function(){j.textContent=T.value,O.textContent=P.value,o(S)})).catch((function(e){console.error(e)})).finally((function(){b.textContent="Сохранить"}))})),E.addEventListener("submit",(function(e){var t,n;e.preventDefault(),D.textContent="Создание...",(t=L.value,n=C.value,fetch("".concat(a.currentUrl,"/cards"),{method:"POST",headers:a.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return l(e)}))).then((function(e){u(V(e)),o(q)})).catch((function(e){console.error(e)})).finally((function(){D.textContent="Создать"}))})),p=(d={formSelector:".popup__form",inputSelector:".popup__form-text",inputErrorClass:"popup__form-text_type_error",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled"}).formSelector,f=d.inputSelector,m=d.inputErrorClass,_=d.submitButtonSelector,y=d.inactiveButtonClass,Array.from(document.querySelectorAll(p)).forEach((function(e){var t=Array.from(e.querySelectorAll(f)),n=e.querySelector(_);t.forEach((function(r){r.addEventListener("input",(function(r){return function(e,t,n,r,o,c){var i=e.target;!function(e,t,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?function(e,t,n){e.classList.remove(n),t.textContent=""}(e,t,n):function(e,t,n){e.classList.add(n),t.textContent=e.validationMessage}(e,t,n)}(i,t.querySelector(".input-error-".concat(i.name)),n);var u=function(e){return e.some((function(e){return!e.validity.valid}))}(c);!function(e,t,n){n?function(e,t){e.classList.add(t),e.disabled=!0}(e,t):function(e,t){e.classList.remove(t),e.disabled=!1}(e,t)}(r,o,u)}(r,e,m,n,y,t)}))}))}))})();