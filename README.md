# ADAMČIAK s.r.o. – firemný web

Hotový jednoduchý, responzívny firemný web bez plateného hostingu. Stránka je postavená ako čisté HTML/CSS/JavaScript, takže ju možno bez problémov publikovať cez GitHub Pages.

## Čo je už hotové

- profesionálny vzhľad vo farbách loga (červená, modrá, žltá + svetlomodré plochy),
- titulná fotografia `assets/hero.png` sa zobrazuje bez orezania,
- logo `assets/logo.png`,
- O nás podľa dodaného textu,
- služby v prehľadných kartách,
- služby s textom v zátvorkách sú rozklikávacie a podrobnosti sa zobrazia ako odrážky,
- referencie podľa dodaného textu,
- galéria obsahuje všetkých 21 dodaných fotografií bez úprav/otáčania; názvy súborov sa návštevníkom nezobrazujú,
- zväčšenie fotografie v galérii + šípky/klávesnica,
- klikateľná mapa pri prevádzke,
- klikateľný telefón a e-mail,
- kontaktný formulár s mailto fallbackom,
- pripravená možnosť pripojiť Formspree pre formulár, aby zákazník nemusel mať otvorený e-mailový program,
- pripravená štruktúra pre budúce novinky/blog,
- `data/site.json` je hlavný obsahový súbor,
- `.pages.yml` je pripravený pre Pages CMS.

## Odporúčané bezplatné riešenie

### 1. GitHub Pages = hosting

GitHub Pages vie publikovať statický web priamo z GitHub repozitára.

Postup:

1. Vytvor si účet na GitHub.
2. Vytvor nový **Public repository** (napr. `adamciak-web`).
3. Nahraj doň celý obsah tohto priečinka – nie samotný ZIP ako jediný súbor.
4. V repozitári otvor **Settings → Pages**.
5. Ako zdroj publikovania vyber **Deploy from a branch**.
6. Vyber vetvu `main` a priečinok `/ (root)`.
7. Ulož.
8. GitHub ti zobrazí adresu stránky v tvare:
   `https://TVOJE-MENO.github.io/adamciak-web/`

Ak chceš adresu bez názvu repozitára, môžeš neskôr vytvoriť repozitár `TVOJE-MENO.github.io`.

### 2. Jednoduchý „admin“ = Pages CMS

Táto verzia webu je pripravená na Pages CMS. Je to redakčné rozhranie, ktoré vie upravovať súbory priamo v GitHub repozitári.

Postup:

1. Otvor `https://app.pagescms.org/`
2. Prihlás sa cez GitHub.
3. Povoľ Pages CMS prístup k svojmu repozitáru.
4. Otvor repozitár s webom.
5. V ňom je už pripravený súbor `.pages.yml`.
6. V Pages CMS otvor **Obsah webu**.
7. Môžeš meniť texty, služby, referencie, kontakty, mapu, logo/titulnú fotografiu a galériu.
8. Novú fotografiu vieš nahrať cez správu médií a následne ju pridať do zoznamu galérie.
9. Novinky/blog sa dajú pridávať cez pole **Blog / novinky**.
10. Po uložení Pages CMS zapíše zmenu do GitHubu. GitHub Pages následne stránku znovu publikuje.

Dôležité: GitHub Pages samo o sebe nemá klasický WordPressový admin. Pages CMS je samostatná bezplatná redakčná vrstva nad GitHubom. Preto môžeš mať pohodlné upravovanie obsahu bez toho, aby si musela ručne editovať HTML.

## Kontaktný formulár

V základnej verzii formulár po kliknutí na „Odoslať nezáväzný dopyt“ otvorí e-mailový program návštevníka a pripraví správu.

Ak chceš, aby zákazník odoslal formulár priamo cez web aj bez e-mailového programu:

1. Vytvor bezplatný formulár na Formspree.
2. Skopíruj jeho endpoint v tvare `https://formspree.io/f/...`.
3. V Pages CMS otvor **Kontakt → formspreeEndpoint**.
4. Vlož endpoint.
5. Ulož.

Web potom použije Formspree namiesto mailto formulára.

## Kde sa mení obsah

Najdôležitejší súbor je:

`data/site.json`

Je v ňom:

- názov firmy,
- logo a titulná fotografia,
- O nás,
- služby a ich rozklikávacie podrobnosti,
- referencie,
- kontakt,
- mapa,
- galéria,
- blog/novinky.

Pri používaní Pages CMS tento JSON nemusíš ručne otvárať – budeš ho meniť cez vizuálne formuláre.

## Dôležité k fotografiám

Dodané fotografie boli skopírované do:

`assets/gallery/`

Samotné JPG súbory sa neupravovali, neotáčali ani neorezávali. V galérii sa zobrazujú ako čisté fotografie bez názvov.

## Budúce úpravy

Do webu sa dá neskôr jednoducho doplniť:

- samostatná stránka pre každú službu,
- blog/novinky,
- ďalšie fotografie,
- fotografie ku konkrétnym referenciám,
- PDF dokumenty na stiahnutie,
- formulár s prílohou,
- vlastná doména,
- Google Analytics / štatistiky,
- SEO úpravy a sociálne siete.

