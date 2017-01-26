var player;
var walls;
var cursors;
var wasd;
var bullets;
var fireRate = 400;

export default function create() {

    //this settings
    this.world.setBounds(-1000, -1000, 2000, 2000);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.tileSprite(-1000, -1000, 2000, 2000, 'ground');

    //walls
    walls = this.add.group();
    walls.enableBody = true;
    var wall = walls.create(400, 400, 'wall');
    wall.body.immovable = true;
    wall = walls.create(-150, 250, 'wall');
    wall.body.immovable = true;

    //player
    player = this.add.sprite(0, 0, 'dude');
    player.anchor.set(0.5);
    player.scale.setTo(1);
    player.animations.add('left', [22, 23, 24, 25, 26, 27, 28], 10, true);
    player.animations.add('right', [33, 34, 35, 36, 37, 38, 39], 10, true);
    player.animations.add('down', [0, 1, 2, 3, 4, 5, 6], 10, true);
    player.animations.add('up', [11, 12, 13, 14, 15, 16, 17], 10, true);
    this.camera.follow(player);
    this.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    //bullets
    bullets = this.add.group();
    bullets.enableBody = true;
    this.physics.arcade.enable(bullets);
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);


    //  Our controls.
    cursors = this.input.keyboard.createCursorKeys();
    wasd = {
        up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.input.keyboard.addKey(Phaser.Keyboard.D),
    };
    
}

module.exports = {player, bullets, walls, cursors, wasd, fireRate}
