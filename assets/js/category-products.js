/* CATEGORY SEARCH AND PRODUCT VIEW DISABLED.
Original implementation preserved below; restore this block to re-enable.
document.addEventListener('DOMContentLoaded', () => {
 const list=document.querySelector('.category-product-list[data-category]');if(!list)return;
 const products=PRODUCTS.filter(p=>p.categorySlug===list.dataset.category).sort((a,b)=>a.productName.localeCompare(b.productName));
 const controls=document.createElement('div');controls.className='category-catalogue-controls';
 const label=document.createElement('label');label.textContent='Search this category';label.htmlFor='categorySearch';
 const input=document.createElement('input');input.id='categorySearch';input.type='search';input.placeholder='Product name, brand or pack size';
 const count=document.createElement('p');count.setAttribute('aria-live','polite');controls.append(label,input,count);list.before(controls);
 const e=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function render(){const q=input.value.trim().toLowerCase(),items=products.filter(p=>[p.productName,p.brand,...p.packSizes].join(' ').toLowerCase().includes(q));count.textContent=`${items.length} products`;list.innerHTML=items.length?items.map(p=>`<div class="category-product-row"><div class="category-product-name"><a href="../../product-details.html?slug=${encodeURIComponent(p.slug)}">${e(p.productName)}</a></div><div class="category-product-size">${e(p.packSizes.join(', '))}</div><div class="category-product-brand">${e(p.brand)}</div></div>`).join(''):'<p>No products match your search.</p>';}
 input.addEventListener('input',render);render();
});
*/

document.addEventListener('DOMContentLoaded', () => {
 const list=document.querySelector('.category-product-list[data-category]');if(!list)return;
 const products=PRODUCTS.filter(p=>p.categorySlug===list.dataset.category).sort((a,b)=>a.productName.localeCompare(b.productName));
 const controls=document.createElement('div');controls.className='category-catalogue-controls';
 const count=document.createElement('p');count.setAttribute('aria-live','polite');controls.append(count);list.before(controls);
 const e=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function render(){const items=products;count.textContent=`${items.length} products`;list.innerHTML=items.length?items.map(p=>`<div class="category-product-row"><div class="category-product-name">${e(p.productName)}</div><div class="category-product-size">${e(p.packSizes.join(', '))}</div><div class="category-product-brand">${e(p.brand)}</div></div>`).join(''):'<p>No products match your search.</p>';}
 render();
});
