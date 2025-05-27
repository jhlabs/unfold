---
title: Responsive Design
description: Learn how to create responsive page-turn experiences that work on all devices
---

# Responsive Design Guide

Creating responsive page-turn experiences with Unfold.js ensures your books look great and function smoothly across all devices and screen sizes. This guide covers responsive design principles, mobile optimization, and adaptive layouts.

## Responsive Principles

### Mobile-First Approach

Start with mobile designs and progressively enhance for larger screens:

```css
/* Base styles for mobile */
.unfold-container {
  width: 100vw;
  height: 70vh;
  margin: 0;
  border-radius: 0;
}

/* Tablet styles */
@media (min-width: 768px) {
  .unfold-container {
    width: 90vw;
    height: 60vh;
    max-width: 800px;
    margin: 2rem auto;
    border-radius: 8px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .unfold-container {
    width: 80vw;
    height: 70vh;
    max-width: 1200px;
    margin: 3rem auto;
    border-radius: 12px;
  }
}
```

### Flexible Dimensions

Use relative units and viewport dimensions for flexible sizing:

```javascript
// Responsive book initialization
function createResponsiveBook() {
  const container = document.getElementById('book');
  const containerRect = container.getBoundingClientRect();
  
  // Calculate responsive dimensions
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  let width, height;
  
  if (isMobile) {
    width = window.innerWidth;
    height = window.innerHeight * 0.7;
  } else if (isTablet) {
    width = Math.min(window.innerWidth * 0.9, 800);
    height = window.innerHeight * 0.6;
  } else {
    width = Math.min(window.innerWidth * 0.8, 1200);
    height = window.innerHeight * 0.7;
  }
  
  return new Unfold(container, {
    width,
    height,
    autoCenter: true,
    // Mobile-specific options
    dragFlip: true,
    clickFlip: !isMobile, // Disable click on mobile to avoid conflicts
    keyboardNav: !isMobile
  });
}

// Initialize with responsive dimensions
let book = createResponsiveBook();

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    book.destroy();
    book = createResponsiveBook();
  }, 300);
});
```

## Mobile Optimization

### Touch Interactions

Optimize for touch gestures and mobile interactions:

```javascript
class MobileBookController {
  constructor(book) {
    this.book = book;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    this.isScrolling = false;
    
    this.setupTouchHandlers();
  }
  
  setupTouchHandlers() {
    const container = this.book.container;
    
    container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    
    // Prevent default zoom behavior
    container.addEventListener('gesturestart', (e) => e.preventDefault());
    container.addEventListener('gesturechange', (e) => e.preventDefault());
    container.addEventListener('gestureend', (e) => e.preventDefault());
  }
  
  handleTouchStart(event) {
    const touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.touchStartTime = Date.now();
    this.isScrolling = false;
  }
  
  handleTouchMove(event) {
    if (this.isScrolling) return;
    
    const touch = event.touches[0];
    const deltaX = touch.clientX - this.touchStartX;
    const deltaY = touch.clientY - this.touchStartY;
    
    // Determine if this is a horizontal or vertical gesture
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal gesture - prevent scrolling and handle page flip
      event.preventDefault();
      this.showSwipeIndicator(deltaX);
    } else {
      // Vertical gesture - allow scrolling
      this.isScrolling = true;
    }
  }
  
  handleTouchEnd(event) {
    if (this.isScrolling) return;
    
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - this.touchStartX;
    const deltaY = touch.clientY - this.touchStartY;
    const deltaTime = Date.now() - this.touchStartTime;
    
    // Calculate swipe velocity
    const velocity = Math.abs(deltaX) / deltaTime;
    
    // Determine if this is a valid swipe
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const isSignificantSwipe = Math.abs(deltaX) > 50 || velocity > 0.3;
    
    if (isHorizontalSwipe && isSignificantSwipe) {
      if (deltaX > 0) {
        this.book.prevPage();
      } else {
        this.book.nextPage();
      }
    }
    
    this.hideSwipeIndicator();
  }
  
  showSwipeIndicator(deltaX) {
    // Visual feedback for swipe gesture
    const indicator = document.getElementById('swipe-indicator');
    if (indicator) {
      const progress = Math.min(Math.abs(deltaX) / 100, 1);
      const direction = deltaX > 0 ? 'right' : 'left';
      
      indicator.style.opacity = progress;
      indicator.className = `swipe-indicator ${direction}`;
      indicator.textContent = deltaX > 0 ? '← Previous' : 'Next →';
    }
  }
  
  hideSwipeIndicator() {
    const indicator = document.getElementById('swipe-indicator');
    if (indicator) {
      indicator.style.opacity = 0;
    }
  }
}

// Usage
const mobileController = new MobileBookController(book);
```

### Mobile-Specific Styling

```css
/* Mobile-optimized styles */
@media (max-width: 767px) {
  .unfold-container {
    /* Full viewport on mobile */
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    
    /* Optimize for touch */
    touch-action: pan-y pinch-zoom;
    -webkit-overflow-scrolling: touch;
  }
  
  .page-content {
    /* Larger touch targets */
    padding: 1rem;
    font-size: 16px; /* Prevent zoom on iOS */
    line-height: 1.5;
  }
  
  /* Hide elements that don't work well on mobile */
  .desktop-only {
    display: none;
  }
  
  /* Larger buttons for touch */
  .navigation-button {
    min-height: 44px;
    min-width: 44px;
    padding: 12px;
    font-size: 18px;
  }
  
  /* Optimize text for mobile reading */
  .book-typography {
    font-size: 16px;
    line-height: 1.6;
    text-align: left; /* Left-align on mobile for easier reading */
  }
  
  .book-typography h1 {
    font-size: 1.8rem;
    line-height: 1.3;
  }
  
  .book-typography h2 {
    font-size: 1.4rem;
    line-height: 1.4;
  }
  
  /* Single column layout on mobile */
  .layout-two-column,
  .layout-three-column {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Swipe indicator */
.swipe-indicator {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  z-index: 1000;
}

.swipe-indicator.left {
  animation: slideLeft 0.3s ease;
}

.swipe-indicator.right {
  animation: slideRight 0.3s ease;
}

@keyframes slideLeft {
  from { transform: translate(-50%, -50%) translateX(20px); }
  to { transform: translate(-50%, -50%) translateX(0); }
}

@keyframes slideRight {
  from { transform: translate(-50%, -50%) translateX(-20px); }
  to { transform: translate(-50%, -50%) translateX(0); }
}
```

## Adaptive Layouts

### Container Queries (Modern Approach)

Use container queries for component-based responsive design:

```css
/* Container query support */
.unfold-container {
  container-type: inline-size;
}

/* Adapt based on container size, not viewport */
@container (max-width: 600px) {
  .page-content {
    padding: 1rem;
    font-size: 14px;
  }
  
  .layout-two-column {
    grid-template-columns: 1fr;
  }
}

@container (min-width: 601px) and (max-width: 900px) {
  .page-content {
    padding: 1.5rem;
    font-size: 16px;
  }
}

@container (min-width: 901px) {
  .page-content {
    padding: 2rem;
    font-size: 18px;
  }
}
```

### JavaScript-Based Adaptation

Adapt behavior based on device capabilities:

```javascript
class ResponsiveBookAdapter {
  constructor(book) {
    this.book = book;
    this.deviceInfo = this.getDeviceInfo();
    
    this.adaptToDevice();
    this.setupResponsiveListeners();
  }
  
  getDeviceInfo() {
    return {
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
      isDesktop: window.innerWidth >= 1024,
      hasTouch: 'ontouchstart' in window,
      pixelRatio: window.devicePixelRatio || 1,
      orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
    };
  }
  
  adaptToDevice() {
    const { isMobile, isTablet, hasTouch, orientation } = this.deviceInfo;
    
    // Adapt animation duration based on device performance
    const duration = isMobile ? 600 : 800;
    this.book.setDuration(duration);
    
    // Adapt interaction methods
    if (hasTouch) {
      this.book.setOption('dragFlip', true);
      this.book.setOption('clickFlip', false);
    } else {
      this.book.setOption('dragFlip', false);
      this.book.setOption('clickFlip', true);
    }
    
    // Adapt preloading based on device capabilities
    const preloadPages = isMobile ? 1 : 3;
    this.book.setOption('preloadPages', preloadPages);
    
    // Adapt to orientation
    if (isMobile && orientation === 'landscape') {
      this.adaptToLandscape();
    }
  }
  
  adaptToLandscape() {
    // Adjust layout for landscape mobile
    const container = this.book.container;
    container.style.height = '90vh';
    container.style.width = '100vw';
    
    // Show navigation controls in landscape
    this.showLandscapeControls();
  }
  
  setupResponsiveListeners() {
    // Listen for orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.deviceInfo = this.getDeviceInfo();
        this.adaptToDevice();
        this.book.refresh();
      }, 100);
    });
    
    // Listen for resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
  }
  
  handleResize() {
    const oldDeviceInfo = { ...this.deviceInfo };
    this.deviceInfo = this.getDeviceInfo();
    
    // Check if device type changed (e.g., tablet rotated to mobile size)
    const deviceTypeChanged = 
      oldDeviceInfo.isMobile !== this.deviceInfo.isMobile ||
      oldDeviceInfo.isTablet !== this.deviceInfo.isTablet ||
      oldDeviceInfo.isDesktop !== this.deviceInfo.isDesktop;
    
    if (deviceTypeChanged) {
      this.adaptToDevice();
    }
    
    // Always refresh layout
    this.book.refresh();
  }
  
  showLandscapeControls() {
    // Add landscape-specific navigation
    const controls = document.createElement('div');
    controls.className = 'landscape-controls';
    controls.innerHTML = `
      <button class="nav-btn prev-btn">‹</button>
      <button class="nav-btn next-btn">›</button>
    `;
    
    document.body.appendChild(controls);
    
    controls.querySelector('.prev-btn').addEventListener('click', () => {
      this.book.prevPage();
    });
    
    controls.querySelector('.next-btn').addEventListener('click', () => {
      this.book.nextPage();
    });
  }
}

// Usage
const adapter = new ResponsiveBookAdapter(book);
```

## Performance Optimization

### Lazy Loading for Mobile

Implement lazy loading to improve performance on mobile devices:

```javascript
class LazyPageLoader {
  constructor(book) {
    this.book = book;
    this.loadedPages = new Set();
    this.loadingPages = new Set();
    
    this.setupLazyLoading();
  }
  
  setupLazyLoading() {
    this.book.on('pageFlip', (event) => {
      this.loadNearbyPages(event.page);
    });
    
    this.book.on('ready', () => {
      // Load initial page
      this.loadPage(0);
    });
  }
  
  loadNearbyPages(currentPage) {
    const totalPages = this.book.totalPages;
    const isMobile = window.innerWidth < 768;
    const loadRadius = isMobile ? 1 : 2; // Load fewer pages on mobile
    
    for (let i = Math.max(0, currentPage - loadRadius); 
         i <= Math.min(totalPages - 1, currentPage + loadRadius); 
         i++) {
      this.loadPage(i);
    }
  }
  
  async loadPage(pageIndex) {
    if (this.loadedPages.has(pageIndex) || this.loadingPages.has(pageIndex)) {
      return;
    }
    
    this.loadingPages.add(pageIndex);
    
    try {
      const pageElement = this.book.getPage(pageIndex);
      await this.loadPageContent(pageElement, pageIndex);
      
      this.loadedPages.add(pageIndex);
      this.loadingPages.delete(pageIndex);
    } catch (error) {
      console.error(`Failed to load page ${pageIndex}:`, error);
      this.loadingPages.delete(pageIndex);
    }
  }
  
  async loadPageContent(pageElement, pageIndex) {
    // Load images lazily
    const images = pageElement.querySelectorAll('img[data-src]');
    const imagePromises = Array.from(images).map(img => this.loadImage(img));
    
    // Load other content
    const contentPromises = this.loadDynamicContent(pageElement, pageIndex);
    
    await Promise.all([...imagePromises, contentPromises]);
  }
  
  loadImage(img) {
    return new Promise((resolve, reject) => {
      const actualImg = new Image();
      actualImg.onload = () => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        resolve();
      };
      actualImg.onerror = reject;
      actualImg.src = img.dataset.src;
    });
  }
  
  async loadDynamicContent(pageElement, pageIndex) {
    // Load dynamic content from API if needed
    const dynamicElements = pageElement.querySelectorAll('[data-dynamic]');
    
    for (const element of dynamicElements) {
      const contentType = element.dataset.dynamic;
      const content = await this.fetchContent(contentType, pageIndex);
      element.innerHTML = content;
    }
  }
  
  async fetchContent(type, pageIndex) {
    // Implement your content fetching logic
    const response = await fetch(`/api/content/${type}/${pageIndex}`);
    return response.text();
  }
}

// Usage
const lazyLoader = new LazyPageLoader(book);
```

### Image Optimization

Optimize images for different screen densities and sizes:

```html
<!-- Responsive images with srcset -->
<img 
  src="image-800w.jpg"
  srcset="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w,
    image-1600w.jpg 1600w
  "
  sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 90vw,
    80vw
  "
  alt="Responsive image"
  loading="lazy"
/>

<!-- High DPI support -->
<img 
  src="image.jpg"
  srcset="
    image.jpg 1x,
    image@2x.jpg 2x,
    image@3x.jpg 3x
  "
  alt="High DPI image"
/>
```

```css
/* CSS for responsive images */
.page-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  
  /* Optimize for different screen densities */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Placeholder while loading */
.page-image[data-src] {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Accessibility on Mobile

### Screen Reader Support

Ensure your responsive book works with mobile screen readers:

```javascript
class MobileAccessibility {
  constructor(book) {
    this.book = book;
    this.setupAccessibility();
  }
  
  setupAccessibility() {
    // Add ARIA labels and roles
    this.book.container.setAttribute('role', 'application');
    this.book.container.setAttribute('aria-label', 'Interactive book');
    
    // Add page announcements
    this.book.on('pageFlip', (event) => {
      this.announcePageChange(event.page, event.totalPages);
    });
    
    // Add swipe instructions for screen readers
    this.addSwipeInstructions();
  }
  
  announcePageChange(currentPage, totalPages) {
    const announcement = `Page ${currentPage + 1} of ${totalPages}`;
    
    // Create or update live region
    let liveRegion = document.getElementById('page-announcement');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'page-announcement';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = announcement;
  }
  
  addSwipeInstructions() {
    const instructions = document.createElement('div');
    instructions.className = 'sr-only';
    instructions.textContent = 'Swipe left for next page, swipe right for previous page';
    this.book.container.appendChild(instructions);
  }
}

// Usage
const mobileA11y = new MobileAccessibility(book);
```

### Focus Management

Handle focus properly on mobile devices:

```css
/* Focus styles for mobile */
@media (max-width: 767px) {
  .unfold-page:focus {
    outline: 3px solid #007AFF; /* iOS blue */
    outline-offset: 2px;
  }
  
  /* Larger focus targets */
  .navigation-button:focus {
    outline: 3px solid #007AFF;
    outline-offset: 4px;
  }
  
  /* Hide focus outline when using touch */
  .touch-user .unfold-page:focus {
    outline: none;
  }
}
```

```javascript
// Detect touch vs keyboard users
let isUsingTouch = false;

document.addEventListener('touchstart', () => {
  isUsingTouch = true;
  document.body.classList.add('touch-user');
});

document.addEventListener('keydown', () => {
  if (!isUsingTouch) {
    document.body.classList.remove('touch-user');
  }
});
```

## Testing Responsive Design

### Device Testing Checklist

- **iPhone SE (375×667)** - Small mobile screens
- **iPhone 12 (390×844)** - Standard mobile screens  
- **iPad (768×1024)** - Tablet portrait
- **iPad Pro (1024×1366)** - Large tablet
- **Desktop (1920×1080)** - Standard desktop

### Performance Testing

```javascript
// Performance monitoring for responsive design
class ResponsivePerformanceMonitor {
  constructor(book) {
    this.book = book;
    this.metrics = {};
    
    this.startMonitoring();
  }
  
  startMonitoring() {
    // Monitor page flip performance
    this.book.on('flipStart', () => {
      this.metrics.flipStartTime = performance.now();
    });
    
    this.book.on('flipEnd', () => {
      const duration = performance.now() - this.metrics.flipStartTime;
      this.recordMetric('pageFlipDuration', duration);
    });
    
    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        this.recordMetric('memoryUsage', performance.memory.usedJSHeapSize);
      }, 5000);
    }
    
    // Monitor frame rate
    this.monitorFrameRate();
  }
  
  recordMetric(name, value) {
    if (!this.metrics[name]) {
      this.metrics[name] = [];
    }
    
    this.metrics[name].push({
      value,
      timestamp: Date.now(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
    
    // Keep only recent metrics
    if (this.metrics[name].length > 100) {
      this.metrics[name] = this.metrics[name].slice(-50);
    }
  }
  
  monitorFrameRate() {
    let lastTime = performance.now();
    let frameCount = 0;
    
    const measureFPS = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.recordMetric('fps', fps);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }
  
  getPerformanceReport() {
    const report = {};
    
    for (const [metric, values] of Object.entries(this.metrics)) {
      if (values.length > 0) {
        const recentValues = values.slice(-10).map(v => v.value);
        report[metric] = {
          average: recentValues.reduce((a, b) => a + b, 0) / recentValues.length,
          min: Math.min(...recentValues),
          max: Math.max(...recentValues),
          latest: recentValues[recentValues.length - 1]
        };
      }
    }
    
    return report;
  }
}

// Usage
const perfMonitor = new ResponsivePerformanceMonitor(book);
```

## Best Practices

1. **Test on real devices** - Emulators don't always reflect real performance
2. **Optimize for touch** - Make interactive elements at least 44px in size
3. **Consider network conditions** - Implement progressive loading for slower connections
4. **Handle orientation changes** - Test both portrait and landscape modes
5. **Optimize animations** - Reduce animation complexity on lower-end devices
6. **Use appropriate breakpoints** - Base breakpoints on content, not specific devices
7. **Test accessibility** - Ensure screen readers work properly on mobile
8. **Monitor performance** - Track metrics across different devices and conditions

## Next Steps

- Explore [Styling](/guides/styling) for responsive CSS techniques
- Learn about [Events](/guides/events) for handling mobile interactions
- Check out the [Interactive Demo](/examples/interactive) for responsive examples 