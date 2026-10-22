// Renders the ideas list and detail pages from window.IDEAS using hash routes:
//   #/             ranked list with search, category filter and sort
//   #/idea/<id>    one idea
//   #/about        how ideas are scored
(function () {
  "use strict";

  var main = document.getElementById("main");
  var CRITERIA = [
    { key: "financial", label: "Savings", hint: "Money saved or brought in per household" },
    { key: "ease", label: "Ease", hint: "Low cost and quick to start with existing volunteers" },
    { key: "reach", label: "Reach", hint: "How many households could benefit" },
  ];
  var LEVELS = { simple: "Simple", moderate: "Moderate", complex: "Complex" };

  // Rank by total score; ties broken by financial impact, then reach.
  var ranked = window.IDEAS.slice().map(function (idea) {
    var s = idea.scores;
    return Object.assign({}, idea, { total: s.financial + s.ease + s.reach });
  });
  ranked.sort(function (a, b) {
    return (
      b.total - a.total ||
      b.scores.financial - a.scores.financial ||
      b.scores.reach - a.scores.reach
    );
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
        '<span class="score-label">' + c.label + "</span>" +
        meter(idea.scores[c.key]) +
        '<span class="sr">' + idea.scores[c.key] + " out of 5</span>" +
        "</div>"
      );
    }).join("");
  }

  function categoryTag(key) {
    return '<span class="tag tag-' + key + '">' + esc(window.CATEGORIES[key]) + "</span>";
  }

  // ---- List view ----

  function filtered() {
    var q = state.query.trim().toLowerCase();
    var list = ranked.filter(function (idea) {
      if (state.category !== "all" && idea.category !== state.category) return false;
      if (!q) return true;
      var haystack = [idea.title, idea.summary].concat(
        idea.examples.map(function (e) { return e.name; })
      ).join(" ").toLowerCase();
      return haystack.indexOf(q) !== -1;
    });
    if (state.sort !== "rank") {
      list.sort(function (a, b) {
        return b.scores[state.sort] - a.scores[state.sort] || a.rank - b.rank;
      });
    }
    return list;
  }

  function card(idea) {
    return (
      '<li><a class="card" href="#/idea/' + idea.id + '">' +
      '<div class="card-top"><span class="rank">#' + idea.rank + "</span>" + categoryTag(idea.category) + "</div>" +
      "<h3>" + esc(idea.title) + "</h3>" +
      "<p>" + esc(idea.summary) + "</p>" +
      '<div class="scores">' + scoreRows(idea) + '<div class="score total"><span class="score-label">Total</span><span><strong>' + idea.total + "</strong>/15</span></div></div>" +
      "</a></li>"
    );
  }

  function renderListResults() {
    var list = filtered();
    var results = document.getElementById("results");
    var count = document.getElementById("count");
    count.textContent = list.length === 1 ? "1 idea" : list.length + " ideas";
    results.innerHTML = list.length
      ? list.map(card).join("")
      : '<li class="empty">No ideas match. Try a different word or category.</li>';
  }

  function renderList() {
    document.title = "Masjid Community Ideas";
    var chips = ['<button type="button" class="chip" data-cat="all">All</button>']
      .concat(Object.keys(window.CATEGORIES).map(function (key) {
        return '<button type="button" class="chip" data-cat="' + key + '">' + esc(window.CATEGORIES[key]) + "</button>";
      })).join("");

    main.innerHTML =
      '<section class="hero">' +
      '<p class="eyebrow">For mosques &amp; Islamic centers</p>' +
      "<h1>Simple programs that make a real difference to your jama'ah</h1>" +
      '<p class="lede">' + ranked.length + " low-cost, volunteer-run ideas, from a halal grocery co-op to a local zakat fund. Each one explains why it matters, shows real communities already doing it, and gives step-by-step actions to start.</p>" +
      "</section>" +
      '<section class="controls" aria-label="Filter ideas">' +
      '<label class="search"><span class="sr">Search ideas</span>' +
      '<input id="q" type="search" placeholder="Search ideas, e.g. zakat, iftar, tutoring" autocomplete="off"></label>' +
      '<div class="chips" role="group" aria-label="Category">' + chips + "</div>" +
      '<div class="sort-row"><span id="count" class="count" aria-live="polite"></span>' +
      '<label class="sort">Sort by <select id="sort">' +
      '<option value="rank">Overall rank</option>' +
      '<option value="financial">Biggest savings</option>' +
      '<option value="ease">Easiest to start</option>' +
      '<option value="reach">Widest reach</option>' +
      "</select></label></div>" +
      "</section>" +
      '<ol id="results" class="cards"></ol>';

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

  // ---- Detail view ----

  function renderIdea(idea) {
    document.title = idea.title + " · Masjid Community Ideas";

    var examples = idea.examples.map(function (ex) {
      var name = ex.url
        ? '<a href="' + esc(ex.url) + '" target="_blank" rel="noopener">' + esc(ex.name) + "</a>"
        : esc(ex.name);
      return "<li><strong>" + name + "</strong><p>" + esc(ex.text) + "</p></li>";
    }).join("");

    var actions = idea.actions.map(function (a) {
      var criteria = a.entry || a.exit
        ? '<dl class="criteria">' +
          (a.entry ? "<dt>Start when</dt><dd>" + esc(a.entry) + "</dd>" : "") +
          (a.exit ? "<dt>Done when</dt><dd>" + esc(a.exit) + "</dd>" : "") +
          "</dl>"
        : "";
      return (
        '<li class="action">' +
        '<div class="action-head"><strong>' + esc(a.title) + "</strong>" +
        '<span class="level level-' + a.level + '">' + LEVELS[a.level] + "</span></div>" +
        "<p>" + esc(a.text) + "</p>" + criteria + "</li>"
      );
    }).join("");

    function bullets(items) {
      return "<ul>" + items.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
    }

    var prev = ranked[idea.rank - 2];
    var next = ranked[idea.rank];

    main.innerHTML =
      '<p class="back"><a href="#/">&larr; All ideas</a></p>' +
      '<article class="idea">' +
      '<header class="idea-head">' +
      '<div class="card-top"><span class="rank">#' + idea.rank + " of " + ranked.length + "</span>" + categoryTag(idea.category) + "</div>" +
      "<h1>" + esc(idea.title) + "</h1>" +
      '<p class="lede">' + esc(idea.summary) + "</p>" +
      '<div class="scores scores-lg">' + scoreRows(idea) + '<div class="score total"><span class="score-label">Total</span><span><strong>' + idea.total + "</strong>/15</span></div></div>" +
      "</header>" +
      '<section><h2>Why it matters</h2>' + bullets(idea.why) + "</section>" +
      '<section><h2>Who is already doing it</h2><ul class="examples">' + examples + "</ul></section>" +
      '<section><h2>What you need</h2>' + bullets(idea.resources) + "</section>" +
      '<section><h2>Steps to start</h2><ol class="actions">' + actions + "</ol></section>" +
      '<section class="watch"><h2>Watch out for</h2>' + bullets(idea.watchouts) + "</section>" +
      "</article>" +
      '<nav class="pager" aria-label="More ideas">' +
      (prev ? '<a href="#/idea/' + prev.id + '"><span>Previous</span>' + esc(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a class="next" href="#/idea/' + next.id + '"><span>Next</span>' + esc(next.title) + "</a>" : "") +
      "</nav>";
  }

  // ---- About view ----

  function renderAbout() {
    document.title = "About · Masjid Community Ideas";
    var rows = ranked.map(function (idea) {
      return (
        "<tr><td>" + idea.rank + '</td><td><a href="#/idea/' + idea.id + '">' + esc(idea.title) + "</a></td>" +
        "<td>" + idea.scores.financial + "</td><td>" + idea.scores.ease + "</td><td>" + idea.scores.reach + "</td>" +
        "<td><strong>" + idea.total + "</strong></td></tr>"
      );
    }).join("");

    main.innerHTML =
      '<p class="back"><a href="#/">&larr; All ideas</a></p>' +
      '<article class="idea prose">' +
      "<h1>About these ideas</h1>" +
      '<p class="lede">Every idea here can be run by ordinary volunteers with little money. They\'re meant for mosques and Islamic centers, but any community center can use them.</p>' +
      "<h2>How ideas are ranked</h2>" +
      "<p>Each idea is scored from 1 to 5 on three things, where higher is better:</p>" +
      "<ul>" + CRITERIA.map(function (c) { return "<li><strong>" + c.label + ":</strong> " + esc(c.hint) + ".</li>"; }).join("") + "</ul>" +
      "<p>The total is out of 15. Ties go to the idea with bigger savings, then wider reach. The scores are judgment calls, not measurements, so adjust them for your own masjid's size, ages, incomes and volunteer skills.</p>" +
      '<div class="table-wrap"><table><thead><tr><th>#</th><th>Idea</th><th>Savings</th><th>Ease</th><th>Reach</th><th>Total</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
      "<h2>Combine programs</h2>" +
      "<p>Several programs can share one weekly <strong>Community Help Night</strong>: job help, the benefits desk and tutoring all need tables, Wi-Fi, a printer and a sign-in sheet. Tax prep can use the same setup from January to April, and Ramadan is the natural moment to launch the zakat fund and open iftars.</p>" +
      "<h2>About the examples</h2>" +
      "<p>Each idea lists real organizations, many of them mosques or Muslim-led charities, with links so you can check them yourself. They were confirmed to exist in October 2026, but programs change, so contact them before you rely on details like dates, scale or eligibility.</p>" +
      "<h2>A note on religious guidance</h2>" +
      "<p>Where an idea touches on fiqh (zakat eligibility, halal standards, arrangements between men and women), these pages give practical suggestions only. Ask your imam or a trusted scholar for rulings.</p>" +
      "</article>";
  }

  function route() {
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/");
    if (parts[0] === "idea" && byId[parts[1]]) {
      renderIdea(byId[parts[1]]);
    } else if (parts[0] === "about") {
      renderAbout();
    } else {
      renderList();
    }
    window.scrollTo(0, 0);
    if (hash) main.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", route);
  route();
})();
