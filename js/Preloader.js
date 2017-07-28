export default function(){
  return new Promise( (resolve, reject)=>{
    const imageUrls = [
      'assets/img/ship_sm.png',
      'assets/img/flame_sm.png',
      'assets/img/cannon-sm.png'
    ];
    let numLoaded = 0;
    const imgLoadHandler = ()=>{
      numLoaded++;
      if (numLoaded === imageUrls.length){
        resolve(images);
      }
    }
    const images = {};
    imageUrls.forEach((uri,idx)=>{
      let img = new Image();
      img.src = imageUrls[idx];
      img.onload = imgLoadHandler;
      images[uri] = img;
    });
  });
}
