export default class Controls{
  constructor(){
    window.addEventListener("keydown", e=>{
      console.log(e.keyCode);
      if (e.keyCode == 37)this.x = -1
      if (e.keyCode == 38) this.y = -1;
      if (e.keyCode == 39) this.x = 1;
      if (e.keyCode == 40) this.y = 1;
    });
    // window.addEventListener("keyup", e=>{
    //   console.log(e.keyCode);
    //   if (e.keyCode == 37)this.x = 0
    //   if (e.keyCode == 38) this.y = 0;
    //   if (e.keyCode == 39) this.x = 0;
    //   if (e.keyCode == 40) this.y = 0;
    // });
    this.x = 0;
    this.y = 0;
  }
  getAngle(){
    return Math.atan2(this.y, this.x);
  }
  update(){

  }
  render(){

  }
}
