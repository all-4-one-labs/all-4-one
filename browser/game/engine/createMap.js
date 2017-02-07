           // Not the best way to export playerCollide and bulletCollide
let map, playerCollide, bulletCollide, behindLayer;

function createMapPrePlayer(game) {
  map = game.add.tilemap('tilemap');
  map.addTilesetImage('terrain_atlas', 'tileset');
  bulletCollide = map.createLayer('bulletCollide');
  playerCollide = map.createLayer('playerCollide');
  let groundLayer = map.createLayer('groundLayer');
  map.createLayer('featuresBottom');
  groundLayer.resizeWorld();
  map.createLayer('playerOnBottom');
  map.createLayer('playerOnTop');
  behindLayer = game.add.group();
}

function createMapPostPlayer() {
  map.setCollisionBetween(1, 2000, true, 'playerCollide');
  map.setCollisionBetween(1, 2000, true, 'bulletCollide');
  let playerBehindBottom = map.createLayer('playerBehindBottom');
  behindLayer.add(playerBehindBottom)
  let playerBehindTop = map.createLayer('playerBehindTop');
  behindLayer.add(playerBehindTop);
} 

export { createMapPrePlayer, createMapPostPlayer, playerCollide, bulletCollide, behindLayer };