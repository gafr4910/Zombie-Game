const Phaser = require('phaser');

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20; // radius used for collision detection

    // movement
    this.moveSpeed = 200;
    this.forwardRot = 0;
    this.rotSpeed = 2.5;
    this.isGoingForward = false;
    this.isGoingBack = false;

    //arms
    this.leftArmIsOn = true;
    this.rightArmIsOn = true;

    // Geometry used for rendering
    this.baseGeo = [
      new Phaser.Geom.Point(-17, 10),
      new Phaser.Geom.Point(-8, 20),
      new Phaser.Geom.Point(8, 20),
      new Phaser.Geom.Point(17, 10),
      new Phaser.Geom.Point(17, -20),
      new Phaser.Geom.Point(-17, -20),
      new Phaser.Geom.Point(-17, 10),
    ];
  }

  setX(newX) {
    this.x = newX;
  }
  
  setY(newY) {
    this.y = newY;
  }

  update(deltaTime, keys) {
    // Player Movement
    // if (keys.a.isDown) {
    //   this.cannonRot -= this.rotSpeed * deltaTime / 1000
    // }
    // else if (keys.d.isDown) {
    //   this.cannonRot += this.rotSpeed * deltaTime / 1000
    // }

    // Player Movement
    if (keys.left.isDown) {
      this.forwardRot -= this.rotSpeed * deltaTime / 1000
    }
    if (keys.right.isDown) {
      this.forwardRot += this.rotSpeed * deltaTime / 1000
    }


    // Calculate forward vector
    const forwardX = -Math.sin(this.forwardRot);
    const forwardY = Math.cos(this.forwardRot);
    
    if (keys.up.isDown) {
      this.x += this.moveSpeed * forwardX * deltaTime / 1000;
      this.y += this.moveSpeed * forwardY * deltaTime / 1000;
      this.isGoingForward = true;
    }
    else if(!keys.up.isDown) {
      this.isGoingForward = false;
    }
    if (keys.down.isDown) {
      this.x -= this.moveSpeed * forwardX * deltaTime / 1000;
      this.y -= this.moveSpeed * forwardY * deltaTime / 1000;
      this.isGoingBack = true;
    }
    else if(!keys.down.isDown) {
      this.isGoingBack = false;
    }
  }

  draw(graphics) {
    // render player base
    graphics.save();
    graphics.translate(this.x, this.y);
    graphics.rotate(this.forwardRot);
    graphics.strokePoints(this.baseGeo);
    
    //arms
    if(this.isGoingForward) {
      if(this.rightArmIsOn) {
        graphics.fillRect(-32, 0, 15, 35);
      }
      if(this.leftArmIsOn){
        graphics.fillRect(17, 0, 15, 35);
      }
    }
    else if(this.isGoingBack) {
      if(this.rightArmIsOn) {
        graphics.fillRect(-32, 0, 15, 25);
      }
      if(this.leftArmIsOn){
        graphics.fillRect(17, 0, 15, 25);
      }
    }
    else {
      if(this.rightArmIsOn) {
        graphics.fillRect(-32, 0, 15, 15);
      }
      if(this.leftArmIsOn){
        graphics.fillRect(17, 0, 15, 15);
      }
    }
    graphics.restore();
  }
}

module.exports = Player;
