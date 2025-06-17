# Utazási Blog Webalkalmazás - Dokumentáció

## 1. Téma megfogalmazása

Az általam készített webalkalmazás egy modern utazási blog platform, specifikusan Máltai utazási élmények megosztására specializálódva. A rendszer fő célja, hogy a felhasználók részletes és látványos módon dokumentálhassák utazási tapasztalataikat, ami magában foglalja a szöveges tartalmakat és a vizuális elemeket egyaránt. A platform lehetővé teszi az interaktív kommunikációt a felhasználók között kommentek formájában, valamint támogatja a multimédiás tartalmak (képek, táblázatok) kezelését. A blog reszponzív kialakítású, így bármilyen eszközön optimális megjelenést biztosít. A rendszer biztonságos autentikációt és jogosultságkezelést implementál, ami lehetővé teszi a személyre szabott tartalmak kezelését.

## 2. Felhasználói Csoportok és Funkcionalitások

### 2.1. Látogatók (nem regisztrált felhasználók)
A rendszer lehetővé teszi a nem regisztrált felhasználók számára az alapvető böngészési funkciókat:
- Blogbejegyzések olvasása és keresése a tartalomban
- Képgaléria megtekintése (lightbox funkcióval)
- Részletes bejegyzések és kapcsolódó képek böngészése
- Keresési funkció használata (cím és tartalom alapján)
- Regisztrációs lehetőség

### 2.2. Regisztrált Felhasználók
A regisztrált felhasználók az összes látogatói funkción felül az alábbi lehetőségekkel rendelkeznek:
- Személyes fiók kezelése (bejelentkezés/kijelentkezés)
- Saját blogbejegyzések írása, szerkesztése és törlése
- Képfeltöltés a bejegyzésekhez (több kép is lehetséges)
- Kommentek írása más felhasználók bejegyzéseihez
- Kedvenc bejegyzések mentése és kezelése
- Saját feltöltött képek kezelése (törlés, rendszerezés)

## 3. Egyéni Fejlesztések és Lényeges Megvalósítások

### 3.1. Fejlett Képkezelési Rendszer
Az alkalmazás egyik legfontosabb egyedi fejlesztése a fejlett képkezelési rendszer:
- Aszinkron képfeltöltés
- Automatikus képfeldolgozás és optimalizálás
- Dinamikus képgaléria lightbox funkcióval
- Drag-and-drop képfeltöltési lehetőség
- Képek kategorizálása és rendszerezése

### 3.2. Interaktív Felhasználói Élmény
A felhasználói élmény fokozása érdekében implementált egyedi megoldások:
- Valós idejű form validáció AJAX technológiával
- Kedvencek kezelése kliens oldali tárolással (localStorage)
- Dinamikus kommentrendszer azonnali frissítéssel
- Reszponzív, modern dizájn Grid és Flexbox alapokon
- Custom animációk és átmenetek

### 3.3. Biztonság és Teljesítmény
Kiemelt figyelmet fordítottam a biztonsági szempontokra:
- SQL injection védelem parametrizált lekérdezésekkel
- XSS védelem input sanitization megoldással
- Biztonságos session kezelés
- Hatékony képtárolás és -optimalizálás
- CSRF tokenek használata

### 3.4. Adatbázis és Backend Architektúra
Modern, jól strukturált adatbázis és szerveroldali megoldások:
- MySQL adatbázis 4 kapcsolódó táblával
- RESTful API endpoints
- Hatékony query optimalizálás
- Moduláris kódszerkezet
- Clean code elvek követése

## Egyéni megvalósítások

### 1. Fejlett képkezelő rendszer
- Aszinkron képfeltöltés 
- Képek dinamikus betöltése és megjelenítése
- Beépített képgaléria lightbox funkcionalitással
- Képek törlésének lehetősége ajax kérésekkel

### 2. Interaktív felhasználói felület
- Valós idejű form validáció
- Kedvencek kezelése localStorage-dzsel
- Dinamikus kommentszekció
- Smooth scrolling és animációk

### 3. Fejlett keresési rendszer
- Full-text search a bejegyzések címében és tartalmában
- Azonnali keresési eredmények megjelenítése
- Keresési előzmények megőrzése

### 4. Biztonság
- SQL injection elleni védelem (parametrizált lekérdezések)
- XSS védelem (input sanitization)
- CSRF védelem
- Biztonságos fájlkezelés

## Technológiai stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Adatbázis**: SQLite
- **Templating**: EJS
- **Biztonság**: bcrypt, express-session
- **Fájlkezelés**: multer
- **UI Framework**: Bootstrap 5
