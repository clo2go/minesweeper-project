'use strict';

//Generating Playter Board
var generatePlayerBoard = function generatePlayerBoard(rows, cols) {
  var board = [];

  for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
    var row = [];
    for (var colsIndex = 0; colsIndex < cols; colsIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};
//Generating Bomb Board
var generateBombBoard = function generateBombBoard(rows, cols, bombs) {
  var board = [];

  for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
    var row = [];
    for (var colIndex = 0; colIndex < cols; colIndex++) {
      row.push(null);
    }
    board.push(row);
  }
  var numBombsPlaced = 0;
  while (numBombsPlaced < bombs) {
    //Todo: correct Flow control
    var randoRowIndex = Math.floor(Math.random() * rows);
    var randoColIndex = Math.floor(Math.random() * cols);
    if (board[randoRowIndex][randoColIndex] != 'B') {
      board[randoRowIndex][randoColIndex] = 'B';
      numBombsPlaced++;
    }
  }
  return board;
};

//Bombs Adjacent
var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, colIndex) {
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  //Retrieving dimensions of the game by using bombBoard length for rows and index[0]
  //bombBoard length for columns.
  var rows = bombBoard.length;
  var cols = bombBoard[0].length;
  var bombs = 0;
  //forEach loop to check for bombs
  neighborOffsets.forEach(function (offset) {
    var neighborRowIndex = rowIndex + offset[0];
    var neighborColumnIndex = colIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < rows && neighborColumnIndex >= 0 && neighborColumnIndex < cols) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        bombs++;
      }
    }
  });
  return bombs;
};
//Function to flip a tile
var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, colIndex) {
  if (playerBoard[rowIndex][colIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][colIndex] === 'B') {
    playerBoard[rowIndex][colIndex] = 'B';
  } else {
    playerBoard[rowIndex][colIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, colIndex);
  }
};

var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};
playerBoard = generatePlayerBoard(3, 4);
bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);