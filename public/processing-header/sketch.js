// Header Vines - Oval wreath around the name
let vines = [];
let centerX, centerY;
let ovalRadiusX = 140; // Horizontal radius around name
let ovalRadiusY = 30; // Vertical radius around name

function setup() {
  createCanvas(windowWidth, 80); // Header height
  
  centerX = width / 2;
  centerY = height / 2;
  
  // Create 8 vine segments that each cover a portion of the oval
  // Each vine grows only 3/4 of the way around, creating gaps
  for (let i = 0; i < 8; i++) {
    let startAngle = (TWO_PI / 8) * i;
    let startX = centerX + cos(startAngle) * ovalRadiusX;
    let startY = centerY + sin(startAngle) * ovalRadiusY;
    let clockwise = i % 2 === 0; // Alternate directions
    let targetAngle = startAngle + (clockwise ? PI * 0.7 : -PI * 0.7); // Grow 70% around
    vines.push(new Vine(startX, startY, startAngle, clockwise, targetAngle));
  }
}

function draw() {
  clear(); // Transparent background
  
  // Update and display vines with varied growth rates
  for (let vine of vines) {
    if (random() < vine.growthRate) {
      vine.grow();
    }
    vine.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 80);
  centerX = width / 2;
  centerY = height / 2;
  
  // Reset vines
  vines = [];
  for (let i = 0; i < 8; i++) {
    let startAngle = (TWO_PI / 8) * i;
    let startX = centerX + cos(startAngle) * ovalRadiusX;
    let startY = centerY + sin(startAngle) * ovalRadiusY;
    let clockwise = i % 2 === 0;
    let targetAngle = startAngle + (clockwise ? PI * 0.7 : -PI * 0.7);
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
    this.growthRate = random(0.6, 1.4); // Vary growth speed
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
    
    // Add small leaves occasionally
    if (this.segments.length > 5 && random() < 0.12) {
      this.leaves.push({
        x: newX,
        y: newY,
        angle: directionAngle + random(-PI/3, PI/3),
        size: random(3, 6)
      });
    }
    
    // Add flowers occasionally (small dots for header)
    if (this.segments.length > 10 && random() < 0.20) {
      let flowerSize = random(26, 30); // Larger flowers for header
      
      // Pre-generate random petal rotations
      let petalCount = floor(random(5, 7));
      let petalRotations = [];
      for (let i = 0; i < petalCount; i++) {
        petalRotations.push(random(-0.1, 0.1));
      }
      
      this.flowers.push({
        x: newX,
        y: newY,
        petals: petalCount,
        petalRotations: petalRotations,
        size: flowerSize,
        color: random() < 0.5 ? 'yellow' : 'orange',
        bloomProgress: 0,
        bloomDelay: random(10, 40) // Shorter delay to bloom faster
      });
    }
    
    // Bloom all flowers
    for (let flower of this.flowers) {
      if (flower.bloomDelay > 0) {
        flower.bloomDelay--;
      } else if (flower.bloomProgress < 1) {
        flower.bloomProgress += 0.01;
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
    
    // Draw flowers
    for (let flower of this.flowers) {
      if (flower.bloomProgress > 0) {
        push();
        translate(flower.x, flower.y);
        
        // Petals
        if (flower.bloomProgress > 0.2) {
          let petalSize = (flower.bloomProgress - 0.2) / 0.8 * flower.size;
          noStroke();
          
          for (let i = 0; i < flower.petals; i++) {
            let angle = (TWO_PI / flower.petals) * i;
            let petalRotation = flower.petalRotations[i];
            push();
            rotate(angle + petalRotation);
            
            if (flower.color === 'yellow') {
              // Yellow petals - layered
              fill(240, 200, 60, 160);
              ellipse(petalSize * 0.65, 0, petalSize * 0.95, petalSize * 0.65);
              fill(255, 230, 95);
              ellipse(petalSize * 0.6, 0, petalSize, petalSize * 0.75);
              fill(255, 240, 130, 200);
              ellipse(petalSize * 0.45, 0, petalSize * 0.7, petalSize * 0.5);
            } else {
              // Orange petals - layered
              fill(230, 110, 50, 160);
              ellipse(petalSize * 0.65, 0, petalSize * 0.95, petalSize * 0.65);
              fill(255, 140, 70);
              ellipse(petalSize * 0.6, 0, petalSize, petalSize * 0.75);
              fill(255, 170, 110, 200);
              ellipse(petalSize * 0.45, 0, petalSize * 0.7, petalSize * 0.5);
            }
            pop();
          }
        }
        
        // Flower center
        let centerSize = flower.bloomProgress * flower.size * 0.4;
        noStroke();
        fill(180, 120, 40); // Brown center
        ellipse(0, 0, centerSize, centerSize);
        fill(200, 140, 60, 180); // Lighter highlight
        ellipse(-centerSize * 0.15, -centerSize * 0.15, centerSize * 0.6, centerSize * 0.6);
        
        pop();
      }
    }
  }
}
