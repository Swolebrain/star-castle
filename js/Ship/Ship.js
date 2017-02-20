import {Entity} from '../Entities';
import Controls from './Controls';

export default class Ship extends Entity{
  constructor(images, speed, x, y){
    super();
    this.sprite = images['assets/img/ship_sm.png'];
    this.propulsionSprite = images['assets/img/flame_sm.png'];
    this.spriteScale = 0.75;
    this.speed = speed;
    let {innerWidth:w, innerHeight:h} = window
    this.x = x || (Math.random()*w*0.2 - w*0.1 + w) % w;
    this.y = y || (Math.random()*h*0.2 - h*0.1 + h) % h;
    console.log(`Spawning ship at ${this.x}, ${this.y}`);
    this.controls = new Controls();
  }
  update(dt){
    this.x += Math.cos(this.controls.getAngle())*this.speed*dt;
    this.y += Math.sin(this.controls.getAngle())*this.speed*dt;
    // console.log(this.x + " vs "+window.innerWidth);
    if (this.x > window.innerWidth) {
      this.x = 0;
      console.log('went to the right');
    }
    else if (this.x < 0) {
      this.x = window.innerWidth;
      console.log('went to the left');
    }

    if (this.y > window.innerHeight) this.y = 0;
    else if (this.y < 0) this.y = window.innerHeight;
  }
  render(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.controls.getAngle());
    ctx.drawImage(this.sprite, -this.sprite.width*this.spriteScale/2,
                            -this.sprite.height*this.spriteScale/2,
                          this.sprite.width*this.spriteScale,
                          this.sprite.height*this.spriteScale);

    ctx.restore();
  }
}
