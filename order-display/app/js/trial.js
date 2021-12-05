// variables
let left = document.getElementById("left");
let right = document.getElementById("right");
let form = document.getElementById("form");
let name = document.getElementById("name");
let counter = document.getElementById("customerCounter");
form.addEventListener("submit", processForm);

// gjør første bokstav i string stor
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const namesLeft = [];
const namesRight = [];
const date = new Date();
let numberOfCustomers = 0;
counter.innerHTML = numberOfCustomers;

function updateNameList(side, array) {
    // fjerner alle "navn" fra VENSTRE side
    while (side.firstChild) {
        side.removeChild(side.firstChild);
    }

    // legger til alle navn fra "namesLeft" array på VENSTRE side
    for (let i = 0; i < array.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = capitalize(array[i]);
        div.className = "name";
        div.id = array[i];
        side.appendChild(div);

        // if namesRight -> eventListener -> fjerner navn
        if (array != namesRight) {
            div.addEventListener("click", moveToRight);
        } else {
            // else -> eventListener -> flytter navn til høyre side
            div.addEventListener("click", orderDone);
        }
    }

    // når høyre side ikke er tom og funksjonen ikke kjører for venstre side
    if (namesRight.length != 0 && side != left) {
        // setter navnet (på høyre side) som "active" (stor)
        document.getElementById(namesRight[0]).classList.add("active");
    }
}

function processForm(evt) {
    evt.preventDefault();
    console.log("adds: " + name.value + " to orderlist");
    // legger til navn fra input-felt i array
    namesLeft.unshift(name.value);
    // oppdaterer navnelister i DOM
    updateNameList(left, namesLeft);

    // "tømmer input-feltet"
    name.value = "";

    console.log("-- to sum up --");
    console.log("left: " + namesLeft);
    console.log("right: " + namesRight);
}

function moveToRight(evt) {
    console.log("Fjerner: " + evt.target.id + " fra namesLeft[] og legger til i namesRight[]");
    // fjerner navn som er trykket på fra namesLeft[]
    namesLeft.splice(namesLeft.indexOf(evt.target.id), 1);
    // legger til navn som er trykket på i namesRight[]
    namesRight.unshift(evt.target.id);
    updateNameList(left, namesLeft);
    updateNameList(right, namesRight);

    let activeName = document.getElementById(evt.target.id);

    // animerer activeName (soft appear)
    activeName.classList.add("name", "active", "faded-out");

    requestAnimationFrame(() => {
        activeName.classList.remove("faded-out");
    });

    console.log("date: " + date.getMonth());
    // play notification when order done
    let randomInt = Math.floor(Math.random() * 7 + 1);
    let notification;
    if (date.getMonth() >= 10) {
        // hvis november eller desember -> spill jule-lyd
        notification = new Audio("/audio/christmasAudio/christmasSound" + Math.floor(Math.random() * 4 + 1) + ".wav");
    } else {
        // resten av året -> spill generic-lyd
        notification = new Audio("/audio/sound" + randomInt + ".wav");
    }
    notification.play();

    console.log("-- to sum up --");
    console.log("left: " + namesLeft);
    console.log("right: " + namesRight);
}

function orderDone(evt) {
    console.log("Fjerner: " + evt.target.id + " fra namesRight[]");
    namesRight.splice(namesRight.indexOf(evt.target.id), 1);

    updateNameList(right, namesRight);

    console.log("-- to sum up --");
    console.log("left: " + namesLeft);
    console.log("right: " + namesRight);

    numberOfCustomers += 1;
    counter.innerHTML = numberOfCustomers;
}
