import { zoneFill } from '../game/initial'
import { useGame } from '../game/store'
import type { Zone } from '../game/types'

const COL = 40
const ROW = 52

export function YardView() {
  const zones = useGame((s) => s.zones)
  const vehicles = useGame((s) => s.vehicles)
  const workers = useGame((s) => s.workers)
  const selectedId = useGame((s) => s.selectedId)
  const select = useGame((s) => s.select)

  const width = 10 * COL
  const height = 5 * ROW

  return (
    <div className="relative h-full min-h-[320px] overflow-auto rounded-lg border border-panel-edge bg-yard-deep/80 p-3">
      <div className="mb-2 flex items-end justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            Pôdorys dvora
          </h2>
          <p className="text-xs text-muted">Klikni na zónu. Tok: brána → sklad → triedenie → výstup.</p>
        </div>
        <Legend />
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full max-w-4xl"
        role="img"
        aria-label="Pôdorys recyklačného dvora"
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2f3a34" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid)" />
        <rect width={width} height={height} fill="#243028" opacity="0.55" />

        {zones.map((zone) => (
          <ZoneRect
            key={zone.id}
            zone={zone}
            selected={selectedId === zone.id}
            onSelect={() => select('zone', zone.id)}
          />
        ))}

        {/* vehicles on parking */}
        {vehicles.map((v, i) => {
          const busy = v.status !== 'idle'
          const x = 12 + (i % 2) * 34
          const y = 14 + Math.floor(i / 2) * 28
          return (
            <g
              key={v.id}
              transform={`translate(${x}, ${y})`}
              className="cursor-pointer"
              onClick={() => select('vehicle', v.id)}
            >
              <rect
                width="28"
                height="16"
                rx="2"
                fill={v.fraction === 'BRO' ? '#6b8f4e' : '#c4a035'}
                opacity={busy ? 0.35 : 0.95}
                stroke={selectedId === v.id ? '#e8ebe6' : '#1a211c'}
                strokeWidth="1.5"
              />
              <text x="14" y="11" textAnchor="middle" fontSize="7" fill="#1a211c" fontWeight="700">
                {v.type === 'van' ? 'VAN' : 'TRK'}
              </text>
              {busy && (
                <text x="14" y="28" textAnchor="middle" fontSize="7" fill="#d9773a">
                  {v.status === 'en_route'
                    ? '→'
                    : v.status === 'returning'
                      ? '←'
                      : 'SRV'}
                </text>
              )}
            </g>
          )
        })}

        {/* sorter dots */}
        {workers
          .filter((w) => w.role === 'sorter' && w.zoneId)
          .map((w, i) => {
            const zone = zones.find((z) => z.id === w.zoneId)
            if (!zone) return null
            const zx = zone.x * COL + 10 + (i % 2) * 12
            const zy = zone.y * ROW + zone.h * ROW - 14
            return (
              <circle
                key={w.id}
                cx={zx}
                cy={zy}
                r="4"
                fill={w.status === 'sorting' ? '#8fbf62' : '#9aa89c'}
                className="cursor-pointer"
                onClick={() => select('worker', w.id)}
              />
            )
          })}
      </svg>
    </div>
  )
}

function ZoneRect({
  zone,
  selected,
  onSelect,
}: {
  zone: Zone
  selected: boolean
  onSelect: () => void
}) {
  const x = zone.x * COL
  const y = zone.y * ROW
  const w = zone.w * COL
  const h = zone.h * ROW
  const fill = zoneColor(zone.id)
  const stock = zoneFill(zone)
  const pct = zone.capacity > 0 ? stock / zone.capacity : 0

  return (
    <g className="cursor-pointer" onClick={onSelect}>
      <rect
        x={x + 2}
        y={y + 2}
        width={w - 4}
        height={h - 4}
        rx="4"
        fill={fill}
        stroke={selected ? '#e8ebe6' : '#1a211c'}
        strokeWidth={selected ? 2.5 : 1}
        opacity="0.92"
      />
      {zone.capacity > 0 && (
        <rect
          x={x + 6}
          y={y + h - 12}
          width={Math.max(2, (w - 12) * Math.min(1, pct))}
          height="4"
          fill={pct > 0.85 ? '#c44b3c' : '#e8ebe6'}
          opacity="0.85"
        />
      )}
      <text x={x + 8} y={y + 16} fontSize="9" fill="#e8ebe6" fontWeight="600">
        {zone.label}
      </text>
      {stock > 0 && (
        <text x={x + 8} y={y + 30} fontSize="8" fill="#c9d4cc">
          {stock.toFixed(1)} t
        </text>
      )}
    </g>
  )
}

function zoneColor(id: string): string {
  switch (id) {
    case 'bro_boxes':
    case 'sort_bro':
    case 'out_bro':
      return '#3f5a32'
    case 'uco_tanks':
    case 'sort_uco':
    case 'out_uco':
      return '#5a4a1e'
    case 'gate':
      return '#4a5850'
    case 'unload':
      return '#3a4640'
    case 'parking':
      return '#2f3a34'
    case 'wash':
      return '#2f4450'
    case 'office':
      return '#3d4a55'
    default:
      return '#364038'
  }
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-2 text-[10px] text-muted">
      <span className="inline-flex items-center gap-1">
        <i className="inline-block h-2 w-2 rounded-sm bg-bro" /> BRO
      </span>
      <span className="inline-flex items-center gap-1">
        <i className="inline-block h-2 w-2 rounded-sm bg-uco" /> UCO
      </span>
      <span className="inline-flex items-center gap-1">
        <i className="inline-block h-2 w-2 rounded-full bg-bro-bright" /> triedič
      </span>
    </div>
  )
}
