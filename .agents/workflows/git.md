---
description: 
---

# Git Workflow Guidelines (Cultivation Branch Flow)

**Target Audience:** `AI Agents`, `IDE Assistants`, `Human Developers`
**Status:** REQUIRED for all code changes.

This repository strictly enforces the "Cultivation Branch Flow". No AI agent or human should ever commit code directly to `core`, `zenith`, or `dao`. 

---

## 1. Branch Hierarchy

| Branch | Purpose | Permissions |
|--------|---------|-------------|
| `dao` | **Live Production Site** | ⛔ NO DIRECT COMMITS. Only receives merges from `zenith`. |
| `zenith` | **Staging / Release Candidate** | ⛔ NO DIRECT COMMITS. Only receives merges from `core`. |
| `core` | **Development Hub** | ⛔ NO DIRECT COMMITS. Receives PRs/merges from `qi-*` feature branches. |
| `qi-*` | **Feature / Bugfix Branches** | ✅ Active development happens here. |

*(Note: `forge-*` (refactoring), `shatter-*` (deletion), and `elixir-*` (production hotfixes) follow the same rules as `qi-*`)*.

---

## 2. Standard Daily Workflow (For AI Agents)

When an AI agent is instructed to write code, it **MUST** execute the following sequence.

### Phase A: Initiate Work
1. `git checkout core`
2. `git pull origin core` (if remote exists)
3. `git checkout -b qi-<descriptive-name>`

### Phase B: Execute & Commit (Iterative — Stay on `qi-*`)
1. Write the code, test locally.
2. `git add .`
3. `git commit -m "<type>: <imperative description>"`
   *Commit Rules: Use conventional commits (e.g., `feat:`, `fix:`, `chore:`, `refactor:`). No timestamp-only messages.*
4. **Repeat steps 1–3** as many times as needed. Fix bugs, add features, iterate — all on the same `qi-*` branch.
5. `qi-*` branches are **local only**. Do NOT push them to GitHub. Only `core`, `zenith`, and `dao` exist on the remote.

> ⚠️ **CRITICAL RULE:** Do **NOT** merge to `core` on your own.
> Stay on the `qi-*` branch until the **user explicitly confirms** that all work is done
> (e.g., "merge it", "looks good", "done", "ship it").

### Phase C: Merge to Core (User-Approved Only)
**Only execute this phase when the user gives explicit approval.**
1. `git checkout core`
2. `git merge qi-<descriptive-name>`
3. `git push origin core`
4. `git branch -d qi-<descriptive-name>` (Clean up local branch)

---

## 3. The Ascension Workflow (Deploying)

When the user explicitly asks to "Push live", "Deploy", or "Ascend", the AI must fast-forward identical code up the chain.

**Step 1: Staging Polish**
```bash
git checkout zenith
git merge core
git push origin zenith
```

**Step 2: Production Deploy**
```bash
git checkout dao
git merge zenith
git push origin dao
```

---

## 4. Emergency Elixir Workflow (Hotfixes)

If a critical bug is found on the live site (`dao`), the fix must bubble UP:
1. `git checkout dao`
2. `git checkout -b elixir-fix-<name>`
3. Write fix & Commit.
4. `git checkout dao` -> `git merge elixir-fix-<name>`
5. `git checkout zenith` -> `git merge elixir-fix-<name>`
6. `git checkout core` -> `git merge elixir-fix-<name>`

---

## Reference
For the metaphorical philosophy of this workflow, see `artifacts/cultivation_manual.md`.
