// Decorative Vine Border Sketch - Grows in circle around content
// OPTIMIZED VERSION
let vines = [];
let centerX, centerY;
let radius;
let vineCount = 8; // Reduced from 12
let allVinesComplete = false;

function setup() {
  createCanvas(600, 600);
  frameRate(30); // Limit frame rate
  centerX = width / 2;
  centerY = height / 2;
  radius = 210;
  initVines();
}

function initVines() {
  vines = [];
  for (let i = 0; i < vineCount; i++) {
    let angle = map(i, 0, vineCount, 0, TWO_PI);
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    vines.push(new CircularVine(x, y, angle));
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
  resizeCanvas(600, 600);
  centerX = width / 2;
  centerY = height / 2;
  radius = 210;
  allVinesComplete = false;
  loop();
  initVines();
}

class CircularVine {
  constructor(startX, startY, startAngle) {
    this.segments = [createVector(startX, startY)];
    this.startAngle = startAngle;
    this.angle = startAngle + HALF_PI;
    this.angleVariation = 0.25;
    this.segmentLength = 4; // Slightly longer
    this.thickness = random(8, 13);
    this.maxLength = random(40, 70); // Reduced
    this.growing = true;
    
    this.branches = [];
    this.branchChance = 0.015; // Reduced
    this.maxBranches = 2; // Reduced
    
    this.leaves = [];
    this.leafChance = 0.04; // Reduced
    
    this.baseColor = color(random(30, 60), random(80, 120), random(30, 50));
    this.leafColor = color(random(60, 100), random(120, 180), random(40, 80));
  }
  
  grow() {
    if (!this.growing) return;
    
    // Grow every 2 frames for performance
    if (frameCount % 2 !== 0) return;
    
    if (this.segments.length < this.maxLength) {
      let lastSegment = this.segments[this.segments.length - 1];
      let dx = lastSegment.x - centerX;
      let dy = lastSegment.y - centerY;
      let angleToCenter = atan2(dy, dx);
      let targetAngle = angleToCenter + HALF_PI;
      
      this.angle += random(-this.angleVariation, this.angleVariation);
      this.angle = lerp(this.angle, targetAngle, 0.3);
      
      let newX = lastSegment.x + cos(this.angle) * this.segmentLength;
      let newY = lastSegment.y + sin(this.angle) * this.segmentLength;
      let distFromCenter = dist(newX, newY, centerX, centerY);
      
      if (abs(distFromCenter - radius) > radius * 0.15) {
        let scale = radius / distFromCenter;
        newX = centerX + (newX - centerX) * scale;
        newY = centerY + (newY - centerY) * scale;
      }
      
      if (abs(dist(newX, newY, centerX, centerY) - radius) < radius * 0.2) {
        this.segments.push(createVector(newX, newY));
        
        if (random() < this.branchChance && this.branches.length < this.maxBranches) {
          this.createBranch(newX, newY, angleToCenter);
        }
        
        if (random() < this.leafChance) {
          this.leaves.push({
            pos: createVector(newX, newY),
            size: random(4, 10),
            angle: random(TWO_PI)
          });
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
  
  createBranch(x, y, angleToCenter) {
    let outwardAngle = angleToCenter + random(-PI/3, PI/3);
    let branch = new HeroBranch(x, y, outwardAngle);
    branch.thickness = this.thickness * 0.5;
    branch.maxLength = random(15, 30);
    branch.baseColor = this.baseColor;
    branch.leafColor = this.leafColor;
    this.branches.push(branch);
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

// Simplified branch class
class HeroBranch {
  constructor(startX, startY, angle) {
    this.segments = [createVector(startX, startY)];
    this.angle = angle;
    this.angleVariation = 0.2;
    this.segmentLength = 3;
    this.thickness = random(3, 6);
    this.maxLength = random(15, 30);
    this.growing = true;
    this.baseColor = color(random(30, 60), random(80, 120), random(30, 50));
    this.leafColor = color(random(60, 100), random(120, 180), random(40, 80));
    this.leaves = [];
    this.leafChance = 0.06;
  }
  
  grow() {
    if (!this.growing) return;
    if (frameCount % 2 !== 0) return;
    
    if (this.segments.length < this.maxLength) {
      let lastSegment = this.segments[this.segments.length - 1];
      this.angle += random(-this.angleVariation, this.angleVariation);
      
      let newX = lastSegment.x + cos(this.angle) * this.segmentLength;
      let newY = lastSegment.y + sin(this.angle) * this.segmentLength;
      
      if (newX > -50 && newX < width + 50 && newY > -50 && newY < height + 50) {
        this.segments.push(createVector(newX, newY));
        
        if (random() < this.leafChance) {
          this.leaves.push({
            pos: createVector(newX, newY),
            size: random(3, 7),
            angle: random(TWO_PI)
          });
        }
      } else {
        this.growing = false;
      }
    } else {
      this.growing = false;
    }
  }
  
  display() {
    if (this.segments.length > 1) {
      stroke(this.baseColor);
      strokeCap(ROUND);
      noFill();
      
      for (let i = 1; i < this.segments.length; i++) {
        let thickness = map(i, 0, this.segments.length, this.thickness, 1);
        strokeWeight(thickness);
        line(this.segments[i-1].x, this.segments[i-1].y, this.segments[i].x, this.segments[i].y);
      }
    }
    
    fill(this.leafColor);
    noStroke();
    for (let leaf of this.leaves) {
      push();
      translate(leaf.pos.x, leaf.pos.y);
      rotate(leaf.angle);
      ellipse(0, 0, leaf.size, leaf.size * 1.5);
      pop();
    }
  }
}