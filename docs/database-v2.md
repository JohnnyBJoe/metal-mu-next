Band
Album
Track
Member
Genre
Country
Photo
Logo
Video

BandGenre
BandMember
AlbumTrack

Band
 │
 ├── Album
 │      │
 │      ├── Edition
 │      │      └── Track
 │      │
 │      └── Review (pokud někdy)
 │
 ├── Member
 │
 └── Style

 Band
----
id
name
city
country_id
founded
disbanded

↓

Album
-----
id
band_id
title
type

↓

Edition
-------
id
album_id
name
release_date
country_id
label_id
catalog_number
cover

↓

Track
-----
id
edition_id
position
title
lyrics
youtube_url

Person

BandMember

Role