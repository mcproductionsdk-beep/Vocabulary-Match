import {attachMatchSession} from './session.mjs';
const buildId = '75fa265b57a9b6700340a75b939d3e85b661bb30';

let shellOrigin;
try { shellOrigin = new URL(document.referrer).origin; } catch {}
if (parent !== window && (shellOrigin === location.origin ||
    /^https:\/\/(?:[a-z0-9-]+\.)?bt-vocabulary-platform-staging\.pages\.dev$/.test(shellOrigin))) {
  attachMatchSession({engine:window.BTMatch, policy:{shellOrigin,engineOrigin:location.origin,buildId}});
}
