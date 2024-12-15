let mSerial;
let connectButton;

let sound0;
let sound1;
let sound2;
let sound3;
let sound4;

let mLine;
let buttonVal;

let mSequence = [];
let mAnswer = [];

let points;

function preload() { //SOUNDS
  sound0 = loadSound("../assets/sound0.wav");
  sound1 = loadSound("../assets/sound1.wav");
  sound2 = loadSound("../assets/sound2.wav");
  sound3 = loadSound("../assets/sound3.wav");
  sound4 = loadSound("../assets/sound4.wav");
}

function sendSerial(sounds) {
  if (mSerial.opened()) {
    mSerial.write(sounds + "\n");
  }
}

function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600);
    connectButton.hide();

    startGame = createButton("Start the Game");
    startGame.position(width/2, height/4);
    startGame.mousePressed(createGameArray);
  }
}

//send # of sound to arduino when sound plays
function place0() {
  if (mSequence[0] == 0) {
    sound0.play();
    sendSerial(0);
    sound0.onended(place1);
  } else if (mSequence[0] == 1) {
    sound1.play();
    sound1.onended(place1);
  } else if (mSequence[0] == 2) {
    sound2.play();
    sound2.onended(place1);
  } else if (mSequence[0] == 3) {
    sound3.play();
    sound3.onended(place1);
  } else if (mSequence[0] == 4) {
    sound4.play();
    sound4.onended(place1);
  }
}

function place1() {
  if (mSequence[1] == 0) {
    sound0.play();
    sound0.onended(place2);
  } else if (mSequence[1] == 1) {
    sound1.play();
    sound1.onended(place2);
  } else if (mSequence[1] == 2) {
    sound2.play();
    sound2.onended(place2);
  } else if (mSequence[1] == 3) {
    sound3.play();
    sound3.onended(place2);
  } else if (mSequence[1] == 4) {
    sound4.play();
    sound4.onended(place2);
  }
}

function place2() {
  if (mSequence[2] == 0) {
    sound0.play();
    sound0.onended(place3);
  } else if (mSequence[2] == 1) {
    sound1.play();
    sound1.onended(place3);
  } else if (mSequence[2] == 2) {
    sound2.play();
    sound2.onended(place3);
  } else if (mSequence[2] == 3) {
    sound3.play();
    sound3.onended(place3);
  } else if (mSequence[2] == 4) {
    sound4.play();
    sound4.onended(place3);
  }
}

function place3() {
  if (mSequence[3] == 0) {
    sound0.play();
    sound0.onended(place4);
  } else if (mSequence[3] == 1) {
    sound1.play();
    sound1.onended(place4);
  } else if (mSequence[3] == 2) {
    sound2.play();
    sound2.onended(place4);
  } else if (mSequence[3] == 3) {
    sound3.play();
    sound3.onended(place4);
  } else if (mSequence[3] == 4) {
    sound4.play();
    sound4.onended(place4);
  }
}

function doNothing() {

}

function place4() {
  sound0.onended(doNothing);
  sound1.onended(doNothing);
  sound2.onended(doNothing);
  sound3.onended(doNothing);
  sound4.onended(doNothing);

  if (mSequence[4] == 0) {
    sound0.play();
  } else if (mSequence[4] == 1) {
    sound1.play();
  } else if (mSequence[4] == 2) {
    sound2.play();
  } else if (mSequence[4] == 3) {
    sound3.play();
  } else if (mSequence[4] == 4) {
    sound4.play();
  }
}

//TO DO: NEED CODE TO SEND THIS ARRAY TO ARDUINO
function createGameArray() { //generates random sequence for sounds
  startGame.hide();

  resetGame = createButton("Restart");
  resetGame.position(200, 100);
  resetGame.mousePressed(setup);
  
  for (let i = 0; i < 5; i++) {
    let randomNumber = random(['0', '1', '2', '3', '4']);
    mSequence.push(randomNumber);
  }

  print(mSequence);
  // sendSerial({data: { s0: mSequence[0], s1: mSequence[1], s2: mSequence[2], s3: mSequence[3], s4: mSequence[4]}});

  place0();

  // for (let idx = 0; idx < mSequence.length; idx++) {
  //   if (mSequence[idx] == 0) {
  //     sound0.play();
  //   } else if (mSequence[idx] == 1) {
  //     sound1.play();
  //   } else if (mSequence[idx] == 2) {
  //     sound2.play();
  //   } else if (mSequence[idx] == 3) {
  //     sound3.play();
  //   } else if (mSequence[idx] == 4) {
  //     sound4.play();
  //   }
  // }
}

function checkAnswer() {
  let mSequenceString = mSequence.toString();
  let mAnswerString = mAnswer.toString();

  if (mSequenceString == mAnswerString) {
    points++;
    mSequence.length = 0;
    mAnswer.length = 0;
  } else {
    points = 0;
    mSequence.length = 0;
    mAnswer.length = 0;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  mSerial = createSerial();
  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2, height / 2);
  connectButton.mousePressed(connectToSerial);  

  points = 0;
}

function draw() {
  background(0);
  fill(255);
  textSize(50);
  text("Points:" + " " + points, width/3, height/2);
  
  if (mSerial.opened() && mSerial.availableBytes() > 0) {
  mLine = mSerial.readUntil("\n");

  buttonVal = int(mLine);
  print(buttonVal);

  //CAN ALL OF THIS BE MADE INTO A CLASS? LEAVE THAT TIL LAST TO SEE IF IT WORKS
  //okay if you take this out of the if statement it just repeats forever and forever.
  //but you might be able to make it a function?
  if (buttonVal == 0) {
    sound0.play();
    mAnswer.push('0');
  }

  if (buttonVal == 1) {
    sound1.play();
    mAnswer.push('1');
  }

  if (buttonVal == 2) {
    sound2.play();
    mAnswer.push('2');
  }

  if (buttonVal == 3) {
    sound3.play();
    mAnswer.push('3');
  }

  if (buttonVal == 4) {
    sound4.play();
    mAnswer.push('4');
  }

  print(mAnswer);
  }

  //code to say if [sound] is playing send signal to arduino to turn on [LED]
  //would this go somewhere else because its sending signal rather than receiving?

  if (mAnswer.length == 5) {
    checkAnswer();
    startGame.show();
  }
}