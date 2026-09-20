# Recyklačný dvor — MVP

Single-player strategický sim: riadiš malý recyklačný dvor (BRO + UCO).

## Čo je v MVP

- jeden dvor (pôdorys zón)
- frakcie **BRO** (kuchynský/bio odpad) a **UCO** (použité oleje)
- zmluvy s partnermi (gate fee + sankcie za nesplnený zvoz)
- 2 autá, vodiči, triediči
- ručné triedenie → predaj výstupu
- jednoduchý trh, reputácia, mzdy, utility
- externý servis áut pri opotrebení
- win: ~20 000 € a stabilná reputácia / lose: bankrot alebo reputácia 0

## Čo nie je v MVP

- textil, lapače, vlastná BPS
- deep HR / šatne / jedáleň
- autodielňa a ND katalóg
- viac areálov, coop

## Spustenie

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:43127](http://127.0.0.1:43127)

```bash
npm run build
```

## Presun na Windows Desktop

Repo: [github.com/silverminesro/recycle-game](https://github.com/silverminesro/recycle-game)

Presné PowerShell príkazy: pozri [PRESUN.md](./PRESUN.md).

## Ako hrať (30 sekúnd)

1. **Otvoriť dvor**
2. Podpíš 1–2 zmluvy
3. Pošli správne auto (BRO truck / UCO van)
4. Triediči spracujú surovinu automaticky na priradenej linke
5. Predaj výstup, sleduj cashflow a reputáciu
6. Rýchlosť: ⏸ / 1× / 2×

## Stack

Vite · React · TypeScript · Tailwind CSS · Zustand
