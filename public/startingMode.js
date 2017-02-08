document.getElementById('gamemaster')
.addEventListener('click', () => sessionStorage.setItem('mode', 'gamemaster'));

document.getElementById('survivor')
.addEventListener('click', () => sessionStorage.setItem('mode', 'survivor'));



// document.getElementById('pvp')
// .addEventListener('click', () => {
//   sessionStorage.setItem('type', 'pvp')
//   sessionStorage.setItem('mode', 'survivor')
// })

//these two functions are used for validation checks on survivor and gm (1 gm, 4 survivors)
function gmValidationCheck() {
  axios('/gmjoinrequest')
    .then(response => {
      if (response.data) alert('gm is full');
      else window.location = '/instructions.html';
    })
}

function survivorValidationCheck() {
  axios('/survivorjoinrequest')
    .then(response => {
      if (response.data) alert('survivors are full');
      else window.location = '/instructions.html';
    })
}
