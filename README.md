ADAMČIAK s.r.o. – CMS + galéria + referencie

Táto verzia obsahuje:
- referencie s viditeľným odznakom „📷 X fotografií“ pri referencii, ak má pridané fotografie,
- otvorenie fotografií konkrétnej referencie po kliknutí,
- galériu spravovateľnú z Pages CMS cez Nastavenie stránky → Galéria,
- automatické načítanie čerstvých JSON dát bez bežného prehliadačového cache,
- kompatibilitu galérie so starým aj novým formátom dát,
- opravenú mapu na I. Houdeka 29, Ružomberok.

Nahradiť v GitHub repozitári:
.pages.yml
index.html
script.js
styles.css
data/site.json
data/references.json
data/blog.json

Poznámka: obrázky, ktoré už existujú v assets/gallery, ostávajú tam. Po nahratí novej site.json treba v Pages CMS pri položke Galéria vybrať existujúce obrázky, ktoré majú byť na hlavnej stránke.
