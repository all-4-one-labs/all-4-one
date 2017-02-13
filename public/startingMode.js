
///
document.getElementById('gunner')
.addEventListener('click', () => {
    sessionStorage.setItem('playerType', 'gunner');
    survivorValidationCheck();
});

document.getElementById('mage')
.addEventListener('click', () => {
    sessionStorage.setItem('playerType', 'mage');
    survivorValidationCheck();
});

document.getElementById('shotgunner')
.addEventListener('click', () => {
    sessionStorage.setItem('playerType', 'shotgunner');
    survivorValidationCheck();
});

document.getElementById('continue')
.addEventListener('click', () => {
    gmValidationCheck();
});

// document.getElementById('pvp')
// .addEventListener('click', () => {
//   sessionStorage.setItem('type', 'pvp')
//   sessionStorage.setItem('mode', 'survivor')
// })

//these two functions are used for validation checks on survivor and gm (1 gm, 4 survivors)
function gmValidationCheck() {
  axios('/gmjoinrequest')
    .then(response => {
      if (response.data) alert('Sorry, there\'s already a game master in this game.');
      else window.location = '/game.html';
    })
}

function survivorValidationCheck() {
  axios('/survivorjoinrequest')
    .then(response => {
      if (response.data) alert('Sorry, this game is at maximum survivors');
      else window.location = '/game.html';
    })
}
