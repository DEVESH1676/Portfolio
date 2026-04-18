# The Cultivation Branch Flow Manual

Welcome to the path of cultivation. Maintaining a repository is just like managing your inner Qi—if you let energy flow chaotically, you'll experience a Qi Deviation (a messy codebase full of conflicts and bugs). But with a structured path, your codebase will ascend cleanly to immortality.

Here is your practical guide to using this Git strategy in your everyday development.

---

## 🏔️ The Realm Hierarchy (Branch Types)

### 1. `dao` — *The Ultimate Truth (Production)*
- **Concept:** The live code that the world sees. The peak of the mountain.
- **Rule:** **Never commit directly to this branch.** Code only reaches here via merge from `zenith`.

### 2. `zenith` — *The Peak Before Ascension (Staging)*
- **Concept:** The final proving ground before code enters the Dao.
- **Rule:** This branch holds the polished version of an upcoming release. No new features are added here, only final tweaks and polish before merging up to `dao`.

### 3. `core` — *The Golden Core (Development)*
- **Concept:** The centralized foundation where all your `qi` gathers.
- **Rule:** This is your primary development branch. All completed features merge here first. **You shouldn't write code directly here either** — always branch off into a `qi-*` or `forge-*` branch.

### 4. Feature Branches — *The Daily Practice*

| Prefix | Purpose | Example |
|--------|---------|---------|
| `qi-*` | New features | `qi-contact-form` |
| `forge-*` | Refactoring / optimization | `forge-navbar-animations` |
| `shatter-*` | Removing old code | `shatter-old-hero-section` |
| `elixir-*` | Hotfixes for production bugs | `elixir-fix-broken-links` |

**Rule:** Every time you sit down to work, branch off `core` and create one of these.

---

## 🌀 The Ascension Path (Merge Flow)

The life cycle of code moving from your mind to the live internet:

```
qi-[feature] ──→ core ──→ zenith ──→ dao
                  ↑         ↑         ↑
               merge PR   polish    release
```

1. `qi-[feature]` → merges into → `core` (feature complete)
2. `core` → merges into → `zenith` (ready for final polish)
3. `zenith` → merges into → `dao` (deploy to production)

---

## ⚔️ The Daily Cultivation Routine (Git Commands)

### 1. Gathering Qi (Building a New Feature)
Let's say you want to add a new "Contact Form."
```bash
# 1. Always start by going to your Core
git checkout core
git pull origin core

# 2. Forge your new Qi branch
git checkout -b qi-contact-form

# 3. ... [Write your code, save your files in VS Code] ...

# 4. Condense the Qi (Commit)
git add .
git commit -m "feat: add functional contact form UI"

# 5. Push your Qi to the heavens (GitHub)
git push -u origin qi-contact-form
```
*After pushing, create a Pull Request on GitHub to merge `qi-contact-form` into `core`.*

### 2. Body Tempering (Refactoring/Optimizing)
When your code works, but it's ugly or slow, and you want to rewrite it without breaking the current version.
```bash
git checkout core
git checkout -b forge-navbar-animations
# ... make your improvements ...
git commit -m "refactor: optimize navbar rendering speed"
```

### 3. Shattering Old Artifacts (Removing Code)
You have old components you no longer need and want to safely delete them.
```bash
git checkout core
git checkout -b shatter-old-hero-section
# ... remove the dead code ...
git commit -m "chore: remove unused hero section component"
```

### 4. Healing a Critical Wound (Hotfixes in Production)
A catastrophic bug is found on the live website (`dao`)!
```bash
# 1. Branch directly from the live code, NOT core.
git checkout dao
git pull origin dao

# 2. Formulate the Elixir
git checkout -b elixir-fix-broken-links

# 3. Apply the medicine
git add .
git commit -m "fix: correct broken routing to projects page"

# 4. Give the medicine to ALL realms (critical!)
# Push and merge into dao (fix production immediately)
# Then ALSO merge into zenith (so it doesn't regress in staging)
# Then ALSO merge into core (so the fix stays in development)
git push -u origin elixir-fix-broken-links
```
*On GitHub, create PRs to merge `elixir-fix-broken-links` into `dao`, `zenith`, AND `core`.*

---

## 📁 Planning & Artifacts

- `.planning/` — GSD project planning files. Lives in `core` and feature branches only.
- `artifacts/` — Design docs, manuals, plans. Lives in `core` and feature branches only.
- Both directories are in `.gitignore` so they **never reach `dao` (production).**

---

## 🔮 Future Realms (Add When Needed)

These branches are useful for larger teams or projects with CI/CD pipelines. Skip them for now.

### `tribulation` — *Testing / QA*
- **When to add:** When you have automated tests, a CI pipeline, or a second person reviewing your code.
- **Where it fits:** Between `core` and `zenith` → `qi-* → core → tribulation → zenith → dao`

### `quasi` — *Release Candidate*
- **When to add:** When you need a "pre-production" environment for large projects with multiple contributors.
- **Where it fits:** Between `tribulation` and `zenith`
