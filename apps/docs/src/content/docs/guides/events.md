---
title: Events
description: Learn how to handle events and create interactive experiences with Unfold.js
---

# Events Guide

Unfold.js provides a comprehensive event system that allows you to create rich, interactive experiences. This guide covers all available events, how to use them, and practical examples for building engaging page-turn applications.

## Event System Overview

Unfold.js uses an event-driven architecture similar to the DOM event system. You can listen to events, handle them with custom logic, and even prevent default behaviors in some cases.

### Basic Event Handling

```javascript
import { Unfold } from 'unfold-js';

const book = new Unfold('#my-book');

// Listen to an event
book.on('pageFlip', (event) => {
  console.log('Page flipped to:', event.page);
});

// Listen to an event once
book.once('ready', () => {
  console.log('Book is ready!');
});

// Remove an event listener
const handler = (event) => console.log(event);
book.on('flipStart', handler);
book.off('flipStart', handler);

// Remove all listeners for an event
book.off('pageFlip');
```

## Core Events

### `ready`

Fired when the book is fully initialized and ready for interaction.

```javascript
book.on('ready', (event) => {
  console.log('Book initialized with', event.totalPages, 'pages');
  
  // Safe to call methods now
  book.goToPage(1);
});
```

**Event Object Properties:**
- `totalPages` - Total number of pages
- `currentPage` - Current page index
- `timestamp` - Event timestamp

### `pageFlip`

Fired when a page flip animation completes successfully.

```javascript
book.on('pageFlip', (event) => {
  console.log('Flipped from page', event.previousPage, 'to page', event.page);
  
  // Update UI elements
  updatePageIndicator(event.page, event.totalPages);
  updateNavigationButtons(event.page, event.totalPages);
});
```

**Event Object Properties:**
- `page` - Current page index (0-based)
- `previousPage` - Previous page index
- `totalPages` - Total number of pages
- `direction` - 'forward' or 'backward'
- `timestamp` - Event timestamp

### `flipStart`

Fired when a page flip animation begins.

```javascript
book.on('flipStart', (event) => {
  console.log('Starting flip from', event.from, 'to', event.to);
  
  // Show loading indicator
  showLoadingSpinner();
  
  // Disable navigation during flip
  disableNavigation();
});
```

**Event Object Properties:**
- `from` - Starting page index
- `to` - Target page index
- `direction` - 'forward' or 'backward'
- `timestamp` - Event timestamp

### `flipEnd`

Fired when a page flip animation completes (regardless of success/failure).

```javascript
book.on('flipEnd', (event) => {
  console.log('Flip animation ended');
  
  // Hide loading indicator
  hideLoadingSpinner();
  
  // Re-enable navigation
  enableNavigation();
});
```

**Event Object Properties:**
- `success` - Whether the flip was successful
- `page` - Final page index
- `timestamp` - Event timestamp

### `beforeFlip`

Fired before a page flip begins. Can be prevented.

```javascript
book.on('beforeFlip', (event) => {
  // Check if user has permission to view this page
  if (!canViewPage(event.to)) {
    event.preventDefault();
    showAccessDeniedMessage();
    return;
  }
  
  // Save current page state
  savePageState(event.from);
});
```

**Event Object Properties:**
- `from` - Current page index
- `to` - Target page index
- `direction` - 'forward' or 'backward'
- `preventDefault()` - Method to cancel the flip
- `timestamp` - Event timestamp

## Interaction Events

### `click`

Fired when a page is clicked.

```javascript
book.on('click', (event) => {
  console.log('Clicked on page', event.page);
  console.log('Click position:', event.x, event.y);
  
  // Handle different click areas
  if (event.area === 'left') {
    book.prevPage();
  } else if (event.area === 'right') {
    book.nextPage();
  }
});
```

**Event Object Properties:**
- `page` - Page that was clicked
- `x`, `y` - Click coordinates relative to page
- `area` - 'left', 'right', or 'center'
- `originalEvent` - Original DOM event

### `drag`

Fired during drag interactions.

```javascript
book.on('drag', (event) => {
  console.log('Dragging:', event.deltaX, event.deltaY);
  
  // Show visual feedback
  updateDragIndicator(event.progress);
});
```

**Event Object Properties:**
- `deltaX`, `deltaY` - Drag distance
- `progress` - Drag progress (0-1)
- `direction` - 'horizontal' or 'vertical'
- `originalEvent` - Original DOM event

### `dragStart`

Fired when a drag interaction begins.

```javascript
book.on('dragStart', (event) => {
  console.log('Drag started on page', event.page);
  
  // Show drag hints
  showDragHints();
});
```

### `dragEnd`

Fired when a drag interaction ends.

```javascript
book.on('dragEnd', (event) => {
  console.log('Drag ended with velocity:', event.velocity);
  
  // Hide drag hints
  hideDragHints();
  
  // Trigger flip based on drag distance
  if (event.distance > 100) {
    if (event.direction === 'left') {
      book.nextPage();
    } else if (event.direction === 'right') {
      book.prevPage();
    }
  }
});
```

## Advanced Events

### `zoom`

Fired when zoom level changes (if zoom is enabled).

```javascript
book.on('zoom', (event) => {
  console.log('Zoom level:', event.scale);
  
  // Update zoom controls
  updateZoomSlider(event.scale);
  
  // Show/hide zoom controls based on level
  if (event.scale > 1) {
    showZoomControls();
  } else {
    hideZoomControls();
  }
});
```

**Event Object Properties:**
- `scale` - Current zoom scale (1 = 100%)
- `previousScale` - Previous zoom scale
- `center` - Zoom center point {x, y}

### `pan`

Fired when the view is panned (if pan is enabled).

```javascript
book.on('pan', (event) => {
  console.log('Pan offset:', event.x, event.y);
  
  // Update minimap position
  updateMinimapPosition(event.x, event.y);
});
```

**Event Object Properties:**
- `x`, `y` - Pan offset
- `deltaX`, `deltaY` - Change in pan position

### `resize`

Fired when the book is resized.

```javascript
book.on('resize', (event) => {
  console.log('Resized to:', event.width, 'x', event.height);
  
  // Update responsive elements
  updateResponsiveElements(event.width, event.height);
  
  // Recalculate layouts
  recalculateLayouts();
});
```

**Event Object Properties:**
- `width`, `height` - New dimensions
- `previousWidth`, `previousHeight` - Previous dimensions

## Error Events

### `error`

Fired when an error occurs.

```javascript
book.on('error', (event) => {
  console.error('Unfold.js error:', event.error);
  
  // Show user-friendly error message
  showErrorMessage(event.message);
  
  // Log error for debugging
  logError(event.error, event.context);
});
```

**Event Object Properties:**
- `error` - Error object
- `message` - User-friendly error message
- `context` - Additional context about the error
- `recoverable` - Whether the error is recoverable

## Practical Examples

### Progress Tracking

Track reading progress and save bookmarks:

```javascript
class ProgressTracker {
  constructor(book) {
    this.book = book;
    this.startTime = Date.now();
    this.pageTime = {};
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    this.book.on('pageFlip', (event) => {
      // Track time spent on previous page
      if (event.previousPage !== undefined) {
        const timeSpent = Date.now() - this.pageStartTime;
        this.pageTime[event.previousPage] = timeSpent;
      }
      
      // Start timing current page
      this.pageStartTime = Date.now();
      
      // Update progress
      this.updateProgress(event.page, event.totalPages);
      
      // Auto-save bookmark
      this.saveBookmark(event.page);
    });
    
    this.book.on('ready', (event) => {
      this.pageStartTime = Date.now();
      this.loadBookmark();
    });
  }
  
  updateProgress(currentPage, totalPages) {
    const progress = ((currentPage + 1) / totalPages) * 100;
    
    // Update progress bar
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
    
    // Update page counter
    document.getElementById('page-counter').textContent = `${currentPage + 1} / ${totalPages}`;
  }
  
  saveBookmark(page) {
    localStorage.setItem('bookmark', JSON.stringify({
      page,
      timestamp: Date.now(),
      sessionTime: Date.now() - this.startTime
    }));
  }
  
  loadBookmark() {
    const bookmark = JSON.parse(localStorage.getItem('bookmark') || 'null');
    if (bookmark) {
      this.book.goToPage(bookmark.page);
    }
  }
  
  getReadingStats() {
    return {
      totalTime: Date.now() - this.startTime,
      pageTime: this.pageTime,
      averagePageTime: Object.values(this.pageTime).reduce((a, b) => a + b, 0) / Object.keys(this.pageTime).length
    };
  }
}

// Usage
const tracker = new ProgressTracker(book);
```

### Interactive Navigation

Create a sophisticated navigation system:

```javascript
class BookNavigation {
  constructor(book) {
    this.book = book;
    this.history = [];
    this.historyIndex = -1;
    
    this.setupEventListeners();
    this.createNavigationUI();
  }
  
  setupEventListeners() {
    this.book.on('pageFlip', (event) => {
      // Add to history if it's a user-initiated navigation
      if (!this.isHistoryNavigation) {
        this.addToHistory(event.page);
      }
      
      this.updateNavigationState();
    });
    
    this.book.on('beforeFlip', (event) => {
      // Validate navigation
      if (!this.canNavigateToPage(event.to)) {
        event.preventDefault();
        this.showNavigationError(event.to);
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.book.prevPage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.book.nextPage();
          break;
        case 'Home':
          event.preventDefault();
          this.book.goToFirstPage();
          break;
        case 'End':
          event.preventDefault();
          this.book.goToLastPage();
          break;
        case 'Backspace':
          event.preventDefault();
          this.goBack();
          break;
      }
    });
  }
  
  addToHistory(page) {
    // Remove any forward history
    this.history = this.history.slice(0, this.historyIndex + 1);
    
    // Add new page
    this.history.push(page);
    this.historyIndex = this.history.length - 1;
    
    // Limit history size
    if (this.history.length > 50) {
      this.history.shift();
      this.historyIndex--;
    }
  }
  
  goBack() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.isHistoryNavigation = true;
      this.book.goToPage(this.history[this.historyIndex]);
      this.isHistoryNavigation = false;
    }
  }
  
  goForward() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.isHistoryNavigation = true;
      this.book.goToPage(this.history[this.historyIndex]);
      this.isHistoryNavigation = false;
    }
  }
  
  canNavigateToPage(page) {
    // Add your navigation logic here
    // For example, check user permissions, page availability, etc.
    return true;
  }
  
  updateNavigationState() {
    const backBtn = document.getElementById('back-btn');
    const forwardBtn = document.getElementById('forward-btn');
    
    backBtn.disabled = this.historyIndex <= 0;
    forwardBtn.disabled = this.historyIndex >= this.history.length - 1;
  }
  
  createNavigationUI() {
    // Create navigation controls
    const nav = document.createElement('div');
    nav.className = 'book-navigation';
    nav.innerHTML = `
      <button id="back-btn">← Back</button>
      <button id="forward-btn">Forward →</button>
      <button id="first-btn">⏮ First</button>
      <button id="last-btn">Last ⏭</button>
      <input type="number" id="page-input" min="1" placeholder="Go to page...">
    `;
    
    document.body.appendChild(nav);
    
    // Add event listeners
    document.getElementById('back-btn').addEventListener('click', () => this.goBack());
    document.getElementById('forward-btn').addEventListener('click', () => this.goForward());
    document.getElementById('first-btn').addEventListener('click', () => this.book.goToFirstPage());
    document.getElementById('last-btn').addEventListener('click', () => this.book.goToLastPage());
    
    document.getElementById('page-input').addEventListener('change', (e) => {
      const page = parseInt(e.target.value) - 1;
      if (page >= 0 && page < this.book.totalPages) {
        this.book.goToPage(page);
      }
    });
  }
}

// Usage
const navigation = new BookNavigation(book);
```

### Analytics and Insights

Track user behavior and reading patterns:

```javascript
class BookAnalytics {
  constructor(book) {
    this.book = book;
    this.events = [];
    this.sessionStart = Date.now();
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Track all events
    const eventTypes = ['pageFlip', 'click', 'drag', 'zoom', 'pan'];
    
    eventTypes.forEach(eventType => {
      this.book.on(eventType, (event) => {
        this.trackEvent(eventType, event);
      });
    });
    
    // Track session end
    window.addEventListener('beforeunload', () => {
      this.endSession();
    });
  }
  
  trackEvent(type, data) {
    const event = {
      type,
      timestamp: Date.now(),
      sessionTime: Date.now() - this.sessionStart,
      data: { ...data }
    };
    
    this.events.push(event);
    
    // Send to analytics service (debounced)
    this.debouncedSend();
  }
  
  debouncedSend = this.debounce(() => {
    this.sendToAnalytics();
  }, 5000);
  
  sendToAnalytics() {
    // Send events to your analytics service
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        events: this.events,
        sessionId: this.sessionId,
        userId: this.userId
      })
    });
    
    // Clear sent events
    this.events = [];
  }
  
  getInsights() {
    const totalTime = Date.now() - this.sessionStart;
    const pageFlips = this.events.filter(e => e.type === 'pageFlip');
    const clicks = this.events.filter(e => e.type === 'click');
    
    return {
      sessionDuration: totalTime,
      totalPageFlips: pageFlips.length,
      totalClicks: clicks.length,
      averageTimePerPage: totalTime / (pageFlips.length || 1),
      readingSpeed: pageFlips.length / (totalTime / 60000), // pages per minute
      interactionRate: clicks.length / (totalTime / 1000) // clicks per second
    };
  }
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  endSession() {
    this.trackEvent('sessionEnd', this.getInsights());
    this.sendToAnalytics();
  }
}

// Usage
const analytics = new BookAnalytics(book);
```

## Best Practices

1. **Use event delegation** - Attach listeners to the book instance, not individual pages
2. **Clean up listeners** - Remove event listeners when they're no longer needed
3. **Handle errors gracefully** - Always listen for error events
4. **Debounce frequent events** - Use debouncing for events like `drag` and `pan`
5. **Prevent default carefully** - Only prevent default behaviors when necessary
6. **Keep handlers lightweight** - Avoid heavy computations in event handlers
7. **Use once() for initialization** - Use `once()` for events that should only fire once

## Event Reference

| Event | Cancelable | Frequency | Use Case |
|-------|------------|-----------|----------|
| `ready` | No | Once | Initialization |
| `beforeFlip` | Yes | Per flip | Validation |
| `flipStart` | No | Per flip | UI feedback |
| `flipEnd` | No | Per flip | Cleanup |
| `pageFlip` | No | Per flip | State updates |
| `click` | No | Per click | Interaction |
| `drag` | No | Continuous | Visual feedback |
| `zoom` | No | Per zoom | UI updates |
| `pan` | No | Continuous | Position tracking |
| `resize` | No | Per resize | Layout updates |
| `error` | No | As needed | Error handling |

## Next Steps

- Learn about [Responsive Design](/guides/responsive) for mobile-optimized events
- Explore [Styling](/guides/styling) to create visual feedback for events
- Check out the [Interactive Demo](/examples/interactive) for advanced event usage 