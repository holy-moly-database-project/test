const planeList = document.querySelector("#plane-list");
const planeForm = document.querySelector("#add-plane-form");
const searchPlaneForm = document.querySelector('#search-plane-form');

function renderPlane(doc){
    let li = document.createElement('li');
    let identity = document.createElement('span');
    let mID = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    identity.textContent = 'plane ID: ' + doc.data().ID;
    mID.textContent = 'model ID: ' + doc.data().mID;
    cross.textContent = 'x';

    li.appendChild(identity);
    li.appendChild(mID);
    li.appendChild(cross);

    planeList.appendChild(li);

    // delete data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('planes').doc(id).delete();
    });
}

// adding data
planeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputID = planeForm.id.value;
    let inputmodelID = planeForm.mID.value;

    if(inputID == "" || inputmodelID == ""){
         window.alert("Please enter with no space~");  
    }
    else{
        db.collection('planes').add({
        ID: inputID,
        mID: inputmodelID,
        });
    }
    
    planeForm.id.value = '';
    planeForm.mID.value = '';
})

// display all
db.collection('planes').orderBy('ID').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added'){
            renderPlane(change.doc);
        } 
        else if (change.type == 'removed'){
            let li = planeList.querySelector('[data-id=' + change.doc.id + ']');
            planeList.removeChild(li);
        }
    })
})
