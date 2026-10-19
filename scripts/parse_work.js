const fs = require('fs');

const html = fs.readFileSync('D:/Satyam (CE00172125)/learn/ai_portfolio/portfolio/scripts/ref_work.html', 'utf8');

const articles = html.match(/<article[\s\S]*?<\/article>/gi);
console.log('Total articles:', articles ? articles.length : 0);
if (articles) {
  articles.forEach((art, i) => {
    const titleMatch = art.match(/<h3[^>]*>(.*?)<\/h3>/);
    console.log('Article ' + i + ': title = ' + (titleMatch ? titleMatch[1] : 'unknown') + ', length = ' + art.length);
  });
}
