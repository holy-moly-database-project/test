const routeList = document.querySelector("#route-list");
const routeForm = document.querySelector("#add-route-form");
const searchRouteForm = document.querySelector('#search-route-form');

function renderRoute(doc){
    let li = document.createElement('li');
    let identity = document.createElement('span');
    let origin = document.createElement('span');
    let destination = document.createElement('span');
    let cross = document.createElement('div');
    let revise = document.createElement('button');

    li.setAttribute('data-id', doc.id);
    identity.textContent = doc.data().ID;
    origin.textContent = doc.data().origin;
    destination.textContent = doc.data().destination;
    cross.textContent = 'x';
    

    revise.textContent = 'revise';
    revise.setAttribute("onclick", "displayRevise()");

    li.appendChild(identity);
    li.appendChild(origin);
    li.appendChild(destination);
    li.appendChild(cross);
    li.appendChild(revise);

    let reviseForm = document.createElement('form');
    reviseForm.id = "reviseRouteForm";
    reviseForm.style.display = "none";

    let inputID = document.createElement('input');
    inputID.setAttribute("type", "text");
    inputID.setAttribute("name", "inid");
    inputID.setAttribute("placeholder", "route ID");

    let inputOrigin = document.createElement('input');
    inputOrigin.setAttribute("type", "text");
    inputOrigin.setAttribute("name", "inorigin")
    inputOrigin.setAttribute("placeholder", "origin");

    let inputDestination = document.createElement('input');
    inputDestination.setAttribute("type", "text");
    inputDestination.setAttribute("name", "indes");
    inputDestination.setAttribute("placeholder", "destination");

    let reviseButton = document.createElement('button');
    reviseButton.textContent = 'submit';

    reviseForm.appendChild(inputID);
    reviseForm.appendChild(inputOrigin);
    reviseForm.appendChild(inputDestination)
    reviseForm.appendChild(reviseButton);

    routeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('routes').doc(id).delete();
    })

    // revising data
    reviseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('routes').doc(id).update({
            ID: reviseForm.inid.value,
            origin: reviseForm.inorigin.value,
            destination: reviseForm.indes.value
        });
        reviseForm.inid.value = '';
        reviseForm.inorigin.value = '';
        reviseForm.indes.value ='';
    })
}

function displayRevise(){
    let x = document.getElementById("reviseRouteForm");
    if (x.style.display === "none"){
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// saving data
routeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('routes').add({
        ID: routeForm.id.value,
        origin: routeForm.origin.value,
        destination: routeForm.destination.value
    });
    routeForm.id.value = '';
    routeForm.origin.value = '';
    routeForm.destination.value = '';
});

let clearSearchRoute = document.createElement('button');
clearSearchRoute.textContent = "clear";
searchRouteForm.appendChild(clearSearchRoute);

// search data
searchRouteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    while (routeList.firstChild){
        routeList.removeChild(routeList.firstChild);
    }
    db.collection('routes').where('ID', '==', searchRouteForm.id.value).onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added'){
                renderRoute(change.doc);
            } else if (change.type == 'removed'){
                let li = routeList.querySelector('[data-id=' + change.doc.id + ']');
                routeList.removeChild(li);
            }
        });
    });
});

// clear data after search
clearSearchRoute.addEventListener("click", (e) => {
    e.preventDefault();
    while (routeList.firstChild){
        routeList.removeChild(routeList.firstChild);
    }
    db.collection('routes').orderBy('ID').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added'){
                renderRoute(change.doc);
            } else if (change.type == 'removed'){
                let li = routeList.querySelector('[data-id=' + change.doc.id + ']');
                routeList.removeChild(li);
            }
        });
    });
    searchRouteForm.id.value = '';
});

// real-time listener
db.collection('routes').orderBy('ID').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added'){
            renderRoute(change.doc);
        } else if (change.type == 'removed'){
            let li = routeList.querySelector('[data-id=' + change.doc.id + ']');
            routeList.removeChild(li);
        }
    })
})

