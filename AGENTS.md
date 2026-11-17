# Project architecture

- Keep professional profiles in `src/data/team.ts` and render them through `TeamSection`; a single roster keeps names, functions, and photo associations consistent.
- Import uploaded professional photos through Lovable Assets JSON pointers; optimized hosted images avoid storing uploaded binaries in the repository.