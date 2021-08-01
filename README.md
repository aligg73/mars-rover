# mars-rover
Mars-rover technical challenge

Based on the work done here: https://dev.to/jamesrweb/mars-rover-1e7n
...with a few notable differences:

1. Changed the move logic to not let a rover run off the grid (and appear on the other side, either vertically or horizontally)
2. Fixed a bug with negative Javascript indexes not returning a compass point (but undefined instead). Fixed that by using a Proxy object wrapped inside a function.
3. Added more test cases, including testing for the proper compass orientation of the Rover in the begin and end state.

Feel free to embrace and extend.

Thanks.
