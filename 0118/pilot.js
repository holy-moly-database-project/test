const pilotList = document.querySelector("#pilot-list");
const pilotForm = document.querySelector("#add-pilot-form");
const searchPilotForm = document.querySelector("#search-pilot-form");

function renderPilot(doc){
    let li = document.createElement('li');
    let identity = document.createElement('span');
    let name = document.createElement('span');
    let miles = document.createElement('span');
    let gender = document.createElement('span');
    let cross = document.createElement('div');
    let revise = document.createElement('button');

    li.setAttribute('data-id', doc.id);
    identity.textContent = doc.data().ID;
    name.textContent = doc.data().name;
    miles.textContent = doc.data().miles;
    gender.textContent = doc.data().gender;
    cross.textContent = 'x';

    revise.textContent = 'revise';
    // revise.setAttribute('onclick', 'displayPilotRevise()');

    li.appendChild(identity)
    li.appendChild(name);
    li.appendChild(miles);
    li.appendChild(gender);
    li.appendChild(cross);
    li.appendChild(revise);

    let reviseForm = document.createElement('form');
    reviseForm.id = 'revisePilotForm';
    //reviseForm.style.display = 'none';

    let inputID = document.createElement('input');
    inputID.setAttribute('type', 'text');
    inputID.setAttribute('name', 'inid');
    inputID.setAttribute('placeholder', 'pilot ID');

    let inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('name', 'inname');
    inputName.setAttribute('placeholder', 'name');

    let inputMiles = document.createElement('input');
    inputMiles.setAttribute('type', 'text');
    inputMiles.setAttribute('name', 'inmiles');
    inputMiles.setAttribute('placeholder', 'miles');

    let inputGender = document.createElement('input');
    //

    reviseForm.appendChild(inputID);
    reviseForm.appendChild(inputName);
    reviseForm.appendChild(inputMiles);
    reviseForm.appendChild(inputGender);
    li.appendChild(reviseForm);

    pilotList.appendChild(li);

    // delete data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('pilots').doc(id).delete();
    });
}

function displayPilotRevise(){
    //
}

// adding data
pilotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('pilots').add({
        ID: pilotForm.id.value,
        name: pilotForm.name.value,
        miles: pilotForm.miles.value,
        gender: pilotForm.gender.value
    });
    pilotForm.id.value = '';
    pilotForm.name.value = '';
    pilotForm.miles.value = '';
    pilotForm.gender.value = '';
})

// display all
db.collection('pilots').orderBy('ID').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added'){
            renderPilot(change.doc);
        } else if (change.type == 'removed'){
            let li = pilotList.querySelector('[data-id=' + change.doc.id + ']');
            pilotList.removeChild(li);
        }
    })
})