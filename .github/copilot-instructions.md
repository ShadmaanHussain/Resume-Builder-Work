# Copilot Instructions — Resume Repo

These rules apply to **every** resume file in this repo (`Resume.txt`, `Resume_FullStack.txt`,
`Resume_Frontend_Shadmaan.txt`, `Resume_FullStack_Product.txt`, `Resume_PowerPlatform.txt`, and any new variants).
They complement [`Instructions.md`](../Instructions.md); if they ever conflict, follow the stricter rule.

## 1. Character-count target (hard rule)
- Keep each resume as close as possible to **8200 characters** (raw file length, including LaTeX markup).
- Acceptable band: **8100–8300**. Never exceed **8350** (one-page limit).
- After **any** edit, re-measure and report the count:
  - PowerShell: `(Get-Content -Raw "<file>").Length`
- To hit the target, tighten wording and drop filler tail-phrases — **do not delete keyword-rich bullets**.

## 2. Role / section formatting
- Each job title gets its **own** `\resumeSubheading` with its **own** date range.
- Never merge titles like `Software Engineer (Software Engineer Trainee, ...)`. List a promotion as a
  **separate** entry under the same company (e.g. `Software Engineer` and `Software Engineer Trainee`).

## 3. 100% ATS-friendly rules
- **Standard section headings only**: Professional Summary, Experience, Projects, Technical Skills, Education, Certifications.
- **No tables / columns / text boxes / images for content** the ATS must read (header contact icons are decorative — keep the plain-text phone/email/links intact).
- **Single-column body flow**; no multi-column layout for bullets.
- **Standard fonts**, black text; no special glyphs standing in for real words.
- **Spell out, then abbreviate** key terms once, e.g. `Continuous Integration/Continuous Deployment (CI/CD)`, `Role-Based Access Control (RBAC)` — matches both keyword variants.
- **Mirror the job description's exact keywords and casing** (`.NET Core` vs `.NET`, `REST API` vs `RESTful`).
- **Every bullet starts with a strong past-tense action verb** (Architected, Built, Designed, Tuned, Delivered, Configured). Avoid *helped, worked on, responsible for*.
- **Quantify impact** with numbers / % / x wherever possible; never fabricate numbers.
- **Dates as `Mon YYYY -- Mon YYYY`** (or `-- Present`), consistent everywhere.
- **No critical info in headers/footers** (some ATS skip them). Keep the contact line in the document body.
- **Skills = comma-separated plain text**, grouped by category (Languages, Backend, Data & Cloud, Auth & Security, Frontend, DevOps & Tools).
- **Standard bullet character only**; no emojis.
- Export the final resume as a **text-selectable PDF** (never a scanned/image PDF).
- **No keyword stuffing** — every keyword must appear in real context.

## 4. Tailoring a resume to a Job Description (JD)
When the user provides a JD, before editing:
1. **Extract** hard skills, tools, methodologies, and exact terminology from the JD.
2. **Map** each JD requirement to an existing bullet/skill; identify gaps.
3. **Rewrite the Professional Summary** to echo the top 3–5 JD keywords + years + role title.
4. **Reorder / reword Experience bullets** so the most JD-relevant come first; inject JD keywords using the user's **real** experience only — never fabricate.
5. **Update Technical Skills** to surface JD-required tech first; drop clearly-irrelevant items to make room.
6. **Match the JD's job title** in the summary when truthful.
7. **Stay within the 8200-char band** (rule 1) — trim lower-priority content to fit new keywords.
8. **Preserve honesty**: only claim skills the user actually has. If a JD skill is missing, **ask the user** before adding.
9. **Confirm which resume variant file** to tailor if not specified.

## Workflow reminder (run after every edit)
Split-check titles → verify no broken LaTeX lines → measure char count → adjust into the 8100–8300 band → report the count and changes.
