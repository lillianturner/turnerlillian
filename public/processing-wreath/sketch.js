// Decorative Vine Border Sketch - Grows in circle around content like Hero vines
let vines = [];
let centerX, centerY;
let radius;
let vineCount = 12;

function setup() {
  createCanvas(600, 600);
  centerX = width / 2;
  centerY = height / 2;
  radius = 210; // Fixed radius for consistent wreath around 400px glass circle
  
  // Create vines that grow ALONG the circular perimeter (exactly like Hero)
  for (let i = 0; i < vineCount; i++) {
    let angle = map(i, 0, vineCount, 0, TWO_PI);
    // Position on circular perimeter
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    vines.push(new CircularVine(x, y, angle));
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
  resizeCanvas(600, 600);
  centerX = width / 2;
  centerY = height / 2;
  radius = 210;
  
  // Reset vines
  vines = [];
  for (let i = 0; i < vineCount; i++) {
    let angle = map(i, 0, vineCount, 0, TWO_PI);
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    vines.push(new CircularVine(x, y, angle));
  }
}

class CircularVine {
  constructor(startX, startY, startAngle) {
    this.segments = [];
    this.segments.push(createVector(startX, startY));
    
    this.startAngle = startAngle; // Position on the circle
    this.angle = startAngle + HALF_PI; // Grow tangent to circle (perpendicular to radius)
    this.angleVariation = 0.25; // Same as Hero vines
    this.segmentLength = 3;
    this.thickness = random(8, 15);
    this.maxLength = random(50, 90);
    this.growing = true;
    
    // Branching properties - branches grow outward
    this.branches = [];
    this.branchChance = 0.02;
    this.maxBranches = 3;
    
    // Leaf properties
    this.leaves = [];
    this.leafChance = 0.05;
    
    // Color variation - match Hero vines exactly
    this.baseColor = color(random(30, 60), random(80, 120), random(30, 50));
    this.leafColor = color(random(60, 100), random(120, 180), random(40, 80));
  }
  
  grow() {
    if (!this.growing) return;
    
    if (frameCount % 3 == 0) { // Same growth speed as Hero
      if (this.segments.length < this.maxLength) {
        let lastSegment = this.segments[this.segments.length - 1];
        
        // Calculate angle from center to current position
        let dx = lastSegment.x - centerX;
        let dy = lastSegment.y - centerY;
        let angleToCenter = atan2(dy, dx);
        
        // Target angle is tangent to circle (perpendicular to radius)
        // Always grow counter-clockwise around the circle
        let targetAngle = angleToCenter + HALF_PI;
        
        // Add organic curve
        this.angle += random(-this.angleVariation, this.angleVariation);
        
        // Strong bias to stay tangent (grow AROUND the circle, not away or inward)
        this.angle = lerp(this.angle, targetAngle, 0.3);
        
        // Calculate new segment position
        let newX = lastSegment.x + cos(this.angle) * this.segmentLength;
        let newY = lastSegment.y + sin(this.angle) * this.segmentLength;
        
        // Calculate distance from center
        let distFromCenter = dist(newX, newY, centerX, centerY);
        
        // If segment is drifting off the perimeter, project it back onto the circle
        if (abs(distFromCenter - radius) > radius * 0.15) {
          // Normalize to put point back on the perimeter
          let scale = radius / distFromCenter;
          newX = centerX + (newX - centerX) * scale;
          newY = centerY + (newY - centerY) * scale;
          distFromCenter = radius;
        }
        
        // Add segment if it's within tolerance
        if (abs(distFromCenter - radius) < radius * 0.2) {
          this.segments.push(createVector(newX, newY));
          
          // Chance to create a branch
          if (random() < this.branchChance && this.branches.length < this.maxBranches) {
            this.createBranch(newX, newY, angleToCenter);
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
  
  createBranch(x, y, angleToCenter) {
    // Branches grow radially OUTWARD from the circle (away from center)
    let outwardAngle = angleToCenter + random(-PI/3, PI/3);
    
    let branch = new HeroBranch(x, y, outwardAngle);
    branch.thickness = this.thickness * 0.6;
    branch.maxLength = random(20, 40);
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
    // Draw vine segments with tapering (same as Hero)
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
    
    // Draw leaves with swaying animation (same as Hero)
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

// Hero-style branch class - matches the organic branching from Hero vines
class HeroBranch {
  constructor(startX, startY, angle) {
    this.segments = [];
    this.segments.push(createVector(startX, startY));
    this.angle = angle;
    this.angleVariation = 0.25; // Same as Hero vines
    this.segmentLength = 3;
    this.thickness = random(4, 8);
    this.maxLength = random(20, 40);
    this.growing = true;
    this.baseColor = color(random(30, 60), random(80, 120), random(30, 50));
    this.leafColor = color(random(60, 100), random(120, 180), random(40, 80));
    
    // Leaf properties
    this.leaves = [];
    this.leafChance = 0.08;
  }
  
  grow() {
    if (!this.growing) return;
    
    if (frameCount % 3 == 0) {
      if (this.segments.length < this.maxLength) {
        let lastSegment = this.segments[this.segments.length - 1];
        
        // Add organic curve like Hero vines
        this.angle += random(-this.angleVariation, this.angleVariation);
        
        let newX = lastSegment.x + cos(this.angle) * this.segmentLength;
        let newY = lastSegment.y + sin(this.angle) * this.segmentLength;
        
        // Allow branches to grow outside canvas bounds
        if (newX > -100 && newX < width + 100 && newY > -100 && newY < height + 100) {
          this.segments.push(createVector(newX, newY));
          
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
  }
  
  createLeaf(x, y) {
    this.leaves.push({
      pos: createVector(x, y),
      size: random(4, 9),
      angle: random(TWO_PI),
      sway: random(0.01, 0.03)
    });
  }
  
  display() {
    if (this.segments.length > 1) {
      strokeCap(ROUND);
      noFill();
      
      // Draw with tapering thickness (thicker at base, thinner at tip)
      for (let i = 1; i < this.segments.length; i++) {
        let thickness = map(i, 0, this.segments.length, this.thickness, 1);
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
  }
}