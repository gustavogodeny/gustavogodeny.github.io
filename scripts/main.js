let boardSquaresArray = [];
let whoseTurn = -1;  // 0: red; 1: yellow; 2: green; 3: blue

const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByTagName("img");

const players = {
    red: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
    yellow: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
    green: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
    blue: {monsters: 0, werewolf: 0, vampire: 0, ghost: 0},
}

let btnLogin = document.getElementById("btn-login");
let btnStart = document.getElementById("btn-start");

let turn = document.getElementById("turn");
let redPlayer = document.getElementById("redPlayer");
let yellowPlayer = document.getElementById("yellowPlayer");
let greenPlayer = document.getElementById("greenPlayer");
let bluePlayer = document.getElementById("bluePlayer");

let myUser = document.getElementById("userId");

function login() {
    let user;
    do{
        user = prompt("Enter your username");
    } while (user === '');

    if (user) {     //Else the user pressed Cancel
        localStorage.setItem("name", user);
        myUser.textContent = `logged as ${user}`;
        btnLogin.textContent = "Logout";
    }
}

function logout() {
  myUser.textContent = "please login.";
  btnLogin.textContent = "Login";
  alert("Logout successfull");
}

btnLogin.onclick = () => {
  if(btnLogin.textContent === "Login")
      login();
  else
      logout();
}

btnStart.onclick = () => {
    if (btnStart.textContent == "Start Game") {
        whoseTurn = parseInt(Math.random() * 4);
        countMonsters();
        updateGame();
        btnStart.textContent = "End Game";
    }

    else location.reload();
}

function updateTurn() {
    turn.textContent = `${showTurn()}'s turn`;
}

function countMonsters() {
    const boardSquares = document.getElementsByClassName("square");

    for (let i = 0; i < boardSquares.length; i++) {
        let square = boardSquares[i];

        if (square.querySelector(".piece")) {
            let color = square.querySelector(".piece").getAttribute("color")       
            if      (color == "red") {
                players.red.monsters++;
                if      ((square.querySelector(".piece").getAttribute("class")).includes("werewolf")) players.red.werewolf++;
                else if ((square.querySelector(".piece").getAttribute("class")).includes("vampire")) players.red.vampire++;
                else if ((square.querySelector(".piece").getAttribute("class")).includes("ghost")) players.red.ghost++;
            }
            if      (color == "yellow") {
                players.yellow.monsters++;
                if ((square.querySelector(".piece").getAttribute("class")).includes("werewolf")) players.yellow.werewolf++;
                if ((square.querySelector(".piece").getAttribute("class")).includes("vampire")) players.yellow.vampire++;
                if ((square.querySelector(".piece").getAttribute("class")).includes("ghost")) players.yellow.ghost++;
            }
            if      (color == "green") {
                players.green.monsters++;
                if      ((square.querySelector(".piece").getAttribute("class")).includes("werewolf")) players.green.werewolf++;
                else if ((square.querySelector(".piece").getAttribute("class")).includes("vampire")) players.green.vampire++;
                else if ((square.querySelector(".piece").getAttribute("class")).includes("ghost")) players.green.ghost++;
            }
            if      (color == "blue") {
                players.blue.monsters++;
                if      ((square.querySelector(".piece").getAttribute("class")).includes("werewolf")) players.blue.werewolf++;
                else if ((square.querySelector(".piece").getAttribute("class")).includes("vampire")) players.blue.vampire++;
                else if ((square.querySelector(".piece").getAttribute("class")).includes("ghost")) players.blue.ghost++;
            }
        } 
    }
}

function updateGame(){

    if (players.red.monsters)
        redPlayer.textContent = `Werewolves: ${players.red.werewolf}, Vampires: ${players.red.vampire}, Ghosts: ${players.red.ghost}`;
    else redPlayer.textContent = "Game over";

    if (players.yellow.monsters)
        yellowPlayer.textContent = `Werewolves: ${players.yellow.werewolf}, Vampires: ${players.yellow.vampire}, Ghosts: ${players.yellow.ghost}`;
    else yellowPlayer.textContent = "Game over";

    if (players.green.monsters)
        greenPlayer.textContent = `Werewolves: ${players.green.werewolf}, Vampires: ${players.green.vampire}, Ghosts: ${players.green.ghost}`;
    else greenPlayer.textContent = "Game over";

    if (players.blue.monsters)
        bluePlayer.textContent = `Werewolves: ${players.blue.werewolf}, Vampires: ${players.blue.vampire}, Ghosts: ${players.blue.ghost}`;
    else bluePlayer.textContent = "Game over";

    updateTurn();
}

function fillBoardSquaresArray() {
  const boardSquares = document.getElementsByClassName("square");
  for (let i = 0; i < boardSquares.length; i++) {
    let row = 8 - Math.floor(i / 8);
    let column = String.fromCharCode(97 + (i % 8));
    let square = boardSquares[i];

    square.id = column + row;
    let color = "";
    let pieceType = "";
    let pieceId="";
    if (square.querySelector(".piece")) {
      color = square.querySelector(".piece").getAttribute("color");
      pieceType = square.querySelector(".piece").classList[1];
      pieceId=square.querySelector(".piece").id;
    } else {
      color = "blank";
      pieceType = "blank";
      pieceId ="blank";
    }
    let arrayElement = {
      squareId: square.id,
      pieceColor: color,
      pieceType: pieceType,
      pieceId:pieceId
    };
    boardSquaresArray.push(arrayElement);
  }
}
function updateBoardSquaresArray (currentSquareId, destinationSquareId, boardSquaresArray) {
    let currentSquare = boardSquaresArray.find(
        (element) => element.squareId === currentSquareId
    );
    let destinationSquareElement = boardSquaresArray.find(
        (element) => element.squareId === destinationSquareId
    );
    let pieceColor = currentSquare.pieceColor;
    let pieceType = currentSquare.pieceType;
    let pieceId= currentSquare.pieceId;
    destinationSquareElement.pieceColor = pieceColor;
    destinationSquareElement.pieceType = pieceType;
    destinationSquareElement.pieceId = pieceId;
    currentSquare.pieceColor = "blank";
    currentSquare.pieceType = "blank";
    currentSquare.pieceId = "blank";
}

function deepCopyArray(array) {
  let arrayCopy = array.map(element => {
    return {...element};
  });
  return arrayCopy;
}

setupBoardSquares();
setupPieces();
fillBoardSquaresArray();

function setupBoardSquares() {
  for (let i = 0; i < boardSquares.length; i++) {
    boardSquares[i].addEventListener("dragover", allowDrop);
    boardSquares[i].addEventListener("drop", drop);
    let row = 8 - Math.floor(i / 8);
    let column = String.fromCharCode(97 + (i % 8));
    let square = boardSquares[i];
    square.id = column + row;
  }
}
function setupPieces() {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].addEventListener("dragstart", drag);
    pieces[i].setAttribute("draggable", true);
    pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
  }
  for (let i = 0; i < piecesImages.length; i++) {
    piecesImages[i].setAttribute("draggable", false);
  }
}
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  const piece = ev.target;
  //alert(piece.id);
  const pieceColor = piece.getAttribute("color");
  const pieceType =piece.classList[1];
  const pieceId = piece.id;

  if (
    (whoseTurn == 0 && pieceColor == "red") ||
    (whoseTurn == 1 && pieceColor == "yellow") ||
    (whoseTurn == 2 && pieceColor == "green") ||
    (whoseTurn == 3 && pieceColor == "blue")
  ) {
    const startingSquareId = piece.parentNode.id;
    ev.dataTransfer.setData("text", pieceId + "|" + startingSquareId);
    const pieceObject ={pieceColor:pieceColor, pieceType:pieceType, pieceId:pieceId}
    let legalSquares = getPossibleMoves(
      startingSquareId,
      pieceObject,
      boardSquaresArray
    );

    let legalSquaresJson = JSON.stringify(legalSquares);
    ev.dataTransfer.setData("application/json", legalSquaresJson);
  }
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  // alert(`[${data}]`);
  let [pieceId, startingSquareId] = data.split("|");
  // let legalSquaresJson = ev.dataTransfer.getData("application/json");
  // let legalSquares = JSON.parse(legalSquaresJson);

  const piece = document.getElementById(pieceId);
  const pieceColor = piece.getAttribute("color");
  const pieceType = piece.classList[1];

  const destinationSquare = ev.currentTarget;
  let   destinationSquareId = destinationSquare.id;

  //legalSquares=isMoveValidAgainstCheck(legalSquares,startingSquareId,pieceColor,pieceType);

    let squareContent=getPieceAtSquare(destinationSquareId,boardSquaresArray);

    //if (!legalSquares.includes(destinationSquareId)) {
    //    return;
    //}
    alert(JSON.stringify(squareContent));
    if (squareContent.pieceType != "blank") {
        players[squareContent.pieceColor]["monsters"]--;
        players[squareContent.pieceColor][squareContent.pieceType]--;
    }

    if (squareContent.pieceColor != "blank") {
    let children = destinationSquare.children;
    
    for (let i = 0; i < children.length; i++) {
        if (!children[i].classList.contains('coordinate')) {
          destinationSquare.removeChild(children[i]);
        }
    }

  }

  destinationSquare.appendChild(piece);

  let rand;
  do {
    rand = parseInt(Math.random() * 4);
  } while (rand == whoseTurn);
  
  whoseTurn = rand;
  
  updateBoardSquaresArray(
    startingSquareId,
    destinationSquareId,
    boardSquaresArray
  );
  //checkForEndGame();

  updateGame();
  
  return;

}

function getPossibleMoves(startingSquareId, piece, boardSquaresArray) {

    return getMoves(startingSquareId, piece.pieceColor, boardSquaresArray);

}

function getMoves (startingSquareId, pieceColor, boardSquaresArray) {
  return 1;
}

function getPawnMoves(startingSquareId, pieceColor, boardSquaresArray) {
  let diogonalSquares = checkPawnDiagonalCaptures(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let forwardSquares = checkPawnForwardMoves(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let legalSquares = [...diogonalSquares, ...forwardSquares];
  return legalSquares;
}

function checkPawnDiagonalCaptures(
  startingSquareId,
  pieceColor,
  boardSquaresArray
) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let legalSquares = [];
  let currentFile = file;
  let currentRank = rankNumber;
  let currentSquareId = currentFile + currentRank;

  const direction = pieceColor == "white" ? 1 : -1;
 if(!(rank==8 && direction==1) && !(rank==1 && direction==-1))
   currentRank += direction;
  for (let i = -1; i <= 1; i += 2) {
    currentFile = String.fromCharCode(file.charCodeAt(0) + i);
    if (currentFile >= "a" && currentFile <= "h" && currentRank<=8 && currentRank>=1){
      currentSquareId = currentFile + currentRank;
      let currentSquare = boardSquaresArray.find(
        (element) => element.squareId === currentSquareId
      );
      let squareContent = currentSquare.pieceColor;
      if (squareContent != "blank" && squareContent != pieceColor)
        legalSquares.push(currentSquareId);
    }
  }
  return legalSquares;
}
function checkPawnForwardMoves(
  startingSquareId,
  pieceColor,
  boardSquaresArray
) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let legalSquares = [];

  let currentFile = file;
  let currentRank = rankNumber;
  let currentSquareId = currentFile + currentRank;

  const direction = pieceColor == "white" ? 1 : -1;
  currentRank += direction;
  currentSquareId = currentFile + currentRank;
  let currentSquare = boardSquaresArray.find(
    (element) => element.squareId === currentSquareId
  );
  let squareContent = currentSquare.pieceColor;
  if (squareContent != "blank") return legalSquares;
  legalSquares.push(currentSquareId);
  if (rankNumber != 2 && rankNumber != 7) return legalSquares;
  currentRank += direction;
  currentSquareId = currentFile + currentRank;
  currentSquare = boardSquaresArray.find(
    (element) => element.squareId === currentSquareId
  );
  squareContent = currentSquare.pieceColor;
  if (squareContent != "blank")
    if (squareContent != "blank") return legalSquares;
  legalSquares.push(currentSquareId);
  return legalSquares;
}

function getKnightMoves(startingSquareId, pieceColor, boardSquaresArray) {
  const file = startingSquareId.charCodeAt(0) - 97;
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalSquares = [];

  const moves = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
  ];
  moves.forEach((move) => {
    currentFile = file + move[0];
    currentRank = rankNumber + move[1];
    if (
      currentFile >= 0 &&
      currentFile <= 7 &&
      currentRank > 0 &&
      currentRank <= 8
    ) {
      let currentSquareId = String.fromCharCode(currentFile + 97) + currentRank;
      let currentSquare = boardSquaresArray.find(
        (element) => element.squareId === currentSquareId
      );
      let squareContent = currentSquare.pieceColor;
      if (squareContent != "blank" && squareContent == pieceColor)
        return legalSquares;
      legalSquares.push(String.fromCharCode(currentFile + 97) + currentRank);
    }
  });
  return legalSquares;
}
function getRookMoves(startingSquareId, pieceColor, boardSquaresArray) {
  let moveToEighthRankSquares = moveToEighthRank(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToFirstRankSquares = moveToFirstRank(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToAFileSquares = moveToAFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToHFileSquares = moveToHFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let legalSquares = [
    ...moveToEighthRankSquares,
    ...moveToFirstRankSquares,
    ...moveToAFileSquares,
    ...moveToHFileSquares,
  ];
  return legalSquares;
}

function getBishopMoves(startingSquareId, pieceColor, boardSquaresArray) {
  let moveToEighthRankHFileSquares = moveToEighthRankHFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToEighthRankAFileSquares = moveToEighthRankAFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToFirstRankHFileSquares = moveToFirstRankHFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let moveToFirstRankAFileSquares = moveToFirstRankAFile(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let legalSquares = [
    ...moveToEighthRankHFileSquares,
    ...moveToEighthRankAFileSquares,
    ...moveToFirstRankHFileSquares,
    ...moveToFirstRankAFileSquares,
  ];
  return legalSquares;
}
function getQueenMoves(startingSquareId, pieceColor, boardSquaresArray) {
  let bishopMoves = getBishopMoves(
    startingSquareId,
    pieceColor,
    boardSquaresArray
  );
  let rookMoves = getRookMoves(startingSquareId, pieceColor, boardSquaresArray);
  let legalSquares = [...bishopMoves, ...rookMoves];
  return legalSquares;
}

function getKingMoves(startingSquareId, pieceColor, boardSquaresArray) {
  const file = startingSquareId.charCodeAt(0) - 97;
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalSquares = [];

  const moves = [
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [1, 0],
  ];

  //  for (let move of moves)
  moves.forEach((move) => {
    currentFile = file + move[0];
    currentRank = rankNumber + move[1];
    if (
      currentFile >= 0 &&
      currentFile <= 7 &&
      currentRank > 0 &&
      currentRank <= 8
    ) {
      let currentSquareId = String.fromCharCode(currentFile + 97) + currentRank;
      let currentSquare = boardSquaresArray.find(
        (element) => element.squareId === currentSquareId
      );
      let squareContent = currentSquare.pieceColor;
      if (squareContent != "blank" && squareContent == pieceColor)
        return legalSquares;
      legalSquares.push(String.fromCharCode(currentFile + 97) + currentRank);
    }
  });
  return legalSquares;
}

function moveToEighthRank(startingSquareId, pieceColor, boardSquaresArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let legalSquares = [];
  while (currentRank != 8) {
    currentRank++;
    let currentSquareId = file + currentRank;
    let currentSquare = boardSquaresArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToFirstRank(startingSquareId, pieceColor, boardSquaresArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let legalSquares = [];
  while (currentRank != 1) {
    currentRank--;
    let currentSquareId = file + currentRank;
    let currentSquare = boardSquaresArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToAFile(startingSquareId, pieceColor, boardSquaresArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  let currentFile = file;
  let legalSquares = [];

  while (currentFile != "a") {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(currentFile.length - 1) - 1
    );
    let currentSquareId = currentFile + rank;
    let currentSquare = boardSquaresArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToHFile(startingSquareId, pieceColor, boardSquaresArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  let currentFile = file;
  let legalSquares = [];
  while (currentFile != "h") {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(currentFile.length - 1) + 1
    );
    let currentSquareId = currentFile + rank;
    let currentSquare = boardSquaresArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}

function moveToEighthRankAFile(
  startingSquareId,
  pieceColor,
  boardSquaresArray
) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalSquares = [];
  while (!(currentFile == "a" || currentRank == 8)) {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(currentFile.length - 1) - 1
    );
    currentRank++;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = boardSquaresArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToEighthRankHFile(
  startingSquareId,
  pieceColor,
  boardSquaresArray
) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalSquares = [];
  while (!(currentFile == "h" || currentRank == 8)) {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(currentFile.length - 1) + 1
    );
    currentRank++;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = boardSquaresArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToFirstRankAFile(startingSquareId, pieceColor, boardSquaresArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalSquares = [];
  while (!(currentFile == "a" || currentRank == 1)) {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(currentFile.length - 1) - 1
    );
    currentRank--;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = boardSquaresArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}
function moveToFirstRankHFile(startingSquareId, pieceColor, boardSquaresArray) {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let legalSquares = [];
  while (!(currentFile == "h" || currentRank == 1)) {
    currentFile = String.fromCharCode(
      currentFile.charCodeAt(currentFile.length - 1) + 1
    );
    currentRank--;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = boardSquaresArray.find(
      (element) => element.squareId === currentSquareId
    );
    let squareContent = currentSquare.pieceColor;
    if (squareContent != "blank" && squareContent == pieceColor)
      return legalSquares;
    legalSquares.push(currentSquareId);
    if (squareContent != "blank" && squareContent != pieceColor)
      return legalSquares;
  }
  return legalSquares;
}

function getPieceAtSquare(squareId, boardSquaresArray) {
  let currentSquare = boardSquaresArray.find(
    (element) => element.squareId === squareId
  );
  const color = currentSquare.pieceColor;
  const pieceType = currentSquare.pieceType;
  const pieceId=currentSquare.pieceId;
  return { pieceColor: color, pieceType: pieceType,pieceId:pieceId};
}

function getAllPossibleMoves(squaresArray, color) {
  return squaresArray
    .filter((square) => square.pieceColor === color)
    .flatMap((square) => {
      const { pieceColor,pieceType,pieceId } = getPieceAtSquare(square.squareId,squaresArray);
      if (pieceId === "blank") return [];

      //const piece = document.getElementById(pieceId);
      let squaresArrayCopy = deepCopyArray(squaresArray);
      const pieceObject ={pieceColor:pieceColor,pieceType:pieceType,pieceId:pieceId}

      let legalSquares = getPossibleMoves(
        square.squareId,
        pieceObject,
        squaresArrayCopy
      );
      legalSquares = isMoveValidAgainstCheck(
        legalSquares,
        square.squareId,
        pieceColor,
        pieceType
      );

      return legalSquares;
    });
}

function showAlert(message) {
  const alert= document.getElementById("alert");
  alert.innerHTML=message;
  alert.style.display="block";

  setTimeout(function() {
       alert.style.display="none";
  },3000);
}

function showTurn() {
  let message;
    switch(whoseTurn){
        case 0: message = "red";
        break;
        case 1: message = "yellow";
        break;
        case 2: message = "green";
        break;
        case 3: message = "blue";
        break;
        default: message = "invalid";
        break;
    }
    return message;
}
