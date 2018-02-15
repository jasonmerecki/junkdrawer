
const newDiv = document.createElement("div");
newDiv.innerText = "Div was inserted here";
const emptyParagraph = document.getElementById('emptyParagraph');
emptyParagraph.appendChild(newDiv);

while (emptyParagraph.hasChildNodes()) {
    emptyParagraph.removeChild(emptyParagraph.lastChild);
}

let maxIterations = 0, iterations = 0, scheduleTime = 1;
let firstState = false;

// function and selector for the react component

let startReactTime;
let totalReactMills;
let totalReactChanges = 0;

tableHolder["mytable"].postUpdate = function() {
    setTimeout(changeReactState, scheduleTime);
}

const changeReactState = function() {

    iterations++;
    totalReactChanges++;
    if (iterations < maxIterations ) {
        const useState = firstState ? state1 : state2;
        firstState = !firstState;
        tableHolder["mytable"].setState(useState);
    } else {
        totalReactMills = Date.now() - startReactTime;
        finishtest();
    }
}

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
let totalTextChanges = 0;

const changeTextFunction = function() {
    iterations++;
    totalTextChanges++;
    if (iterations < maxIterations) {
        const useState = firstState ? paraBodyString1 : paraBodyString2;
        firstState = !firstState;
        changeTableTextEle.innerHTML = useState;
        setTimeout(changeTextFunction, scheduleTime);
    } else {
        totalTextMills = Date.now() - startTextTime;
        startReactTime = Date.now();
        iterations = 0;
        firstState = false;
        statusDesc.textContent = "Running test: using React";
        changeReactState();
    }
}

// function and selector for changing elements

const changeTableByElements = document.getElementById('changeTableByElements');

let startEleTime;
let totalEleMills;
let totalEleChanges = 0;

const changeElementsFunction = function() {
    iterations++;
    totalEleChanges++;
    if (iterations < maxIterations) {
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

        setTimeout(changeElementsFunction, scheduleTime);
    } else {
        totalEleMills = Date.now() - startEleTime;
        startTextTime = Date.now();
        iterations = 0;
        firstState = false;
        statusDesc.textContent = "Running test: use text and innerHTML";
        setTimeout(changeTextFunction, scheduleTime);
    }
}

// inputs and outputs for the test
const stats = document.getElementById('stats');
const statusDesc = document.getElementById('statusDesc');
const iterationInput = document.getElementById('iterationInput');

function starttest() {
    iterations = 0;
    totalEleChanges = 0;
    totalTextChanges = 0;
    totalReactChanges = 0;
    maxIterations = iterationInput.value;
    window.alert("starting " + maxIterations);

    startEleTime = Date.now();
    statusDesc.textContent = "Running test: use createElement";
    setTimeout(changeElementsFunction, scheduleTime);
}

function finishtest() {
    statusDesc.textContent = "Finished";
    let statsContent = "changed by element milliseconds: " + totalEleMills + " (" + totalEleChanges + " changes)";
    statsContent = statsContent + " changed by text milliseconds: " + totalTextMills + " (" + totalTextChanges + " changes)";
    statsContent = statsContent + " changed by react milliseconds: " + totalReactMills + " (" + totalReactChanges + " changes) ";
    stats.textContent = statsContent
    // window.alert("finished " + maxIterations);
}



