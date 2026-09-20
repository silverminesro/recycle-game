import type { Contract, GameState, Vehicle, Worker, Zone } from './types'

export const DAY_MINUTES = 12 * 60 // 06:00–18:00 working day simulated as 12h
export const TICK_MS = 100 // wall clock per tick at 1x
export const MINUTES_PER_TICK = 1 // 1 game minute per tick at 1x → ~12 min real for full day at 1x; with 100ms = 72s real at 1x. Better: more minutes per tick.

// At 1x: 1 tick = 2 game minutes, tick every 100ms → 360 ticks/day → 36s real day. Good for MVP.
export const GAME_MINUTES_PER_TICK = 2

export const START_MONEY = 8500
export const WIN_MONEY = 20000
export const WIN_DAY = 10
export const BANKRUPT = -500

export const MARKET_BASE = { bro: 42, uco: 78 }

const names = ['Marek', 'Jana', 'Peter', 'Lucia', 'Tomáš', 'Eva', 'Martin', 'Zuzana']

export function createInitialZones(): Zone[] {
  return [
    { id: 'gate', label: 'Brána + váha', x: 0, y: 2, w: 2, h: 2, rawBro: 0, rawUco: 0, sortedBro: 0, sortedUco: 0, capacity: 0 },
    { id: 'unload', label: 'Prekládka', x: 2, y: 2, w: 2, h: 2, rawBro: 0, rawUco: 0, sortedBro: 0, sortedUco: 0, capacity: 40 },
    { id: 'bro_boxes', label: 'BRO boxy', x: 4, y: 0, w: 2, h: 2, rawBro: 0, rawUco: 0, sortedBro: 0, sortedUco: 0, capacity: 80 },
    { id: 'uco_tanks', label: 'UCO IBC', x: 4, y: 2, w: 2, h: 2, rawBro: 0, rawUco: 0, sortedBro: 0, sortedUco: 0, capacity: 60 },
    { id: 'sort_bro', label: 'Triedenie BRO', x: 6, y: 0, w: 2, h: 2, rawBro: 0, rawUco: 0, sortedBro: 0, sortedUco: 0, capacity: 30 },
    { id: 'sort_uco', label: 'Filtrácia UCO', x: 6, y: 2, w: 2, h: 2, rawBro: 0, rawUco: 0, sortedBro: 0, sortedUco: 0, capacity: 30 },
    { id: 'out_bro', label: 'Výstup BRO', x: 8, y: 0, w: 2, h: 2, rawBro: 0, rawUco: 0, sortedBro: 0, sortedUco: 0, capacity: 100 },
    { id: 'out_uco', label: 'Výstup UCO', x: 8, y: 2, w: 2, h: 2, rawBro: 0, rawUco: 0, sortedBro: 0, sortedUco: 0, capacity: 100 },
    { id: 'parking', label: 'Parkovisko', x: 0, y: 0, w: 2, h: 2, rawBro: 0, rawUco: 0, sortedBro: 0, sortedUco: 0, capacity: 0 },
    { id: 'wash', label: 'Umývanie', x: 2, y: 0, w: 2, h: 2, rawBro: 0, rawUco: 0, sortedBro: 0, sortedUco: 0, capacity: 0 },
    { id: 'office', label: 'Kancelária', x: 0, y: 4, w: 4, h: 1, rawBro: 0, rawUco: 0, sortedBro: 0, sortedUco: 0, capacity: 0 },
  ]
}

export function createInitialVehicles(): Vehicle[] {
  return [
    {
      id: 'v1',
      name: 'Dodávka SM-01',
      type: 'van',
      fraction: 'UCO',
      capacity: 12,
      load: 0,
      status: 'idle',
      contractId: null,
      progress: 0,
      wear: 8,
      tripMinutes: 0,
    },
    {
      id: 'v2',
      name: 'Kontajner SM-02',
      type: 'truck',
      fraction: 'BRO',
      capacity: 18,
      load: 0,
      status: 'idle',
      contractId: null,
      progress: 0,
      wear: 12,
      tripMinutes: 0,
    },
  ]
}

export function createInitialWorkers(): Worker[] {
  return [
    { id: 'w1', name: names[0], role: 'driver', status: 'idle', zoneId: null, wagePerDay: 95, vehicleId: 'v1' },
    { id: 'w2', name: names[1], role: 'driver', status: 'idle', zoneId: null, wagePerDay: 110, vehicleId: 'v2' },
    { id: 'w3', name: names[2], role: 'sorter', status: 'idle', zoneId: 'sort_bro', wagePerDay: 78, vehicleId: null },
    { id: 'w4', name: names[3], role: 'sorter', status: 'idle', zoneId: 'sort_uco', wagePerDay: 78, vehicleId: null },
  ]
}

export function createInitialContracts(): Contract[] {
  return [
    {
      id: 'c1',
      partner: 'Jedáleň Púchov',
      kind: 'firma',
      fraction: 'BRO',
      volumePerVisit: 14,
      distanceKm: 8,
      gateFee: 55,
      sellPriceHint: MARKET_BASE.bro,
      visitsPerDay: 2,
      visitsDoneToday: 0,
      missedToday: 0,
      status: 'available',
      deadlineHour: 14,
      contaminationChance: 0.12,
    },
    {
      id: 'c2',
      partner: 'Gastro Nimnica',
      kind: 'firma',
      fraction: 'UCO',
      volumePerVisit: 8,
      distanceKm: 12,
      gateFee: 40,
      sellPriceHint: MARKET_BASE.uco,
      visitsPerDay: 1,
      visitsDoneToday: 0,
      missedToday: 0,
      status: 'available',
      deadlineHour: 16,
      contaminationChance: 0.08,
    },
    {
      id: 'c3',
      partner: 'Obec Dohňany',
      kind: 'obec',
      fraction: 'BRO',
      volumePerVisit: 16,
      distanceKm: 18,
      gateFee: 70,
      sellPriceHint: MARKET_BASE.bro,
      visitsPerDay: 1,
      visitsDoneToday: 0,
      missedToday: 0,
      status: 'available',
      deadlineHour: 15,
      contaminationChance: 0.18,
    },
  ]
}

export function createInitialState(): GameState {
  return {
    day: 1,
    hour: 6,
    minute: 0,
    speed: 0,
    money: START_MONEY,
    reputation: 55,
    zones: createInitialZones(),
    vehicles: createInitialVehicles(),
    workers: createInitialWorkers(),
    contracts: createInitialContracts(),
    market: { ...MARKET_BASE },
    log: [
      {
        id: 'l0',
        day: 1,
        hour: 6,
        minute: 0,
        text: 'Dvor otvorený. Podpíš zmluvy, pošli autá na zvoz a triedičov do práce.',
        tone: 'info',
      },
    ],
    selectedId: null,
    selectedKind: null,
    gameOver: false,
    victory: false,
    started: false,
  }
}

export function formatClock(hour: number, minute: number): string {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

export function zoneFill(zone: Zone): number {
  return zone.rawBro + zone.rawUco + zone.sortedBro + zone.sortedUco
}
