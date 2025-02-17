const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement('div');
            squareElement.classList.add('square', (rowindex + squareindex) % 2 === 0 ? 'light' : 'dark');

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if (square) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add(
                    'piece',
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener('dragstart', (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, column: squareindex };
                        e.dataTransfer.setData('text/plain', '');
                    }
                });

                pieceElement.addEventListener('dragend', (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            squareElement.addEventListener('drop', (e) => {
                e.preventDefault();
                const targetSource = {
                    row: parseInt(squareElement.dataset.row),
                    column: parseInt(squareElement.dataset.col)
                };

                handleMove(sourceSquare, targetSource);
            });

            boardElement.appendChild(squareElement);
        });
    });
};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.column)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.column)}${8 - target.row}`,
        promotion: 'q' // Assuming promotion to queen for simplicity
    };

    const result = chess.move(move);
    if (result) {
        renderBoard();
        socket.emit('move', move);
    } else {
        console.error('Invalid move:', move);
    }
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        p: "♟",  // Black Pawn
        r: "♜",  // Black Rook
        n: "♞",  // Black Knight
        b: "♝",  // Black Bishop
        q: "♛",  // Black Queen
        k: "♚",  // Black King
        P: "♙",  // White Pawn
        R: "♖",  // White Rook
        N: "♘",  // White Knight
        B: "♗",  // White Bishop
        Q: "♕",  // White Queen
        K: "♔"   // White King
    };

    return unicodePieces[piece.type] || "";
};

socket.on("playerRole", function(role) {
    playerRole = role;
    renderBoard();
});

socket.on("spectatorRole", function() {
    playerRole = null;
    renderBoard();
});

socket.on("boardState", function(fen) {
    chess.load(fen);
    renderBoard();
});

socket.on("move", function(move) {
    chess.move(move);
    renderBoard();
});

renderBoard();