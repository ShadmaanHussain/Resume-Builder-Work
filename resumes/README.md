# Resume PDFs

Drop the compiled PDFs here so the **Download Resume** button can serve them:

- `Resume_FullStack.pdf`
- `Resume_PowerPlatform.pdf`

These are referenced in `src/data/fullstack.ts` and `src/data/powerplatform.ts` via the
`resumePdfPath` field. Compile the matching `.tex` file at the workspace root with your
LaTeX toolchain (e.g. `pdflatex`) and place the resulting PDF into this folder.
