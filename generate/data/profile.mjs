// All facts here are already public: LinkedIn profile + CV. Nothing beyond.

export const SERIES = 'GITHUB.COM/SERGIOKINGONE';

export const HERO = {
  kicker: 'RUST · AWS · DISTRIBUTED SYSTEMS',
  name: 'SERGIO ROBAYO',
  sub: [
    { t: 'Learns fast, ' },
    { t: 'ships faster', accent: true },
    { t: ', and chases hard problems wherever they live.' },
  ],
  caption: 'BACKEND ENGINEER · BOGOTA, COLOMBIA · REMOTE',
};

export const RANGE = {
  rows: [
    { domain: 'FRAUD & IDENTITY', note: 'KYC pipelines, biometric verification, device attestation, graph risk engines.' },
    { domain: 'GEO & IP INTELLIGENCE', note: 'planet-scale geocoding, proxy physics, TLS fingerprints, fraud-rate mapping.' },
    { domain: 'PRIVACY ENGINEERING', note: 'searchable encryption, per-tenant keys, deletion that actually cascades.' },
    { domain: 'AI SYSTEMS', note: 'RAG pipelines, actor architectures, vision inference cut from 50s to 3.5s.' },
    { domain: 'REAL-TIME SYSTEMS', note: 'WebSocket broadcast, pub/sub coordination, streaming video analysis.' },
  ],
  closing: 'every row here was unfamiliar once; learning it is the job.',
  caption: 'DOMAINS SHIPPED TO PRODUCTION · 2023 TO PRESENT',
};

export const METRICS = {
  items: [
    { n: '810K', unit: '', l1: 'SESSIONS', l2: 'DECISIONED' },
    { n: '99.96', unit: '%', l1: 'STAGE', l2: 'SUCCESS' },
    { n: '475K', unit: '', l1: 'LINES', l2: 'OF RUST', accent: true },
    { n: '14', unit: '×', l1: 'INFERENCE', l2: 'SPEEDUP' },
    { n: '2', unit: '', l1: 'BACKENDS', l2: 'FROM ZERO' },
  ],
  note: 'measured in production, not on a slide.',
  caption: 'CAREER READOUT · 2023 TO PRESENT',
};

export const PRIMITIVES = {
  rows: [
    {
      typical: 'A VENDOR SCORE',
      built: 'IP INTELLIGENCE',
      note: 'MMDB tooling written from scratch, RTT proxy physics, JA4 TLS fingerprints.',
    },
    {
      typical: 'A PAID API',
      built: 'GEOCODING ENGINE',
      note: 'reverse geocoding and autocomplete over 446M open Overture addresses.',
    },
    {
      typical: 'AN SDK',
      built: 'APP ATTEST, IN RUST',
      note: 'all nine verification steps from raw CBOR, under 300 lines.',
    },
    {
      typical: 'PLAINTEXT SEARCH',
      built: 'BLIND INDEXES',
      note: 'AES-256-SIV plus keyed trigram hashing: encrypted PII you can still query.',
    },
  ],
  stamp: ['BUILT,', 'NOT BOUGHT'],
  caption: 'A RUNNING LEDGER · TOOLS BUILT WHERE NONE FIT',
};
