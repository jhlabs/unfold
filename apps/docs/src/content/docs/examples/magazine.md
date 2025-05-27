---
title: Magazine Layout
description: Create a magazine-style layout with rich content and images
---

# Magazine Layout Example

This example shows how to create a magazine-style layout with rich content, images, and a more sophisticated design using Unfold.js.

## Live Demo

<div class="demo-container">
  <div id="magazine-book" class="magazine-demo">
    <!-- Demo will be rendered here -->
  </div>
</div>

## Features Demonstrated

- **Multi-column layouts** for magazine-style content
- **Image integration** with proper sizing and positioning
- **Typography hierarchy** with headlines, subheadings, and body text
- **Color schemes** and background patterns
- **Responsive design** that adapts to different screen sizes

## HTML Structure

```html
<div class="magazine-container">
  <div class="magazine" id="magazine-book">
    <!-- Cover Page -->
    <div class="page cover">
      <div class="cover-content">
        <div class="magazine-title">TECH WEEKLY</div>
        <div class="issue-info">Issue #42 • March 2024</div>
        <div class="cover-story">
          <h1>The Future of Web Development</h1>
          <p>Exploring cutting-edge technologies that will shape tomorrow's web</p>
        </div>
        <div class="cover-image">
          <img src="/images/cover-tech.jpg" alt="Technology illustration" />
        </div>
      </div>
    </div>

    <!-- Table of Contents -->
    <div class="page toc">
      <div class="page-content">
        <h2>Contents</h2>
        <div class="toc-list">
          <div class="toc-item">
            <span class="page-num">04</span>
            <span class="title">Web Components Revolution</span>
          </div>
          <div class="toc-item">
            <span class="page-num">08</span>
            <span class="title">AI in Frontend Development</span>
          </div>
          <div class="toc-item">
            <span class="page-num">12</span>
            <span class="title">Performance Optimization</span>
          </div>
          <div class="toc-item">
            <span class="page-num">16</span>
            <span class="title">Design Systems 2024</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Article Page 1 -->
    <div class="page article">
      <div class="page-content two-column">
        <div class="column">
          <h2>Web Components Revolution</h2>
          <p class="lead">The web development landscape is evolving rapidly, and web components are at the forefront of this transformation.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
        </div>
        <div class="column">
          <div class="image-block">
            <img src="/images/web-components.jpg" alt="Web Components" />
            <caption>Modern web components in action</caption>
          </div>
          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        </div>
      </div>
      <div class="page-number">04</div>
    </div>

    <!-- Article Page 2 -->
    <div class="page article">
      <div class="page-content">
        <div class="full-width-image">
          <img src="/images/ai-development.jpg" alt="AI Development" />
        </div>
        <h2>AI in Frontend Development</h2>
        <div class="three-column">
          <div class="column">
            <p>Artificial Intelligence is transforming how we build user interfaces. From automated testing to intelligent code completion, AI tools are becoming indispensable.</p>
          </div>
          <div class="column">
            <p>Machine learning algorithms can now predict user behavior, optimize performance, and even generate code snippets based on natural language descriptions.</p>
          </div>
          <div class="column">
            <p>The integration of AI in development workflows is not just a trend—it's the future of how we'll build web applications.</p>
          </div>
        </div>
      </div>
      <div class="page-number">08</div>
    </div>

    <!-- Back Cover -->
    <div class="page back-cover">
      <div class="back-content">
        <h3>Subscribe Today</h3>
        <p>Get the latest insights in web development delivered to your inbox every week.</p>
        <div class="subscription-info">
          <div class="price">$9.99/month</div>
          <button class="subscribe-btn">Subscribe Now</button>
        </div>
      </div>
    </div>
  </div>

  <div class="magazine-controls">
    <button id="mag-prev">← Previous</button>
    <span id="page-indicator">Page 1 of 5</span>
    <button id="mag-next">Next →</button>
  </div>
</div>
```

## CSS Styling

```css
.magazine-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f5f5f5;
}

.magazine {
  width: 800px;
  height: 600px;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.page {
  width: 100%;
  height: 100%;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

/* Cover Page Styling */
.cover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cover-content {
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.magazine-title {
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 4px;
}

.issue-info {
  font-size: 14px;
  opacity: 0.8;
}

.cover-story h1 {
  font-size: 36px;
  line-height: 1.2;
  margin: 20px 0;
}

.cover-image {
  text-align: center;
}

.cover-image img {
  max-width: 200px;
  border-radius: 10px;
}

/* Table of Contents */
.toc {
  background: #fafafa;
}

.toc-list {
  margin-top: 30px;
}

.toc-item {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.page-num {
  font-weight: bold;
  color: #667eea;
}

/* Article Pages */
.article {
  position: relative;
}

.page-content {
  padding: 40px;
  height: calc(100% - 80px);
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.three-column {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.lead {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
}

.image-block {
  margin: 20px 0;
}

.image-block img {
  width: 100%;
  border-radius: 8px;
}

.image-block caption {
  font-size: 12px;
  color: #666;
  font-style: italic;
  margin-top: 5px;
  display: block;
}

.full-width-image {
  margin: -40px -40px 20px -40px;
}

.full-width-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.page-number {
  position: absolute;
  bottom: 20px;
  right: 40px;
  font-weight: bold;
  color: #667eea;
}

/* Back Cover */
.back-cover {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.back-content {
  padding: 40px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.subscription-info {
  margin-top: 30px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.subscribe-btn {
  padding: 15px 30px;
  background: white;
  color: #f5576c;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

/* Controls */
.magazine-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.magazine-controls button {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#page-indicator {
  font-weight: 500;
  color: #666;
}
```

## JavaScript Implementation

```javascript
import { Unfold } from 'unfold-js';

// Initialize the magazine
const magazine = new Unfold('#magazine-book', {
  width: 800,
  height: 600,
  autoCenter: true,
  shadow: true,
  hardCover: false,
  duration: 1000,
  easing: 'ease-in-out',
  // Magazine-specific options
  pageSpacing: 2,
  cornerFold: true
});

// Get controls
const prevBtn = document.getElementById('mag-prev');
const nextBtn = document.getElementById('mag-next');
const pageIndicator = document.getElementById('page-indicator');

// Navigation
prevBtn.addEventListener('click', () => magazine.prevPage());
nextBtn.addEventListener('click', () => magazine.nextPage());

// Update page indicator and button states
function updateControls() {
  const current = magazine.currentPage + 1;
  const total = magazine.totalPages;
  
  pageIndicator.textContent = `Page ${current} of ${total}`;
  prevBtn.disabled = magazine.currentPage === 0;
  nextBtn.disabled = magazine.currentPage === total - 1;
}

// Listen to page changes
magazine.on('pageFlip', updateControls);

// Initial state
updateControls();

// Touch gestures for mobile
let startX = 0;
let startY = 0;

magazine.container.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

magazine.container.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  
  // Only trigger if horizontal swipe is dominant
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      magazine.prevPage();
    } else {
      magazine.nextPage();
    }
  }
});
```

## Key Features

- **Rich Typography**: Multiple font sizes and weights for hierarchy
- **Grid Layouts**: Two and three-column layouts for content organization
- **Image Integration**: Full-width images and inline image blocks
- **Interactive Elements**: Subscription buttons and navigation
- **Mobile Gestures**: Touch swipe support for mobile devices
- **Page Indicators**: Current page display with total count

## Responsive Considerations

```css
@media (max-width: 768px) {
  .magazine {
    width: 100vw;
    height: 70vh;
  }
  
  .two-column,
  .three-column {
    grid-template-columns: 1fr;
  }
  
  .page-content {
    padding: 20px;
  }
  
  .magazine-title {
    font-size: 32px;
  }
  
  .cover-story h1 {
    font-size: 24px;
  }
}
```

## Next Steps

- Explore the [Interactive Demo](/examples/interactive) for advanced interactions
- Learn about [Responsive Design](/guides/responsive) for mobile optimization
- Check out the [Events Guide](/guides/events) for more interaction patterns 