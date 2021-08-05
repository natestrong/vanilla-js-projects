const formEl = document.getElementById('form');
const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const password2El = document.getElementById('password2');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();

    const username = event.target.username.value;

    if (username === '') {
        showError(event.target.username, 'Username is required')
    } else {
        showSuccess(event.target.username)
    }

    console.dir(event.target.username.value)

}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.remove('success');
    formControl.classList.add('error');
    const smallEl = formControl.children[2];
    smallEl.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}
