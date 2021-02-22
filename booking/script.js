const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

// Save selected movie price and index...
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}


// Update the total number of seats selected and
// total price...
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

// Create Local Storage.....
// Copy Selected Seats inot an array...
// Map through that array...
// Return a new array of indexes...
const seatsIndex = [...selectedSeats].map((seat) => {
  return [...seats].indexOf(seat);
});
localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

//The amount of selected seats in the array that is created as seats are selected becomes the selectedSeatsCount...
// selectedSeatsCount then becomes the innerText of the 'count' span... 
  const selectedSeatsCount = selectedSeats.length;
// the number of selectedSeats is then multiplied by the price of the movie, becoming the total...
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populateUI()...
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

if(selectedSeats !== null && selectedSeats.length > 0) {
  seats.forEach((seat, index) => {
    if(selectedSeats.indexOf(index) > -1) {
      seat.classList.add('selected');
    }
  })
}

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//when a movie is selected, change the price of the seat when it is selected and added to the total...
// the updateSelectedCount() function must then be called again.
movieSelect.addEventListener('change', (e) => {
  ticketPrice = e.target.value;
// Sets the index of the selected movie and its price to be saved in localStorage...
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

//Change the class of a seat to 'selected' when it is clicked, and change the color from grey to blue...
//You must use .toggle so that it can be selected and unselected...
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Initial count and total set...
updateSelectedCount();


