var music, fft, amplitude, spectrum, fft2, spectrum2;
let angle = 0;
let w = 40;
let ma;
let maxD ;

function preload() {
  music = loadSound("assets/e.mp3");
}

function setup() {
  let cnv = createCanvas(400,400,WEBGL);
   cnv.mouseClicked(function() {
    if (music.isPlaying() ){
      music.pause();
    } else {
      music.play();
    }
  });

   ma = atan(1/sqrt(2));
   maxD = dist(0,0,200,200);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT(0,1024);
  fft2 = new p5.FFT();
  fft.setInput(music);
  fft2.setInput(music);

}

function draw() {
  background(0);
  ortho(-700,700,-700,700,0,1000);

  spectrum = fft.analyze();
  spectrum2 = fft2.analyze();
  ambientLight(130);
  pointLight(0, 0, 200,frameCount * 0.01, frameCount * 0.01, frameCount * 0.01);

//circle FFT
for (var n = 0; n< spectrum2.length; n++){
  let angle = map(n, 0, spectrum2.length, 0, 360 )
  let amp = spectrum2[n];
  let r = map(amp, 0, 200, 0, 800);
  let xx = r * cos(angle);
  let yy = r * sin(angle);
  push();
  translate(0,0,-(height/2));
  stroke('rgba(255,255,255,0.15)');
  line(0,0,xx,yy);
 pop();

  }

// cube FFT
 for (let j = 0; j< height-170; j +=w){
     for (let i = 0; i< width-170; i +=w){
      for (let y = 0; y< width-170; y +=w){


    push();
    let d = dist(i,j,width/2,height/2);
    let offset = map(d,0,maxD,-1,1);
    let a = angle+offset;
     let s =floor(map(sin(a), -1,1,0,100));
  let h = map((spectrum[i] + spectrum[j] + spectrum[y] ), 0, 255, height, 0);



  rotateX(frameCount * 0.01);
   rotateY(frameCount * 0.01);
  translate(i - width/2, y - height/2,   j - height/2);
  stroke(spectrum[y],spectrum[y],200);

  specularMaterial(spectrum[y],spectrum[y],200);


 if (music.isPlaying() ){
    box(w-5, h, s);
    box(h, s, w-5);
    box(s,w-5, h);

 }
else{
     box(w-5, h, w-5);
     box(h, w-5, w-5);
     box(w-5,w-5, h);
  }

  pop();

  }
 }
}

}

