# Project architecture

- Keep professional profiles in `src/data/team.ts` and render them through `TeamSection`; a single roster keeps names, functions, and photo associations consistent.
- Import uploaded professional photos through Lovable Assets JSON pointers; optimized hosted images avoid storing uploaded binaries in the repository.
- Store blog posts in Cloud with public read-only access; daily publishing uses a managed authenticated callback, a database lease and one attempt per local day to bound cost and prevent duplicates.
- Keep article metadata in Helmet and corporate metadata in the static head; client-side article metadata supports Google but does not provide server-rendered social previews.
- Discover blog articles through a public paginated XML sitemap callback referenced by the sitemap index; new daily posts remain discoverable without republishing static sitemap files.