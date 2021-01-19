const orderList = document.querySelector("#order-list");
const orderForm = document.querySelector("#add-order-form");
const searchOrderForm = document.querySelector('#search-order-form');

function renderOrder(doc){
    let li = document.createElement('li');
    let identity = document.createElement('span');
    let cID = document.createElement('span');
    let tID = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    identity.textContent = 'order ID: ' + doc.data().ID;
    cID.textContent = 'customer ID: ' + doc.data().cID;
    tID.textContent = 'ticket ID: ' + doc.data().tID;
    cross.textContent = 'x';

    li.appendChild(identity);
    li.appendChild(cID);
    li.appendChild(tID);
    li.appendChild(cross);

    orderList.appendChild(li);

    // delete data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('orders').doc(id).delete();
    });
}

// adding data
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('orders').add({
        ID: orderForm.id.value,
        cID: orderForm.cID.value,
        tID: orderForm.tID.value
    });
    orderForm.id.value = '';
    orderForm.cID.value = '';
    orderForm.tID.value = '';
})

// display all
db.collection('orders').orderBy('ID').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added'){
            renderOrder(change.doc);
        } 
        else if (change.type == 'removed'){
            let li = orderList.querySelector('[data-id=' + change.doc.id + ']');
            orderList.removeChild(li);
        }
    })
})
