# MVP — Recyklačná firma (First Playable)

**Dátum:** 2026-09-20  
**Stav:** implementované v tomto repo (`recycle-tycoon`)

## Cieľ slice

Hráč prežije niekoľko herných dní s jedným dvorom: zmluvy → autá → triedenie → predaj.

## Obsahuje

| Systém | Rozsah |
|---|---|
| Dvor | zóny gate, unload, BRO/UCO sklad, triedenie, výstup, parking, wash, office |
| Frakcie | BRO, UCO |
| Flotila | 1 van (UCO), 1 truck (BRO), opotrebenie, externý servis |
| HR | 2 vodiči + 2–4 triediči, mzdy, priradenie na frakciu |
| Zmluvy | max 2 aktívne, gate fee, denné zvozy, sankcie, výpoveď |
| Ekonomika | hotovosť, denný trh, utility, bankrot / víťazstvo |
| Čas | 06:00–18:00, 1× / 2× / pauza |

## Mimo MVP

textil, lapače, BPS, multi-yard, deep údržba/ND, šatne/jedáleň, 4 zmeny, coop

## Win / Lose

- **Win:** ≥ 20 000 € a reputácia ≥ 50 po dni 10, alebo skorší zisk ≥ 20 000 € pri reputácii ≥ 60 (od dňa 5)
- **Lose:** hotovosť ≤ −500 € alebo reputácia ≤ 0
