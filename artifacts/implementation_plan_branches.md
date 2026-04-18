# Establish the Cultivation Base — Git Restructure

Set up the Git branch structure following the Cultivation Branch Flow, and fix issues in the manual.

## User Review Required

> [!WARNING]
> **Renaming `main` → `dao` on GitHub requires changing the default branch setting.** After we push `dao`, you'll need to go to GitHub → Settings → Default Branch → change from `main` to `dao`. I can't do this via CLI.

> [!WARNING]
> **Netlify deploy branch** is likely set to `main`. After restructuring, update it to `dao` on the Netlify dashboard.

---

## Part 1: Fix the Cultivation Manual

### Issues Found

| # | Issue | Fix |
|---|-------|-----|
| 1 | **`quasi` and `tribulation` add friction for solo dev** | Mark as "Future — add when needed." Simplify to 3-tier flow for now. |
| 2 | **Hotfix merge-back is incomplete** | `elixir-*` must merge into `dao` AND `zenith` AND `core` — manual only mentions `dao` and `core`. |
| 3 | **No `.planning/` handling** | Add note: `.planning/` lives in `core` and feature branches only, excluded from `dao` production. |
| 4 | **Ascension Path is over-engineered** | Simplify to: `qi-* → core → zenith → dao` |

### Updated Cultivation Manual Flow

```
dao        ← Production. The live site. Never commit directly.
  ↑
zenith     ← Staging. Final polish before release.
  ↑
core       ← Development hub. All features merge here.
  ↑
qi-* / forge-* / shatter-* / elixir-*  ← Feature/fix branches
```

`tribulation` and `quasi` → add later when you have CI/CD or a review team.

#### [MODIFY] [cultivation_manual.md](file:///d:/VSCode/website/artifacts/cultivation_manual.md)
- Simplify Realm Hierarchy to active 3-tier + feature branches
- Move `quasi` and `tribulation` to a "Future Realms" section
- Fix hotfix flow: `elixir-*` → merge into `dao` + `zenith` + `core`
- Add `.planning/` and `artifacts/` gitignore note
- Update Ascension Path to `qi-* → core → zenith → dao`

---

## Part 2: Git Repository Restructure

### Current State

```
Local branches:
  main           — f2d04da (Oct 2025, old production)
  core           — d189a77 (has AGENTS.md + manual — duplicated on zenith-haven, safe to overwrite)
  zenith-haven*  — c3ceed6 (current branch, latest code)

Remote:
  origin/main          → GitHub default branch
  origin/zenith-haven  → stale name

Working directory: Clean ✓
```

### Execution Steps

#### Step 1: Rename `main` → `dao`
```bash
git branch -m main dao
git push origin dao
git push origin --delete main
```
Then update GitHub default branch: Settings → Default Branch → `dao`

#### Step 2: Rename `zenith-haven` → `zenith`
```bash
git branch -m zenith-haven zenith
git push origin zenith
git push origin --delete zenith-haven
```

#### Step 3: Reset `core` to `zenith` HEAD
The lone commit on `core` (`d189a77`) only has duplicated files (AGENTS.md, manual, plan) — already present on `zenith`. Safe to overwrite.
```bash
git checkout core
git reset --hard zenith
git push origin core --force
```

#### Step 4: Update `.gitignore`
Add these entries:
```
.planning/
artifacts/
```
Commit with: `chore: exclude planning and artifacts from production`

#### Step 5: Switch to `core` as working branch
```bash
git checkout core
```
This is now home base for all future `qi-*` feature branches.

---

## Open Questions

> [!IMPORTANT]
> **Do you want to rewrite the old timestamp commit messages?** All commits from Mar 19 onward use timestamps like `Mar 19, 2026, 3:33 PM` instead of descriptive messages. We can `git rebase -i` to fix them, but it rewrites history and requires force-push. **Recommendation:** Skip for now, use proper messages going forward.

---

## Verification Plan

### Automated Checks
```bash
git branch -a                   # Expect: dao, core, zenith (no main, no zenith-haven)
git log --oneline -3 dao        # Verify: old production history
git log --oneline -3 zenith     # Verify: latest code (c3ceed6)
git log --oneline -3 core       # Verify: matches zenith HEAD
cat .gitignore | grep planning  # Verify: .planning/ excluded
```

### Manual Verification
- GitHub Settings → Default branch shows `dao`
- `origin/main` and `origin/zenith-haven` no longer exist
- Netlify deploy branch updated to `dao`
