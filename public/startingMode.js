document.getElementById('gamemaster')
.addEventListener('click', () => sessionStorage.setItem('mode', 'gamemaster'));

document.getElementById('survivor')
.addEventListener('click', () => sessionStorage.setItem('mode', 'survivor'));

document.getElementById('pvp')
.addEventListener('click', () => {
  sessionStorage.setItem('type', 'pvp')
  sessionStorage.setItem('mode', 'survivor')
})
