---
title: Basic Book
description: A simple book example with page-turn animations
---

# Basic Book Example

This example demonstrates how to create a simple book with basic page-turn animations using Unfold.js.

## Live Demo

<div class="demo-container">
  <div id="basic-book" class="book-demo">
    <!-- Demo will be rendered here -->
  </div>
</div>

## HTML Structure

```html
<div class="book-container">
  <div class="book" id="basic-book">
    <div class="page cover-page">
      <div class="page-content">
        <h1>My Book Title</h1>
        <p>By Author Name</p>
      </div>
    </div>
    
    <div class="page">
      <div class="page-content">
        <h2>Chapter 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </div>
    </div>
    
    <div class="page">
      <div class="page-content">
        <h2>Chapter 2</h2>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
      </div>
    </div>
    
    <div class="page">
      <div class="page-content">
        <h2>Chapter 3</h2>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco...</p>
      </div>
    </div>
    
    <div class="page back-cover">
      <div class="page-content">
        <h3>The End</h3>
        <p>Thank you for reading!</p>
      </div>
    </div>
  </div>
  
  <div class="controls">
    <button id="prev-btn">← Previous</button>
    <button id="next-btn">Next →</button>
  </div>
</div>
```

## CSS Styling

```css
.book-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
}

.book {
  width: 600px;
  height: 400px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.page {
  width: 100%;
  height: 100%;
  background: #fff;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
}

.page-content {
  padding: 40px;
  text-align: center;
  max-width: 80%;
}

.cover-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.back-cover {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.controls {
  display: flex;
  gap: 10px;
}

.controls button {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.controls button:hover {
  background: #5a6fd8;
}

.controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
```

## JavaScript Implementation

```javascript
import { Unfold } from 'unfold-js';

// Initialize the book
const book = new Unfold('#basic-book', {
  width: 600,
  height: 400,
  autoCenter: true,
  shadow: true,
  hardCover: true,
  duration: 800,
  easing: 'ease-in-out'
});

// Get control buttons
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Add navigation event listeners
prevBtn.addEventListener('click', () => {
  book.prevPage();
});

nextBtn.addEventListener('click', () => {
  book.nextPage();
});

// Update button states based on current page
function updateButtons() {
  prevBtn.disabled = book.currentPage === 0;
  nextBtn.disabled = book.currentPage === book.totalPages - 1;
}

// Listen to page change events
book.on('pageFlip', (event) => {
  console.log(`Current page: ${event.page}`);
  updateButtons();
});

// Initial button state
updateButtons();

// Optional: Add keyboard navigation
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    book.prevPage();
  } else if (event.key === 'ArrowRight') {
    book.nextPage();
  }
});
```

## Key Features Demonstrated

- **Basic page structure** with cover and content pages
- **Navigation controls** with previous/next buttons
- **Keyboard navigation** using arrow keys
- **Button state management** to disable when at first/last page
- **Event handling** to respond to page changes
- **Custom styling** for different page types

## Customization Options

You can customize this example by:

- Changing the book dimensions
- Modifying the animation duration and easing
- Adding more pages with different content
- Implementing custom page designs
- Adding sound effects or other interactions

## Next Steps

- Try the [Magazine Layout](/examples/magazine) example for a more complex design
- Explore the [Interactive Demo](/examples/interactive) for advanced features
- Learn about [Styling](/guides/styling) to customize the appearance further 