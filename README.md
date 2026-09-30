# Annamithra Agencies - updated catalogue

Open index.html in a browser, or serve this folder using `python -m http.server 8000`.
Upload the CONTENTS of this folder to your existing GitHub Pages repository root.
No backend or live catalogue API is required. The website reads the bundled JavaScript data.

## Completed
- 1,131 Selvarani source entries imported; 303 existing category rows and 30 existing card entries retained (1,464 total). Existing rows may describe overlapping products or grouped flavours; they were retained to avoid losing your catalogue.
- All 14 category pages, All Products, search, filters and detail pages share the generated product data.
- 43 broken active local links repaired.
- WhatsApp set to 919384813537, matching the displayed contact telephone. Confirm this number has WhatsApp before publishing.
- Product-not-found handling, Annamithra titles, safe text rendering, clipboard fallback and idempotent menu bindings.
- Compact pagination, category search and mobile category rows.
- Download Catalogue now downloads assets/Annamithra_Product_Catalogue.pdf.
- Existing styling, branding and contact content retained. Example canonical URLs replaced.

## Editing products
Edit data/products.json (canonical product source) and data/categories.json, then run:

    python -m pip install reportlab
    python tools/build-catalogue.py

This updates assets/js/product-data.js and the PDF together. Do not edit the generated JavaScript independently.

## Data notes
Source catalogue retrieved 23 September 2026 from https://selvaraniagencies.com/ . Each imported record stores its sourceUrl and original sourceCategories. Categories are mapped to Annamithra's 14 groups using source names/categories; uncertain matches remain in Others (categoryMapping=unclassified). Review those records before advertising availability. Brand and pack sizes are taken only from explicit names/metadata; missing values are labelled for enquiry. Source availability and prices were not copied as Annamithra claims.

Source product photos remain external URLs; the website uses a local neutral fallback if one fails. Existing category rows did not contain product photos, so those entries use the fallback. The downloadable PDF is text-only and works offline.

## Verification
Local link scan: no broken active href/src file references. JavaScript syntax checks passed. Script-level rendering checks passed for all 14 categories, search, compact pagination, escaped product text, valid/missing detail URLs and the WhatsApp target. PDF pages were rendered and visually inspected. A full browser/mobile visual run could not be completed because the browser runtime download failed; check the responsive layout in your browser before publishing. 15 source entries remain unclassified in Others.

## Latest display change
Category search and product-detail navigation are disabled. Original implementations are preserved in block comments in assets/js/category-products.js and assets/js/products.js. The product-details page and its script are retained. Category product counts remain visible. All Products search and WhatsApp enquiries remain available.
