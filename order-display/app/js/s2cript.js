// variables
let left = document.getElementById("left");
let right = document.getElementById("right");
let form = document.getElementById("form");
// input
let name = document.getElementById("name");
let counter = document.getElementById("customerCounter");
form.addEventListener("submit", processForm);

let names = new Map();

// gjør første bokstav i string stor
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

console.log("tst: " + orders.values);

function move(evt) {
    if ("side" === left) {
        evt.remove();
    } else {
        // flytt til høyre
        // "side" = "left"
    }
    updateNameList();
}

function updateNameList() {
    for (let i = 0; i < orders.values; i++) {
        let div = document.createElement("div");
        div.innerHTML = capitalize(orders[i].name); // ${name}
        div.className = "name";
        div.id = orders[i].name; // ${name}
        div.addEventListener("click", move);
        side.appendChild(div); // ${side}
    }
}
// kjører én gang til å begynne med
updateNameList();

function processForm(evt) {
    evt.preventDefault();
    console.log("adds: " + name.value + " to orderlist");

    // "name" -> name.value
    // "side" -> left
    // addEventListener? -> flytt til høyre

    // "tømmer input-feltet"
    name.value = "";
}

for (let i = 0; i < names.values; i++) {
    console.log("asdlksadm");
}
