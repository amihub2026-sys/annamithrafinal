"""Run with Python 3 after editing data/products.json or data/categories.json.
Install reportlab to refresh the downloadable PDF as well.
"""
from pathlib import Path
import json,collections
from xml.sax.saxutils import escape
root=Path(__file__).resolve().parents[1]
products=json.loads((root/'data/products.json').read_text());cats=json.loads((root/'data/categories.json').read_text())
legacy={'milk-dairy':'bread-toppings-cheese-milk-ghee','paneer-cheese':'bread-toppings-cheese-milk-ghee','butter-cream-ghee':'bread-toppings-cheese-milk-ghee','frozen-vegetables':'veg-non-veg-frozen-starters-snacks','fries-potato':'veg-non-veg-frozen-starters-snacks','veg-snacks':'veg-non-veg-frozen-starters-snacks','nonveg-frozen':'veg-non-veg-frozen-starters-snacks','bakery':'cake-pre-mixes','sauces':'sauce-pasta-dressings-toppings'}
assert len({p['id'] for p in products})==len(products)
assert len({p['slug'] for p in products})==len(products)
assert all(p['categorySlug'] in {c['slug'] for c in cats} for p in products)
(root/'assets/js/product-data.js').write_text('/* Generated from data/products.json by tools/build-catalogue.py */\nwindow.PRODUCTS = '+json.dumps(products,ensure_ascii=False)+';\nwindow.CATEGORIES = '+json.dumps(cats,ensure_ascii=False)+';\nwindow.LEGACY_CATEGORIES = '+json.dumps(legacy)+';\n')
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,PageBreak
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
font='Helvetica'
for candidate in ['/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf','C:/Windows/Fonts/arial.ttf']:
 if Path(candidate).exists():pdfmetrics.registerFont(TTFont('Catalogue',candidate));font='Catalogue';break
styles=getSampleStyleSheet();styles.add(ParagraphStyle(name='CellText',fontName=font,fontSize=8.2,leading=11,textColor=colors.HexColor('#263c49')))
styles.add(ParagraphStyle(name='SmallNote',fontName=font,fontSize=9,leading=14,spaceAfter=12))
styles['Title'].fontName=font;styles['Heading1'].fontName=font;styles['Title'].textColor=colors.HexColor('#123c58');styles['Heading1'].textColor=colors.HexColor('#123c58')
P=lambda s:Paragraph(escape(str(s)),styles['CellText'])
flow=[Paragraph('ANNAMITHRA AGENCIES',styles['Title']),Paragraph('Product Catalogue',styles['Heading1']),Paragraph('Enquiries: +91 9384813537<br/>annamithraagenciesmdu@gmail.com',styles['SmallNote']),Paragraph(f'{len(products):,} catalogue entries across {len(cats)} categories. Please confirm pack sizes, availability and supply quantities before ordering. Product images are available on the website.',styles['SmallNote'])]
counts=collections.Counter(p['categorySlug'] for p in products)
for c in cats:flow.append(Paragraph(escape(c['name'])+f" - {counts[c['slug']]} entries",styles['SmallNote']))
for c in cats:
 flow.extend([PageBreak(),Paragraph(escape(c['name']),styles['Heading1']),Paragraph('Please enquire for current availability and prices.',styles['SmallNote'])])
 data=[[P('Product'),P('Pack size'),P('Brand')]]
 for p in sorted([p for p in products if p['categorySlug']==c['slug']],key=lambda p:p['productName'].lower()):data.append([P(p['productName']),P(', '.join(p['packSizes'])),P(p['brand'])])
 table=Table(data,colWidths=[278,105,116],repeatRows=1,hAlign='LEFT')
 table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e1edf2')),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#f5f8fa')]),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),('LINEBELOW',(0,0),(-1,0),.7,colors.HexColor('#8dafbd'))]));flow.append(table)
def footer(canvas,doc):
 canvas.saveState();canvas.setFont(font,8);canvas.setFillColor(colors.HexColor('#516875'));canvas.drawString(48,25,'Annamithra Agencies | Enquire: +91 9384813537');canvas.drawRightString(A4[0]-48,25,str(doc.page));canvas.restoreState()
SimpleDocTemplate(str(root/'assets/Annamithra_Product_Catalogue.pdf'),pagesize=A4,rightMargin=48,leftMargin=48,topMargin=45,bottomMargin=45,title='Annamithra Product Catalogue',author='Annamithra Agencies').build(flow,onFirstPage=footer,onLaterPages=footer)
print('Built',len(products),'products and PDF')
