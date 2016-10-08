class Circle {
  constructor(x, y, radius, lineWidth, shrinkValue, board_width, board_height) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.lineWidth = lineWidth;
    this.shrinkValue = shrinkValue;
    this.board_width = board_width;
    this.board_height = board_height;
  }

  shrink() {
    this.radius -= this.shrinkValue;
  }

  getLineWidth(){
    return this.lineWidth;
  }

  getY() {
    return this.y;
  }

  getX() {
    return this.x;
  }

  getRadius() {
    return this.radius;
  }
}
