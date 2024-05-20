let myImg = document.querySelector("img");
let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function main(){
    if (!localStorage.getItem("name"))
        setUserName();
    else
        myHeading.textContent = `Mozilla é legal, ${localStorage.getItem("name")}`;
}

main();

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
