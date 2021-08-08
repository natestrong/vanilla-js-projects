const containerEl = document.querySelector('.container');
const seatsEl = document.querySelectorAll('.row .seat:not(.occupied)');
const countEl = document.getElementById('count');
const totalEl = document.getElementById('total');
const movieSelectEl = document.getElementById('movie');

let state = {
  ticketPrice: movieSelectEl.value,
  selectedMovie: 0,
  selectedSeats: []
}

containerEl.addEventListener('click', onSeatClick);
movieSelectEl.addEventListener('change', onMovieSelect);

onload = populateUI;

function populateUI() {
  state = getStateFromDb() || {};

  if (state.selectedSeats !== undefined && state.selectedSeats.length) {
    seatsEl.forEach((seat, index) => {
      if (state.selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    })
  }
}

function onSeatClick(e) {
  if (!e.target.classList.contains('seat')) return;
  if (e.target.classList.contains('occupied')) return;

  const seatEl = e.target;
  seatEl.classList.toggle('selected');

  updateSelectedCount();
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  countEl.innerText = selectedSeatsCount;
  totalEl.innerText = selectedSeatsCount * state.ticketPrice;

  state.selectedSeats = [...selectedSeats]
    .map((seat) => [...seatsEl]
      .indexOf(seat));
  updateDb(state);
}

function onMovieSelect(e) {
  state.ticketPrice = e.target.value;

  totalEl.innerText = 0;
  countEl.innerText = 0;

  const seatsEl = document.querySelectorAll('.row .seat.selected');
  seatsEl.forEach(seatEl => seatEl.classList.remove('selected'));

  state.selectedMovie = e.target.selectedIndex;
  state.ticketPrice = e.target.value;
  updateDb(state);
}

function updateDb(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

function getStateFromDb() {
  return JSON.parse(localStorage.getItem('state'));
}
