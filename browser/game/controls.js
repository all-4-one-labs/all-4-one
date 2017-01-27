import {bullets, fireRate} from './create.js' //change to being from bullets file 

export default function controls(){
  return(
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
  )
}