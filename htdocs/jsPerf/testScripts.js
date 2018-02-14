const statusDesc = document.getElementById('statusDesc');


const newDiv = document.createElement("div");
newDiv.innerText = "Div was inserted here";
const emptyParagraph = document.getElementById('emptyParagraph');
emptyParagraph.appendChild(newDiv);


function starttest() {
    // window.alert("yo " + statusDesc);

    while (emptyParagraph.hasChildNodes()) {
        emptyParagraph.removeChild(emptyParagraph.lastChild);
    }

    statusDesc.innerText = "Finished";
}



