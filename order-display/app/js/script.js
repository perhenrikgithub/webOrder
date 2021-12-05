// variables
let left = document.getElementById("left");
let right = document.getElementById("right");
let form = document.getElementById("form");
let name = document.getElementById("name");

form.addEventListener("submit", processForm);

// gjør det mulig å gjøre første bokstav i string capatilized
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const namesInMaking = [];
const namesDone = [];
let activeNameGlobalVariable = "";

function updateNameListLeft() {
    console.log("left side updated");
    // fjerner alle "navn" fra VENSTRE side
    while (left.firstChild) {
        left.removeChild(left.firstChild);
    }
    // legger til alle navn fra "namesInMaking" array på VENSTRE side
    for (let i = 0; i < namesInMaking.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = capitalize(namesInMaking[i]);
        div.className = "name";
        div.id = namesInMaking[i];
        left.appendChild(div);
        // adds eventlistener to be able to move to right side
        div.addEventListener("click", moveToRight);
    }
}

function updateNameListRight() {
    console.log("right side updated");
    // fjerner alle "navn" fra HØYRE side
    while (right.firstChild) {
        right.removeChild(right.firstChild);
    }
    // legger til alle navn fra "namesDone" array på HØYRE side
    for (let i = 0; i < namesDone.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = capitalize(namesDone[i]);
        div.className = "name";
        div.id = namesDone[i];
        right.appendChild(div);
        // adds eventlistener to be able to delete
        div.addEventListener("click", orderDone);
    }
}

function processForm(evt) {
    evt.preventDefault();
    console.log("adds: " + name.value + " to orderlist");
    // legger til navn fra input-felt i array
    namesInMaking.unshift(name.value);
    // oppdaterer navnelister i DOM
    updateNameListLeft();

    // "tømmer input-feltet"
    name.value = "";
}

function moveToRight(evt) {
    console.log("Fjerner: " + evt.target.id + " fra namesInMaking[] og legger til i namesDone[]");
    // fjerner navn som er trykket på fra namesInMaking[]
    namesInMaking.splice(namesInMaking.indexOf(evt.target.id), 1);
    // legger til navn som er trykket på i namesDone[]
    namesDone.unshift(evt.target.id);
    updateNameListLeft();
    updateNameListRight();

    let activeName = document.getElementById(evt.target.id);

    // animerer activeName (soft appear)
    activeName.classList.add("name", "active", "faded-out");

    requestAnimationFrame(() => {
        activeName.classList.remove("faded-out");
    });
}

function orderDone(evt) {
    console.log("Fjerner: " + evt.target.id + " fra namesDone[]");
    namesDone.splice(namesInMaking.indexOf(evt.target.id), 1);
    updateNameListRight();
    document.getElementById("customerCounter").innerHTML = 1;
}
