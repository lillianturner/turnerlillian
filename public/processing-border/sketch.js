// Decorative Border Vine Sketch - Grows along rectangular perimeter
// OPTIMIZED VERSION
let vines = [];
let margin = 10; // Distance from edge - 10px margin
let vineSpacing = 100; // Increased spacing = fewer vines
let allVinesComplete = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30); // Limit frame rate for better performance
  initializeVines();
}

function draw() {
  if (allVinesComplete) return; // Skip drawing if nothing to update
  
  clear(); // Transparent background
  
  let anyGrowing = false;
  
  // Update and draw all vines - match hero growth speed
  for (let vine of vines) {
    if (vine.growing) {
      anyGrowing = true;
      // Apply growth rate - some vines grow faster than others (like hero)
      if (random() < vine.growthRate) {
        vine.grow();
      }
      if (random() < vine.growthRate) {
        vine.grow(); // Possible second growth per frame (like hero)
      }
    }
    vine.display();
  }
  
  // Stop animation loop when all vines are done
  if (!anyGrowing) {
    allVinesComplete = true;
    noLoop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  allVinesComplete = false;
  loop();
  initializeVines();
}

function initializeVines() {
  vines = [];
  
  // Reduced number of vines with increased spacing
  // Top edge
  for (let x = margin; x < width - margin; x += vineSpacing) {
    vines.push(new BorderVine(x, margin, 0));
  }
  
  // Right edge
  for (let y = margin; y < height - margin; y += vineSpacing) {
    vines.push(new BorderVine(width - margin, y, HALF_PI));
  }
  
  // Bottom edge
  for (let x = width - margin; x > margin; x -= vineSpacing) {
    vines.push(new BorderVine(x, height - margin, PI));
  }
  
  // Left edge
  for (let y = height - margin; y > margin; y -= vineSpacing) {
    vines.push(new BorderVine(margin, y, -HALF_PI));
  }
}

class BorderVine {
  constructor(startX, startY, startAngle) {
    this.segments = [createVector(startX, startY)];
    this.angle = startAngle;
    this.angleVariation = 0.3;
    this.segmentLength = 3; // Match hero vines
    this.thickness = random(8, 12);
    this.maxLength = random(80, 120); // Slightly longer vines
    this.growing = true;
    this.growthRate = random(0.5, 1.5); // Match hero vines growth rate range
    
    // Reduced branching
    this.branches = [];
    this.branchChance = 0.03;
    this.maxBranches = 3;
    
    // Leaves
    this.leaves = [];
    this.leafChance = 0.05;
    
    // Simplified flowers
    this.flowers = [];
    
    // Pre-calculate colors once
    this.baseColor = color(random(30, 60), random(80, 120), random(30, 50));
    this.leafColor = color(random(60, 100), random(120, 180), random(40, 80));
  }
  
  grow() {
    if (!this.growing || this.segments.length >= this.maxLength) {
      this.growing = false;
      return;
    }
    
    let lastSegment = this.segments[this.segments.length - 1];
    this.angle += random(-this.angleVariation, this.angleVariation);
    
    let newX = lastSegment.x + cos(this.angle) * this.segmentLength;
    let newY = lastSegment.y + sin(this.angle) * this.segmentLength;
    
    // Bounce off margin walls
    if (newX < margin) {
      newX = margin + (margin - newX);
      this.angle = PI - this.angle;
    }
    if (newX > width - margin) {
      newX = (width - margin) - (newX - (width - margin));
      this.angle = PI - this.angle;
    }
    if (newY < margin) {
      newY = margin + (margin - newY);
      this.angle = -this.angle;
    }
    if (newY > height - margin) {
      newY = (height - margin) - (newY - (height - margin));
      this.angle = -this.angle;
    }
    
    newX = constrain(newX, margin, width - margin);
    newY = constrain(newY, margin, height - margin);
    
    this.segments.push(createVector(newX, newY));
    
    // Reduced branch creation
    if (random() < this.branchChance && this.branches.length < this.maxBranches) {
      this.createBranch(newX, newY);
    }
    
    // Reduced leaf creation
    if (random() < this.leafChance) {
      this.leaves.push({
        pos: createVector(newX, newY),
        size: random(5, 10),
        angle: random(TWO_PI)
      });
    }
    
    // Flower creation - more frequent
    if (this.segments.length > 20 && random() < 0.02 && this.flowers.length < 5) {
      this.flowers.push({
        x: newX,
        y: newY,
        petals: 5,
        size: random(12, 20),
        color: random() < 0.5 ? 'yellow' : 'orange',
        bloomProgress: 0,
        bloomDelay: random(20, 50)
      });
    }
    
    // Update flowers
    for (let flower of this.flowers) {
      if (flower.bloomDelay > 0) {
        flower.bloomDelay -= 2;
      } else if (flower.bloomProgress < 1) {
        flower.bloomProgress += 0.03;
      }
    }
    
    // Grow branches
    for (let branch of this.branches) {
      if (branch.growing) branch.grow();
    }
  }
  
  createBranch(x, y) {
    let branchAngle = this.angle + random(-PI/3, PI/3);
    let branch = {
      segments: [createVector(x, y)],
      angle: branchAngle,
      segmentLength: 3,
      thickness: this.thickness * 0.5,
      maxLength: random(20, 40),
      growing: true,
      baseColor: this.baseColor,
      grow: function() {
        if (!this.growing || this.segments.length >= this.maxLength) {
          this.growing = false;
          return;
        }
        
        if (frameCount % 2 !== 0) return; // Grow every other frame
        
        let last = this.segments[this.segments.length - 1];
        this.angle += random(-0.15, 0.15);
        
        let newX = last.x + cos(this.angle) * this.segmentLength;
        let newY = last.y + sin(this.angle) * this.segmentLength;
        
        // Bounce logic
        if (newX < margin) { newX = margin; this.angle = PI - this.angle; }
        if (newX > width - margin) { newX = width - margin; this.angle = PI - this.angle; }
        if (newY < margin) { newY = margin; this.angle = -this.angle; }
        if (newY > height - margin) { newY = height - margin; this.angle = -this.angle; }
        
        this.segments.push(createVector(newX, newY));
      }
    };
    this.branches.push(branch);
  }
  
  display() {
    // Batch draw main vine using beginShape for better performance
    if (this.segments.length > 1) {
      stroke(this.baseColor);
      strokeCap(ROUND);
      noFill();
      
      // Draw vine with varying thickness (batched)
      for (let i = 1; i < this.segments.length; i++) {
        let thickness = map(i, 0, this.segments.length, this.thickness, 2);
        strokeWeight(thickness);
        line(this.segments[i-1].x, this.segments[i-1].y, this.segments[i].x, this.segments[i].y);
      }
    }
    
    // Draw branches (batched)
    for (let branch of this.branches) {
      if (branch.segments.length > 1) {
        stroke(branch.baseColor);
        for (let i = 1; i < branch.segments.length; i++) {
          let thickness = map(i, 0, branch.segments.length, branch.thickness, 1);
          strokeWeight(thickness);
          line(branch.segments[i-1].x, branch.segments[i-1].y, branch.segments[i].x, branch.segments[i].y);
        }
      }
    }
    
    // Draw leaves (batched)
    fill(this.leafColor);
    noStroke();
    for (let leaf of this.leaves) {
      push();
      translate(leaf.pos.x, leaf.pos.y);
      rotate(leaf.angle);
      ellipse(0, 0, leaf.size, leaf.size * 1.5);
      pop();
    }
    
    // Draw simplified flowers
    for (let flower of this.flowers) {
      if (flower.bloomProgress > 0) {
        this.drawFlower(flower);
      }
    }
  }
  
  drawFlower(flower) {
    push();
    translate(flower.x, flower.y);
    
    if (flower.bloomProgress > 0.2) {
      let petalSize = (flower.bloomProgress - 0.2) / 0.8 * flower.size;
      noStroke();
      
      // Simplified petals (fewer ellipses per petal)
      for (let i = 0; i < flower.petals; i++) {
        let angle = (TWO_PI / flower.petals) * i;
        push();
        rotate(angle);
        
        if (flower.color === 'yellow') {
          fill(255, 230, 95);
          ellipse(petalSize * 0.6, 0, petalSize, petalSize * 0.7);
        } else {
          fill(255, 150, 75);
          ellipse(petalSize * 0.6, 0, petalSize, petalSize * 0.7);
        }
        pop();
      }
    }
    
    // Simplified center
    let centerSize = flower.bloomProgress * (flower.size * 0.35);
    fill(100, 70, 30);
    noStroke();
    ellipse(0, 0, centerSize, centerSize);
    
    pop();
  }
}
