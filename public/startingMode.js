document.getElementById('gamemaster')
.addEventListener('click', () => sessionStorage.setItem('mode', 'gamemaster'));

document.getElementById('survivor')
.addEventListener('click', () => sessionStorage.setItem('mode', 'survivor'));
