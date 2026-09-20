import { useEffect } from 'react'
import { SidePanels } from './components/SidePanels'
import { TopBar } from './components/TopBar'
import { YardView } from './components/YardView'
import { TICK_MS, WIN_DAY, WIN_MONEY } from './game/initial'
import { useGame } from './game/store'

export default function App() {
  const tick = useGame((s) => s.tick)
  const started = useGame((s) => s.started)
  const startGame = useGame((s) => s.startGame)
  const gameOver = useGame((s) => s.gameOver)
  const victory = useGame((s) => s.victory)
  const reset = useGame((s) => s.reset)
  const speed = useGame((s) => s.speed)

  useEffect(() => {
    if (!started || speed === 0) return
    const id = window.setInterval(() => tick(), TICK_MS)
    return () => window.clearInterval(id)
  }, [started, speed, tick])

  return (
    <div className="relative flex h-full flex-col">
      <TopBar />

      <main className="grid min-h-0 flex-1 gap-3 p-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.9fr)]">
        <YardView />
        <SidePanels />
      </main>

      {!started && (
        <Overlay>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Recyklačný dvor</h1>
          <p className="mt-2 max-w-lg text-sm text-muted">
            MVP single-player slice: jeden dvor v regióne Púchov, frakcie{' '}
            <strong className="text-bro-bright">BRO</strong> a{' '}
            <strong className="text-uco-bright">UCO</strong>, zmluvy, autá, ručné triedenie a
            predaj. Cieľ: udržať cashflow a reputáciu — ideálne {WIN_MONEY.toLocaleString('sk-SK')}{' '}
            € do dňa {WIN_DAY}.
          </p>
          <ol className="mt-4 max-w-lg list-decimal space-y-1 pl-5 text-sm text-muted">
            <li>Podpíš 1–2 zmluvy</li>
            <li>Pošli správne auto na zvoz</li>
            <li>Nechaj triedičov spracovať surovinu</li>
            <li>Predaj výstup, keď je cena dobrá</li>
          </ol>
          <button
            type="button"
            onClick={startGame}
            className="mt-6 rounded bg-ok px-5 py-2.5 text-sm font-semibold text-yard-deep hover:brightness-110"
          >
            Otvoriť dvor
          </button>
        </Overlay>
      )}

      {(gameOver || victory) && (
        <Overlay>
          <h2 className="text-2xl font-bold">{victory ? 'Cieľ splnený' : 'Firma padla'}</h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            {victory
              ? 'Dvor beží ako firma: zvoz, triedenie a odbyt držíš pohromade.'
              : 'Došli peniaze alebo reputácia. Skús menej zmlúv naraz a predávaj výstup skôr, než sa zaplní sklad.'}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded bg-ink px-5 py-2.5 text-sm font-semibold text-yard-deep"
          >
            Nová hra
          </button>
        </Overlay>
      )}
    </div>
  )
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl border border-panel-edge bg-panel p-6 shadow-2xl">
        {children}
      </div>
    </div>
  )
}
