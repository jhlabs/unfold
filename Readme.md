# Unfold

Include beautiful, modern page-turn animations in your project. Unfold is a TypeScript-first library designed for optimal performance and ease of use with contemporary browser features.

Inspired by the classic turn.js, Unfold offers a revamped API, leveraging modern CSS for animations and providing a flexible and powerful way to create digital books, magazines, and brochures.

## Features

*   **Modern Stack:** Built with TypeScript and leveraging modern CSS for animations (e.g., CSS transitions/animations).
*   **Lightweight & Performant:** Designed to be efficient with minimal dependencies.
*   **Responsive:** Adapts to different screen sizes.
*   **Touch-Friendly:** Smooth interaction on mobile devices.
*   **Customizable:** Extensive options for tailoring the look and feel.
*   **Developer-Friendly API:** Intuitive and easy to integrate.
*   **Accessibility:** Built with accessibility in mind.

## Installation

```bash
npm install unfold-js # Or yarn add unfold-js
```

## Quick Start

**HTML Structure:**

Set up your HTML with a container element and individual page elements.

```html
<div id="myBook">
  <div class="page">Page 1</div>
  <div class="page">Page 2</div>
  <div class="page"><img src="path/to/your/image.jpg" alt="Page 3 content" /></div>
  <div class="page">Page 4</div>
  <div class="hard-cover">Front Cover</div>
  <div class="hard-cover">Back Cover</div>
</div>
```

**JavaScript/TypeScript:**

Initialize Unfold on your container element.

```typescript
import { unfold } from 'unfold-js'; // Assuming unfold is a named export
import 'unfold-js/dist/unfold.css'; // Import default styles

const bookElement = document.getElementById('myBook');

if (bookElement) {
  const myBook = unfold(bookElement, { // Changed from new Unfold()
    width: 800, // Desired width of the open book
    height: 600, // Desired height of the book
    startingPage: 1,
    pageSelector: '.page', // Selector for regular pages
    hardCoverSelector: '.hard-cover', // Optional selector for hard cover pages
    autoCenter: true,
    // ... other options
  });

  // Programmatic navigation
  // myBook.nextPage();
}
```

## API Documentation

### Initialization Function

`unfold(element: HTMLElement, options?: UnfoldOptions): UnfoldInstance`

Initializes a new Unfold instance on the provided HTML element and returns an `UnfoldInstance` object.
This instance object contains all the methods and properties to interact with and control the book.

*   `element`: The container HTML element for the book.
*   `options` (optional): An object with configuration options.

### `UnfoldInstance`

The object returned by the `unfold()` function. It exposes the following properties and methods:

### Options (`UnfoldOptions`)

These options are passed to the `unfold()` function during initialization. They can also be partially updated using the `updateOptions` method on the `UnfoldInstance`.

| Option              | Type                         | Default        | Description                                                                                                |
| ------------------- | ---------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------- |
| `width`             | `number`                     | `undefined`    | The width of the open book (two pages). If not set, it might try to infer from the container.             |
| `height`            | `number`                     | `undefined`    | The height of a single page. If not set, it might try to infer from the container.                       |
| `startingPage`      | `number`                     | `1`            | The page number to display initially.                                                                      |
| `pageSelector`      | `string`                     | `'.unfold-page'` | CSS selector for identifying page elements within the container.                                           |
| `hardCoverSelector` | `string \| null`             | `null`         | CSS selector for identifying hard cover pages. Hard covers might have different turning behavior.        |
| `autoCenter`        | `boolean`                    | `true`         | Automatically centers the book within its container.                                                       |
| `direction`         | `'ltr' \| 'rtl'`             | `'ltr'`        | Reading direction: Left-to-Right or Right-to-Left.                                                         |
| `speed`             | `number`                     | `500`          | Duration of the page turn animation in milliseconds.                                                       |
| `acceleration`      | `boolean`                    | `true`         | Enables hardware acceleration for smoother animations (e.g., using `transform: translateZ(0)`).            |
| `shadows`           | `boolean`                    | `true`         | Display shadows to give a 3D effect during page turns.                                                     |
| `gradients`         | `boolean`                    | `true`         | Display gradients on page folds.                                                                           |
| `padding`           | `{ top: number, right: number, bottom: number, left: number }` | `{ top: 10, right: 10, bottom: 10, left: 10 }` | Padding around the book content within each page. Numbers are pixel values. |
| `responsive`        | `boolean`                    | `true`         | Enables responsive recalculation of dimensions on window resize.                                             |
| `zoom`              | `object`                     | `undefined`    | Configuration for zoom functionality (e.g., `{ max: 2, doubleTap: true }`). See Zoom section.          |
| `pageArrangement`   | `'double' \| 'single'`     | `'double'`     | How pages are displayed ('double' for two-page spread, 'single' for one page at a time like on mobile).  |
| `singlePageModeBreakpoint` | `number \| null`      | `768`          | Viewport width in pixels below which the library switches to `single` page arrangement automatically. Set to `null` to disable. |

### Properties (on `UnfoldInstance`)

| Property        | Type                      | Description                                                                                             |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `currentPage`   | `number`                  | Gets the current visible page number (left-most page in a two-page spread).                             |
| `totalPages`    | `number`                  | Gets the total number of pages detected.                                                                  |
| `isFirstPage`   | `boolean`                 | Returns `true` if the current view is the first page.                                                     |
| `isLastPage`    | `boolean`                 | Returns `true` if the current view is the last page.                                                      |
| `options`       | `Readonly<UnfoldOptions>` | The current configuration options for the instance.                                                       |
| `element`       | `HTMLElement`             | The root HTML element the Unfold instance is bound to.                                                    |
| `isAnimating`   | `boolean`                 | Returns `true` if a page turn animation is currently in progress.                                         |
| `currentSpread` | `[HTMLElement \| null, HTMLElement \| null]` | An array containing the DOM elements for the currently visible left and right pages. `null` if a page is not present (e.g., at the beginning or end of a single-page layout book). |


### Methods (on `UnfoldInstance`)

*   **`nextPage(): void`**
    Turns to the next page or spread.

*   **`previousPage(): void`**
    Turns to the previous page or spread.

*   **`goToPage(pageNumber: number): void`**
    Turns to the specified page number. The `pageNumber` refers to the logical page in the book.

*   **`addPage(element: HTMLElement, index?: number): void`**
    Dynamically adds a new page.
    *   `element`: The HTML element for the new page.
    *   `index` (optional): The 0-based position where the page should be inserted. If omitted, it's added at the end.

*   **`removePage(pageNumberOrElement: number | HTMLElement): boolean`**
    Removes a page.
    *   `pageNumberOrElement`: The logical page number or the HTML element of the page to remove.
    *   Returns `true` if the page was successfully removed, `false` otherwise.

*   **`updateOptions(newOptions: Partial<UnfoldOptions>): void`**
    Updates the instance with new options. Only provided options are updated; others remain unchanged. Some options might require a redraw or re-layout.

*   **`on(eventName: UnfoldEvent, handler: Function): void`**
    Subscribes to an Unfold event.
    *   `eventName`: The name of the event to listen for.
    *   `handler`: The callback function to execute when the event occurs.

*   **`off(eventName: UnfoldEvent, handler: Function): void`**
    Unsubscribes from an Unfold event.
    *   `eventName`: The name of the event.
    *   `handler`: The specific callback function to remove.

*   **`resize(): void`**
    Manually triggers a recalculation of the book's dimensions and layout. Useful if the container size changes programmatically.

*   **`destroy(): void`**
    Removes the Unfold effects, cleans up event listeners, and reverts DOM modifications. The `UnfoldInstance` object should no longer be used after calling destroy.

### Events (`UnfoldEvent`)

You can listen to these events using the `on(eventName, handler)` method on the `UnfoldInstance`.

| Event Name        | Payload                                     | Description                                                                                                 |
| ----------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `turnStart`       | `{ from: number, to: number }`              | Fired when a page turn animation begins. `from` is the current page, `to` is the target page.                 |
| `turnEnd`         | `{ page: number, spread: [HTMLElement?, HTMLElement?] }` | Fired when a page turn animation completes. `page` is the new current page. `spread` contains the DOM elements of the new visible pages. |
| `firstPage`       | `{ page: number }`                          | Fired when the view reaches the first page.                                                                   |
| `lastPage`        | `{ page: number }`                          | Fired when the view reaches the last page.                                                                    |
| `pageAdded`       | `{ element: HTMLElement, index: number }`   | Fired after a page has been successfully added.                                                             |
| `pageRemoved`     | `{ oldIndex: number }`                      | Fired after a page has been successfully removed. `oldIndex` is the previous logical index of the removed page. |
| `zoomStart`       | `{ scale: number }`                         | Fired when zoom begins.                                                                                     |
| `zoomEnd`         | `{ scale: number }`                         | Fired when zoom ends.                                                                                       |
| `layoutChange`    | `{ pageArrangement: 'single' \| 'double' }` | Fired when the page arrangement changes (e.g., due to responsive breakpoint).                             |
| `destroy`         | `void`                                      | Fired when `destroy()` is called on the instance.                                                                       |

### Styling

Unfold will come with a base CSS file (`unfold.css`) that provides essential styling for the page structure and animations. You can override these styles or extend them.

Key CSS classes that will be applied:

*   `.unfold-container`: Applied to the main element you initialize Unfold on.
*   `.unfold-page`: Applied to detected page elements.
*   `.unfold-page-left`: Applied to the left page in a spread.
*   `.unfold-page-right`: Applied to the right page in a spread.
*   `.unfold-hard-cover`: Applied to elements identified as hard covers.
*   `.unfold-current-page`: Might be applied to pages currently in view or active.
*   `.unfold-turning`: Applied to a page while it's animating.
*   `.unfold-shadow-forward`, `.unfold-shadow-backward`: Classes for controlling shadow appearance during turns.

We plan to use CSS Custom Properties (Variables) for easy theming of colors, shadow intensity, etc., where appropriate.

Example:
```css
/* Your custom styles */
.unfold-container {
  /* Custom container styles if needed */
}

#myBook .page {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
}

#myBook .hard-cover {
  background-color: #333;
  color: white;
  font-weight: bold;
}
```

## Advanced Usage

### Dynamic Content Loading

Unfold will support adding pages dynamically. You can fetch content via AJAX/Fetch and then use `myBook.addPage(newPageElement)` to append it (where `myBook` is your `UnfoldInstance`).

### Zooming

(Details to be fleshed out - could involve integrating with a small, dedicated zoom library or providing basic pinch-zoom/double-tap-zoom on touch devices and scroll-wheel zoom on desktop.)

### Right-to-Left (RTL) Support

Set the `direction: 'rtl'` option during initialization to enable RTL page turning and layout.

## Contributing

(Details on how to contribute, build setup, tests, etc., will be added once the project structure is in place.)

## License

(To be decided - likely MIT or similar permissive license.)
