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

//for game need it to generate a string of numbers from 1-5
//convert it to an index
//so it generates say 2 3 1 4 5
//and plays sounds 2, 3, 1, 4, 5 in that order
//and sends that series of numbers to arduino
//so while the sounds are playing, the lights next to the respective buttons turn on

//then the user repeats the sequence by pressing the buttons and plays the notes again
//which is the code below

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

//but im unsure how to go about having the computer check that the notes played are correct


//also my week will be very busy with writing 15pg of my thesis...
//so maybe if that grows to be too much this project gets scaled down into being a piano
//with some visuals on computer screen situation?
//or just doesn't have the game aspect of checking correct/incorrect