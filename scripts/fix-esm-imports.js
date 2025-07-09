import fs from 'fs';
import path from 'path';

const esmDir = './dist/esm';

function updateImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Обновляем import импорты без расширения
  content = content.replace(
    /import\s+(.+?)\s+from\s+['"](\.\/.+?)['"];/g,
    (match, importClause, importPath) => {
      // Если путь уже содержит расширение, не изменяем
      if (importPath.includes('.js') || importPath.includes('.ts')) {
        return match;
      }
      // Добавляем .js расширение
      return `import ${importClause} from '${importPath}.js';`;
    }
  );

  // Обновляем export импорты без расширения
  content = content.replace(
    /export\s+(.+?)\s+from\s+['"](\.\/.+?)['"];/g,
    (match, exportClause, importPath) => {
      // Если путь уже содержит расширение, не изменяем
      if (importPath.includes('.js') || importPath.includes('.ts')) {
        return match;
      }
      // Добавляем .js расширение
      return `export ${exportClause} from '${importPath}.js';`;
    }
  );

  fs.writeFileSync(filePath, content);
}

function fixFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fixFiles(filePath);
    } else if (file.endsWith('.js')) {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      updateImports(filePath);
      const newContent = fs.readFileSync(filePath, 'utf8');
      if (originalContent !== newContent) {
        console.log(`Fixed imports in: ${filePath}`);
      }
    }
  });
}

if (fs.existsSync(esmDir)) {
  fixFiles(esmDir);
  console.log('ESM imports fixed');
} else {
  console.log('ESM directory not found');
}
