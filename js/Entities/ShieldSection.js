import Entity from './Entity';

export default class ShieldSection extends Entity{
  constructor(startAngle, arcRadians, radius){
    super();
    if (startAngle > 2*Math.PI){
      console.log("#########################alert: creating too big of a start angle");
    }
    this.startAngle = startAngle%(2*Math.PI);
    this.arcRadians = arcRadians;
    this.centerX = window.innerWidth/2;
    this.centerY = window.innerHeight/2;
    this.radius = radius;
  }
  render(ctx, offset){
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY,
                this.radius,
                this.startAngle+offset, this.startAngle+this.arcRadians+offset);

    ctx.stroke();
    ctx.closePath();
  }
}
