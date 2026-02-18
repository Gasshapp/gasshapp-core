# @gasshapp-core/db

Shared core database schema for the Gasshapp ecosystem. Provides the foundational tables (users, groups, tags, contacts) that all Gasshapp apps depend on.

## Tables

| Table | Description |
|-------|-------------|
| `core_users` | User accounts (linked to Clerk) |
| `core_groups` | Hierarchical groups (supports parent/child via `parent_group_id`) |
| `core_group_members` | Group membership with roles (admin/member) |
| `core_tags` | Global tag templates (Work, Family, School, etc.) |
| `core_contacts` | User-to-user contact relationships |

## Usage in a Gasshapp app

### Install

```bash
npm install @gasshapp-core/db
```

### Import

```typescript
import { coreUsers, coreGroups, coreTags, coreContacts, coreGroupMembers } from "@gasshapp-core/db";
```

All tables are Drizzle ORM table definitions — use them in your own schema, relations, and queries.

## Local development (yalc)

If you're working on core alongside another Gasshapp app, use [yalc](https://github.com/wclr/yalc) to sync changes locally without pushing to GitHub:

```bash
# 1. Install yalc globally (once)
npm install -g yalc

# 2. In this repo — publish to local store
npm run build
yalc publish

# 3. In the consuming app — link (does NOT modify package.json)
yalc link @gasshapp-core/db

# 4. After making changes to core — push updates to all linked apps
yalc push
```

> `yalc link` creates a symlink in `node_modules/` without touching `package.json`, so the git URL dependency stays clean for other contributors.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run dev` | Watch mode — rebuild on changes |
| `npm run typecheck` | Type-check without emitting |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:studio` | Open Drizzle Studio |

## Branch Strategy

```
feature/* ──→ dev ──→ staging ──→ main
```

| Branch | Purpose | Merges to |
|--------|---------|-----------|
| `feature/*` | Isolated work on a single feature | `dev` via PR |
| `dev` | Integration branch — features come together here | `staging` via PR |
| `staging` | CI runs automated tests, manual QA | `main` via PR |
| `main` | Production-ready, published to consumers | deployed |

Develop on feature branches, merge to `dev`. When ready for a release, merge `dev` → `staging` for testing, then `staging` → `main` for production. Never fix directly on `staging` — always fix on `dev` and re-merge.

## Tech

- TypeScript (ESM, strict)
- Drizzle ORM (PostgreSQL)
- Peer dependency: `drizzle-orm >= 0.44.0`
