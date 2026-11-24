'use strict';
/* My Vacation – front end */

// ---------- icons ----------
const P = {
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  star: '<path d="m12 2 2.9 6.6 7.1.7-5.4 4.8 1.6 7.1L12 17.5l-6.2 3.7 1.6-7.1L2 9.3l7.1-.7z"/>',
  car: '<path d="M5 17h14M6 17v2M18 17v2M3 13l2-6a2 2 0 0 1 2-1.4h10A2 2 0 0 1 19 7l2 6v4H3z"/><circle cx="7.5" cy="13.5" r=".6"/><circle cx="16.5" cy="13.5" r=".6"/>',
  food: '<path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M17 21V3c-2 0-4 2-4 6v4h4"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 1 0-4V6H3z"/><path d="M13 6v2M13 11v2M13 16v2"/>',
  bag: '<path d="M6 7h12l1 14H5zM9 7V5a3 3 0 0 1 6 0v2"/>',
  heart: '<path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  back: '<path d="m9 6 6 6-6 6"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="4"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-5-5-9 9"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 8 9 6 9-6"/>',
  msg: '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  coins: '<circle cx="9" cy="9" r="6"/><path d="M15.5 9.5A6 6 0 1 1 9.5 15.5"/><path d="M9 6.5v5M7.5 8h3"/>',
  notes: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 20a6.5 6.5 0 0 0-2.5-5.1"/>',
  edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  share: '<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
  download: '<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  userplus: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M19 8v6M16 11h6"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  open: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="3"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="3"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
};
const icon = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || P.map}</svg>`;
const TOPIC_ICONS = ['plane', 'home', 'star', 'car', 'food', 'ticket', 'bag', 'heart', 'shield', 'map'];
const TOPIC_COLORS = ['#ffc56e', '#f27a90', '#c58ad9', '#7a9ae0', '#5fc4a0', '#f0a060'];
const AV_COLORS = ['#ff8f7a', '#f2a65a', '#e07aa8', '#a77bd1', '#5e8fd6', '#4fb3a9', '#d9a441', '#c76a6a'];

// ---------- countries (name → currency) ----------
const COUNTRIES = {
  'תאילנד': 'THB', 'יוון': 'EUR', 'איטליה': 'EUR', 'ספרד': 'EUR', 'צרפת': 'EUR', 'גרמניה': 'EUR', 'הולנד': 'EUR', 'פורטוגל': 'EUR', 'אוסטריה': 'EUR', 'קפריסין': 'EUR', 'קרואטיה': 'EUR', 'מונטנגרו': 'EUR', 'סלובניה': 'EUR', 'בלגיה': 'EUR', 'אירלנד': 'EUR', 'מלטה': 'EUR', 'פינלנד': 'EUR', 'אסטוניה': 'EUR', 'לטביה': 'EUR', 'ליטא': 'EUR', 'סלובקיה': 'EUR',
  'ארצות הברית': 'USD', 'בריטניה': 'GBP', 'שווייץ': 'CHF', 'טורקיה': 'TRY', 'איחוד האמירויות': 'AED', 'דובאי': 'AED', 'יפן': 'JPY', 'הודו': 'INR', 'וייטנאם': 'VND', 'אינדונזיה': 'IDR', 'באלי': 'IDR', 'פיליפינים': 'PHP', 'מקסיקו': 'MXN', 'ברזיל': 'BRL', 'צ׳כיה': 'CZK', 'הונגריה': 'HUF', 'פולין': 'PLN', 'גאורגיה': 'GEL', 'מצרים': 'EGP', 'ירדן': 'JOD', 'קנדה': 'CAD', 'אוסטרליה': 'AUD', 'ניו זילנד': 'NZD', 'דרום אפריקה': 'ZAR', 'דרום קוריאה': 'KRW', 'סין': 'CNY', 'סינגפור': 'SGD', 'מלזיה': 'MYR', 'סרי לנקה': 'LKR', 'נפאל': 'NPR', 'מרוקו': 'MAD', 'רומניה': 'RON', 'בולגריה': 'BGN', 'שוודיה': 'SEK', 'נורווגיה': 'NOK', 'דנמרק': 'DKK', 'איסלנד': 'ISK', 'ארגנטינה': 'ARS', 'צ׳ילה': 'CLP', 'קולומביה': 'COP', 'פרו': 'PEN', 'קמבודיה': 'USD', 'לאוס': 'USD', 'אקוודור': 'USD', 'פנמה': 'USD', 'קוסטה ריקה': 'USD', 'ישראל': 'ILS', 'אילת': 'ILS',
  'אלבניה': 'EUR', 'סרביה': 'EUR', 'אזרבייג׳ן': 'USD', 'אוזבקיסטן': 'USD', 'מלדיביים': 'USD', 'סיישל': 'EUR', 'זנזיבר': 'USD', 'טנזניה': 'USD', 'קניה': 'USD', 'מאוריציוס': 'EUR',
};
const CUR_NAMES = { ILS: 'שקל', USD: 'דולר', EUR: 'יורו', GBP: 'פאונד', THB: 'באט', JPY: 'ין', CHF: 'פרנק', TRY: 'לירה טורקית', AED: 'דירהם', INR: 'רופי', VND: 'דונג', IDR: 'רופיה', PHP: 'פסו פיליפיני', MXN: 'פסו מקסיקני', BRL: 'ריאל', CZK: 'קורונה צ׳כית', HUF: 'פורינט', PLN: 'זלוטי', GEL: 'לארי', EGP: 'לירה מצרית', JOD: 'דינר', CAD: 'דולר קנדי', AUD: 'דולר אוסטרלי', NZD: 'דולר ניו זילנדי', ZAR: 'ראנד', KRW: 'וון', CNY: 'יואן', SGD: 'דולר סינגפורי', MYR: 'רינגיט', LKR: 'רופי סרי לנקי', NPR: 'רופי נפאלי', MAD: 'דירהם מרוקאי', RON: 'לאו', BGN: 'לב', SEK: 'קרונה שוודית', NOK: 'קרונה נורווגית', DKK: 'קרונה דנית', ISK: 'קרונה איסלנדית', ARS: 'פסו ארגנטינאי', CLP: 'פסו צ׳יליאני', COP: 'פסו קולומביאני', PEN: 'סול' };

// ---------- helpers ----------
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const initial = (n) => esc((n || '?').trim().charAt(0));
const avatar = (p, cls = '') => `<span class="avatar ${cls}" style="background:${AV_COLORS.includes(p.color) ? p.color : '#e07aa8'}">${initial(p.name)}</span>`;
const fmtMoney = (n, cur = 'ILS') => {
  try { return new Intl.NumberFormat('he-IL', { style: 'currency', currency: cur, maximumFractionDigits: n % 1 ? 2 : 0 }).format(n); }
  catch { return `${n} ${cur}`; }
};
const MONTHS = ['בינואר', 'בפברואר', 'במרץ', 'באפריל', 'במאי', 'ביוני', 'ביולי', 'באוגוסט', 'בספטמבר', 'באוקטובר', 'בנובמבר', 'בדצמבר'];
const MONTHS_PLAIN = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
function dateRange(s, e) {
  if (!s) return '';
  const a = new Date(s + 'T00:00'), b = e ? new Date(e + 'T00:00') : null;
  if (!b || +a === +b) return `${a.getDate()} ${MONTHS[a.getMonth()]}`;
  if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) return `${a.getDate()}–${b.getDate()} ${MONTHS[a.getMonth()]}`;
  return `${a.getDate()} ${MONTHS[a.getMonth()]} – ${b.getDate()} ${MONTHS[b.getMonth()]}`;
}
const monthYear = (s) => { if (!s) return ''; const d = new Date(s + 'T00:00'); return `${MONTHS_PLAIN[d.getMonth()]} ${d.getFullYear()}`; };
const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const daysBetween = (a, b) => Math.round((new Date(b + 'T00:00') - new Date(a + 'T00:00')) / 86400000);
const kindName = { file: 'קובץ', image: 'תמונה', email: 'מייל', message: 'הודעה' };
const kindIcon = { file: 'file', image: 'image', email: 'mail', message: 'msg' };
function ago(ts) {
  const d = new Date(ts);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

async function api(path, body, opts = {}) {
  const init = { method: body !== undefined || opts.method === 'POST' ? 'POST' : 'GET', headers: { 'x-mv': '1' }, credentials: 'same-origin' };
  if (body instanceof FormData) init.body = body;
  else if (body !== undefined) { init.headers['content-type'] = 'application/json'; init.body = JSON.stringify(body); }
  let res;
  try { res = await fetch('/api' + path, init); } catch { throw new Error('אין חיבור לאינטרנט'); }
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && !opts.quiet401) { S.me = null; go('#/login'); throw new Error(data.error || 'צריך להתחבר'); }
  if (!res.ok) throw new Error(data.error || 'משהו השתבש');
  return data;
}

// ---------- state ----------
const S = { me: null, list: null, vac: {}, friends: null, tab: 'mine', filter: 'all', costView: 'all', wiz: null, open: {}, mustChange: false };

// ---------- router & transitions ----------
let current = '';
const depth = (h) => {
  if (h.startsWith('#/v/')) return h.split('/').length - 1;
  if (h === '#/' || h === '' || h === '#/login') return 1;
  return 2;
};
function go(hash, replace) {
  if (location.hash === hash) return render();
  if (replace) { history.replaceState(null, '', hash); render(); } else location.hash = hash;
}
window.addEventListener('hashchange', () => render());

function render() {
  const h = location.hash || '#/';
  const back = depth(h) < depth(current || '#/');
  const first = !current;
  current = h;
  closeLayer(true);
  document.documentElement.classList.toggle('nav-back', back);
  const run = () => route(h);
  if (!first && document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.startViewTransition(run);
  } else run();
}

function setScene(s) { document.body.dataset.scene = s; }
function flyPlane() {
  const p = $('#scene .plane');
  p.classList.remove('fly'); void p.offsetWidth; p.classList.add('fly');
}

async function route(h) {
  const app = $('#app');
  const parts = h.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (!S.me && parts[0] !== 'login' && parts[0] !== 'signup') {
    try { S.me = (await api('/me', undefined, { quiet401: true })).user; }
    catch { setScene('dusk'); return paint(app, viewAuth(parts[0] === 'signup')); }
  }
  if (parts[0] === 'login' || parts[0] === 'signup') {
    if (S.me) return go('#/', true);
    setScene('dusk'); return paint(app, viewAuth(parts[0] === 'signup'));
  }
  if (S.mustChange && parts[0] !== 'newpass') return go('#/newpass', true);
  app.scrollTop = 0;
  try {
    switch (parts[0] || '') {
      case '': setScene('dusk'); return paint(app, await viewHome());
      case 'new': setScene('sky'); return paint(app, viewWizard());
      case 'friends': setScene('night'); return paint(app, await viewFriends());
      case 'me': setScene('night'); return paint(app, await viewMe());
      case 'newpass': setScene('night'); return paint(app, viewNewPass());
      case 'v': {
        const id = parts[1];
        if (!S.vac[id]) { paint(app, '<div class="spinner"></div>'); await loadVac(id); }
        const d = S.vac[id];
        if (!parts[2]) { setScene('day'); return paint(app, viewVacation(d)); }
        if (parts[2] === 't' && parts[4] === 'cost') { setScene('day'); return paint(app, viewCostPage(d, parts[3], parts[5])); }
        if (parts[2] === 't') { setScene('day'); return paint(app, viewTopic(d, parts[3])); }
        if (parts[2] === 'costs') { setScene('night'); return paint(app, viewCosts(d)); }
        if (parts[2] === 'notes') { setScene('night'); return paint(app, viewNotes(d)); }
        if (parts[2] === 'people') { setScene('night'); if (!S.friends) S.friends = await api('/friends'); return paint(app, viewPeople(d)); }
        return go('#/v/' + id, true);
      }
      default: return go('#/', true);
    }
  } catch (e) {
    if (S.me) { toast(e.message); paint(app, `<section class="page"><div class="empty homehero"><h3>לא הצלחנו לטעון</h3><p>${esc(e.message)}</p><button class="btn" style="margin-top:20px" data-act="home">חזרה הביתה</button></div></section>`); }
  }
}
function paint(app, html) {
  app.innerHTML = html;
  const after = app.querySelector('[data-mount]');
  if (after && mounts[after.dataset.mount]) mounts[after.dataset.mount](after);
}
async function loadVac(id) { S.vac[id] = await api('/vacations/' + id); return S.vac[id]; }
async function refreshVac(id) { await loadVac(id); S.list = null; }

// ---------- views: auth ----------
function viewAuth(signup) {
  return `<section class="page full auth">
    <svg class="sky-plane" viewBox="0 0 400 120" aria-hidden="true"><path class="trail" d="M10 104 Q150 10 300 38"/><g transform="translate(345 50) rotate(14) scale(1.9) translate(-24 -24)"><path d="M44 22l-14-2-9-14h-4l5 14-10 1-4-5H5l3 8-3 8h3l4-5 10 1-5 14h4l9-14 14-2c2-.4 2-3.6 0-4z"/></g></svg>
    <div class="brand"><h1>My Vacation</h1><p>כל החופשה במקום אחד</p></div>
    <form class="auth-card glass" data-form="${signup ? 'signup' : 'login'}" novalidate>
      ${signup ? `<label class="field"><span>שם</span><input class="input" name="name" autocomplete="name" maxlength="40" required></label>` : ''}
      <label class="field"><span>מייל</span><input class="input" name="email" type="email" inputmode="email" autocomplete="email" dir="ltr" required></label>
      <label class="field"><span>סיסמה${signup ? ' (לפחות 8 תווים)' : ''}</span><input class="input" name="password" type="password" autocomplete="${signup ? 'new-password' : 'current-password'}" dir="ltr" minlength="${signup ? 8 : 1}" required></label>
      <p class="err" data-err></p>
      <button class="btn block" type="submit">${signup ? 'יצירת חשבון' : 'כניסה'}</button>
      <p class="switcher">${signup ? 'כבר יש לך חשבון?' : 'עוד אין לך חשבון?'} <a class="link" href="${signup ? '#/login' : '#/signup'}">${signup ? 'כניסה' : 'הרשמה'}</a></p>
    </form>
  </section>`;
}

// ---------- views: home ----------
async function viewHome() {
  S.list = await api('/vacations');
  if (!S.friends) api('/friends').then(f => { S.friends = f; const d = $('#frdot'); if (d && f.incoming.length) d.hidden = false; }).catch(() => { });
  const { vacations, invites } = S.list;
  const today = todayStr();
  const shown = vacations.filter(v => S.tab === 'group' ? v.group : !v.group);
  const upcoming = shown.filter(v => !v.end || v.end >= today);
  const past = shown.filter(v => v.end && v.end < today).reverse();
  const hour = new Date().getHours();
  const greet = hour < 5 ? 'לילה טוב' : hour < 12 ? 'בוקר טוב' : hour < 17 ? 'צהריים טובים' : hour < 21 ? 'ערב טוב' : 'לילה טוב';
  const feat = upcoming[0];
  const featHtml = feat ? (() => {
    const until = feat.start ? daysBetween(today, feat.start) : null;
    const when = until === null ? 'בלי תאריכים' : until > 1 ? `בקרוב · עוד ${until} ימים` : until === 1 ? 'מחר טסים' : until === 0 ? 'היום טסים' : 'עכשיו בחופשה';
    return `<p class="lbl">${when}</p>
      <button class="vcard glass" data-act="open" data-id="${feat.id}">
        ${feat.notes ? `<span class="chip gold badge">${feat.notes === 1 ? 'תזכורת אחת' : feat.notes + ' תזכורות'}</span>` : ''}
        <h3>${esc(feat.name)}</h3>
        <p class="meta">${esc(feat.countries.join(', '))}${feat.start ? ' · ' + dateRange(feat.start, feat.end) : ''}</p>
        <div class="chips"><span class="chip">${feat.items} מסמכים</span>${feat.total ? `<span class="chip">${fmtMoney(feat.total)}</span>` : ''}${feat.group ? `<span class="chip">${feat.members} חברים</span>` : ''}</div>
      </button>`;
  })() : '';
  const mini = (v) => `<button class="vmini glass" data-act="open" data-id="${v.id}"><b>${esc(v.name)}</b><span>${v.start ? monthYear(v.start) : esc(v.countries.join(', '))}</span></button>`;
  const rest = upcoming.slice(1);
  return `<section class="page ink">
    <div class="top">
      <div><div class="hello">${greet}, ${esc(S.me.name)}</div><h1 class="title" style="margin-top:2px">החופשות שלי</h1></div>
      <button data-act="me" aria-label="החשבון שלי" style="position:relative">${avatar(S.me)}<i class="dot" id="frdot" hidden></i></button>
    </div>
    ${invites.map(v => `<div class="notice"><p><b>${esc(v.invitedBy)}</b> הזמין אותך לחופשה <b>${esc(v.name)}</b></p><button class="mini" data-act="inv-yes" data-id="${v.id}">הצטרפות</button><button class="mini no" data-act="inv-no" data-id="${v.id}">לא</button></div>`).join('')}
    <div class="seg" data-seg="tab" style="margin-top:18px"><span class="knob"></span><button class="${S.tab === 'mine' ? 'on' : ''}" data-act="tab" data-v="mine">שלי</button><button class="${S.tab === 'group' ? 'on' : ''}" data-act="tab" data-v="group">קבוצתיות</button></div>
    <div style="color:#fff;margin-top:${feat ? '34vh' : '0'}">
      ${feat ? featHtml : `<div class="empty homehero"><h3>${S.tab === 'group' ? 'עוד אין חופשות עם חברים' : 'לאן טסים?'}</h3><p>${S.tab === 'group' ? 'פותחים חופשה חדשה ומזמינים אליה חברים.' : 'פותחים חופשה ומכניסים אליה טיסות, מגורים, קבלות ומחירים.'}</p></div>`}
      ${rest.length ? `<p class="lbl">החופשות הבאות</p><div class="vgrid">${rest.map(mini).join('')}</div>` : ''}
      ${past.length ? `<p class="lbl">היינו שם</p><div class="vgrid">${past.map(mini).join('')}</div>` : ''}
    </div>
    <button class="cta" data-act="new">${icon('plus')}חופשה חדשה</button>
    <span data-mount="seg"></span>
  </section>`;
}

// ---------- views: wizard ----------
function newWiz() { S.wiz = { step: 0, countries: [], start: '', end: '', withFriends: false, friends: [], name: '', dir: 1 }; }
function viewWizard() {
  if (!S.wiz) newWiz();
  const w = S.wiz;
  const steps = 4;
  const stops = Array.from({ length: steps }, (_, i) => {
    const x = 6 + i * (88 / (steps - 1));
    const y = 50 - Math.sin((i / (steps - 1)) * Math.PI) * 32;
    return { x, y };
  });
  const pos = stops[w.step];
  const flight = `<div class="flight">
    <svg class="route" viewBox="0 0 100 70" preserveAspectRatio="none"><path d="M6 50 Q50 -14 94 50"/></svg>
    ${stops.map((s, i) => `<span class="stop ${i <= w.step ? 'done' : ''}" style="right:calc(${s.x}% - 6px);top:${s.y - 6}px"></span>`).join('')}
    <svg class="jet" viewBox="0 0 48 48" style="right:calc(${pos.x}% - 14px);top:${pos.y - 22}px;transform:scaleX(-1) rotate(${w.step === 0 ? 20 : w.step === steps - 1 ? -20 : w.step === 1 ? 6 : -6}deg)"><path d="M44 22l-14-2-9-14h-4l5 14-10 1-4-5H5l3 8-3 8h3l4-5 10 1-5 14h4l9-14 14-2c2-.4 2-3.6 0-4z"/></svg>
  </div>`;
  let body = '';
  if (w.step === 0) {
    body = `<h1 class="q">לאן טסים?</h1><p class="qsub">אפשר לבחור כמה מדינות</p>
      <div class="picked" id="picked">${w.countries.map(c => `<button data-act="w-unpick" data-c="${esc(c)}">${esc(c)}${icon('x')}</button>`).join('')}</div>
      <input class="input" id="csearch" placeholder="חיפוש מדינה או עיר" autocomplete="off" style="margin-top:10px">
      <div class="sugg" id="sugg"></div><span data-mount="countries"></span>`;
  } else if (w.step === 1) {
    const n = w.start && w.end ? daysBetween(w.start, w.end) : null;
    body = `<h1 class="q">מתי?</h1><p class="qsub">אפשר גם לדלג ולהוסיף אחר כך</p>
      <div class="dates"><label class="datebox"><span>יציאה</span><input type="date" id="ds" value="${esc(w.start)}"></label><label class="datebox"><span>חזרה</span><input type="date" id="de" value="${esc(w.end)}" min="${esc(w.start)}"></label></div>
      <p class="nights" id="nights">${n !== null && n >= 0 ? (n === 0 ? 'יום אחד' : n === 1 ? 'לילה אחד' : n + ' לילות') : ''}</p><span data-mount="dates"></span>`;
  } else if (w.step === 2) {
    const fr = S.friends?.friends || [];
    body = `<h1 class="q">מי בא?</h1><p class="qsub">חופשה משותפת – כל אחד מכניס את שלו, ומשתפים מה שרוצים</p>
      <div class="who"><button class="${!w.withFriends ? 'on' : ''}" data-act="w-who" data-v="0">${icon('user')}רק אני</button><button class="${w.withFriends ? 'on' : ''}" data-act="w-who" data-v="1">${icon('users')}עם חברים</button></div>
      ${w.withFriends ? (fr.length ? `<div class="friendpick">${fr.map(f => `<button class="${w.friends.includes(f.id) ? 'on' : ''}" data-act="w-friend" data-id="${f.id}">${avatar(f, 'sm')}${esc(f.name)}</button>`).join('')}</div>`
        : `<p class="qsub" style="text-align:center;margin-top:22px">עוד אין לך חברים באתר. אפשר להוסיף אותם בדף החברים ולהזמין אותם לחופשה אחר כך.</p>`) : ''}`;
  } else {
    if (!w.name) w.name = `${w.countries[0] || 'חופשה'}${w.start ? ' ' + new Date(w.start + 'T00:00').getFullYear() : ''}`;
    body = `<h1 class="q">איך נקרא לה?</h1><p class="qsub">${esc([w.countries.join(', '), dateRange(w.start, w.end)].filter(Boolean).join(' · '))}</p>
      <input class="input" id="wname" value="${esc(w.name)}" maxlength="60" style="margin-top:26px;height:64px;font-size:22px;font-weight:600">
      <p class="err" data-err></p>`;
  }
  return `<section class="page full wiz">
    <div class="top"><button class="back" data-act="${w.step ? 'w-prev' : 'w-cancel'}">${icon('back')}${w.step ? 'הקודם' : 'ביטול'}</button><span style="font-size:14px;opacity:.8">${w.step + 1} מתוך ${steps}</span></div>
    ${flight}
    <div class="step ${w.dir < 0 ? 'back-in' : ''}">${body}</div>
    <div class="wiz-foot"><button class="btn block" data-act="${w.step === steps - 1 ? 'w-done' : 'w-next'}">${w.step === steps - 1 ? 'יוצאים לדרך' : w.step === 1 && !w.start ? 'דילוג' : 'הבא'}</button></div>
  </section>`;
}

// ---------- views: vacation ----------
function visible(d, list) {
  if (!d.vacation.group || S.filter === 'all') return list;
  if (S.filter === 'mine') return list.filter(x => x.mine && !x.shared);
  return list.filter(x => x.shared);
}
function topicClass(i) { return 't' + (i % 6); }
function viewVacation(d) {
  const v = d.vacation;
  const openNotes = d.notes.filter(n => !n.done).length;
  const items = visible(d, d.items), costs = visible(d, d.costs);
  const joined = d.members.filter(m => m.status === 'joined');
  return `<section class="page">
    <div class="top"><button class="back" data-act="home">${icon('back')}החופשות שלי</button>
      ${v.owner ? `<button class="circle-btn glass" data-act="v-edit" aria-label="עריכת החופשה">${icon('edit')}</button>` : ''}</div>
    <div class="vhead">
      <h1 class="title">${esc(v.name)}</h1>
      <p class="sub">${esc([v.countries.join(', '), dateRange(v.start, v.end)].filter(Boolean).join(' · '))}${v.start && v.end ? ` · ${daysBetween(v.start, v.end)} לילות` : ''}</p>
      ${v.group ? `<div class="people-row" style="padding-right:8px">${joined.slice(0, 6).map(m => avatar(m, 'sm')).join('')}</div>` : ''}
    </div>
    <div class="actions">
      <button class="act" data-act="go" data-h="#/v/${v.id}/costs">${icon('coins')}מחירים${d.totals.all ? ` <em>${fmtMoney(d.totals.all)}</em>` : ''}</button>
      <button class="act" data-act="go" data-h="#/v/${v.id}/notes">${icon('notes')}הערות${openNotes ? ` <em>${openNotes}</em>` : ''}</button>
      <button class="act" data-act="go" data-h="#/v/${v.id}/people">${icon(v.group ? 'users' : 'userplus')}${v.group ? 'חברים' : 'הזמנת חברים'}</button>
    </div>
    ${v.group ? `<div class="seg dark" data-seg="filter" style="margin-top:16px"><span class="knob"></span>
      <button class="${S.filter === 'all' ? 'on' : ''}" data-act="filter" data-v="all">הכל</button>
      <button class="${S.filter === 'mine' ? 'on' : ''}" data-act="filter" data-v="mine">התיק שלי</button>
      <button class="${S.filter === 'shared' ? 'on' : ''}" data-act="filter" data-v="shared">משותף</button></div>` : ''}
    <div class="field-of-bubbles" data-mount="bubbles" data-vid="${v.id}">
      ${d.topics.map((t, i) => {
    const n = items.filter(x => x.topicId === t.id).length + costs.filter(x => x.topicId === t.id).length;
    return `<button class="bubble ${topicClass(i)}" data-act="topic" data-id="${t.id}" data-i="${i}">${icon(t.icon)}<b>${esc(t.name)}</b><small>${n ? n + ' פריטים' : 'ריק'}</small></button>`;
  }).join('')}
      <button class="bubble add" data-act="t-add" aria-label="נושא חדש">${icon('plus')}<small style="opacity:1">נושא</small></button>
    </div>
    <span data-mount="seg"></span>
  </section>`;
}

function viewTopic(d, tid) {
  const v = d.vacation;
  const i = d.topics.findIndex(t => t.id === tid);
  if (i < 0) { setTimeout(() => go('#/v/' + v.id, true)); return ''; }
  const t = d.topics[i];
  const items = visible(d, d.items).filter(x => x.topicId === t.id);
  const costs = visible(d, d.costs).filter(x => x.topicId === t.id);
  const tot = costs.reduce((s, c) => s + (c.ils || 0), 0);
  const docRow = (it, k) => `<button class="doc" style="animation-delay:${k * 45}ms" data-act="item" data-id="${it.id}">
      <span class="blob ${it.kind}">${it.kind === 'image' ? `<img src="/api/items/${it.id}/file" alt="" loading="lazy">` : icon(kindIcon[it.kind])}</span>
      <span class="t"><b>${esc(it.title || it.fileName || kindName[it.kind])}</b><span>${kindName[it.kind]} · ${ago(it.created)}${!it.mine ? ' · ' + esc(it.by) : ''}</span></span>
      ${v.group ? (it.shared ? '<span class="tag">משותף</span>' : '<span class="tag soft">רק לי</span>') : ''}</button>`;
  const costRow = (c, k) => `<button class="doc" style="animation-delay:${(items.length + k) * 45}ms" data-act="cost" data-id="${c.id}">
      <span class="blob cost">${icon('coins')}</span>
      <span class="t"><b>${esc(c.label || 'מחיר')}</b><span>${c.currency !== 'ILS' && c.ils !== null ? '≈ ' + fmtMoney(Math.round(c.ils)) : ''}${!c.mine ? (c.currency !== 'ILS' ? ' · ' : '') + esc(c.by) : ''}</span></span>
      <span class="amt">${fmtMoney(c.amount, c.currency)}</span></button>`;
  return `<div class="topic-page">
    <div class="topic-hero">
      <div style="flex:1"><button class="back" data-act="go" data-h="#/v/${v.id}" style="color:#fff">${icon('back')}${esc(v.name)}</button>
      <h1 class="title" style="margin-top:4px">${esc(t.name)}</h1></div>
      <span class="topic-orb ${topicClass(i)}">${icon(t.icon)}</span>
    </div>
    <section class="page paper topic-card" style="padding-top:22px">
      <div class="row" style="display:flex;justify-content:space-between;align-items:center">
        <span class="docs-h"><span class="muted" style="color:var(--muted)">${items.length} מסמכים${tot ? ` · ${fmtMoney(Math.round(tot))}` : ''}</span>
        <button class="plus-doc" data-act="add-menu" aria-label="הוספת מסמך">${icon('plus')}</button></span>
        <button class="act plain" data-act="t-edit" data-id="${t.id}">${icon('edit')}עריכה</button>
      </div>
      ${items.length ? `<div class="list">${items.map(docRow).join('')}</div>` : `<p class="hint">עוד אין כאן כלום. מעלים צילום של כרטיס, קובץ PDF, או מדביקים מייל והודעה.</p>`}
      <div class="section-t"><span>מחירים</span>${tot ? `<small>${fmtMoney(Math.round(tot))}</small>` : ''}</div>
      ${costs.length ? `<div class="list">${costs.map(costRow).join('')}</div>` : `<p class="hint">כמה זה עלה? מוסיפים מחיר, אפשר כמה בתוך אותו נושא.</p>`}
      <button class="btn block price-cta" data-act="go" data-h="#/v/${v.id}/t/${t.id}/cost">${icon('coins')}הוספת מחיר</button>
    </section>
  </div>`;
}

function viewCosts(d) {
  const v = d.vacation;
  const mine = v.group && S.costView === 'mine';
  const costs = d.costs.filter(c => !mine || c.mine);
  const rows = d.topics.map((t, i) => {
    const list = costs.filter(c => c.topicId === t.id);
    return { t, i, list, sum: list.reduce((s, c) => s + (c.ils || 0), 0) };
  }).filter(r => r.list.length);
  const total = rows.reduce((s, r) => s + r.sum, 0);
  const C = 2 * Math.PI * 110;
  let off = 0;
  const gap = rows.length > 1 ? 10 : 0;
  const arcs = rows.map(r => {
    const len = total ? (r.sum / total) * C : 0;
    const a = `<circle cx="150" cy="150" r="110" stroke="${TOPIC_COLORS[r.i % 6]}" data-len="${Math.max(len - gap, 0.1)}" data-off="${-off}" stroke-dasharray="0 ${C}" stroke-dashoffset="0"/>`;
    off += len;
    return a;
  }).join('');
  return `<section class="page">
    <div class="top"><button class="back" data-act="go" data-h="#/v/${v.id}">${icon('back')}${esc(v.name)}</button></div>
    <h1 class="title">כמה זה עלה</h1>
    ${v.group ? `<div class="seg dark" data-seg="cost" style="margin-top:16px"><span class="knob"></span><button class="${!mine ? 'on' : ''}" data-act="costview" data-v="all">כל מה שאני רואה</button><button class="${mine ? 'on' : ''}" data-act="costview" data-v="mine">רק שלי</button></div>` : ''}
    <div class="donut" data-mount="donut">
      <svg viewBox="0 0 300 300"><circle cx="150" cy="150" r="110" stroke="rgba(255,255,255,.13)"/>${arcs}</svg>
      <div class="center"><span>סה"כ</span><b>${fmtMoney(Math.round(total))}</b></div>
    </div>
    ${rows.length ? rows.map(r => `<div class="crow ${S.open[r.t.id] ? 'open' : ''}" data-id="${r.t.id}">
        <button data-act="crow" data-id="${r.t.id}"><span class="sw" style="background:${TOPIC_COLORS[r.i % 6]}"></span><span class="n">${esc(r.t.name)}</span><span class="p">${total ? Math.round(r.sum / total * 100) : 0}%</span><span class="v">${fmtMoney(Math.round(r.sum))}</span></button>
        <div class="inner"><div>${r.list.map(c => `<div class="line"><span>${esc(c.label || 'מחיר')}${!c.mine ? ' · ' + esc(c.by) : ''}</span><span dir="ltr">${fmtMoney(c.amount, c.currency)}</span></div>`).join('')}</div></div>
      </div>`).join('') : `<div class="empty"><p>עוד לא נרשמו מחירים. נכנסים לנושא (טיסות, מגורים…) ולוחצים "הוספת מחיר".</p></div>`}
    ${d.costs.some(c => c.currency !== 'ILS') ? `<p class="rate-note">מחירים במטבע זר מחושבים לשקלים לפי השער העדכני${d.totals.missingRate ? ' (לחלק מהמטבעות אין עכשיו שער)' : ''}</p>` : ''}
    <span data-mount="seg"></span>
  </section>`;
}

function viewNotes(d) {
  const v = d.vacation;
  return `<section class="page">
    <div class="top"><button class="back" data-act="go" data-h="#/v/${v.id}">${icon('back')}${esc(v.name)}</button></div>
    <h1 class="title">הערות</h1><p class="sub">דברים שעוד צריך לסגור. רק אתה רואה אותן.</p>
    <form class="addline" data-form="note"><input class="input" name="text" maxlength="300" placeholder="למשל: להזמין מראש שייט לאיים" required><button class="circle-btn" aria-label="הוספה">${icon('plus')}</button></form>
    <div>${d.notes.map((n, k) => `<div class="note ${n.done ? 'done' : ''}" style="animation-delay:${k * 40}ms"><button class="check" data-act="n-toggle" data-id="${n.id}" aria-label="סימון">${icon('check')}</button><p>${esc(n.text)}</p><button class="circle-btn" style="width:36px;height:36px" data-act="n-del" data-id="${n.id}" aria-label="מחיקה">${icon('x')}</button></div>`).join('')}</div>
    ${d.notes.length ? '' : '<div class="empty"><p>אין הערות. כל מה שצריך לזכור – כאן.</p></div>'}
  </section>`;
}

function viewPeople(d) {
  const v = d.vacation;
  const inVac = new Set(d.members.map(m => m.id));
  const canInvite = (S.friends?.friends || []).filter(f => !inVac.has(f.id));
  return `<section class="page">
    <div class="top"><button class="back" data-act="go" data-h="#/v/${v.id}">${icon('back')}${esc(v.name)}</button></div>
    <h1 class="title">מי בחופשה</h1>
    ${d.members.map(m => `<div class="person">${avatar(m, 'sm')}<span class="t"><b>${esc(m.name)}${m.id === S.me.id ? ' (אני)' : ''}</b><span>${m.status === 'invited' ? 'הוזמן, עוד לא אישר' : 'בחופשה'}</span></span></div>`).join('')}
    <p class="lbl">הזמנת חברים</p>
    ${canInvite.length ? `<div class="friendpick" style="justify-content:flex-start;margin-top:4px">${canInvite.map(f => `<button data-act="pick" data-id="${f.id}">${avatar(f, 'sm')}${esc(f.name)}</button>`).join('')}</div>
      <button class="btn block" style="margin-top:18px" data-act="invite">שליחת הזמנה</button>`
      : `<p class="sub">אין חברים להזמין. <a class="link" href="#/friends">הוספת חברים</a></p>`}
    <div style="margin-top:34px">${v.owner ? `<button class="btn danger block" data-act="v-delete">מחיקת החופשה</button>` : `<button class="btn ghost block" data-act="v-leave">יציאה מהחופשה</button>`}</div>
  </section>`;
}

// ---------- views: friends & me ----------
async function viewFriends() {
  S.friends = await api('/friends');
  const f = S.friends;
  return `<section class="page">
    <div class="top"><button class="back" data-act="go" data-h="#/me">${icon('back')}החשבון שלי</button></div>
    <h1 class="title">חברים</h1><p class="sub">חברים אפשר להזמין לחופשות משותפות</p>
    <form class="addline" data-form="friend"><input class="input" name="email" type="email" dir="ltr" placeholder="המייל של החבר" required><button class="circle-btn" aria-label="שליחת בקשה">${icon('userplus')}</button></form>
    ${f.incoming.length ? `<p class="lbl">בקשות חברות</p>${f.incoming.map(p => `<div class="person">${avatar(p, 'sm')}<span class="t"><b>${esc(p.name)}</b><span dir="ltr">${esc(p.email)}</span></span><button class="mini yes" data-act="fr-yes" data-id="${p.requestId}">אישור</button><button class="mini" data-act="fr-no" data-id="${p.requestId}">לא</button></div>`).join('')}` : ''}
    <p class="lbl">החברים שלי</p>
    ${f.friends.length ? f.friends.map(p => `<div class="person">${avatar(p, 'sm')}<span class="t"><b>${esc(p.name)}</b><span dir="ltr">${esc(p.email)}</span></span><button class="mini" data-act="fr-remove" data-id="${p.requestId}" data-name="${esc(p.name)}">הסרה</button></div>`).join('') : '<p class="sub">עוד אין. שולחים בקשה לפי המייל שהחבר נרשם איתו.</p>'}
    ${f.outgoing.length ? `<p class="lbl">ממתינים לאישור</p>${f.outgoing.map(p => `<div class="person">${avatar(p, 'sm')}<span class="t"><b>${esc(p.name)}</b><span>עוד לא אישר</span></span><button class="mini" data-act="fr-remove" data-id="${p.requestId}" data-name="${esc(p.name)}">ביטול</button></div>`).join('')}` : ''}
  </section>`;
}
async function viewMe() {
  const me = S.me;
  let admin = '';
  if (me.isAdmin) {
    const [u, a] = await Promise.all([api('/admin/users'), api('/admin/alerts')]);
    admin = `<p class="lbl">ניהול · משתמשים</p>
      ${u.users.map(x => `<div class="person">${avatar({ name: x.name, color: '#a77bd1' }, 'sm')}<span class="t"><b>${esc(x.name)}</b><span dir="ltr">${esc(x.email)}</span></span>${x.id !== me.id ? `<button class="mini" data-act="adm-reset" data-id="${x.id}" data-name="${esc(x.name)}">סיסמה זמנית</button>` : ''}</div>`).join('')}
      <p class="lbl">ניהול · פעילות חשודה</p>
      ${a.alerts.length ? a.alerts.slice(0, 30).map(x => `<div class="person"><span class="t"><b>${esc(alertName(x.kind))}</b><span>${new Date(x.created).toLocaleString('he-IL')} · <span dir="ltr">${esc(x.detail)}</span></span></span></div>`).join('') : '<p class="sub">אין התראות</p>'}`;
  }
  return `<section class="page">
    <div class="top"><button class="back" data-act="home">${icon('back')}החופשות שלי</button></div>
    <div style="display:flex;align-items:center;gap:14px;margin-top:6px">${avatar(me)}<div><h1 class="title" style="font-size:30px">${esc(me.name)}</h1><p class="sub" dir="ltr" style="text-align:right">${esc(me.email)}</p></div></div>
    <div class="actions" style="margin-top:22px">
      <button class="act" data-act="go" data-h="#/friends">${icon('users')}חברים${S.friends?.incoming.length ? ` <em>${S.friends.incoming.length}</em>` : ''}</button>
      <button class="act" data-act="me-edit">${icon('edit')}שם וצבע</button>
      <button class="act" data-act="me-pass">${icon('lock')}החלפת סיסמה</button>
      <button class="act" data-act="logout">${icon('logout')}יציאה</button>
    </div>
    ${admin}
  </section>`;
}
const alertName = (k) => ({ 'rate-limit': 'יותר מדי ניסיונות', 'login-failures': 'ניסיונות כניסה כושלים', 'access-denied': 'ניסיון גישה לא מורשה', 'file-denied': 'ניסיון לפתוח קובץ של מישהו אחר', 'admin-denied': 'ניסיון כניסה לניהול', 'bad-origin': 'בקשה מאתר זר', 'admin-reset': 'הונפקה סיסמה זמנית' }[k] || k);
function viewNewPass() {
  return `<section class="page full auth">
    <div class="brand"><img class="logo" src="/icons/icon-192.png" alt=""><h1>סיסמה חדשה</h1><p>נכנסת עם סיסמה זמנית. בוחרים עכשיו סיסמה קבועה.</p></div>
    <form class="auth-card glass" data-form="newpass"><label class="field"><span>סיסמה חדשה (לפחות 8 תווים)</span><input class="input" name="password" type="password" autocomplete="new-password" dir="ltr" minlength="8" required></label><p class="err" data-err></p><button class="btn block">שמירה</button></form>
  </section>`;
}

// ---------- layers (sheets) ----------
let layerClose = null;
function openSheet(html, mount) {
  closeLayer(true);
  const layer = $('#layer');
  layer.innerHTML = `<div class="scrim"></div><div class="sheet" role="dialog" aria-modal="true"><div class="grip"></div>${html}</div>`;
  const scrim = layer.querySelector('.scrim'), sheet = layer.querySelector('.sheet');
  requestAnimationFrame(() => requestAnimationFrame(() => { scrim.classList.add('in'); sheet.classList.add('in'); }));
  const close = () => {
    scrim.classList.remove('in'); sheet.classList.remove('in');
    layerClose = null;
    setTimeout(() => { if (layer.contains(sheet)) layer.innerHTML = ''; }, 500);
  };
  scrim.addEventListener('click', close);
  let y0 = null;
  sheet.addEventListener('touchstart', e => { y0 = sheet.scrollTop <= 0 ? e.touches[0].clientY : null; }, { passive: true });
  sheet.addEventListener('touchmove', e => { if (y0 !== null && e.touches[0].clientY - y0 > 90) { y0 = null; close(); } }, { passive: true });
  layerClose = close;
  if (mount) mount(sheet, close);
  return close;
}
function closeLayer(instant) {
  if (!layerClose) return;
  if (instant) { $('#layer').innerHTML = ''; layerClose = null; } else layerClose();
}
function confirmSheet(title, text, yes, danger = true) {
  return new Promise(res => {
    let done = false;
    const close = openSheet(`<h2>${esc(title)}</h2><p class="muted" style="margin-top:8px;line-height:1.5">${esc(text)}</p>
      <div class="vactions"><button class="btn ${danger ? 'danger' : ''}" data-yes>${esc(yes)}</button><button class="btn soft" data-no>ביטול</button></div>`, (s, c) => {
      s.querySelector('[data-yes]').onclick = () => { done = true; c(); res(true); };
      s.querySelector('[data-no]').onclick = () => { c(); res(false); };
    });
    $('#layer .scrim').addEventListener('click', () => { if (!done) res(false); });
    void close;
  });
}

// ---------- image compression ----------
async function compressImage(file) {
  if (!/^image\/(jpeg|png|webp|heic|heif)/i.test(file.type) && !/\.(heic|heif)$/i.test(file.name)) return file;
  try {
    const bmp = await createImageBitmap(file);
    const max = 2000, k = Math.min(1, max / Math.max(bmp.width, bmp.height));
    if (k === 1 && file.size < 1.5e6 && file.type === 'image/jpeg') return file;
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.85));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch { return file; }
}

// ---------- sheets: add / view ----------
function sharedToggle(d, on) {
  if (!d.vacation.group) return '';
  return `<button type="button" class="toggle" data-toggle style="width:100%"><span>שיתוף עם הקבוצה<small>כבוי = נשמר רק בתיק שלך</small></span><span class="switch ${on ? 'on' : ''}"></span></button>`;
}
function bindToggle(s) {
  const t = s.querySelector('[data-toggle]');
  if (t) t.onclick = () => t.querySelector('.switch').classList.toggle('on');
  return () => !!(t && t.querySelector('.switch.on'));
}
function guessCurrency(d) {
  for (const c of d.vacation.countries) if (COUNTRIES[c]) return COUNTRIES[c];
  return 'ILS';
}
function openAdd(d, topicId, kind) {
  const v = d.vacation;
  const topic = d.topics.find(t => t.id === topicId);
  const isFile = kind === 'file' || kind === 'image';
  const title = { file: 'הוספת קובץ', image: 'הוספת תמונה', email: 'הוספת מייל', message: 'הוספת הודעה' }[kind];
  openSheet(`<h2>${title}</h2><p class="muted">${esc(topic.name)}</p>
    <form data-f>
      ${isFile ? `<label class="btn soft block" style="margin-top:16px;cursor:pointer">${icon(kind === 'image' ? 'image' : 'file')}<span data-fname>${kind === 'image' ? 'בחירת תמונה או צילום מסך' : 'בחירת קובץ (PDF או תמונה)'}</span>
          <input type="file" name="file" accept="${kind === 'image' ? 'image/*' : 'application/pdf,image/*'}" class="sr" required></label>` : ''}
      <label class="field"><span>כותרת</span><input class="input" name="title" maxlength="120" placeholder="${kind === 'email' ? 'למשל: אישור הזמנה – אל על' : kind === 'message' ? 'למשל: פרטי המעבורת' : 'למשל: כרטיס טיסה הלוך'}"></label>
      ${!isFile ? `<label class="field"><span>${kind === 'email' ? 'מעתיקים את המייל ומדביקים כאן' : 'מעתיקים את ההודעה ומדביקים כאן'}</span><textarea class="input" name="body" maxlength="20000" required></textarea></label>` : ''}
      ${sharedToggle(d, false)}
      <p class="err" data-err></p>
      <button class="btn block" style="margin-top:6px">שמירה</button>
    </form>`, (s, close) => {
    const isShared = bindToggle(s);
    const fi = s.querySelector('input[type=file]');
    if (fi) fi.onchange = () => {
      const f = fi.files[0];
      if (!f) return;
      s.querySelector('[data-fname]').textContent = f.name;
      const t = s.querySelector('[name=title]');
      if (!t.value) t.value = f.name.replace(/\.\w+$/, '').slice(0, 120);
    };
    s.querySelector('[data-f]').onsubmit = async (e) => {
      e.preventDefault();
      const form = e.target, err = s.querySelector('[data-err]'), btn = form.querySelector('.btn:last-child');
      err.textContent = '';
      try {
        btn.disabled = true; btn.textContent = 'שומר…';
        if (isFile) {
          let f = fi.files[0];
          if (!f) throw new Error('צריך לבחור קובץ');
          f = await compressImage(f);
          if (f.size > 10 * 1024 * 1024) throw new Error('הקובץ גדול מדי (עד 10MB)');
          const fd = new FormData();
          fd.set('topicId', topicId); fd.set('kind', kind); fd.set('title', form.title.value); fd.set('shared', isShared() ? '1' : '0'); fd.set('file', f, f.name);
          await api(`/vacations/${v.id}/items`, fd);
        } else {
          await api(`/vacations/${v.id}/items`, { topicId, kind, title: form.title.value, body: form.body.value, shared: isShared() });
        }
        close(); await refreshVac(v.id); render(); toast('נשמר');
      } catch (ex) { err.textContent = ex.message; btn.disabled = false; btn.textContent = 'שמירה'; }
    };
  });
}
function viewCostPage(d, tid, costId) {
  const v = d.vacation;
  const i = d.topics.findIndex(t => t.id === tid);
  const cost = costId ? d.costs.find(c => c.id === costId && c.mine) : null;
  if (i < 0 || (costId && !cost)) { setTimeout(() => go('#/v/' + v.id + (i < 0 ? '' : '/t/' + tid), true)); return ''; }
  const t = d.topics[i];
  const cur = cost ? cost.currency : guessCurrency(d);
  const names = [...new Set(visible(d, d.items).filter(x => x.topicId === tid).map(it => it.title || it.fileName || kindName[it.kind]))];
  if (cost && cost.label && !names.includes(cost.label)) names.unshift(cost.label);
  const sel = cost ? (cost.label || '') : (names[0] || '');
  return `<div class="topic-page">
    <div class="topic-hero">
      <div style="flex:1"><button class="back" data-act="go" data-h="#/v/${v.id}/t/${t.id}" style="color:#fff">${icon('back')}${esc(t.name)}</button>
      <h1 class="title" style="margin-top:4px">${cost ? 'עריכת מחיר' : 'הוספת מחיר'}</h1></div>
      <span class="topic-orb ${topicClass(i)}">${icon('coins')}</span>
    </div>
    <section class="page paper topic-card cost-page" style="padding-top:22px">
      <form data-costf data-vid="${v.id}" data-tid="${t.id}" data-cid="${cost ? cost.id : ''}">
        <label class="field"><span>על מה?</span><select class="input" name="label">
          ${names.map(n => `<option value="${esc(n)}" ${n === sel ? 'selected' : ''}>${esc(n)}</option>`).join('')}
          <option value="" ${sel === '' ? 'selected' : ''}>כללי, בלי מסמך</option></select></label>
        ${names.length ? '' : `<p class="hint" style="padding:10px 16px 0">אחרי שמוסיפים מסמכים לנושא, השמות שלהם יופיעו כאן לבחירה.</p>`}
        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:10px">
          <label class="field"><span>סכום</span><input class="input" name="amount" inputmode="decimal" dir="ltr" required value="${cost ? cost.amount : ''}" placeholder="0"></label>
          <label class="field"><span>מטבע</span><select class="input" name="currency">${d.currencies.map(c => `<option value="${c}" ${c === cur ? 'selected' : ''}>${CUR_NAMES[c] || c} (${c})</option>`).join('')}</select></label>
        </div>
        ${sharedToggle(d, cost ? cost.shared : false)}
        <p class="err" data-err></p>
        <div class="vactions"><button class="btn">${cost ? 'שמירה' : 'הוספה'}</button>${cost ? `<button type="button" class="btn danger" data-del>${icon('trash')}מחיקה</button>` : ''}</div>
      </form>
    </section>
    <span data-mount="costform"></span>
  </div>`;
}
function bindCostForm() {
  const f = $('[data-costf]');
  if (!f) return;
  const vid = f.dataset.vid, tid = f.dataset.tid, cid = f.dataset.cid;
  const isShared = bindToggle(f);
  const back = '#/v/' + vid + '/t/' + tid;
  f.onsubmit = async (e) => {
    e.preventDefault();
    const err = f.querySelector('[data-err]');
    const amount = Number(f.amount.value.replace(/,/g, '').trim());
    if (!f.amount.value.trim() || !isFinite(amount) || amount < 0) { err.textContent = 'צריך לכתוב סכום'; return; }
    try {
      const body = { label: f.label.value, amount, currency: f.currency.value, shared: isShared() };
      if (cid) await api(`/costs/${cid}/update`, body);
      else await api(`/vacations/${vid}/costs`, { ...body, topicId: tid });
      await refreshVac(vid); history.replaceState(null, '', back); render(); toast('נשמר');
    } catch (ex) { err.textContent = ex.message; }
  };
  const del = f.querySelector('[data-del]');
  if (del) del.onclick = async () => {
    if (!(await confirmSheet('למחוק את המחיר?', 'המחיר יימחק מהחופשה.', 'מחיקה'))) return;
    try { await api(`/costs/${cid}/delete`, {}); await refreshVac(vid); history.replaceState(null, '', back); render(); toast('נמחק'); } catch (ex) { toast(ex.message); }
  };
}
function openAddMenu(d, topicId) {
  closeLayer(true);
  const layer = $('#layer');
  const opts = [['image', 'image', 'תמונה'], ['file', 'file', 'קובץ'], ['email', 'mail', 'מייל'], ['message', 'msg', 'הודעה']];
  layer.innerHTML = `<div class="scrim"></div><div class="asheet" role="dialog" aria-modal="true">
    <div class="grp"><p class="asheet-t">מה מוסיפים?</p>${opts.map(([k, ic, n]) => `<button data-k="${k}"><span class="blob ${k}">${icon(ic)}</span>${n}</button>`).join('')}</div>
    <button class="grp cancel">ביטול</button></div>`;
  const scrim = layer.querySelector('.scrim'), sh = layer.querySelector('.asheet');
  requestAnimationFrame(() => requestAnimationFrame(() => { scrim.classList.add('in'); sh.classList.add('in'); }));
  const close = () => {
    scrim.classList.remove('in'); sh.classList.remove('in'); layerClose = null;
    setTimeout(() => { if (layer.contains(sh)) layer.innerHTML = ''; }, 450);
  };
  scrim.onclick = close;
  sh.querySelector('.cancel').onclick = close;
  sh.querySelectorAll('[data-k]').forEach(b => b.onclick = () => openAdd(d, topicId, b.dataset.k));
  layerClose = close;
}
function openItem(d, it) {
  const v = d.vacation;
  const url = `/api/items/${it.id}/file`;
  const content = it.kind === 'image' ? `<img class="viewer-img" src="${url}" alt="">`
    : it.kind === 'file' ? `<a class="btn soft block" style="margin-top:16px" href="${url}" target="_blank" rel="noopener">${icon('open')}פתיחת הקובץ</a>`
      : `<div class="paper-note">${esc(it.body)}</div>`;
  openSheet(`<div class="row" style="display:flex;gap:12px;align-items:center"><span class="blob ${it.kind}">${icon(kindIcon[it.kind])}</span><div style="flex:1;min-width:0"><h2 style="font-size:20px;overflow-wrap:anywhere">${esc(it.title || it.fileName || kindName[it.kind])}</h2><p class="muted">${kindName[it.kind]} · ${ago(it.created)}${!it.mine ? ' · ' + esc(it.by) : ''}</p></div></div>
    ${content}
    ${it.mine && v.group ? sharedToggle(d, it.shared) : ''}
    <div class="vactions">
      <button class="btn" data-share>${icon('share')}שליחה</button>
      ${it.kind !== 'file' && it.kind !== 'image' ? `<button class="btn soft" data-copy>${icon('copy')}העתקה</button>` : `<a class="btn soft" href="${url}?dl=1" download>${icon('download')}הורדה</a>`}
      ${it.mine ? `<button class="btn soft" data-edit>${icon('edit')}שם</button><button class="btn danger" data-del>${icon('trash')}מחיקה</button>` : ''}
    </div>`, (s, close) => {
    const t = s.querySelector('[data-toggle]');
    if (t) t.onclick = async () => {
      const sw = t.querySelector('.switch'); sw.classList.toggle('on');
      try { await api(`/items/${it.id}/update`, { shared: sw.classList.contains('on') }); await refreshVac(v.id); render(); toast(sw.classList.contains('on') ? 'משותף עם הקבוצה' : 'רק בתיק שלך'); }
      catch (ex) { sw.classList.toggle('on'); toast(ex.message); }
    };
    s.querySelector('[data-share]').onclick = () => shareItem(it);
    const cp = s.querySelector('[data-copy]');
    if (cp) cp.onclick = async () => { try { await navigator.clipboard.writeText(it.body); toast('הועתק'); } catch { toast('לא הצלחנו להעתיק'); } };
    const del = s.querySelector('[data-del]');
    if (del) del.onclick = async () => {
      close();
      if (!(await confirmSheet('למחוק?', 'המסמך יימחק לגמרי.', 'מחיקה'))) return;
      try { await api(`/items/${it.id}/delete`, {}); await refreshVac(v.id); render(); toast('נמחק'); } catch (ex) { toast(ex.message); }
    };
    const ed = s.querySelector('[data-edit]');
    if (ed) ed.onclick = () => openText('שם המסמך', it.title || '', 120, async (val) => { await api(`/items/${it.id}/update`, { title: val }); await refreshVac(v.id); render(); });
  });
}
async function shareItem(it) {
  const title = it.title || it.fileName || kindName[it.kind];
  try {
    if (it.kind === 'email' || it.kind === 'message') {
      if (navigator.share) await navigator.share({ title, text: `${title}\n\n${it.body}` });
      else { await navigator.clipboard.writeText(it.body); toast('הועתק – אפשר להדביק בוואטסאפ'); }
      return;
    }
    const blob = await (await fetch(`/api/items/${it.id}/file`, { credentials: 'same-origin' })).blob();
    const file = new File([blob], it.fileName || 'file', { type: blob.type });
    if (navigator.canShare && navigator.canShare({ files: [file] })) await navigator.share({ files: [file], title });
    else { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = it.fileName || 'file'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
  } catch (e) { if (e.name !== 'AbortError') toast('לא הצלחנו לשלוח'); }
}
function openText(title, value, max, save) {
  openSheet(`<h2>${esc(title)}</h2><form data-f><input class="input" name="v" maxlength="${max}" value="${esc(value)}" style="margin-top:16px" required><p class="err" data-err></p><button class="btn block">שמירה</button></form>`, (s, close) => {
    const inp = s.querySelector('input'); setTimeout(() => inp.focus(), 350);
    s.querySelector('[data-f]').onsubmit = async (e) => {
      e.preventDefault();
      try { await save(inp.value.trim()); close(); } catch (ex) { s.querySelector('[data-err]').textContent = ex.message; }
    };
  });
}
function openTopicEdit(d, t) {
  const v = d.vacation;
  let ic = t ? t.icon : 'map';
  openSheet(`<h2>${t ? 'עריכת נושא' : 'נושא חדש'}</h2>
    <form data-f><label class="field"><span>שם</span><input class="input" name="name" maxlength="30" value="${esc(t?.name || '')}" placeholder="למשל: רכב, ביטוח, מסעדות" required></label>
    <div class="colors" style="gap:8px">${TOPIC_ICONS.map(n => `<button type="button" data-ic="${n}" class="circle-btn" style="background:${n === ic ? '#f27a90' : '#f6e9ee'};color:${n === ic ? '#fff' : 'var(--paper-ink)'}" aria-label="${n}">${icon(n)}</button>`).join('')}</div>
    <p class="err" data-err></p>
    <div class="vactions"><button class="btn">שמירה</button>${t ? `<button type="button" class="btn danger" data-del>${icon('trash')}מחיקת הנושא</button>` : ''}</div></form>`, (s, close) => {
    s.querySelectorAll('[data-ic]').forEach(b => b.onclick = () => {
      ic = b.dataset.ic;
      s.querySelectorAll('[data-ic]').forEach(x => { const on = x.dataset.ic === ic; x.style.background = on ? '#f27a90' : '#f6e9ee'; x.style.color = on ? '#fff' : 'var(--paper-ink)'; });
    });
    s.querySelector('[data-f]').onsubmit = async (e) => {
      e.preventDefault();
      try {
        if (t) await api(`/topics/${t.id}/update`, { name: e.target.name.value, icon: ic });
        else await api(`/vacations/${v.id}/topics`, { name: e.target.name.value, icon: ic });
        close(); await refreshVac(v.id); render();
      } catch (ex) { s.querySelector('[data-err]').textContent = ex.message; }
    };
    const del = s.querySelector('[data-del]');
    if (del) del.onclick = async () => {
      close();
      if (!(await confirmSheet('למחוק את הנושא?', 'כל המסמכים והמחירים שלך בנושא הזה יימחקו.', 'מחיקה'))) return;
      try { await api(`/topics/${t.id}/delete`, {}); await refreshVac(v.id); go('#/v/' + v.id); } catch (ex) { toast(ex.message); }
    };
  });
}
function openVacEdit(d) {
  const v = d.vacation;
  openSheet(`<h2>עריכת החופשה</h2><form data-f>
    <label class="field"><span>שם</span><input class="input" name="name" maxlength="60" value="${esc(v.name)}" required></label>
    <label class="field"><span>מדינות (מופרדות בפסיק)</span><input class="input" name="countries" value="${esc(v.countries.join(', '))}"></label>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><label class="field"><span>יציאה</span><input class="input" type="date" name="start" value="${esc(v.start || '')}"></label><label class="field"><span>חזרה</span><input class="input" type="date" name="end" value="${esc(v.end || '')}"></label></div>
    <p class="err" data-err></p><button class="btn block">שמירה</button></form>`, (s, close) => {
    s.querySelector('[data-f]').onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target;
      try {
        await api(`/vacations/${v.id}/update`, { name: f.name.value, countries: f.countries.value.split(',').map(x => x.trim()).filter(Boolean), start: f.start.value, end: f.end.value });
        close(); await refreshVac(v.id); render();
      } catch (ex) { s.querySelector('[data-err]').textContent = ex.message; }
    };
  });
}

// ---------- mounts (run after paint) ----------
const mounts = {
  costform() { bindCostForm(); },
  seg() {
    document.querySelectorAll('.seg').forEach(seg => {
      const on = seg.querySelector('button.on'), knob = seg.querySelector('.knob');
      if (!on || !knob) return;
      const key = seg.dataset.seg, to = { l: on.offsetLeft, w: on.offsetWidth };
      const from = S.knob?.[key] || to;
      knob.style.transition = 'none';
      knob.style.left = '0px';
      knob.style.width = from.w + 'px';
      knob.style.transform = `translateX(${from.l}px)`;
      void knob.offsetWidth;
      knob.style.transition = '';
      requestAnimationFrame(() => { knob.style.width = to.w + 'px'; knob.style.transform = `translateX(${to.l}px)`; });
      (S.knob ||= {})[key] = to;
    });
  },
  bubbles(el) {
    const btns = [...el.querySelectorAll('.bubble')];
    const W = el.clientWidth;
    const xs = [0.68, 0.30, 0.70, 0.30, 0.68, 0.34];
    const pts = [];
    let y = 70;
    btns.forEach((b, i) => {
      const add = b.classList.contains('add');
      const size = add ? 78 : i < 3 ? Math.min(146, W * 0.4) : Math.min(124, W * 0.34);
      const x = W * xs[i % xs.length];
      b.style.width = b.style.height = size + 'px';
      b.style.left = (x - size / 2) + 'px';
      b.style.top = (y - size / 2) + 'px';
      b.style.animationDelay = (-i * 1.3) + 's';
      pts.push([x, y]);
      y += add ? 70 : size * 0.82;
    });
    el.style.height = (y + 40) + 'px';
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      d += ` C${x0} ${(y0 + y1) / 2 + 20}, ${x1} ${(y0 + y1) / 2 - 20}, ${x1} ${y1}`;
    }
    el.insertAdjacentHTML('afterbegin', `<svg class="trail" width="${W}" height="${y + 40}"><path d="${d}"/></svg>`);
    mounts.seg();
  },
  donut(el) {
    requestAnimationFrame(() => setTimeout(() => {
      const C = 2 * Math.PI * 110;
      el.querySelectorAll('circle[data-len]').forEach(c => {
        c.setAttribute('stroke-dasharray', `${c.dataset.len} ${C}`);
        c.setAttribute('stroke-dashoffset', c.dataset.off);
      });
    }, 120));
    mounts.seg();
  },
  countries(el) {
    const input = $('#csearch'), sugg = $('#sugg');
    const all = Object.keys(COUNTRIES);
    const draw = () => {
      const q = input.value.trim();
      const w = S.wiz;
      let list = all.filter(c => !w.countries.includes(c) && (!q || c.includes(q)));
      if (!q) list = ['תאילנד', 'יוון', 'איטליה', 'ספרד', 'קפריסין', 'ארצות הברית', 'יפן', 'וייטנאם', 'גאורגיה', 'פורטוגל', 'צרפת', 'הודו'].filter(c => !w.countries.includes(c));
      const extra = q && !all.includes(q) && !w.countries.includes(q) ? `<button data-act="w-pick" data-c="${esc(q)}">${icon('plus')} ${esc(q)}</button>` : '';
      sugg.innerHTML = list.slice(0, 18).map(c => `<button data-act="w-pick" data-c="${esc(c)}">${esc(c)}</button>`).join('') + extra;
    };
    input.oninput = draw;
    input.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); const q = input.value.trim(); if (q) pickCountry(q); } };
    draw();
  },
  dates() {
    const s = $('#ds'), e = $('#de');
    const upd = () => {
      S.wiz.start = s.value; S.wiz.end = e.value;
      e.min = s.value;
      if (s.value && e.value && e.value < s.value) { e.value = ''; S.wiz.end = ''; }
      if (s.value && !e.value) e.value = '';
      const n = s.value && e.value ? daysBetween(s.value, e.value) : null;
      $('#nights').textContent = n !== null && n >= 0 ? (n === 0 ? 'יום אחד' : n === 1 ? 'לילה אחד' : n + ' לילות') : '';
      $('.wiz-foot .btn').textContent = s.value ? 'הבא' : 'דילוג';
    };
    s.onchange = s.oninput = upd; e.onchange = e.oninput = upd;
  },
};
function pickCountry(c) {
  c = c.slice(0, 40);
  if (!S.wiz.countries.includes(c) && S.wiz.countries.length < 15) S.wiz.countries.push(c);
  const input = $('#csearch'); input.value = '';
  $('#picked').innerHTML = S.wiz.countries.map(x => `<button data-act="w-unpick" data-c="${esc(x)}">${esc(x)}${icon('x')}</button>`).join('');
  input.dispatchEvent(new Event('input'));
}
async function wizStep(delta) {
  const w = S.wiz;
  if (w.step + delta === 2) { try { S.friends = await api('/friends'); } catch { } }
  w.dir = delta; w.step += delta;
  const app = $('#app');
  const run = () => paint(app, viewWizard());
  if (document.startViewTransition) document.startViewTransition(run); else run();
}

// ---------- actions ----------
const actions = {
  home: () => go('#/'),
  go: (el) => go(el.dataset.h),
  me: () => go('#/me'),
  new: () => { newWiz(); go('#/new'); },
  open: (el) => { flyPlane(); go('#/v/' + el.dataset.id); },
  tab: (el) => { S.tab = el.dataset.v; render(); },
  filter: (el) => { S.filter = el.dataset.v; render(); },
  costview: (el) => { S.costView = el.dataset.v; render(); },
  crow: (el) => { const id = el.dataset.id; S.open[id] = !S.open[id]; el.closest('.crow').classList.toggle('open', S.open[id]); },
  topic: (el) => { el.style.viewTransitionName = 'orb'; go(location.hash + '/t/' + el.dataset.id); },
  't-add': () => openTopicEdit(curVac(), null),
  't-edit': (el) => { const d = curVac(); openTopicEdit(d, d.topics.find(t => t.id === el.dataset.id)); },
  'v-edit': () => openVacEdit(curVac()),
  'add-menu': () => openAddMenu(curVac(), location.hash.split('/')[4]),
  item: (el) => { const d = curVac(); openItem(d, d.items.find(i => i.id === el.dataset.id)); },
  cost: (el) => {
    const d = curVac(); const c = d.costs.find(i => i.id === el.dataset.id);
    if (c.mine) go(`#/v/${d.vacation.id}/t/${c.topicId}/cost/${c.id}`); else toast(`נוסף על ידי ${c.by}`);
  },
  'inv-yes': async (el) => { await api(`/vacations/${el.dataset.id}/respond`, { accept: true }); S.list = null; flyPlane(); go('#/v/' + el.dataset.id); },
  'inv-no': async (el) => { await api(`/vacations/${el.dataset.id}/respond`, { accept: false }); S.list = null; render(); },
  'w-cancel': () => { S.wiz = null; go('#/'); },
  'w-prev': () => wizStep(-1),
  'w-next': () => {
    const w = S.wiz;
    if (w.step === 0 && !w.countries.length) {
      const q = $('#csearch').value.trim();
      if (q) pickCountry(q); else { toast('בוחרים לפחות מדינה אחת'); return; }
    }
    if (w.step === 1 && w.start && !w.end) w.end = w.start;
    if (w.step === 2 && w.withFriends && !w.friends.length && (S.friends?.friends || []).length) { toast('בוחרים חברים, או "רק אני"'); return; }
    wizStep(1);
  },
  'w-pick': (el) => pickCountry(el.dataset.c),
  'w-unpick': (el) => { S.wiz.countries = S.wiz.countries.filter(c => c !== el.dataset.c); el.remove(); $('#csearch').dispatchEvent(new Event('input')); },
  'w-who': (el) => { S.wiz.withFriends = el.dataset.v === '1'; if (!S.wiz.withFriends) S.wiz.friends = []; paint($('#app'), viewWizard()); },
  'w-friend': (el) => { const w = S.wiz, id = el.dataset.id; w.friends = w.friends.includes(id) ? w.friends.filter(x => x !== id) : [...w.friends, id]; el.classList.toggle('on'); },
  'w-done': async (el) => {
    const w = S.wiz;
    w.name = $('#wname').value.trim();
    if (!w.name) { $('[data-err]').textContent = 'צריך שם לחופשה'; return; }
    el.disabled = true;
    try {
      const r = await api('/vacations', { name: w.name, countries: w.countries, start: w.start || '', end: w.end || '', friends: w.withFriends ? w.friends : [] });
      S.wiz = null; S.list = null; flyPlane();
      history.replaceState(null, '', '#/');
      go('#/v/' + r.id);
    } catch (ex) { $('[data-err]').textContent = ex.message; el.disabled = false; }
  },
  'n-toggle': async (el) => {
    const d = curVac(); const n = d.notes.find(x => x.id === el.dataset.id);
    n.done = !n.done; el.closest('.note').classList.toggle('done', n.done);
    try { await api(`/notes/${n.id}/update`, { done: n.done }); S.list = null; } catch (ex) { toast(ex.message); }
  },
  'n-del': async (el) => {
    const d = curVac();
    try { await api(`/notes/${el.dataset.id}/delete`, {}); d.notes = d.notes.filter(x => x.id !== el.dataset.id); S.list = null; el.closest('.note').remove(); } catch (ex) { toast(ex.message); }
  },
  pick: (el) => el.classList.toggle('on'),
  invite: async () => {
    const ids = [...document.querySelectorAll('.friendpick button.on')].map(b => b.dataset.id);
    if (!ids.length) return toast('בוחרים חברים להזמנה');
    const d = curVac();
    try { await api(`/vacations/${d.vacation.id}/invite`, { friends: ids }); await refreshVac(d.vacation.id); render(); toast('ההזמנה נשלחה'); } catch (ex) { toast(ex.message); }
  },
  'v-delete': async () => {
    const d = curVac();
    if (!(await confirmSheet('למחוק את החופשה?', 'כל המסמכים, המחירים וההערות יימחקו, גם של החברים. אי אפשר לבטל.', 'מחיקה לגמרי'))) return;
    try { await api(`/vacations/${d.vacation.id}/delete`, {}); delete S.vac[d.vacation.id]; S.list = null; go('#/'); toast('החופשה נמחקה'); } catch (ex) { toast(ex.message); }
  },
  'v-leave': async () => {
    const d = curVac();
    if (!(await confirmSheet('לצאת מהחופשה?', 'המסמכים והמחירים שהוספת יימחקו.', 'יציאה'))) return;
    try { await api(`/vacations/${d.vacation.id}/leave`, {}); delete S.vac[d.vacation.id]; S.list = null; go('#/'); } catch (ex) { toast(ex.message); }
  },
  'fr-yes': async (el) => { S.friends = await api('/friends/respond', { requestId: el.dataset.id, accept: true }); render(); toast('אתם חברים עכשיו'); },
  'fr-no': async (el) => { S.friends = await api('/friends/respond', { requestId: el.dataset.id, accept: false }); render(); },
  'fr-remove': async (el) => {
    if (!(await confirmSheet('להסיר?', `${el.dataset.name} יוסר מהחברים שלך.`, 'הסרה'))) return;
    S.friends = await api('/friends/remove', { requestId: el.dataset.id }); render();
  },
  'me-edit': () => {
    let color = S.me.color;
    openSheet(`<h2>שם וצבע</h2><form data-f><label class="field"><span>שם</span><input class="input" name="name" maxlength="40" value="${esc(S.me.name)}" required></label>
      <div class="colors">${AV_COLORS.map(c => `<button type="button" data-c="${c}" class="${c === color ? 'on' : ''}" style="background:${c}" aria-label="צבע"></button>`).join('')}</div>
      <p class="err" data-err></p><button class="btn block">שמירה</button></form>`, (s, close) => {
      s.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { color = b.dataset.c; s.querySelectorAll('[data-c]').forEach(x => x.classList.toggle('on', x === b)); });
      s.querySelector('[data-f]').onsubmit = async (e) => {
        e.preventDefault();
        try { S.me = (await api('/me', { name: e.target.name.value, color })).user; close(); render(); } catch (ex) { s.querySelector('[data-err]').textContent = ex.message; }
      };
    });
  },
  'me-pass': () => openSheet(`<h2>החלפת סיסמה</h2><form data-f>
      <label class="field"><span>הסיסמה הנוכחית</span><input class="input" name="old" type="password" autocomplete="current-password" dir="ltr" required></label>
      <label class="field"><span>סיסמה חדשה (לפחות 8 תווים)</span><input class="input" name="password" type="password" autocomplete="new-password" dir="ltr" minlength="8" required></label>
      <p class="err" data-err></p><button class="btn block">שמירה</button></form>`, (s, close) => {
    s.querySelector('[data-f]').onsubmit = async (e) => {
      e.preventDefault();
      try { await api('/me/password', { old: e.target.old.value, password: e.target.password.value }); close(); toast('הסיסמה הוחלפה'); } catch (ex) { s.querySelector('[data-err]').textContent = ex.message; }
    };
  }),
  logout: async () => { await api('/logout', {}).catch(() => { }); S.me = null; S.list = null; S.vac = {}; S.friends = null; go('#/login'); },
  'adm-reset': async (el) => {
    if (!(await confirmSheet('סיסמה זמנית', `ליצור סיסמה זמנית ל${el.dataset.name}? הסיסמה הנוכחית שלו תפסיק לעבוד רק כשהוא ייכנס עם הזמנית.`, 'יצירה', false))) return;
    try {
      const r = await api('/admin/reset', { userId: el.dataset.id });
      openSheet(`<h2>סיסמה זמנית</h2><p class="muted" style="margin-top:6px">שולחים אותה ל${esc(el.dataset.name)}. היא עובדת פעם אחת, במשך ${r.minutes} דקות.</p><div class="paper-note" dir="ltr" style="text-align:center;font-size:24px;font-weight:700;letter-spacing:2px">${esc(r.temp)}</div><div class="vactions"><button class="btn" data-copy>${icon('copy')}העתקה</button></div>`, (s) => {
        s.querySelector('[data-copy]').onclick = async () => { try { await navigator.clipboard.writeText(r.temp); toast('הועתק'); } catch { } };
      });
    } catch (ex) { toast(ex.message); }
  },
};
function curVac() { return S.vac[location.hash.split('/')[2]]; }

document.addEventListener('click', async (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || !actions[el.dataset.act]) return;
  e.preventDefault();
  try { await actions[el.dataset.act](el, e); } catch (ex) { toast(ex.message); }
});

// ---------- forms ----------
document.addEventListener('submit', async (e) => {
  const f = e.target.closest('[data-form]');
  if (!f) return;
  e.preventDefault();
  const err = f.querySelector('[data-err]');
  if (err) err.textContent = '';
  const btn = f.querySelector('button[type=submit], .btn, .circle-btn');
  try {
    if (btn) btn.disabled = true;
    const kind = f.dataset.form;
    if (kind === 'login' || kind === 'signup') {
      const body = { email: f.email.value.trim(), password: f.password.value };
      if (kind === 'signup') {
        body.name = f.name.value.trim();
        if (!body.name) throw new Error('חסר שם');
        if (body.password.length < 8) throw new Error('הסיסמה צריכה לפחות 8 תווים');
      }
      const r = await api('/' + kind, body, { quiet401: true });
      S.me = r.user; S.mustChange = !!r.mustChange; S.list = null; S.vac = {};
      flyPlane();
      go(S.mustChange ? '#/newpass' : '#/');
    } else if (kind === 'newpass') {
      await api('/me/password', { password: f.password.value, afterReset: true });
      S.mustChange = false; toast('הסיסמה נשמרה'); go('#/');
    } else if (kind === 'note') {
      const d = curVac();
      await api(`/vacations/${d.vacation.id}/notes`, { text: f.text.value });
      await refreshVac(d.vacation.id); render();
    } else if (kind === 'friend') {
      S.friends = await api('/friends/request', { email: f.email.value });
      toast('אם יש משתמש עם המייל הזה, הבקשה נשלחה'); render();
    }
  } catch (ex) {
    if (err) err.textContent = ex.message; else toast(ex.message);
  } finally { if (btn) btn.disabled = false; }
});

let rz;
window.addEventListener('resize', () => {
  clearTimeout(rz);
  rz = setTimeout(() => { const b = $('[data-mount=bubbles]'); if (b) { b.querySelector('.trail')?.remove(); mounts.bubbles(b); } }, 200);
});
if ('serviceWorker' in navigator) navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister())).catch(() => { });
render();
