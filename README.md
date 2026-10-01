# StudyHub — 10th • Intermediate • B.Tech

A single, self-contained web app (no build step, no backend server needed)
covering:

- **Dashboard** — daily streak, topics completed, subjects started, overall
  progress %, and a "continue where you left off" list.
- **Subjects** — pick 10th / Intermediate / B.Tech, then (for Intermediate)
  a group — MPC, BiPC, HEC, CEC, MEC — or (for B.Tech) a branch — Common 1st
  Year, CSE, IT, ECE, EEE, MECH, CIVIL. Search across all subjects instantly.
  Each subject opens a modal with its topic checklist and an embedded
  YouTube search-as-playlist player so videos are always current (no dead
  video links).
- **Previous Year Questions (PYQ)** — a separate section, organised by
  class, that opens a live, always-fresh search for that exact paper set.

All progress and streak data is saved in your browser's `localStorage`, so
it persists between visits on the same browser/device without needing any
database or server.

## How to run it (VS Code "Go Live" on port 5500)

1. Unzip this folder and open it in VS Code (`File → Open Folder`).
2. Install the **Live Server** extension by Ritwick Dey, if you don't have
   it already (Extensions panel → search "Live Server" → Install).
3. Right-click `index.html` in the file explorer and choose
   **"Open with Live Server"** (or click "Go Live" in the bottom-right
   status bar).
4. It will open automatically at **http://127.0.0.1:5500** (or
   `http://localhost:5500`).

No `npm install`, no build step, no backend — it's pure HTML/CSS/JS, so it
works instantly with Live Server or any static file server.

## Folder structure

```
study-hub/
├── index.html          → app shell, all sections/views, modal markup
├── css/
│   └── style.css       → full visual design (single stylesheet)
├── js/
│   ├── data.js         → all subject/topic/PYQ data (edit this to add more!)
│   └── app.js          → navigation, streak logic, progress tracking, search, modal
└── README.md
```

## Customizing / extending

- **Add a subject:** open `js/data.js` and add a new `subj(id, name, icon,
  topics[], ytSearchQuery)` entry inside the right class/group array.
- **Add a new Intermediate group or B.Tech branch:** add a new key under
  `DATA.inter.groups` or `DATA.btech.groups` following the existing pattern.
- **Change the YouTube video search** for a subject: edit its `ytQuery`
  value — the app builds a live YouTube "search as playlist" embed from it,
  so there's nothing else to update.
- **Add more PYQ categories:** edit `PYQ_DATA` in `js/data.js`.

## Notes on the video & PYQ links

Video lessons use YouTube's official "search as playlist" embed
(`youtube.com/embed?listType=search&list=...`), so each subject always
shows fresh, relevant results instead of a single hardcoded video that
could go offline. PYQ cards similarly link to a live web search for that
exact paper set rather than a fixed file, so they never go stale.
