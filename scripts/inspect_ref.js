const fs = require('fs');

const path = 'C:/Users/CE00172125/.gemini/antigravity-cli/brain/1188bd3a-ef1f-4a3e-b290-81fc528b353d/.system_generated/steps/1062/content.md';
if (!fs.existsSync(path)) {
  console.log('File does not exist:', path);
  process.exit(1);
}

const content = fs.readFileSync(path, 'utf8');
console.log('Total content length:', content.length);

// Let's find sections or extract CSS
const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
console.log('Style tags found:', styleMatches ? styleMatches.length : 0);

if (styleMatches) {
  let allCss = styleMatches.map(s => s.replace(/<\/?style[^>]*>/gi, '')).join('\n');
  fs.writeFileSync('D:/Satyam (CE00172125)/learn/ai_portfolio/portfolio/scripts/ref_styles.css', allCss);
  console.log('Saved ref_styles.css with length:', allCss.length);
}

// Find section#work and section#skills
const workMatch = content.match(/<section[^>]*id=["']work["'][\s\S]*?<\/section>/i);
if (workMatch) {
  fs.writeFileSync('D:/Satyam (CE00172125)/learn/ai_portfolio/portfolio/scripts/ref_work.html', workMatch[0]);
  console.log('Saved ref_work.html with length:', workMatch[0].length);
} else {
  console.log('Work section not found');
}

const skillsMatch = content.match(/<section[^>]*id=["']skills["'][\s\S]*?<\/section>/i);
if (skillsMatch) {
  fs.writeFileSync('D:/Satyam (CE00172125)/learn/ai_portfolio/portfolio/scripts/ref_skills.html', skillsMatch[0]);
  console.log('Saved ref_skills.html with length:', skillsMatch[0].length);
} else {
  console.log('Skills section not found');
}
