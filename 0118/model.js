const modelList = document.querySelector('#model-list');
const modelForm = document.querySelector('#add-model-form');
const searchModelForm = document.querySelector('#search-model-form');

function renderModel(doc){
    let li = document.createElement('li');
    let modelID = document.createElement('span');
    let seats = document.createElement('span');
    let cross = document.createElement('div');
    let revise = document.createElement('button');

    li.setAttribute('data-id', doc.id);
    modelID.textContent = doc.data().ID;
    seats.textContent = doc.data().seats;
    cross.textContent = 'x';

    revise.textContent = 'revise';
    revise.setAttribute("onclick", "displayModelRevise");

    li.appendChild(modelID);
    li.appendChild(seats);
    li.appendChild(cross);
    li.appendChild(revise);

    let reviseForm = document.createElement('form');
    reviseForm.id = "reviseModelForm";
    reviseForm.style.display = "none";

    let inputID = document.createElement('input');
    inputID.setAttribute("type", "text");
    inputID.setAttribute("name", "inid");
    inputID.setAttribute("placeholder", "model ID");

    let inputSeats = document.createElement('input');
    inputSeats.setAttribute("type", "text");
    inputSeats.setAttribute("name", "inseat")
    inputSeats.setAttribute("placeholder", "seats");

    let reviseButton = document.createElement('button');
    reviseButton.textContent = 'submit';

    reviseForm.appendChild(inputID);
    reviseForm.appendChild(inputSeats);
    reviseForm.appendChild(reviseButton);

    li.appendChild(reviseForm);

    modelList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('models').doc(id).delete();
    });

    // revising data
    reviseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('models').doc(id).update({
            ID: reviseForm.inid.value,
            seats: reviseForm.inseat.value
        });
        reviseForm.inid.value = '';
        reviseForm.inseat.value = '';
    })
}

function displayModelRevise(){
    let rmf = document.getElementById("reviseModelForm");
    if (rmf.style.display === "none"){
        rmf.style.display = "block";
    } else {
        rmf.style.display = "none";
    }
}

// saving data (add new model)
modelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('models').add({
        ID: modelForm.id.value,
        seats: modelForm.seats.value
    });
    modelForm.id.value = '';
    modelForm.seats.value = '';
});


let clearSearch = document.createElement('button');
clearSearch.textContent = "clear";
searchModelForm.appendChild(clearSearch);

// search data
searchModelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    while (modelList.firstChild){
        modelList.removeChild(modelList.firstChild);
    }
    db.collection('models').where('ID', '==', searchModelForm.id.value).onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added'){
                renderModel(change.doc);
            } else if (change.type == 'removed'){
                let li = modelList.querySelector('[data-id=' + change.doc.id + ']');
                modelList.removeChild(li);
            }
        });
    });
});

// clear data after search
clearSearch.addEventListener("click", (e) => {
    e.preventDefault();
    while (modelList.firstChild){
        modelList.removeChild(modelList.firstChild);
    }
    db.collection('models').orderBy('ID').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added'){
                renderModel(change.doc);
            } else if (change.type == 'removed'){
                let li = modelList.querySelector('[data-id=' + change.doc.id + ']');
                modelList.removeChild(li);
            }
        });
    });
    searchModelForm.id.value = '';
});


// real-time listener
db.collection('models').orderBy('ID').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added'){
            renderModel(change.doc);
        } else if (change.type == 'removed'){
            let li = modelList.querySelector('[data-id=' + change.doc.id + ']');
            modelList.removeChild(li);
        }
    });
});
