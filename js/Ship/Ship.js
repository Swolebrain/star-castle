import {Entity, Projectile} from '../Entities';
import TouchControls from '../ui/TouchControls';

export default class Ship extends Entity{
  constructor(images, speed, x, y){
    super();
    this.sprite = images['assets/img/ship_sm.png'];
    this.propulsionSprite = images['assets/img/flame_sm.png'];
    this.spriteScale = 0.5;
    this.speed = speed;
    this.bounceSpeed = {x:0, y:0};
    let {innerWidth:w, innerHeight:h} = window
    this.x = x || (Math.random()*w*0.2 - w*0.1 + w) % w;
    this.y = y || (Math.random()*h*0.2 - h*0.1 + h) % h;
    console.log(`Spawning ship at ${this.x}, ${this.y}`);
    this.controls = new TouchControls(this.fireProjectile);
    this.projectiles = [];
  }
  update(dt, shields){
    this.projectiles.forEach(projectile=>projectile.update(dt, shields));
    this.projectiles = this.projectiles.filter(projectile=>!projectile.destroyed);
    this.x += Math.cos(this.controls.getAngle())*this.speed*dt;
    this.y += Math.sin(this.controls.getAngle())*this.speed*dt;
    let bounce = this.checkInsideShields(shields);
    if (bounce){
      console.log(bounce);
      this.bounceSpeed = bounce;
    }
    this.processBounceSpeed();
    if (this.x > window.innerWidth) {
      this.x = 0;
    }
    else if (this.x < 0) {
      this.x = window.innerWidth;
    }
    if (this.y > window.innerHeight) this.y = 0;
    else if (this.y < 0) this.y = window.innerHeight;
  }
  render(ctx){
    this.projectiles.forEach(projectile=>projectile.render(ctx));
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.controls.getAngle());
    ctx.drawImage(this.propulsionSprite, -(this.sprite.width/2+this.propulsionSprite.width/1.15)*this.spriteScale,
          -this.propulsionSprite.height*this.spriteScale/2,
        this.propulsionSprite.width*this.spriteScale,
        this.propulsionSprite.height*this.spriteScale);
    ctx.drawImage(this.sprite, -this.sprite.width*this.spriteScale/2,
                            -this.sprite.height*this.spriteScale/2,
                          this.sprite.width*this.spriteScale,
                          this.sprite.height*this.spriteScale);
    ctx.restore();
    if(this.controls.render) this.controls.render(ctx);
  }
  fireProjectile = ()=>{
    this.projectiles.push(new Projectile(this.x, this.y, this.controls.getAngle(), 20))
  }
  checkInsideShields = shields => {
    let radius = this.spriteScale*this.sprite.width/2;
    let polarAngle = this.getPolarAngle();
    let thisDistanceToCenter = Math.round(this.getDistanceToCenter());
    // console.log(polarAngle);
    let ret = null;
    shields.forEach((shield,i)=>{
      if (ret) return;
      shield.shieldSections.forEach((shieldSection,i2)=>{
        // console.log(shieldSection.startAngle);
        if (shieldSection.startAngle < polarAngle &&
          shieldSection.startAngle + shieldSection.arcRadians > polarAngle &&
          thisDistanceToCenter - radius < shieldSection.radius){
              // console.log('Collided with shield', i, "section", i2);
              ret = {x: Math.cos(polarAngle)*10,
                      y: Math.sin(polarAngle)*10
                    };
              return;
            }
      });
    });
    return ret;
  }
  processBounceSpeed(){
    this.x += this.bounceSpeed.x;
    this.y += this.bounceSpeed.y;
    this.bounceSpeed.x *= .9;
    this.bounceSpeed.y *= .9;
    if (Math.abs(this.bounceSpeed.x) < 0.01) this.bounceSpeed.x = 0;
    if (Math.abs(this.bounceSpeed.y) < 0.01) this.bounceSpeed.y = 0;
  }
  getDistanceToCenter(x, y){
    let dx = (x || this.x) - window.innerWidth/2;
    let dy = (y || this.y) - window.innerHeight/2;
    return Math.sqrt(dx*dx + dy*dy);
  }
  getPolarAngle(){
    let x = this.x - window.innerWidth/2,
        y = window.innerHeight/2 - this.y;
    let angle =  Math.atan2(y, x);
    return (Math.PI - angle + Math.PI) % (2* Math.PI);
  }
}
