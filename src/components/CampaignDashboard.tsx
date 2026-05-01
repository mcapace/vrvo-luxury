import type { CampaignReport } from '../data/bigSmokeMiami'

function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US').format(n)
}

function formatPercent(n: number, fractionDigits = 1) {
  return `${n.toFixed(fractionDigits)}%`
}

function formatDate(iso: string) {
  const d = new Date(iso + 'T12:00:00')
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(d)
}

export function CampaignDashboard({ campaign }: { campaign: CampaignReport }) {
  const { delivery } = campaign
  const deliveredImp = Math.round(
    (delivery.impressionsPurchased * delivery.pctDelivered) / 100,
  )

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-stone-200 pb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-amber-900/80">
          Campaign reporting
        </p>
        <h1 className="mt-2 font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
          {campaign.name}
        </h1>
        <p className="mt-3 max-w-3xl text-stone-600">
          {campaign.flight.summary}{' '}
          <span className="whitespace-nowrap text-stone-800">
            Flight start {formatDate(campaign.flight.launched)}
          </span>
          {campaign.flight.inMarket ? (
            <span className="ml-2 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800 ring-1 ring-emerald-600/20 ring-inset">
              In market
            </span>
          ) : null}
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="CPM (contract)"
          value={`$${delivery.cpmUsd.toFixed(2)}`}
          hint="Pre-purchased rate"
        />
        <KpiCard
          label="Impressions (order)"
          value={formatNumber(delivery.impressionsPurchased)}
          hint="Total booked volume"
        />
        <KpiCard
          label="Delivered"
          value={formatPercent(delivery.pctDelivered, 0)}
          hint={`~${formatNumber(deliveredImp)} imp.`}
        />
        <KpiCard
          label="CTR"
          value={formatPercent(campaign.performance.ctrPct, 3)}
          hint="Display benchmark: strong"
        />
      </section>

      <div className="mt-6 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-stone-800">Delivery progress</span>
          <span className="text-sm tabular-nums text-stone-500">
            {formatPercent(delivery.pctDelivered, 0)} of booked
          </span>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100"
          role="progressbar"
          aria-valuenow={delivery.pctDelivered}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Percent of impressions delivered"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-700 to-amber-600 transition-[width] duration-500"
            style={{ width: `${Math.min(100, delivery.pctDelivered)}%` }}
          />
        </div>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <article className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl text-stone-900">Geography</h2>
          <p className="mt-2 text-sm text-stone-600">{campaign.geo.headline}</p>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                Primary (South Florida)
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {campaign.geo.primaryMarkets.map((m) => (
                  <li
                    key={m}
                    className="rounded-md bg-stone-100 px-2.5 py-1 text-sm text-stone-800"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                Drive-in markets
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {campaign.geo.driveInMarkets.map((m) => (
                  <li
                    key={m}
                    className="rounded-md bg-amber-50 px-2.5 py-1 text-sm text-amber-950 ring-1 ring-amber-900/10 ring-inset"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl text-stone-900">Measurement</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {campaign.performance.measurementNote}
          </p>
        </article>
      </section>

      <section className="mt-10 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl text-stone-900">Creative & landing</h2>
        <p className="mt-2 text-sm text-stone-600">{campaign.creative.environments}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {campaign.creative.sizes.map((s) => (
            <span
              key={s}
              className="rounded border border-stone-200 bg-stone-50 px-2 py-1 font-mono text-xs text-stone-800"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-stone-600">{campaign.tracking.description}</p>
        <div className="mt-3 break-all rounded-lg bg-stone-50 p-3 text-sm">
          <a
            href={campaign.tracking.clickthroughUrl}
            className="text-amber-900 underline decoration-amber-900/30 underline-offset-2 hover:decoration-amber-900"
            target="_blank"
            rel="noreferrer"
          >
            {campaign.tracking.clickthroughUrl}
          </a>
        </div>
        <p className="mt-4 text-sm">
          <a
            href={campaign.creative.assetsFolderUrl}
            className="font-medium text-amber-900 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Open creative assets folder (Drive) →
          </a>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-stone-900">Audience strategy</h2>
        <div className="mt-6 space-y-10">
          {campaign.audiences.map((bucket) => (
            <article key={bucket.id} className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-stone-900">{bucket.label}</h3>
              <p className="mt-1 text-sm text-stone-600">{bucket.description}</p>
              <ol className="mt-5 space-y-5 border-t border-stone-100 pt-5">
                {bucket.cohorts.map((c, i) => (
                  <li key={c.title} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-semibold text-stone-600">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-stone-900">{c.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-14 border-t border-stone-200 pt-8 text-center text-xs text-stone-500">
        Fixture data for dashboard testing — {campaign.id}
      </footer>
    </div>
  )
}

function KpiCard({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint: string
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-2 font-serif text-2xl tabular-nums text-stone-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-stone-500">{hint}</p>
    </div>
  )
}
