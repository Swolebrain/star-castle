export default class TouchControls{
  constructor(action, color){
    //this property is for keeping track of the touch id of the left stick
    this.leftStickTouchID = null;
    this.leftStickAnchor = null;
    this.leftStickPosition = null;
    this.color = color || 'cyan';
    if (!'createTouch' in document) return;
    window.addEventListener( 'touchstart', this.onTouchStart, false );
  	window.addEventListener( 'touchmove', this.onTouchMove, false );
  	window.addEventListener( 'touchend', this.onTouchEnd, false );
    this.circleDimensions = Math.round(Math.max(window.innerWidth * 0.06, window.innerHeight * 0.06));
    this.lastAngle = 0;
    this.actionButton = action;
  }
  onTouchStart = e=>{
    Array.prototype.forEach.call(e.changedTouches, touch=>{
      //console.log(touch.clientX < window.innerWidth/2);
      if (this.leftStickTouchID == null && touch.clientX < window.innerWidth/2){
        this.leftStickTouchID = touch.identifier;
        //console.log(this.leftStickTouchID);
        this.leftStickAnchor = {x:touch.clientX, y: touch.clientY};
        this.leftStickPosition = {x:touch.clientX, y: touch.clientY};
      }
      else {
        //console.log("tappy?");
        this.actionButton();
      }
    });
  }
  onTouchMove = e=>{

    if (this.leftStickTouchID == null) return;
    Array.prototype.forEach.call(e.changedTouches, touch=>{
      if (touch.identifier != this.leftStickTouchID) return;
      this.leftStickPosition = {x:touch.clientX, y: touch.clientY};
      this.lastAngle = Math.atan2(this.leftStickPosition.y-this.leftStickAnchor.y,
                        this.leftStickPosition.x-this.leftStickAnchor.x);
    });
  }
  onTouchEnd = e=>{
    Array.prototype.forEach.call(e.changedTouches, touch=>{
      if (touch.identifier == this.leftStickTouchID){
        this.leftStickTouchID = null;
        this.leftStickAnchor = null;
        this.leftStickPosition = null;
      }
    });
  }
  getAngle(){
    return this.lastAngle;
  }
  update(){

  }
  render(ctx){
    if (this.leftStickTouchID == null) return;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    //draw big circle anchor
    ctx.ellipse(this.leftStickAnchor.x, this.leftStickAnchor.y, this.circleDimensions, this.circleDimensions, 0, 0, Math.PI*2);
    //draw little circle anchor
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.ellipse(this.leftStickPosition.x, this.leftStickPosition.y, this.circleDimensions*0.6, this.circleDimensions*0.6, 0, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

  }
}
