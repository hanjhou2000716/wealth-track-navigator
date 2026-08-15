# Leveling evaluation harness

The site exposes `/api/evaluation` as a deterministic, reviewable evaluation contract.

- Corpus size: 300 generated cases with stable IDs and explicit IC/Management tracks.
- Input: ten evidence dimensions; no job title is passed to the blind classifier.
- Output: exact-level rate, within-±1-level rate, and unsupported high-confidence count.
- Methodology: `blind-scope-evidence-v1`.

This is an engineering harness, not evidence that the ontology is calibrated to the whole labour market. A production calibration requires an independently labelled corpus and a review protocol. Until that corpus is licensed and loaded, the product must keep the result marked as Demo data.
