// Decorative Border Vine Sketch - Grows along rectangular perimeter
let vines = [];
let margin = 20; // Distance from edge
let vineSpacing = 80; // Distance between vine starting points

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeVines();
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
  resizeCanvas(windowWidth, windowHeight);
  initializeVines();
}

function initializeVines() {
  vines = [];
  
  // Top edge - vines grow left to right
  for (let x = margin; x < width - margin; x += vineSpacing) {
    vines.push(new BorderVine(x, margin, 0, 'horizontal')); // 0 = right
  }
  
  // Right edge - vines grow top to bottom
  for (let y = margin; y < height - margin; y += vineSpacing) {
    vines.push(new BorderVine(width - margin, y, HALF_PI, 'vertical')); // HALF_PI = down
  }
  
  // Bottom edge - vines grow right to left
  for (let x = width - margin; x > margin; x -= vineSpacing) {
    vines.push(new BorderVine(x, height - margin, PI, 'horizontal')); // PI = left
  }
  
  // Left edge - vines grow bottom to top
  for (let y = height - margin; y > margin; y -= vineSpacing) {
    vines.push(new BorderVine(margin, y, -HALF_PI, 'vertical')); // -HALF_PI = up
  }
}

class BorderVine {
  constructor(startX, startY, startAngle, direction) {
    this.segments = [];
    this.segments.push(createVector(startX, startY));
    
    this.angle = startAngle;
    this.direction = direction; // 'horizontal' or 'vertical'
    this.angleVariation = 0.3; // Match Hero vines
    this.segmentLength = 3; // Match Hero vines
    this.thickness = random(8, 14); // Match Hero vines
    this.maxLength = random(80, 150); // Reduced from 200-350
    this.growing = true;
    this.growthRate = random(0.5, 1.5); // Vary growth speed like Hero
    
    // Branching properties - match Hero
    this.branches = [];
    this.branchChance = 0.05;
    this.maxBranches = 6;
    
    // Leaf properties - match Hero
    this.leaves = [];
    this.leafChance = 0.06;
    
    // Flower properties - match Hero
    this.flowers = [];
    
    // Color variation - match Hero vines exactly
    this.baseColor = color(random(30, 60), random(80, 120), random(30, 50));
    this.leafColor = color(random(60, 100), random(120, 180), random(40, 80));
  }
  
  grow() {
    if (!this.growing || this.segments.length >= this.maxLength) return;
    
    // Apply growth rate like Hero vines
    if (random() < this.growthRate) {
      let lastSegment = this.segments[this.segments.length - 1];
      
      // Add organic curve
      this.angle += random(-this.angleVariation, this.angleVariation);
      
      // Calculate new segment position
      let newX = lastSegment.x + cos(this.angle) * this.segmentLength;
      let newY = lastSegment.y + sin(this.angle) * this.segmentLength;
      
      // Check bounds
      if (newX < 10 || newX > width - 10 || newY < 10 || newY > height - 10) {
        this.growing = false;
        return;
      }
      
      this.segments.push(createVector(newX, newY));
      
      // Create branches like Hero vines
      if (random() < this.branchChance && this.branches.length < this.maxBranches) {
        this.createBranch(newX, newY);
      }
      
      // Add leaves like Hero vines
      if (random() < this.leafChance) {
        this.leaves.push({
          pos: createVector(newX, newY),
          size: random(5, 12),
          angle: random(TWO_PI)
        });
      }
      
      // Create flowers like Hero vines
      if (this.segments.length > 50 && random() < 0.008) {
        let flowerSize = random(15, 30);
        let petalCount = floor(random(5, 8));
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
          bloomDelay: random(50, 150)
        });
      }
      
      // Bloom flowers
      for (let flower of this.flowers) {
        if (flower.bloomDelay > 0) {
          flower.bloomDelay -= 2;
        } else if (flower.bloomProgress < 1) {
          flower.bloomProgress += 0.02;
        }
      }
      
      // Grow branches
      for (let branch of this.branches) {
        if (branch.growing) {
          branch.grow();
        }
      }
    }
  }
  
  createBranch(x, y) {
    let branch = {
      segments: [createVector(x, y)],
      angle: this.angle + random(-PI/3, PI/3),
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
      
      if (frameCount % 3 === 0) {
        let last = branch.segments[branch.segments.length - 1];
        branch.angle += random(-0.2, 0.2);
        
        let newX = last.x + cos(branch.angle) * branch.segmentLength;
        let newY = last.y + sin(branch.angle) * branch.segmentLength;
        
        if (newX < 10 || newX > width - 10 || newY < 10 || newY > height - 10) {
          branch.growing = false;
          return;
        }
        
        branch.segments.push(createVector(newX, newY));
      }
    };
    
    this.branches.push(branch);
  }
  
  display() {
    // Draw main vine exactly like Hero
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
    
    // Draw branches exactly like Hero
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
    
    // Draw leaves exactly like Hero
    fill(this.leafColor);
    noStroke();
    for (let leaf of this.leaves) {
      push();
      translate(leaf.pos.x, leaf.pos.y);
      rotate(leaf.angle);
      ellipse(0, 0, leaf.size, leaf.size * 1.5);
      pop();
    }
    
    // Draw flowers exactly like Hero
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
              fill(240, 200, 60, 160);
              ellipse(petalSize * 0.65, 0, petalSize * 0.95, petalSize * 0.65);
              fill(255, 230, 95);
              ellipse(petalSize * 0.6, 0, petalSize, petalSize * 0.75);
              fill(255, 240, 130, 200);
              ellipse(petalSize * 0.45, 0, petalSize * 0.7, petalSize * 0.5);
              fill(255, 250, 200, 120);
              ellipse(petalSize * 0.4, -petalSize * 0.08, petalSize * 0.5, petalSize * 0.35);
            } else {
              fill(230, 110, 50, 160);
              ellipse(petalSize * 0.65, 0, petalSize * 0.95, petalSize * 0.65);
              fill(255, 150, 75);
              ellipse(petalSize * 0.6, 0, petalSize, petalSize * 0.75);
              fill(255, 180, 100, 200);
              ellipse(petalSize * 0.45, 0, petalSize * 0.7, petalSize * 0.5);
              fill(255, 210, 150, 120);
              ellipse(petalSize * 0.4, -petalSize * 0.08, petalSize * 0.5, petalSize * 0.35);
            }
            pop();
          }
        }
        
        // Flower center with texture
        let centerSize = flower.bloomProgress * (flower.size * 0.35);
        fill(100, 70, 30);
        noStroke();
        ellipse(0, 0, centerSize * 1.2, centerSize * 1.2);
        fill(120, 85, 40);
        ellipse(0, 0, centerSize, centerSize);
        fill(80, 60, 25);
        for (let i = 0; i < 8; i++) {
          let a = (TWO_PI / 8) * i;
          let r = centerSize * 0.25;
          ellipse(cos(a) * r, sin(a) * r, centerSize * 0.15, centerSize * 0.15);
        }
        fill(140, 100, 50, 180);
        ellipse(-centerSize * 0.15, -centerSize * 0.15, centerSize * 0.4, centerSize * 0.4);
        
        pop();
      }
    }
  }
}
