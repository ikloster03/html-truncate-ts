import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const testHTML =
  '<p>This is a <strong>test</strong> HTML string for testing all formats</p>';
const maxLength = 30;

console.log('🧪 Testing all build formats...\n');

// Проверяем что все файлы сборки существуют
const requiredFiles = [
  'dist/esm/index.js',
  'dist/cjs/index.cjs',
  'dist/umd/html-truncate.js',
  'dist/umd/html-truncate.min.js',
];

console.log('📁 Checking build files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - NOT FOUND`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some build files are missing. Run `pnpm build` first.');
  process.exit(1);
}

console.log('\n🧪 Testing formats...\n');

// Тест CommonJS
function testCommonJS() {
  return new Promise((resolve, reject) => {
    console.log('1️⃣ Testing CommonJS...');

    const testCode = `
      const { truncate } = require('./dist/cjs/index.cjs');
      const result = truncate('${testHTML}', ${maxLength});
      console.log('CJS Result:', result);
      console.log('CJS Length:', result.replace(/<[^>]*>/g, '').length);
    `;

    const child = spawn('node', ['-e', testCode], { stdio: 'inherit' });

    child.on('close', code => {
      if (code === 0) {
        console.log('✅ CommonJS test passed\n');
        resolve();
      } else {
        console.log('❌ CommonJS test failed\n');
        reject(new Error('CommonJS test failed'));
      }
    });
  });
}

// Тест ESM
function testESM() {
  return new Promise((resolve, reject) => {
    console.log('2️⃣ Testing ES Modules...');

    const testCode = `
      import('./dist/esm/index.js').then(mod => {
        const result = mod.truncate('${testHTML}', ${maxLength});
        console.log('ESM Result:', result);
        console.log('ESM Length:', result.replace(/<[^>]*>/g, '').length);
      }).catch(err => {
        console.error('ESM Error:', err);
        process.exit(1);
      });
    `;

    const child = spawn('node', ['-e', testCode], { stdio: 'inherit' });

    child.on('close', code => {
      if (code === 0) {
        console.log('✅ ES Modules test passed\n');
        resolve();
      } else {
        console.log('❌ ES Modules test failed\n');
        reject(new Error('ES Modules test failed'));
      }
    });
  });
}

// Тест UMD (проверяем что файлы валидны)
function testUMD() {
  return new Promise((resolve, reject) => {
    console.log('3️⃣ Testing UMD...');

    // Проверяем что UMD файлы содержат правильную структуру
    const umdContent = fs.readFileSync('dist/umd/html-truncate.js', 'utf8');
    const umdMinContent = fs.readFileSync(
      'dist/umd/html-truncate.min.js',
      'utf8'
    );

    const hasUMDStructure =
      umdContent.includes('(function (global, factory)') &&
      umdContent.includes('HtmlTruncate') &&
      umdContent.includes('truncate');

    const hasMinifiedStructure =
      umdMinContent.includes('HtmlTruncate') &&
      umdMinContent.length < umdContent.length;

    if (hasUMDStructure && hasMinifiedStructure) {
      console.log('✅ UMD structure is valid');
      console.log('✅ UMD minified version is valid');
      console.log('✅ UMD test passed\n');
      resolve();
    } else {
      console.log('❌ UMD structure is invalid\n');
      reject(new Error('UMD test failed'));
    }
  });
}

// Тест Jest
function testJest() {
  return new Promise((resolve, reject) => {
    console.log('4️⃣ Running Jest tests...');

    const child = spawn('pnpm', ['test'], { stdio: 'inherit' });

    child.on('close', code => {
      if (code === 0) {
        console.log('✅ Jest tests passed\n');
        resolve();
      } else {
        console.log('❌ Jest tests failed\n');
        reject(new Error('Jest tests failed'));
      }
    });
  });
}

// Запускаем все тесты
async function runAllTests() {
  try {
    await testCommonJS();
    await testESM();
    await testUMD();
    await testJest();

    console.log('🎉 All format tests passed successfully!');
    console.log('📦 The package is ready for publication.');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

runAllTests();
