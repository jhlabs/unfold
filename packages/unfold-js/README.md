# Unfold.js

A modern TypeScript library for creating beautiful page-turn animations in web applications.

## Installation

```bash
npm install unfold-js
# or
yarn add unfold-js
# or
pnpm add unfold-js
```

## Quick Start

```typescript
import { unfold } from 'unfold-js';
import 'unfold-js/dist/unfold.css';

const bookElement = document.getElementById('myBook');
const book = unfold(bookElement, {
  width: 800,
  height: 600,
  startingPage: 1
});

// Navigate programmatically
book.nextPage();
book.previousPage();
book.goToPage(3);
```

## Documentation

For complete documentation, examples, and API reference, visit our [documentation site](https://unfold-js.dev).

## Features

- 🎯 **TypeScript-first** - Built with TypeScript for excellent developer experience
- 🚀 **Modern & Performant** - Leverages modern CSS and browser features
- 📱 **Touch-friendly** - Smooth interactions on mobile devices
- 🎨 **Customizable** - Extensive options for styling and behavior
- ♿ **Accessible** - Built with accessibility in mind
- 📖 **RTL Support** - Right-to-left reading direction support

## License

MIT © Johannes Herrmann 