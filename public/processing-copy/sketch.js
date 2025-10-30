// Growing Vines Sketch - Circle Edition
let vines = [];
let backgroundColor;
let centerX, centerY;
let targetRadius;
let noiseOverlay;

function setup() {
  createCanvas(window.innerWidth || 800, window.innerHeight || 600);
  backgroundColor = createBackground();
  noiseOverlay = createNoiseOverlay();
  
  centerX = width / 2;
  centerY = height / 2;
  targetRadius = min(width, height) * 0.35;
  
  let topBottomCount = 10;
  let sideCount = 6;
  
  for (let i = 0; i < topBottomCount; i++) {
    let x = map(i, 0, topBottomCount - 1, 50, width - 50);
    vines.push(new Vine(x, 10));
  }
  
  for (let i = 0; i < sideCount; i++) {
    let y = map(i, 0, sideCount - 1, 50, height - 50);
    vines.push(new Vine(width - 10, y));
  }
  
  for (let i = 0; i < topBottomCount; i++) {
    let x = map(i, 0, topBottomCount - 1, 50, width - 50);
    vines.push(new Vine(x, height - 10));
  }
  
  for (let i = 0; i < sideCount; i++) {
    let y = map(i, 0, sideCount - 1, 50, height - 50);
    vines.push(new Vine(10, y));
  }
}

function draw() {
  image(backgroundColor, 0, 0);
  
  for (let vine of vines) {
    if (vine.growing) {
      vine.grow();
    }
    vine.display();
  }
  
  // Draw static noise grain overlay
  image(noiseOverlay, 0, 0);
}

function createBackground() {
  let bg = createGraphics(width, height);
  
  // Blue-gray base - cooler, more blue-leaning
  bg.background(230, 235, 240);
  
  // Create more visible gradient blobs
  bg.noStroke();
  
  // Yellow blobs - warmer, more saturated
  for (let i = 0; i < 4; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(150, 300);
    let gradient = bg.drawingContext.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, 'rgba(255, 235, 160, 0.3)');
    gradient.addColorStop(0.5, 'rgba(255, 240, 180, 0.15)');
    gradient.addColorStop(1, 'rgba(255, 240, 180, 0)');
    bg.drawingContext.fillStyle = gradient;
    bg.ellipse(x, y, size * 2, size * 2);
  }
  
  // Orange blobs - more vibrant
  for (let i = 0; i < 4; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(150, 300);
    let gradient = bg.drawingContext.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, 'rgba(255, 180, 120, 0.28)');
    gradient.addColorStop(0.5, 'rgba(255, 200, 150, 0.14)');
    gradient.addColorStop(1, 'rgba(255, 200, 150, 0)');
    bg.drawingContext.fillStyle = gradient;
    bg.ellipse(x, y, size * 2, size * 2);
  }
  
  // Green blobs - more saturated
  for (let i = 0; i < 4; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(150, 300);
    let gradient = bg.drawingContext.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, 'rgba(160, 220, 170, 0.28)');
    gradient.addColorStop(0.5, 'rgba(180, 220, 180, 0.14)');
    gradient.addColorStop(1, 'rgba(180, 220, 180, 0)');
    bg.drawingContext.fillStyle = gradient;
    bg.ellipse(x, y, size * 2, size * 2);
  }
  
  return bg;
}

function createNoiseOverlay() {
  let overlay = createGraphics(width, height);
  overlay.clear(); // Start with transparent canvas
  overlay.loadPixels();
  for (let i = 0; i < overlay.pixels.length; i += 4) {
    let grain = random(-12, 12);
    // Only set alpha to the grain value for subtle overlay
    overlay.pixels[i] = 128;         // Mid gray
    overlay.pixels[i + 1] = 128;     // Mid gray
    overlay.pixels[i + 2] = 128;     // Mid gray
    overlay.pixels[i + 3] = abs(grain) * 3.5; // More visible grain effect
  }
  overlay.updatePixels();
  return overlay;
}

function windowResized() {
  resizeCanvas(window.innerWidth || 800, window.innerHeight || 600);
  backgroundColor = createBackground();
  noiseOverlay = createNoiseOverlay();
  centerX = width / 2;
  centerY = height / 2;
  targetRadius = min(width, height) * 0.35;
}

class Vine {
  constructor(startX, startY) {
    this.segments = [createVector(startX, startY)];
    this.angle = atan2(centerY - startY, centerX - startX);
    this.segmentLength = 3;
    this.thickness = random(8, 14);
    this.maxLength = random(200, 350);
    this.growing = true;
    this.clockwise = random() < 0.5;
    this.leaves = [];
    this.leafChance = 0.06;
    this.flowers = [];
    this.branches = [];
    this.branchChance = 0.05; // Increased chance for thicker outline
    this.maxBranches = 6; // More branches allowed
    this.baseColor = color(random(30, 60), random(80, 120), random(30, 50));
    this.leafColor = color(random(60, 100), random(120, 180), random(40, 80));
  }
  
  grow() {
    if (!this.growing || frameCount % 2 !== 0 || this.segments.length >= this.maxLength) return;
    
    let last = this.segments[this.segments.length - 1];
    let distToCenter = dist(last.x, last.y, centerX, centerY);
    
    if (distToCenter > targetRadius + 80) {
      // Far from circle - grow toward it
      let targetAngle = atan2(centerY - last.y, centerX - last.x);
      this.angle = lerp(this.angle, targetAngle, 0.15);
      this.angle += random(-0.3, 0.3);
    } else {
      // Near circle - orbit around it at constant radius
      // Calculate our current angular position
      let currentAngle = atan2(last.y - centerY, last.x - centerX);
      
      // Step to next angle position
      let angleStep = this.clockwise ? 0.08 : -0.08;
      let nextAngle = currentAngle + angleStep;
      
      // Calculate target position on circle
      let orbitRadius = targetRadius + 40;
      let targetX = centerX + cos(nextAngle) * orbitRadius;
      let targetY = centerY + sin(nextAngle) * orbitRadius;
      
      // Point toward that target
      let desiredAngle = atan2(targetY - last.y, targetX - last.x);
      
      // Smoothly rotate toward desired angle to avoid sharp turns
      let angleDiff = desiredAngle - this.angle;
      // Normalize angle difference to -PI to PI
      while (angleDiff > PI) angleDiff -= TWO_PI;
      while (angleDiff < -PI) angleDiff += TWO_PI;
      
      this.angle += angleDiff * 0.5; // Smooth rotation
      this.angle += random(-0.05, 0.05);
    }
    
    let newX = last.x + cos(this.angle) * this.segmentLength;
    let newY = last.y + sin(this.angle) * this.segmentLength;
    
    if (newX < 10 || newX > width - 10 || newY < 10 || newY > height - 10) {
      this.growing = false;
      return;
    }
    
    let newDist = dist(newX, newY, centerX, centerY);
    if (newDist < targetRadius - 10) {
      this.growing = false;
      return;
    }
    
    // CRITICAL: Only stop if moving significantly away AND close to edge
    if (distToCenter < targetRadius + 100 && newDist > distToCenter + 8) {
      let edgeDist = min(newX - 10, width - 10 - newX, newY - 10, height - 10 - newY);
      if (edgeDist < 100) {
        this.growing = false;
        return;
      }
    }
    
    this.segments.push(createVector(newX, newY));
    
    // Create branches when near the circle for thicker coverage
    if (distToCenter < targetRadius + 80 && random() < this.branchChance && this.branches.length < this.maxBranches) {
      this.createBranch(newX, newY);
    }
    
    if (random() < this.leafChance) {
      this.leaves.push({
        pos: createVector(newX, newY),
        size: random(5, 12),
        angle: random(TWO_PI)
      });
    }
    
    // Create multiple flowers at random points along vine (slightly increased frequency)
    if (this.segments.length > 50 && random() < 0.008) {
      // Calculate size based on distance from center (bigger at edges, smaller at center)
      let maxDist = dist(0, 0, width/2, height/2); // Max possible distance from center
      let distFromCenter = dist(newX, newY, centerX, centerY);
      let sizeMultiplier = map(distFromCenter, targetRadius, maxDist, 0.5, 1.5);
      let flowerSize = random(15, 30) * sizeMultiplier;
      
      // Pre-generate random petal rotations
      let petalCount = floor(random(5, 8));
      let petalRotations = [];
      for (let i = 0; i < petalCount; i++) {
        petalRotations.push(random(-0.1, 0.1));
      }
      
      this.flowers.push({
        x: newX,
        y: newY,
        petals: petalCount,
        petalRotations: petalRotations, // Store static rotations
        size: flowerSize,
        color: random() < 0.5 ? 'yellow' : 'orange',
        bloomProgress: 0,
        bloomDelay: random(50, 150) // Delay before blooming starts
      });
    }
    
    // Bloom all flowers (with delay)
    for (let flower of this.flowers) {
      if (flower.bloomDelay > 0) {
        flower.bloomDelay--;
      } else if (flower.bloomProgress < 1) {
        flower.bloomProgress += 0.008; // Slower bloom
      }
    }
    
    // Grow branches
    for (let branch of this.branches) {
      if (branch.growing) {
        branch.grow();
      }
    }
  }
  
  createBranch(x, y) {
    let branch = {
      segments: [createVector(x, y)],
      angle: this.angle + random(-PI/3, PI/3), // Branch at angle from main vine
      segmentLength: 2,
      thickness: this.thickness * 0.6,
      maxLength: random(30, 60),
      growing: true,
      baseColor: this.baseColor
    };
    
    branch.grow = () => {
      if (!branch.growing || branch.segments.length >= branch.maxLength) {
        branch.growing = false;
        return;
      }
      
      if (frameCount % 3 === 0) { // Grow slower than main vine
        let last = branch.segments[branch.segments.length - 1];
        
        // Add slight curve
        branch.angle += random(-0.2, 0.2);
        
        let newX = last.x + cos(branch.angle) * branch.segmentLength;
        let newY = last.y + sin(branch.angle) * branch.segmentLength;
        
        // Check bounds
        if (newX < 10 || newX > width - 10 || newY < 10 || newY > height - 10) {
          branch.growing = false;
          return;
        }
        
        let distToCenter = dist(newX, newY, centerX, centerY);
        if (distToCenter < targetRadius - 10) {
          branch.growing = false;
          return;
        }
        
        // Stop if moving away from circle
        let lastDist = dist(last.x, last.y, centerX, centerY);
        if (distToCenter < targetRadius + 100 && distToCenter > lastDist + 5) {
          branch.growing = false;
          return;
        }
        
        branch.segments.push(createVector(newX, newY));
      }
    };
    
    this.branches.push(branch);
  }
  
  display() {
    if (this.segments.length > 1) {
      strokeCap(ROUND);
      noFill();
      for (let i = 1; i < this.segments.length; i++) {
        let thickness = map(i, 0, this.segments.length, this.thickness, 2);
        stroke(this.baseColor);
        strokeWeight(thickness);
        line(this.segments[i-1].x, this.segments[i-1].y, this.segments[i].x, this.segments[i].y);
      }
    }
    
    // Draw branches
    for (let branch of this.branches) {
      if (branch.segments.length > 1) {
        strokeCap(ROUND);
        noFill();
        for (let i = 1; i < branch.segments.length; i++) {
          let thickness = map(i, 0, branch.segments.length, branch.thickness, 1);
          stroke(branch.baseColor);
          strokeWeight(thickness);
          line(branch.segments[i-1].x, branch.segments[i-1].y, branch.segments[i].x, branch.segments[i].y);
        }
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
    
    // Draw all flowers with more realistic appearance
    for (let flower of this.flowers) {
      if (flower.bloomProgress > 0) {
        push();
        translate(flower.x, flower.y);
        
        // Petals (drawn first so center overlaps)
        if (flower.bloomProgress > 0.2) {
          let petalSize = (flower.bloomProgress - 0.2) / 0.8 * flower.size;
          
          noStroke(); // Remove all petal outlines
          
          // Draw petals with natural gradient layers
          for (let i = 0; i < flower.petals; i++) {
            let angle = (TWO_PI / flower.petals) * i;
            let petalRotation = flower.petalRotations[i]; // Use stored rotation
            push();
            rotate(angle + petalRotation);
            
            if (flower.color === 'yellow') {
              // Yellow flower - soft layered petals
              // Base/shadow layer
              fill(240, 200, 60, 160);
              ellipse(petalSize * 0.65, 0, petalSize * 0.95, petalSize * 0.65);
              
              // Mid layer - main petal color
              fill(255, 230, 95);
              ellipse(petalSize * 0.6, 0, petalSize, petalSize * 0.75);
              
              // Inner gradient toward center
              fill(255, 240, 130, 200);
              ellipse(petalSize * 0.45, 0, petalSize * 0.7, petalSize * 0.5);
              
              // Subtle highlight
              fill(255, 250, 200, 120);
              ellipse(petalSize * 0.4, -petalSize * 0.08, petalSize * 0.5, petalSize * 0.35);
            } else {
              // Orange flower - warm gradient petals
              // Base/shadow layer
              fill(230, 110, 50, 160);
              ellipse(petalSize * 0.65, 0, petalSize * 0.95, petalSize * 0.65);
              
              // Mid layer - main petal color
              fill(255, 150, 75);
              ellipse(petalSize * 0.6, 0, petalSize, petalSize * 0.75);
              
              // Inner gradient toward center
              fill(255, 180, 100, 200);
              ellipse(petalSize * 0.45, 0, petalSize * 0.7, petalSize * 0.5);
              
              // Subtle highlight
              fill(255, 210, 150, 120);
              ellipse(petalSize * 0.4, -petalSize * 0.08, petalSize * 0.5, petalSize * 0.35);
            }
            pop();
          }
        }
        
        // Flower center with texture
        let centerSize = flower.bloomProgress * (flower.size * 0.35);
        
        // Outer center ring
        fill(100, 70, 30);
        noStroke();
        ellipse(0, 0, centerSize * 1.2, centerSize * 1.2);
        
        // Main center
        fill(120, 85, 40);
        ellipse(0, 0, centerSize, centerSize);
        
        // Center texture (seeds/stamens)
        fill(80, 60, 25);
        for (let i = 0; i < 8; i++) {
          let a = (TWO_PI / 8) * i;
          let r = centerSize * 0.25;
          ellipse(cos(a) * r, sin(a) * r, centerSize * 0.15, centerSize * 0.15);
        }
        
        // Center highlight
        fill(140, 100, 50, 180);
        ellipse(-centerSize * 0.15, -centerSize * 0.15, centerSize * 0.4, centerSize * 0.4);
        
        pop();
      }
    }
  }
}
