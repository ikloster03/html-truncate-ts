# html-truncate-ts

> **Языки:** [🇺🇸 English](./README.md) | **🇷🇺 Русский**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)](https://jestjs.io/)
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)](https://prettier.io/)

---

TypeScript библиотека для обрезки HTML строк с сохранением HTML тегов и структуры.

## 🚀 Особенности

- **Безопасная обрезка HTML** - Сохраняет HTML теги и структуру
- **Поддержка TypeScript** - Полные определения типов включены
- **Universal Module Definition (UMD)** - Работает в браузерах, Node.js и сборщиках
- **Поддержка множественных форматов** - ES Modules, CommonJS, UMD и AMD
- **Гибкие опции** - Настраиваемые многоточие, обрезка слов и обработка изображений
- **Поддержка URL** - Интеллектуально обрабатывает URL при обрезке
- **Современные инструменты** - ESLint, Prettier, Jest и git hooks

## 📦 Установка

```bash
npm install html-truncate-ts
# или
yarn add html-truncate-ts
# или
pnpm add html-truncate-ts
```

## 🔧 Использование

### ES Modules (Современный JavaScript/TypeScript)

```javascript
import { truncate } from 'html-truncate-ts';

const html =
  '<p>Это <strong>очень длинная</strong> HTML строка, которую нужно обрезать</p>';
const result = truncate(html, 50);
console.log(result); // '<p>Это <strong>очень длинная</strong> HTML строка, которую...</p>'
```

### CommonJS (Node.js)

```javascript
const { truncate } = require('html-truncate-ts');

const html =
  '<p>Это <strong>очень длинная</strong> HTML строка, которую нужно обрезать</p>';
const result = truncate(html, 50);
console.log(result); // '<p>Это <strong>очень длинная</strong> HTML строка, которую...</p>'
```

### UMD (Браузер)

#### Через CDN

```html
<script src="https://unpkg.com/html-truncate-ts/dist/umd/html-truncate.min.js"></script>
<script>
  const html =
    '<p>Это <strong>очень длинная</strong> HTML строка, которую нужно обрезать</p>';
  const result = HtmlTruncate.truncate(html, 50);
  console.log(result); // '<p>Это <strong>очень длинная</strong> HTML строка, которую...</p>'
</script>
```

#### Локальный файл

```html
<script src="path/to/html-truncate.min.js"></script>
<script>
  const html =
    '<p>Это <strong>очень длинная</strong> HTML строка, которую нужно обрезать</p>';
  const result = HtmlTruncate.truncate(html, 50);
  console.log(result); // '<p>Это <strong>очень длинная</strong> HTML строка, которую...</p>'
</script>
```

### AMD (RequireJS)

```javascript
require(['html-truncate-ts'], function (htmlTruncate) {
  const html =
    '<p>Это <strong>очень длинная</strong> HTML строка, которую нужно обрезать</p>';
  const result = htmlTruncate.truncate(html, 50);
  console.log(result); // '<p>Это <strong>очень длинная</strong> HTML строка, которую...</p>'
});
```

### Расширенное использование TypeScript

```typescript
import { truncate, TruncateOptions } from 'html-truncate-ts';

const html =
  '<p>Это <strong>очень длинная</strong> HTML строка, которую нужно обрезать</p>';

const options: TruncateOptions = {
  ellipsis: '...',
  truncateLastWord: false,
  slop: 10,
  keepImageTag: false,
};

const result = truncate(html, 50, options);
console.log(result); // '<p>Это <strong>очень длинная</strong> HTML строка, которую...</p>'
```

## 📦 Разрешение пакетов

Библиотека автоматически выбирает подходящий формат в зависимости от вашего окружения:

- **ES Modules**: `dist/esm/index.js` (для современных сборщиков, Node.js с `"type": "module"`)
- **CommonJS**: `dist/cjs/index.cjs` (для Node.js без `"type": "module"`)
- **Browser**: `dist/umd/html-truncate.min.js` (для прямого использования в браузере)

## 📊 Размеры файлов

- **ESM**: ~2.6KB несжатый
- **CJS**: ~2.9KB несжатый
- **UMD**: ~6.3KB несжатый, ~2.0KB минифицированный

## 📚 API

### `truncate(string, maxLength, options?)`

**Параметры:**

- `string` (string): HTML строка для обрезки
- `maxLength` (number): Максимальная длина обрезанной строки
- `options` (object, опционально): Параметры конфигурации

**Опции:**

- `keepImageTag` (boolean): Сохранять ли теги изображений (по умолчанию: `false`)
- `truncateLastWord` (boolean): Обрезать ли последнее слово (по умолчанию: `true`)
- `slop` (number): Допуск для обрезки слов (по умолчанию: `10`)
- `ellipsis` (boolean | string): Символ многоточия или false для отключения (по умолчанию: `"..."`)

**Возвращает:** `string` - Обрезанная HTML строка

## 🛠️ Разработка

```bash
# Установка зависимостей
pnpm install

# Запуск тестов
pnpm test

# Запуск тестов в режиме наблюдения
pnpm test:watch

# Сборка проекта
pnpm build

# Линтинг кода
pnpm lint

# Форматирование кода
pnpm format

# Проверка типов
pnpm typecheck
```

## 🧪 Тестирование

Проект включает комплексные тесты, покрывающие:

- Базовую обрезку текста
- Сохранение HTML тегов
- Обработку тегов изображений
- Пользовательское многоточие
- Обрезку с учетом слов
- Сложные HTML структуры
- Граничные случаи (пустые строки, короткий контент)

### Быстрое тестирование форматов

```bash
# Тестирование всех форматов (сначала сборка, затем тесты)
pnpm test:formats

# Тестирование только существующих файлов сборки
pnpm test:all
```

### Тестирование отдельных форматов

#### Node.js CommonJS

```bash
node ./scripts/test-node.cjs
```

#### Browser UMD

Откройте `test-browser.html` в браузере или запустите через HTTP сервер:

```bash
python3 -m http.server 8000
# Затем откройте http://localhost:8000/test-browser.html
```

#### ES Modules

```bash
node -e "import('./dist/esm/index.js').then(mod => console.log('ESM test:', mod.truncate('<p>Test</p>', 10)))"
```

#### Юнит тесты

```bash
# Запуск Jest юнит тестов
pnpm test

# Запуск Jest в режиме наблюдения
pnpm test:watch
```

## 📋 Скрипты

- `build` - Компиляция TypeScript в JavaScript
- `clean` - Удаление артефактов сборки
- `dev` - Режим наблюдения для разработки
- `format` - Форматирование кода с Prettier
- `lint` - Линтинг и исправление кода с ESLint
- `test` - Запуск Jest тестов
- `typecheck` - Проверка типов без компиляции

## 🔧 Конфигурация

Проект использует современные инструменты:

- **TypeScript** - Типобезопасность и современные возможности JavaScript
- **ESLint** - Линтинг кода с поддержкой TypeScript
- **Prettier** - Форматирование кода
- **Jest** - Фреймворк тестирования
- **Git hooks** - Пре-коммит линтинг и форматирование, пре-пуш тестирование

## 📄 Лицензия

MIT License

## 🙏 Благодарности

Этот проект основан на [nodejs-html-truncate](https://github.com/huang47/nodejs-html-truncate) от huang47, который был заархивирован 7 сентября 2024 года. Данная TypeScript версия направлена на предоставление современных инструментов, типобезопасности и продолжения поддержки.
