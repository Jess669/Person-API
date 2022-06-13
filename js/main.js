// MODEL

class Person {
    constructor(fname, lname, wealth) {
        this.fname = fname;
        this.lname = lname;
        this.wealth = wealth;
    }
    getFullName() {
        return `${this.fname} ${this.lname}`;
    }
    getWealth() {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.wealth);
    }
    setDblMoney() {
        this.wealth = this.wealth * 2;
    }
}

let nameArr = [];
let name, message, sum = 0;
let error = false;

const createUserClass = (name) => {
    return name = new Person(name.first, name.last, personWealth());
}

const personWealth = () => Math.floor(Math.random() * (1000000 - 100000) + 100000);

const createUserArr = name => nameArr.push(name);


const addUser = () => {
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => createUserClass(data.results[0].name))
        .then(name => createUserArr(name))
        .then(() => successMessage('Added User Successfully!'))
        .catch(err => errorMessage(err))
        .finally(() => render());
}

const checkNameArr = () => {
    return new Promise((resolve, reject) => {
        nameArr.length > 0 ? resolve() : reject('Please Add User!') ;
    })
}

const dblMoneyFinal = () => {
    nameArr.forEach((person) => {
        person.setDblMoney();
    })
}


const dblMoney = () => {
    checkNameArr()
    .then(() => dblMoneyFinal())
    .then(() => successMessage('Money has doubled!'))
    .then(() => sum = 0)
    .catch((err) => errorMessage(err))
    .finally(() => render());
}

const errorMessage = (err) => {
    message = err;
    error = true;
}

const successMessage = (setMessage) => {
    message = setMessage;
    error = false;
}

const alert = () => {
    let alertClass;
    return new Promise((resolve, reject) => {
        if (error == true) {
            resolve( alertClass = 'alert-danger');
        }else if (error == false) {
            resolve( alertClass = 'alert-success' );
        }else {
            reject('An Error Occured!');
        }
    });
}

const displayMessage = (alertClass) => {
    return `
    <div class="alert ${alertClass} text-center custom-alert" id="custom-message">
        ${message}
    </div>`;
}

const messageFadeAway = () => {
    messageAlert = document.querySelector('#custom-message');
    setTimeout(() => { messageAlert.style.opacity = 0 },500);
}

const messageDNone = () => {
    setTimeout(() => { messageAlert.style.display = 'none' },1000);
}

const filterMil = () => {
    nameArr = nameArr.filter((name) => { return name.wealth > 1000000 });
}

const showMil = () => {
    checkNameArr()
    .then(() => filterMil())
    .then(() => successMessage('Millionaires!'))
    .catch((err) => errorMessage(err))
    .finally(() => render());
}

const sort = () => {
    nameArr.sort((a, b) => { return a.wealth - b.wealth })
}

const sortRiches = () => {
    checkNameArr()
    .then(() => sort())
    .then(() => successMessage('Sort Successful!'))
    .catch((err) => errorMessage(err))
    .finally(() => render());
}

const totalWealth = () => {
    sum = 0;
    nameArr.forEach((name) => {
        sum += name.wealth;
    })
}

const calcWealth = () => {
    checkNameArr()
    .then(() => totalWealth())
    .then(() => successMessage('Total Wealth!'))
    .catch((err) => errorMessage(err))
    .finally(() => render());
}

const formatToDollar = (wealth) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(wealth);
}








// VIEW

let getMessage = document.querySelector('#message');
let messageAlert;

document.querySelector('#add-user-btn').addEventListener('click',addUser);
document.querySelector('#double-money-btn').addEventListener('click',dblMoney);
document.querySelector('#show-mil-btn').addEventListener('click',showMil);
document.querySelector('#sort-btn').addEventListener('click',sortRiches);
document.querySelector('#calc-wealth').addEventListener('click',calcWealth);

















// CONTROLLER

const render = () => {
    const personTable = document.querySelector('#person-table');

    if (message !== '' && message !== undefined) {
        alert()
        .then((alert) => displayMessage(alert))
        .then((data) => getMessage.innerHTML = data)
        .then(() => messageFadeAway())
        .then(() => messageDNone())
        .catch((err) => console.log(err));
    }
    personTable.innerHTML = '';
    nameArr.forEach(name => {
        personTable.innerHTML += `
            <tr>
                <td class='text-white'>${name.getFullName()}</td>
                <td class='text-white'>${name.getWealth()}</td>
            </tr>
        `
    })
    if (sum != undefined && sum != 0) {
        const total = document.querySelector('#total');
        total.innerHTML = `
            <p> Total Wealth: ${formatToDollar(sum)} </p>
        `
    }else {
        total.innerHTML = '';
    }

}