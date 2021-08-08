const containerEl = document.querySelector('.container');
const seatsEl = document.querySelectorAll('.row .seat:not(.occupied)');
const countEl = document.getElementById('count');
const totalEl = document.getElementById('total');
const movieSelectEl = document.getElementById('movie');

const ticketPrice = movieSelectEl.value;

console.log(Number(ticketPrice));

