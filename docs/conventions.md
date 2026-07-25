Metal MU 2.0

Navigace
---------
✓ letter
✓ band
✓ album
✓ track

URL vždy zachovává kontext.

----------------------------

Komponenty

BandDetail
AlbumDetail
TrackDetail
MemberDetail
LabelDetail

----------------------------

Klikatelné entity

Band
Album
Track
Member
Label
Country
Style

----------------------------

Databáze

Album
Edition
Track

Band

Member

Label

components/

album/
    AlbumDetail.tsx
    AlbumInfo.tsx
    AlbumCover.tsx
    TrackList.tsx

track/
    TrackDetail.tsx

member/
    MemberDetail.tsx

band/
    BandMembers.tsx
    BandInfo.tsx

    Žádný Detail komponent nesmí být větší než přibližně 150–200 řádků.

    album/

AlbumDetail
AlbumInfo
AlbumCover

member/

MemberDetail
MemberInfo

label/

LabelDetail
LabelInfo

Já bych chtěl, aby každá entita měla svůj vlastní typový soubor, ale zároveň bych v budoucnu rozlišil:

databázový model (co vrací Prisma),
view model (co potřebuje komponenta).

Například u Labelu dnes LabelAlbum stačí. Ale později může LabelDetail potřebovat i název kapely nebo obal alba. Pak bude lepší vytvořit nový typ, třeba LabelDetailModel, místo rozšiřování původního typu.

Každá entita musí obsahovat:

- Type
- Service
- Detail Component
- Navigation
- Tests