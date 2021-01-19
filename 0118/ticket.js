const ticketList = document.querySelector("#ticket-list");
const ticketForm = document.querySelector("#add-ticket-form");
const searchTicketForm = document.querySelector('#search-ticket-form');

function renderCustomer(doc){
    let li = document.createElement('li');
    let ID = document.createElement('span');
    let flightID = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    ID.textContent = doc.data().ID;
    flightID.textContent = doc.data().flightID;
    cross.textContent = 'x';

    li.appendChild(ID);
    li.appendChild(flightID);
    li.appendChild(cross);

    ticketList.appendChild(li);

    // delete data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('tickets').doc(id).delete();
    });
}

// adding data
ticketForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('tickets').add({
        ID: ticketForm.id.value,
        flightID: ticketForm.flightID.value,
    });
    customerForm.ID.value = '';
    customerForm.flightID.value = '';
})

// display all
db.collection('tickets').orderBy('ID').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added'){
            renderTicket(change.doc);
        } else if (change.type == 'removed'){
            let li = ticketList.querySelector('[data-id=' + change.doc.id + ']');
            ticketList.removeChild(li);
        }
    })
})
