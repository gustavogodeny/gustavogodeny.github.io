let legalSquares = [];
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByClassName("img");

setupBoardSquares();

function setupBoardSquares() {
    for (let i = 0; i < boardSquares.length; i++){
        boardSquares[i].addEventListener("dragover", allowDrop);
        boardSquares[i].addEventListener("drop", drop);
        let row = 10 - (Math.floor(i / 10));
        let column = String.fromCharCode(97 + (i%10));
        let square = boardSquares[i];
        square.id = row + column;
    }

    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener("dragstart", drag);
        pieces[i].setAttribute("draggable", true);
        pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
    }
}