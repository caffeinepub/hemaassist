# Specification

## Summary
**Goal:** Build a slick single-page HemaAssist UI to enter patient details and FBC values, then generate a rule-based English auto-comment report with validation and convenient actions.

**Planned changes:**
- Create a responsive single-page form for Patient Name/ID and required numeric inputs for Hb, RBC, WBC, Platelets, MCV, MCHC, Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils.
- Implement the frontend report-generation logic matching the provided Python thresholds (Hb/MCV/MCHC flags; WBC total; neutrophil/lymphocyte differential; platelet thresholds) and render a report starting with `PATIENT: <name>  |  ID: <id>`.
- Add validation that all FBC numeric fields are required and numeric; show an English error message and do not overwrite any existing report on failure.
- Add a dedicated output panel for selectable/copyable report text and display the disclaimer: `For laboratory assistance only. Final interpretation must be done by a qualified practitioner.`
- Add actions: **Generate FBC Comment**, **Clear** (reset inputs/output), and **Copy to Clipboard** (copy exact report text with an English confirmation).
- Apply a coherent modern clinical theme (consistent typography/spacing/components) avoiding blue/purple as primary colors.
- Add generated static branding images (logo/app mark, header banner) under `frontend/public/assets/generated` and display them in the UI (e.g., header).

**User-visible outcome:** Users can enter patient and FBC values, generate a copyable English interpretive comment report (or see clear validation errors), reset the form, copy the report to clipboard, and use the app with a professional themed UI including HemaAssist branding imagery.
