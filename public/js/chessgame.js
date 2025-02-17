const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    //console.log(board);
    board.forEach((row, rowindex) => {
        //console.log(row,rowindex);
        row.forEach((square, squareindex) => {
            //console.log(square)
            const squareElement = document.createElement('div');
            squareElement.classList.add('square', (rowindex+squareindex) % 2 === 0 ? 'light' : 'dark');

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if (square) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add(
                    'piece',
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.innerText = "";
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener('dragstart', (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = {row: rowindex, column: squareindex};
                        e.dataTransfer.setData('text/plain', '');
                    }
                });

                pieceElement.addEventListener('dragend', (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);

            }
        })
    });
};
const handleMove = () => {};
const getPieceUnicode = () => {};

renderBoard();