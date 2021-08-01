const {
  Rover
} = require("./rover");
let rover;

beforeEach(() => {
  rover = new Rover();
});

describe("rover generic", () => {
  it("has an initial position of 0", () => {
    expect(rover.direction).toEqual(0);
  });

  it("can move given instructions", () => {
    expect(rover.currentPosition).toEqual([0, 0]);
    rover.move("LMRMM");
    expect(rover.currentPosition).toEqual([0, 2]);
  });

  it("translates direction correctly", () => {
    rover.translateInstructions(["L", "L", "R"]);
    expect(rover.direction).toEqual(-1);
  });

  it("can move position correctly and makes sure it stays on the grid", () => {
    rover.move("M");
    expect(rover.currentPosition).toEqual([0, 1]);
    rover.move("RM");
    expect(rover.currentPosition).toEqual([1, 1]);
    rover.move("RM");
    expect(rover.currentPosition).toEqual([1, 0]);
    rover.move("RM");
    expect(rover.currentPosition).toEqual([0, 0]);
    rover.move("M");
    expect(rover.currentPosition).toEqual([0, 0]);
    rover.move("LM");
    expect(rover.currentPosition).toEqual([0, 0]);
    rover.move("RRM");
    expect(rover.currentPosition).toEqual([0, 1]);
    rover.move("RM");
    expect(rover.currentPosition).toEqual([1, 1]);
  });

  it("throws when an invalid move is provided", () => {
    expect(() => rover.move("X")).toThrowErrorMatchingSnapshot();
  });
});

describe("rover1 on the move", () => {
  const rover1 = new Rover(5, [1,2]);

  it("rover 1 has initial position of 1,2 facing (N)orth", () => {
    expect(rover1.currentPosition).toEqual([1, 2]);
    expect(rover1.getCompassHeading()).toEqual('N');
  });

  it("rover 1 moves LMLMLMLMM and lands 1,3 facing (N)orth", () => {
    rover1.move('LMLMLMLMM');
    expect(rover1.currentPosition).toEqual([1, 3]);
    expect(rover1.getCompassHeading()).toEqual('N');
  });
});

describe("rover2 on the move", () => {
  const rover2 = new Rover(5, [3,3], 1);

  it("rover 2 has initial position of 3,3 facing (E)ast", () => {
    expect(rover2.currentPosition).toEqual([3, 3]);
    expect(rover2.getCompassHeading()).toEqual('E');
  });

  it("rover 2 moves MMRMMRMRRM and lands 5,1 facing (E)ast", () => {
    rover2.move('MMRMMRMRRM');
    expect(rover2.currentPosition).toEqual([5, 1]);
    expect(rover2.getCompassHeading()).toEqual('E');
  });
});