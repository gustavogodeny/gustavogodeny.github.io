let myImg = document.querySelector("img");
let myButton = document.querySelector("button");
let myUser = document.getElementById("userId");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function color(r, g, b){
    return `rgb(
        ${Math.floor(r)}
        ${Math.floor(g)}
        ${Math.floor(b)}`;
}

function toDraw(i, j){
    if (i === 0 && j === 0)     return false;
    if (i === 0 && j === 11)    return false;
    if (i === 11 && j === 0)    return false;
    if (i === 11 && j === 11)   return false;

    return true;
}

function makeGrid(){
    ctx.fillStyle = color(250, 250, 250);   //White board
    for (var i = 0; i < 13; i++) {
        for (var j = 0; j < 13; j++) {
            //if(toDraw(i, j))
                //ctx.fillRect(10 + (60 * i), 10 + (60 * j), 40, 40);
            ctx.fillText("X", 20 + (60 * i), 20 + (60 * j));
            ctx
        }
    }

    ctx.fillStyle = color(80, 80, 80);   //player gray
    for (var i = 1; i < 11; i++) 
        ctx.fillRect(10 + (60 * i), 10, 40, 40);

    ctx.fillStyle = color(220, 80, 80);   //player red
    for (var i = 1; i < 11; i++) 
        ctx.fillRect(10 + (60 * i), 670, 40, 40);

    ctx.fillStyle = color(80, 220, 80);   //player green
    for (var i = 1; i < 11; i++) 
        ctx.fillRect(10, 10 + (60 * i), 40, 40);

    ctx.fillStyle = color(80, 80, 220);   //player blue
    for (var i = 1; i < 11; i++) 
        ctx.fillRect(670, 10 + (60 * i), 40, 40);
    ctx.f
}

function main(){
    createGrid(10);

    if (!localStorage.getItem("name")){
        alert("carai");
        login();
    }
    else{
        alert("porra");
        myUser.textContent = localStorage.getItem("name");
    }
}


function login() {
    do{
        var name = prompt("Enter your name");
    } while (name === '');

    if (name) {     //Else the user pressed Cancel
        localStorage.setItem("name", name);
        myUser.textContent = `logged as ${name}`;
        myButton.textContent = "Logout";
    }
}

function logout() {
    myUser.textContent = "please login.";
    myButton.textContent = "Login";
    alert("Logout successfull");
}


myButton.onclick = () => {
    if(myButton.textContent === "Login")
        login();
    else
        logout();
}

//main();
makeGrid();
