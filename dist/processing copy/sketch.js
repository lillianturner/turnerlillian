// Growing Vines Sketch
let vines = [];
let vineCount = 5;
let backgroundColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create a gradient background
  backgroundColor = createBackground();
  
  // Initialize vines with different starting positions
  for (let i = 0; i < vineCount; i++) {
    let startX = map(i, 0, vineCount - 1, width * 0.2, width * 0.8);
    vines.push(new Vine(startX, height));
  }
}

function draw() {
  // Draw gradient background
  image(backgroundColor, 0, 0);
  
  // Update and draw all vines
  for (let vine of vines) {
    vine.grow();
    vine.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  backgroundColor = createBackground();
  // Reset vines on resize
  vines = [];
  for (let i = 0; i < vineCount; i++) {
    let startX = map(i, 0, vineCount - 1, width * 0.2, width * 0.8);
    vines.push(new Vine(startX, height));
  }
}

function createBackground() {
  let bg = createGraphics(width, height);
  bg.noFill();
  
  // Create gradient from medium grayish blue at bottom to light grayish blue at top
  for (let y = 0; y <= height; y++) {
    let alpha = map(y, 0, height, 0, 1);
    let r = lerp(180, 220, alpha);
    let g = lerp(200, 240, alpha);
    let b = lerp(220, 250, alpha);
    bg.stroke(r, g, b);
    bg.line(0, y, width, y);
  }
  
  return bg;
}

class Vine {
  constructor(startX, startY) {
    this.segments = [];
    this.segments.push(createVector(startX, startY));
    
    this.angle = -PI/2; // Start growing upward
    this.angleVariation = 0.25; // More curves!
    this.segmentLength = 3;
    this.thickness = random(8, 15);
    this.growthRate = random(0.3, 0.8);
    this.maxLength = random(200, 350); // Much taller!
    this.growing = true;
    
    // Branching properties
    this.branches = [];
    this.branchChance = 0.02;
    this.maxBranches = 3;
    
    // Leaf properties
    this.leaves = [];
    this.leafChance = 0.05;
    
    // Color variation
    this.baseColor = color(random(30, 60), random(80, 120), random(30, 50));
    this.leafColor = color(random(60, 100), random(120, 180), random(40, 80));
  }
  
  grow() {
    if (!this.growing) return;
    
    if (frameCount % 3 == 0) { // Slow down growth
      if (this.segments.length < this.maxLength) {
        let lastSegment = this.segments[this.segments.length - 1];
        
        // Add some organic curve to the growth
        this.angle += random(-this.angleVariation, this.angleVariation);
        
        // Slight upward bias (less bias = more curves)
        this.angle = lerp(this.angle, -PI/2, 0.01);
        
        // Calculate new segment position
        let newX = lastSegment.x + cos(this.angle) * this.segmentLength;
        let newY = lastSegment.y + sin(this.angle) * this.segmentLength;
        
        // Keep vine within canvas bounds
        if (newX > 0 && newX < width && newY > 0) {
          this.segments.push(createVector(newX, newY));
          
          // Chance to create a branch
          if (random() < this.branchChance && this.branches.length < this.maxBranches) {
            this.createBranch(newX, newY);
          }
          
          // Chance to create a leaf
          if (random() < this.leafChance) {
            this.createLeaf(newX, newY);
          }
        } else {
          this.growing = false;
        }
      } else {
        this.growing = false;
      }
    }
    
    // Update branches
    for (let branch of this.branches) {
      branch.grow();
    }
  }
  
  createBranch(x, y) {
    let branch = new Vine(x, y);
    branch.angle = this.angle + random(-PI/3, PI/3);
    branch.thickness = this.thickness * 0.6;
    branch.maxLength = this.maxLength * 0.5;
    branch.segmentLength = this.segmentLength * 0.8;
    branch.baseColor = this.baseColor;
    branch.leafColor = this.leafColor;
    this.branches.push(branch);
  }
  
  createLeaf(x, y) {
    this.leaves.push({
      pos: createVector(x, y),
      size: random(5, 12),
      angle: random(TWO_PI),
      sway: random(0.01, 0.03)
    });
  }
  
  display() {
    // Draw vine segments
    if (this.segments.length > 1) {
      strokeCap(ROUND);
      noFill();
      
      for (let i = 1; i < this.segments.length; i++) {
        let thickness = map(i, 0, this.segments.length, this.thickness, 2);
        stroke(this.baseColor);
        strokeWeight(thickness);
        
        line(this.segments[i-1].x, this.segments[i-1].y, 
             this.segments[i].x, this.segments[i].y);
      }
    }
    
    // Draw leaves
    fill(this.leafColor);
    noStroke();
    for (let leaf of this.leaves) {
      push();
      translate(leaf.pos.x, leaf.pos.y);
      rotate(leaf.angle + sin(frameCount * leaf.sway) * 0.3);
      ellipse(0, 0, leaf.size, leaf.size * 1.5);
      pop();
    }
    
    // Draw branches
    for (let branch of this.branches) {
      branch.display();
    }
  }
}

// Click to add a new vine at mouse position
function mousePressed() {
  if (mouseY > height * 0.3) { // Only allow vines in lower portion
    vines.push(new Vine(mouseX, height));
  }
}

// Press 'r' to reset and start over
function keyPressed() {
  if (key === 'r' || key === 'R') {
    vines = [];
    for (let i = 0; i < vineCount; i++) {
      let startX = map(i, 0, vineCount - 1, width * 0.2, width * 0.8);
      vines.push(new Vine(startX, height));
    }
  }
}

