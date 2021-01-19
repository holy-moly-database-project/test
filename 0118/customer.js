const customerList = document.querySelector("#customer-list");
const customerForm = document.querySelector("#add-customer-form");
const searchCustomerForm = document.querySelector('#search-customer-form');

function renderCustomer(doc){
    let li = document.createElement('li');
    let identity = document.createElement('span');
    let name = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    identity.textContent = doc.data().ID;
    name.textContent = doc.data().name;
    cross.textContent = 'x';

    li.appendChild(identity);
    li.appendChild(name);
    li.appendChild(cross);

    customerList.appendChild(li);

    // delete data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('customers').doc(id).delete();
    });
}

// adding data
customerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('customers').add({
        ID: customerForm.id.value,
        name: customerForm.name.value,
    });
    customerForm.id.value = '';
    customerForm.name.value = '';
})

// display all
db.collection('customers').orderBy('ID').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added'){
            renderCustomer(change.doc);
        } else if (change.type == 'removed'){
            let li = customerList.querySelector('[data-id=' + change.doc.id + ']');
            customerList.removeChild(li);
        }
    })
})