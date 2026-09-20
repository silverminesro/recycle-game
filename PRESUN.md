# Presun na Desktop (Windows)

Cloud agent **nemá prístup** k `C:\Users\Boris\Desktop\recycle game`.
Projekt je na GitHube a v ZIP artefakte — na PC spusti toto.

## Odporúčané: git clone

V **PowerShell**:

```powershell
cd $env:USERPROFILE\Desktop
git clone https://github.com/silverminesro/recycle-game.git "recycle game"
cd "recycle game"
npm install
npm run dev
```

Hra: [http://127.0.0.1:43127](http://127.0.0.1:43127)

Ak priečinok `recycle game` už existuje a je prázdny/nekompletný:

```powershell
cd $env:USERPROFILE\Desktop
Remove-Item -Recurse -Force "recycle game" -ErrorAction SilentlyContinue
git clone https://github.com/silverminesro/recycle-game.git "recycle game"
cd "recycle game"
npm install
npm run dev
```

## Alternatíva: ZIP

1. Stiahni `recycle-game-mvp.zip` z Cursor artefaktov tohto runu.
2. V PowerShell:

```powershell
cd $env:USERPROFILE\Desktop
Expand-Archive -Path "$env:USERPROFILE\Downloads\recycle-game-mvp.zip" -DestinationPath "recycle game" -Force
cd "recycle game"
npm install
npm run dev
```

(Uprav cestu k ZIP, ak je inde než Downloads.)

## Repo

- GitHub: https://github.com/silverminesro/recycle-game
