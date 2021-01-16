const routeList = document.querySelector("#route-list");
const form = document.querySelector("#add-route-form");

function renderRoute(doc){
    let li = document.createElement('li');
    let identity = document.createElement('span');
    let origin = document.createElement('span');
    let destination = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    identity.textContent = doc.data().ID;
    origin.textContent = doc.data().origin;
    destination.textContent = doc.data().destination;

    li.appendChild(identity);
    li.appendChild(origin);
    li.appendChild(destination);

    routeList.appendChild(li);
}

// getting data
db.collection('routes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderRoute(doc);
    })
})

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('routes').add({
        ID: form.id.value,
        origin: form.origin.value,
        destination: form.destination.value
    });
    form.id.value = '';
    form.origin.value = '';
    form.destination.value = '';
})
