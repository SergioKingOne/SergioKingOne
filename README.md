<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg">
  <img src="assets/hero-light.svg" alt="Figure 01, the engineer. Sergio Robayo: Rust, AWS, distributed systems. Backend engineer. Learns fast, ships faster, and chases hard problems wherever they live.">
</picture>

I build production backend systems from scratch. Rust is my main language, AWS is home ground, and the domain rotates: fraud prevention and identity today at [Surt](https://www.surt.com), AI and computer vision systems before that at Vertex Studio. Same pattern both times: join early, learn the domain deeply, build the core, ship it.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/range-dark.svg">
  <img src="assets/range-light.svg" alt="Figure 02, the range. Five domains shipped to production since 2023: fraud and identity, geo and IP intelligence, privacy engineering, AI systems, real-time systems. Every row here was unfamiliar once; learning it is the job.">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/metrics-dark.svg">
  <img src="assets/metrics-light.svg" alt="Figure 03, the readout. Career numbers, 2023 to present: about 810 thousand sessions decisioned, 99.96 percent stage success, about 475 thousand lines of Rust, 14 times inference speedup, 2 production backends built from zero.">
</picture>

The habit that ties it together: when the right tool does not exist, I build it from primitives.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/primitives-dark.svg">
  <img src="assets/primitives-light.svg" alt="Figure 04, from primitives. A running ledger of tools built where none fit: in-house IP intelligence instead of a vendor score, a geocoding engine over open data instead of a paid API, Apple App Attest verification in Rust instead of an SDK, encrypted blind indexes instead of plaintext search. Stamp reads: built, not bought.">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/now-dark.svg">
  <img src="assets/now-light.svg" alt="Figure 05, lab notebook. Recent write-ups: verifying Apple App Attest in Rust from raw bytes; searchable encryption, querying PII you cannot decrypt. Current focus: geolocation fraud detection, AWS Solutions Architect Associate, systems engineering degree in 2026. This figure regenerates itself weekly.">
</picture>

### Field notes

Long-form write-ups of things I built and what they taught me, linked from my [LinkedIn featured section](https://www.linkedin.com/in/sergio-robayo-500584216/):

- **Verifying Apple App Attest in Rust, from raw bytes.** All nine steps, no attestation library, under 300 lines, tested against a real captured device attestation.
- **Searchable encryption: querying PII you cannot decrypt.** AES-256-SIV plus a keyed blind index, with every leak named and bounded.

<sub>Colophon: this page is a build artifact. Five figures, two color surfaces (switch your theme), one generator: <a href="generate/">generate/</a>. Hand-set type as code, embedded fonts, no stat widgets, no screenshots. Figure 05 re-renders itself weekly by CI, the same way anything worth running gets run: tokens, codegen, pipeline.</sub>
