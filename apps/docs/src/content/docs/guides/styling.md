---
title: Styling
description: Learn how to customize the appearance of your Unfold.js books
---

# Styling Guide

Unfold.js provides extensive customization options to make your page-turn animations match your design perfectly. This guide covers all aspects of styling, from basic CSS customization to advanced theming.

## Basic Styling

### Container Styling

The book container is the main wrapper element that holds all pages:

```css
.unfold-container {
  /* Basic dimensions */
  width: 800px;
  height: 600px;
  
  /* Positioning */
  margin: 0 auto;
  position: relative;
  
  /* Visual effects */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;
  
  /* Background */
  background: #f5f5f5;
}
```

### Page Styling

Individual pages can be styled to create different layouts and designs:

```css
.unfold-page {
  /* Full page coverage */
  width: 100%;
  height: 100%;
  
  /* Background and borders */
  background: white;
  border: 1px solid #ddd;
  
  /* Content positioning */
  display: flex;
  flex-direction: column;
  
  /* Typography */
  font-family: 'Georgia', serif;
  line-height: 1.6;
  color: #333;
}

.page-content {
  padding: 40px;
  flex: 1;
  overflow: hidden;
}
```

## Advanced Styling

### Custom Page Types

Create different styles for different types of pages:

```css
/* Cover page */
.page-cover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-cover h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Content page */
.page-content-standard {
  background: #fefefe;
  padding: 60px 50px;
}

.page-content-standard h2 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 30px;
}

/* Image page */
.page-image {
  background-size: cover;
  background-position: center;
  position: relative;
}

.page-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.page-image .content {
  position: relative;
  z-index: 1;
  color: white;
  padding: 40px;
}
```

### Animation Effects

Enhance the page-turn animation with custom CSS effects:

```css
/* Page flip effects */
.unfold-page {
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

/* Hover effects */
.unfold-page:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

/* Page curl effect */
.page-curl {
  position: relative;
}

.page-curl::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background: linear-gradient(
    -45deg,
    transparent 50%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
  transform: rotate(45deg);
  transform-origin: bottom right;
}

/* Shadow effects */
.page-shadow {
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}
```

## Typography

### Font Styling

Create beautiful typography for your book content:

```css
/* Base typography */
.book-typography {
  font-family: 'Crimson Text', 'Georgia', serif;
  font-size: 16px;
  line-height: 1.8;
  color: #2c3e50;
}

/* Headings */
.book-typography h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a252f;
  margin-bottom: 1.5rem;
  text-align: center;
}

.book-typography h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #34495e;
  margin: 2rem 0 1rem 0;
  border-left: 4px solid #3498db;
  padding-left: 1rem;
}

.book-typography h3 {
  font-size: 1.3rem;
  font-weight: 500;
  color: #34495e;
  margin: 1.5rem 0 0.5rem 0;
}

/* Paragraphs */
.book-typography p {
  margin-bottom: 1.2rem;
  text-align: justify;
  hyphens: auto;
}

.book-typography p:first-child {
  margin-top: 0;
}

.book-typography p:last-child {
  margin-bottom: 0;
}

/* Drop caps */
.book-typography .drop-cap::first-letter {
  float: left;
  font-size: 4rem;
  line-height: 3rem;
  margin: 0.2rem 0.5rem 0 0;
  font-weight: bold;
  color: #3498db;
  font-family: 'Playfair Display', serif;
}

/* Quotes */
.book-typography blockquote {
  font-style: italic;
  font-size: 1.1rem;
  margin: 2rem 0;
  padding: 1rem 2rem;
  border-left: 4px solid #e74c3c;
  background: #fdf2f2;
  color: #c0392b;
}

.book-typography blockquote::before {
  content: '"';
  font-size: 3rem;
  color: #e74c3c;
  line-height: 0;
  margin-right: 0.5rem;
}
```

## Layout Systems

### Grid Layouts

Create magazine-style layouts with CSS Grid:

```css
/* Two-column layout */
.layout-two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 100%;
  padding: 2rem;
}

/* Three-column layout */
.layout-three-column {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  height: 100%;
  padding: 2rem;
}

/* Magazine layout */
.layout-magazine {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  height: 100%;
  padding: 2rem;
}

.layout-magazine .header {
  grid-column: 1 / -1;
  border-bottom: 2px solid #3498db;
  padding-bottom: 1rem;
}

.layout-magazine .main-content {
  grid-column: 1;
}

.layout-magazine .sidebar {
  grid-column: 2;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.layout-magazine .footer {
  grid-column: 1 / -1;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  font-size: 0.9rem;
  color: #666;
}
```

### Flexbox Layouts

Use Flexbox for flexible content arrangement:

```css
/* Centered content */
.layout-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 2rem;
}

/* Header-content-footer */
.layout-standard {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.layout-standard .header {
  flex: 0 0 auto;
  padding: 1rem 2rem;
  background: #34495e;
  color: white;
}

.layout-standard .content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.layout-standard .footer {
  flex: 0 0 auto;
  padding: 1rem 2rem;
  background: #ecf0f1;
  border-top: 1px solid #bdc3c7;
}
```

## Theming

### CSS Custom Properties

Use CSS custom properties for easy theming:

```css
:root {
  /* Color palette */
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --accent-color: #e74c3c;
  --background-color: #ffffff;
  --text-color: #2c3e50;
  --border-color: #bdc3c7;
  
  /* Typography */
  --font-family-serif: 'Crimson Text', Georgia, serif;
  --font-family-sans: 'Open Sans', Arial, sans-serif;
  --font-family-display: 'Playfair Display', serif;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Shadows */
  --shadow-light: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-medium: 0 4px 8px rgba(0, 0, 0, 0.15);
  --shadow-heavy: 0 8px 16px rgba(0, 0, 0, 0.2);
  
  /* Border radius */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}

/* Apply theme variables */
.unfold-container {
  background: var(--background-color);
  box-shadow: var(--shadow-heavy);
  border-radius: var(--border-radius-lg);
}

.unfold-page {
  background: var(--background-color);
  color: var(--text-color);
  font-family: var(--font-family-serif);
  border: 1px solid var(--border-color);
}

.page-content h1,
.page-content h2,
.page-content h3 {
  color: var(--secondary-color);
  font-family: var(--font-family-display);
}
```

### Dark Theme

Create a dark theme variant:

```css
[data-theme="dark"] {
  --primary-color: #5dade2;
  --secondary-color: #f8f9fa;
  --accent-color: #e74c3c;
  --background-color: #2c3e50;
  --text-color: #ecf0f1;
  --border-color: #34495e;
}

/* Dark theme specific styles */
[data-theme="dark"] .unfold-page {
  background: var(--background-color);
  color: var(--text-color);
}

[data-theme="dark"] .page-shadow {
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}
```

## Responsive Design

### Mobile Optimization

Make your books responsive for mobile devices:

```css
/* Mobile styles */
@media (max-width: 768px) {
  .unfold-container {
    width: 100vw;
    height: 70vh;
    border-radius: 0;
    margin: 0;
  }
  
  .page-content {
    padding: 1rem;
    font-size: 14px;
  }
  
  .layout-two-column,
  .layout-three-column {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .layout-magazine {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto;
  }
  
  .layout-magazine .sidebar {
    grid-column: 1;
    grid-row: 2;
  }
  
  .layout-magazine .main-content {
    grid-column: 1;
    grid-row: 3;
  }
}

/* Tablet styles */
@media (min-width: 769px) and (max-width: 1024px) {
  .unfold-container {
    width: 90vw;
    height: 60vh;
    max-width: 800px;
  }
  
  .page-content {
    padding: 1.5rem;
  }
}
```

### Touch-Friendly Design

Optimize for touch interactions:

```css
/* Touch targets */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 0.5rem;
  cursor: pointer;
}

/* Touch feedback */
.touch-feedback {
  transition: all 0.2s ease;
}

.touch-feedback:active {
  transform: scale(0.95);
  opacity: 0.8;
}

/* Disable text selection during interactions */
.unfold-container {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Re-enable text selection for content */
.page-content {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
```

## Performance Optimization

### Hardware Acceleration

Enable hardware acceleration for smooth animations:

```css
.unfold-page {
  /* Enable hardware acceleration */
  transform: translateZ(0);
  will-change: transform;
  
  /* Optimize rendering */
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Optimize images */
.page-image img {
  transform: translateZ(0);
  image-rendering: optimizeQuality;
}
```

### Efficient Animations

Use efficient CSS properties for animations:

```css
/* Prefer transform and opacity for animations */
.page-transition {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Avoid animating layout properties */
.avoid-layout-animation {
  /* Don't animate these properties */
  /* width, height, padding, margin, border */
  
  /* Instead, use transform */
  transform: scale(1.1); /* instead of changing width/height */
}
```

## Accessibility

### Screen Reader Support

Make your books accessible to screen readers:

```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus indicators */
.unfold-page:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .unfold-page {
    border: 2px solid;
  }
  
  .page-content {
    background: Canvas;
    color: CanvasText;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .unfold-page {
    transition: none;
  }
  
  .page-transition {
    transition: none;
  }
}
```

## Best Practices

1. **Use semantic HTML** - Structure your content with proper heading hierarchy
2. **Optimize images** - Use appropriate formats and sizes for web
3. **Test on devices** - Ensure your styling works across different screen sizes
4. **Consider performance** - Use efficient CSS properties and avoid heavy effects
5. **Maintain accessibility** - Ensure good contrast ratios and keyboard navigation
6. **Use CSS custom properties** - Make theming and maintenance easier
7. **Progressive enhancement** - Start with basic styles and enhance with advanced features

## Next Steps

- Explore [Events](/guides/events) to add interactive styling
- Learn about [Responsive Design](/guides/responsive) for mobile optimization
- Check out the [Examples](/examples/basic-book) for styling inspiration 