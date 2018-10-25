var music, fft, amplitude, spectrum, waveform;

function preload() {
  music = loadSound("assets/b.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  music.loop();

  amplitude = new p5.Amplitude();

  fft = new p5.FFT();
  fft.setInput(music);
}

function draw() {
  background(51);
  colorMode(HSB, 255, 255, 255, 255);
  spectrum = fft.analyze();
  waveform = fft.waveform();
  strokeWeight(1);
  var x = map(waveform[0], -1, 1, width / 1, width / 1.25);
  var y = map(0, 0, waveform.length, 0, height);
  for (var i = 0; i < waveform.length; i++) {
    var px = x;
    var py = y;
    var x = map(waveform[i], -1, 1, width / 1, width / 1.25);
    var y = map(i, 0, waveform.length, 0, height);
    stroke(map(waveform[i], -1, 1, 0, 255), 200, 255);
    line(x, y, px, py);
  }
  var av = 0;
  for (var i = 0; i < spectrum.length; i++) {
    strokeWeight((width / spectrum.length) * 2);
    stroke(spectrum[i], 200, 255);
    var x = map(i, 0, spectrum.length, 0, width);
    var y = map(spectrum[i], 0, 255, 0, height / 2);
    av += spectrum[i];
    line(x, (height / 2) + y, x, (height / 2) - y);
  }
  av /= spectrum.length;

  // push();
  // fill(av, 200, 255);
  // noStroke();
  // translate(width / 1.25, height / 2);
  // ellipse(0, 0, map(av, 0, 255, 0, 500) / 2);
  // pop();

  for (var i = 0; i < spectrum.length; i++) {
    push();
    stroke(av, 200, 255);
    translate(width / 1.25, height / 4);
    rotate(map(i, 0, spectrum.length, 0, TWO_PI));
    var h = map(spectrum[i], 0, 255, 0, height / 16);

    line(0, (height / 8) - h, 0, (height / 8) + h);
    pop();
  }
  colorMode(RGB, 255, 255, 255, 255);
}