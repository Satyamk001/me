const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // 1. Check Skills section
  console.log('\n--- TESTING SKILLS SECTION ---');
  const skillsSec = page.locator('#skills');
  const skillsBoxBefore = await skillsSec.boundingBox();
  console.log('Skills section box before hover:', skillsBoxBefore);

  const tiles = page.locator('#skills .skill-cell button, #skills .sk-tile');
  const count = await tiles.count();
  console.log('Found skills tiles:', count);

  for (let i = 0; i < Math.min(10, count); i++) {
    const tile = tiles.nth(i);
    await tile.hover();
    await page.waitForTimeout(100);
    const boxAfter = await skillsSec.boundingBox();
    const inspectorBox = await page.locator('#skill-inspector, #sk-inspector').boundingBox();
    console.log(`Hovered tile ${i}: skills height = ${boxAfter?.height}, y = ${boxAfter?.y}, inspector height = ${inspectorBox?.height}, y = ${inspectorBox?.y}`);
  }

  // 2. Check Work section
  console.log('\n--- TESTING WORK SECTION ---');
  const workSec = page.locator('#work');
  const workBoxBefore = await workSec.boundingBox();
  console.log('Work section box before hover:', workBoxBefore);

  const workArticles = page.locator('#work article, #work .wk-panel');
  const workCount = await workArticles.count();
  console.log('Found work panels:', workCount);

  for (let i = 0; i < workCount; i++) {
    const panel = workArticles.nth(i);
    await panel.hover();
    await page.waitForTimeout(300);
    const boxAfter = await workSec.boundingBox();
    const panelBox = await panel.boundingBox();
    console.log(`Hovered work panel ${i}: work height = ${boxAfter?.height}, y = ${boxAfter?.y}, panel width = ${panelBox?.width}, height = ${panelBox?.height}`);
  }

  await browser.close();
})();
