
const newDiv = document.createElement("div");
newDiv.innerText = "Div was inserted here";
const emptyParagraph = document.getElementById('emptyParagraph');
emptyParagraph.appendChild(newDiv);

while (emptyParagraph.hasChildNodes()) {
    emptyParagraph.removeChild(emptyParagraph.lastChild);
}

let maxIterations = 0, iterations = 0, scheduleTime = 1;
let firstState = false;

// function and selector for swapping out text

const paraBodyString1 = "<tr><td>ABC</td><td>49.02</td></tr>\n" +
    "<tr><td>DEF</td><td>132.18</td></tr>\n" +
    "<tr><td>GHI</td><td>89.01</td></tr>";

const paraBodyString2 = "<tr><td>ABC</td><td>49.71</td></tr>\n" +
    "<tr><td>DEF</td><td>132.18</td></tr>\n" +
    "<tr><td>GHI</td><td>89.71</td></tr>";

const changeTableTextEle = document.getElementById('changeTableByText');

let startTextTime;
let totalTextMills;

const changeTextFunction = function() {
    const useState = firstState ? paraBodyString1 : paraBodyString2;
    changeTableTextEle.innerHTML = useState;
    firstState = !firstState;
    iterations++;
    if (iterations < maxIterations) {
        setTimeout(changeTextFunction, scheduleTime);
    } else {
        totalTextMills = Date.now() - startTextTime;
        finishtest();
    }
}

// function and selector for changing elements

const changeTableByElements = document.getElementById('changeTableByElements');

let startEleTime;
let totalEleMills;

const changeElementsFunction = function() {
    // remove the current elements
    while (changeTableByElements.hasChildNodes()) {
        changeTableByElements.removeChild(changeTableByElements.lastChild);
    }
    // create a row for each item
    const useState = firstState ? state1 : state2;
    for (const symbolObj of Object.values(useState.symbols)) {
        const trele = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = symbolObj.symbol;
        const td2 = document.createElement("td");
        td2.textContent = symbolObj.price;
        trele.appendChild(td1);
        trele.appendChild(td2);

        changeTableByElements.appendChild(trele);
    }
    firstState = !firstState;
    iterations++;
    if (iterations < maxIterations) {
        setTimeout(changeElementsFunction, scheduleTime);
    } else {
        totalEleMills = Date.now() - startEleTime;
        startTextTime = Date.now();
        iterations = 0;
        setTimeout(changeTextFunction, scheduleTime);
    }
}

// inputs and outputs for the test
const stats = document.getElementById('stats');
const statusDesc = document.getElementById('statusDesc');
const iterationInput = document.getElementById('iterationInput');

function starttest() {
    maxIterations = iterationInput.value;
    window.alert("starting " + maxIterations);

    startEleTime = Date.now();
    setTimeout(changeElementsFunction, scheduleTime);
}

function finishtest() {
    statusDesc.textContent = "Finished";
    let statsContent = "changed by element milliseconds: " + totalEleMills;
    statsContent = statsContent + " changed by text milliseconds: " + totalTextMills;
    stats.textContent = statsContent
    window.alert("finished " + maxIterations);
}



