# The Cultivation Branch Flow Manual

Welcome to the path of cultivation. Maintaining a repository is just like managing your inner Qi—if you let energy flow chaotically, you'll experience a Qi Deviation (a messy codebase full of conflicts and bugs). But with a structured path, your codebase will ascend cleanly to immortality.

Here is your practical guide to using this Git strategy in your everyday development.

---

## 🏔️ The Realm Hierarchy (Branch Types)

### 1. `dao` (or `main`) — *The Ultimate Truth*
- **Concept:** Production. This is the live code that the world sees.
- **Rule:** **Never commit directly to this branch.** Code only reaches here once it has survived every tribulation.

### 2. `zenith` — *Staging / V1.0*
- **Concept:** The absolute peak before ascension.
- **Rule:** This branch holds the final, polished version of an upcoming release. No new features are added here, only final tweaks before deploying.

### 3. `quasi` (Optional) — *Release Candidate*
- **Concept:** Code that survived testing and is just waiting for the final push.
- **Rule:** Used for very large projects where you need a "pre-production" environment. (We can skip this for your portfolio for now).

### 4. `tribulation` — *Testing / QA*
- **Concept:** The lightning strikes. Where your code is tested to ensure it doesn't break.
- **Rule:** You merge your `core` branch here to run tests, check for responsive UI bugs, or share with reviewers before it goes to `zenith`.

### 5. `core` (or `dev`) — *The Golden Core*
- **Concept:** The centralized foundation where all your `qi` gathers.
- **Rule:** This is your primary development branch. All completed features are merged into here. **You shouldn't write code directly here either.**

### 6. `qi-*` / `forge-*` / `shatter-*` / `elixir-*` — *The Actions*
- **Concept:** The daily practice. 
- **Rule:** Every time you sit down to work, you branch off `core` and create one of these functional branches.

---

## ⚔️ The Daily Cultivation Routine (Git Commands)

### 1. Gathering Qi (Building a New Feature)
Let's say you want to add a new "Contact Form".
```bash
# 1. Always start by going to your Core
git checkout core
git pull origin core

# 2. Forge your new Qi branch
git checkout -b qi-contact-form

# 3. ... [Write your code, save your files in VS Code] ...

# 4. Condense the Qi (Commit)
git add .
git commit -m "feat: added functional contact form UI"

# 5. Push your Qi to the heavens (GitHub)
git push -u origin qi-contact-form
```
*After pushing, you would go to GitHub and create a "Pull Request" to merge `qi-contact-form` into `core`.*

### 2. Body Tempering (Refactoring/Optimizing)
When your code works, but it's ugly or slow, and you want to rewrite it without breaking the current version.
```bash
git checkout core
git checkout -b forge-navbar-animations
# ... make your improvements ...
git commit -m "refactor: optimized navbar rendering speed"
```

### 3. Healing a Critical Wound (Hotfixes in Production)
A catastrophic bug is found on the live website (`dao`/`main`)!
```bash
# 1. Branch directly from the live code, NOT core.
git checkout main
git pull origin main

# 2. Formulate the Elixir
git checkout -b elixir-fix-broken-links

# 3. Apply the medicine
git add .
git commit -m "fix: corrected broken routing to projects page"

# 4. Give the medicine back to both Dao and Core
# You push this, then on GitHub merge it into `main` to fix the live site immediately, AND merge it into `core` so the bug doesn't accidentally return in the next update.
```

### 4. Shattering Old Artifacts (Removing Code)
You have old components you no longer need and want to safely delete them.
```bash
git checkout core
git checkout -b shatter-old-hero-section
```

---

## 🌀 The Ascension Path (The Merge Flow)
The life cycle of a piece of code moving from your mind to the live internet looks exactly like this:
1. `qi-[feature]` ➔ merges into ➔ `core`
2. `core` ➔ merges into ➔ `tribulation` (for testing on different devices)
3. `tribulation` ➔ merges into ➔ `zenith` (final polish before release)
4. `zenith` ➔ merges into ➔ `dao`/`main` (the live portfolio site)
