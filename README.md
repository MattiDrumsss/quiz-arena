# QUIZ ARENA

Sito statico (HTML, CSS, JavaScript): nessun database, nessuna API, nessuna registrazione.
Nomi squadre, audio e domande aggiunte restano nel LocalStorage del browser.

## Provarlo sul PC
Estrai lo ZIP e apri `index.html` con doppio clic.

## Caricarlo su GitHub
1. Estrai lo ZIP: clic destro sul file, poi "Estrai tutto..." (Windows) o doppio clic (Mac).
2. Su github.com premi **+** in alto a destra, poi **New repository**.
3. In **Repository name** scrivi `quiz-arena`, lascia **Public**, premi **Create repository**.
4. Premi il link **uploading an existing file**.
5. Apri la cartella estratta e trascina nella pagina TUTTO il contenuto (`index.html`, `vercel.json`, `README.md`, cartelle `css` e `js`), non la cartella contenitore.
6. Premi **Commit changes**.

## Pubblicarlo su Vercel
1. Vai su vercel.com e accedi con **Continue with GitHub**.
2. Premi **Add New...**, poi **Project**.
3. Accanto a `quiz-arena` premi **Import**.
4. **Framework Preset**: **Other**. Lascia vuoti **Build Command** e **Output Directory**; **Root Directory** resta `./`.
5. Premi **Deploy**. Alla fine premi **Continue to Dashboard** e **Visit** per aprire il sito.

## GUESS THE SONG: aggiungere canzoni
1. Metti il file audio (mp3, m4a o ogg) nella cartella `songs/audio/` e la copertina (jpg, png o webp, meglio quadrata) in `songs/covers/`.
2. Apri `songs/songs.json` e aggiungi una voce per ogni canzone, separate da virgola:
```
[
  {
    "id": "song_001",
    "title": "Titolo della canzone",
    "artist": "Nome dell'artista",
    "audio": "songs/audio/canzone_01.mp3",
    "cover": "songs/covers/canzone_01.jpg"
  }
]
```
- `id` deve essere unico. `cover` è facoltativa: se manca o non si apre, compare una copertina dorata generica.
- Spazi, accenti e caratteri speciali nei nomi dei file vanno bene.
- Il catalogo parte vuoto: non ci sono canzoni di esempio.
- Il catalogo si legge solo dal sito pubblicato su Vercel o da un server locale (per esempio `python3 -m http.server` nella cartella del progetto). Aprendo `index.html` con doppio clic gli altri giochi funzionano, ma GUESS THE SONG non può leggere `songs.json`.
- Dopo aver aggiunto file e voci: su GitHub premi **Add file**, **Upload files**, trascina `songs` e premi **Commit changes**.

## Stanze online (GIOCO + REGIA)
Per usare due dispositivi collegati serve configurare Firebase (gratis): segui **GUIDA-STANZE.md**. Senza configurazione QUIZ ARENA funziona come prima su un solo dispositivo.
