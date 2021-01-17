const routeList = document.querySelector("#route-list");
const routeForm = document.querySelector("#add-route-form");

function renderRoute(doc){
    let li = document.createElement('li');
    let identity = document.createElement('span');
    let origin = document.createElement('span');
    let destination = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    identity.textContent = doc.data().ID;
    origin.textContent = doc.data().origin;
    destination.textContent = doc.data().destination;
    cross.textContent = 'x';

    li.appendChild(identity);
    li.appendChild(origin);
    li.appendChild(destination);
    li.appendChild(cross);

    routeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('routes').doc(id).delete();
    })
}

// getting data
// db.collection('routes').orderBy('ID').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderRoute(doc);
//     })
// });

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

