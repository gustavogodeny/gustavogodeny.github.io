let myImg = document.querySelector("img");
let myButton = document.querySelector("button");
let myUser = document.getElementById("userId");

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

function createGrid(size) {
    var ratioW = Math.floor($(window).width()/size),
        ratioH = Math.floor($(window).height()/size);

    var parent = $('<div />', {
        class: 'grid',
        width: ratioW  * size,
        height: ratioH  * size
    }).addClass('grid').appendTo('body');

    for (var i = 0; i < ratioH; i++) {
        for(var p = 0; p < ratioW; p++){
            $('<div />', {
                width: size - 1,
                height: size - 1
            }).appendTo(parent);
        }
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
//createGrid(10);
