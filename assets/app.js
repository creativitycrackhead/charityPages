// Renders the site from window.IDEAS using hash routes:
//   #/                 home
//   #/ideas[/<cat>]    all ideas with search, category filter and sort
//   #/idea/<id>        one idea
//   #/start            how to start any program
//   #/about            how ideas are scored and where the voice comes from
//   #/my               dashboard of programs this browser is tracking
(function () {
  "use strict";

  var main = document.getElementById("main");
  var CATS = window.CATEGORIES;
  var CRITERIA = [
    { key: "financial", label: "Savings", hint: "Money saved or brought in per household" },
    { key: "ease", label: "Ease", hint: "Low cost and quick to start with the volunteers you have" },
    { key: "reach", label: "Reach", hint: "How many households could benefit" },
  ];
  var LEVELS = { simple: "Simple", moderate: "Moderate", complex: "Complex" };
  var CAT_BLURBS = {
    food: "Halal groceries, pantries and shared meals.",
    money: "Zakat, benefits, taxes and budgeting.",
    jobs: "Resumes, interviews and scholarships.",
    family: "Family events, childcare and homework help.",
    sharing: "Swaps, repairs and lending.",
    care: "Rides for elders and open days for neighbors.",
  };

  // Flat, single-color icons (no gradients), drawn on a 24x24 grid.
  var ICONS = {
    food: '<path d="M2 10h20a10 10 0 0 1-20 0z"/><rect x="9" y="19.5" width="6" height="2.5" rx="1"/><circle cx="7.5" cy="6.5" r="1.6"/><circle cx="12" cy="4.5" r="1.6"/><circle cx="16.5" cy="6.5" r="1.6"/>',
    money: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 8.5c0 1.7 3.6 3 8 3s8-1.3 8-3v3.5c0 1.7-3.6 3-8 3s-8-1.3-8-3z"/><path d="M4 15c0 1.7 3.6 3 8 3s8-1.3 8-3v3.5c0 1.7-3.6 3-8 3s-8-1.3-8-3z"/>',
    jobs: '<path fill-rule="evenodd" d="M9 3h6a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3V5a2 2 0 0 1 2-2zm0 2v2h6V5z"/>',
    family: '<circle cx="8" cy="6" r="3.2"/><circle cx="17" cy="8.5" r="2.5"/><path d="M2 21v-3.5a6 6 0 0 1 12 0V21z"/><path d="M15 21v-3a4 4 0 0 1 7.5-2V21z"/>',
    sharing: '<path d="M21.5 6.5a5.5 5.5 0 0 1-7.2 5.2L6.2 19.8a2.1 2.1 0 0 1-3-3l8.1-8.1A5.5 5.5 0 0 1 17.5 1.5l-3.2 3.2.9 3.1 3.1.9z"/>',
    care: '<path d="M12 21.5s-9-5.4-9-12A5 5 0 0 1 12 6.6a5 5 0 0 1 9 2.9c0 6.6-9 12-9 12z"/>',
    arrow: '<path d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6z"/>',
    print: '<path d="M6 2h12v5H6z"/><path fill-rule="evenodd" d="M4 8h16a2 2 0 0 1 2 2v7h-4v5H6v-5H2v-7a2 2 0 0 1 2-2zm4 7v5h8v-5z"/>',
    link: '<path d="M10.6 13.4a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0z"/><path d="M8.5 11.5 6 14a3 3 0 0 0 4.2 4.2l2.5-2.5 1.4 1.4-2.5 2.5A5 5 0 0 1 4.5 12.5L7 10z"/><path d="M15.5 12.5 18 10a3 3 0 0 0-4.2-4.2l-2.5 2.5-1.4-1.4 2.5-2.5a5 5 0 0 1 7.1 7.1L17 14z"/>',
    check: '<path d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7z"/>',
    flag: '<path d="M5 2h2v20H5z"/><path d="M8 3h11l-2.5 4.5L19 12H8z"/>',
    download: '<path d="M11 3h2v9.2l3.6-3.6L18 10l-6 6-6-6 1.4-1.4 3.6 3.6z"/><path d="M4 18h16v2H4z"/>',
    upload: '<path d="M11 16h2V6.8l3.6 3.6L18 9l-6-6-6 6 1.4 1.4L11 6.8z"/><path d="M4 18h16v2H4z"/>',
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || "icon") + '" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + "</svg>";
  }

  // Rank by total score; ties broken by financial impact, then reach.
  var ranked = window.IDEAS.map(function (idea) {
    var s = idea.scores;
    return Object.assign({}, idea, { total: s.financial + s.ease + s.reach });
  });
  ranked.sort(function (a, b) {
    return b.total - a.total || b.scores.financial - a.scores.financial || b.scores.reach - a.scores.reach;
  });
  ranked.forEach(function (idea, i) { idea.rank = i + 1; });
  var byId = {};
  ranked.forEach(function (idea) { byId[idea.id] = idea; });

  // List-view state survives navigating to an idea and back.
  var state = { query: "", category: "all", sort: "rank" };
  try {
    var saved = JSON.parse(sessionStorage.getItem("listState") || "null");
    if (saved) state = Object.assign(state, saved);
  } catch (e) { /* storage unavailable; use defaults */ }

  function saveState() {
    try { sessionStorage.setItem("listState", JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function esc(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function meter(value) {
    var dots = "";
    for (var i = 1; i <= 5; i++) dots += '<span class="dot' + (i <= value ? " on" : "") + '"></span>';
    return '<span class="meter" aria-hidden="true">' + dots + "</span>";
  }

  function scoreRows(idea) {
    return CRITERIA.map(function (c) {
      return (
        '<div class="score" title="' + esc(c.hint) + '">' +
        '<span class="score-label">' + c.label + "</span>" + meter(idea.scores[c.key]) +
        '<span class="sr">' + idea.scores[c.key] + " out of 5</span></div>"
      );
    }).join("");
  }

  function catBadge(key) {
    return '<span class="cat cat-' + key + '">' + icon(key, "icon icon-sm") + esc(CATS[key]) + "</span>";
  }

  function card(idea) {
    return (
      '<li><a class="card cat-tint-' + idea.category + '" href="#/idea/' + idea.id + '">' +
      '<div class="card-top">' +
      '<span class="card-icon cat-' + idea.category + '">' + icon(idea.category) + "</span>" +
      '<span class="rank">#' + idea.rank + "</span></div>" +
      '<span class="card-cat">' + esc(CATS[idea.category]) + "</span>" +
      "<h3>" + esc(idea.title) + "</h3>" +
      '<p class="card-tagline">' + esc(idea.tagline) + "</p>" +
      '<dl class="card-meta">' +
      "<div><dt>Start-up</dt><dd>" + esc(idea.glance.cost) + "</dd></div>" +
      "<div><dt>Launch</dt><dd>" + esc(idea.glance.launch) + "</dd></div>" +
      "</dl>" +
      '<div class="scores">' + scoreRows(idea) + "</div>" +
      "</a></li>"
    );
  }

  function setTitle(t) { document.title = t ? t + " · Masjid Community Ideas" : "Masjid Community Ideas"; }

  // ---- Home ----
  // Deliberately minimal: one message, one search box, one way in per category.
  // Detail lives on the Ideas page and each program's own page.

  function renderHome() {
    setTitle("");
    var cats = Object.keys(CATS).map(function (key) {
      return '<li><a class="home-cat cat-' + key + '" href="#/ideas/' + key + '">' + icon(key, "icon icon-sm") + esc(CATS[key]) + "</a></li>";
    }).join("");

    main.innerHTML =
      '<section class="home"><div class="wrap home-inner">' +
      starSvg("home-star") +
      "<h1>Make your masjid the heart of the neighborhood.</h1>" +
      '<p class="lede">' + ranked.length + " simple programs any mosque can start with the people it already has.</p>" +
      '<form class="home-search" role="search" id="home-search">' +
      '<label class="sr" for="home-q">Search programs</label>' +
      '<input id="home-q" type="search" placeholder="Try zakat, iftar or tutoring" autocomplete="off">' +
      '<button type="submit" class="btn btn-primary">Search</button></form>' +
      '<ul class="home-cats" aria-label="Browse by need">' + cats + "</ul>" +
      '<p class="home-links"><a class="text-link" href="#/ideas">See all programs ' + icon("arrow", "icon icon-sm") + "</a>" +
      '<a class="text-link" href="#/start">How to start ' + icon("arrow", "icon icon-sm") + "</a></p>" +
      "</div></section>";

    document.getElementById("home-search").addEventListener("submit", function (e) {
      e.preventDefault();
      state.query = document.getElementById("home-q").value;
      state.category = "all";
      saveState();
      location.hash = "#/ideas";
    });
  }

  function starSvg(cls) {
    return (
      '<svg class="' + cls + '" viewBox="0 0 100 100" aria-hidden="true">' +
      '<rect x="22" y="22" width="56" height="56" rx="4"/>' +
      '<rect x="22" y="22" width="56" height="56" rx="4" transform="rotate(45 50 50)"/>' +
      '<circle cx="50" cy="50" r="14" class="star-core"/>' +
      "</svg>"
    );
  }

  function statsStrip() {
    var examples = ranked.reduce(function (n, i) {
      return n + i.examples.filter(function (e) { return e.url; }).length;
    }, 0);
    var quick = ranked.filter(function (i) { return i.glance.launchWeeks <= 4; }).length;
    var cheap = ranked.filter(function (i) { return i.glance.costMax !== null && i.glance.costMax <= 100; }).length;
    return '<div class="stats">' + [
      [ranked.length, "programs with a step-by-step plan"],
      [examples, "real examples to learn from"],
      [quick, "can launch within a month"],
      [cheap, "cost $100 or less to start"],
    ].map(function (s) {
      return '<div class="stat"><strong>' + s[0] + "</strong><span>" + s[1] + "</span></div>";
    }).join("") + "</div>";
  }

  // ---- Ideas list ----

  function filtered() {
    var q = state.query.trim().toLowerCase();
    var list = ranked.filter(function (idea) {
      if (state.category !== "all" && idea.category !== state.category) return false;
      if (!q) return true;
      var haystack = [idea.title, idea.tagline, idea.summary].concat(
        idea.examples.map(function (e) { return e.name; })
      ).join(" ").toLowerCase();
      return haystack.indexOf(q) !== -1;
    });
    if (state.sort !== "rank") {
      list.sort(function (a, b) {
        if (state.sort === "launch") return a.glance.launchWeeks - b.glance.launchWeeks || a.rank - b.rank;
        return b.scores[state.sort] - a.scores[state.sort] || a.rank - b.rank;
      });
    }
    return list;
  }

  function renderListResults() {
    var list = filtered();
    document.getElementById("count").textContent = list.length === 1 ? "1 program" : list.length + " programs";
    document.getElementById("results").innerHTML = list.length
      ? list.map(card).join("")
      : '<li class="empty">No programs match. Try a different word or category.</li>';
  }

  function renderList(cat) {
    setTitle("Ideas");
    if (cat && CATS[cat]) { state.category = cat; saveState(); }
    var chips = ['<button type="button" class="chip" data-cat="all">All</button>']
      .concat(Object.keys(CATS).map(function (key) {
        return '<button type="button" class="chip" data-cat="' + key + '">' + icon(key, "icon icon-sm") + esc(CATS[key]) + "</button>";
      })).join("");

    main.innerHTML =
      '<section class="page-head"><div class="wrap">' +
      '<p class="eyebrow">' + ranked.length + " programs</p>" +
      "<h1>Find the right program for your masjid</h1>" +
      '<p class="lede">Ranked by how much they can save families, how easy they are to start, and how many households they reach.</p>' +
      statsStrip() +
      "</div></section>" +
      '<div class="wrap">' +
      '<section class="controls" aria-label="Filter programs">' +
      '<label class="search"><span class="sr">Search programs</span>' +
      '<input id="q" type="search" placeholder="Search, e.g. zakat, iftar, tutoring" autocomplete="off"></label>' +
      '<div class="chips" role="group" aria-label="Category">' + chips + "</div>" +
      '<div class="sort-row"><span id="count" class="count" aria-live="polite"></span>' +
      '<label class="sort">Sort by <select id="sort">' +
      '<option value="rank">Overall rank</option>' +
      '<option value="financial">Biggest savings</option>' +
      '<option value="ease">Easiest to start</option>' +
      '<option value="reach">Widest reach</option>' +
      '<option value="launch">Fastest to launch</option>' +
      "</select></label></div></section>" +
      '<ol id="results" class="cards"></ol></div>';

    var q = document.getElementById("q");
    var sort = document.getElementById("sort");
    q.value = state.query;
    sort.value = state.sort;

    function syncChips() {
      main.querySelectorAll(".chip").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.cat === state.category));
      });
    }

    q.addEventListener("input", function () { state.query = q.value; saveState(); renderListResults(); });
    sort.addEventListener("change", function () { state.sort = sort.value; saveState(); renderListResults(); });
    main.querySelector(".chips").addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      state.category = btn.dataset.cat;
      saveState();
      syncChips();
      renderListResults();
    });

    syncChips();
    renderListResults();
  }

  // ---- Idea page ----

  function bullets(items, cls) {
    return '<ul class="' + (cls || "bullets") + '">' + items.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  }

  function renderIdea(idea, opts) {
    setTitle(idea.title);
    var g = idea.glance;
    var scrollY = window.scrollY;

    var examples = idea.examples.map(function (ex) {
      var name = ex.url
        ? '<a href="' + esc(ex.url) + '" target="_blank" rel="noopener">' + esc(ex.name) + "</a>"
        : esc(ex.name);
      return "<li><h3>" + name + "</h3><p>" + esc(ex.text) + "</p></li>";
    }).join("");

    var actions = idea.actions.map(function (a, i) {
      var t = trackerStepControls(idea, i);
      var criteria = a.entry || a.exit
        ? '<dl class="criteria">' +
          (a.entry ? "<dt>Start when</dt><dd>" + esc(a.entry) + "</dd>" : "") +
          (a.exit ? "<dt>Done when</dt><dd>" + esc(a.exit) + "</dd>" : "") +
          "</dl>"
        : "";
      return (
        '<li class="action' + (t.check ? " tracked" : "") + (t.done ? " is-done" : "") + '">' + t.check +
        '<div class="action-head"><h3>' + esc(a.title) + "</h3>" +
        '<span class="level level-' + a.level + '">' + LEVELS[a.level] + "</span></div>" +
        "<p>" + esc(a.text) + "</p>" + criteria + t.note + "</li>"
      );
    }).join("");

    var prev = ranked[idea.rank - 2];
    var next = ranked[idea.rank];

    main.innerHTML =
      '<section class="idea-hero cat-tint-' + idea.category + '"><div class="wrap">' +
      '<p class="crumbs"><a href="#/ideas">Ideas</a> <span aria-hidden="true">/</span> <a href="#/ideas/' + idea.category + '">' + esc(CATS[idea.category]) + "</a></p>" +
      '<div class="idea-hero-grid"><div>' +
      '<div class="idea-badges">' + catBadge(idea.category) + '<span class="rank">#' + idea.rank + " of " + ranked.length + "</span></div>" +
      "<h1>" + esc(idea.title) + "</h1>" +
      '<p class="tagline">' + esc(idea.tagline) + "</p>" +
      '<p class="lede">' + esc(idea.summary) + "</p>" +
      '<div class="cta-row no-print"><button type="button" class="btn btn-primary" id="print">' + icon("print") + "Print the plan</button>" +
      '<button type="button" class="btn btn-ghost" id="copy">' + icon("link") + '<span>Copy link</span></button></div>' +
      "</div>" +
      '<aside class="glance" aria-label="At a glance"><h2>At a glance</h2><dl>' +
      "<div><dt>Start-up cost</dt><dd>" + esc(g.cost) + "</dd></div>" +
      "<div><dt>Volunteers</dt><dd>" + esc(g.volunteers) + "</dd></div>" +
      "<div><dt>Time to launch</dt><dd>" + esc(g.launch) + "</dd></div>" +
      "</dl>" +
      '<div class="scores scores-lg">' + scoreRows(idea) + "</div>" +
      '<p class="glance-note">Estimates. Your masjid may be faster or slower.</p></aside>' +
      "</div></div></section>" +

      '<div class="wrap idea-body">' +
      '<section class="impact-callout">' + icon("check", "icon impact-icon") + "<p>" + esc(idea.impact) + "</p></section>" +
      '<section><h2>Why it matters</h2>' + bullets(idea.why) + "</section>" +
      '<section><h2>Proven by</h2><p class="section-sub">Real organizations running this kind of program. Follow the links to learn from them.</p><ul class="examples">' + examples + "</ul></section>" +
      '<section id="steps"><h2>Steps to start</h2>' + trackerPanel(idea) + '<ol class="actions">' + actions + "</ol></section>" +
      '<section><h2>What you need</h2>' + bullets(idea.resources, "bullets checks") + "</section>" +
      '<section class="watch"><h2>Watch out for</h2>' + bullets(idea.watchouts) + "</section>" +
      '<section class="next-step no-print"><h2>Ready to start?</h2><p>Our guide covers what every program needs: a lead, your board\'s blessing, a small pilot and a way to share results.</p>' +
      '<a class="btn btn-primary" href="#/start">How to start a program ' + icon("arrow") + "</a></section>" +
      '<nav class="pager no-print" aria-label="More programs">' +
      (prev ? '<a href="#/idea/' + prev.id + '"><span>Previous</span>' + esc(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a class="next" href="#/idea/' + next.id + '"><span>Next</span>' + esc(next.title) + "</a>" : "") +
      "</nav></div>";

    currentIdea = idea;
    if (opts && opts.keepScroll) window.scrollTo(0, scrollY);
    document.getElementById("print").addEventListener("click", function () { window.print(); });
    var copy = document.getElementById("copy");
    copy.addEventListener("click", function () {
      var label = copy.querySelector("span");
      function done(text) { label.textContent = text; setTimeout(function () { label.textContent = "Copy link"; }, 2000); }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href).then(function () { done("Link copied"); }, function () { done("Couldn't copy"); });
      } else {
        done("Couldn't copy");
      }
    });
  }

  // ---- Progress tracking ----
  // Saved only in this browser (localStorage), keyed by idea id:
  //   { startedAt, updatedAt, lead, steps: { <index>: { doneAt, note } } }
  // Export/import lets a team move progress between devices until there's a
  // shared backend (see TOOLS-NEEDED.md).

  var STORE_KEY = "masjidPrograms.v1";
  var storageOk = true;

  function loadPrograms() {
    try {
      var data = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      return data && typeof data === "object" ? data : {};
    } catch (e) {
      storageOk = false;
      return {};
    }
  }

  function savePrograms(data) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch (e) {
      storageOk = false;
    }
    updateNavCount();
  }

  function getProgram(id) { return loadPrograms()[id] || null; }

  function updateProgram(id, fn) {
    var data = loadPrograms();
    if (!data[id]) return;
    fn(data[id]);
    data[id].updatedAt = new Date().toISOString();
    savePrograms(data);
  }

  function startProgram(id) {
    var data = loadPrograms();
    if (!data[id]) {
      var now = new Date().toISOString();
      data[id] = { startedAt: now, updatedAt: now, lead: "", steps: {} };
      savePrograms(data);
    }
  }

  function stopProgram(id) {
    var data = loadPrograms();
    delete data[id];
    savePrograms(data);
  }

  function progressOf(idea, prog) {
    var done = idea.actions.filter(function (a, i) { return prog.steps[i] && prog.steps[i].doneAt; }).length;
    var nextIndex = -1;
    for (var i = 0; i < idea.actions.length; i++) {
      if (!(prog.steps[i] && prog.steps[i].doneAt)) { nextIndex = i; break; }
    }
    return { done: done, total: idea.actions.length, pct: Math.round((done / idea.actions.length) * 100), nextIndex: nextIndex };
  }

  function trackedIds() {
    var data = loadPrograms();
    return Object.keys(data).filter(function (id) { return byId[id]; });
  }

  function updateNavCount() {
    var el = document.getElementById("nav-count");
    if (!el) return;
    var n = trackedIds().length;
    el.textContent = n;
    el.hidden = n === 0;
  }

  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    } catch (e) {
      return "";
    }
  }

  function progressBar(p) {
    return (
      '<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + p.pct + '" aria-label="Progress">' +
      '<span style="width:' + p.pct + '%"></span></div>'
    );
  }

  // Tracker panel shown above the steps on an idea page.
  function trackerPanel(idea) {
    var prog = getProgram(idea.id);
    if (!prog) {
      return (
        '<div class="tracker tracker-off no-print">' +
        "<div><strong>Running this at your masjid?</strong><p>Track it here: tick off steps as you go, add notes, and see everything on your dashboard.</p></div>" +
        '<button type="button" class="btn btn-primary" data-track="start">' + icon("flag") + "Start this program</button></div>"
      );
    }
    var p = progressOf(idea, prog);
    var status = p.done === p.total
      ? "All steps done. Mabrook!"
      : p.done + " of " + p.total + " steps done";
    return (
      '<div class="tracker">' +
      '<div class="tracker-head"><div><strong>' + esc(status) + "</strong>" +
      '<span class="tracker-meta">Started ' + esc(fmtDate(prog.startedAt)) + "</span></div>" +
      '<a class="text-link no-print" href="#/my/' + idea.id + '">Dashboard and impact ' + icon("arrow", "icon icon-sm") + "</a></div>" +
      progressBar(p) +
      '<label class="lead-field">Program lead <input type="text" data-track="lead" maxlength="80" placeholder="Who owns this program?" value="' + esc(prog.lead || "") + '"></label>' +
      '<button type="button" class="link-btn no-print" data-track="stop">Stop tracking</button>' +
      "</div>"
    );
  }

  function trackerStepControls(idea, i) {
    var prog = getProgram(idea.id);
    if (!prog) return { check: "", note: "", done: false };
    var step = prog.steps[i] || {};
    var done = !!step.doneAt;
    return {
      done: done,
      check:
        '<label class="step-check"><input type="checkbox" data-track="step" data-step="' + i + '"' + (done ? " checked" : "") + ">" +
        '<span class="sr">Mark step ' + (i + 1) + " done</span></label>",
      note:
        (done ? '<p class="step-done">Done ' + esc(fmtDate(step.doneAt)) + "</p>" : "") +
        '<label class="step-note"><span class="sr">Notes for step ' + (i + 1) + "</span>" +
        '<textarea rows="1" data-track="note" data-step="' + i + '" placeholder="Add a note (who, when, what you learned)">' + esc(step.note || "") + "</textarea></label>",
    };
  }

  // Delegated once on <main>; acts on whichever idea page is showing.
  var currentIdea = null;

  function bindTracker() {
    main.addEventListener("click", function (e) {
      var idea = currentIdea;
      if (!idea) return;
      var btn = e.target.closest("[data-track]");
      if (!btn || btn.tagName === "INPUT" || btn.tagName === "TEXTAREA") return;
      if (btn.dataset.track === "start") {
        startProgram(idea.id);
        renderIdea(idea, { keepScroll: true });
      } else if (btn.dataset.track === "stop") {
        if (window.confirm("Stop tracking " + idea.title + "? Your ticks and notes for it will be deleted from this browser.")) {
          stopProgram(idea.id);
          renderIdea(idea, { keepScroll: true });
        }
      }
    });
    main.addEventListener("change", function (e) {
      var idea = currentIdea;
      var el = e.target;
      if (!idea) return;
      if (el.dataset.track === "step") {
        var i = el.dataset.step;
        updateProgram(idea.id, function (prog) {
          prog.steps[i] = prog.steps[i] || {};
          prog.steps[i].doneAt = el.checked ? new Date().toISOString() : null;
        });
        renderIdea(idea, { keepScroll: true });
      }
    });
    // Save text as people type, without re-rendering (keeps focus).
    main.addEventListener("input", function (e) {
      var idea = currentIdea;
      var el = e.target;
      if (!idea) return;
      if (el.dataset.track === "note") {
        updateProgram(idea.id, function (prog) {
          var i = el.dataset.step;
          prog.steps[i] = prog.steps[i] || {};
          prog.steps[i].note = el.value;
        });
      } else if (el.dataset.track === "lead") {
        updateProgram(idea.id, function (prog) { prog.lead = el.value; });
      }
    });
  }

  // ---- Impact log ----
  // Each tracked program can keep prog.log = [{ id, date: "YYYY-MM-DD",
  // families, hours, saved, note }], one entry per session or distribution.

  function impactOf(prog) {
    var log = (prog.log || []).slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
    var sum = function (k) { return log.reduce(function (n, e) { return n + (Number(e[k]) || 0); }, 0); };
    return {
      log: log,
      sessions: log.length,
      families: sum("families"),
      hours: sum("hours"),
      saved: sum("saved"),
      first: log.length ? log[0].date : null,
    };
  }

  function num(n) { return Number(n).toLocaleString(undefined, { maximumFractionDigits: 1 }); }
  function money(n) { return "$" + Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 }); }

  function fmtDay(ymd) {
    // Parse as a local date so "2026-10-22" doesn't shift a day in some time zones.
    var parts = ymd.split("-");
    return fmtDate(new Date(+parts[0], +parts[1] - 1, +parts[2]).toISOString());
  }

  function todayYmd() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function niceMax(v) {
    if (v <= 5) return 5;
    var pow = Math.pow(10, Math.floor(Math.log10(v)));
    var steps = [1, 2, 2.5, 5, 10];
    for (var i = 0; i < steps.length; i++) if (steps[i] * pow >= v) return steps[i] * pow;
    return 10 * pow;
  }

  // Single-series bar chart of families served per session (most recent 24).
  function impactChart(log, category) {
    var data = log.slice(-24);
    if (!data.length) return "";
    // Size the drawing to the space available so text stays readable on phones.
    var W = Math.round(Math.min(1080, Math.max(300, main.clientWidth - 70))), H = W < 500 ? 200 : 240, padL = 36, padR = 8, padT = 12, padB = 28;
    var max = niceMax(Math.max.apply(null, data.map(function (e) { return Number(e.families) || 0; })));
    var plotW = W - padL - padR, plotH = H - padT - padB;
    var slot = plotW / data.length;
    var barW = Math.max(4, Math.min(40, slot - 2));
    var grid = [0, 0.5, 1].map(function (f) {
      var y = padT + plotH - f * plotH;
      return '<line class="grid" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + y + '" y2="' + y + '"/>' +
        '<text class="axis" x="' + (padL - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + num(max * f) + "</text>";
    }).join("");
    var bars = data.map(function (e, i) {
      var v = Number(e.families) || 0;
      var h = Math.max(v > 0 ? 2 : 0, (v / max) * plotH);
      var x = padL + i * slot + (slot - barW) / 2;
      var y = padT + plotH - h;
      var r = Math.min(4, barW / 2, h);
      // Rounded top corners only, anchored flat on the baseline.
      var d = "M" + x + "," + (padT + plotH) + "V" + (y + r) + "Q" + x + "," + y + " " + (x + r) + "," + y +
        "H" + (x + barW - r) + "Q" + (x + barW) + "," + y + " " + (x + barW) + "," + (y + r) + "V" + (padT + plotH) + "Z";
      var tip = fmtDay(e.date) + ": " + num(v) + (v === 1 ? " family" : " families") + (e.hours ? ", " + num(e.hours) + " volunteer hours" : "");
      return '<g class="bar" data-tip="' + esc(tip) + '"><rect class="hit" x="' + (padL + i * slot) + '" y="' + padT + '" width="' + slot + '" height="' + plotH + '"/>' +
        (h ? '<path d="' + d + '"/>' : "") + "<title>" + esc(tip) + "</title></g>";
    }).join("");
    var labels = [0, data.length - 1].filter(function (v, i, a) { return a.indexOf(v) === i; }).map(function (i) {
      var x = padL + i * slot + slot / 2;
      return '<text class="axis" x="' + x + '" y="' + (H - 8) + '" text-anchor="' + (i === 0 && data.length > 1 ? "start" : data.length > 1 ? "end" : "middle") + '">' + esc(fmtDay(data[i].date)) + "</text>";
    }).join("");
    return (
      '<figure class="chart cat-tint-' + category + '"><figcaption>Families served per session' + (log.length > 24 ? " (latest 24)" : "") + "</figcaption>" +
      '<div class="chart-box"><svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Bar chart of families served per session">' +
      grid + '<line class="baseline" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + (padT + plotH) + '" y2="' + (padT + plotH) + '"/>' +
      bars + labels + "</svg>" + '<div class="chart-tip" hidden></div></div></figure>'
    );
  }

  function shareText(idea, prog, im) {
    var parts = [];
    parts.push("Alhamdulillah! Since " + fmtDay(im.first) + ", our " + idea.title + " has served " + num(im.families) +
      (im.families === 1 ? " family" : " families") + " over " + im.sessions + (im.sessions === 1 ? " session" : " sessions") + ".");
    if (im.hours) parts.push("Volunteers gave " + num(im.hours) + " hours of their time.");
    if (im.saved) parts.push("Together we saved families about " + money(im.saved) + ".");
    parts.push("JazakAllahu khayran to everyone who helped. Everyone is welcome to join us.");
    return parts.join(" ");
  }

  function renderProgramDash(idea) {
    var prog = getProgram(idea.id);
    if (!prog) { location.hash = "#/idea/" + idea.id; return; }
    setTitle(idea.title + " dashboard");
    currentDash = idea;
    var p = progressOf(idea, prog);
    var im = impactOf(prog);

    var tiles = [
      [num(im.families), "families served"],
      [im.sessions, im.sessions === 1 ? "session logged" : "sessions logged"],
      [num(im.hours), "volunteer hours"],
      [im.saved ? money(im.saved) : "–", "saved for families"],
    ].map(function (t) { return '<div class="stat"><strong>' + t[0] + "</strong><span>" + t[1] + "</span></div>"; }).join("");

    var next = p.nextIndex === -1 ? "All steps done" : "Next step: " + idea.actions[p.nextIndex].title;

    var rows = im.log.slice().reverse().map(function (e) {
      return '<tr><td class="nowrap">' + esc(fmtDay(e.date)) + "</td><td>" + num(e.families || 0) + "</td><td>" + num(e.hours || 0) + "</td><td>" +
        (e.saved ? money(e.saved) : "–") + '</td><td class="note-cell">' + esc(e.note || "") + "</td>" +
        '<td><button type="button" class="link-btn" data-del="' + esc(e.id) + '">Delete</button></td></tr>';
    }).join("");

    main.innerHTML =
      '<section class="page-head cat-tint-' + idea.category + ' dash-head"><div class="wrap">' +
      '<p class="crumbs"><a href="#/my">My programs</a> <span aria-hidden="true">/</span> ' + esc(idea.title) + "</p>" +
      '<div class="dash-title-row"><span class="card-icon cat-' + idea.category + '">' + icon(idea.category) + "</span>" +
      "<div><h1>" + esc(idea.title) + "</h1>" +
      '<p class="dash-meta">Started ' + esc(fmtDate(prog.startedAt)) + (prog.lead ? " · Lead: " + esc(prog.lead) : "") + "</p></div></div>" +
      '<div class="dash-progress">' + progressBar(p) + '<span><strong>' + p.pct + "%</strong> of steps done · " + esc(next) +
      ' · <a href="#/idea/' + idea.id + '">Open the plan</a></span></div>' +
      '<div class="stats">' + tiles + "</div>" +
      "</div></section>" +
      '<div class="wrap">' +
      (im.sessions ? impactChart(im.log, idea.category) : '<div class="empty-state small"><h2>No impact logged yet</h2><p>After each session or distribution, add a line below. Your totals, chart and shareable summary build up from there.</p></div>') +
      '<div class="dash-grid">' +
      '<section class="log-form no-print"><h2>Log a session</h2>' +
      '<form id="log-form">' +
      '<label>Date<input type="date" name="date" required value="' + todayYmd() + '"></label>' +
      '<label>Families served<input type="number" name="families" min="0" step="1" required inputmode="numeric"></label>' +
      '<label>Volunteer hours<input type="number" name="hours" min="0" step="0.5" inputmode="decimal"></label>' +
      '<label>Money saved for families ($, optional)<input type="number" name="saved" min="0" step="1" inputmode="numeric"></label>' +
      '<label class="full">Note (optional)<input type="text" name="note" maxlength="140" placeholder="What went well, what to change"></label>' +
      '<button type="submit" class="btn btn-primary full">Add to log</button>' +
      '<p class="form-msg" id="log-msg" aria-live="polite"></p></form></section>' +
      '<section class="share"><h2>Share the results</h2>' +
      (im.sessions
        ? "<p>Read this after Jumu'ah, post it in the WhatsApp group, or send it to the board. It shares numbers only, never names.</p>" +
          '<blockquote id="share-text">' + esc(shareText(idea, prog, im)) + "</blockquote>" +
          '<button type="button" class="btn btn-ghost no-print" id="copy-share">' + icon("link") + "<span>Copy summary</span></button>"
        : "<p>Once you've logged a session, a ready-to-read summary appears here.</p>") +
      "</section></div>" +
      (im.sessions
        ? '<section class="log-table"><h2>Impact log</h2><div class="table-wrap"><table><thead><tr><th>Date</th><th>Families</th><th>Hours</th><th>Saved</th><th>Note</th><th><span class="sr">Actions</span></th></tr></thead><tbody>' + rows + "</tbody></table></div></section>"
        : "") +
      "</div>";

    var form = document.getElementById("log-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var entry = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        date: f.get("date"),
        families: Math.max(0, Math.round(Number(f.get("families")) || 0)),
        hours: Math.max(0, Number(f.get("hours")) || 0),
        saved: Math.max(0, Math.round(Number(f.get("saved")) || 0)),
        note: String(f.get("note") || "").trim(),
      };
      if (!entry.date) return;
      updateProgram(idea.id, function (prog) { prog.log = (prog.log || []).concat(entry); });
      renderProgramDash(idea);
      document.getElementById("log-msg").textContent = "Added.";
    });

    var copyShare = document.getElementById("copy-share");
    if (copyShare) {
      copyShare.addEventListener("click", function () {
        var label = copyShare.querySelector("span");
        var text = document.getElementById("share-text").textContent;
        function done(t) { label.textContent = t; setTimeout(function () { label.textContent = "Copy summary"; }, 2000); }
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { done("Copied"); }, function () { done("Couldn't copy"); });
        else done("Couldn't copy");
      });
    }

    var box = main.querySelector(".chart-box");
    if (box) {
      var tipEl = box.querySelector(".chart-tip");
      box.addEventListener("pointermove", function (e) {
        var g = e.target.closest(".bar");
        if (!g) { tipEl.hidden = true; return; }
        var r = box.getBoundingClientRect();
        tipEl.textContent = g.dataset.tip;
        tipEl.hidden = false;
        var x = Math.min(Math.max(e.clientX - r.left, 80), r.width - 80);
        tipEl.style.left = x + "px";
        tipEl.style.top = (e.clientY - r.top - 44) + "px";
      });
      box.addEventListener("pointerleave", function () { tipEl.hidden = true; });
    }
  }

  // Delete buttons in the log table (delegated, like the tracker).
  var currentDash = null;
  main.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-del]");
    if (!btn || !currentDash) return;
    var idea = currentDash;
    if (!window.confirm("Delete this log entry?")) return;
    updateProgram(idea.id, function (prog) {
      prog.log = (prog.log || []).filter(function (en) { return en.id !== btn.dataset.del; });
    });
    renderProgramDash(idea);
  });

  // ---- My programs (dashboard) ----

  function renderMy() {
    setTitle("My programs");
    var data = loadPrograms();
    var ids = trackedIds();
    var items = ids.map(function (id) {
      var idea = byId[id];
      return { idea: idea, prog: data[id], p: progressOf(idea, data[id]) };
    });
    items.sort(function (a, b) { return (b.prog.updatedAt || "").localeCompare(a.prog.updatedAt || ""); });

    items.forEach(function (it) { it.im = impactOf(it.prog); });
    var stepsDone = items.reduce(function (n, it) { return n + it.p.done; }, 0);
    var families = items.reduce(function (n, it) { return n + it.im.families; }, 0);
    var hours = items.reduce(function (n, it) { return n + it.im.hours; }, 0);

    var head =
      '<section class="page-head"><div class="wrap">' +
      '<p class="eyebrow">Dashboard</p><h1>My programs</h1>' +
      '<p class="lede">Every program your masjid is running, how far along it is, and the difference it\'s making. Open one to log sessions and see its impact.</p>' +
      (items.length
        ? '<div class="stats">' +
          [[items.length, items.length === 1 ? "program in progress" : "programs in progress"],
           [stepsDone, stepsDone === 1 ? "step done" : "steps done"],
           [num(families), "families served"],
           [num(hours), "volunteer hours"]].map(function (s) {
            return '<div class="stat"><strong>' + s[0] + "</strong><span>" + s[1] + "</span></div>";
          }).join("") + "</div>"
        : "") +
      "</div></section>";

    var body;
    if (!storageOk) {
      body = '<p class="notice">This browser is blocking saved data (for example, in a private window), so progress can\'t be kept here.</p>';
    } else if (!items.length) {
      body =
        '<div class="empty-state">' + starSvg("home-star") +
        "<h2>No programs yet</h2><p>Open any program and press <strong>Start this program</strong>. Its steps become a checklist, and it shows up here.</p>" +
        '<a class="btn btn-primary" href="#/ideas">Browse the ideas ' + icon("arrow") + "</a></div>";
    } else {
      body = '<ul class="dash">' + items.map(function (it) {
        var idea = it.idea, p = it.p, prog = it.prog;
        var next = p.nextIndex === -1
          ? '<span class="dash-next done">' + icon("check", "icon icon-sm") + "All steps done</span>"
          : '<span class="dash-next"><span class="dash-label">Next step</span>' + esc(idea.actions[p.nextIndex].title) + "</span>";
        return (
          '<li><a class="dash-row cat-tint-' + idea.category + '" href="#/my/' + idea.id + '">' +
          '<span class="card-icon cat-' + idea.category + '">' + icon(idea.category) + "</span>" +
          '<span class="dash-main"><span class="dash-title">' + esc(idea.title) + "</span>" +
          '<span class="dash-meta">Started ' + esc(fmtDate(prog.startedAt)) +
          (prog.lead ? " · Lead: " + esc(prog.lead) : "") +
          (it.im.sessions ? " · " + num(it.im.families) + (it.im.families === 1 ? " family" : " families") + " served" : "") + "</span>" +
          progressBar(p) + "</span>" +
          '<span class="dash-pct"><strong>' + p.pct + "%</strong><span>" + p.done + "/" + p.total + " steps</span></span>" +
          next + "</a></li>"
        );
      }).join("") + "</ul>";
    }

    var backup =
      '<section class="backup no-print"><h2>Share or move your progress</h2>' +
      "<p>Progress is saved in this browser only. To hand it to another volunteer or move it to another device, download a backup file and load it there.</p>" +
      '<div class="cta-row"><button type="button" class="btn btn-ghost" id="export"' + (items.length ? "" : " disabled") + ">" + icon("download") + "Download backup</button>" +
      '<label class="btn btn-ghost file-btn">' + icon("upload") + 'Load a backup<input type="file" id="import" accept="application/json,.json"></label></div>' +
      '<p class="backup-msg" id="backup-msg" aria-live="polite"></p></section>';

    main.innerHTML = head + '<div class="wrap">' + body + backup + "</div>";

    var exp = document.getElementById("export");
    exp.addEventListener("click", function () {
      var blob = new Blob([JSON.stringify({ app: "masjid-community-ideas", version: 1, exportedAt: new Date().toISOString(), programs: loadPrograms() }, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "masjid-programs-" + new Date().toISOString().slice(0, 10) + ".json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    document.getElementById("import").addEventListener("change", function (e) {
      var file = e.target.files[0];
      var msg = document.getElementById("backup-msg");
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var parsed = JSON.parse(reader.result);
          var incoming = parsed && parsed.programs;
          if (!incoming || typeof incoming !== "object") throw new Error("bad file");
          // Merge: for a program in both, keep whichever was updated last.
          var data = loadPrograms();
          var added = 0;
          Object.keys(incoming).forEach(function (id) {
            var prog = incoming[id];
            if (!byId[id] || !prog || typeof prog !== "object" || !prog.steps) return;
            if (!data[id] || (prog.updatedAt || "") > (data[id].updatedAt || "")) { data[id] = prog; added++; }
          });
          savePrograms(data);
          renderMy();
          document.getElementById("backup-msg").textContent = added
            ? "Loaded " + added + (added === 1 ? " program." : " programs.")
            : "Nothing new in that file.";
        } catch (err) {
          msg.textContent = "That file isn't a backup from this site.";
        }
      };
      reader.readAsText(file);
    });
  }

  // ---- How to start ----

  function renderStart() {
    setTitle("How to start");
    var steps = [
      ["Listen first", "Ask your jama'ah what would help most. A two-minute survey after Jumu'ah, a WhatsApp poll, or a conversation with the imam about the families he quietly helps will tell you more than any list."],
      ["Find one lead and get the board's blessing", "Every program needs one person who owns it. Bring a one-page plan to the masjid board: what you'll do, who it's for, what it costs and how money will be handled."],
      ["Write a one-page plan", "Use the steps on the idea's page. Add who does what, when and where, and the rules for money, privacy and safety."],
      ["Run a small pilot", "Start with 10 to 15 families or one evening. Small mistakes are cheap, and a pilot gives you a story to tell."],
      ["Keep it safe", "Two people count all money. Follow a child-protection policy for anything involving kids. Never share who received help. Check with your insurer before anything physical, like driving or repairs."],
      ["Share what happened", "Announce simple numbers after Jumu'ah and in the newsletter: families helped, meals served, money saved. Thank volunteers by name, and keep the people helped anonymous."],
      ["Make it last", "Rotate volunteers so no one burns out, train a second lead, and tie the program to the Islamic calendar so it comes back every year."],
    ].map(function (s, i) {
      return '<li><span class="step-num">' + (i + 1) + "</span><div><h3>" + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p></div></li>";
    }).join("");

    var calendar = [
      ["Ramadan", "Launch a local zakat fund and open community iftars.", ["zakat-qard-hasan-fund", "community-iftar"]],
      ["Before each Eid", "Hold a clothing swap so every child has something new to wear.", ["clothing-swap"]],
      ["Eid al-Adha", "Coordinate bulk qurbani and halal meat orders.", ["grocery-bulk-buying"]],
      ["Back to school", "Start the homework club and a uniform swap.", ["tutoring", "clothing-swap"]],
      ["January to April", "Host a free tax site and remind families to calculate zakat.", ["free-tax-prep", "financial-literacy"]],
      ["Spring", "Build garden beds and plant before summer.", ["community-garden"]],
    ].map(function (c) {
      var links = c[2].map(function (id) { return '<a href="#/idea/' + id + '">' + esc(byId[id].title) + "</a>"; }).join(", ");
      return "<li><h3>" + esc(c[0]) + "</h3><p>" + esc(c[1]) + "</p><p class=\"cal-links\">" + links + "</p></li>";
    }).join("");

    main.innerHTML =
      '<section class="page-head"><div class="wrap">' +
      '<p class="eyebrow">Guide</p><h1>How to start a program at your masjid</h1>' +
      '<p class="lede">The programs on this site are different, but the way to start them is the same. Here is what works.</p>' +
      "</div></section>" +
      '<div class="wrap narrow">' +
      '<ol class="guide">' + steps + "</ol>" +
      '<section class="section-tight"><h2>Plan around the Islamic calendar</h2><p class="section-sub">People are most generous and most available at certain times of year. Line your launches up with them.</p>' +
      '<ul class="calendar">' + calendar + "</ul></section>" +
      '<section class="next-step"><h2>Choose your first program</h2><p>Start with one. When it runs well, add the next.</p>' +
      '<a class="btn btn-primary" href="#/ideas">Browse the ideas ' + icon("arrow") + "</a></section>" +
      "</div>";
  }

  // ---- About ----

  function renderAbout() {
    setTitle("About");
    var rows = ranked.map(function (idea) {
      return (
        "<tr><td>" + idea.rank + '</td><td><a href="#/idea/' + idea.id + '">' + esc(idea.title) + "</a></td>" +
        "<td>" + idea.scores.financial + "</td><td>" + idea.scores.ease + "</td><td>" + idea.scores.reach + "</td>" +
        "<td><strong>" + idea.total + "</strong></td></tr>"
      );
    }).join("");

    main.innerHTML =
      '<section class="page-head"><div class="wrap">' +
      '<p class="eyebrow">About</p><h1>Why this site exists</h1>' +
      '<p class="lede">Most mosques already have the people, the space and the trust to change lives nearby. What they often lack is a clear plan. This site gives them one.</p>' +
      "</div></section>" +
      '<div class="wrap narrow prose">' +
      "<h2>How programs are ranked</h2>" +
      "<p>Each program is scored from 1 to 5 on three things, where higher is better:</p>" +
      '<ul class="bullets">' + CRITERIA.map(function (c) { return "<li><strong>" + c.label + ":</strong> " + esc(c.hint) + ".</li>"; }).join("") + "</ul>" +
      "<p>The total is out of 15. Ties go to the program with bigger savings, then wider reach. These are judgment calls, not measurements, so adjust them for your own masjid.</p>" +
      '<div class="table-wrap"><table><thead><tr><th>#</th><th>Program</th><th>Savings</th><th>Ease</th><th>Reach</th><th>Total</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
      "<h2>How we write</h2>" +
      "<p>We learned from charities known for clear, trusted communication, like charity: water, the National Zakat Foundation, Sufra NW London and Islamic Relief USA. That means we lead with hope, put people first (families, neighbors, guests), say what a program <em>can</em> do rather than promise results, and link to proof for every example. Read the full <a href=\"docs/style-guide.md\">style guide</a>.</p>" +
      "<h2>Learn from people already doing this</h2>" +
      "<p>Every program links to real mosques and Muslim-led charities running the same kind of work. A few of them:</p>" +
      '<ul class="proof">' + [
        ["National Zakat Foundation", "zakat-qard-hasan-fund"],
        ["Sufra NW London", "masjid-pantry"],
        ["Muslim Food Bank, B.C.", "masjid-pantry"],
        ["IMAN Chicago", "resume-job-essay-help"],
        ["Islamic Relief USA", "clothing-swap"],
        ["Open Iftar", "community-iftar"],
        ["Wembley Central Mosque", "repair-cafe"],
        ["Finsbury Park Mosque", "repair-cafe"],
        ["ICNA Relief", "benefits-navigation"],
        ["UMMA Community Clinic", "benefits-navigation"],
      ].map(function (p) { return '<li><a href="#/idea/' + p[1] + '">' + esc(p[0]) + "</a></li>"; }).join("") + "</ul>" +
      "<h2>About the examples</h2>" +
      "<p>Each program lists real organizations, many of them mosques or Muslim-led charities. They were confirmed to exist in October 2026, but programs change, so contact them before relying on details like dates, scale or eligibility.</p>" +
      "<h2>A note on religious guidance</h2>" +
      "<p>Where a program touches on fiqh, such as zakat eligibility, halal standards or arrangements between men and women, these pages give practical suggestions only. Ask your imam or a trusted scholar for rulings.</p>" +
      '<blockquote class="verse-quote"><p>\u201cAnd cooperate in righteousness and piety.\u201d</p><footer>The Qur\u2019an, Al-Ma\u2019idah 5:2</footer></blockquote>' +
      "</div>";
  }

  function route() {
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/");
    var page = parts[0] || "home";
    currentIdea = null;
    currentDash = null;
    if (page === "idea" && byId[parts[1]]) renderIdea(byId[parts[1]]);
    else if (page === "ideas") renderList(parts[1]);
    else if (page === "start") renderStart();
    else if (page === "about") renderAbout();
    else if (page === "my" && byId[parts[1]] && getProgram(parts[1])) renderProgramDash(byId[parts[1]]);
    else if (page === "my") renderMy();
    else { page = "home"; renderHome(); }

    document.querySelectorAll("[data-nav]").forEach(function (a) {
      var active = a.dataset.nav === page || (page === "idea" && a.dataset.nav === "ideas");
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
    if (hash) main.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", route);
  bindTracker();
  updateNavCount();
  route();
})();
