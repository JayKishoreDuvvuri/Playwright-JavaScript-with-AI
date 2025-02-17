import fs from 'fs';
import path from 'path';

// Validation functions
const validateFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return { exists: true, content };
  } catch (error) {
    return { exists: false, error: error.message };
  }
};

const validatePageObject = (content) => {
  const requiredMethods = ['constructor', 'page'];
  return requiredMethods.every(method => content.includes(method));
};

const validateTestFile = (content) => {
  const requiredPatterns = [
    'test.describe',
    'test.beforeEach',
    'expect',
    'test('
  ];
  return requiredPatterns.every(pattern => content.includes(pattern));
};

// Files to validate
const files = [
  { path: 'tests/pages/login.page.js', type: 'pageObject' },
  { path: 'tests/pages/inventory.page.js', type: 'pageObject' },
  { path: 'tests/login.spec.js', type: 'test' },
  { path: 'tests/inventory.spec.js', type: 'test' },
  { path: 'tests/fixtures/users.json', type: 'json' },
  { path: 'playwright.config.js', type: 'config' }
];

console.log('Validating test framework structure...\n');

let isValid = true;

for (const file of files) {
  const result = validateFile(file.path);
  
  if (!result.exists) {
    console.error(`❌ ${file.path} is missing!`);
    isValid = false;
    continue;
  }

  let fileValid = true;

  if (file.type === 'pageObject') {
    fileValid = validatePageObject(result.content);
  } else if (file.type === 'test') {
    fileValid = validateTestFile(result.content);
  } else if (file.type === 'json') {
    try {
      JSON.parse(result.content);
    } catch {
      fileValid = false;
    }
  }

  console.log(`${fileValid ? '✅' : '❌'} ${file.path}`);
  if (!fileValid) isValid = false;
}

console.log('\nValidation ' + (isValid ? 'successful! ✅' : 'failed! ❌'));
console.log('\nNote: Tests cannot be executed in WebContainer environment.');
console.log('Please run tests locally where browser binaries can be installed.');

process.exit(isValid ? 0 : 1);