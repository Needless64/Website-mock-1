# Brand assets — integration point

The official institutional logo files were **not** supplied with this project, so the site
renders typographic identity lockups in their place. Nothing was traced or redrawn.

To use the real artwork:

1. Drop the files here, for example:
   - `mlrit.svg`
   - `aws-student-community-day.svg`
   - `scope-club.svg`
   - `aws-student-builder-group.svg`
2. Open `src/config/brand.ts` and set `src`, `width` and `height` for each identity.
   Aspect ratio is preserved by the component; use the intrinsic pixel dimensions of the file.
3. Delete nothing else — `IdentityMark` automatically renders the image instead of the
   typographic lockup.

Navigation, hero, and footer all read from the same config, so one edit updates every placement.
