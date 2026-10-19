const { chromium } = require('playwright');
const path = require('path');

const outDir = 'C:/Users/CE00172125/.gemini/antigravity-cli/brain/1188bd3a-ef1f-4a3e-b290-81fc528b353d';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop 1440x900
  const deskPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await deskPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(500);

  // Scroll to work section and screenshot
  const workLoc = deskPage.locator('#work');
  await workLoc.scrollIntoViewIfNeeded();
  await deskPage.waitForTimeout(400);
  await deskPage.screenshot({ path: path.join(outDir, 'work_desktop.png') });
  console.log('Saved work_desktop.png');

  // Hover second work panel and screenshot transition
  const secondPanel = deskPage.locator('#work .wk-panel').nth(1);
  await secondPanel.hover();
  await deskPage.waitForTimeout(950);
  await deskPage.screenshot({ path: path.join(outDir, 'work_desktop_expanded2.png') });
  console.log('Saved work_desktop_expanded2.png');

  // Scroll to skills section and screenshot
  const skillsLoc = deskPage.locator('#skills');
  await skillsLoc.scrollIntoViewIfNeeded();
  await deskPage.waitForTimeout(600);
  await deskPage.screenshot({ path: path.join(outDir, 'skills_desktop.png') });
  console.log('Saved skills_desktop.png');

  // Hover a different skill
  const skillTile = deskPage.locator('#skills .sk-tile').nth(4);
  await skillTile.hover();
  await deskPage.waitForTimeout(500);
  await deskPage.screenshot({ path: path.join(outDir, 'skills_desktop_hover.png') });
  console.log('Saved skills_desktop_hover.png');

  // 2. Mobile 390x844
  const mobPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobPage.waitForTimeout(500);

  const mobWork = mobPage.locator('#work');
  await mobWork.scrollIntoViewIfNeeded();
  await mobPage.waitForTimeout(400);
  await mobPage.screenshot({ path: path.join(outDir, 'work_mobile.png') });
  console.log('Saved work_mobile.png');

  const mobSkills = mobPage.locator('#skills');
  await mobSkills.scrollIntoViewIfNeeded();
  await mobPage.waitForTimeout(400);
  await mobPage.screenshot({ path: path.join(outDir, 'skills_mobile.png') });
  console.log('Saved skills_mobile.png');

  await browser.close();
  console.log('All screenshots captured successfully.');
})();
