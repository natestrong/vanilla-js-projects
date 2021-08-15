const mainEl = document.getElementById('main');

const addUserEl = document.getElementById('add-user');
const doubleEl = document.getElementById('double');
const showMillionairesEl = document.getElementById('show-millionaires');
const sortEl = document.getElementById('sort');
const calculateWealthEl = document.getElementById('calculate-wealth');

main();

async function main() {
    // [{name: string, money: number}]
    let users = await addUsers([], 5, getRandomUser);
    updateDOM(users);

    addUserEl.addEventListener('click', async () => {
        users = await addUsers(users, 1, getRandomUser);
        updateDOM(users);
    })
}

async function getRandomUser() {
    const response = await fetch('https://randomuser.me/api');
    const {results} = await response.json();
    const user = results[0];
    return {
        name: `${user.name.first} ${user.name.last}`,
        money: (Math.random() * 1_000_000) + 20_000,
        moneyString: function() {
            return this.money.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
        }
    };
}

async function addUsers(users, count, getUser) {
    console.log(users, count, getUser);
    users = [...users];
    for (let i = 0; i < count; i++) {
        users.push(await getUser());
    }
    return users;
}

async function addUser(users, cb) {
    users = [...users, await cb()];
    console.log(users);
    return users;
}

function updateDOM(users) {
    mainEl.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    const fragment = document.createDocumentFragment();
    users.forEach(user => {
        console.log(user);
        const userEl = document.createElement('div');
        userEl.classList.add('person');
        userEl.innerHTML = `<strong>${user.name}</strong> ${user.moneyString()}`;
        fragment.appendChild(userEl);
    });
    mainEl.appendChild(fragment);
}
