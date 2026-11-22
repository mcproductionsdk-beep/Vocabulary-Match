import {attachMatchSession} from './session.mjs';
const buildId = 'e6726014f76aa0273b3196669a431d9acec577d6';

let shellOrigin;
try { shellOrigin = new URL(document.referrer).origin; } catch {}
if (parent !== window && (shellOrigin === location.origin ||
    /^https:\/\/(?:[a-z0-9-]+\.)?bt-vocabulary-platform-staging\.pages\.dev$/.test(shellOrigin))) {
  attachMatchSession({engine:window.BTMatch, policy:{shellOrigin,engineOrigin:location.origin,buildId}});
}
