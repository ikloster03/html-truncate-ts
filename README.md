# html-truncate-ts

> **Languages:** **🇺🇸 English** | [🇷🇺 Русский](./README.ru.md)

[![npm version](https://badge.fury.io/js/html-truncate-ts.svg)](https://badge.fury.io/js/html-truncate-ts)
[![npm downloads](https://img.shields.io/npm/dw/html-truncate-ts)](https://badge.fury.io/js/html-truncate-ts)
[![NPM license](https://img.shields.io/npm/l/html-truncate-ts)](https://github.com/ikloster03/html-truncate-ts/blob/main/LICENSE)
[![npm type definitions](https://img.shields.io/npm/types/html-truncate-ts)](https://github.com/ikloster03/html-truncate-ts)

---

A TypeScript library for truncating HTML strings while preserving HTML tags and structure.

## 🚀 Features

- **Safe HTML truncation** - Preserves HTML tags and structure
- **TypeScript support** - Full type definitions included
- **Universal Module Definition (UMD)** - Works in browsers, Node.js, and bundlers
- **Multiple format support** - ES Modules, CommonJS, UMD, and AMD
- **Flexible options** - Customizable ellipsis, word truncation, and image handling
- **URL-aware** - Handles URLs intelligently during truncation
- **Modern tooling** - ESLint, Prettier, Jest, and git hooks

## 📦 Installation

```bash
npm install html-truncate-ts
# or
yarn add html-truncate-ts
# or
pnpm add html-truncate-ts
```

## 🔧 Usage

### ES Modules (Modern JavaScript/TypeScript)

```javascript
import { truncate } from 'html-truncate-ts';

const html =
  '<p>This is a <strong>very long</strong> HTML string that needs to be truncated</p>';
const result = truncate(html, 50);
console.log(result); // '<p>This is a <strong>very long</strong> HTML string that...</p>'
```

### CommonJS (Node.js)

```javascript
const { truncate } = require('html-truncate-ts');

const html =
  '<p>This is a <strong>very long</strong> HTML string that needs to be truncated</p>';
const result = truncate(html, 50);
console.log(result); // '<p>This is a <strong>very long</strong> HTML string that...</p>'
```

### UMD (Browser)

#### Via CDN

```html
<script src="https://unpkg.com/html-truncate-ts/dist/umd/html-truncate.min.js"></script>
<script>
  const html =
    '<p>This is a <strong>very long</strong> HTML string that needs to be truncated</p>';
  const result = HtmlTruncate.truncate(html, 50);
  console.log(result); // '<p>This is a <strong>very long</strong> HTML string that...</p>'
</script>
```

#### Local file

```html
<script src="path/to/html-truncate.min.js"></script>
<script>
  const html =
    '<p>This is a <strong>very long</strong> HTML string that needs to be truncated</p>';
  const result = HtmlTruncate.truncate(html, 50);
  console.log(result); // '<p>This is a <strong>very long</strong> HTML string that...</p>'
</script>
```

### AMD (RequireJS)

```javascript
require(['html-truncate-ts'], function (htmlTruncate) {
  const html =
    '<p>This is a <strong>very long</strong> HTML string that needs to be truncated</p>';
  const result = htmlTruncate.truncate(html, 50);
  console.log(result); // '<p>This is a <strong>very long</strong> HTML string that...</p>'
});
```

### Advanced TypeScript Usage

```typescript
import { truncate, TruncateOptions } from 'html-truncate-ts';

const html =
  '<p>This is a <strong>very long</strong> HTML string that needs to be truncated</p>';

const options: TruncateOptions = {
  ellipsis: '...',
  truncateLastWord: false,
  slop: 10,
  keepImageTag: false,
};

const result = truncate(html, 50, options);
console.log(result); // '<p>This is a <strong>very long</strong> HTML string that...</p>'
```

## 📦 Package Resolution

The library automatically resolves to the appropriate format based on your environment:

- **ES Modules**: `dist/esm/index.js` (for modern bundlers, Node.js with `"type": "module"`)
- **CommonJS**: `dist/cjs/index.cjs` (for Node.js without `"type": "module"`)
- **Browser**: `dist/umd/html-truncate.min.js` (for direct browser usage)

## 📊 File Sizes

- **ESM**: ~2.6KB uncompressed
- **CJS**: ~2.9KB uncompressed
- **UMD**: ~6.3KB uncompressed, ~2.0KB minified

## 📚 API

### `truncate(string, maxLength, options?)`

**Parameters:**

- `string` (string): The HTML string to truncate
- `maxLength` (number): Maximum length of the truncated string
- `options` (object, optional): Configuration options

**Options:**

- `keepImageTag` (boolean): Whether to keep image tags (default: `false`)
- `truncateLastWord` (boolean): Whether to truncate the last word (default: `true`)
- `slop` (number): Tolerance for word truncation (default: `10`)
- `ellipsis` (boolean | string): Ellipsis symbol or false to disable (default: `"..."`)

**Returns:** `string` - The truncated HTML string

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build the project
pnpm build

# Lint code
pnpm lint

# Format code
pnpm format

# Type checking
pnpm typecheck
```

## 🧪 Testing

The project includes comprehensive tests covering:

- Basic text truncation
- HTML tag preservation
- Image tag handling
- Custom ellipsis
- Word-aware truncation
- Complex HTML structures
- Edge cases (empty strings, short content)

### Quick Format Testing

```bash
# Test all formats (builds first, then tests)
pnpm test:formats

# Test existing build files only
pnpm test:all
```

### Individual Format Testing

#### Node.js CommonJS

```bash
node ./scripts/test-node.cjs
```

#### Browser UMD

Open `test-browser.html` in your browser or serve it via HTTP server:

```bash
npx http-server -p 8000
# Then open http://localhost:8000/test-browser.html
```

#### ES Modules

```bash
node -e "import('./dist/esm/index.js').then(mod => console.log('ESM test:', mod.truncate('<p>Test</p>', 10)))"
```

#### Unit Tests

```bash
# Run Jest unit tests
pnpm test

# Run Jest in watch mode
pnpm test:watch
```

## 📋 Scripts

- `build` - Compile TypeScript to JavaScript
- `clean` - Remove build artifacts
- `dev` - Watch mode for development
- `format` - Format code with Prettier
- `lint` - Lint and fix code with ESLint
- `test` - Run Jest tests
- `typecheck` - Type checking without compilation

## 🔧 Configuration

The project uses modern tooling:

- **TypeScript** - Type safety and modern JavaScript features
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Git hooks** - Pre-commit linting and formatting, pre-push testing

## 📄 License

MIT License

## 🙏 Acknowledgments

This project is based on [nodejs-html-truncate](https://github.com/huang47/nodejs-html-truncate) by huang47, which was archived on September 7, 2024. This TypeScript version aims to provide modern tooling, type safety, and continued maintenance.
