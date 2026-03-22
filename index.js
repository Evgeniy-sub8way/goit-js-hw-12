import{a as l,S as d,i as n}from"./assets/vendor-BkC4bTqC.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();l.defaults.baseURL="https://pixabay.com/api/";const m="55036572-7370ebd0316836cff88f01645";async function p(s){return(await l.get("/",{params:{key:m,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}const c=document.querySelector(".gallery"),y=new d(".gallery a",{captionsData:"alt",captionDelay:250});function g(s){const t=s.map(({webformatURL:o,largeImageURL:i,tags:e,likes:r,views:a,comments:u,downloads:f})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${i}">
          <img class="gallery-image" src="${o}" alt="${e}" />
        </a>
        <div class="info">
          <p>Likes: ${r}</p>
          <p>Views: ${a}</p>
          <p>Comments: ${u}</p>
          <p>Downloads: ${f}</p>
        </div>
      </li>`).join("");c.innerHTML=t,y.refresh()}function h(){c.innerHTML=""}function L(){document.querySelector(".loader").classList.add("visible")}function b(){document.querySelector(".loader").classList.remove("visible")}const v=document.querySelector(".form");v.addEventListener("submit",async s=>{s.preventDefault();const t=s.currentTarget.elements["search-text"].value.trim();if(!t){n.error({title:"Error",message:"Please enter a search query."});return}h(),L();try{const o=await p(t);o.hits.length===0?n.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"}):g(o.hits)}catch{n.error({title:"Error",message:"Failed to fetch images."})}finally{b()}});
//# sourceMappingURL=index.js.map
