---
title: API Reference
description: Complete API documentation for Unfold.js
---

# API Reference

Welcome to the Unfold.js API documentation. This section provides comprehensive information about all classes, methods, properties, and configuration options available in the library.

## Core Classes

### Unfold

The main class for creating page-turn animations.

```typescript
class Unfold {
  constructor(container: string | HTMLElement, options?: UnfoldOptions)
}
```

**Parameters:**
- `container` - CSS selector string or HTMLElement that will contain the book
- `options` - Configuration options for the book instance

**Example:**
```javascript
const book = new Unfold('#my-book', {
  width: 800,
  height: 600,
  autoCenter: true
});
```

## Configuration Options

### UnfoldOptions

```typescript
interface UnfoldOptions {
  // Dimensions
  width?: number;
  height?: number;
  
  // Behavior
  autoCenter?: boolean;
  shadow?: boolean;
  hardCover?: boolean;
  
  // Animation
  duration?: number;
  easing?: string;
  
  // Interaction
  clickFlip?: boolean;
  dragFlip?: boolean;
  keyboardNav?: boolean;
  
  // Advanced
  zoom?: boolean;
  pan?: boolean;
  preloadPages?: number;
}
```

### Default Values

```javascript
const defaultOptions = {
  width: 800,
  height: 600,
  autoCenter: true,
  shadow: true,
  hardCover: false,
  duration: 1000,
  easing: 'ease-in-out',
  clickFlip: true,
  dragFlip: true,
  keyboardNav: true,
  zoom: false,
  pan: false,
  preloadPages: 1
};
```

## Methods

### Navigation Methods

#### `nextPage()`
Navigate to the next page.

```javascript
book.nextPage();
```

**Returns:** `Promise<void>`

#### `prevPage()`
Navigate to the previous page.

```javascript
book.prevPage();
```

**Returns:** `Promise<void>`

#### `goToPage(pageIndex: number)`
Navigate to a specific page by index.

```javascript
book.goToPage(2); // Go to page 3 (0-indexed)
```

**Parameters:**
- `pageIndex` - Zero-based page index

**Returns:** `Promise<void>`

#### `goToFirstPage()`
Navigate to the first page.

```javascript
book.goToFirstPage();
```

**Returns:** `Promise<void>`

#### `goToLastPage()`
Navigate to the last page.

```javascript
book.goToLastPage();
```

**Returns:** `Promise<void>`

### Configuration Methods

#### `setDuration(duration: number)`
Update the animation duration.

```javascript
book.setDuration(1500); // 1.5 seconds
```

#### `setEasing(easing: string)`
Update the animation easing function.

```javascript
book.setEasing('ease-out');
```

#### `setAnimation(type: string)`
Change the animation type.

```javascript
book.setAnimation('curl'); // 'default', 'curl', 'fold', 'slide', 'fade'
```

### Utility Methods

#### `destroy()`
Clean up the book instance and remove event listeners.

```javascript
book.destroy();
```

#### `refresh()`
Recalculate dimensions and refresh the book layout.

```javascript
book.refresh();
```

#### `resize(width: number, height: number)`
Resize the book to new dimensions.

```javascript
book.resize(1000, 700);
```

## Properties

### Read-only Properties

#### `currentPage: number`
Get the current page index (0-based).

```javascript
console.log(book.currentPage); // 0, 1, 2, etc.
```

#### `totalPages: number`
Get the total number of pages.

```javascript
console.log(book.totalPages); // Total page count
```

#### `isAnimating: boolean`
Check if a page flip animation is currently in progress.

```javascript
if (!book.isAnimating) {
  book.nextPage();
}
```

#### `container: HTMLElement`
Get the container element.

```javascript
console.log(book.container); // HTMLElement
```

## Events

### Event System

Unfold.js uses an event-driven architecture. You can listen to various events using the `on()` method.

#### `on(event: string, callback: Function)`
Add an event listener.

```javascript
book.on('pageFlip', (event) => {
  console.log('Page flipped to:', event.page);
});
```

#### `off(event: string, callback?: Function)`
Remove an event listener.

```javascript
book.off('pageFlip', myCallback);
// or remove all listeners for an event
book.off('pageFlip');
```

#### `once(event: string, callback: Function)`
Add a one-time event listener.

```javascript
book.once('ready', () => {
  console.log('Book is ready!');
});
```

### Available Events

#### `ready`
Fired when the book is fully initialized.

```javascript
book.on('ready', () => {
  console.log('Book is ready for interaction');
});
```

#### `pageFlip`
Fired when a page flip is completed.

```javascript
book.on('pageFlip', (event) => {
  console.log('Current page:', event.page);
  console.log('Previous page:', event.previousPage);
});
```

#### `flipStart`
Fired when a page flip animation begins.

```javascript
book.on('flipStart', (event) => {
  console.log('Starting flip from page', event.from, 'to page', event.to);
});
```

#### `flipEnd`
Fired when a page flip animation completes.

```javascript
book.on('flipEnd', (event) => {
  console.log('Flip completed');
});
```

#### `beforeFlip`
Fired before a page flip begins (can be cancelled).

```javascript
book.on('beforeFlip', (event) => {
  if (someCondition) {
    event.preventDefault(); // Cancel the flip
  }
});
```

#### `resize`
Fired when the book is resized.

```javascript
book.on('resize', (event) => {
  console.log('New dimensions:', event.width, 'x', event.height);
});
```

#### `zoom`
Fired when zoom level changes (if zoom is enabled).

```javascript
book.on('zoom', (event) => {
  console.log('Zoom level:', event.scale);
});
```

## Error Handling

### UnfoldError

Custom error class for Unfold.js specific errors.

```javascript
try {
  book.goToPage(-1); // Invalid page
} catch (error) {
  if (error instanceof UnfoldError) {
    console.error('Unfold error:', error.message);
  }
}
```

### Common Error Types

- `INVALID_CONTAINER` - Container element not found
- `INVALID_PAGE_INDEX` - Page index out of bounds
- `ANIMATION_IN_PROGRESS` - Attempted action during animation
- `INVALID_CONFIGURATION` - Invalid configuration options

## TypeScript Support

Unfold.js includes comprehensive TypeScript definitions:

```typescript
import { Unfold, UnfoldOptions, UnfoldEvent } from 'unfold-js';

const options: UnfoldOptions = {
  width: 800,
  height: 600,
  duration: 1000
};

const book = new Unfold('#container', options);

book.on('pageFlip', (event: UnfoldEvent) => {
  console.log(event.page);
});
```

## Browser Compatibility

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **iOS Safari**: 12+
- **Android Chrome**: 60+

## Performance Considerations

- Use `preloadPages` option for better performance with large books
- Enable hardware acceleration with CSS `transform3d`
- Consider using `will-change` CSS property for animated elements
- Optimize images and content for faster loading

## Migration Guide

### From v0.x to v1.x

```javascript
// Old API (v0.x)
const book = new PageFlip('#container');
book.flip();

// New API (v1.x)
const book = new Unfold('#container');
book.nextPage();
```

See the [Migration Guide](/guides/migration) for detailed upgrade instructions. 