/**
 * Fix ESLint Issues Script
 * Run with: node fix-eslint.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Files with issues based on the Vercel build log
const problematicFiles = [
  'src/components/ControlTray/ControlTray.tsx',
  'src/lib/audio-recorder.ts',
  'src/lib/audio-streamer.ts',
  'src/lib/multimodal-live-client.ts',
  'src/lib/utils.ts',
  'src/pages/Profile.tsx',
  'src/types/multimodal-live-types.ts'
];

// Log all file paths to make sure they're correct
console.log("Checking file paths...");
const notFoundFiles = [];
problematicFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    notFoundFiles.push(filePath);
  } else {
    console.log(`Found: ${filePath}`);
  }
});

if (notFoundFiles.length > 0) {
  console.log("\nSome files weren't found. Checking for alternative paths...");
  
  // Try to find the files by searching common directories
  const searchDirs = ['src', 'app', 'components', 'lib', 'pages', 'types'];
  
  notFoundFiles.forEach(missingFile => {
    const fileName = path.basename(missingFile);
    let found = false;
    
    searchDirs.forEach(dir => {
      try {
        const results = execSync(`find ${dir} -name "${fileName}" 2>/dev/null`, { encoding: 'utf8' });
        if (results && results.trim()) {
          const foundPaths = results.trim().split('\n');
          console.log(`Found alternative path for ${missingFile}: ${foundPaths[0]}`);
          
          // Replace in the problematicFiles array
          const index = problematicFiles.indexOf(missingFile);
          if (index !== -1) {
            problematicFiles[index] = foundPaths[0];
            found = true;
          }
        }
      } catch (error) {
        // Ignore errors in the find command
      }
    });
    
    if (!found) {
      console.log(`Could not find an alternative path for ${missingFile}`);
    }
  });
}

console.log("\nFixing ESLint issues in files...");

// Fix the issues
problematicFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${filePath} - file not found`);
    return;
  }

  console.log(`\nFixing issues in ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fixes = [];

  // 1. Fix empty functions by adding comments
  let newContent = content.replace(/\(\) => \{\}/g, '() => {\n    // Intentionally empty function\n  }');
  if (newContent !== content) {
    fixes.push('- Added comments to empty arrow functions');
    content = newContent;
  }
  
  newContent = content.replace(/\([^)]*\) => \{\}/g, (match) => {
    return match.replace(/\{\}$/, '{\n    // Intentionally empty function\n  }');
  });
  if (newContent !== content) {
    fixes.push('- Added comments to parameterized empty arrow functions');
    content = newContent;
  }

  // 2. Replace var with let or const
  newContent = content.replace(/\bvar\s+(\w+)\s*=/g, 'let $1 =');
  if (newContent !== content) {
    fixes.push('- Replaced var with let');
    content = newContent;
  }

  // 3. Remove trivial type annotations
  newContent = content.replace(/: boolean = (true|false)/g, ' = $1');
  if (newContent !== content) {
    fixes.push('- Removed trivial boolean type annotations');
    content = newContent;
  }
  
  newContent = content.replace(/: number = (\d+)/g, ' = $1');
  if (newContent !== content) {
    fixes.push('- Removed trivial number type annotations');
    content = newContent;
  }
  
  newContent = content.replace(/: string = ["']([^"']*)["']/g, ' = "$1"');
  if (newContent !== content) {
    fixes.push('- Removed trivial string type annotations');
    content = newContent;
  }

  // 4. Fix async Promise executor issues
  newContent = content.replace(/new Promise\(async \(/g, 'new Promise((');
  if (newContent !== content) {
    fixes.push('- Fixed async Promise executor issues');
    content = newContent;
  }
  
  // 5. Remove unnecessary escape characters
  newContent = content.replace(/\\'/g, "'");
  if (newContent !== content) {
    fixes.push("- Removed unnecessary escape characters (\\')");
    content = newContent;
  }

  if (originalContent !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  Fixed the following issues:`);
    fixes.forEach(fix => console.log(`  ${fix}`));
  } else {
    console.log(`  No issues fixed in this file`);
  }
});

console.log('\nAll fixes applied! Now run npm run build or pnpm build to verify.'); 