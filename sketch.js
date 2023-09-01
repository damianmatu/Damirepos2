let circle1;
let circle2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circle1 = new Circle(50, height / 2);
  circle2 = new Circle(width - 50, height / 2);
}

function draw() {
  background(220);

  circle1.update();
  circle2.update();

  circle1.checkCollision(circle2);
  circle2.checkCollision(circle1);

  circle1.display();
  circle2.display();
}

function mouseClicked() {
  circle1.changeColor();
  circle2.changeColor();
  circle1.changeDirection();
  circle2.changeDirection();
}

class Circle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(3, 0);
    this.radius = 30;
    this.color = color(255, 0, 0);
  }

  update() {
    this.position.add(this.velocity);

    if (this.position.x > width + this.radius) {
      this.position.x = -this.radius;
    } else if (this.position.x < -this.radius) {
      this.position.x = width + this.radius;
    }
  }

  checkCollision(other) {
    const d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    if (d < this.radius + other.radius) {
      this.changeColor();
      other.changeColor();
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }

  changeColor() {
    const colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255)];
    const currentColor = this.color.toString();
    const index = colors.findIndex(c => c.toString() === currentColor);
    const nextIndex = (index + 1) % colors.length;
    this.color = colors[nextIndex];
  }

  changeDirection() {
    this.velocity.x *= -1;
  }
}
