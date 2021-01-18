const pilotList = document.getElementById("#pilot-list");
const pilotForm = document.getElementById("#add-pilot-form");
const searchPilotForm = document.getElementById("search-pilot-form");

function renderPilot(doc){
    //
}

// adding data
pilotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('pilots').add({
        ID: pilotForm.id.value;
        name: pilotForm.name.value;
        miles: pilotForm.miles.value;
    })
})