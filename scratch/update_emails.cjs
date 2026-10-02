const fs = require('fs');

const filepath = 'src/data/mockData.ts';
let content = fs.readFileSync(filepath, 'utf8');

let counter = 1;
// Replace all emails in the file sequentially, using the name if possible, or just a counter.
// Actually, it's safer to just iterate over each provider block.
// But a global replace with a counter is easiest.
let updatedContent = content.replace(/name: '([^']+)',([\s\S]*?)email: '([^']+)'/g, (match, name, middle, oldEmail) => {
  let slug = name.toLowerCase().replace(/[^a-z]/g, '');
  let newEmail = `${slug}${counter}@nammaserve.in`;
  counter++;
  return `name: '${name}',${middle}email: '${newEmail}'`;
});

fs.writeFileSync(filepath, updatedContent);
console.log('Successfully updated emails for all technicians.');
