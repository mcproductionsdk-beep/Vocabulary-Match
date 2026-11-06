import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';

const base = process.env.GAME_TEST_BASE;
const browser = await chromium.launch({executablePath: process.env.CHROME_BIN});
try {
  for (const viewport of [{width: 1280, height: 800}, {width: 390, height: 844}]) {
    const page = await browser.newPage({viewport, hasTouch: viewport.width < 500});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.waitForFunction(() => typeof window.BTMatch?.initialize === 'function');
    assert.deepEqual(errors, []);
    await page.close();
  }
} finally {
  await browser.close();
}
