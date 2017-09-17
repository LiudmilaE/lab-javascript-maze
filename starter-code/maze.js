var Maze = function(map, exit) {
  this._miner = {
    row: 0,
    col: 0,
    dir: 0 // 0:up, 1:right, 2: down, 3:left
  };
  this._maze = map; /// 7 rows * 6 columns
  this._exit = {
    row: exit.row,
    col: exit.col
  };
};

/* //directions
var dirs = {
  up: 0,
  right: 1,
  down: 2,
  left: 3
};
*/

Maze.prototype.turnLeft      = function(){
  var dirs= this._miner.dir;
  switch (dirs) {
    case 0: dirs = 3; break; //up -> left
    case 1: dirs = 0; break; //right -> up
    case 2: dirs = 1; break; //down -> right
    case 3: dirs = 2; break; //left -> down
  }
};

Maze.prototype.turnRight     = function(){
  var dirs= this._miner.dir;
  switch (dirs) {
    case 0: dirs = 1;  break;
    case 1: dirs = 2;  break;
    case 2: dirs = 3;  break;
    case 3: dirs = 0;  break;
  }
};

Maze.prototype.isPathForward = function(){
  /*if(this._miner.row-1<0 || this._miner.row+1>6 || this._miner.col+1>5 || this._miner.col-1<0 ) {
    return false;
  }

  switch (this._miner.dir) {
    case 0:
      return (this._miner.row!==0 && this._maze[this._miner.row-1][ this._miner.col] === "T" );
    case 1:
      return (this._miner.col!==5 && this._maze[this._miner.row][ this._miner.col+1] === "T");
    case 2:
      return (this._miner.row!==6 && this._maze[this._miner.row+1][ this._miner.col] === "T");
    case 3:
      return (this._miner.col!==0 && this._maze[this._miner.row][ this._miner.col-1] === "T");
  }*/
  var m = this._miner;
  switch (m.dir) {
    case 0: return (m.row !== 0                          && this._maze[m.row-1][m.col]); // up
    case 2: return (m.row !== this._maze.length-1        && this._maze[m.row+1][m.col]); // down
    case 1: return (m.col !== this._maze[m.row].length-1 && this._maze[m.row][m.col+1]); // right
    case 3: return (m.col !== 0                          && this._maze[m.row][m.col-1]); // left
  }
};

Maze.prototype.isPathLeft    = function(){
  this.turnLeft();
  var pathLeft = this.isPathForward();
  this.turnRight();
  return pathLeft;
};

Maze.prototype.isPathRight   = function(){
  this.turnRight();
  var pathRight = this.isPathForward();
  this.turnLeft();
  return pathRight;
};

Maze.prototype.moveForward   = function(){
  //console.log("moveForward was called");
  if (this.isPathForward()) {
    switch (this._miner.dir) {
      case 0: this._miner.row--; return true; // up
      case 2: this._miner.row++; return true; // down
      case 1: this._miner.col++; return true; // right
      case 3: this._miner.col--; return true; // left
    }
  } else {
    return false;
  }
};

Maze.prototype.notDone       = function(){
  return ((this._miner.row === this._exit.row) &&
          (this._miner.col === this._exit.col));
};

module.exports = Maze;
