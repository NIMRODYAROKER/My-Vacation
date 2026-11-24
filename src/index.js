import { DurableObject } from 'cloudflare:workers';
import { Store } from './store.js';

export class VacationStore extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.store = new Store(ctx.storage.sql);
  }
  async fetch(request) {
    return this.store.handle(request);
  }
}

const SECURITY_HEADERS = {
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-frame-options': 'DENY',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === 'http:' && url.hostname !== 'localhost') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname.startsWith('/api/')) {
      const headers = new Headers(request.headers);
      headers.set('x-real-ip', request.headers.get('cf-connecting-ip') || '');
      const stub = env.DB.get(env.DB.idFromName('main'));
      const res = await stub.fetch(new Request(request, { headers }));
      const out = new Response(res.body, res);
      for (const [k, v] of Object.entries(SECURITY_HEADERS)) if (!out.headers.has(k)) out.headers.set(k, v);
      return out;
    }
    return env.ASSETS.fetch(request);
  },
};
