/* ============================
   PicklePro — App Logic
   ============================ */

const App = (() => {

  /* ---- State ---- */
  const state = {
    screen: 'welcome',
    profile: null,
    quiz: {
      step: 0,
      answers: {}
    },
    duprWeakSkill: null,
    currentDrillIds: [],
    currentPlanTime: 30,
    currentPlan: null,
    activeSession: null,
    trackerTab: 'active',
    findQuery: '',
    coachingFilter: false
  };

  /* ---- Quiz Questions ---- */
  const QUESTIONS = [
    {
      id: 'experience',
      text: 'How long have you been playing pickleball?',
      sub: 'Be honest — this calibrates your drill difficulty.',
      score: true,
      options: [
        { emoji: '🌱', title: 'Just starting out',  desc: "Never played or only a few times",          val: 0 },
        { emoji: '📅', title: 'Less than 1 year',   desc: "Getting the basics down",                   val: 1 },
        { emoji: '⚡', title: '1–3 years',           desc: "Comfortable with the fundamentals",         val: 2 },
        { emoji: '🏆', title: '3+ years',            desc: "Experienced, playing regularly or competing", val: 3 },
      ]
    },
    {
      id: 'strongest',
      text: "What's your strongest skill on the court?",
      sub: "Pick the one that feels most natural to you.",
      score: false,
      options: [
        { emoji: '🎾', title: 'Serving',           desc: "Consistent, accurate serve placement",      val: 'serving' },
        { emoji: '🤝', title: 'Dinking',           desc: "Soft game at the kitchen line",             val: 'dinking' },
        { emoji: '⚡', title: 'Volleying',         desc: "Fast hands and net exchanges",              val: 'volleying' },
        { emoji: '🎯', title: 'Third Shot Drop',   desc: "Getting to the kitchen from the baseline",  val: 'third-shot-drop' },
        { emoji: '👟', title: 'Footwork',          desc: "Court movement and positioning",            val: 'footwork' },
      ]
    },
    {
      id: 'weakest',
      text: "What's your biggest weakness?",
      sub: "We'll focus your drill recommendations here.",
      score: false,
      options: [
        { emoji: '🤝', title: 'Dinking',           desc: "Inconsistent at the kitchen",               val: 'dinking' },
        { emoji: '🎾', title: 'Serving',           desc: "Errors or poor placement",                  val: 'serving' },
        { emoji: '🎯', title: 'Third Shot Drop',   desc: "Stuck in no-man's land mid-rally",          val: 'third-shot-drop' },
        { emoji: '⚡', title: 'Volleying',         desc: "Losing hands battles at the net",           val: 'volleying' },
        { emoji: '👟', title: 'Footwork',          desc: "Out of position too often",                 val: 'footwork' },
        { emoji: '🧠', title: 'Strategy',          desc: "Unsure where to hit or be positioned",      val: 'strategy' },
      ]
    },
    {
      id: 'frequency',
      text: 'How often do you play?',
      sub: "Includes practice sessions and games.",
      score: true,
      options: [
        { emoji: '😴', title: 'Rarely',            desc: "Once a month or less",                      val: 0 },
        { emoji: '📅', title: '1–2 times a week',  desc: "Casual, recreational play",                 val: 1 },
        { emoji: '🔥', title: '3–4 times a week',  desc: "Regular player, improving fast",            val: 2 },
        { emoji: '🚀', title: '5+ times a week',   desc: "Serious competitor or coach",               val: 3 },
      ]
    },
    {
      id: 'struggle',
      text: "What's your biggest in-game challenge?",
      sub: "The thing that costs you the most points.",
      score: false,
      options: [
        { emoji: '😤', title: 'Consistency',       desc: "Too many unforced errors",                  val: 'consistency' },
        { emoji: '🍳', title: 'Getting to the kitchen', desc: "Stuck in transition / no-man's land",  val: 'kitchen' },
        { emoji: '⚡', title: 'Hands battles',     desc: "Losing fast-paced volleys",                 val: 'hands' },
        { emoji: '🧠', title: 'Reading the game',  desc: "Unsure where to hit or move next",          val: 'strategy' },
        { emoji: '😮‍💨', title: 'Patience',         desc: "Hitting out or rushing too much",           val: 'patience' },
      ]
    }
  ];

  /* ---- Tier definitions ---- */
  const TIERS = {
    beginner: {
      label:   'Beginner',
      range:   '2.0 – 3.0',
      emoji:   '🌱',
      cls:     'beginner',
      heroClass: 'beginner-hero',
      pillClass: 'beginner-tier',
      msg: "Welcome to the game! We'll build your fundamentals with simple, high-repetition drills designed to make the basics click fast."
    },
    intermediate: {
      label:   'Intermediate',
      range:   '3.0 – 4.5',
      emoji:   '⚡',
      cls:     'intermediate',
      heroClass: 'intermediate-hero',
      pillClass: 'intermediate-tier',
      msg: "You've got the basics down — now let's sharpen your consistency, develop your soft game, and build repeatable patterns that win points."
    },
    advanced: {
      label:   'Advanced',
      range:   '4.5 – 8.0',
      emoji:   '🏆',
      cls:     'advanced',
      heroClass: 'advanced-hero',
      pillClass: 'advanced-tier',
      msg: "Time to play at a higher level. We'll work on precise shot-making, third-shot systems, stacking, and applying tactical pressure."
    }
  };

  /* ============================================================
     PLAN CONSTANTS
     ============================================================ */
  const PLAN_CONFIGS = {
    15: {
      label: '15-Min Express',
      sections: [
        { name: 'Warm-Up',    icon: '🔥', time: 3,  pool: 'warmup', count: 1 },
        { name: 'Main Focus', icon: '🎯', time: 10, pool: 'weak',   count: 2 },
        { name: 'Cool Down',  icon: '🧊', time: 2,  pool: null,     count: 0 }
      ]
    },
    30: {
      label: '30-Min Session',
      sections: [
        { name: 'Warm-Up',     icon: '🔥', time: 5,  pool: 'warmup',  count: 2 },
        { name: 'Skill Focus', icon: '🎯', time: 17, pool: 'weak',    count: 3 },
        { name: 'Variety',     icon: '⚡', time: 6,  pool: 'general', count: 1 },
        { name: 'Cool Down',   icon: '🧊', time: 2,  pool: null,      count: 0 }
      ]
    },
    60: {
      label: '60-Min Full Session',
      sections: [
        { name: 'Warm-Up',      icon: '🔥', time: 10, pool: 'warmup',  count: 2 },
        { name: 'Skill Focus',  icon: '🎯', time: 20, pool: 'weak',    count: 3 },
        { name: 'General Work', icon: '⚡', time: 20, pool: 'general', count: 3 },
        { name: 'Match Play',   icon: '🏆', time: 8,  pool: 'game',    count: 1 },
        { name: 'Cool Down',    icon: '🧊', time: 2,  pool: null,      count: 0 }
      ]
    }
  };

  const COOLDOWN_NOTES = {
    beginner:     'Finish with 2 minutes of easy straight-ahead dinking at half pace. Follow with 10 slow wrist circles each direction and shoulder rolls.',
    intermediate: 'Finish with 2 minutes of relaxed cross-court dinking — no speed-ups. Then: wrist circles, cross-body shoulder stretch, and light hip circles.',
    advanced:     'Finish with 2 minutes of controlled kitchen rallying at low intensity — pure feel, no aggression. Then: wrist stretches both directions, cross-body shoulder, and a 30-second quad hold each side.'
  };

  const CAT_LABELS = {
    dinking: 'Dinking', serving: 'Serving', 'third-shot-drop': 'Third Shot Drop',
    volleying: 'Volleying', footwork: 'Footwork', strategy: 'Strategy'
  };

  const SKILL_LABELS = {
    dinking: 'Dinking',
    serving: 'Serving',
    'third-shot-drop': 'Third Shot Drop',
    volleying: 'Volleying',
    footwork: 'Footwork',
    strategy: 'Strategy'
  };

  /* ---- Screen navigation ---- */
  function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(`screen-${id}`);
    if (el) {
      el.classList.add('active');
      el.scrollTop = 0;
      el.querySelectorAll('.drills-scroll,.plan-scroll,.tracker-scroll,.find-scroll,.home-scroll')
        .forEach(s => { s.scrollTop = 0; });
    }
    state.screen = id;
  }

  /* ---- Welcome ---- */
  function startOnboarding() {
    show('path-select');
  }

  function loadExisting() {
    if (state.profile) {
      renderHome();
      show('home');
    } else {
      show('path-select');
    }
  }

  function showPathSelect() {
    show('path-select');
  }

  /* ---- Path choice ---- */
  function choosePath(path) {
    if (path === 'dupr') {
      show('dupr');
    } else {
      state.quiz.step    = 0;
      state.quiz.answers = {};
      show('quiz');
      renderQuestion();
    }
  }

  /* ---- DUPR path ---- */
  function onDuprInput(input) {
    const v    = parseFloat(input.value);
    const hint = document.getElementById('dupr-hint');
    const btn  = document.getElementById('dupr-submit');

    if (!input.value) {
      hint.textContent = ' ';
      hint.className   = 'dupr-hint';
      btn.disabled     = true;
      return;
    }

    if (isNaN(v) || v < 2.0 || v > 8.0) {
      hint.textContent = 'Please enter a rating between 2.0 and 8.0';
      hint.className   = 'dupr-hint invalid';
      btn.disabled     = true;
      return;
    }

    const tier = ratingToTier(v);
    hint.textContent = `${TIERS[tier].emoji} ${TIERS[tier].label} · ${TIERS[tier].range}`;
    hint.className   = 'dupr-hint valid';
    btn.disabled     = !state.duprWeakSkill;
  }

  function ratingToTier(r) {
    if (r < 3.0) return 'beginner';
    if (r < 4.5) return 'intermediate';
    return 'advanced';
  }

  function pickChip(el, groupId) {
    const group = document.getElementById(groupId);
    group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    state.duprWeakSkill = el.dataset.v;

    const v = parseFloat(document.getElementById('dupr-input').value);
    if (!isNaN(v) && v >= 2.0 && v <= 8.0) {
      document.getElementById('dupr-submit').disabled = false;
    }
  }

  function submitDupr() {
    const v = parseFloat(document.getElementById('dupr-input').value);
    if (isNaN(v) || v < 2.0 || v > 8.0 || !state.duprWeakSkill) return;

    state.profile = {
      method:    'dupr',
      dupr:      v,
      tier:      ratingToTier(v),
      weakSkill: state.duprWeakSkill,
      createdAt: Date.now()
    };
    saveProfile();
    renderResult();
    show('result');
  }

  /* ---- Quiz path ---- */
  function renderQuestion() {
    const q      = QUESTIONS[state.quiz.step];
    const slot   = document.getElementById('quiz-q-slot');
    const fill   = document.getElementById('qprog-fill');
    const label  = document.getElementById('qprog-label');
    const pct    = (state.quiz.step / QUESTIONS.length) * 100;

    fill.style.width = `${pct}%`;
    label.textContent = `Question ${state.quiz.step + 1} of ${QUESTIONS.length}`;

    const saved       = state.quiz.answers[q.id];
    const isLast      = state.quiz.step === QUESTIONS.length - 1;
    const btnDisabled = saved === undefined;
    const btnLabel    = isLast ? 'See My Results →' : 'Next →';
    const btnAction   = isLast ? 'App.quizSubmit()' : 'App.quizNext()';

    slot.innerHTML = `
      <div class="quiz-question">
        <h2 class="quiz-q-text">${q.text}</h2>
        <p class="quiz-q-sub">${q.sub}</p>
        <div class="quiz-options">
          ${q.options.map((opt, oidx) => `
            <button class="quiz-opt ${saved === opt.val ? 'chosen' : ''}"
                    onclick="App.chooseOpt(${state.quiz.step}, ${oidx}, this)">
              <span class="opt-emoji">${opt.emoji}</span>
              <span>
                <span class="opt-title">${opt.title}</span>
                <span class="opt-desc">${opt.desc}</span>
              </span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-footer">
          <button class="btn btn-primary" id="quiz-next-btn"
                  onclick="${btnAction}" ${btnDisabled ? 'disabled' : ''}>
            ${btnLabel}
          </button>
        </div>
      </div>`;
  }

  function chooseOpt(stepIdx, oidx, el) {
    const q   = QUESTIONS[stepIdx];
    const opt = q.options[oidx];
    state.quiz.answers[q.id] = opt.val;

    el.closest('.quiz-options').querySelectorAll('.quiz-opt')
      .forEach(o => o.classList.remove('chosen'));
    el.classList.add('chosen');

    const btn = document.getElementById('quiz-next-btn');
    if (btn) btn.disabled = false;
  }

  function quizNext() {
    const q = QUESTIONS[state.quiz.step];
    if (state.quiz.answers[q.id] === undefined) return;
    state.quiz.step++;
    renderQuestion();
  }

  function quizBack() {
    if (state.quiz.step > 0) {
      state.quiz.step--;
      renderQuestion();
    } else {
      show('path-select');
    }
  }

  function quizSubmit() {
    const q = QUESTIONS[state.quiz.step];
    if (state.quiz.answers[q.id] === undefined) return;

    const expScore  = state.quiz.answers['experience']  ?? 0;
    const freqScore = state.quiz.answers['frequency']   ?? 0;
    const total     = expScore + freqScore;

    let tier;
    if (total <= 2)      tier = 'beginner';
    else if (total <= 4) tier = 'intermediate';
    else                 tier = 'advanced';

    state.profile = {
      method:      'quiz',
      tier:        tier,
      weakSkill:   state.quiz.answers['weakest']   || 'dinking',
      strongSkill: state.quiz.answers['strongest'] || 'serving',
      struggle:    state.quiz.answers['struggle'],
      createdAt:   Date.now()
    };
    saveProfile();
    renderResult();
    show('result');
  }

  /* ---- Result screen ---- */
  function renderResult() {
    const t    = TIERS[state.profile.tier];
    const weak = SKILL_LABELS[state.profile.weakSkill] || 'General';

    document.getElementById('result-hero').className = `result-hero ${t.heroClass}`;
    document.getElementById('result-emoji').textContent = t.emoji;
    document.getElementById('result-tier').textContent  = t.label;
    document.getElementById('result-range').textContent = `Rating: ${t.range}`;

    document.getElementById('stat-tier').textContent   = t.label;
    document.getElementById('stat-focus').textContent  = weak;
    document.getElementById('stat-rating').textContent = t.range;
    document.getElementById('result-desc').textContent = t.msg;
  }

  /* ---- Enter app ---- */
  function enterApp() {
    renderHome();
    show('home');
  }

  function renderHome() {
    if (!state.profile) return;
    const t    = TIERS[state.profile.tier];
    const pill = document.getElementById('home-tier-pill');
    pill.className = `tier-pill ${t.pillClass}`;
    document.getElementById('home-tier-icon').textContent  = t.emoji;
    document.getElementById('home-tier-label').textContent = t.label;
  }

  /* ---- Navigation (post-onboarding) ---- */
  function navigate(section) {
    if (section === 'home') {
      renderHome();
      show('home');
      setActiveNav('home');
    } else if (section === 'drills') {
      renderDrillsScreen();
      show('drills');
      setActiveNav('drills');
    } else if (section === 'plan') {
      renderPlanScreen();
      show('plan');
      setActiveNav('plan');
    } else if (section === 'track') {
      renderTrackerScreen();
      show('tracker');
      setActiveNav('track');
    } else if (section === 'find') {
      renderFindScreen();
      show('find');
      setActiveNav('find');
    }
  }

  function setActiveNav(section) {
    document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));
    const map = { home: 0, drills: 1, plan: 2, track: 3, find: 4 };
    const idx = map[section];
    if (idx !== undefined) {
      document.querySelectorAll('.bnav-btn')[idx]?.classList.add('active');
    }
  }

  /* ============================================================
     DRILL RECOMMENDATION ENGINE
     ============================================================ */

  function fisherYates(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getRecommendedDrills(excludeIds = []) {
    if (!state.profile || typeof DRILL_LIBRARY === 'undefined') return [];

    const tierDrills   = DRILL_LIBRARY.filter(d => d.tier === state.profile.tier && !excludeIds.includes(d.id));
    const weakSkill    = state.profile.weakSkill;

    const weakDrills   = fisherYates(tierDrills.filter(d => d.category === weakSkill));
    const otherDrills  = fisherYates(tierDrills.filter(d => d.category !== weakSkill));

    const numWeak      = Math.min(3, weakDrills.length);
    const numOther     = Math.min(5 - numWeak, otherDrills.length);

    const chosen = [...weakDrills.slice(0, numWeak), ...otherDrills.slice(0, numOther)];
    return fisherYates(chosen);
  }

  /* ---- Render drills screen ---- */
  function renderDrillsScreen() {
    if (!state.profile) return;

    state.currentDrillIds = (state.currentDrillIds && state.currentDrillIds.length)
      ? state.currentDrillIds : [];

    const drills = getRecommendedDrills();
    state.currentDrillIds = drills.map(d => d.id);

    const tier     = TIERS[state.profile.tier];
    const weakLbl  = SKILL_LABELS[state.profile.weakSkill] || 'your weak areas';
    const meta     = document.getElementById('drills-meta');
    if (meta) {
      meta.innerHTML = `Showing <strong>5 ${tier.label} drills</strong> focused on <strong>${weakLbl}</strong>. Tap Shuffle for a new set.`;
    }

    renderDrillCards(drills);
  }

  function renderDrillCards(drills) {
    const list = document.getElementById('drills-list');
    if (!list) return;

    const weakSkill = state.profile?.weakSkill;

    const CAT_LABELS = {
      dinking:          'Dinking',
      serving:          'Serving',
      'third-shot-drop':'Third Shot Drop',
      volleying:        'Volleying',
      footwork:         'Footwork',
      strategy:         'Strategy'
    };

    const DIFF_LABELS = { beginner: 'Easy', intermediate: 'Medium', advanced: 'Hard' };

    list.innerHTML = drills.map(d => {
      const isFocus  = d.category === weakSkill;
      const dots     = ['beginner','intermediate','advanced'].map((t, i) =>
        `<span class="diff-dot ${['beginner','intermediate','advanced'].indexOf(d.tier) >= i ? 'filled' : ''}"></span>`
      ).join('');
      const catSlug  = d.category.replace(/[^a-z]/g, '-');

      return `
        <div class="drill-card ${isFocus ? 'focus-drill' : ''}">
          <div class="drill-card-top">
            <div class="drill-left-meta">
              <span class="cat-badge cat-${catSlug}">${CAT_LABELS[d.category] || d.category}</span>
              ${isFocus ? '<span class="focus-label">Your Focus</span>' : ''}
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <div class="diff-dots" title="${DIFF_LABELS[d.tier]}">${dots}</div>
              <span class="dur-badge">⏱ ${d.duration} min</span>
            </div>
          </div>
          <h3 class="drill-name">${d.name}</h3>
          <p class="drill-desc">${d.description}</p>
          <a class="yt-btn" href="${d.youtube}" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            Watch Tutorial
          </a>
        </div>`;
    }).join('');
  }

  /* ============================================================
     FACILITY FINDER
     ============================================================ */

  const TYPE_LABELS  = { club: 'Club', venue: 'Venue', public: 'Public', resort: 'Resort' };

  const FEATURED_CITIES = [
    'Dallas', 'Houston', 'Austin', 'Los Angeles',
    'New York', 'Chicago', 'Miami', 'Phoenix',
    'Seattle', 'Atlanta', 'Nashville', 'Denver'
  ];

  function searchFacilities(rawQuery, coachingOnly) {
    if (typeof FACILITY_DATA === 'undefined') return [];
    const q = ((CITY_ALIASES && CITY_ALIASES[rawQuery.trim().toLowerCase()]) || rawQuery.trim()).toLowerCase();

    let results = !q
      ? []
      : FACILITY_DATA.filter(f => {
          const ql = q.replace(/\D/g, '');
          return (
            f.city.toLowerCase().includes(q)            ||
            f.state.toLowerCase() === q                  ||
            (ql.length >= 3 && f.zip.startsWith(ql))     ||
            f.name.toLowerCase().includes(q)             ||
            (f.metro && f.metro.toLowerCase().includes(q))
          );
        });

    if (coachingOnly) results = results.filter(f => f.coaching);
    return results;
  }

  function groupByCity(facilities) {
    const map = new Map();
    facilities.forEach(f => {
      const key = `${f.city}, ${f.state}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(f);
    });
    return map;
  }

  function renderFindScreen() {
    const chip = document.getElementById('coaching-chip');
    if (chip) chip.classList.toggle('active', state.coachingFilter);
    const input = document.getElementById('find-input');
    if (input && input.value !== state.findQuery) input.value = state.findQuery;
    renderFindResults();
  }

  function renderFindResults() {
    const container = document.getElementById('find-results');
    if (!container) return;

    const results = searchFacilities(state.findQuery, state.coachingFilter);
    const hasClear = document.getElementById('find-clear');
    if (hasClear) hasClear.classList.toggle('hidden', !state.findQuery);

    if (!state.findQuery) {
      container.innerHTML = buildFindEmptyHtml();
      return;
    }

    if (!results.length) {
      container.innerHTML = `<div class="find-results-inner">
        <div class="find-no-results">
          <span class="empty-icon">🔍</span>
          <h3>No results for "${state.findQuery}"</h3>
          <p>Try a major city name (Dallas, Chicago, Seattle) or a 5-digit zip code.</p>
        </div>
      </div>`;
      return;
    }

    const groups  = groupByCity(results);
    const label   = state.coachingFilter ? 'coaching facilities' : 'courts & clubs';
    const countHtml = `<div class="find-results-count">
      <strong>${results.length} ${label}</strong> matching "${state.findQuery}"
    </div>`;

    let groupsHtml = '';
    groups.forEach((facilities, cityLabel) => {
      const cardsHtml = facilities.map(f => buildFacilityCard(f)).join('');
      groupsHtml += `<div class="facility-group">
        <div class="facility-group-hd">
          📍 ${cityLabel}
          <span class="facility-group-count">(${facilities.length})</span>
        </div>
        ${cardsHtml}
      </div>`;
    });

    container.innerHTML = `<div class="find-results-inner">${countHtml}${groupsHtml}</div>`;
  }

  function buildFacilityCard(f) {
    const typeClass = `fac-type-${f.type}`;
    const typeLabel = TYPE_LABELS[f.type] || f.type;
    const coachingBadge = f.coaching
      ? `<span class="coaching-badge">
           <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
           Coaching
         </span>` : '';

    return `<div class="facility-card">
      <div class="facility-card-top">
        <span class="facility-name">${f.name}</span>
        <span class="fac-type-badge ${typeClass}">${typeLabel}</span>
      </div>
      <div class="facility-address">
        <span class="facility-address-icon">📍</span>
        ${f.address}, ${f.city}, ${f.state} ${f.zip}
      </div>
      ${f.note ? `<p class="facility-note">${f.note}</p>` : ''}
      <div class="facility-footer">
        ${coachingBadge}
        <a class="facility-link" href="${f.website}" target="_blank" rel="noopener noreferrer">
          Visit Website
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    </div>`;
  }

  function buildFindEmptyHtml() {
    const chips = FEATURED_CITIES.map(c =>
      `<button class="city-chip" onclick="App.quickCitySearch('${c}')">${c}</button>`
    ).join('');

    return `<div class="find-results-inner">
      <div class="find-empty">
        <p class="find-empty-title">Search for pickleball courts near you</p>
        <p class="find-empty-sub">Try a city name or 5-digit zip code.</p>
        <div class="city-chips">${chips}</div>
      </div>
    </div>`;
  }

  function onFindSearch(val) {
    state.findQuery = val;
    renderFindResults();
  }

  function clearFind() {
    state.findQuery = '';
    const input = document.getElementById('find-input');
    if (input) input.value = '';
    renderFindResults();
  }

  function toggleCoachingFilter() {
    state.coachingFilter = !state.coachingFilter;
    document.getElementById('coaching-chip')?.classList.toggle('active', state.coachingFilter);
    renderFindResults();
  }

  function quickCitySearch(city) {
    state.findQuery = city;
    const input = document.getElementById('find-input');
    if (input) input.value = city;
    renderFindResults();
  }

  /* ============================================================
     SESSION TRACKER
     ============================================================ */

  function loadHistory() {
    try { return JSON.parse(localStorage.getItem('picklepro_sessions') || '[]'); }
    catch { return []; }
  }

  function saveHistory(sessions) {
    localStorage.setItem('picklepro_sessions', JSON.stringify(sessions));
  }

  function startSession(source) {
    let drills = [];
    if (source === 'plan' && state.currentPlan) {
      drills = state.currentPlan.sections.flatMap(s => s.drills);
    } else if (source === 'drills' && state.currentDrillIds.length) {
      drills = DRILL_LIBRARY.filter(d => state.currentDrillIds.includes(d.id));
    }
    if (!drills.length) return;

    state.activeSession = {
      drills:      drills.map(d => ({ ...d, completed: false })),
      startTime:   Date.now(),
      source,
      planMinutes: source === 'plan' ? (state.currentPlan?.minutes ?? null) : null
    };
    state.trackerTab = 'active';
    renderTrackerPanel();
  }

  function toggleDrill(drillId) {
    if (!state.activeSession) return;
    const d = state.activeSession.drills.find(d => d.id === drillId);
    if (d) d.completed = !d.completed;
    renderTrackerPanel();
  }

  function endSession() {
    const session = state.activeSession;
    if (!session) return;

    const durationMin = Math.max(1, Math.round((Date.now() - session.startTime) / 60000));
    const done        = session.drills.filter(d => d.completed).length;

    const entry = {
      id:             Date.now(),
      date:           new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tier:           state.profile?.tier || 'beginner',
      source:         session.source,
      planMinutes:    session.planMinutes,
      drills:         session.drills.map(d => ({ name: d.name, category: d.category, completed: d.completed })),
      completedCount: done,
      totalCount:     session.drills.length,
      durationMinutes: durationMin
    };

    saveHistory([entry, ...loadHistory()].slice(0, 5));
    state.activeSession = null;
    state.trackerTab    = 'history';
    updateTrackerTabs();
    renderTrackerPanel();
  }

  function switchTrackerTab(tab) {
    state.trackerTab = tab;
    updateTrackerTabs();
    renderTrackerPanel();
  }

  function updateTrackerTabs() {
    document.getElementById('tab-active')?.classList.toggle('active', state.trackerTab === 'active');
    document.getElementById('tab-history')?.classList.toggle('active', state.trackerTab === 'history');
  }

  function renderTrackerScreen() {
    updateTrackerTabs();
    renderTrackerPanel();
  }

  function renderTrackerPanel() {
    const panel  = document.getElementById('tracker-panel');
    const footer = document.getElementById('tracker-footer');
    if (!panel) return;

    const inSession = !!state.activeSession;
    if (footer) footer.classList.toggle('hidden', !(state.trackerTab === 'active' && inSession));

    if (state.trackerTab === 'history') {
      panel.innerHTML = buildHistoryHtml();
      return;
    }
    panel.innerHTML = inSession ? buildActiveSessionHtml() : buildSetupHtml();
  }

  function buildSetupHtml() {
    const hasPlan   = !!state.currentPlan;
    const hasDrills = state.currentDrillIds.length > 0;

    if (!hasPlan && !hasDrills) {
      return `<div class="tracker-empty">
        <span class="empty-icon">📋</span>
        <h3>No Active Plan or Drills</h3>
        <p>Generate a Practice Plan or get Drill Recommendations first, then come back to log your session.</p>
        <div style="display:flex;flex-direction:column;gap:10px;align-items:center">
          <button class="btn btn-primary" onclick="App.navigate('plan')" style="min-width:200px">Create a Plan</button>
          <button class="btn" onclick="App.navigate('drills')" style="min-width:200px;border:2px solid var(--border);background:none;color:var(--dark)">Get Drills</button>
        </div>
      </div>`;
    }

    const tier = state.profile ? TIERS[state.profile.tier].label : '';
    const chevron = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="session-opt-arrow"><polyline points="9 18 15 12 9 6"/></svg>`;

    const planOpt = hasPlan ? (() => {
      const n = state.currentPlan.sections.reduce((t, s) => t + s.drills.length, 0);
      return `<div class="session-option" onclick="App.startSession('plan')">
        <span class="session-opt-icon">📅</span>
        <div class="session-opt-body"><h4>${state.currentPlan.label}</h4><p>${n} drills · ${tier}</p></div>
        ${chevron}
      </div>`;
    })() : '';

    const drillOpt = hasDrills ? `<div class="session-option" onclick="App.startSession('drills')">
      <span class="session-opt-icon">🎯</span>
      <div class="session-opt-body"><h4>Recommended Drills</h4><p>${state.currentDrillIds.length} drills · ${tier}</p></div>
      ${chevron}
    </div>` : '';

    return `<div class="session-setup">
      <p class="section-label" style="margin-bottom:4px">Start a Session</p>
      <p>Choose what you'd like to track today.</p>
      ${planOpt}${drillOpt}
    </div>`;
  }

  function buildActiveSessionHtml() {
    const session   = state.activeSession;
    const done      = session.drills.filter(d => d.completed).length;
    const total     = session.drills.length;
    const pct       = total > 0 ? Math.round((done / total) * 100) : 0;
    const r         = 22;
    const circ      = +(2 * Math.PI * r).toFixed(1);
    const offset    = +(circ - (pct / 100) * circ).toFixed(1);
    const label     = session.planMinutes ? `${session.planMinutes}-Min Session` : 'Drill Session';

    const drillsHtml = session.drills.map(drill => {
      const slug    = drill.category.replace(/[^a-z]/g, '-');
      const isDone  = drill.completed;
      const check   = isDone
        ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
        : '';
      return `<div class="check-item ${isDone ? 'done' : ''}" onclick="App.toggleDrill(${drill.id})">
        <div class="check-box ${isDone ? 'done' : ''}">${check}</div>
        <div class="check-body">
          <span class="check-name">${drill.name}</span>
          <div class="check-meta">
            <span class="cat-badge cat-${slug}" style="font-size:10px;padding:2px 8px">${CAT_LABELS[drill.category] || drill.category}</span>
            ${drill.duration ? `<span class="check-dur">${drill.duration} min</span>` : ''}
          </div>
        </div>
        <a class="check-yt" href="${drill.youtube}" target="_blank" rel="noopener noreferrer"
           onclick="event.stopPropagation()" title="Watch Tutorial">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
        </a>
      </div>`;
    }).join('');

    return `<div class="session-header">
        <div class="session-header-left">
          <div class="session-header-label">${label}</div>
          <div class="session-header-sub">${done} of ${total} drills completed</div>
        </div>
        <div class="session-prog-ring">
          <svg class="prog-ring-svg" width="56" height="56" viewBox="0 0 56 56">
            <circle class="prog-ring-bg"   cx="28" cy="28" r="${r}"/>
            <circle class="prog-ring-fill" cx="28" cy="28" r="${r}"
              stroke-dasharray="${circ}" stroke-dashoffset="${offset}"/>
          </svg>
          <div class="prog-ring-text">
            <span class="prog-ring-num">${pct}</span>
            <span class="prog-ring-denom">%</span>
          </div>
        </div>
      </div>
      <div class="drill-checklist">${drillsHtml}</div>
      <div style="height:8px"></div>`;
  }

  function buildHistoryHtml() {
    const sessions = loadHistory();
    if (!sessions.length) {
      return `<div class="tracker-empty">
        <span class="empty-icon">🕐</span>
        <h3>No Sessions Yet</h3>
        <p>Complete your first session and it will appear here. Your last 5 sessions are saved.</p>
      </div>`;
    }

    const items = sessions.map(s => {
      const pct  = s.totalCount > 0 ? Math.round((s.completedCount / s.totalCount) * 100) : 0;
      const tBg  = s.tier === 'beginner' ? '#3B82F6' : s.tier === 'intermediate' ? '#F59E0B' : '#EF4444';
      const tLbl = (TIERS[s.tier] || TIERS.beginner).label;

      const drillRows = s.drills.slice(0, 4).map(d =>
        `<div class="hist-drill-row ${d.completed ? 'done' : ''}">
          <span class="hist-drill-dot ${d.completed ? 'done' : ''}"></span>
          ${d.name}
        </div>`
      ).join('');
      const more = s.drills.length > 4
        ? `<div class="hist-more">+${s.drills.length - 4} more</div>` : '';

      return `<div class="history-item">
        <div class="hist-header">
          <div>
            <span class="hist-date">${s.date}</span>
            <div class="hist-badges">
              <span class="cat-badge" style="background:${tBg};font-size:10px;padding:3px 8px">${tLbl}</span>
              ${s.planMinutes ? `<span style="font-size:12px;color:var(--muted);font-weight:600">${s.planMinutes}-min plan</span>` : ''}
            </div>
          </div>
          <span class="hist-dur">${s.durationMinutes}m</span>
        </div>
        <div class="hist-prog-wrap">
          <div class="hist-prog-bar"><div class="hist-prog-fill" style="width:${pct}%"></div></div>
          <span class="hist-prog-label">${s.completedCount} / ${s.totalCount} completed · ${pct}%</span>
        </div>
        <div class="hist-drills">${drillRows}${more}</div>
      </div>`;
    }).join('');

    return `<div class="history-list">${items}</div><div style="height:8px"></div>`;
  }

  /* ============================================================
     PRACTICE PLAN ENGINE
     ============================================================ */

  function getPlanPool(pool, weakSkill) {
    const tier = state.profile.tier;
    if (!DRILL_LIBRARY) return [];

    switch (pool) {
      case 'warmup': {
        const tiers = tier === 'advanced'     ? ['intermediate', 'advanced'] :
                      tier === 'intermediate' ? ['beginner', 'intermediate'] :
                                               ['beginner'];
        return fisherYates(
          DRILL_LIBRARY.filter(d =>
            (d.category === 'footwork' || d.category === 'dinking') && tiers.includes(d.tier)
          )
        );
      }
      case 'weak':
        return fisherYates(DRILL_LIBRARY.filter(d => d.tier === tier && d.category === weakSkill));
      case 'general':
        return fisherYates(
          DRILL_LIBRARY.filter(d => d.tier === tier && d.category !== weakSkill && d.category !== 'footwork')
        );
      case 'game':
        return fisherYates(DRILL_LIBRARY.filter(d => d.tier === tier && d.category === 'strategy'));
      default:
        return [];
    }
  }

  function buildPlanSection(cfg, usedIds, weakSkill) {
    if (!cfg.pool || cfg.count === 0) return { ...cfg, drills: [] };

    let pool = getPlanPool(cfg.pool, weakSkill).filter(d => !usedIds.has(d.id));

    if (pool.length < cfg.count) {
      const fill = fisherYates(
        DRILL_LIBRARY.filter(d => d.tier === state.profile.tier && !usedIds.has(d.id))
      ).filter(d => !pool.find(p => p.id === d.id));
      pool = [...pool, ...fill.slice(0, cfg.count - pool.length)];
    }

    const selected  = pool.slice(0, cfg.count);
    selected.forEach(d => usedIds.add(d.id));

    const perDrill = selected.length ? Math.floor(cfg.time / selected.length) : 0;
    const extra    = cfg.time - perDrill * selected.length;

    return {
      ...cfg,
      drills: selected.map((d, i) => ({
        ...d,
        allocatedTime: perDrill + (i === 0 ? extra : 0)
      }))
    };
  }

  function generatePlan(minutes) {
    const cfg       = PLAN_CONFIGS[minutes];
    const weakSkill = state.profile?.weakSkill || 'dinking';
    const usedIds   = new Set();
    return {
      minutes,
      label: cfg.label,
      sections: cfg.sections.map(s => buildPlanSection(s, usedIds, weakSkill))
    };
  }

  function renderPlanScreen() {
    if (!state.profile) return;
    if (!state.currentPlan || state.currentPlan.minutes !== state.currentPlanTime) {
      state.currentPlan = generatePlan(state.currentPlanTime);
    }
    document.querySelectorAll('.time-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.min) === state.currentPlanTime);
    });
    renderPlanOutput();
  }

  function renderPlanOutput() {
    const plan   = state.currentPlan;
    const output = document.getElementById('plan-output');
    if (!plan || !output) return;

    const tier   = state.profile.tier;
    const t      = TIERS[tier];
    const weak   = SKILL_LABELS[state.profile.weakSkill] || 'General';
    const total  = plan.sections.reduce((n, s) => n + s.drills.length, 0);

    const CAT = {
      dinking: 'Dinking', serving: 'Serving',
      'third-shot-drop': 'Third Shot Drop',
      volleying: 'Volleying', footwork: 'Footwork', strategy: 'Strategy'
    };

    let num = 0;

    const sectionsHtml = plan.sections.map(sec => {
      const isRest = sec.pool === null;

      const body = isRest
        ? `<div class="plan-cooldown">${COOLDOWN_NOTES[tier] || COOLDOWN_NOTES.beginner}</div>`
        : sec.drills.map(drill => {
            num++;
            const slug = drill.category.replace(/[^a-z]/g, '-');
            return `
              <div class="plan-item">
                <div class="plan-item-num">${num}</div>
                <div class="plan-item-body">
                  <span class="plan-item-name">${drill.name}</span>
                  <div class="plan-item-meta">
                    <span class="cat-badge cat-${slug}" style="font-size:10px;padding:3px 8px">${CAT[drill.category] || drill.category}</span>
                  </div>
                </div>
                <div class="plan-item-right">
                  <span class="plan-item-time">${drill.allocatedTime} min</span>
                  <a class="plan-item-yt" href="${drill.youtube}" target="_blank" rel="noopener noreferrer" title="Watch Tutorial">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </a>
                </div>
              </div>`;
          }).join('');

      const tag = sec.pool === 'weak'
        ? `<span class="plan-sec-tag">${weak} focus</span>` : '';

      return `
        <div class="plan-section">
          <div class="plan-section-hd">
            <span class="plan-sec-icon">${sec.icon}</span>
            <span class="plan-sec-name">${sec.name}</span>
            ${tag}
            <span class="plan-sec-time">${sec.time} min</span>
          </div>
          ${body}
        </div>`;
    }).join('');

    output.innerHTML = `
      <div class="plan-summary">
        <div>
          <div class="plan-summary-label">${plan.label}</div>
          <div class="plan-summary-meta">${t.label} · ${total} drills · ${weak} focus</div>
        </div>
        <div>
          <div class="plan-big-num">${plan.minutes}</div>
          <div class="plan-big-unit">MIN</div>
        </div>
      </div>
      ${sectionsHtml}
      <div style="height:8px"></div>`;
  }

  function selectPlanTime(minutes, el) {
    state.currentPlanTime = minutes;
    state.currentPlan     = generatePlan(minutes);
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    renderPlanOutput();
    document.getElementById('plan-output')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function regeneratePlan() {
    state.currentPlan = generatePlan(state.currentPlanTime);
    renderPlanOutput();
    document.getElementById('plan-output')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function shuffleDrills() {
    if (!state.profile) return;
    const drills = getRecommendedDrills(state.currentDrillIds || []);
    state.currentDrillIds = drills.length ? drills.map(d => d.id) : [];
    renderDrillCards(drills.length ? drills : getRecommendedDrills());

    const list = document.getElementById('drills-list');
    if (list) { list.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }

  /* ---- Settings modal ---- */
  function showSettings() {
    const modal = document.getElementById('modal-settings');
    const info  = document.getElementById('settings-info');

    if (state.profile) {
      const t    = TIERS[state.profile.tier];
      const weak = SKILL_LABELS[state.profile.weakSkill] || 'General';
      const date = new Date(state.profile.createdAt).toLocaleDateString();
      info.innerHTML = `
        <strong>${t.emoji} ${t.label} Player</strong><br>
        Focus area: ${weak}<br>
        Rating range: ${t.range}<br>
        Profile created: ${date}
      `;
    } else {
      info.textContent = 'No profile found.';
    }
    modal.classList.remove('hidden');
  }

  function closeSettings(e) {
    if (e.target === document.getElementById('modal-settings')) {
      document.getElementById('modal-settings').classList.add('hidden');
    }
  }

  function confirmReset() {
    if (confirm('Reset your profile and start fresh?')) {
      resetAll();
    }
  }

  function resetAll() {
    localStorage.removeItem('picklepro_profile');
    state.profile         = null;
    state.quiz.step       = 0;
    state.quiz.answers    = {};
    state.duprWeakSkill   = null;

    // Reset DUPR form
    const di = document.getElementById('dupr-input');
    if (di) di.value = '';
    const dh = document.getElementById('dupr-hint');
    if (dh) { dh.textContent = ' '; dh.className = 'dupr-hint'; }
    const ds = document.getElementById('dupr-submit');
    if (ds) ds.disabled = true;
    document.querySelectorAll('#dupr-chips .chip').forEach(c => c.classList.remove('active'));

    document.getElementById('modal-settings').classList.add('hidden');

    // Update welcome buttons
    updateWelcomeButtons();
    show('welcome');
  }

  /* ---- Persistence ---- */
  function saveProfile() {
    localStorage.setItem('picklepro_profile', JSON.stringify(state.profile));
  }

  function loadProfile() {
    try {
      const raw = localStorage.getItem('picklepro_profile');
      if (raw) state.profile = JSON.parse(raw);
    } catch (e) {
      localStorage.removeItem('picklepro_profile');
    }
  }

  /* ---- Welcome button visibility ---- */
  function updateWelcomeButtons() {
    const hasProfile = !!state.profile;
    document.getElementById('btn-start').style.display       = hasProfile ? 'none'  : '';
    document.getElementById('btn-continue').style.display    = hasProfile ? ''      : 'none';
    document.getElementById('btn-new-profile').style.display = hasProfile ? ''      : 'none';
  }

  /* ---- Boot ---- */
  function init() {
    loadProfile();
    updateWelcomeButtons();
    show('welcome');
  }

  return {
    startOnboarding,
    loadExisting,
    showPathSelect,
    choosePath,
    onDuprInput,
    pickChip,
    submitDupr,
    chooseOpt,
    quizNext,
    quizBack,
    quizSubmit,
    enterApp,
    navigate,
    showSettings,
    closeSettings,
    confirmReset,
    shuffleDrills,
    renderDrillsScreen,
    selectPlanTime,
    regeneratePlan,
    startSession,
    toggleDrill,
    endSession,
    switchTrackerTab,
    onFindSearch,
    clearFind,
    toggleCoachingFilter,
    quickCitySearch,
    init
  };

})();

document.addEventListener('DOMContentLoaded', App.init);
