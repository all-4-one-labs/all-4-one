var player;
var walls;
var cursors;
var wasd;
var fireRate = 400;
var button;
var monster;
var bullets;


export default function create() {
    var game = this;
    //this settings
    game.world.setBounds(-1000, -1000, 2000, 2000);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(-1000, -1000, 2000, 2000, 'ground');

    //walls
    walls = game.add.group();
    walls.enableBody = true;
    var wall = walls.create(400, 400, 'wall');
    wall.body.immovable = true;
    wall = walls.create(-150, 250, 'wall');
    wall.body.immovable = true;

    //player
    player = game.add.sprite(0, 0, 'dude');
    player.anchor.set(0.5);
    player.scale.setTo(1);
    player.animations.add('left', [22, 23, 24, 25, 26, 27, 28], 10, true);
    player.animations.add('right', [33, 34, 35, 36, 37, 38, 39], 10, true);
    player.animations.add('down', [0, 1, 2, 3, 4, 5, 6], 10, true);
    player.animations.add('up', [11, 12, 13, 14, 15, 16, 17], 10, true);
    game.camera.follow(player);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    //monster
    monster = game.add.sprite(500, 0, 'monster');
    monster.anchor.set(0.5);
    monster.scale.setTo(2);
    monster.animations.add('idle', [0]);
    game.physics.arcade.enable(monster);
    monster.body.collideWorldBounds = true;
    monster.health = 100;

    //bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    game.physics.arcade.enable(bullets);
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

    //button
    //button = this.add.button(this.world.centerX - 95, 400, 'button', spawn, this, 2, 1, 0);

}

export {player, walls, cursors, wasd, fireRate, monster, bullets}
