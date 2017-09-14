

//Generating Playter Board
const generatePlayerBoard = (rows, cols) =>  {
  let board = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      let row = [];
    for (let colsIndex = 0; colsIndex < cols; colsIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;

};
//Generating Bomb Board
const generateBombBoard = (rows, cols, bombs) => {
  let board = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      let row = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      row.push(null);
    }
    board.push(row);
  }
  let numBombsPlaced = 0;
  while (numBombsPlaced < bombs) {
      //Todo: correct Flow control
    let randoRowIndex = Math.floor(Math.random() * rows);
    let randoColIndex = Math.floor(Math.random() * cols);
    if (board [randoRowIndex][randoColIndex] != 'B') {
      board[randoRowIndex][randoColIndex] = 'B';
      numBombsPlaced++;
    }

}
  return board;
};

//Bombs Adjacent
const getNumberOfNeighborBombs = (bombBoard, rowIndex, colIndex) => {
  const neighborOffsets = [
    [-1,-1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1,0], [1,1]
  ];
//Retrieving dimensions of the game by using bombBoard length for rows and index[0]
//bombBoard length for columns.
  const rows = bombBoard.length;
  const cols = bombBoard[0].length;
  let bombs = 0;
//forEach loop to check for bombs
  neighborOffsets.forEach(offset =>  {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = colIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < rows && neighborColumnIndex >= 0 && neighborColumnIndex < cols) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        bombs++;
      }
    }
  });
  return bombs;
};
//Function to flip a tile
const flipTile = (playerBoard, bombBoard, rowIndex, colIndex) => {
  if (playerBoard[rowIndex][colIndex] !== ' ') {
    console.log(`This tile has already been flipped!`);
    return;
  } else if (bombBoard[rowIndex][colIndex] === 'B'){
    playerBoard[rowIndex][colIndex] = 'B';
  } else {
    playerBoard[rowIndex][colIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, colIndex);
  }
};

const printBoard = board => {
  console.log(board.map(row=> row.join(' | ')).join('\n'));
}
playerBoard = generatePlayerBoard(3,4);
bombBoard = generateBombBoard(3,4,5);
console.log(`Player Board: `);
printBoard(playerBoard);
console.log(`Bomb Board: `);
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log(`Updated Player Board:`);
printBoard(playerBoard);
