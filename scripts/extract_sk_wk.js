const fs = require('fs');

const css = fs.readFileSync('D:/Satyam (CE00172125)/learn/ai_portfolio/portfolio/scripts/ref_styles.css', 'utf8');

// Find all rules mentioning sk- or wk-
// We can parse or split by rule
const rules = css.match(/[^{}]+{[^{}]+}/g) || [];
console.log('Total CSS rules:', rules.length);

const skRules = rules.filter(r => r.includes('.sk-') || r.includes('#skills'));
const wkRules = rules.filter(r => r.includes('.wk-') || r.includes('#work'));

console.log('Found sk rules:', skRules.length);
console.log('Found wk rules:', wkRules.length);

fs.writeFileSync('D:/Satyam (CE00172125)/learn/ai_portfolio/portfolio/scripts/ref_sk_rules.css', skRules.join('\n\n'));
fs.writeFileSync('D:/Satyam (CE00172125)/learn/ai_portfolio/portfolio/scripts/ref_wk_rules.css', wkRules.join('\n\n'));
console.log('Saved ref_sk_rules.css and ref_wk_rules.css');
