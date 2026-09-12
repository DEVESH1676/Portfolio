🏆 Tier 1 — Do First (High Impact, Reasonable Effort)

# Feature Why

[x] 1 Neural Network Background Instant "wow" factor. Defines the site's identity. Canvas-based = lightweight.
6 Magnetic CTA Buttons Premium feel, ~30 lines of code. Huge polish-per-effort ratio.
2 Citation Copy (BibTeX) Direct academic utility. Simple clipboard + toast. 20 min max.
🥈 Tier 2 — Strong Follow-ups

# Feature Why

5 Reading Progress Bar Tiny effort, integrated into existing Navbar.
9 Glassmorphism Flashlight Hover We already have glass cards — adding radial gradient cursor tracking is ~40 lines.
3 Magnetic Keyword Cloud We already built magnetic hover before, just needs reconnecting.
🥉 Tier 3 — Nice-to-Have

# Feature Why

4 Pub Filtering Good but only 5 publications currently — overkill until list grows.
10 Timeline Auto-Scroll Polish, not essential.
7 Night Shift Cool but niche. Most users have OS-level dark mode.
8 Impact Metrics Needs real citation data; hard to mock convincingly.
My recommendation: Start with #1 (Neural Background) + #6 (Magnetic Buttons) + #2 (Citation Copy) — these three together will transform the site from "clean portfolio" to "this professor knows AI and it shows."

Which ones do you want me to build? Or should I start with all three from Tier 1?

[x] 1. AI-Inspired "Neural Network" Background

- The Idea: A subtle, interactive background for the Hero section using canvas
  or Three.js that visualizes nodes and connections (neural pathways).
- Why it's innovative: It immediately visually communicates the "AI & Machine
  Learning" expertise without saying a word.
- Implementation: Use a lightweight script to draw connections between dots  
  that follow the mouse cursor subtly.

2. Interactive Publication "Citation Copy" (Academic Utility)

- The Idea: Add a "Copy BibTeX" or "Cite" button to each publication.
- Why it's innovative: It provides direct value to other researchers who want
  to cite his work, showing he understands the academic workflow.
- UI/UX: A small icon that, when clicked, copies a pre-formatted BibTeX string
  to the clipboard and shows a "Copied!" toast.

3. Dynamic "Research Keyword" Cloud

- The Idea: Instead of a static list of tags in the Research section, create a
  "Magnetic Keyword Cloud."
- Why it's innovative: Using Framer Motion, keywords can have a magnetic pull
  toward the cursor, making the section feel "alive" and interactive.
- UI/UX: Clicking a keyword could filter the Publications or Projects sections
  to show related work.

4. Publications Filtering & Search

- The Idea: As the list of papers grows, add a real-time filter bar (Filter by
  Year, Filter by Journal, Search by Title).
- Why it's innovative: Transforms a static list into a functional database.
- UX: Uses a "Layout Animation" so cards slide into their new positions  
  smoothly when filters change.

5. "Smart" Reading Progress Indicator

- The Idea: A very thin, high-performance progress bar at the top of the  
  screen (or integrated into the Navbar pill).
- Why it's innovative: For long-form academic portfolios, it helps users  
  understand how much content is left (especially in the Publications/Research
  sections).

6. Magnetic "Call to Action" Buttons

- The Idea: Implement a "Magnetic" hover effect for the main CTAs (Download  
  CV, Contact).
- Why it's innovative: This is a hallmark of high-end, premium design (seen on
  sites like Apple or top design agencies). The button "sticks" to the cursor
  within a certain radius.

7. Automatic Dark Mode "Night Shift"

- The Idea: Use the Geolocation API (with permission) or simple clock logic to
  automatically transition the site into "Midnight Scholar" mode after sunset.
- Why it's innovative: It shows a high level of attention to detail and user  
  comfort.

8. Publication Impact Metrics (Visual Data)

- The Idea: Use recharts (already in package.json) to show a small, clean  
  "Citations over Time" or "Publication Growth" line chart.
- Why it's innovative: Academics are data-driven. Visualizing his research  
  trajectory is more impactful than just listing dates.

9. "Glassmorphism" Hover State for Projects

- The Idea: When hovering over a project card, use a "flashlight" effect where
  a subtle radial gradient follows the mouse behind the glass blur.
- Why it's innovative: It adds depth and a "computational" feel to the UI.

10. Interactive Timeline "Auto-Scroll"

- The Idea: In the Education timeline, as the user scrolls, the line doesn't  
  just fill—it "unlocks" content. We could add a feature where clicking a year
  smoothly scrolls the page to that specific card.

---

Which of these would you like me to implement first? I recommend starting with
the Neural Background or the Publication Filtering, as they provide the highest
visual and functional impact.
