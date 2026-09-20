import { formatClock } from '../game/initial'
import { useGame } from '../game/store'

export function TopBar() {
  const day = useGame((s) => s.day)
  const hour = useGame((s) => s.hour)
  const minute = useGame((s) => s.minute)
  const money = useGame((s) => s.money)
  const reputation = useGame((s) => s.reputation)
  const speed = useGame((s) => s.speed)
  const market = useGame((s) => s.market)
  const setSpeed = useGame((s) => s.setSpeed)
  const started = useGame((s) => s.started)

  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-panel-edge bg-panel/90 px-4 py-2 backdrop-blur">
      <div className="mr-2">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted">Silver Yard</div>
        <div className="font-semibold tracking-wide">Recyklačný dvor · MVP</div>
      </div>

      <Stat label="Deň" value={`${day}`} />
      <Stat label="Čas" value={formatClock(hour, minute)} mono />
      <Stat
        label="Hotovosť"
        value={`${Math.round(money).toLocaleString('sk-SK')} €`}
        accent={money < 1500 ? 'danger' : money > 12000 ? 'ok' : undefined}
      />
      <Stat
        label="Reputácia"
        value={`${reputation}`}
        accent={reputation < 35 ? 'danger' : reputation > 70 ? 'ok' : undefined}
      />
      <Stat label="BRO trh" value={`${market.bro} €/t`} accent="bro" />
      <Stat label="UCO trh" value={`${market.uco} €/t`} accent="uco" />

      <div className="relative z-30 ml-auto flex items-center gap-1.5" data-testid="speed-controls">
        {([0, 1, 2] as const).map((s) => (
          <button
            key={s}
            type="button"
            data-testid={`speed-${s}`}
            aria-pressed={speed === s}
            disabled={!started && s !== 0}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setSpeed(s)
            }}
            className={`min-h-10 min-w-10 rounded px-3.5 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
              speed === s
                ? 'bg-ok text-yard-deep'
                : 'bg-yard-deep text-muted hover:text-ink border border-panel-edge'
            }`}
          >
            {s === 0 ? '⏸' : s === 1 ? '1×' : '2×'}
          </button>
        ))}
      </div>
    </header>
  )
}

function Stat({
  label,
  value,
  mono,
  accent,
}: {
  label: string
  value: string
  mono?: boolean
  accent?: 'ok' | 'danger' | 'bro' | 'uco'
}) {
  const color =
    accent === 'ok'
      ? 'text-ok'
      : accent === 'danger'
        ? 'text-danger'
        : accent === 'bro'
          ? 'text-bro-bright'
          : accent === 'uco'
            ? 'text-uco-bright'
            : 'text-ink'

  return (
    <div className="rounded border border-panel-edge bg-yard-deep/70 px-3 py-1">
      <div className="text-[10px] uppercase tracking-wider text-muted">{label}</div>
      <div className={`text-sm font-semibold ${color} ${mono ? 'font-mono' : ''}`}>{value}</div>
    </div>
  )
}
