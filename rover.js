const compassPoints = ["N", "E", "S", "W"];

const proxy = new Proxy(compassPoints, {
  get(target, prop) {
      if (!isNaN(prop)) {
          prop = parseInt(prop, 10);
          if (prop < 0) {
              prop += target.length;
          }
      }
      return target[prop];
  }
});

class Rover {
  constructor(gridDimension = 5, currentPosition = [0,0], direction = 0) {
    this.currentPosition = currentPosition;
    this.direction = direction;
    this.gridDimension = gridDimension;
  }

  move(instructions) {
    const individualInstructions = instructions.split("");
    this.translateInstructions(individualInstructions);
  }

  shiftUp() {
    let [x, y] = this.currentPosition;
    if (y !== this.gridDimension) y = ++y;
    this.currentPosition = [x, y];
  }

  shiftDown() {
    let [x, y] = this.currentPosition;
    if (y !== 0) y = --y;
    this.currentPosition = [x, y];
  }

  /**
   * AG: The original implementation didn't work as it had an implementation where a the edges of the grid
   * would make you come out to the other side. True in Pacman, false on Mars ;-)
   */
  shiftLeft() {
    let [x, y] = this.currentPosition;
    if (x !== 0) x = --x;
    this.currentPosition = [x, y];
  }

  shiftRight() {
    let [x, y] = this.currentPosition;
    if (x !== this.gridDimension) x = ++x;
    this.currentPosition = [x, y];
  }

  /**
   * AG: The original implementation didn't work as it would result in negative indexes, which return
   * undefined in JS. Therefore used a Proxy object to deal with that.
   */
  getCompassHeading() {
    const index = proxy[this.direction % compassPoints.length]
    return index;
  }

  shiftRoverPosition() {
    const moveDirection = this.getCompassHeading();
    if (moveDirection === "N") this.shiftUp();
    else if (moveDirection === "S") this.shiftDown();
    else if (moveDirection === "E") this.shiftRight();
    else if (moveDirection === "W") this.shiftLeft();
  }

  translateInstructions(instructions) {
    instructions.forEach(instruction => {
      if (instruction === "L") this.direction--;
      else if (instruction === "R") this.direction++;
      else if (instruction === "M") this.shiftRoverPosition();
      else throw new Error("Invalid instruction provided");
    });
  }
}

module.exports = {
  Rover
};
