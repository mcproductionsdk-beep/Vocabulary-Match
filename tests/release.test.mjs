import test from 'node:test';
import assert from 'node:assert/strict';
import {attachMatchSession} from '../session.mjs';

test('Match rejects a foreign origin and deduplicates trusted initialization', () => {
  const hostWindow = new EventTarget();
  const shellOrigin = 'https://shell.example';
  const engineOrigin = 'https://match.example';
  hostWindow.location = {origin: engineOrigin};
  const parentWindow = {};
  const responses = [];
  let initialized = 0;
  const engine = {
    subscribe: () => true,
    initialize: () => ++initialized === 1,
    setSound: () => true,
    state: () => ({}),
    dispose: () => {}
  };
  const session = attachMatchSession({engine, hostWindow, parentWindow, post: msg => responses.push(msg),
    policy: {shellOrigin, engineOrigin, buildId: 'a'.repeat(40)}});
  const data = {protocol: 'bt-vocabulary-engine/1', engineId: 'vocabulary-match', sessionId: 'test',
    requestId: '1', type: 'INIT', payload: {soundOn: false, vocabulary: {
      family: 'vocabulary', schemaVersion: 1, title: 'Test', promptLanguage: 'en-US', language: 'es-ES'
    }}};
  function send(origin) {
    hostWindow.dispatchEvent(Object.assign(new Event('message'), {origin, source: parentWindow, data}));
  }
  send('https://foreign.example');
  assert.equal(initialized, 0);
  send(shellOrigin);
  send(shellOrigin);
  assert.equal(initialized, 1);
  assert.deepEqual(responses.map(message => message.type), ['READY', 'INITIALIZED', 'INITIALIZED']);
  session.dispose();
});
