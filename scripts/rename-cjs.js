import fs from 'fs';
import path from 'path';

const cjsDir = './dist/cjs';

function updateImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Обновляем require() импорты с расширением .js
  content = content.replace(
    /require\(['"](\.\/.+?)\.js['"]\)/g,
    "require('$1.cjs')"
  );

  // Обновляем require() импорты без расширения
  content = content.replace(/require\(['"](\.\/.+?)['"]\)/g, (match, path) => {
    // Если путь уже содержит .cjs, не изменяем
    if (path.endsWith('.cjs')) {
      return match;
    }
    // Добавляем .cjs расширение
    return `require('${path}.cjs')`;
  });

  fs.writeFileSync(filePath, content);
}

function renameFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      renameFiles(filePath);
    } else if (file.endsWith('.js')) {
      const newPath = filePath.replace('.js', '.cjs');
      fs.renameSync(filePath, newPath);
      updateImports(newPath);
      console.log(`Renamed and updated: ${filePath} → ${newPath}`);
    }
  });
}

if (fs.existsSync(cjsDir)) {
  renameFiles(cjsDir);
  console.log('CommonJS files renamed to .cjs extension and imports updated');
} else {
  console.log('CJS directory not found');
}
