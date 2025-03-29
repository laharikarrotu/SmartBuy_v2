const fs = require('fs');

const filePath = 'src/components/ControlTray/ControlTray.tsx';
console.log(`Fixing issues in ${filePath}...`);

if (!fs.existsSync(filePath)) {
  console.log(`File not found: ${filePath}`);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Look for line around line 68 with an empty arrow function
const lines = content.split('\n');
let found = false;

for (let i = 60; i < 80; i++) {
  if (i >= lines.length) break;
  
  // Check if this line contains an empty arrow function
  if (lines[i].includes('() => {}')) {
    console.log(`Found empty arrow function at line ${i+1}: ${lines[i]}`);
    lines[i] = lines[i].replace('() => {}', '() => {\n    // Intentionally empty function\n  }');
    found = true;
  }
  
  // Also look for pattern with arguments
  if (lines[i].match(/\([^)]*\) => \{\}/)) {
    console.log(`Found empty arrow function with parameters at line ${i+1}: ${lines[i]}`);
    lines[i] = lines[i].replace(/(\([^)]*\)) => \{\}/, '$1 => {\n    // Intentionally empty function\n  }');
    found = true;
  }
}

if (found) {
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`Fixed issues in ${filePath}`);
} else {
  console.log(`No empty arrow functions found in the expected range of ${filePath}`);
  
  // If we didn't find the issue in the expected range, let's search the entire file
  found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/onVideoStreamChange\s*=\s*\([^)]*\)\s*=>\s*\{\}/)) {
      console.log(`Found onVideoStreamChange empty arrow function at line ${i+1}: ${lines[i]}`);
      lines[i] = lines[i].replace(/(\([^)]*\))\s*=>\s*\{\}/, '$1 => {\n    // Intentionally empty function\n  }');
      found = true;
    }
  }
  
  if (found) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Fixed issues in ${filePath}`);
  } else {
    console.log(`No issues found in ${filePath}`);
  }
} 