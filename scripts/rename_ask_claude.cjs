const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.git') && !filePath.includes('dist')) {
        walkDir(filePath, callback);
      }
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.md')) {
        callback(filePath);
      }
    }
  });
}

let updatedCount = 0;
walkDir('src', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content.replace(/Ask Claude/gi, 'Ask Prompt AI');
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
    updatedCount++;
  }
});

console.log(`Total files updated from Ask Claude to Ask Prompt AI: ${updatedCount}`);
