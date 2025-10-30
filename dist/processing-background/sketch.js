// Background Only - Optimized grain overlay
let backgroundColor;
let noiseOverlay;

function setup() {
  createCanvas(window.innerWidth || 800, window.innerHeight || 600);
  backgroundColor = createBackground();
  noiseOverlay = createNoiseOverlay();
  noLoop(); // Static background, no need to redraw
}

function draw() {
  image(backgroundColor, 0, 0);
  image(noiseOverlay, 0, 0);
}

function createBackground() {
  let bg = createGraphics(width, height);
  
  // Blue-gray base - cooler, more blue-leaning
  bg.background(230, 235, 240);
  
  return bg;
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
