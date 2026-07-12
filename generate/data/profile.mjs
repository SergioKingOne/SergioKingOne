// All facts here are already public: LinkedIn profile + CV. Nothing beyond.

export const SERIES = 'GITHUB.COM/SERGIOKINGONE';

export const HERO = {
  kicker: 'RUST · AWS · FRAUD & IDENTITY SYSTEMS',
  name: 'SERGIO ROBAYO',
  sub: [
    { t: 'Builds production backends from a blank repo, then ' },
    { t: 'replaces the vendors', accent: true },
    { t: ' one by one.' },
  ],
  caption: 'FOUNDING & LEAD BACKEND ENGINEER · BOGOTA, CO (REMOTE)',
};

export const PIPELINE = {
  stages: ['PHONE', 'OTP', 'LOCATION', 'DETAILS', 'SSN', 'DOC', 'WATCHLIST', 'LEXIS', 'LIVENESS', 'FACEMATCH', 'FINAL'],
  autoPct: '87%',
  reviewPct: '13%',
  note: 'one session, eleven gates, no human in the loop for 87 of every 100.',
  caption: 'KYC IDENTITY PIPELINE · US / DE / NG / MX / BR',
};

export const METRICS = {
  items: [
    { n: '810K', unit: '', l1: 'SESSIONS', l2: 'DECISIONED' },
    { n: '99.96', unit: '%', l1: 'STAGE', l2: 'SUCCESS' },
    { n: '87', unit: '%', l1: 'STRAIGHT-', l2: 'THROUGH', accent: true },
    { n: '475K', unit: '', l1: 'LINES', l2: 'OF RUST' },
    { n: '10', unit: '', l1: 'CLIENTS IN', l2: '5 COUNTRIES' },
  ],
  note: 'measured in production, not on a slide.',
  caption: 'PLATFORM TELEMETRY · CONTINUOUS BILLING SINCE SEP 2025',
};

export const LEDGER = {
  rows: [
    {
      vendor: 'VERISOUL',
      cap: 'IP INTELLIGENCE',
      detail: 'a MaxMind MMDB writer from scratch, physics-bound RTT proxy detection, JA4 TLS fingerprints, per-ASN fraud rates.',
    },
    {
      vendor: 'GOOGLE MAPS',
      cap: 'GEOCODING',
      detail: 'reverse geocoding and autocomplete over 446M Overture addresses, on Aurora PostGIS and OpenSearch.',
    },
    {
      vendor: 'REGULA SAAS',
      cap: 'DOC AUTHENTICITY',
      detail: 'self-hosted on ECS Fargate, zero-trust server-side re-extraction across 8 country pipelines.',
    },
  ],
  stamp: ['BROUGHT', 'IN HOUSE'],
  caption: 'VENDOR REPLACEMENT LEDGER · 2025 TO PRESENT',
};

export const WRITEUPS = [
  { title: 'Verifying Apple App Attest in Rust, from raw bytes', sub: 'nine steps, no attestation library, under 300 lines.' },
  { title: 'Searchable encryption: querying PII you cannot decrypt', sub: 'AES-256-SIV plus a keyed blind index, leaks you can name.' },
];

export const FOCUS = [
  'GEOLOCATION FRAUD: 2ND PRODUCT LINE',
  'AWS SOLUTIONS ARCHITECT, ASSOCIATE',
  'B.ENG SYSTEMS ENGINEERING, 2026',
];
