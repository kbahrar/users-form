let users = [{
        id: "123456789",
        createdDate: "2021-01-06T00:00:00.000Z",
        status: "En validation",
        firstName: "Mohamed",
        lastName: "Taha",
        userName: "mtaha",
        registrationNumber: "2584",
    },
    {
        id: "987654321",
        createdDate: "2021-07-25T00:00:00.000Z",
        status: "Validé",
        firstName: "Hamid",
        lastName: "Orrich",
        userName: "horrich",
        registrationNumber: "1594",
    },
    {
        id: "852963741",
        createdDate: "2021-09-15T00:00:00.000Z",
        status: "Rejeté",
        firstName: "Rachid",
        lastName: "Mahidi",
        userName: "rmahidi",
        registrationNumber: "3576",
    }
]

const status = {
    'Rejeté': 'rejected',
    'Validé': 'valide',
    'En validation': 'on-validation'
}

const table = document.getElementById('table');

// submit form functions
const firstName = document.getElementsByName('firstName')[0];
const lastName = document.getElementsByName('lastName')[0];
const createdDate = document.getElementsByName('createdDate')[0];
const userName = document.getElementsByName('userName')[0];
const registrationNumber = document.getElementsByName('registrationNumber')[0];
const select = document.getElementsByName('status')[0];
const alertUser = document.getElementById('alert-user');
const modalAdd = document.getElementById('modal-add');

const showModal = (flag) => {
    if (flag)
        modalAdd.style.display = "inline";
    else
        modalAdd.style.display = "none";
}

const getAllFormData = () => {
    const user = {
        id: Date.now(),
        createdDate: createdDate.value,
        status: select.options[select.selectedIndex].text,
        firstName: firstName.value,
        lastName: lastName.value,
        userName: userName.value,
        registrationNumber: registrationNumber.value,
    }

    return user;
}

const checkInput = (user) => {
    for (const key in user) {
        if (user[key] === '')
            return { status: 'failed', msg: `${key} is required` }
    }

    if (!/\d\d\d\d-(0[1-9]|1[0-2]|[0-9])-([0-2][0-9]|3[0-1]|[0-9])/.test(user.createdDate))
        return { status: 'failed', msg: `date de creation invalid` }

    if (!/^\d+$/.test(user.registrationNumber))
        return { status: 'failed', msg: `Matricule should be number` }

    return { status: 'success', msg: 'added with success' }
}

const submit = () => {
    const user = getAllFormData();
    const check = checkInput(user);
    alertUser.style.visibility = 'hidden';

    if (check.status == 'failed') {
        alertUser.innerHTML = check.msg;
        alertUser.style.visibility = 'visible';
    } else {
        const tr = addUserToRow(user);

        users = [...users, user];
        table.appendChild(tr);
        showModal(false);
    }
}

// DOM manipulation functions
const handleDeleteClick = (id, tr, td) => {
    td.addEventListener('click', () => {
        tr.parentElement.removeChild(tr);
        users = users.filter(user => user.id !== id);
    });
}

const getActionElement = (id, tr) => {
    const td = document.createElement('td');
    const li = document.createElement('li');

    td.setAttribute('class', 'item-action click');
    td.setAttribute('id', id);
    handleDeleteClick(id, tr, td);

    li.setAttribute('class', "fa-solid fa-trash-can");
    td.appendChild(li);

    return td;
}

const getTdElement = (user, key) => {
    let td = document.createElement('td');
    let div = document.createElement('div');

    if (key === 'status') {
        div.setAttribute('class', 'alert ' + status[user[key]])
        div.innerHTML = user[key];
        td.appendChild(div);
    } else if (key === 'createdDate') {
        let date = new Date(user[key])
        td.innerHTML = date.toLocaleDateString("es-PA");
    } else
        td.innerHTML = user[key];

    return td;
}

const addUserToRow = (user) => {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'table-rows');

    for (const key in user) {
        if (user.hasOwnProperty(key)) {
            const td = getTdElement(user, key);
            tr.appendChild(td);
        }
    }

    tr.appendChild(getActionElement(user.id, tr));

    return tr;
}

const render = () => {
    users.map(user => {
        const tr = addUserToRow(user);
        table.appendChild(tr);
    })
}

render();