// Horizontal Growing Vines Sketch
let vines = [];
let vineCount = 4;

function setup() {
  createCanvas(windowWidth, 100); // Fixed height for divider
  
  // Initialize horizontal vines from both sides
  for (let i = 0; i < vineCount; i++) {
    let startY = map(i, 0, vineCount - 1, height * 0.25, height * 0.75);
    if (i % 2 === 0) {
      vines.push(new HorizontalVine(0, startY, 0)); // Grow right
    } else {
      vines.push(new HorizontalVine(width, startY, PI)); // Grow left
    }
  }
}

function draw() {
  clear(); // Transparent background
  
  // Update and draw all vines
  for (let vine of vines) {
    vine.grow();
    vine.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 100);
  // Reset vines on resize
  vines = [];
  for (let i = 0; i < vineCount; i++) {
    let startY = map(i, 0, vineCount - 1, height * 0.25, height * 0.75);
    if (i % 2 === 0) {
      vines.push(new HorizontalVine(0, startY, 0)); // Grow right
    } else {
      vines.push(new HorizontalVine(width, startY, PI)); // Grow left
    }
  }
}

class HorizontalVine {
  constructor(startX, startY, direction) {
    this.segments = [];
    this.segments.push(createVector(startX, startY));
    
    this.angle = direction; // 0 for right, PI for left
    this.angleVariation = 0.2; // Organic curves
    this.segmentLength = 5;
    this.thickness = random(6, 10);
    this.growthRate = random(0.3, 0.8);
    this.maxLength = random(width * 0.4, width * 0.6); // Grow partway across
    this.growing = true;
    
    // Branching properties
    this.branches = [];
    this.branchChance = 0.03;
    this.maxBranches = 2;
    
    // Leaf properties
    this.leaves = [];
    this.leafChance = 0.08;
    
    // Color variation - similar to Hero vines
    this.baseColor = color(random(30, 60), random(80, 120), random(30, 50));
    this.leafColor = color(random(60, 100), random(120, 180), random(40, 80));
  }
  
  grow() {
    if (!this.growing) return;
    
    if (frameCount % 1 == 0) { // Faster growth
      if (this.segments.length < this.maxLength) {
        let lastSegment = this.segments[this.segments.length - 1];
        
        // Add some organic curve to the growth
        this.angle += random(-this.angleVariation, this.angleVariation);
        
        // Bias toward horizontal (0 or PI depending on direction)
        let targetAngle = this.angle < PI/2 || this.angle > 3*PI/2 ? 0 : PI;
        this.angle = lerp(this.angle, targetAngle, 0.05);
        
        // Calculate new segment position
        let newX = lastSegment.x + cos(this.angle) * this.segmentLength;
        let newY = lastSegment.y + sin(this.angle) * this.segmentLength;
        
        // Keep vine within canvas bounds
        if (newX > 0 && newX < width && newY > 0 && newY < height) {
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
    let branch = new HorizontalVine(x, y, this.angle);
    branch.angle = this.angle + random(-PI/4, PI/4);
    branch.thickness = this.thickness * 0.6;
    branch.maxLength = this.maxLength * 0.4;
    branch.segmentLength = this.segmentLength * 0.8;
    branch.baseColor = this.baseColor;
    branch.leafColor = this.leafColor;
    branch.branchChance = 0; // Prevent branches from branching
    this.branches.push(branch);
  }
  
  createLeaf(x, y) {
    this.leaves.push({
      pos: createVector(x, y),
      size: random(5, 10),
      angle: random(TWO_PI),
      sway: random(0.01, 0.03)
    });
  }
  
  display() {
    // Draw vine segments with organic tapering
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
    
    // Draw leaves with gentle swaying animation
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