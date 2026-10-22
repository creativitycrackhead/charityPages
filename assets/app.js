// Renders the site from window.IDEAS using hash routes:
//   #/                 home
//   #/ideas[/<cat>]    all ideas with search, category filter and sort
//   #/idea/<id>        one idea
//   #/start            how to start any program
//   #/about            how ideas are scored and where the voice comes from
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
    family: "Childcare and homework help.",
    sharing: "Swaps, repairs and lending.",
    care: "Rides and company for elders.",
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

  function renderIdea(idea) {
    setTitle(idea.title);
    var g = idea.glance;

    var examples = idea.examples.map(function (ex) {
      var name = ex.url
        ? '<a href="' + esc(ex.url) + '" target="_blank" rel="noopener">' + esc(ex.name) + "</a>"
        : esc(ex.name);
      return "<li><h3>" + name + "</h3><p>" + esc(ex.text) + "</p></li>";
    }).join("");

    var actions = idea.actions.map(function (a) {
      var criteria = a.entry || a.exit
        ? '<dl class="criteria">' +
          (a.entry ? "<dt>Start when</dt><dd>" + esc(a.entry) + "</dd>" : "") +
          (a.exit ? "<dt>Done when</dt><dd>" + esc(a.exit) + "</dd>" : "") +
          "</dl>"
        : "";
      return (
        '<li class="action"><div class="action-head"><h3>' + esc(a.title) + "</h3>" +
        '<span class="level level-' + a.level + '">' + LEVELS[a.level] + "</span></div>" +
        "<p>" + esc(a.text) + "</p>" + criteria + "</li>"
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
      '<section><h2>Steps to start</h2><ol class="actions">' + actions + "</ol></section>" +
      '<section><h2>What you need</h2>' + bullets(idea.resources, "bullets checks") + "</section>" +
      '<section class="watch"><h2>Watch out for</h2>' + bullets(idea.watchouts) + "</section>" +
      '<section class="next-step no-print"><h2>Ready to start?</h2><p>Our guide covers what every program needs: a lead, your board\'s blessing, a small pilot and a way to share results.</p>' +
      '<a class="btn btn-primary" href="#/start">How to start a program ' + icon("arrow") + "</a></section>" +
      '<nav class="pager no-print" aria-label="More programs">' +
      (prev ? '<a href="#/idea/' + prev.id + '"><span>Previous</span>' + esc(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a class="next" href="#/idea/' + next.id + '"><span>Next</span>' + esc(next.title) + "</a>" : "") +
      "</nav></div>";

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
    if (page === "idea" && byId[parts[1]]) renderIdea(byId[parts[1]]);
    else if (page === "ideas") renderList(parts[1]);
    else if (page === "start") renderStart();
    else if (page === "about") renderAbout();
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
  route();
})();
