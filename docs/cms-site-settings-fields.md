# Site settings fields (`GET /api/public/site`)

The portfolio app expects `siteSettings` on the public site payload. These keys extend the shared shape in [`src/lib/cms-types.ts`](../src/lib/cms-types.ts).

## Projects copy (split)

| JSON key | Used on | Notes |
|----------|---------|--------|
| `featuredProjectsSectionTitle` | Home `#projects` | Heading for the featured projects block. Normalized with legacy `projectsSectionTitle` if missing. |
| `featuredProjectsSectionDescription` | Home `#projects` | Subtitle under that heading. |
| `allProjectsPageTitle` | `/projects` | Sticky header + main `<h1>`. Defaults to `"All projects"`. |
| `allProjectsPageDescription` | `/projects` | Optional intro under the title. |
| `projectsSectionTitle` | *(legacy)* | Fallback for featured title when `featuredProjectsSectionTitle` is absent. |
| `projectsSectionDescription` | *(legacy)* | Fallback for featured description and for `allProjectsPageDescription` when the new field is absent. |

## CMS (`the-nazzmul-portfolio-studio`)

Prisma model `SiteSettings` includes the same camelCase columns. Admin **Settings** saves them; `serializeSiteSettings` passes them through to the public API.

After pulling migrations, run `npx prisma migrate deploy` (or `migrate dev`) against your database so existing rows receive the new columns and defaults.
