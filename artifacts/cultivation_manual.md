# The Cultivation Branch Flow Manual

Welcome to the path of cultivation. Maintaining a repository is just like managing your inner Qi—if you let energy flow chaotically, you'll experience a Qi Deviation (a messy codebase full of conflicts and bugs). But with a structured path, your codebase will ascend cleanly to immortality.

Here is your practical guide to using this Git strategy in your everyday development.

---

## 🏔️ The Realm Hierarchy (Branch Types)

### 1. `dao` (or `main`) — *The Ultimate Truth*
- **Concept:** Production. This is the live code that the world sees.
- **Rule:** **Never commit directly to this branch.** Code only reaches here once it merges from `zenith`.

### 2. `zenith` — *Staging / Release Candidate*
- **Concept:** The absolute peak before ascension.
- **Rule:** This branch holds the final, polished version of an upcoming release. Merged from `core`.

### 3. `core` (or `dev`) — *The Golden Core*
- **Concept:** The centralized foundation where all your `qi` gathers.
- **Rule:** This is your primary development branch. All completed features are merged into here. **You shouldn't write code directly here either.**

### 4. `qi-*` / `forge-*` / `elixir-*` / `shatter-*` — *The Active Cultivation*
- **Concept:** The daily practice. 
- **Rule:** Every time you sit down to work, you branch off `core` and create one of these functional branches. **These branches stay locally on your machine—never push them to remote.**

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

# 5. Iteratively test and commit until requested to Merge by the user.
```

### 2. Merge to Core (Once Features Are Perfected)
When the user explicitly says "looks good, merge it", follow this ascension step:
```bash
git checkout core
git merge qi-contact-form
git push origin core
git branch -d qi-contact-form
```
*Note: Feature branches are NEVER pushed directly. Only the consolidated `core` branch pushes.*

### 3. Healing a Critical Wound (Hotfixes in Production)
A catastrophic bug is found on the live website (`dao`/`main`)!
```bash
# 1. Branch directly from the live code
git checkout dao
git checkout -b elixir-fix-broken-links

# 2. Apply the medicine locally
git add .
git commit -m "fix: corrected broken routing to projects page"

# 3. Formally merge the Elixir up the chain
git checkout dao
git merge elixir-fix-broken-links
git checkout zenith
git merge elixir-fix-broken-links
git checkout core
git merge elixir-fix-broken-links

# 4. Push the fixed realms
git push origin dao zenith core
```

---

## 🌀 The Ascension Path (Deployment Flow)
The life cycle of a piece of code moving from your mind to the live internet looks exactly like this:
1. `qi-[feature]` (LOCAL ONLY) ➔ merges into ➔ `core`
2. `core` ➔ merges into ➔ `zenith` (staging preparation)
3. `zenith` ➔ merges into ➔ `dao`/`main` (live portfolio deployment)
