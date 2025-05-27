---
title: Installation
description: Learn how to install and set up Unfold.js in your project
---

# Installation

Get started with Unfold.js by installing it in your project. The library is available through npm and can be easily integrated into any modern web application.

## Package Manager Installation

### npm

```bash
npm install unfold-js
```

### yarn

```bash
yarn add unfold-js
```

### pnpm

```bash
pnpm add unfold-js
```

## CDN Installation

For quick prototyping or simple projects, you can include Unfold.js directly from a CDN:

```html
<script src="https://unpkg.com/unfold-js@latest/dist/unfold.min.js"></script>
```

## ES Modules

If you're using a modern bundler or native ES modules:

```javascript
import { Unfold } from 'unfold-js';
```

## CommonJS

For Node.js or older bundlers:

```javascript
const { Unfold } = require('unfold-js');
```

## TypeScript Support

Unfold.js includes TypeScript definitions out of the box. No additional `@types` package is needed.

```typescript
import { Unfold, UnfoldOptions } from 'unfold-js';

const options: UnfoldOptions = {
  // Your configuration
};
```

## Browser Support

Unfold.js supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

For older browser support, you may need to include polyfills for:
- CSS Custom Properties
- Intersection Observer API
- ResizeObserver API

## Next Steps

Now that you have Unfold.js installed, head over to the [Quick Start](/getting-started/quick-start) guide to create your first page-turn animation! 