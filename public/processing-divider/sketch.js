// Horizontal Growing Vines Sketch
// OPTIMIZED VERSION
let vines = [];
let vineCount = 3; // Reduced from 4
let allVinesComplete = false;

function setup() {
  createCanvas(windowWidth, 100);
  frameRate(30); // Limit frame rate
  initVines();
}

function initVines() {
  vines = [];
  for (let i = 0; i < vineCount; i++) {
    let startY = map(i, 0, vineCount - 1, height * 0.25, height * 0.75);
    if (i % 2 === 0) {
      vines.push(new HorizontalVine(0, startY, 0));
    } else {
      vines.push(new HorizontalVine(width, startY, PI));
    }
  }
}

function draw() {
  if (allVinesComplete) return;
  
  clear();
  
  let anyGrowing = false;
  for (let vine of vines) {
    if (vine.growing) {
      anyGrowing = true;
      vine.grow();
    }
    vine.display();
  }
  
  if (!anyGrowing) {
    allVinesComplete = true;
    noLoop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 100);
  allVinesComplete = false;
  loop();
  initVines();
}

class HorizontalVine {
  constructor(startX, startY, direction) {
    this.segments = [createVector(startX, startY)];
    this.angle = direction;
    this.angleVariation = 0.2;
    this.segmentLength = 6; // Slightly longer segments
    this.thickness = random(6, 9);
    this.growthRate = random(0.4, 0.7);
    this.maxLength = random(width * 0.35, width * 0.5); // Shorter
    this.growing = true;
    
    this.branches = [];
    this.branchChance = 0.02; // Reduced
    this.maxBranches = 1; // Reduced
    
    this.leaves = [];
    this.leafChance = 0.06; // Reduced
    
    this.baseColor = color(random(30, 60), random(80, 120), random(30, 50));
    this.leafColor = color(random(60, 100), random(120, 180), random(40, 80));
  }
  
  grow() {
    if (!this.growing) return;
    
    // Skip some frames for performance
    if (frameCount % 2 !== 0) return;
    
    if (this.segments.length < this.maxLength) {
      let lastSegment = this.segments[this.segments.length - 1];
      
      this.angle += random(-this.angleVariation, this.angleVariation);
      let targetAngle = this.angle < PI/2 || this.angle > 3*PI/2 ? 0 : PI;
      this.angle = lerp(this.angle, targetAngle, 0.05);
      
      let newX = lastSegment.x + cos(this.angle) * this.segmentLength;
      let newY = lastSegment.y + sin(this.angle) * this.segmentLength;
      
      if (newX > 0 && newX < width && newY > 0 && newY < height) {
        this.segments.push(createVector(newX, newY));
        
        if (random() < this.branchChance && this.branches.length < this.maxBranches) {
          this.createBranch(newX, newY);
        }
        
        if (random() < this.leafChance) {
          this.createLeaf(newX, newY);
        }
      } else {
        this.growing = false;
      }
    } else {
      this.growing = false;
    }
    
    for (let branch of this.branches) {
      branch.grow();
    }
  }
  
  createBranch(x, y) {
    let branch = new HorizontalVine(x, y, this.angle);
    branch.angle = this.angle + random(-PI/4, PI/4);
    branch.thickness = this.thickness * 0.5;
    branch.maxLength = this.maxLength * 0.3;
    branch.segmentLength = this.segmentLength * 0.8;
    branch.baseColor = this.baseColor;
    branch.leafColor = this.leafColor;
    branch.branchChance = 0;
    this.branches.push(branch);
  }
  
  createLeaf(x, y) {
    this.leaves.push({
      pos: createVector(x, y),
      size: random(4, 8),
      angle: random(TWO_PI)
    });
  }
  
  display() {
    if (this.segments.length > 1) {
      stroke(this.baseColor);
      strokeCap(ROUND);
      noFill();
      
      for (let i = 1; i < this.segments.length; i++) {
        let thickness = map(i, 0, this.segments.length, this.thickness, 2);
        strokeWeight(thickness);
        line(this.segments[i-1].x, this.segments[i-1].y, this.segments[i].x, this.segments[i].y);
      }
    }
    
    // Draw leaves (simplified - no animation for performance)
    fill(this.leafColor);
    noStroke();
    for (let leaf of this.leaves) {
      push();
      translate(leaf.pos.x, leaf.pos.y);
      rotate(leaf.angle);
      ellipse(0, 0, leaf.size, leaf.size * 1.5);
      pop();
    }
    
    for (let branch of this.branches) {
      branch.display();
    }
  }
}