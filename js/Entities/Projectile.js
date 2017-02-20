import Entity from './Entity';

export default class Projectile extends Entity{
  //direction is an angle. speed is in pixels per second.
  constructor(x, y, direction, speed){
    super();
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.destroyed = false;
    this.radius = 2.5;
  }
  update(dt, shields){
    if (this.destroyed) return;
    let dx = Math.cos(this.direction) * this.speed;
    let dy = Math.sin(this.direction) * this.speed;
    let newX = this.x + dx;
    let newY = this.y + dy;
    shields.forEach(shield=>{
      this.detectCollisionWithShield(shield, newX, newY);
    });

    this.x = newX;
    this.y = newY;
  }
  render(ctx){
    if(this.destroyed) return console.log("possible memory leak");
    ctx.strokeRect(this.x-2, this.y-2, this.radius*2, this.radius*2);
  }
  getDistanceToCenter(x, y){
    let dx = (x || this.x) - window.innerWidth/2;
    let dy = (y || this.y) - window.innerHeight/2;
    return Math.sqrt(dx*dx + dy*dy);
  }
  detectCollisionWithShield(shield, newX, newY){
    if (this.destroyed) return;
    if (this.isInCollisionRangeWith(shield, newX, newY)){
      var collision = shield.checkAndProcessCollision(this);
      if (collision)
        this.destroyed = true;
    }
  }
  isInCollisionRangeWith(shieldSection, newX, newY){
    return shieldSection.radius > this.getDistanceToCenter(newX, newY) - this.radius
            && shieldSection.radius < this.getDistanceToCenter() + this.radius;
  }
  getPolarAngle(){
    let x = this.x - window.innerWidth/2,
        y = window.innerHeight/2 - this.y;
    return Math.atan2(y, x);
  }
}
