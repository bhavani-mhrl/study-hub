/* ============================================================
   STUDY HUB — APP LOGIC
   Handles: navigation, streak tracking, progress persistence,
   subject rendering/search, PYQ rendering, and the video modal.
   All state is kept in localStorage so it survives reloads.
   ============================================================ */

const STORE_KEY = "studyhub_progress_v1";
const STREAK_KEY = "studyhub_streak_v1";

/* ---------------- STATE ---------------- */
// progress = { [subjectId]: { done: [topicIndex,...], total: N, className, groupLabel, subjectName, icon } }
let progress = loadProgress();
let currentClass = "tenth";
let currentGroup = null; // for inter / btech
let activeSubjectId = null;

function loadProgress(){
  try{
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  }catch(e){ return {}; }
}
function saveProgress(){
  localStorage.setItem(STORE_KEY, JSON.stringify(progress));
}

/* ---------------- STREAK LOGIC ---------------- */
function todayStr(){
  return new Date().toISOString().slice(0,10);
}
function daysBetween(a,b){
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}
function updateStreak(){
  let data;
  try{ data = JSON.parse(localStorage.getItem(STREAK_KEY)); }catch(e){ data = null; }
  const today = todayStr();

  if(!data){
    data = { lastVisit: today, count: 1 };
  } else {
    const gap = daysBetween(data.lastVisit, today);
    if(gap === 0){
      // already visited today, no change
    } else if(gap === 1){
      data.count += 1;
      data.lastVisit = today;
    } else if(gap > 1){
      data.count = 1;
      data.lastVisit = today;
    }
  }
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  return data.count;
}

function renderStreak(){
  const count = updateStreak();
  document.getElementById("streakCount").textContent = count;
  document.getElementById("dashStreak").textContent = count;
  const note = document.getElementById("streakNote");
  if(count === 1) note.textContent = "Great start — come back tomorrow!";
  else if(count < 5) note.textContent = "Keep it going, day by day.";
  else if(count < 15) note.textContent = "Solid habit forming. 🔥";
  else note.textContent = "You're on fire. Don't break the chain!";
}

/* ---------------- HELPERS TO GET SUBJECT LISTS ---------------- */
function getSubjectsFor(cls, group){
  const bucket = DATA[cls];
  if(!bucket) return [];
  if(bucket.groups){
    if(group && bucket.groups[group]) return bucket.groups[group].subjects;
    // no group chosen yet -> flatten all for search purposes
    return Object.values(bucket.groups).flatMap(g => g.subjects);
  }
  return bucket.subjects;
}
function findSubjectMeta(id){
  for(const clsKey of Object.keys(DATA)){
    const bucket = DATA[clsKey];
    if(bucket.groups){
      for(const gKey of Object.keys(bucket.groups)){
        const found = bucket.groups[gKey].subjects.find(s => s.id === id);
        if(found) return { subject: found, className: bucket.label, groupLabel: bucket.groups[gKey].label, classKey: clsKey, groupKey: gKey };
      }
    } else {
      const found = bucket.subjects.find(s => s.id === id);
      if(found) return { subject: found, className: bucket.label, groupLabel: null, classKey: clsKey, groupKey: null };
    }
  }
  return null;
}

/* ---------------- NAVIGATION ---------------- */
function initNav(){
  // Top navbar links (Home / Dashboard / Subjects / Previous Papers)
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => showView(btn.dataset.section));
  });

  // Brand logo click -> home
  document.getElementById("brandLogo").addEventListener("click", () => showView("home"));

  // Any element with data-goto (hero buttons, CTA strip, footer links) navigates too
  document.querySelectorAll("[data-goto]").forEach(btn => {
    btn.addEventListener("click", () => showView(btn.dataset.goto));
  });

  // Dashboard's "Pick your course" quick cards -> jump to Subjects, pre-select the class
  document.querySelectorAll(".course-quick").forEach(btn => {
    btn.addEventListener("click", () => {
      showView("subjects");
      setClassTab(btn.dataset.class);
    });
  });

  // Mobile hamburger toggles the nav-links dropdown
  document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("open");
  });

  document.getElementById("footerYear").textContent = new Date().getFullYear();
}

function showView(name){
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.section === name));
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById("view-" + name).classList.add("active");
  document.getElementById("navLinks").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  if(name === "dashboard") renderDashboard();
}

/* ---------------- SUBJECTS VIEW ---------------- */
function initSubjectsView(){
  document.querySelectorAll("#classTabs .class-tab").forEach(tab => {
    tab.addEventListener("click", () => setClassTab(tab.dataset.class));
  });
  document.getElementById("subjectSearch").addEventListener("input", renderSubjectGrid);
  setClassTab("tenth");
}

function setClassTab(cls){
  currentClass = cls;
  currentGroup = null;
  document.querySelectorAll("#classTabs .class-tab").forEach(t => t.classList.toggle("active", t.dataset.class === cls));

  const bucket = DATA[cls];
  const groupRow = document.getElementById("groupRow");
  groupRow.innerHTML = "";
  if(bucket.groups){
    groupRow.style.display = "flex";
    const keys = Object.keys(bucket.groups);
    currentGroup = keys[0];
    keys.forEach(gKey => {
      const b = document.createElement("button");
      b.className = "group-tab" + (gKey === currentGroup ? " active" : "");
      b.textContent = bucket.groups[gKey].label;
      b.addEventListener("click", () => {
        currentGroup = gKey;
        groupRow.querySelectorAll(".group-tab").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        renderSubjectGrid();
      });
      groupRow.appendChild(b);
    });
  } else {
    groupRow.style.display = "none";
  }
  document.getElementById("subjectSearch").value = "";
  renderSubjectGrid();
}

function renderSubjectGrid(){
  const query = document.getElementById("subjectSearch").value.trim().toLowerCase();
  const grid = document.getElementById("subjectGrid");
  const emptyNote = document.getElementById("subjectEmpty");
  grid.innerHTML = "";

  let subjects = getSubjectsFor(currentClass, currentGroup);
  if(query){
    // if searching, broaden to whole class (all groups) so you can find any subject
    subjects = getSubjectsFor(currentClass, null).filter(s => s.name.toLowerCase().includes(query));
  }

  if(subjects.length === 0){
    emptyNote.style.display = "block";
    return;
  }
  emptyNote.style.display = "none";

  subjects.forEach(s => {
    const p = progress[s.id];
    const pct = p ? Math.round((p.done.length / p.total) * 100) : 0;
    const card = document.createElement("div");
    card.className = "subject-card";
    card.innerHTML = `
      <div class="subject-card-top">
        <span class="subject-emoji">${s.icon}</span>
        ${pct > 0 ? `<span class="subject-badge">${pct}% done</span>` : ""}
      </div>
      <div class="subject-name">${s.name}</div>
      <div class="subject-topics-count">${s.topics.length} topics</div>
      <div class="subject-progress-bar"><div class="subject-progress-fill" style="width:${pct}%"></div></div>
    `;
    card.addEventListener("click", () => openSubjectModal(s.id));
    grid.appendChild(card);
  });
}

/* ---------------- MODAL ---------------- */
function openSubjectModal(id){
  const meta = findSubjectMeta(id);
  if(!meta) return;
  activeSubjectId = id;
  const { subject, className, groupLabel } = meta;

  if(!progress[id]){
    progress[id] = {
      done: [],
      total: subject.topics.length,
      className, groupLabel, subjectName: subject.name, icon: subject.icon
    };
    saveProgress();
  }

  document.getElementById("modalIcon").textContent = subject.icon;
  document.getElementById("modalTitle").textContent = subject.name;
  document.getElementById("modalMeta").textContent = groupLabel ? `${className} · ${groupLabel}` : className;
  document.getElementById("modalVideo").src = ytEmbed(subject.ytQuery);
  document.getElementById("modalYtLink").href = ytSearchLink(subject.ytQuery);

  renderTopicList(id, subject);
  updateModalProgress(id);

  document.getElementById("modalBackdrop").classList.add("open");
}

function renderTopicList(id, subject){
  const list = document.getElementById("topicList");
  list.innerHTML = "";
  const done = new Set(progress[id].done);
  subject.topics.forEach((topic, i) => {
    const li = document.createElement("li");
    li.className = done.has(i) ? "done" : "";
    li.innerHTML = `<input type="checkbox" ${done.has(i) ? "checked" : ""}/> <span>${topic}</span>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      toggleTopic(id, i);
    });
    list.appendChild(li);
  });
}

function toggleTopic(id, index){
  const p = progress[id];
  const pos = p.done.indexOf(index);
  if(pos === -1){
    p.done.push(index);
    showToast("Marked complete ✓");
  } else {
    p.done.splice(pos, 1);
  }
  saveProgress();
  const meta = findSubjectMeta(id);
  renderTopicList(id, meta.subject);
  updateModalProgress(id);
  renderSubjectGrid();
}

function updateModalProgress(id){
  const p = progress[id];
  const pct = Math.round((p.done.length / p.total) * 100);
  document.getElementById("modalProgressFill").style.width = pct + "%";
  document.getElementById("modalProgressText").textContent = `${p.done.length} / ${p.total} topics`;
}

function initModal(){
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalBackdrop").addEventListener("click", (e) => {
    if(e.target.id === "modalBackdrop") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeModal();
  });
}
function closeModal(){
  document.getElementById("modalBackdrop").classList.remove("open");
  document.getElementById("modalVideo").src = "";
  activeSubjectId = null;
  renderDashboard();
}

/* ---------------- TOAST ---------------- */
let toastTimer = null;
function showToast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

/* ---------------- DASHBOARD ---------------- */
function renderDashboard(){
  const entries = Object.entries(progress);
  let totalDone = 0, totalTopics = 0;
  entries.forEach(([, p]) => { totalDone += p.done.length; totalTopics += p.total; });
  const overallPct = totalTopics ? Math.round((totalDone / totalTopics) * 100) : 0;

  document.getElementById("dashCompleted").textContent = totalDone;
  document.getElementById("dashCompletedNote").textContent = `out of ${totalTopics} tracked`;
  document.getElementById("dashSubjects").textContent = entries.length;
  document.getElementById("dashPct").textContent = overallPct + "%";

  const list = document.getElementById("continueList");
  if(entries.length === 0){
    list.innerHTML = `<p class="empty-note">Open a subject to start tracking your progress — it'll show up here.</p>`;
    return;
  }
  // sort by most recently touched = highest done count first (simple heuristic), show up to 5
  const sorted = entries
    .filter(([, p]) => p.done.length < p.total) // still in progress
    .sort((a,b) => b[1].done.length - a[1].done.length)
    .slice(0, 5);

  if(sorted.length === 0){
    list.innerHTML = `<p class="empty-note">You've completed every topic you've opened. Amazing work! 🎉</p>`;
    return;
  }

  list.innerHTML = "";
  sorted.forEach(([id, p]) => {
    const pct = Math.round((p.done.length / p.total) * 100);
    const item = document.createElement("div");
    item.className = "continue-item";
    item.innerHTML = `
      <span class="continue-emoji">${p.icon}</span>
      <div class="continue-info">
        <div class="continue-name">${p.subjectName}</div>
        <div class="continue-meta">${p.groupLabel ? p.groupLabel : p.className}</div>
        <div class="mini-bar"><div class="mini-bar-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="continue-pct">${pct}%</div>
    `;
    item.addEventListener("click", () => openSubjectModal(id));
    list.appendChild(item);
  });
}

/* ---------------- PYQ VIEW ---------------- */
function initPyqView(){
  document.querySelectorAll("#pyqClassTabs .class-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#pyqClassTabs .class-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderPyqGrid(tab.dataset.class);
    });
  });
  renderPyqGrid("tenth");
}

function renderPyqGrid(cls){
  const grid = document.getElementById("pyqGrid");
  grid.innerHTML = "";
  const bucket = PYQ_DATA[cls];
  bucket.papers.forEach(p => {
    const card = document.createElement("div");
    card.className = "pyq-card";
    card.innerHTML = `
      <div class="pyq-title">${p.title}</div>
      <div class="pyq-desc">Opens a live search for the latest available papers and solutions.</div>
      <a class="pyq-btn" href="${ytSearchLinkSafe(p.query)}" target="_blank" rel="noopener">Find papers ↗</a>
    `;
    grid.appendChild(card);
  });
}
// PYQs search the general web, not YouTube — small helper to keep naming clear.
function ytSearchLinkSafe(query){
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

/* ---------------- INIT ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderStreak();
  initNav();
  initSubjectsView();
  initModal();
  initPyqView();
  renderDashboard();
  showView("home");
});
