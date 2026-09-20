export type Fraction = 'BRO' | 'UCO'
export type Speed = 0 | 1 | 2
export type VehicleStatus = 'idle' | 'en_route' | 'loading' | 'returning' | 'service'
export type WorkerStatus = 'idle' | 'sorting' | 'loading' | 'sick'
export type ContractStatus = 'available' | 'active' | 'failed' | 'completed'

export type ZoneId =
  | 'gate'
  | 'unload'
  | 'bro_boxes'
  | 'uco_tanks'
  | 'sort_bro'
  | 'sort_uco'
  | 'out_bro'
  | 'out_uco'
  | 'parking'
  | 'wash'
  | 'office'

export interface Zone {
  id: ZoneId
  label: string
  x: number
  y: number
  w: number
  h: number
  rawBro: number
  rawUco: number
  sortedBro: number
  sortedUco: number
  capacity: number
}

export interface Vehicle {
  id: string
  name: string
  type: 'van' | 'truck'
  fraction: Fraction
  capacity: number
  load: number
  status: VehicleStatus
  contractId: string | null
  progress: number
  wear: number
  tripMinutes: number
}

export interface Worker {
  id: string
  name: string
  role: 'sorter' | 'driver'
  status: WorkerStatus
  zoneId: ZoneId | null
  wagePerDay: number
  vehicleId: string | null
}

export interface Contract {
  id: string
  partner: string
  kind: 'obec' | 'firma'
  fraction: Fraction
  volumePerVisit: number
  distanceKm: number
  gateFee: number
  sellPriceHint: number
  visitsPerDay: number
  visitsDoneToday: number
  missedToday: number
  status: ContractStatus
  deadlineHour: number
  contaminationChance: number
}

export interface LogEntry {
  id: string
  day: number
  hour: number
  minute: number
  text: string
  tone: 'info' | 'ok' | 'warn' | 'danger'
}

export interface MarketPrices {
  bro: number
  uco: number
}

export interface GameState {
  day: number
  hour: number
  minute: number
  speed: Speed
  money: number
  reputation: number
  zones: Zone[]
  vehicles: Vehicle[]
  workers: Worker[]
  contracts: Contract[]
  market: MarketPrices
  log: LogEntry[]
  selectedId: string | null
  selectedKind: 'zone' | 'vehicle' | 'worker' | 'contract' | null
  gameOver: boolean
  victory: boolean
  started: boolean
}
