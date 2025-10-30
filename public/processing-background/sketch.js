// Colorful Blobs with Noise Grain - Subtle and elegant
let blobs = [];
let noiseOverlay;

function setup() {
  createCanvas(window.innerWidth || 800, window.innerHeight || 600);
  noiseOverlay = createNoiseOverlay();
  
  // Create subtle yellow blobs
  for (let i = 0; i < 4; i++) {
    blobs.push({
      x: random(width),
      y: random(height),
      size: random(150, 300),
      colors: ['rgba(255, 235, 160, 0.3)', 'rgba(255, 240, 180, 0.15)', 'rgba(255, 240, 180, 0)'],
      speedX: random(-0.3, 0.3),
      speedY: random(-0.3, 0.3),
      noiseOffsetX: random(1000),
      noiseOffsetY: random(1000)
    });
  }
  
  // Create subtle orange blobs
  for (let i = 0; i < 4; i++) {
    blobs.push({
      x: random(width),
      y: random(height),
      size: random(150, 300),
      colors: ['rgba(255, 180, 120, 0.28)', 'rgba(255, 200, 150, 0.14)', 'rgba(255, 200, 150, 0)'],
      speedX: random(-0.3, 0.3),
      speedY: random(-0.3, 0.3),
      noiseOffsetX: random(1000),
      noiseOffsetY: random(1000)
    });
  }
  
  // Create subtle green blobs
  for (let i = 0; i < 4; i++) {
    blobs.push({
      x: random(width),
      y: random(height),
      size: random(150, 300),
      colors: ['rgba(180, 220, 200, 0.25)', 'rgba(200, 230, 220, 0.12)', 'rgba(200, 230, 220, 0)'],
      speedX: random(-0.3, 0.3),
      speedY: random(-0.3, 0.3),
      noiseOffsetX: random(1000),
      noiseOffsetY: random(1000)
    });
  }
}

function draw() {
  // Blue-gray base to match Hero
  background(230, 235, 240);
  
  // Draw and animate blobs with radial gradients
  for (let blob of blobs) {
    // Update position with Perlin noise for smooth movement
    blob.noiseOffsetX += 0.002;
    blob.noiseOffsetY += 0.002;
    blob.x += (noise(blob.noiseOffsetX) - 0.5) * 1.5 + blob.speedX;
    blob.y += (noise(blob.noiseOffsetY) - 0.5) * 1.5 + blob.speedY;
    
    // Wrap around edges
    if (blob.x < -blob.size) blob.x = width + blob.size;
    if (blob.x > width + blob.size) blob.x = -blob.size;
    if (blob.y < -blob.size) blob.y = height + blob.size;
    if (blob.y > height + blob.size) blob.y = -blob.size;
    
    // Draw blob with radial gradient (like Hero)
    let gradient = drawingContext.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.size);
    gradient.addColorStop(0, blob.colors[0]);
    gradient.addColorStop(0.5, blob.colors[1]);
    gradient.addColorStop(1, blob.colors[2]);
    drawingContext.fillStyle = gradient;
    noStroke();
    ellipse(blob.x, blob.y, blob.size * 2, blob.size * 2);
  }
  
  // Apply noise overlay
  image(noiseOverlay, 0, 0);
}

function createNoiseOverlay() {
  let overlay = createGraphics(width, height);
  overlay.clear();
  overlay.loadPixels();
  for (let i = 0; i < overlay.pixels.length; i += 4) {
    let grain = random(-12, 12);
    overlay.pixels[i] = 128;
    overlay.pixels[i + 1] = 128;
    overlay.pixels[i + 2] = 128;
    overlay.pixels[i + 3] = abs(grain) * 3.5;
  }
  overlay.updatePixels();
  return overlay;
}

function windowResized() {
  resizeCanvas(window.innerWidth || 800, window.innerHeight || 600);
  backgroundColor = createBackground();
  noiseOverlay = createNoiseOverlay();
  redraw();
}
