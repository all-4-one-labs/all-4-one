// Not the best way to export playerCollide
let map, playerCollide;

function createMapPrePlayer(game) {
  map = game.add.tilemap('tilemap');
  map.addTilesetImage('terrain_atlas', 'tileset');
  playerCollide = map.createLayer('playerCollide');
  let groundLayer = map.createLayer('groundLayer');
  map.createLayer('featuresBottom');
  groundLayer.resizeWorld();
  map.createLayer('playerOnBottom');
  map.createLayer('playerOnTop');
}

function createMapPostPlayer() {
  map.setCollisionBetween(1, 2000, true, 'playerCollide');
  map.createLayer('playerBehindBottom');
  map.createLayer('playerBehindTop');    
} 

export { createMapPrePlayer, createMapPostPlayer, playerCollide };