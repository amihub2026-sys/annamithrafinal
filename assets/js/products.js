const state = {search:'',category:'',brand:'',storage:'',food:'',sort:'az',page:1,perPage:12};
const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/* PRODUCT VIEW DISABLED: original card renderer preserved for restoration.
function productCard(p) {
 const e=escapeHTML, pack=p.packSizes.join(', '), link=`product-details.html?slug=${encodeURIComponent(p.slug)}`;
 const msg=`Hello, I would like to enquire about ${p.productName}, ${p.brand}, ${pack}. Page: ${location.href}`;
 return `<article class="product-card"><a class="product-image" href="${link}"><img loading="lazy" width="600" height="500" src="${e(p.mainImage)}" alt="${e(p.productName)}"></a><div class="product-body"><span class="kicker">${e(p.brand)}</span><h3><a href="${link}">${e(p.productName)}</a></h3><div class="meta">${e(p.category)}</div><div class="badges">${[p.storageType,p.foodType].filter(x=>x&&!['Enquire for storage','Check product label'].includes(x)).map(x=>`<span class="badge">${e(x)}</span>`).join('')}</div><div class="meta">Packs: ${e(pack)}</div><div class="card-actions"><a class="btn btn-outline" href="${link}">View Details</a><a class="btn btn-primary" target="_blank" rel="noopener" href="${e(wa(msg))}">WhatsApp</a></div></div></article>`;
}
*/
function productCard(p) {
 const e=escapeHTML, pack=p.packSizes.join(', ');
 const msg=`Hello, I would like to enquire about ${p.productName}, ${p.brand}, ${pack}. Page: ${location.href}`;
 return `<article class="product-card"><div class="product-image"><img loading="lazy" width="600" height="500" src="${e(p.mainImage)}" alt="${e(p.productName)}"></div><div class="product-body"><span class="kicker">${e(p.brand)}</span><h3>${e(p.productName)}</h3><div class="meta">${e(p.category)}</div><div class="badges">${[p.storageType,p.foodType].filter(x=>x&&!['Enquire for storage','Check product label'].includes(x)).map(x=>`<span class="badge">${e(x)}</span>`).join('')}</div><div class="meta">Packs: ${e(pack)}</div><div class="card-actions"><a class="btn btn-primary" target="_blank" rel="noopener" href="${e(wa(msg))}">WhatsApp</a></div></div></article>`;
}
function filtered() {
 let list=PRODUCTS.filter(p=>(!state.category||p.categorySlug===state.category)&&(!state.brand||p.brand===state.brand)&&(!state.storage||p.storageType===state.storage)&&(!state.food||p.foodType===state.food));
 const q=state.search.trim().toLowerCase();
 if(q) list=list.filter(p=>[p.productName,p.brand,p.category,p.productCode,...p.keywords].join(' ').toLowerCase().includes(q));
 return list.sort((a,b)=>state.sort==='za'?b.productName.localeCompare(a.productName):state.sort==='new'?Number(b.isNew)-Number(a.isNew):state.sort==='featured'?Number(b.isFeatured)-Number(a.isFeatured):a.productName.localeCompare(b.productName));
}
function render() {
 const list=filtered(),pages=Math.max(1,Math.ceil(list.length/state.perPage));state.page=Math.min(state.page,pages);
 const start=(state.page-1)*state.perPage,items=list.slice(start,start+state.perPage);
 $('#productGrid').innerHTML=items.length?items.map(productCard).join(''):'<div class="empty"><h3>No products found</h3><p>Try another search or clear filters.</p></div>';
 $('#resultCount').textContent=items.length?`Showing ${start+1}–${start+items.length} of ${list.length} products`:'No products found';
 const button=(page,label)=>`<button data-page="${page}" ${state.page===page?'class="active" aria-current="page"':''} aria-label="Page ${page}">${label}</button>`;
 const nums=[...new Set([1,state.page-1,state.page,state.page+1,pages])].filter(n=>n>0&&n<=pages).sort((a,b)=>a-b);
 $('#pagination').innerHTML=(state.page>1?button(state.page-1,'Previous'):'')+nums.map((n,i)=>(i&&n>nums[i-1]+1?'<span aria-hidden="true">…</span>':'')+button(n,n)).join('')+(state.page<pages?button(state.page+1,'Next'):'');
 $('#pagination').querySelectorAll('button').forEach(b=>b.onclick=()=>{state.page=Number(b.dataset.page);render();$('#resultCount').scrollIntoView({behavior:'smooth',block:'start'});});
}
function initProducts() {
 CATEGORIES.forEach(c=>$('#categoryFilter').add(new Option(c.name,c.slug)));
 [...new Set(PRODUCTS.map(p=>p.brand))].sort().forEach(b=>$('#brandFilter').add(new Option(b,b)));
 const params=new URLSearchParams(location.search),category=params.get('category')||'';
 state.category=window.LEGACY_CATEGORIES?.[category]||category;state.brand=params.get('brand')||'';
 let timer;$('#productSearch').oninput=e=>{clearTimeout(timer);timer=setTimeout(()=>{state.search=e.target.value;state.page=1;render();},200);};
 [['categoryFilter','category'],['brandFilter','brand'],['storageFilter','storage'],['foodFilter','food'],['sortFilter','sort']].forEach(([id,key])=>{const el=$('#'+id);el.value=state[key];el.onchange=e=>{state[key]=e.target.value;state.page=1;render();};});
 $('#clearFilters').onclick=()=>{Object.assign(state,{search:'',category:'',brand:'',storage:'',food:'',sort:'az',page:1});document.querySelectorAll('.filters input,.filters select').forEach(x=>x.value='');$('#sortFilter').value='az';$('#productSearch').value='';render();};
 render();
}
document.addEventListener('DOMContentLoaded',()=>{if($('#productGrid'))initProducts();});
