const flightList = document.getElementById("#flight-list")
const flightForm = document.getElementById("#add-flight-form")
const searchFlightForm = document.getElementById("#search-flight-form")

function renderFlight(doc){
    // setting adding page
    let li = document.createElement('li');
    let flightID = document.createElement('span');
    let routeID = document.createElement('span');
    let departDate = document.createElement('span');
    let departTime = document.createElement('span');
    let pilotID = document.createElement('span');
    let planeID = document.createElement('span');
    let cross = document.createElement('div');
    let revise = document.createElement('button');

    li.setAttribute('data_id', doc.id);
    flightID.textContent = doc.data().flightID;
    routeID.textContent = doc.data().routeID;
    departDate.textContent = doc.data().departDate;
    departTime.textContent = doc.data().departTime;
    pilotID.textContent = doc.data().pilotID;
    planeID.textContent = doc.data().planeID;
    cross.textContent = 'x';
    revise.textContent = 'revise';
    revise.setAttribute("onclick", "displayFlightsRevised()");

    li.appendChild(flightID);
    li.appendChild(routeID);
    li.appendChild(departDate);
    li.appendChild(departTime);
    li.appendChild(pilotID);
    li.appendChild(planeID);
    li.appendChild(cross);
    li.appendChild(revise);

    // setting revise page
    let reviseForm = document.createElement('form');
    reviseForm.id = "reviseRouteForm";
    reviseForm.style.display = "none";
    
    let inputflightID = document.createElement('input');
    inputflightID.setAttribute("type", "text");
    inputflightID.setAttribute("name", "inFID");
    inputflightID.setAttribute("placeholder", "flight ID");

    let inputrouteID = document.createElement('input');
    inputrouteID.setAttribute("type", "text");
    inputrouteID.setAttribute("name", "inRID");
    inputrouteID.setAttribute("placeholder", "route ID");
    
    let inputdepartDate = document.createElement('input');
    inputdepartDate.setAttribute("type", "text");
    inputdepartDate.setAttribute("name", "inDDate");
    inputdepartDate.setAttribute("placeholder", "departDate");

    let inputdepartTime = document.createElement('input');
    inputdepartTime.setAttribute("type", "text");
    inputdepartTime.setAttribute("name", "inDTime");
    inputdepartTime.setAttribute("placeholder", "departTime");

    let inputpilotID = document.createElement('input');
    inputpilotID.setAttribute("type", "text");
    inputpilotID.setAttribute("name", "inPilotID");
    inputpilotID.setAttribute("placeholder", "pilot ID");

    let inputplaneID = document.createElement('input');
    inputplaneID.setAttribute("type", "text");
    inputplaneID.setAttribute("name", "inPlaneID");
    inputplaneID.setAttribute("placeholder", "plane ID");

    let reviseButton = document.createElement('button');
    reviseButton.textContent = 'submit';

    reviseForm.appendChild(inputflightID);
    reviseForm.appendChild(inputrouteID);
    reviseForm.appendChild(inputdepartDate);
    reviseForm.appendChild(inputdepartTime);
    reviseForm.appendChild(inputpilotID);
    reviseForm.appendChild(inputplaneID);
    reviseForm.appendChild(reviseButton);

    flightList.appendChild(li);

    ///deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('flights').doc(id).delete();
    })
    
}

flightForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //
});