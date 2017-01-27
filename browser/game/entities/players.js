import {bullets, fireRate} from '../create.js' //change to being from bullets file 

export default class Player {
  constructor(id, game){
    this.health = 100;
    this.id = id;
    this.game = game;
    this.create()
    this.update = this.update.bind(this)
    this.fire = this.fire.bind(this)
    this.nextFire = 0
  }

  create() {
    //set up player sprite on the map
    this.player = this.game.add.sprite(0, 0, 'dude');
    this.player.anchor.set(0.5);
    this.player.scale.setTo(1);
    this.player.animations.add('left', [22, 23, 24, 25, 26, 27, 28], 10, true);
    this.player.animations.add('right', [33, 34, 35, 36, 37, 38, 39], 10, true);
    this.player.animations.add('down', [0, 1, 2, 3, 4, 5, 6], 10, true);
    this.player.animations.add('up', [11, 12, 13, 14, 15, 16, 17], 10, true);
    this.game.camera.follow(this.player);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    //controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.wasd = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
  }

  update(){
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.wasd.left.isDown)
    {
        //  Move left
        this.player.body.velocity.x = -150;

        this.player.animations.play('left');
    }
    else if (this.wasd.right.isDown)
    {
        //  Move right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
    }
    else if (this.wasd.up.isDown)
    {
        //  Move up
        this.player.body.velocity.y = -150;

        this.player.animations.play('up');
    }
    else if (this.wasd.down.isDown)
    {
        //  Move down
        this.player.body.velocity.y = 150;

        this.player.animations.play('down');
    }
    else
    {
        //  Stand still
        this.player.animations.stop();
        this.player.frame = 0;
    }

    //fire bullets
        if (this.cursors.up.isDown && this.cursors.left.isDown)
    {
        this.fire('up-left');
    }
    else if (this.cursors.up.isDown && this.cursors.right.isDown)
    {
        this.fire('up-right');
    }
    else if (this.cursors.down.isDown && this.cursors.left.isDown)
    {
        this.fire('down-left');
    }
    else if (this.cursors.down.isDown && this.cursors.right.isDown)
    {
        this.fire('down-right');
    }
    else if (this.cursors.left.isDown)
    {
        this.fire('left');
    }
    else if (this.cursors.right.isDown)
    {
        this.fire('right');
    }
    else if (this.cursors.up.isDown)
    {
        this.fire('up');
    }
    else if (this.cursors.down.isDown)
    {
        this.fire('down');
    }
  }
    //fire helper function
    fire(direction) {
      if (this.game.time.now > this.nextFire && bullets.countDead() > 0) {
        this.nextFire = this.game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.scale.setTo(0.5);
        bullet.reset(this.player.x, this.player.y);
        switch(direction) {
          case 'left' : this.game.physics.arcade.moveToXY(bullet, -1000, this.player.y, 500); break;
          case 'right': this.game.physics.arcade.moveToXY(bullet, 1000, this.player.y, 500); break;
          case 'up': this.game.physics.arcade.moveToXY(bullet, this.player.x, -1000, 500); break;
          case 'down': this.game.physics.arcade.moveToXY(bullet, this.player.x, 1000, 500); break;
          case 'up-left': this.game.physics.arcade.moveToXY(bullet, this.player.x - 1000, this.player.y - 1000, 500); break;
          case 'up-right': this.game.physics.arcade.moveToXY(bullet, this.player.x + 1000, this.player.y - 1000, 500); break;
          case 'down-left': this.game.physics.arcade.moveToXY(bullet, this.player.x - 1000, this.player.y + 1000, 500); break;
          case 'down-right': this.game.physics.arcade.moveToXY(bullet, this.player.x + 1000, this.player.y + 1000, 500); break;
        }
      }
    }

}
