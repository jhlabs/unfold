---
title: Quick Start
description: Create your first page-turn animation with Unfold.js in minutes
---

# Quick Start

This guide will help you create your first page-turn animation with Unfold.js in just a few minutes.

## Basic Setup

First, create a simple HTML structure for your book:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Unfold.js Book</title>
    <style>
        .book-container {
            width: 800px;
            height: 600px;
            margin: 50px auto;
        }
        
        .page {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #333;
        }
        
        .page:nth-child(odd) {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .page:nth-child(even) {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
        }
    </style>
</head>
<body>
    <div class="book-container" id="book">
        <div class="page">Page 1</div>
        <div class="page">Page 2</div>
        <div class="page">Page 3</div>
        <div class="page">Page 4</div>
        <div class="page">Page 5</div>
        <div class="page">Page 6</div>
    </div>
    
    <script src="https://unpkg.com/unfold-js@latest/dist/unfold.min.js"></script>
    <script>
        // Initialize Unfold.js
        const book = new Unfold('#book', {
            // Basic configuration
            width: 800,
            height: 600,
            autoCenter: true
        });
    </script>
</body>
</html>
```

## Using with a Bundler

If you're using a modern build tool, here's how to set it up:

```javascript
import { Unfold } from 'unfold-js';

// Get your container element
const container = document.getElementById('book');

// Initialize with options
const book = new Unfold(container, {
    width: 800,
    height: 600,
    autoCenter: true,
    shadow: true,
    hardCover: true
});

// Optional: Listen to events
book.on('pageFlip', (event) => {
    console.log(`Flipped to page ${event.page}`);
});

book.on('flipStart', () => {
    console.log('Page flip started');
});

book.on('flipEnd', () => {
    console.log('Page flip ended');
});
```

## Basic Configuration Options

Here are some essential options to get you started:

```javascript
const book = new Unfold('#book', {
    // Dimensions
    width: 800,
    height: 600,
    
    // Behavior
    autoCenter: true,
    shadow: true,
    hardCover: false,
    
    // Animation
    duration: 1000,
    easing: 'ease-out',
    
    // Interaction
    clickFlip: true,
    dragFlip: true,
    keyboardNav: true
});
```

## Adding Navigation

You can add navigation controls to your book:

```html
<div class="controls">
    <button id="prevBtn">Previous</button>
    <button id="nextBtn">Next</button>
</div>

<script>
    document.getElementById('prevBtn').addEventListener('click', () => {
        book.prevPage();
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        book.nextPage();
    });
</script>
```

## What's Next?

Now that you have a basic book working, explore more features:

- Check out the [Examples](/examples/basic-book) for more complex implementations
- Learn about [Styling](/guides/styling) to customize the appearance
- Explore the [Events](/guides/events) system for advanced interactions
- Review the [API Reference](/api) for all available options and methods

Congratulations! You've created your first page-turn animation with Unfold.js. 🎉 