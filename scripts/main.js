let myImg = document.querySelector("img");
let myButton = document.querySelector("button");
let myUser = document.querySelector("userId");

function main(){
    createGrid(10);

    if (!localStorage.getItem("name"))
        setUserName();
    else
        myHeading.textContent = localStorage.getItem("name");
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

myImg.onmouseover = () => {
    const mySrc = myImg.getAttribute("src");
    if (mySrc === "imagens/website-drawing-scan.png")
        myImg.setAttribute("src", "imagens/firefox.png");
    else  
        myImg.setAttribute("src", "imagens/website-drawing-scan.png");       
};

function setUserName() {
    do{
        var name = prompt("Digite seu nome");
    } while (name === '');

    if (name) {     //Else the user pressed Cancel
        localStorage.setItem("name", name);
        myHeading.textContent = `Mozilla é legal, ${name}`;
    }
}

myButton.onclick = () => {
    setUserName();
}

main();
