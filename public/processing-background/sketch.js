// Colorful Blobs with Noise Grain - Subtle and elegant
// OPTIMIZED VERSION
let blobs = [];
let noiseOverlay;
let lastWidth, lastHeight;

function setup() {
  createCanvas(window.innerWidth || 800, window.innerHeight || 600);
  frameRate(24); // Reduce frame rate - blobs move slowly anyway
  noiseOverlay = createNoiseOverlay();
  lastWidth = width;
  lastHeight = height;
  
  // Reduced blob count for better performance
  // Create subtle yellow blobs
  for (let i = 0; i < 3; i++) {
    blobs.push(createBlob(['rgba(255, 235, 160, 0.3)', 'rgba(255, 240, 180, 0.15)', 'rgba(255, 240, 180, 0)']));
  }
  
  // Create subtle orange blobs
  for (let i = 0; i < 3; i++) {
    blobs.push(createBlob(['rgba(255, 180, 120, 0.28)', 'rgba(255, 200, 150, 0.14)', 'rgba(255, 200, 150, 0)']));
  }
  
  // Create subtle green blobs
  for (let i = 0; i < 3; i++) {
    blobs.push(createBlob(['rgba(180, 220, 200, 0.25)', 'rgba(200, 230, 220, 0.12)', 'rgba(200, 230, 220, 0)']));
  }
}

function createBlob(colors) {
  return {
    x: random(width),
    y: random(height),
    size: random(180, 350), // Slightly larger = fewer needed
    colors: colors,
    speedX: random(-0.2, 0.2), // Slower movement
    speedY: random(-0.2, 0.2),
    noiseOffsetX: random(1000),
    noiseOffsetY: random(1000)
  };
}

function draw() {
  // Blue-gray base to match Hero
  background(230, 235, 240);
  
  // Draw and animate blobs with radial gradients
  for (let blob of blobs) {
    // Update position with Perlin noise for smooth movement (less frequent updates)
    blob.noiseOffsetX += 0.001; // Slower noise evolution
    blob.noiseOffsetY += 0.001;
    blob.x += (noise(blob.noiseOffsetX) - 0.5) * 1.2 + blob.speedX;
    blob.y += (noise(blob.noiseOffsetY) - 0.5) * 1.2 + blob.speedY;
    
    // Wrap around edges
    if (blob.x < -blob.size) blob.x = width + blob.size;
    if (blob.x > width + blob.size) blob.x = -blob.size;
    if (blob.y < -blob.size) blob.y = height + blob.size;
    if (blob.y > height + blob.size) blob.y = -blob.size;
    
    // Draw blob with radial gradient
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
  // Use smaller resolution for noise overlay, then scale up
  let scale = 2; // Render at half resolution
  let overlay = createGraphics(floor(width / scale), floor(height / scale));
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
  
  // Scale up the noise overlay
  let scaledOverlay = createGraphics(width, height);
  scaledOverlay.image(overlay, 0, 0, width, height);
  return scaledOverlay;
}

function windowResized() {
  // Debounce resize to avoid expensive recalculations
  if (abs(width - lastWidth) > 50 || abs(height - lastHeight) > 50) {
    resizeCanvas(window.innerWidth || 800, window.innerHeight || 600);
    noiseOverlay = createNoiseOverlay();
    lastWidth = width;
    lastHeight = height;
  }
}
