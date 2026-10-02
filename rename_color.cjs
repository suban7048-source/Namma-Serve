const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css') || filePath.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('ns-blue')) {
      let newContent = content.replace(/ns-blue-bright/g, 'ns-primary-bright').replace(/ns-blue/g, 'ns-primary');
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
});

let tailwindConfig = fs.readFileSync('./tailwind.config.js', 'utf8');
if (tailwindConfig.includes('ns-blue')) {
    let newTailwindConfig = tailwindConfig
        .replace(/'ns-blue': '#0878D1',/g, "'ns-primary': '#059669',")
        .replace(/'ns-blue-bright': '#0B84F3',/g, "'ns-primary-bright': '#10B981',");
    fs.writeFileSync('./tailwind.config.js', newTailwindConfig, 'utf8');
    console.log('Updated tailwind.config.js');
}

let indexHtml = fs.readFileSync('./index.html', 'utf8');
if (indexHtml.includes('ns-blue')) {
    let newIndexHtml = indexHtml.replace(/ns-blue/g, 'ns-primary');
    fs.writeFileSync('./index.html', newIndexHtml, 'utf8');
    console.log('Updated index.html');
}
