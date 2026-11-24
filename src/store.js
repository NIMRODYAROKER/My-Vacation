// My Vacation – all server logic. Runs inside one SQLite Durable Object.

const MAX_FILE = 10 * 1024 * 1024;
const ADMIN_EMAIL = 'nimrodyaroker@gmail.com';
const CHUNK = 1536 * 1024;
const SESSION_DAYS = 60;
const PBKDF2_ITER = 100000;
const CURRENCIES = ['ILS', 'USD', 'EUR', 'GBP', 'THB', 'JPY', 'CHF', 'TRY', 'AED', 'INR', 'VND', 'IDR', 'PHP', 'MXN', 'BRL', 'CZK', 'HUF', 'PLN', 'GEL', 'EGP', 'JOD', 'CAD', 'AUD', 'NZD', 'ZAR', 'KRW', 'CNY', 'SGD', 'MYR', 'LKR', 'NPR', 'MAD', 'RON', 'BGN', 'SEK', 'NOK', 'DKK', 'ISK', 'ARS', 'CLP', 'COP', 'PEN'];
const DEFAULT_TOPICS = [['טיסות', 'plane'], ['מגורים', 'home'], ['אטרקציות', 'star']];
const ICONS = ['plane', 'home', 'star', 'car', 'food', 'ticket', 'bag', 'heart', 'shield', 'map'];
const KINDS = ['file', 'image', 'email', 'message'];
const COLORS = ['#ff8f7a', '#f2a65a', '#e07aa8', '#a77bd1', '#5e8fd6', '#4fb3a9', '#d9a441', '#c76a6a'];

class HttpError extends Error {
  constructor(status, msg) { super(msg); this.status = status; }
}
const fail = (status, msg) => { throw new HttpError(status, msg); };

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
  });
}

const enc = new TextEncoder();
function b64url(bytes) {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function randomId(n = 12) { return b64url(crypto.getRandomValues(new Uint8Array(n))); }
async function sha256(text) {
  return b64url(new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(text))));
}
async function pbkdf2(password, saltB64, iter) {
  const salt = Uint8Array.from(atob(saltB64.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((saltB64.length + 3) % 4)), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iter }, key, 256);
  return b64url(new Uint8Array(bits));
}
async function hashPassword(password) {
  const salt = b64url(crypto.getRandomValues(new Uint8Array(16)));
  return `pbkdf2$${PBKDF2_ITER}$${salt}$${await pbkdf2(password, salt, PBKDF2_ITER)}`;
}
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
async function checkPassword(password, stored) {
  if (!stored) return false;
  const [, iter, salt, hash] = stored.split('$');
  return safeEqual(await pbkdf2(password, salt, Number(iter)), hash);
}

// ---- input validation ----
function str(v, { min = 0, max = 200, name = 'שדה' } = {}) {
  if (v === undefined || v === null) v = '';
  if (typeof v !== 'string') fail(400, `${name} לא תקין`);
  v = v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim();
  if (v.length < min) fail(400, min === 1 ? `חסר ${name}` : `${name} קצר מדי`);
  if (v.length > max) fail(400, `${name} ארוך מדי`);
  return v;
}
function bool(v) { return v === true || v === 1 || v === '1' || v === 'true' ? 1 : 0; }
function isoDate(v, name) {
  if (v === '' || v == null) return null;
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v) || isNaN(Date.parse(v))) fail(400, `${name} לא תקין`);
  return v;
}
function email(v) {
  v = str(v, { min: 3, max: 120, name: 'מייל' }).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) fail(400, 'כתובת המייל לא תקינה');
  return v;
}
function idParam(v) {
  if (typeof v !== 'string' || !/^[A-Za-z0-9_-]{6,40}$/.test(v)) fail(400, 'מזהה לא תקין');
  return v;
}
function money(v) {
  const n = typeof v === 'number' ? v : Number(String(v ?? '').replace(/,/g, ''));
  if (!isFinite(n) || n < 0 || n > 100000000) fail(400, 'סכום לא תקין');
  return Math.round(n * 100) / 100;
}
function currency(v) {
  if (!CURRENCIES.includes(v)) fail(400, 'מטבע לא נתמך');
  return v;
}
function countries(v) {
  if (!Array.isArray(v)) v = [];
  if (v.length > 15) fail(400, 'יותר מדי מדינות');
  return v.map(c => str(c, { min: 1, max: 40, name: 'מדינה' }));
}

function sniffType(bytes) {
  const h = (i) => bytes[i];
  const ascii = (s, e) => String.fromCharCode(...bytes.slice(s, e));
  if (h(0) === 0xff && h(1) === 0xd8 && h(2) === 0xff) return 'image/jpeg';
  if (h(0) === 0x89 && ascii(1, 4) === 'PNG') return 'image/png';
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'image/webp';
  if (ascii(0, 4) === 'GIF8') return 'image/gif';
  if (ascii(0, 5) === '%PDF-') return 'application/pdf';
  if (ascii(4, 8) === 'ftyp' && ['heic', 'heix', 'mif1', 'msf1', 'hevc'].includes(ascii(8, 12))) return 'image/heic';
  return null;
}

export class Store {
  constructor(sql, fetcher = fetch) {
    this.sql = sql;
    this.fetcher = fetcher;
    this.migrate();
  }
  q(s, ...a) { return this.sql.exec(s, ...a).toArray(); }
  one(s, ...a) { return this.q(s, ...a)[0]; }
  run(s, ...a) { this.sql.exec(s, ...a); }

  migrate() {
    this.run(`CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT)`);
    const ver = Number(this.one(`SELECT v FROM meta WHERE k='schema'`)?.v || 0);
    if (ver < 1) {
      const stmts = [
        `CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL, pass TEXT NOT NULL, color TEXT, is_admin INTEGER DEFAULT 0, temp_pass TEXT, temp_exp INTEGER, created INTEGER)`,
        `CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires INTEGER NOT NULL, reset_ok INTEGER DEFAULT 0)`,
        `CREATE TABLE IF NOT EXISTS friends (id TEXT PRIMARY KEY, from_id TEXT NOT NULL, to_id TEXT NOT NULL, status TEXT NOT NULL, created INTEGER)`,
        `CREATE TABLE IF NOT EXISTS vacations (id TEXT PRIMARY KEY, owner_id TEXT NOT NULL, name TEXT NOT NULL, countries TEXT, start TEXT, end TEXT, scene INTEGER DEFAULT 0, created INTEGER)`,
        `CREATE TABLE IF NOT EXISTS members (vacation_id TEXT NOT NULL, user_id TEXT NOT NULL, status TEXT NOT NULL, invited_by TEXT, created INTEGER, PRIMARY KEY (vacation_id, user_id))`,
        `CREATE TABLE IF NOT EXISTS topics (id TEXT PRIMARY KEY, vacation_id TEXT NOT NULL, name TEXT NOT NULL, icon TEXT, sort INTEGER DEFAULT 0)`,
        `CREATE TABLE IF NOT EXISTS items (id TEXT PRIMARY KEY, vacation_id TEXT NOT NULL, topic_id TEXT NOT NULL, user_id TEXT NOT NULL, kind TEXT NOT NULL, title TEXT, body TEXT, file_name TEXT, mime TEXT, size INTEGER, shared INTEGER DEFAULT 0, created INTEGER)`,
        `CREATE TABLE IF NOT EXISTS chunks (item_id TEXT NOT NULL, idx INTEGER NOT NULL, data BLOB, PRIMARY KEY (item_id, idx))`,
        `CREATE TABLE IF NOT EXISTS costs (id TEXT PRIMARY KEY, vacation_id TEXT NOT NULL, topic_id TEXT NOT NULL, user_id TEXT NOT NULL, label TEXT, amount REAL NOT NULL, currency TEXT NOT NULL, shared INTEGER DEFAULT 0, created INTEGER)`,
        `CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY, vacation_id TEXT NOT NULL, user_id TEXT NOT NULL, text TEXT NOT NULL, done INTEGER DEFAULT 0, created INTEGER)`,
        `CREATE TABLE IF NOT EXISTS hits (k TEXT PRIMARY KEY, n INTEGER, since INTEGER)`,
        `CREATE TABLE IF NOT EXISTS alerts (id TEXT PRIMARY KEY, kind TEXT, detail TEXT, ip TEXT, created INTEGER)`,
        `CREATE INDEX IF NOT EXISTS i_members_user ON members(user_id)`,
        `CREATE INDEX IF NOT EXISTS i_items_vac ON items(vacation_id)`,
        `CREATE INDEX IF NOT EXISTS i_costs_vac ON costs(vacation_id)`,
        `CREATE INDEX IF NOT EXISTS i_notes_vac ON notes(vacation_id, user_id)`,
        `CREATE INDEX IF NOT EXISTS i_topics_vac ON topics(vacation_id)`,
        `CREATE INDEX IF NOT EXISTS i_sessions_user ON sessions(user_id)`,
      ];
      for (const s of stmts) this.run(s);
      this.run(`INSERT OR REPLACE INTO meta (k, v) VALUES ('schema', '1')`);
    }
  }

  // ---- rate limiting & alerts ----
  limit(key, max, windowSec) {
    const now = Date.now();
    const row = this.one(`SELECT n, since FROM hits WHERE k=?`, key);
    if (!row || now - row.since > windowSec * 1000) {
      this.run(`INSERT OR REPLACE INTO hits (k, n, since) VALUES (?, 1, ?)`, key, now);
      return true;
    }
    if (row.n >= max) return false;
    this.run(`UPDATE hits SET n = n + 1 WHERE k=?`, key);
    return true;
  }
  mustLimit(key, max, windowSec, ip) {
    if (!this.limit(key, max, windowSec)) {
      this.alert('rate-limit', key, ip);
      fail(429, 'יותר מדי ניסיונות. נסה שוב בעוד כמה דקות');
    }
  }
  alert(kind, detail, ip) {
    const recent = this.one(`SELECT id FROM alerts WHERE kind=? AND detail=? AND created > ?`, kind, String(detail).slice(0, 200), Date.now() - 600000);
    if (recent) return;
    this.run(`INSERT INTO alerts (id, kind, detail, ip, created) VALUES (?, ?, ?, ?, ?)`, randomId(), kind, String(detail).slice(0, 200), ip || '', Date.now());
    this.run(`DELETE FROM alerts WHERE id IN (SELECT id FROM alerts ORDER BY created DESC LIMIT -1 OFFSET 500)`);
  }

  // ---- sessions ----
  async newSession(userId, resetOk = false) {
    const token = randomId(32);
    this.run(`INSERT INTO sessions (token, user_id, expires, reset_ok) VALUES (?, ?, ?, ?)`, await sha256(token), userId, Date.now() + SESSION_DAYS * 86400000, resetOk ? Date.now() + 15 * 60000 : 0);
    if (Math.random() < 0.05) this.run(`DELETE FROM sessions WHERE expires < ?`, Date.now());
    return token;
  }
  cookie(token, maxAge) {
    return `mv_s=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
  }
  async currentUser(request) {
    const m = (request.headers.get('cookie') || '').match(/(?:^|;\s*)mv_s=([A-Za-z0-9_-]{20,80})/);
    if (!m) return null;
    const tok = await sha256(m[1]);
    const s = this.one(`SELECT user_id, expires, reset_ok FROM sessions WHERE token=?`, tok);
    if (!s || s.expires < Date.now()) return null;
    const u = this.one(`SELECT id, email, name, color, is_admin FROM users WHERE id=?`, s.user_id);
    return u ? { ...u, session: tok, resetOk: s.reset_ok > Date.now() } : null;
  }

  // ---- membership helpers ----
  memberStatus(vacId, userId) {
    return this.one(`SELECT status FROM members WHERE vacation_id=? AND user_id=?`, vacId, userId)?.status || null;
  }
  requireMember(vacId, user, ip) {
    const v = this.one(`SELECT * FROM vacations WHERE id=?`, vacId);
    if (!v || this.memberStatus(vacId, user.id) !== 'joined') {
      this.alert('access-denied', `vacation ${vacId} by ${user.email}`, ip);
      fail(404, 'החופשה לא נמצאה');
    }
    return v;
  }
  areFriends(a, b) {
    return !!this.one(`SELECT id FROM friends WHERE status='accepted' AND ((from_id=? AND to_id=?) OR (from_id=? AND to_id=?))`, a, b, b, a);
  }

  // ---- exchange rates (server side only) ----
  async rates() {
    const row = this.one(`SELECT v FROM meta WHERE k='rates'`);
    let cached = row ? JSON.parse(row.v) : null;
    if (!cached || Date.now() - cached.at > 12 * 3600000) {
      try {
        const r = await this.fetcher('https://open.er-api.com/v6/latest/ILS', { cf: { cacheTtl: 3600 } });
        const d = await r.json();
        if (d && d.result === 'success' && d.rates && d.rates.USD) {
          const perUnit = {};
          for (const c of CURRENCIES) if (d.rates[c]) perUnit[c] = 1 / d.rates[c];
          perUnit.ILS = 1;
          cached = { at: Date.now(), perUnit };
          this.run(`INSERT OR REPLACE INTO meta (k, v) VALUES ('rates', ?)`, JSON.stringify(cached));
        }
      } catch (e) { /* keep last known rates */ }
    }
    return cached ? cached.perUnit : { ILS: 1 };
  }
  toIls(rates, amount, cur) {
    const r = rates[cur];
    return r ? Math.round(amount * r * 100) / 100 : null;
  }

  // ---- main router ----
  async handle(request) {
    const url = new URL(request.url);
    const ip = request.headers.get('x-real-ip') || '';
    const method = request.method;
    try {
      if (method !== 'GET' && method !== 'HEAD') {
        const origin = request.headers.get('origin');
        if (origin && origin !== url.origin) { this.alert('bad-origin', origin, ip); fail(403, 'בקשה נחסמה'); }
        if (request.headers.get('x-mv') !== '1') fail(403, 'בקשה נחסמה');
        this.mustLimit(`ip:${ip}`, 600, 60, ip);
      }
      const p = url.pathname.replace(/\/+$/, '');
      const parts = p.split('/').slice(2); // after /api
      const body = method === 'POST' && (request.headers.get('content-type') || '').includes('application/json')
        ? await request.json().catch(() => fail(400, 'בקשה לא תקינה')) : null;

      // public routes
      if (method === 'POST' && p === '/api/signup') return await this.signup(body || {}, ip);
      if (method === 'POST' && p === '/api/login') return await this.login(body || {}, ip);
      if (method === 'POST' && p === '/api/logout') return await this.logout(request);

      const user = await this.currentUser(request);
      if (!user) fail(401, 'צריך להתחבר');
      if (method !== 'GET') this.mustLimit(`u:${user.id}`, 300, 60, ip);
      const b = body || {};

      if (method === 'GET' && p === '/api/me') return json({ user: this.publicMe(user) });
      if (method === 'POST' && p === '/api/me') return this.updateMe(user, b);
      if (method === 'POST' && p === '/api/me/password') return await this.changePassword(user, b, ip);

      if (method === 'GET' && p === '/api/friends') return json(this.friendsList(user));
      if (method === 'POST' && p === '/api/friends/request') return this.friendRequest(user, b, ip);
      if (method === 'POST' && p === '/api/friends/respond') return this.friendRespond(user, b);
      if (method === 'POST' && p === '/api/friends/remove') return this.friendRemove(user, b);

      if (method === 'GET' && p === '/api/vacations') return json(await this.vacationList(user));
      if (method === 'POST' && p === '/api/vacations') return this.createVacation(user, b, ip);

      if (parts[0] === 'vacations' && parts[1]) {
        const vid = idParam(parts[1]);
        const act = parts[2] || '';
        if (act === 'respond' && method === 'POST') return this.respondInvite(user, vid, b);
        const v = this.requireMember(vid, user, ip);
        if (method === 'GET' && !act) return json(await this.vacationDetail(user, v));
        if (method === 'POST') {
          if (act === 'update') return this.updateVacation(user, v, b);
          if (act === 'delete') return this.deleteVacation(user, v);
          if (act === 'leave') return this.leaveVacation(user, v);
          if (act === 'invite') return this.invite(user, v, b, ip);
          if (act === 'topics') return this.addTopic(user, v, b);
          if (act === 'items') return await this.addItem(user, v, request, ip, body);
          if (act === 'costs') return this.addCost(user, v, b);
          if (act === 'notes') return this.addNote(user, v, b);
        }
      }
      if (['topics', 'items', 'costs', 'notes'].includes(parts[0]) && parts[1]) {
        const id = idParam(parts[1]);
        const act = parts[2] || '';
        if (parts[0] === 'items' && act === 'file' && method === 'GET') return this.getFile(user, id, ip, url.searchParams.get('dl') === '1');
        if (method === 'POST') {
          if (parts[0] === 'topics') return act === 'delete' ? this.deleteTopic(user, id, ip) : this.updateTopic(user, id, b, ip);
          if (parts[0] === 'items') return act === 'delete' ? this.deleteItem(user, id, ip) : this.updateItem(user, id, b, ip);
          if (parts[0] === 'costs') return act === 'delete' ? this.deleteCost(user, id, ip) : this.updateCost(user, id, b, ip);
          if (parts[0] === 'notes') return act === 'delete' ? this.deleteNote(user, id, ip) : this.updateNote(user, id, b, ip);
        }
      }

      if (p.startsWith('/api/admin')) {
        if (!user.is_admin) { this.alert('admin-denied', user.email, ip); fail(404, 'לא נמצא'); }
        if (method === 'GET' && p === '/api/admin/users') return json({ users: this.q(`SELECT id, name, email, is_admin, created FROM users ORDER BY created`) });
        if (method === 'GET' && p === '/api/admin/alerts') return json({ alerts: this.q(`SELECT kind, detail, ip, created FROM alerts ORDER BY created DESC LIMIT 100`) });
        if (method === 'POST' && p === '/api/admin/reset') return await this.adminReset(user, b);
      }
      fail(404, 'לא נמצא');
    } catch (e) {
      if (e instanceof HttpError) return json({ error: e.message }, e.status);
      console.error(e);
      return json({ error: 'משהו השתבש. נסה שוב' }, 500);
    }
  }

  publicMe(u) { return { id: u.id, name: u.name, email: u.email, color: u.color, isAdmin: !!u.is_admin }; }

  // ---- auth ----
  async signup(b, ip) {
    this.mustLimit(`signup:${ip}`, 6, 3600, ip);
    const name = str(b.name, { min: 1, max: 40, name: 'שם' });
    const mail = email(b.email);
    const pass = str(b.password, { min: 8, max: 200, name: 'סיסמה' });
    if (this.one(`SELECT id FROM users WHERE email=?`, mail)) fail(409, 'כבר יש חשבון עם המייל הזה');
    const id = randomId();
    const first = mail === ADMIN_EMAIL;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.run(`INSERT INTO users (id, email, name, pass, color, is_admin, created) VALUES (?, ?, ?, ?, ?, ?, ?)`, id, mail, name, await hashPassword(pass), color, first ? 1 : 0, Date.now());
    const token = await this.newSession(id);
    return json({ user: this.publicMe({ id, email: mail, name, color, is_admin: first }) }, 200, { 'set-cookie': this.cookie(token, SESSION_DAYS * 86400) });
  }
  async login(b, ip) {
    this.mustLimit(`login-ip:${ip}`, 30, 900, ip);
    const mail = email(b.email);
    const pass = str(b.password, { min: 1, max: 200, name: 'סיסמה' });
    this.mustLimit(`login-mail:${mail}`, 10, 900, ip);
    const u = this.one(`SELECT * FROM users WHERE email=?`, mail);
    let mustChange = false;
    let ok = false;
    if (u) {
      ok = await checkPassword(pass, u.pass);
      if (!ok && u.temp_pass && u.temp_exp > Date.now() && await checkPassword(pass, u.temp_pass)) {
        ok = true; mustChange = true;
        this.run(`UPDATE users SET temp_pass=NULL, temp_exp=NULL WHERE id=?`, u.id);
      }
    } else {
      await hashPassword(pass); // keep timing similar
    }
    if (!ok) {
      const fails = this.one(`SELECT n FROM hits WHERE k=?`, `login-mail:${mail}`)?.n || 0;
      if (fails >= 5) this.alert('login-failures', mail, ip);
      fail(401, 'המייל או הסיסמה לא נכונים');
    }
    this.run(`DELETE FROM hits WHERE k=?`, `login-mail:${mail}`);
    const token = await this.newSession(u.id, mustChange);
    return json({ user: this.publicMe(u), mustChange }, 200, { 'set-cookie': this.cookie(token, SESSION_DAYS * 86400) });
  }
  async logout(request) {
    const m = (request.headers.get('cookie') || '').match(/(?:^|;\s*)mv_s=([A-Za-z0-9_-]{20,80})/);
    if (m) this.run(`DELETE FROM sessions WHERE token=?`, await sha256(m[1]));
    return json({ ok: true }, 200, { 'set-cookie': this.cookie('', 0) });
  }
  updateMe(user, b) {
    const name = str(b.name, { min: 1, max: 40, name: 'שם' });
    const color = COLORS.includes(b.color) ? b.color : user.color;
    this.run(`UPDATE users SET name=?, color=? WHERE id=?`, name, color, user.id);
    return json({ user: this.publicMe({ ...user, name, color }) });
  }
  async changePassword(user, b, ip) {
    this.mustLimit(`pw:${user.id}`, 8, 900, ip);
    const next = str(b.password, { min: 8, max: 200, name: 'סיסמה חדשה' });
    const u = this.one(`SELECT pass FROM users WHERE id=?`, user.id);
    if (!b.afterReset) {
      if (!(await checkPassword(str(b.old, { max: 200, name: 'סיסמה' }), u.pass))) fail(401, 'הסיסמה הנוכחית לא נכונה');
    } else {
      // allowed only in the session opened by a temporary password, within 15 minutes
      if (!user.resetOk) fail(401, 'צריך להזין את הסיסמה הנוכחית');
    }
    this.run(`UPDATE users SET pass=?, temp_pass=NULL, temp_exp=NULL WHERE id=?`, await hashPassword(next), user.id);
    this.run(`DELETE FROM sessions WHERE user_id=? AND token<>?`, user.id, user.session);
    this.run(`UPDATE sessions SET reset_ok=0 WHERE token=?`, user.session);
    return json({ ok: true });
  }
  async adminReset(admin, b) {
    const id = idParam(b.userId);
    const u = this.one(`SELECT id FROM users WHERE id=?`, id);
    if (!u) fail(404, 'משתמש לא נמצא');
    const temp = randomId(6).replace(/[-_]/g, 'x');
    this.run(`UPDATE users SET temp_pass=?, temp_exp=? WHERE id=?`, await hashPassword(temp), Date.now() + 15 * 60000, id);
    this.run(`DELETE FROM sessions WHERE user_id=?`, id);
    this.alert('admin-reset', `${admin.email} reset ${id}`, '');
    return json({ temp, minutes: 15 });
  }

  // ---- friends ----
  friendsList(user) {
    const rows = this.q(`SELECT f.id, f.from_id, f.to_id, f.status, u.id AS uid, u.name, u.email, u.color
      FROM friends f JOIN users u ON u.id = CASE WHEN f.from_id=? THEN f.to_id ELSE f.from_id END
      WHERE f.from_id=? OR f.to_id=? ORDER BY u.name`, user.id, user.id, user.id);
    const out = { friends: [], incoming: [], outgoing: [] };
    for (const r of rows) {
      const person = { id: r.uid, name: r.name, email: r.email, color: r.color, requestId: r.id };
      if (r.status === 'accepted') out.friends.push(person);
      else if (r.to_id === user.id) out.incoming.push(person);
      else out.outgoing.push(person);
    }
    return out;
  }
  friendRequest(user, b, ip) {
    this.mustLimit(`fr:${user.id}`, 30, 3600, ip);
    const mail = email(b.email);
    const other = this.one(`SELECT id FROM users WHERE email=?`, mail);
    // same answer whether or not the user exists, so emails can't be probed
    if (!other || other.id === user.id) return json({ ok: true, ...this.friendsList(user) });
    const existing = this.one(`SELECT * FROM friends WHERE (from_id=? AND to_id=?) OR (from_id=? AND to_id=?)`, user.id, other.id, other.id, user.id);
    if (existing) {
      if (existing.status === 'pending' && existing.to_id === user.id) this.run(`UPDATE friends SET status='accepted' WHERE id=?`, existing.id);
    } else {
      this.run(`INSERT INTO friends (id, from_id, to_id, status, created) VALUES (?, ?, ?, 'pending', ?)`, randomId(), user.id, other.id, Date.now());
    }
    return json({ ok: true, ...this.friendsList(user) });
  }
  friendRespond(user, b) {
    const id = idParam(b.requestId);
    const r = this.one(`SELECT * FROM friends WHERE id=? AND to_id=? AND status='pending'`, id, user.id);
    if (!r) fail(404, 'הבקשה לא נמצאה');
    if (b.accept) this.run(`UPDATE friends SET status='accepted' WHERE id=?`, id);
    else this.run(`DELETE FROM friends WHERE id=?`, id);
    return json(this.friendsList(user));
  }
  friendRemove(user, b) {
    const id = idParam(b.requestId);
    this.run(`DELETE FROM friends WHERE id=? AND (from_id=? OR to_id=?)`, id, user.id, user.id);
    return json(this.friendsList(user));
  }

  // ---- vacations ----
  async vacationList(user) {
    const rates = await this.rates();
    const rows = this.q(`SELECT v.*, m.status FROM vacations v JOIN members m ON m.vacation_id=v.id WHERE m.user_id=? ORDER BY COALESCE(v.start, '9999') ASC`, user.id);
    const list = [], invites = [];
    for (const v of rows) {
      const memberCount = this.one(`SELECT COUNT(*) AS n FROM members WHERE vacation_id=? AND status='joined'`, v.id).n;
      const invitedCount = this.one(`SELECT COUNT(*) AS n FROM members WHERE vacation_id=? AND status='invited'`, v.id).n;
      const base = { id: v.id, name: v.name, countries: JSON.parse(v.countries || '[]'), start: v.start, end: v.end, scene: v.scene, group: memberCount + invitedCount > 1, members: memberCount };
      if (v.status === 'invited') {
        const by = this.one(`SELECT name FROM users WHERE id=(SELECT invited_by FROM members WHERE vacation_id=? AND user_id=?)`, v.id, user.id);
        invites.push({ ...base, invitedBy: by?.name || '' });
        continue;
      }
      const vis = `vacation_id=? AND (user_id=? OR shared=1)`;
      const items = this.one(`SELECT COUNT(*) AS n FROM items WHERE ${vis}`, v.id, user.id).n;
      const costs = this.q(`SELECT amount, currency FROM costs WHERE ${vis}`, v.id, user.id);
      const total = costs.reduce((s, c) => s + (this.toIls(rates, c.amount, c.currency) || 0), 0);
      const notes = this.one(`SELECT COUNT(*) AS n FROM notes WHERE vacation_id=? AND user_id=? AND done=0`, v.id, user.id).n;
      list.push({ ...base, items, total: Math.round(total), notes, owner: v.owner_id === user.id });
    }
    return { vacations: list, invites };
  }
  createVacation(user, b, ip) {
    this.mustLimit(`newvac:${user.id}`, 30, 3600, ip);
    const name = str(b.name, { min: 1, max: 60, name: 'שם החופשה' });
    const c = countries(b.countries);
    const start = isoDate(b.start, 'תאריך יציאה');
    const end = isoDate(b.end, 'תאריך חזרה');
    if (start && end && end < start) fail(400, 'תאריך החזרה לפני תאריך היציאה');
    const id = randomId();
    const now = Date.now();
    this.run(`INSERT INTO vacations (id, owner_id, name, countries, start, end, scene, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, id, user.id, name, JSON.stringify(c), start, end, Math.floor(Math.random() * 3), now);
    this.run(`INSERT INTO members (vacation_id, user_id, status, invited_by, created) VALUES (?, ?, 'joined', ?, ?)`, id, user.id, user.id, now);
    DEFAULT_TOPICS.forEach(([n, icon], i) => this.run(`INSERT INTO topics (id, vacation_id, name, icon, sort) VALUES (?, ?, ?, ?, ?)`, randomId(), id, n, icon, i));
    this.addInvites(user, id, b.friends);
    return json({ id });
  }
  addInvites(user, vid, list) {
    if (!Array.isArray(list)) return;
    if (list.length > 30) fail(400, 'יותר מדי חברים');
    for (const raw of list) {
      const fid = idParam(raw);
      if (!this.areFriends(user.id, fid)) fail(403, 'אפשר להזמין רק חברים');
      this.run(`INSERT OR IGNORE INTO members (vacation_id, user_id, status, invited_by, created) VALUES (?, ?, 'invited', ?, ?)`, vid, fid, user.id, Date.now());
    }
  }
  invite(user, v, b, ip) {
    this.mustLimit(`inv:${user.id}`, 60, 3600, ip);
    this.addInvites(user, v.id, b.friends);
    return json({ ok: true });
  }
  respondInvite(user, vid, b) {
    const st = this.memberStatus(vid, user.id);
    if (st !== 'invited') fail(404, 'ההזמנה לא נמצאה');
    if (b.accept) this.run(`UPDATE members SET status='joined' WHERE vacation_id=? AND user_id=?`, vid, user.id);
    else this.run(`DELETE FROM members WHERE vacation_id=? AND user_id=?`, vid, user.id);
    return json({ ok: true });
  }
  async vacationDetail(user, v) {
    const rates = await this.rates();
    const members = this.q(`SELECT u.id, u.name, u.color, m.status FROM members m JOIN users u ON u.id=m.user_id WHERE m.vacation_id=? ORDER BY m.created`, v.id);
    const names = Object.fromEntries(members.map(m => [m.id, m.name]));
    const topics = this.q(`SELECT id, name, icon, sort FROM topics WHERE vacation_id=? ORDER BY sort, rowid`, v.id);
    const vis = `vacation_id=? AND (user_id=? OR shared=1)`;
    const items = this.q(`SELECT id, topic_id, user_id, kind, title, body, file_name, mime, size, shared, created FROM items WHERE ${vis} ORDER BY created DESC`, v.id, user.id)
      .map(i => ({ id: i.id, topicId: i.topic_id, mine: i.user_id === user.id, by: names[i.user_id] || '', kind: i.kind, title: i.title, body: i.body, fileName: i.file_name, mime: i.mime, size: i.size, shared: !!i.shared, created: i.created }));
    const costs = this.q(`SELECT id, topic_id, user_id, label, amount, currency, shared, created FROM costs WHERE ${vis} ORDER BY created`, v.id, user.id)
      .map(c => ({ id: c.id, topicId: c.topic_id, mine: c.user_id === user.id, by: names[c.user_id] || '', label: c.label, amount: c.amount, currency: c.currency, ils: this.toIls(rates, c.amount, c.currency), shared: !!c.shared }));
    const notes = this.q(`SELECT id, text, done, created FROM notes WHERE vacation_id=? AND user_id=? ORDER BY done, created`, v.id, user.id).map(n => ({ ...n, done: !!n.done }));
    const byTopic = topics.map(t => {
      const list = costs.filter(c => c.topicId === t.id);
      return { topicId: t.id, total: Math.round(list.reduce((s, c) => s + (c.ils || 0), 0)), mine: Math.round(list.filter(c => c.mine).reduce((s, c) => s + (c.ils || 0), 0)) };
    });
    const missingRate = costs.some(c => c.ils === null);
    return {
      vacation: { id: v.id, name: v.name, countries: JSON.parse(v.countries || '[]'), start: v.start, end: v.end, scene: v.scene, owner: v.owner_id === user.id, group: members.length > 1 },
      members, topics, items, costs, notes,
      totals: { all: byTopic.reduce((s, t) => s + t.total, 0), mine: byTopic.reduce((s, t) => s + t.mine, 0), byTopic, missingRate },
      currencies: CURRENCIES,
    };
  }
  updateVacation(user, v, b) {
    if (v.owner_id !== user.id) fail(403, 'רק מי שפתח את החופשה יכול לשנות אותה');
    const name = str(b.name, { min: 1, max: 60, name: 'שם החופשה' });
    const c = countries(b.countries);
    const start = isoDate(b.start, 'תאריך יציאה');
    const end = isoDate(b.end, 'תאריך חזרה');
    if (start && end && end < start) fail(400, 'תאריך החזרה לפני תאריך היציאה');
    this.run(`UPDATE vacations SET name=?, countries=?, start=?, end=? WHERE id=?`, name, JSON.stringify(c), start, end, v.id);
    return json({ ok: true });
  }
  deleteVacation(user, v) {
    if (v.owner_id !== user.id) fail(403, 'רק מי שפתח את החופשה יכול למחוק אותה');
    this.run(`DELETE FROM chunks WHERE item_id IN (SELECT id FROM items WHERE vacation_id=?)`, v.id);
    for (const t of ['items', 'costs', 'notes', 'topics', 'members']) this.run(`DELETE FROM ${t} WHERE vacation_id=?`, v.id);
    this.run(`DELETE FROM vacations WHERE id=?`, v.id);
    return json({ ok: true });
  }
  leaveVacation(user, v) {
    if (v.owner_id === user.id) fail(400, 'מי שפתח את החופשה לא יכול לעזוב אותה');
    this.run(`DELETE FROM chunks WHERE item_id IN (SELECT id FROM items WHERE vacation_id=? AND user_id=?)`, v.id, user.id);
    for (const t of ['items', 'costs', 'notes']) this.run(`DELETE FROM ${t} WHERE vacation_id=? AND user_id=?`, v.id, user.id);
    this.run(`DELETE FROM members WHERE vacation_id=? AND user_id=?`, v.id, user.id);
    return json({ ok: true });
  }

  // ---- topics ----
  topicOf(vid, tid) {
    const t = this.one(`SELECT * FROM topics WHERE id=? AND vacation_id=?`, idParam(tid), vid);
    if (!t) fail(400, 'הנושא לא נמצא');
    return t;
  }
  addTopic(user, v, b) {
    const name = str(b.name, { min: 1, max: 30, name: 'שם הנושא' });
    if (this.one(`SELECT COUNT(*) AS n FROM topics WHERE vacation_id=?`, v.id).n >= 20) fail(400, 'יותר מדי נושאים');
    const icon = ICONS.includes(b.icon) ? b.icon : 'map';
    const id = randomId();
    const sort = (this.one(`SELECT MAX(sort) AS s FROM topics WHERE vacation_id=?`, v.id).s || 0) + 1;
    this.run(`INSERT INTO topics (id, vacation_id, name, icon, sort) VALUES (?, ?, ?, ?, ?)`, id, v.id, name, icon, sort);
    return json({ id });
  }
  topicForMember(user, id, ip) {
    const t = this.one(`SELECT * FROM topics WHERE id=?`, id);
    if (!t) fail(404, 'לא נמצא');
    this.requireMember(t.vacation_id, user, ip);
    return t;
  }
  updateTopic(user, id, b, ip) {
    const t = this.topicForMember(user, id, ip);
    const name = str(b.name, { min: 1, max: 30, name: 'שם הנושא' });
    const icon = ICONS.includes(b.icon) ? b.icon : t.icon;
    this.run(`UPDATE topics SET name=?, icon=? WHERE id=?`, name, icon, id);
    return json({ ok: true });
  }
  deleteTopic(user, id, ip) {
    const t = this.topicForMember(user, id, ip);
    const others = this.one(`SELECT (SELECT COUNT(*) FROM items WHERE topic_id=? AND user_id<>?) + (SELECT COUNT(*) FROM costs WHERE topic_id=? AND user_id<>?) AS n`, id, user.id, id, user.id).n;
    if (others > 0) fail(400, 'יש בנושא דברים של חברים אחרים, אי אפשר למחוק אותו');
    this.run(`DELETE FROM chunks WHERE item_id IN (SELECT id FROM items WHERE topic_id=?)`, id);
    this.run(`DELETE FROM items WHERE topic_id=?`, id);
    this.run(`DELETE FROM costs WHERE topic_id=?`, id);
    this.run(`DELETE FROM topics WHERE id=?`, t.id);
    return json({ ok: true });
  }

  // ---- items (files, photos, emails, messages) ----
  async addItem(user, v, request, ip, jsonBody) {
    this.mustLimit(`up:${user.id}`, 120, 3600, ip);
    const ct = request.headers.get('content-type') || '';
    let f;
    if (ct.includes('multipart/form-data')) {
      const len = Number(request.headers.get('content-length') || 0);
      if (len > MAX_FILE + 64 * 1024) fail(413, 'הקובץ גדול מדי (עד 10MB)');
      const fd = await request.formData();
      f = Object.fromEntries([...fd.entries()]);
    } else {
      f = jsonBody || fail(400, 'בקשה לא תקינה');
    }
    const topic = this.topicOf(v.id, f.topicId);
    const kind = KINDS.includes(f.kind) ? f.kind : fail(400, 'סוג לא תקין');
    const title = str(f.title, { max: 120, name: 'כותרת' });
    const shared = bool(f.shared);
    const id = randomId();
    let body = null, fileName = null, mime = null, size = null;
    if (kind === 'email' || kind === 'message') {
      body = str(f.body, { min: 1, max: 20000, name: 'טקסט' });
    } else {
      const file = f.file;
      if (!file || typeof file === 'string' || typeof file.arrayBuffer !== 'function') fail(400, 'לא נבחר קובץ');
      if (file.size > MAX_FILE) fail(413, 'הקובץ גדול מדי (עד 10MB)');
      if (file.size < 8) fail(400, 'הקובץ ריק');
      const bytes = new Uint8Array(await file.arrayBuffer());
      mime = sniffType(bytes);
      if (!mime) fail(415, 'אפשר להעלות רק תמונות או PDF');
      fileName = str((file.name || 'file').replace(/[\\/"<>]/g, ''), { max: 120, name: 'שם קובץ' }) || 'file';
      size = bytes.length;
      for (let i = 0, idx = 0; i < bytes.length; i += CHUNK, idx++) {
        const part = bytes.slice(i, i + CHUNK);
        this.run(`INSERT INTO chunks (item_id, idx, data) VALUES (?, ?, ?)`, id, idx, part.buffer);
      }
    }
    this.run(`INSERT INTO items (id, vacation_id, topic_id, user_id, kind, title, body, file_name, mime, size, shared, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id, v.id, topic.id, user.id, kind, title, body, fileName, mime, size, shared, Date.now());
    return json({ id });
  }
  ownItem(table, user, id, ip) {
    const r = this.one(`SELECT * FROM ${table} WHERE id=?`, id);
    if (!r || r.user_id !== user.id || this.memberStatus(r.vacation_id, user.id) !== 'joined') {
      this.alert('access-denied', `${table} ${id} by ${user.email}`, ip);
      fail(404, 'לא נמצא');
    }
    return r;
  }
  updateItem(user, id, b, ip) {
    const it = this.ownItem('items', user, id, ip);
    const title = b.title !== undefined ? str(b.title, { max: 120, name: 'כותרת' }) : it.title;
    const shared = b.shared !== undefined ? bool(b.shared) : it.shared;
    const topic = b.topicId ? this.topicOf(it.vacation_id, b.topicId).id : it.topic_id;
    const body = (it.kind === 'email' || it.kind === 'message') && b.body !== undefined ? str(b.body, { min: 1, max: 20000, name: 'טקסט' }) : it.body;
    this.run(`UPDATE items SET title=?, shared=?, topic_id=?, body=? WHERE id=?`, title, shared, topic, body, id);
    return json({ ok: true });
  }
  deleteItem(user, id, ip) {
    this.ownItem('items', user, id, ip);
    this.run(`DELETE FROM chunks WHERE item_id=?`, id);
    this.run(`DELETE FROM items WHERE id=?`, id);
    return json({ ok: true });
  }
  getFile(user, id, ip, download) {
    const it = this.one(`SELECT * FROM items WHERE id=?`, id);
    const can = it && it.mime && this.memberStatus(it.vacation_id, user.id) === 'joined' && (it.user_id === user.id || it.shared);
    if (!can) { this.alert('file-denied', `${id} by ${user.email}`, ip); return json({ error: 'לא נמצא' }, 404); }
    const parts = this.q(`SELECT data FROM chunks WHERE item_id=? ORDER BY idx`, id).map(r => new Uint8Array(r.data));
    const out = new Uint8Array(parts.reduce((s, p) => s + p.length, 0));
    let o = 0; for (const p of parts) { out.set(p, o); o += p.length; }
    const inline = !download && ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'].includes(it.mime);
    return new Response(out, {
      headers: {
        'content-type': it.mime,
        'content-length': String(out.length),
        'content-disposition': `${inline ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(it.file_name || 'file')}`,
        'cache-control': 'private, max-age=3600',
        'x-content-type-options': 'nosniff',
        'content-security-policy': "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; sandbox",
      },
    });
  }

  // ---- costs ----
  addCost(user, v, b) {
    const topic = this.topicOf(v.id, b.topicId);
    const label = str(b.label, { max: 80, name: 'תיאור' });
    if (this.one(`SELECT COUNT(*) AS n FROM costs WHERE vacation_id=?`, v.id).n >= 500) fail(400, 'יותר מדי מחירים');
    const id = randomId();
    this.run(`INSERT INTO costs (id, vacation_id, topic_id, user_id, label, amount, currency, shared, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id, v.id, topic.id, user.id, label, money(b.amount), currency(b.currency), bool(b.shared), Date.now());
    return json({ id });
  }
  updateCost(user, id, b, ip) {
    const c = this.ownItem('costs', user, id, ip);
    const label = b.label !== undefined ? str(b.label, { max: 80, name: 'תיאור' }) : c.label;
    const amount = b.amount !== undefined ? money(b.amount) : c.amount;
    const cur = b.currency !== undefined ? currency(b.currency) : c.currency;
    const shared = b.shared !== undefined ? bool(b.shared) : c.shared;
    this.run(`UPDATE costs SET label=?, amount=?, currency=?, shared=? WHERE id=?`, label, amount, cur, shared, id);
    return json({ ok: true });
  }
  deleteCost(user, id, ip) {
    this.ownItem('costs', user, id, ip);
    this.run(`DELETE FROM costs WHERE id=?`, id);
    return json({ ok: true });
  }

  // ---- notes (always personal) ----
  addNote(user, v, b) {
    const text = str(b.text, { min: 1, max: 300, name: 'הערה' });
    if (this.one(`SELECT COUNT(*) AS n FROM notes WHERE vacation_id=? AND user_id=?`, v.id, user.id).n >= 200) fail(400, 'יותר מדי הערות');
    const id = randomId();
    this.run(`INSERT INTO notes (id, vacation_id, user_id, text, done, created) VALUES (?, ?, ?, ?, 0, ?)`, id, v.id, user.id, text, Date.now());
    return json({ id });
  }
  updateNote(user, id, b, ip) {
    const n = this.ownItem('notes', user, id, ip);
    const text = b.text !== undefined ? str(b.text, { min: 1, max: 300, name: 'הערה' }) : n.text;
    const done = b.done !== undefined ? bool(b.done) : n.done;
    this.run(`UPDATE notes SET text=?, done=? WHERE id=?`, text, done, id);
    return json({ ok: true });
  }
  deleteNote(user, id, ip) {
    this.ownItem('notes', user, id, ip);
    this.run(`DELETE FROM notes WHERE id=?`, id);
    return json({ ok: true });
  }
}
