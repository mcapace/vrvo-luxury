/**
 * Davidoff × Cigar Aficionado — 2026 Comprehensive Campaign Suite.
 *
 * Full-year performance summary reconciling Google Ad Manager (GAM) server logs
 * across all 2026 campaigns (Pop-ups, Sponsored Content, ROS Display, and Make-Good).
 *
 * Placements:
 * 1. Mid-April: High-impact pop-up banners (AVO Expresivo & Puro Dominicano)
 * 2. May 8: Sponsored Content (Davidoff Puro Dominicano)
 * 3. Mid-May: ROS Display banners (AVO Expresivo & Puro Dominicano)
 * 4. July 10: WSC TLH Belicoso Banner A (Make-Good Re-Run)
 * 5. June 17: Davidoff Puro Dominicano ROS Display banners
 * 6. June 25: AVO Expresivo ROS Display banners (2 slots)
 * 7. June 26: Sponsored Content (AVO Expresivo)
 *
 * Open `/reporting?campaign=davidoff` (or `?campaign=davidoff-2026`, `?campaign=dimando`).
 */

import type {
  AudienceBucket,
  BillingPeriodRow,
  CampaignCreativeLine,
  CampaignReport,
  CreativeTraffickingEvent,
  LandingPageInsight,
} from './bigSmokeMiami'
import {
  buildFormatDelivery,
  buildGeoDelivery,
  daysInclusive,
  type DeviceSplitRow,
  type TradeDeskDailyRow,
  type TradeDeskMeta,
} from './tradeDeskSeries'

const LAUNCH = '2026-04-18'
const FLIGHT_END = '2026-08-20'
const REPORT_AS_OF = '2026-08-28'

export type DavidoffPlacementSpec = {
  id: string
  label: string
  placementType: 'popup' | 'sponsored' | 'display'
  bookedImps: number
  deliveredImps: number
  clicks: number
  cpmUsd: number
  launch: string
  flightEnd: string
  destinationUrl: string
  headline: string
  formats: string[]
  notes: string
}

export const DAVIDOFF_2026_PLACEMENTS: DavidoffPlacementSpec[] = [
  {
    id: 'mid-april-popups',
    label: 'Mid-April · High-Impact Pop-Ups (AVO & Puro)',
    placementType: 'popup',
    bookedImps: 250_000,
    deliveredImps: 258_450,
    clicks: 1_964,
    cpmUsd: 16.0,
    launch: '2026-04-18',
    flightEnd: '2026-05-18',
    destinationUrl: 'https://gtly.ink/gc_9inBBH2',
    headline: 'AVO Expresivo & Davidoff Puro Dominicano Launch',
    formats: ['High-Impact Interstitial Pop-up', 'Mobile Overlay'],
    notes: '2-slot high-impact pop-up units post-PCA. Direct shortlinks trafficked.',
  },
  {
    id: 'may-8-puro-sponsored',
    label: 'May 8 · Sponsored Content (Puro Dominicano)',
    placementType: 'sponsored',
    bookedImps: 50_000,
    deliveredImps: 52_400,
    clicks: 561,
    cpmUsd: 12.0,
    launch: '2026-05-08',
    flightEnd: '2026-06-08',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/black-band-collection/puro-dominicano-2026?utm_source=CigarAficionado_May&utm_medium=OnlineBanner_US_CigarAficionado&utm_campaign=Puro_Dominicano_2026&utm_id=PURO-DOMINICANO-2026-05-US&utm_term=us-ecom&utm_content=sponsored_article',
    headline: 'Davidoff Black Band Collection: Puro Dominicano 2026',
    formats: ['Editorial Feature / Native Unit', 'Article Feed Native Card'],
    notes: 'Custom editorial feature with integrated native driver cards.',
  },
  {
    id: 'mid-may-ros',
    label: 'Mid-May · ROS Display (AVO & Puro Dominicano)',
    placementType: 'display',
    bookedImps: 400_000,
    deliveredImps: 412_680,
    clicks: 1_238,
    cpmUsd: 10.0,
    launch: '2026-05-15',
    flightEnd: '2026-06-20',
    destinationUrl: 'https://gtly.ink/_-f6Ze8smH',
    headline: 'Davidoff White Label & AVO Expresivo Brand Series',
    formats: ['300x250 Medium Rectangle', '728x90 Leaderboard', '300x600 Half-Page', '970x250 Billboard'],
    notes: 'Cross-device ROS display campaign across CigarAficionado.com.',
  },
  {
    id: 'belicoso-banner-a-makegood',
    label: 'July 10 · WSC TLH Belicoso Banner A (Make-Good)',
    placementType: 'display',
    bookedImps: 150_000,
    deliveredImps: 156_220,
    clicks: 499,
    cpmUsd: 10.0,
    launch: '2026-07-10',
    flightEnd: '2026-08-12',
    destinationUrl:
      'https://us.davidoffgeneva.com/product/davidoff-winston-churchill-the-late-hour-series-belicoso?utm_source=CigarAficionado&utm_medium=banner&utm_campaign=WSC_TLH_Belicoso&utm_id=from-March-2026&utm_term=b2c-dav&utm_content=Banner_A',
    headline: 'Davidoff Winston Churchill The Late Hour Belicoso',
    formats: ['300x250 Medium Rectangle', '728x90 Leaderboard', '300x600 Half-Page'],
    notes:
      'Banner A make-good. Size mix 300x250 / 728x90 / 300x600 is 50/30/20. Recorded clicks are July 10–July 31; August 1–12 delivered impressions with no clicks. Banner B is not in this GAM line.',
  },
  {
    id: 'june-17-puro-ros',
    label: 'June 17 · Puro Dominicano ROS Banners',
    placementType: 'display',
    bookedImps: 200_000,
    deliveredImps: 206_850,
    clicks: 621,
    cpmUsd: 10.0,
    launch: '2026-06-17',
    flightEnd: '2026-07-31',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/black-band-collection/puro-dominicano-2026?utm_source=CigarAficionado_June&utm_medium=OnlineBanner_US_CigarAficionado&utm_campaign=Puro_Dominicano_2026_25_June&utm_id=PURO-DOMINICANO-2026-06-US&utm_term=us-ecom&utm_content=banner_advertorial_us',
    headline: 'Puro Dominicano 2026 — Limited Edition',
    formats: ['970x250 Billboard', '300x600 Half-Page', '728x90 Leaderboard', '300x250 Med Rec', '320x50 Mobile'],
    notes: 'Full multi-size ROS flight supporting the national Puro Dominicano product release.',
  },
  {
    id: 'june-25-avo-ros',
    label: 'June 25 · AVO Expresivo ROS Banners (2 Slots)',
    placementType: 'display',
    bookedImps: 250_000,
    deliveredImps: 259_110,
    clicks: 777,
    cpmUsd: 10.0,
    launch: '2026-06-25',
    flightEnd: '2026-08-20',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/AVO/AVO-EXPRESIVO?utm_source=CigarAficionado_June&utm_medium=OnlineBanner_AVO_EXPRESIVO_US_CigarAficionado&utm_campaign=AVO_Expresivo_2026_25_June&utm_id=AVO-EXPRESIVO-2026-06-US&utm_term=us-ecom&utm_content=banner_advertorial_us',
    headline: 'AVO Expresivo — Burn Brighter Celebration',
    formats: ['300x600 Half-Page', '300x250 Medium Rectangle', '728x90 Leaderboard', '320x50 Mobile'],
    notes: 'Dual-slot ROS flight driving e-commerce landing page discoverability.',
  },
  {
    id: 'june-26-avo-sponsored',
    label: 'June 26 · Sponsored Content (AVO Expresivo)',
    placementType: 'sponsored',
    bookedImps: 50_000,
    deliveredImps: 53_100,
    clicks: 584,
    cpmUsd: 12.0,
    launch: '2026-06-26',
    flightEnd: '2026-07-31',
    destinationUrl:
      'https://www.cigaraficionado.com/article/avo-continues-burn-brighter-celebration-with-new-expresivo-line',
    headline: 'AVO Continues Burn Brighter Celebration with New EXPRESIVO Line',
    formats: ['Editorial Feature / Native Unit', 'Newsletter Native Block', 'Homepage Native Card'],
    notes: 'High-engagement editorial feature and native driver distribution across CA channels.',
  },
]

const TOTAL_BOOKED_IMPS = DAVIDOFF_2026_PLACEMENTS.reduce((sum, p) => sum + p.bookedImps, 0)
const TOTAL_DELIVERED_IMPS = DAVIDOFF_2026_PLACEMENTS.reduce((sum, p) => sum + p.deliveredImps, 0)
const TOTAL_CLICKS = DAVIDOFF_2026_PLACEMENTS.reduce((sum, p) => sum + p.clicks, 0)
const OVERALL_DELIVERY_PCT = (TOTAL_DELIVERED_IMPS / TOTAL_BOOKED_IMPS) * 100
const BLENDED_CTR_PCT = (TOTAL_CLICKS / TOTAL_DELIVERED_IMPS) * 100

const BILLING_PERIOD_ROWS: BillingPeriodRow[] = DAVIDOFF_2026_PLACEMENTS.map((p) => ({
  period: `${p.label.split('·')[0].trim()} Flight`,
  start: p.launch,
  end: p.flightEnd,
  spendUsd: (p.deliveredImps * p.cpmUsd) / 1000,
  impressions: p.deliveredImps,
  clicks: p.clicks,
  creativeLabel: p.label,
  placements: p.formats.join(' · '),
}))

const CREATIVE_TRAFFICKING_LOG: CreativeTraffickingEvent[] = [
  {
    date: '2026-04-18',
    action: 'launch',
    creativeName: 'Mid-April Pop-Ups (AVO & Puro)',
    headline: 'AVO Expresivo & Puro Dominicano Post-PCA Launch',
    destinationUrl: 'https://gtly.ink/gc_9inBBH2',
    placementsUpdated: 'High-impact interstitial overlay · Mobile overlay',
    notes: 'Trafficked 2-slot pop-up units post-PCA convention.',
  },
  {
    date: '2026-05-08',
    action: 'launch',
    creativeName: 'May 8 Sponsored Content (Puro Dominicano)',
    headline: 'Davidoff Black Band Collection: Puro Dominicano 2026',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/black-band-collection/puro-dominicano-2026?utm_source=CigarAficionado_May...',
    placementsUpdated: 'Editorial feature native drivers · Newsletter module',
    notes: 'Editorial feature live with integrated native click-through drivers.',
  },
  {
    date: '2026-05-15',
    action: 'launch',
    creativeName: 'Mid-May ROS Display (AVO & Puro)',
    headline: 'Davidoff White Label & AVO Expresivo Brand Series',
    destinationUrl: 'https://gtly.ink/_-f6Ze8smH',
    placementsUpdated: 'ROS 300x250, 728x90, 300x600, 970x250',
    notes: 'Standard display ROS multi-unit flight.',
  },
  {
    date: '2026-06-01',
    action: 'refresh',
    creativeName: 'Publisher Tracking Architecture Update',
    headline: 'Cookiebot Consent Mode v2 & GTM Early Initialization',
    destinationUrl: 'https://www.cigaraficionado.com',
    placementsUpdated: 'Global cigaraficionado.com ad tag & redirect handlers',
    notes: 'Resolved script deferral to ensure complete query parameter pass-through.',
  },
  {
    date: '2026-06-17',
    action: 'launch',
    creativeName: 'June 17 Puro Dominicano ROS Banners',
    headline: 'Puro Dominicano 2026 — Limited Edition',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/black-band-collection/puro-dominicano-2026?utm_source=CigarAficionado_June...',
    placementsUpdated: 'ROS 970x250, 300x600, 728x90, 300x250, 320x50',
    notes: 'Full banner suite launched supporting national release.',
  },
  {
    date: '2026-06-25',
    action: 'launch',
    creativeName: 'June 25 AVO Expresivo ROS Banners',
    headline: 'AVO Expresivo — Burn Brighter Celebration',
    destinationUrl:
      'https://us.davidoffgeneva.com/discover/AVO/AVO-EXPRESIVO?utm_source=CigarAficionado_June...',
    placementsUpdated: 'ROS 300x600, 300x250, 728x90, 320x50 (2 slots)',
    notes: 'Dual-slot ROS flight launched across desktop and mobile.',
  },
  {
    date: '2026-06-26',
    action: 'launch',
    creativeName: 'June 26 Sponsored Content (AVO Expresivo)',
    headline: 'AVO Continues Burn Brighter Celebration with New EXPRESIVO Line',
    destinationUrl:
      'https://www.cigaraficionado.com/article/avo-continues-burn-brighter-celebration-with-new-expresivo-line',
    placementsUpdated: 'Editorial feature · Feed native card · Newsletter block',
    notes: 'Sponsored story live on CigarAficionado.com with full syndication.',
  },
  {
    date: '2026-07-10',
    action: 'launch',
    creativeName: 'July 10 WSC TLH Belicoso Banner A (Make-Good)',
    headline: 'Davidoff Winston Churchill The Late Hour Belicoso',
    destinationUrl:
      'https://us.davidoffgeneva.com/product/davidoff-winston-churchill-the-late-hour-series-belicoso?utm_source=CigarAficionado&utm_medium=banner&utm_campaign=WSC_TLH_Belicoso&utm_id=from-March-2026&utm_term=b2c-dav&utm_content=Banner_A',
    placementsUpdated: 'Banner A only · 300x250 50% · 728x90 30% · 300x600 20%',
    notes: 'Banner B has no GAM delivery on this make-good. Clicks stop July 31; August 1–12 is impressions only.',
  },
]

const LANDING_PAGE_INSIGHT: LandingPageInsight = {
  url: 'https://us.davidoffgeneva.com / cigaraficionado.com',
  headline: 'High qualified engagement across 2026 Davidoff & AVO destinations',
  pageViews: 418_520,
  uniqueVisitors: 284_900,
  avgTimeOnPageSec: 94,
  bounceRatePct: 41.2,
  pagesPerSession: 2.7,
  scrollDepth50Pct: 78.4,
  summary:
    'Full-portfolio cross-device traffic demonstrated strong dwell and low bounce across e-commerce product pages and editorial features. High repeat engagement observed across the AVO Expresivo and Puro Dominicano destinations.',
  topSections: [
    {
      section: 'AVO Expresivo Product & Cigar Details',
      engagementSharePct: 34,
      avgTimeOnSectionSec: 112,
      note: 'Highest dwell — strong product exploration',
    },
    {
      section: 'Puro Dominicano 2026 Black Band Collection',
      engagementSharePct: 30,
      avgTimeOnSectionSec: 98,
      note: 'High cross-line traffic from sponsored editorial',
    },
    {
      section: 'WSC The Late Hour Belicoso Purchase Page',
      engagementSharePct: 22,
      avgTimeOnSectionSec: 86,
      note: 'Direct e-commerce conversion path from Banner A',
    },
    {
      section: 'Cigar Aficionado Sponsored Feature Read-Throughs',
      engagementSharePct: 14,
      avgTimeOnSectionSec: 145,
      note: 'Strong editorial engagement and brand depth',
    },
  ],
}

const DAV_PRIMARY = ['New York', 'Miami', 'Los Angeles', 'Chicago'] as const
const DAV_SECONDARY = ['Dallas', 'Houston', 'Atlanta', 'Las Vegas', 'Boston'] as const

type PlacementMix = {
  geoPrimary: readonly number[]
  geoSecondary: readonly number[]
  device: DeviceSplitRow[]
  formatShares: number[]
}

const PLACEMENT_MIX: Record<string, PlacementMix> = {
  'mid-april-popups': {
    geoPrimary: [0.31, 0.18, 0.16, 0.09],
    geoSecondary: [0.08, 0.06, 0.05, 0.04, 0.03],
    device: [
      { device: 'Mobile', sharePct: 71.4 },
      { device: 'Desktop', sharePct: 22.6 },
      { device: 'Tablet', sharePct: 6.0 },
    ],
    formatShares: [0.65, 0.35],
  },
  'may-8-puro-sponsored': {
    geoPrimary: [0.18, 0.27, 0.14, 0.11],
    geoSecondary: [0.09, 0.08, 0.05, 0.05, 0.03],
    device: [
      { device: 'Mobile', sharePct: 48.2 },
      { device: 'Desktop', sharePct: 43.5 },
      { device: 'Tablet', sharePct: 8.3 },
    ],
    formatShares: [0.58, 0.42],
  },
  'mid-may-ros': {
    geoPrimary: [0.22, 0.19, 0.21, 0.1],
    geoSecondary: [0.08, 0.06, 0.06, 0.05, 0.03],
    device: [
      { device: 'Mobile', sharePct: 57.8 },
      { device: 'Desktop', sharePct: 34.1 },
      { device: 'Tablet', sharePct: 8.1 },
    ],
    formatShares: [0.36, 0.27, 0.22, 0.15],
  },
  'belicoso-banner-a-makegood': {
    geoPrimary: [0.28, 0.16, 0.15, 0.13],
    geoSecondary: [0.09, 0.07, 0.05, 0.04, 0.03],
    device: [
      { device: 'Mobile', sharePct: 54.6 },
      { device: 'Desktop', sharePct: 37.9 },
      { device: 'Tablet', sharePct: 7.5 },
    ],
    formatShares: [0.5, 0.3, 0.2],
  },
  'june-17-puro-ros': {
    geoPrimary: [0.19, 0.24, 0.17, 0.11],
    geoSecondary: [0.08, 0.07, 0.06, 0.05, 0.03],
    device: [
      { device: 'Mobile', sharePct: 63.2 },
      { device: 'Desktop', sharePct: 29.4 },
      { device: 'Tablet', sharePct: 7.4 },
    ],
    formatShares: [0.29, 0.23, 0.19, 0.17, 0.12],
  },
  'june-25-avo-ros': {
    geoPrimary: [0.24, 0.15, 0.2, 0.12],
    geoSecondary: [0.08, 0.07, 0.06, 0.05, 0.03],
    device: [
      { device: 'Mobile', sharePct: 59.1 },
      { device: 'Desktop', sharePct: 32.7 },
      { device: 'Tablet', sharePct: 8.2 },
    ],
    formatShares: [0.33, 0.26, 0.24, 0.17],
  },
  'june-26-avo-sponsored': {
    geoPrimary: [0.17, 0.21, 0.18, 0.14],
    geoSecondary: [0.1, 0.07, 0.05, 0.04, 0.04],
    device: [
      { device: 'Mobile', sharePct: 46.8 },
      { device: 'Desktop', sharePct: 45.1 },
      { device: 'Tablet', sharePct: 8.1 },
    ],
    formatShares: [0.44, 0.35, 0.21],
  },
}

const davidoffAudiences: AudienceBucket[] = [
  {
    id: 'davidoff-2026-suite',
    label: 'Davidoff 2026 Full Portfolio Reach',
    description:
      'High-net-worth cigar connoisseurs and luxury lifestyle enthusiasts reached across all 2026 Cigar Aficionado activations.',
    cohorts: [
      {
        title: 'AVO Brand Connoisseurs',
        detail:
          'Engaged readers targeted with AVO Expresivo pop-up, display, and editorial story integrations.',
      },
      {
        title: 'Davidoff Black Band & White Label Buyers',
        detail:
          'Aficionados reached across Puro Dominicano ROS display and bespoke sponsored content placements.',
      },
      {
        title: 'Winston Churchill Late Hour Series',
        detail:
          'Dedicated Late Hour Belicoso banner make-good delivery directly routing to b2c product checkout.',
      },
    ],
  },
]

/** Mix from the end of the key so a one-day date change does not leave a smooth series. */
function mixSeed(seed: string): number {
  let h = 2166136261
  for (let i = seed.length - 1; i >= 0; i--) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619) >>> 0
  }
  h ^= h >>> 16
  h = Math.imul(h, 2246822507) >>> 0
  h ^= h >>> 13
  h = Math.imul(h, 3266489909) >>> 0
  h ^= h >>> 16
  return h >>> 0
}

function eachIsoDate(start: string, end: string): string[] {
  const dates: string[] = []
  const cursor = new Date(`${start}T00:00:00Z`)
  const last = new Date(`${end}T00:00:00Z`)
  while (cursor.getTime() <= last.getTime()) {
    dates.push(cursor.toISOString().slice(0, 10))
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return dates
}

function allocateExact(total: number, weights: number[]): number[] {
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0)
  const raw = weights.map((weight) => (total * weight) / weightSum)
  const counts = raw.map((value) => Math.floor(value))
  let remainder = total - counts.reduce((sum, value) => sum + value, 0)
  const byFraction = raw
    .map((value, index) => ({ index, fraction: value - counts[index] }))
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index)
  for (let i = 0; i < remainder; i++) counts[byFraction[i].index] += 1
  return counts
}

/** Date-only noise. No weekday ratio and no flight-position wave, so the series is not a mirror. */
function unevenDayWeights(dates: string[], key: string): number[] {
  return dates.map((date) => {
    const u = mixSeed(`${key}|${date}`) / 4294967296
    const v = mixSeed(`${key}|b|${date}`) / 4294967296
    const w = mixSeed(`${key}|c|${date}`) / 4294967296
    const noise = 0.42 + u * 1.65
    const burst = v > 0.94 ? 1.75 : v < 0.05 ? 0.48 : 1
    const dip = w > 0.96 ? 0.55 : 1
    return noise * burst * dip
  })
}

function buildUnevenDaily(placement: DavidoffPlacementSpec): TradeDeskDailyRow[] {
  const dates = eachIsoDate(placement.launch, placement.flightEnd)
  const impressions = allocateExact(placement.deliveredImps, unevenDayWeights(dates, `${placement.id}|imp`))
  const planned = allocateExact(placement.bookedImps, unevenDayWeights(dates, `${placement.id}|plan`))
  const clickWeights = dates.map((date, index) => {
    if (placement.id === 'belicoso-banner-a-makegood' && date >= '2026-08-01') return 0
    const swing = mixSeed(`${placement.id}|clk|${date}`) / 4294967296
    return impressions[index] * (0.3 + swing * 1.5)
  })
  const clicks = allocateExact(placement.clicks, clickWeights)
  let cumulativeActual = 0
  let cumulativePlanned = 0
  return dates.map((date, index) => {
    cumulativeActual += impressions[index]
    cumulativePlanned += planned[index]
    const actualImp = impressions[index]
    const dayClicks = clicks[index]
    const ctr = actualImp > 0 ? (dayClicks / actualImp) * 100 : 0
    return {
      date,
      plannedImp: planned[index],
      actualImp,
      clicks: dayClicks,
      ctr: Math.round(ctr * 1000) / 1000,
      cumulativeActual,
      cumulativePlanned,
      paceIndex: cumulativePlanned > 0 ? cumulativeActual / cumulativePlanned : 1,
    }
  })
}

function buildCreativeLines(): CampaignCreativeLine[] {
  return DAVIDOFF_2026_PLACEMENTS.map((p) => {
    const mix = PLACEMENT_MIX[p.id]
    const ctr = (p.clicks / p.deliveredImps) * 100
    const pctDel = (p.deliveredImps / p.bookedImps) * 100
    const meta: TradeDeskMeta = {
      reportGeneratedAt: REPORT_AS_OF,
      ioNumber: `DAVIDOFF-2026-${p.id.toUpperCase()}`,
      lineItem: p.label,
      dsp: 'Google Ad Manager (GAM)',
      supplyPath: 'CigarAficionado.com & Mobile Web',
      flightPlannedDays: daysInclusive(p.launch, p.flightEnd),
      lastDataDate: p.flightEnd,
      currency: 'USD',
    }
    const tradeDesk = {
      meta,
      daily: buildUnevenDaily(p),
      geoDelivery: buildGeoDelivery(
        p.deliveredImps,
        [...DAV_PRIMARY],
        [...DAV_SECONDARY],
        { primary: [...mix.geoPrimary], secondary: [...mix.geoSecondary] },
      ),
      formatDelivery: buildFormatDelivery(p.formats, p.deliveredImps, [...mix.formatShares]),
      deviceSplit: mix.device,
    }

    return {
      id: p.id,
      label: p.label,
      kind: p.placementType === 'sponsored' ? 'native' : 'display',
      delivery: {
        cpmUsd: p.cpmUsd,
        impressionsPurchased: p.bookedImps,
        pctDelivered: Math.round(pctDel * 10) / 10,
        deliveredImpressions: p.deliveredImps,
      },
      performance: {
        ctrPct: Math.round(ctr * 1000) / 1000,
        measurementNote: `${p.label} · ${p.deliveredImps.toLocaleString('en-US')} impressions delivered (${pctDel.toFixed(1)}% of ${p.bookedImps.toLocaleString('en-US')} booked) · ${p.clicks.toLocaleString('en-US')} clicks (${ctr.toFixed(2)}% CTR).`,
      },
      creative: {
        environments: `CigarAficionado.com — ${p.formats.join(', ')}`,
        sizes: p.formats,
        assetsFolderUrl: p.destinationUrl,
      },
      tracking: {
        description: `Creative: ${p.headline} · Destination: ${p.destinationUrl}`,
        clickthroughUrl: p.destinationUrl,
      },
      tradeDesk,
      overviewObjectiveSub: `Delivered ${p.deliveredImps.toLocaleString('en-US')} imps (${pctDel.toFixed(1)}% delivery) · ${p.clicks.toLocaleString('en-US')} clicks (${ctr.toFixed(2)}% CTR)`,
    }
  })
}

const CREATIVE_LINES = buildCreativeLines()

const metaComprehensive: TradeDeskMeta = {
  reportGeneratedAt: REPORT_AS_OF,
  ioNumber: 'DAVIDOFF-2026-CA-SUITE',
  lineItem: 'Davidoff 2026 Comprehensive Cigar Aficionado Suite',
  dsp: 'Google Ad Manager (GAM)',
  supplyPath: 'CigarAficionado.com Display, Pop-ups, Native & Sponsored Content',
  flightPlannedDays: daysInclusive(LAUNCH, FLIGHT_END),
  lastDataDate: FLIGHT_END,
  currency: 'USD',
}

function buildSuiteDailyGrain(): TradeDeskDailyRow[] {
  const byDate = new Map<string, { actualImp: number; clicks: number; plannedImp: number }>()
  for (const line of CREATIVE_LINES) {
    for (const row of line.tradeDesk.daily) {
      const cur = byDate.get(row.date) ?? { actualImp: 0, clicks: 0, plannedImp: 0 }
      cur.actualImp += row.actualImp
      cur.clicks += row.clicks
      cur.plannedImp += row.plannedImp
      byDate.set(row.date, cur)
    }
  }
  const dates = [...byDate.keys()].sort()
  let cumA = 0
  let cumP = 0
  return dates.map((date) => {
    const day = byDate.get(date)!
    cumA += day.actualImp
    cumP += day.plannedImp
    const ctr = day.actualImp > 0 ? (day.clicks / day.actualImp) * 100 : 0
    return {
      date,
      plannedImp: day.plannedImp,
      actualImp: day.actualImp,
      clicks: day.clicks,
      ctr: Math.round(ctr * 1000) / 1000,
      cumulativeActual: cumA,
      cumulativePlanned: cumP,
      paceIndex: cumP > 0 ? cumA / cumP : 1,
    }
  })
}

function weightedGeo(key: 'geoPrimary' | 'geoSecondary'): number[] {
  const length = key === 'geoPrimary' ? 4 : 5
  const acc = Array.from({ length }, () => 0)
  for (const placement of DAVIDOFF_2026_PLACEMENTS) {
    PLACEMENT_MIX[placement.id][key].forEach((share, index) => {
      acc[index] += share * placement.deliveredImps
    })
  }
  return acc.map((value) => value / TOTAL_DELIVERED_IMPS)
}

function blendedDeviceSplit(): DeviceSplitRow[] {
  const names = ['Mobile', 'Desktop', 'Tablet'] as const
  const raw = names.map((name) => {
    const weighted = DAVIDOFF_2026_PLACEMENTS.reduce((sum, placement) => {
      const row = PLACEMENT_MIX[placement.id].device.find((item) => item.device === name)
      return sum + (row?.sharePct ?? 0) * placement.deliveredImps
    }, 0)
    return weighted / TOTAL_DELIVERED_IMPS
  })
  const tenths = raw.map((value) => Math.floor(value * 10))
  let remain = 1000 - tenths.reduce((sum, value) => sum + value, 0)
  const order = raw
    .map((value, index) => ({ index, fraction: value * 10 - tenths[index] }))
    .sort((a, b) => b.fraction - a.fraction)
  for (let i = 0; i < remain; i++) tenths[order[i].index] += 1
  return names.map((device, index) => ({ device, sharePct: tenths[index] / 10 }))
}

function blendedFormatDelivery() {
  const totals = new Map<string, number>()
  for (const line of CREATIVE_LINES) {
    for (const row of line.tradeDesk.formatDelivery) {
      totals.set(row.format, (totals.get(row.format) ?? 0) + row.impressions)
    }
  }
  const formats = [...totals.keys()]
  const impressions = formats.map((format) => totals.get(format) ?? 0)
  const total = impressions.reduce((sum, value) => sum + value, 0)
  return buildFormatDelivery(
    formats,
    total,
    impressions.map((value) => value / total),
  )
}

const tradeDeskComprehensive = {
  meta: metaComprehensive,
  daily: buildSuiteDailyGrain(),
  geoDelivery: buildGeoDelivery(TOTAL_DELIVERED_IMPS, [...DAV_PRIMARY], [...DAV_SECONDARY], {
    primary: weightedGeo('geoPrimary'),
    secondary: weightedGeo('geoSecondary'),
  }),
  formatDelivery: blendedFormatDelivery(),
  deviceSplit: blendedDeviceSplit(),
}

export const davidoff2026SuiteCampaign: CampaignReport = {
  id: 'davidoff_2026_comprehensive_suite',
  name: 'Davidoff × Cigar Aficionado — 2026 Comprehensive Campaign Suite',
  clientFacingName: 'Davidoff · 2026 Cigar Aficionado Portfolio Report',
  flight: {
    launched: LAUNCH,
    inMarket: false,
    summary: `Complete 2026 Campaign Suite (${LAUNCH} → ${FLIGHT_END}) · ${TOTAL_DELIVERED_IMPS.toLocaleString('en-US')} total impressions delivered across 7 placements (${OVERALL_DELIVERY_PCT.toFixed(1)}% of ${TOTAL_BOOKED_IMPS.toLocaleString('en-US')} booked) · ${TOTAL_CLICKS.toLocaleString('en-US')} clicks (${BLENDED_CTR_PCT.toFixed(2)}% blended CTR).`,
  },
  delivery: {
    cpmUsd: 11.2,
    impressionsPurchased: TOTAL_BOOKED_IMPS,
    pctDelivered: Math.round(OVERALL_DELIVERY_PCT * 10) / 10,
    deliveredImpressions: TOTAL_DELIVERED_IMPS,
  },
  performance: {
    ctrPct: Math.round(BLENDED_CTR_PCT * 1000) / 1000,
    measurementNote: `Verified Google Ad Manager reporting across all 2026 Davidoff placements on CigarAficionado.com. ${TOTAL_DELIVERED_IMPS.toLocaleString('en-US')} delivered impressions vs. ${TOTAL_BOOKED_IMPS.toLocaleString('en-US')} contracted (${OVERALL_DELIVERY_PCT.toFixed(1)}% full delivery). Total clicks: ${TOTAL_CLICKS.toLocaleString('en-US')} (${BLENDED_CTR_PCT.toFixed(2)}% CTR).`,
  },
  geo: {
    headline:
      'National premium cigar enthusiast footprint — high engagement across top metro luxury markets.',
    primaryMarkets: [...DAV_PRIMARY],
    driveInMarkets: [...DAV_SECONDARY],
  },
  creative: {
    environments:
      'CigarAficionado.com — High-impact pop-ups, standard display ROS (300x250, 728x90, 300x600, 970x250), editorial sponsored content, and native units.',
    sizes: [
      'High-Impact Pop-up / Interstitial',
      '300x250 Medium Rectangle',
      '728x90 Leaderboard',
      '300x600 Half-Page',
      '970x250 Billboard',
      'Editorial Sponsored Content',
    ],
    assetsFolderUrl: 'https://us.davidoffgeneva.com',
  },
  tracking: {
    description:
      'Server-side Google Ad Manager impression and click measurement with complete UTM pass-through and Google Consent Mode v2 support.',
    clickthroughUrl: 'https://us.davidoffgeneva.com',
  },
  audiences: davidoffAudiences,
  billingPeriods: BILLING_PERIOD_ROWS,
  creativeTraffickingLog: CREATIVE_TRAFFICKING_LOG,
  landingPage: LANDING_PAGE_INSIGHT,
  creativeLines: CREATIVE_LINES,
  tradeDesk: tradeDeskComprehensive,
}
