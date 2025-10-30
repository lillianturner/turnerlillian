// Header Vines - Oval wreath around the name
let vines = [];
let centerX, centerY;
let ovalRadiusX = 140; // Horizontal radius around name
let ovalRadiusY = 30; // Vertical radius around name

function setup() {
  createCanvas(windowWidth, 80); // Header height
  frameRate(30); // Reduce frame rate for better performance
  
  centerX = width / 2;
  centerY = height / 2;
  
  // Create 6 vine segments instead of 8 for better performance
  for (let i = 0; i < 6; i++) {
    let startAngle = (TWO_PI / 6) * i;
    let startX = centerX + cos(startAngle) * ovalRadiusX;
    let startY = centerY + sin(startAngle) * ovalRadiusY;
    let clockwise = i % 2 === 0; // Alternate directions
    let targetAngle = startAngle + (clockwise ? PI * 0.6 : -PI * 0.6); // Grow 60% around (shorter)
    vines.push(new Vine(startX, startY, startAngle, clockwise, targetAngle));
  }
}

function draw() {
  clear(); // Transparent background
  
  // Update and display vines with reduced growth frequency
  let allStopped = true;
  for (let vine of vines) {
    if (vine.growing) {
      allStopped = false;
      // Reduce growth frequency for better performance
      if (random() < vine.growthRate * 0.7) {
        vine.grow();
      }
    }
    vine.show();
  }
  
  // Stop the animation loop once all vines are done growing
  if (allStopped) {
    noLoop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 80);
  centerX = width / 2;
  centerY = height / 2;
  
  // Reset vines with optimized count
  vines = [];
  for (let i = 0; i < 6; i++) {
    let startAngle = (TWO_PI / 6) * i;
    let startX = centerX + cos(startAngle) * ovalRadiusX;
    let startY = centerY + sin(startAngle) * ovalRadiusY;
    let clockwise = i % 2 === 0;
    let targetAngle = startAngle + (clockwise ? PI * 0.6 : -PI * 0.6);
    vines.push(new Vine(startX, startY, startAngle, clockwise, targetAngle));
  }
}

class Vine {
  constructor(x, y, startAngle, clockwise, targetAngle) {
    this.segments = [];
    this.segments.push({x: x, y: y});
    this.startAngle = startAngle;
    this.currentAngle = startAngle;
    this.targetAngle = targetAngle;
    this.clockwise = clockwise;
    this.segmentLength = 2;
    this.thickness = 1.5;
    this.growing = true;
    this.growthRate = random(0.4, 0.8); // Reduced growth rate for better performance
    this.color = color(6, 95, 70, 180); // Forest green with transparency
    this.leaves = [];
    this.flowers = [];
  }
  
  grow() {
    if (!this.growing) return;
    
    let last = this.segments[this.segments.length - 1];
    
    // Check if we've reached the target angle
    let angleToGo = this.clockwise 
      ? this.targetAngle - this.currentAngle
      : this.currentAngle - this.targetAngle;
    
    // Normalize angle difference
    while (angleToGo > PI) angleToGo -= TWO_PI;
    while (angleToGo < -PI) angleToGo += TWO_PI;
    
    if (abs(angleToGo) < 0.1) {
      this.growing = false;
      return;
    }
    
    // Orbit around the ellipse - step to next angular position
    let angleStep = this.clockwise ? 0.035 : -0.035;
    this.currentAngle += angleStep;
    
    // Calculate target position on the oval
    let targetX = centerX + cos(this.currentAngle) * ovalRadiusX;
    let targetY = centerY + sin(this.currentAngle) * ovalRadiusY;
    
    // Calculate direction toward that target
    let directionAngle = atan2(targetY - last.y, targetX - last.x);
    
    // Add slight organic variation
    directionAngle += random(-0.08, 0.08);
    
    // Calculate new position
    let newX = last.x + cos(directionAngle) * this.segmentLength;
    let newY = last.y + sin(directionAngle) * this.segmentLength;
    
    this.segments.push({x: newX, y: newY});
    
    // Add small leaves occasionally (reduced frequency)
    if (this.segments.length > 5 && random() < 0.08) {
      this.leaves.push({
        x: newX,
        y: newY,
        angle: directionAngle + random(-PI/3, PI/3),
        size: random(3, 6)
      });
    }
    
    // Add flowers occasionally (reduced frequency and simplified)
    if (this.segments.length > 10 && random() < 0.12) {
      let flowerSize = random(20, 24); // Smaller flowers for better performance
      
      this.flowers.push({
        x: newX,
        y: newY,
        petals: 5, // Fixed petal count for simplicity
        size: flowerSize,
        color: random() < 0.5 ? 'yellow' : 'orange',
        bloomProgress: 0,
        bloomDelay: random(5, 15) // Shorter delay
      });
    }
    
    // Bloom all flowers (simplified)
    for (let flower of this.flowers) {
      if (flower.bloomDelay > 0) {
        flower.bloomDelay--;
      } else if (flower.bloomProgress < 1) {
        flower.bloomProgress += 0.02; // Faster blooming
      }
    }
  }
  
  show() {
    // Draw vine stem
    stroke(this.color);
    strokeWeight(this.thickness);
    noFill();
    
    beginShape();
    for (let seg of this.segments) {
      vertex(seg.x, seg.y);
    }
    endShape();
    
    // Draw tiny leaves
    noStroke();
    fill(6, 95, 70, 120);
    for (let leaf of this.leaves) {
      push();
      translate(leaf.x, leaf.y);
      rotate(leaf.angle);
      ellipse(0, 0, leaf.size, leaf.size * 1.5);
      pop();
    }
    
    // Draw flowers (simplified)
    for (let flower of this.flowers) {
      if (flower.bloomProgress > 0) {
        push();
        translate(flower.x, flower.y);
        
        // Simple circular petals
        if (flower.bloomProgress > 0.2) {
          let petalSize = (flower.bloomProgress - 0.2) / 0.8 * flower.size;
          noStroke();
          
          for (let i = 0; i < flower.petals; i++) {
            let angle = (TWO_PI / flower.petals) * i;
            push();
            rotate(angle);
            
            if (flower.color === 'yellow') {
              fill(255, 230, 95, 180);
            } else {
              fill(255, 140, 70, 180);
            }
            ellipse(petalSize * 0.4, 0, petalSize * 0.6, petalSize * 0.4);
            pop();
          }
        }
        
        // Simple flower center
        let centerSize = flower.bloomProgress * flower.size * 0.3;
        noStroke();
        fill(180, 120, 40);
        ellipse(0, 0, centerSize, centerSize);
        
        pop();
      }
    }
  }
}
