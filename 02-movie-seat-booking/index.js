const containerEl = document.querySelector('.container');
const seatsEl = document.querySelectorAll('.row .seat:not(.occupied)');
const countEl = document.getElementById('count');
const totalEl = document.getElementById('total');
const movieSelectEl = document.getElementById('movie');

let ticketPrice = movieSelectEl.value;

containerEl.addEventListener('click', onSeatClick);
movieSelectEl.addEventListener('change', onMovieSelect);

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
  totalEl.innerText = selectedSeatsCount * ticketPrice;
}

function onMovieSelect(e) {
  ticketPrice = e.target.value;

  totalEl.innerText = 0;
  countEl.innerText = 0;

  const seatsEl = document.querySelectorAll('.row .seat.selected');
  seatsEl.forEach(seatEl => seatEl.classList.remove('selected'));
}
