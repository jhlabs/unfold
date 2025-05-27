---
title: Interactive Demo
description: Advanced interactive features and animations with Unfold.js
---

# Interactive Demo

This example showcases advanced interactive features including custom animations, sound effects, and dynamic content loading with Unfold.js.

## Live Demo

<div class="demo-container">
  <div id="interactive-book" class="interactive-demo">
    <!-- Demo will be rendered here -->
  </div>
</div>

## Advanced Features

- **Custom page transitions** with different animation styles
- **Sound effects** for page turns and interactions
- **Dynamic content loading** from external sources
- **Interactive elements** like buttons, forms, and media
- **Progress tracking** and bookmarking
- **Zoom and pan** functionality
- **Fullscreen mode** support

## HTML Structure

```html
<div class="interactive-container">
  <div class="book-wrapper">
    <div class="book" id="interactive-book">
      <!-- Dynamic pages will be loaded here -->
    </div>
    
    <!-- Overlay controls -->
    <div class="book-controls">
      <button id="fullscreen-btn" title="Toggle Fullscreen">⛶</button>
      <button id="sound-btn" title="Toggle Sound">🔊</button>
      <button id="bookmark-btn" title="Bookmark Page">🔖</button>
    </div>
    
    <!-- Progress bar -->
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" id="progress-fill"></div>
      </div>
      <span class="progress-text" id="progress-text">0%</span>
    </div>
  </div>
  
  <!-- Side panel -->
  <div class="side-panel">
    <div class="panel-section">
      <h3>Animation Style</h3>
      <select id="animation-select">
        <option value="default">Default</option>
        <option value="curl">Page Curl</option>
        <option value="fold">Accordion Fold</option>
        <option value="slide">Slide</option>
        <option value="fade">Fade</option>
      </select>
    </div>
    
    <div class="panel-section">
      <h3>Speed</h3>
      <input type="range" id="speed-slider" min="200" max="2000" value="800" />
      <span id="speed-value">800ms</span>
    </div>
    
    <div class="panel-section">
      <h3>Bookmarks</h3>
      <div id="bookmarks-list">
        <!-- Bookmarks will be populated here -->
      </div>
    </div>
    
    <div class="panel-section">
      <h3>Table of Contents</h3>
      <div id="toc-list">
        <!-- TOC will be populated here -->
      </div>
    </div>
  </div>
  
  <!-- Navigation -->
  <div class="navigation">
    <button id="first-page">⏮</button>
    <button id="prev-page">◀</button>
    <input type="number" id="page-input" min="1" />
    <span id="total-pages">/ 0</span>
    <button id="next-page">▶</button>
    <button id="last-page">⏭</button>
  </div>
</div>
```

## Advanced CSS

```css
.interactive-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  padding: 20px;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.book-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.book {
  width: 800px;
  height: 600px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

/* Overlay Controls */
.book-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 100;
}

.book-controls button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.book-controls button:hover {
  background: white;
  transform: scale(1.1);
}

/* Progress Bar */
.progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 800px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
  border-radius: 3px;
}

.progress-text {
  color: white;
  font-weight: bold;
  min-width: 40px;
}

/* Side Panel */
.side-panel {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
  max-height: 80vh;
  overflow-y: auto;
}

.panel-section {
  margin-bottom: 30px;
}

.panel-section h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
}

.panel-section select,
.panel-section input[type="range"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

#speed-value {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  display: block;
}

/* Bookmarks and TOC */
.bookmark-item,
.toc-item {
  padding: 8px 12px;
  margin: 5px 0;
  background: #f5f5f5;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.bookmark-item:hover,
.toc-item:hover {
  background: #e0e0e0;
}

.bookmark-item .page-num,
.toc-item .page-num {
  font-weight: bold;
  color: #667eea;
  margin-right: 10px;
}

/* Navigation */
.navigation {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px 20px;
  border-radius: 25px;
}

.navigation button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #667eea;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
}

.navigation button:hover:not(:disabled) {
  background: #5a6fd8;
  transform: scale(1.1);
}

.navigation button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

#page-input {
  width: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}

/* Page Styles */
.page {
  width: 100%;
  height: 100%;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.page-content {
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Interactive Elements */
.interactive-element {
  margin: 20px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 2px solid #e9ecef;
}

.quiz-question {
  margin-bottom: 15px;
  font-weight: bold;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quiz-option {
  padding: 10px 15px;
  background: white;
  border: 2px solid #dee2e6;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quiz-option:hover {
  border-color: #667eea;
  background: #f8f9ff;
}

.quiz-option.correct {
  border-color: #28a745;
  background: #d4edda;
}

.quiz-option.incorrect {
  border-color: #dc3545;
  background: #f8d7da;
}

/* Fullscreen styles */
.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: #000;
}

.fullscreen .book {
  width: 90vw;
  height: 90vh;
  max-width: 1200px;
  max-height: 800px;
}
```

## Advanced JavaScript

```javascript
import { Unfold } from 'unfold-js';

class InteractiveBook {
  constructor() {
    this.book = null;
    this.soundEnabled = true;
    this.bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    this.currentAnimation = 'default';
    this.pages = [];
    
    this.init();
  }
  
  async init() {
    // Load page content
    await this.loadPages();
    
    // Initialize the book
    this.book = new Unfold('#interactive-book', {
      width: 800,
      height: 600,
      autoCenter: true,
      shadow: true,
      duration: 800,
      easing: 'ease-in-out',
      // Custom animation callbacks
      onFlipStart: this.onFlipStart.bind(this),
      onFlipEnd: this.onFlipEnd.bind(this),
      // Enable advanced features
      zoom: true,
      pan: true,
      preloadPages: 3
    });
    
    this.setupEventListeners();
    this.updateUI();
    this.renderBookmarks();
    this.renderTOC();
  }
  
  async loadPages() {
    // Simulate loading pages from an API
    const pageData = [
      { title: 'Welcome', type: 'cover', content: this.generateCoverPage() },
      { title: 'Introduction', type: 'text', content: this.generateTextPage('Introduction', 'Welcome to our interactive book...') },
      { title: 'Quiz 1', type: 'interactive', content: this.generateQuizPage() },
      { title: 'Gallery', type: 'media', content: this.generateGalleryPage() },
      { title: 'Form', type: 'interactive', content: this.generateFormPage() },
      { title: 'Conclusion', type: 'text', content: this.generateTextPage('Conclusion', 'Thank you for reading...') }
    ];
    
    this.pages = pageData;
    
    // Populate the book container
    const bookContainer = document.getElementById('interactive-book');
    bookContainer.innerHTML = '';
    
    pageData.forEach((page, index) => {
      const pageElement = document.createElement('div');
      pageElement.className = 'page';
      pageElement.innerHTML = page.content;
      pageElement.dataset.pageIndex = index;
      bookContainer.appendChild(pageElement);
    });
  }
  
  generateCoverPage() {
    return `
      <div class="page-content cover-page">
        <h1>Interactive Book Demo</h1>
        <p>Explore advanced features of Unfold.js</p>
        <div class="cover-animation">
          <div class="floating-elements">
            <span>📚</span>
            <span>✨</span>
            <span>🎯</span>
          </div>
        </div>
      </div>
    `;
  }
  
  generateTextPage(title, content) {
    return `
      <div class="page-content">
        <h2>${title}</h2>
        <p>${content}</p>
        <div class="interactive-element">
          <button onclick="this.style.background='#4CAF50'; this.textContent='Clicked!'">
            Click me!
          </button>
        </div>
      </div>
    `;
  }
  
  generateQuizPage() {
    return `
      <div class="page-content">
        <h2>Interactive Quiz</h2>
        <div class="interactive-element">
          <div class="quiz-question">What is Unfold.js?</div>
          <div class="quiz-options">
            <div class="quiz-option" onclick="this.classList.add('incorrect')">
              A CSS framework
            </div>
            <div class="quiz-option" onclick="this.classList.add('correct')">
              A page-turn animation library
            </div>
            <div class="quiz-option" onclick="this.classList.add('incorrect')">
              A backend framework
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  generateGalleryPage() {
    return `
      <div class="page-content">
        <h2>Image Gallery</h2>
        <div class="gallery-grid">
          <div class="gallery-item" onclick="this.classList.toggle('expanded')">
            <div class="placeholder-image">🖼️ Image 1</div>
          </div>
          <div class="gallery-item" onclick="this.classList.toggle('expanded')">
            <div class="placeholder-image">🖼️ Image 2</div>
          </div>
          <div class="gallery-item" onclick="this.classList.toggle('expanded')">
            <div class="placeholder-image">🖼️ Image 3</div>
          </div>
        </div>
      </div>
    `;
  }
  
  generateFormPage() {
    return `
      <div class="page-content">
        <h2>Interactive Form</h2>
        <div class="interactive-element">
          <form onsubmit="event.preventDefault(); alert('Form submitted!');">
            <div class="form-group">
              <label>Name:</label>
              <input type="text" required />
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    `;
  }
  
  setupEventListeners() {
    // Animation style selector
    document.getElementById('animation-select').addEventListener('change', (e) => {
      this.currentAnimation = e.target.value;
      this.book.setAnimation(e.target.value);
    });
    
    // Speed slider
    const speedSlider = document.getElementById('speed-slider');
    const speedValue = document.getElementById('speed-value');
    
    speedSlider.addEventListener('input', (e) => {
      const speed = e.target.value;
      speedValue.textContent = `${speed}ms`;
      this.book.setDuration(parseInt(speed));
    });
    
    // Navigation buttons
    document.getElementById('first-page').addEventListener('click', () => this.book.goToPage(0));
    document.getElementById('prev-page').addEventListener('click', () => this.book.prevPage());
    document.getElementById('next-page').addEventListener('click', () => this.book.nextPage());
    document.getElementById('last-page').addEventListener('click', () => this.book.goToPage(this.book.totalPages - 1));
    
    // Page input
    document.getElementById('page-input').addEventListener('change', (e) => {
      const page = parseInt(e.target.value) - 1;
      if (page >= 0 && page < this.book.totalPages) {
        this.book.goToPage(page);
      }
    });
    
    // Control buttons
    document.getElementById('fullscreen-btn').addEventListener('click', () => this.toggleFullscreen());
    document.getElementById('sound-btn').addEventListener('click', () => this.toggleSound());
    document.getElementById('bookmark-btn').addEventListener('click', () => this.addBookmark());
    
    // Book events
    this.book.on('pageFlip', (event) => {
      this.updateProgress();
      this.updateNavigation();
      this.playSound('page-turn');
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'f' || e.key === 'F') this.toggleFullscreen();
      if (e.key === 'm' || e.key === 'M') this.toggleSound();
      if (e.key === 'b' || e.key === 'B') this.addBookmark();
    });
  }
  
  onFlipStart(event) {
    // Add custom animation effects
    const currentPage = event.currentPage;
    if (currentPage) {
      currentPage.style.filter = 'brightness(0.8)';
    }
  }
  
  onFlipEnd(event) {
    // Reset effects
    const currentPage = event.currentPage;
    if (currentPage) {
      currentPage.style.filter = '';
    }
  }
  
  updateProgress() {
    const progress = ((this.book.currentPage + 1) / this.book.totalPages) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
  }
  
  updateNavigation() {
    const current = this.book.currentPage;
    const total = this.book.totalPages;
    
    document.getElementById('page-input').value = current + 1;
    document.getElementById('total-pages').textContent = `/ ${total}`;
    
    document.getElementById('first-page').disabled = current === 0;
    document.getElementById('prev-page').disabled = current === 0;
    document.getElementById('next-page').disabled = current === total - 1;
    document.getElementById('last-page').disabled = current === total - 1;
  }
  
  updateUI() {
    this.updateProgress();
    this.updateNavigation();
  }
  
  toggleFullscreen() {
    const container = document.querySelector('.interactive-container');
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      container.classList.add('fullscreen');
    } else {
      document.exitFullscreen();
      container.classList.remove('fullscreen');
    }
  }
  
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    const btn = document.getElementById('sound-btn');
    btn.textContent = this.soundEnabled ? '🔊' : '🔇';
  }
  
  playSound(type) {
    if (!this.soundEnabled) return;
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'page-turn') {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }
  
  addBookmark() {
    const currentPage = this.book.currentPage;
    const pageTitle = this.pages[currentPage]?.title || `Page ${currentPage + 1}`;
    
    const bookmark = {
      page: currentPage,
      title: pageTitle,
      timestamp: Date.now()
    };
    
    // Avoid duplicates
    if (!this.bookmarks.find(b => b.page === currentPage)) {
      this.bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
      this.renderBookmarks();
    }
  }
  
  renderBookmarks() {
    const container = document.getElementById('bookmarks-list');
    container.innerHTML = '';
    
    this.bookmarks.forEach(bookmark => {
      const item = document.createElement('div');
      item.className = 'bookmark-item';
      item.innerHTML = `
        <span class="page-num">${bookmark.page + 1}</span>
        <span class="title">${bookmark.title}</span>
      `;
      item.addEventListener('click', () => this.book.goToPage(bookmark.page));
      container.appendChild(item);
    });
  }
  
  renderTOC() {
    const container = document.getElementById('toc-list');
    container.innerHTML = '';
    
    this.pages.forEach((page, index) => {
      const item = document.createElement('div');
      item.className = 'toc-item';
      item.innerHTML = `
        <span class="page-num">${index + 1}</span>
        <span class="title">${page.title}</span>
      `;
      item.addEventListener('click', () => this.book.goToPage(index));
      container.appendChild(item);
    });
  }
}

// Initialize the interactive book
document.addEventListener('DOMContentLoaded', () => {
  new InteractiveBook();
});
```

## Key Interactive Features

- **Dynamic Content Loading**: Pages are loaded from external sources
- **Custom Animations**: Multiple animation styles to choose from
- **Sound Effects**: Audio feedback for interactions
- **Bookmarking System**: Save and navigate to favorite pages
- **Progress Tracking**: Visual progress indicator
- **Fullscreen Mode**: Immersive reading experience
- **Keyboard Shortcuts**: Quick navigation and controls
- **Touch Gestures**: Mobile-friendly interactions
- **Form Integration**: Interactive forms within pages
- **Quiz Elements**: Engaging interactive content

## Performance Optimizations

- **Page Preloading**: Load nearby pages in advance
- **Lazy Loading**: Load content only when needed
- **Memory Management**: Clean up unused resources
- **Efficient Animations**: Hardware-accelerated transitions

## Next Steps

- Learn about [Styling](/guides/styling) for custom themes
- Explore [Events](/guides/events) for more interaction patterns
- Check out [Responsive Design](/guides/responsive) for mobile optimization 