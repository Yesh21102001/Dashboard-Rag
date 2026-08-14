# RAG Knowledge Base Manager — Next.js

A pixel-faithful Next.js (App Router + TypeScript + Tailwind) conversion of the
"Knowledge Base Manager" HTML mockup. No design changes — same colors, spacing,
fonts, icons, and layout, just componentized.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/knowledge-base`.

## Where everything went (HTML → Next.js)

| Original HTML section                     | New file                                                          |
|--------------------------------------------|---------------------------------------------------------------------|
| `<script id="tailwind-config">`            | `tailwind.config.ts`                                                |
| Google Fonts `<link>` tags                 | `src/app/layout.tsx`                                                 |
| `<style>` (material-symbols + table rules) | `src/app/globals.css`                                                |
| `<nav>` … Side nav bar                     | `src/components/layout/Sidebar.tsx` + `SidebarItem.tsx`             |
| `<header>` … Top nav bar                   | `src/components/layout/Topbar.tsx` + `SearchBar.tsx`                |
| "Knowledge Base Manager" title + button    | `src/components/knowledge-base/PageHeader.tsx` + `ConnectSourceButton.tsx` |
| Left pane "Connected Folders" tree         | `src/components/knowledge-base/FolderTree.tsx`, `FolderTreeItem.tsx`, `FileTreeItem.tsx` |
| Right pane data table                      | `src/components/knowledge-base/ContentTable.tsx`, `ContentTableRow.tsx` |
| SYNCED / PROCESSING badges + progress bar  | `src/components/knowledge-base/StatusBadge.tsx`, `src/components/ui/ProgressBar.tsx` |
| pdf/docx row icon                          | `src/components/knowledge-base/FileTypeIcon.tsx`                    |
| Material Symbol `<span>`s                  | `src/components/ui/Icon.tsx`                                        |
| Hardcoded folder/file/table data           | `src/data/mockData.ts`                                              |
| Full page assembly                         | `src/app/knowledge-base/page.tsx`                                    |

The other sidebar links (`Test Cases`, `Releases`, `Defects`,
`Traceability`, `Analytics`, `Settings`, `Support`) each got a placeholder
page under `src/app/<route>/page.tsx` so the sidebar routes don't 404 — swap
in real content there later.

## User Stories page (agile grid)

`/user-stories` uses a different header/sidebar treatment than Knowledge Base
(matches its own mockup exactly — full-width top header, "EQ" logo mark,
search bar on the right, fill-style active nav icon). Rather than force it
into the Knowledge Base's `Sidebar`/`Topbar`, it gets its own layout pieces:

| Original HTML section                     | New file                                                          |
|----------------------------------------------|-----------------------------------------------------------------|
| `<header>` top nav                          | `src/components/layout/GridTopbar.tsx`                          |
| `<nav>` side nav                            | `src/components/layout/GridSidebar.tsx`                         |
| Toolbar ("Manage User Stories" + buttons)   | `src/components/user-stories/Toolbar.tsx`                       |
| Grid column header row                      | `src/components/user-stories/GridHeaderRow.tsx`                 |
| Epic row                                    | `src/components/user-stories/EpicRow.tsx`                       |
| Feature row                                 | `src/components/user-stories/FeatureRow.tsx`                    |
| User story row (status select, AC, actions) | `src/components/user-stories/UserStoryRow.tsx`                  |
| Expand/collapse state for the hierarchy     | `src/components/user-stories/StoriesGrid.tsx` (client component)|
| Bottom status bar                           | `src/components/user-stories/StatusBar.tsx`                     |
| Epic/feature/story data                     | `src/data/userStoriesData.ts`                                   |
| Page assembly                               | `src/app/user-stories/page.tsx`                                 |

The epic/feature rows are now interactive — clicking the chevron expands or
collapses their children, same interaction pattern as the Knowledge Base
folder tree, using the same expand_more/chevron_right icon swap as the
original mockup. Everything is expanded by default to match the screenshot.

## Test Cases page (split-pane tree + detail)

`/test-cases` is a third distinct shell (fixed top nav + fixed left sidebar,
main content offset with `ml-sidebar-width`/`mt-12`) with its own left-pane
Epic → Feature → User Story → Test Case tree and a right-pane detail view.

| Original HTML section                         | New file                                                          |
|--------------------------------------------------|------------------------------------------------------------------|
| Fixed `<nav>` top bar                            | `src/components/layout/TreeTopbar.tsx`                          |
| Fixed `<aside>` side nav                         | `src/components/layout/TreeSidebar.tsx`                         |
| Toolbar (title, breadcrumb, Export/New buttons)  | `src/components/test-cases/PageToolbar.tsx`                     |
| Tree filter input                                | `src/components/test-cases/TreeFilterBar.tsx`                   |
| Epic/Feature/User Story/Test Case tree           | `src/components/test-cases/TestTree.tsx`, `TestCaseRow.tsx`     |
| Detail pane title, status, RAG lock, tabs        | `src/components/test-cases/DetailHeader.tsx`                    |
| Pre-conditions + Traceability panels             | `src/components/test-cases/MetadataGrid.tsx`                    |
| Test Steps grid                                  | `src/components/test-cases/TestStepsGrid.tsx`                   |
| State: selected test case + tree expand/collapse | `src/components/test-cases/TestCasesWorkspace.tsx` (client)     |
| Epic/Feature/UserStory/TestCase data             | `src/data/testCasesData.ts`                                     |
| Page assembly                                    | `src/app/test-cases/page.tsx`                                   |

Interactivity added beyond the static mockup:
- Clicking any **Test Case row** in the tree swaps the entire right-pane
  detail view (title, description, status, pre-conditions, traceability
  links, test steps) to that test case — `TC-801` is selected by default,
  matching the screenshot.
- Epic/Feature/User Story rows expand and collapse via their chevrons.
  `US-1043: Multi-Currency` stays locked/dimmed with no children, matching
  the "Draft" + lock icon state in the mockup.
- The **Details & Steps / Execution History / Linked Defects** tabs switch
  the active underline (their panels aren't built out — wire up real content
  there when ready).

The split-pane resizer div (`.split-pane-divider`) is present and styled
(cursor + hover color) but not wired to actual drag-resize logic — that's a
reasonable next step if you want the pane genuinely resizable.

## Notes

- The folder tree (`FolderTreeItem`) and expand/collapse behavior is now
  interactive — clicking a folder with children (like `BRMs`) toggles it
  open/closed, using the same chevron/folder icon swap as the mockup.
- All data (`Q1_Features.pdf`, `Core_Logic_v2.docx`, sidebar folders, etc.)
  lives in `src/data/mockData.ts` — replace with a real API/fetch call
  whenever you're ready to wire this up to a backend.
- Tailwind classes, spacing tokens (`px-md`, `gap-sm`, etc.), and color
  tokens (`primary-container`, `on-surface-variant`, etc.) are unchanged
  from the original — they're defined in `tailwind.config.ts` exactly as
  in your HTML's inline config.
