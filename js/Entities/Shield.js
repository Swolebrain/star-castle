import ShieldSection from './ShieldSection';
import Entity from './Entity';

var numSections = 0;
export default class Shield extends Entity{
  //speed is in degrees per second
  constructor(radius, speed){
    super();
    this.radius = radius;
    console.log(this.radius);
    this.shieldSections = [ new ShieldSection(0, Math.PI*2, radius)];
    numSections++;
    this.rotationOffset = 0;
    this.rotationSpeed = speed * Math.PI/180;
    this.destructionRadians = (200/radius) * Math.PI/4;
    //setInterval(()=>console.log(this.shieldSections),2000);
  }
  update(dt, projectiles){
    this.rotationOffset += this.rotationSpeed*dt;
    if (this.rotationOffset > Math.PI*2) this.rotationOffset = 0;
    if (this.shieldSections.length == 0){
      this.shieldSections.push(new ShieldSection(0, Math.PI*2, this.radius*1.2));
      this.radius = this.radius*1.2;
    }
  }
  render(ctx){
    // console.log(this.rotationOffset);
    this.shieldSections.forEach(section=>section.render(ctx, this.rotationOffset));
    ctx.save();
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    ctx.rotate(this.rotationOffset);
    ctx.fillRect(-1, -10, 2, 20);
    ctx.fillStyle = "red";
    ctx.fillRect(-1, -10, 2, 2);
    ctx.restore();
  }
  sections(){
    return this.shieldSections;
  }
  checkAndProcessCollision(projectile){
    let projectilePolarAngle = projectile.getPolarAngle();
    let projectileCanvasAngle = projectilePolarAngle;
    // let projectileCanvasAngle = -projectilePolarAngle;
    // if (projectilePolarAngle > 0){
    //   projectileCanvasAngle = Math.PI + (Math.PI - projectilePolarAngle);
    // }
    let collidedWithASection = false;
    for (var ssNum = 0; ssNum < this.shieldSections.length; ssNum++){
      let ss = this.shieldSections[ssNum];
      let ctr = 0;
      while (ctr < 2) {
        if (projectileCanvasAngle+(ctr*Math.PI*2) > this.rotationOffset + ss.startAngle &&
        projectileCanvasAngle+(ctr*Math.PI*2) < this.rotationOffset + ss.startAngle + ss.arcRadians){
          collidedWithASection = true;
          console.log("hit shield section number "+ssNum);
          this.processCollision(ssNum, projectileCanvasAngle-this.rotationOffset);
          break;
        }
        else{
          // console.log(`Failed angle test, projectile angle ${projectileCanvasAngle} not between
          //   ${this.rotationOffset + ss.startAngle} and ${this.rotationOffset + ss.startAngle + ss.arcRadians}`);
        }
        if (collidedWithASection) break;

        ctr++;
      }


    }
    return collidedWithASection;
  }
  processCollision(ssNum, prjAngle){
    let ss = this.shieldSections[ssNum];
    if (this.destructionRadians > .95*ss.arcRadians){
      this.shieldSections.splice(ssNum,1);
      return;
    }
    if (prjAngle <  ss.startAngle + this.destructionRadians/2){
      //ss.startAngle += this.destructionRadians;
      //ss.startAngle = ss.startAngle % (Math.PI*2)
      ss.arcRadians -= this.destructionRadians;
      console.log("breaking shield from the start");

    }
    else if (prjAngle >  ss.startAngle + ss.arcRadians - this.destructionRadians/2){
      ss.arcRadians -= this.destructionRadians;
      console.log("breaking shield at end");
    }
    else{
      console.log("breaking shield in half");
      let newSectionEndAngle = ss.startAngle + ss.arcRadians;
      let newSectionStartAngle = prjAngle + this.destructionRadians/2;
      let newSectionArcRadius = newSectionEndAngle - newSectionStartAngle;
      if (newSectionStartAngle > 2*Math.PI) newSectionStartAngle %= (2*Math.PI);
      let newSection = new ShieldSection(newSectionStartAngle,
                                newSectionArcRadius,
                              this.radius  ); //+ (numSections++)*5
      if (newSection.arcRadians > 0)
        this.shieldSections.push(newSection);

      let oldSectionEndAngle = prjAngle - this.destructionRadians/2;
      ss.arcRadians = oldSectionEndAngle - ss.startAngle;
      // let oldSectionStart = oldSectionEndAngle - ss.arcRadians;
      // ss.startAngle = oldSectionStart;
      if (ss.arcRadians < 0.1){
        this.shieldSections.splice(ssNum,1);
      }
    }
    console.log(this.shieldSections);
  }
}
