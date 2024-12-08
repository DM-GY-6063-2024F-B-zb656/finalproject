let mSerial;
let connectButton;

let sound1;
let sound2;
let sound3;
let sound4;
let sound5;

let mLine;
let buttonVal;

function preload() {
  sound1 = loadSound("../assets/sound1.wav");
  sound2 = loadSound("../assets/sound2.wav");
  sound3 = loadSound("../assets/sound3.wav");
  sound4 = loadSound("../assets/sound4.wav");
  sound5 = loadSound("../assets/sound5.wav");
}

function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600);
    connectButton.hide();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  mSerial = createSerial();

  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2, height / 2);
  connectButton.mousePressed(connectToSerial);
}

function draw() {
  background(0);
  
  if (mSerial.opened() && mSerial.availableBytes() > 0) {
  let mLine = mSerial.readUntil("\n");
  // print(mLine);

  let buttonVal = int(mLine);
  print(buttonVal);

  if (buttonVal == 1) {
    sound1.play();
  }

  if (buttonVal == 2) {
    sound2.play();
  }

  if (buttonVal == 3) {
    sound3.play();
  }

  if (buttonVal == 4) {
    sound4.play();
  }

  if (buttonVal == 5) {
    sound5.play();
  }
  }
}


// im sure i could figure out (if i added lights to arduino)
//how to make it send signal to the arduino to turn on specific lights
//and play notes on the computer as that was happening

//but im not sure how to go about the game aspect of checking if the notes played are correct