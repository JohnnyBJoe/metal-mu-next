# Metal MU 2.0 Roadmap

## v0.2
- [x] Next.js
- [x] Prisma
- [x] Bands list
- [x] Band detail
- [ ] Members
- [ ] Active years

## v0.3
- [ ] Album detail
- [ ] Tracklist

## v0.4
- [ ] Lyrics
- [ ] Videos

## v0.5
- [ ] Member detail

## v1.0
- [ ] Administration

Album → Editions (různá vydání)
Katalogová čísla u vydání
Klikatelné labely s vlastním přehledem alb
Klikatelné styly, země a členové
YouTube odkazy místo MP3
Timeline členů
Propojení skladeb s videi a texty

Architecture

✓ Band
✓ Album
□ Track
□ Member
□ Label
□ Country
□ Style
□ Edition

Module 002

❌ Label

↓

✅ Helpers

A první helper bude:

normalizeLabel()

Infrastructure

✔ MainLayout
✔ HomeController
✔ Helpers

Modules

✔ Band
✔ Album
✔ Track

⬜ Label
⬜ Person
⬜ Country


□ Zrychlit přepínání písmen v levém panelu.

Současný stav:
Po kliknutí na písmeno někdy chvíli trvá, než lze kliknout na další.

Cíl:
Okamžitá odezva bez blokování uživatelského rozhraní.
...
Technical Debt

□ Zrychlit přepínání písmen
□ Přidat cache často používaných dat
□ Optimalizovat načítání obrázků
□ Odstranit duplicitní databázové dotazy
□ Otestovat výkon na 10 000+ albech

Navigation

□ Zachovat letter při návratu z Label
□ Breadcrumbs
□ Previous / Next album
□ Previous / Next band
□ Aktivní položky v menu

====================================

Jméno

Foto (později)

Instrument

Born

Birth place

Current bands
-----------------------

Biography

Past bands
-----------------------

Albums (později)

Tracks (později)

Links (později)

====================================

✓ Band Catalog

✓ Person Catalog

□ Label Catalog

□ Genre Catalog

□ Country Catalog

□ Studio Catalog

□ Festival Catalog

□ Magazine Catalog

□ Webzine Catalog

Metal MU 2.0

✅ Foundation

✅ Prisma

✅ Bands

✅ Persons

🔄 Album Credits

⬜ Labels

⬜ Genres

⬜ Countries

⬜ Studios

⬜ Magazines

⬜ Webzines

⬜ Search 2.0

⬜ Reviews

⬜ Concerts

Universal Catalog Layout

✔ Persons

⬜ Bands

⬜ Genres

⬜ Countries

Content Modules

✔ BandDetail

✔ PersonDetail

⬜ GenreDetail

⬜ CountryDetail

Aside Modules

✔ Discography

⬜ PersonAlbums

⬜ GenreAlbums

⬜ CountryAlbums