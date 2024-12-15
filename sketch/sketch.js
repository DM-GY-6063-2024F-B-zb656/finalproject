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

function preload() {
  //SOUNDS
  sound0 = loadSound("../assets/sound0.wav");
  sound1 = loadSound("../assets/sound1.wav");
  sound2 = loadSound("../assets/sound2.wav");
  sound3 = loadSound("../assets/sound3.wav");
  sound4 = loadSound("../assets/sound4.wav");
}

function sendSerial(sounds) {
  //SEND TO ARDUINO
  if (mSerial.opened()) {
    mSerial.write(sounds + "\n");
  }
}

function connectToSerial() {
  //CONNECT TO SERIAL AND CREATE GAME BUTTONS
  if (!mSerial.opened()) {
    mSerial.open(9600);
    connectButton.hide();
  }

  startGame = createButton("New Sound Pattern");
  startGame.position(width / 2 - startGame.width / 2, height / 8);
  startGame.mousePressed(createGameArray);

  resetGame = createButton("Restart");
  resetGame.position(width / 2 - resetGame.width / 2, height / 8 + 50);
  resetGame.mousePressed(restartGame);
}

function restartGame() {
  //REFRESH POINTS AND ARRAYS
  points = 0;
  mSequence.length = 0;
  mAnswer.length = 0;
}

function place0() {
  //ARRAY PLACE 0 SOUNDS
  if (mSequence[0] == 0) {
    sound0.play();
    sendSerial("0");
    sound0.onended(place1);
  } else if (mSequence[0] == 1) {
    sound1.play();
    sendSerial("1");
    sound1.onended(place1);
  } else if (mSequence[0] == 2) {
    sound2.play();
    sendSerial("2");
    sound2.onended(place1);
  } else if (mSequence[0] == 3) {
    sound3.play();
    sendSerial("3");
    sound3.onended(place1);
  } else if (mSequence[0] == 4) {
    sound4.play();
    sendSerial("4");
    sound4.onended(place1);
  }
}

function place1() {
  //ARRAY PLACE 1 SOUNDS
  if (mSequence[1] == 0) {
    sound0.play();
    sendSerial("0");
    sound0.onended(place2);
  } else if (mSequence[1] == 1) {
    sound1.play();
    sendSerial("1");
    sound1.onended(place2);
  } else if (mSequence[1] == 2) {
    sound2.play();
    sendSerial("2");
    sound2.onended(place2);
  } else if (mSequence[1] == 3) {
    sound3.play();
    sendSerial("3");
    sound3.onended(place2);
  } else if (mSequence[1] == 4) {
    sound4.play();
    sendSerial("4");
    sound4.onended(place2);
  }
}

function place2() {
  //ARRAY PLACE 2 SOUNDS
  if (mSequence[2] == 0) {
    sound0.play();
    sendSerial("0");
    sound0.onended(place3);
  } else if (mSequence[2] == 1) {
    sound1.play();
    sendSerial("1");
    sound1.onended(place3);
  } else if (mSequence[2] == 2) {
    sound2.play();
    sendSerial("2");
    sound2.onended(place3);
  } else if (mSequence[2] == 3) {
    sound3.play();
    sendSerial("3");
    sound3.onended(place3);
  } else if (mSequence[2] == 4) {
    sound4.play();
    sendSerial("4");
    sound4.onended(place3);
  }
}

function place3() {
  //ARRAY PLACE 3 SOUNDS
  if (mSequence[3] == 0) {
    sound0.play();
    sendSerial("0");
    sound0.onended(place4);
  } else if (mSequence[3] == 1) {
    sound1.play();
    sendSerial("1");
    sound1.onended(place4);
  } else if (mSequence[3] == 2) {
    sound2.play();
    sendSerial("2");
    sound2.onended(place4);
  } else if (mSequence[3] == 3) {
    sound3.play();
    sendSerial("3");
    sound3.onended(place4);
  } else if (mSequence[3] == 4) {
    sound4.play();
    sendSerial("4");
    sound4.onended(place4);
  }
}

function doNothing() {
  //STOP onended EFFECTS
}

function place4() {
  //ARRAY PLACE 4 SOUNDS
  sound0.onended(doNothing);
  sound1.onended(doNothing);
  sound2.onended(doNothing);
  sound3.onended(doNothing);
  sound4.onended(doNothing);

  if (mSequence[4] == 0) {
    sound0.play();
    sendSerial("0");
  } else if (mSequence[4] == 1) {
    sound1.play();
    sendSerial("1");
  } else if (mSequence[4] == 2) {
    sound2.play();
    sendSerial("2");
  } else if (mSequence[4] == 3) {
    sound3.play();
    sendSerial("3");
  } else if (mSequence[4] == 4) {
    sound4.play();
    sendSerial("4");
  }
}

function createGameArray() {
  //GENERATE SOUND SEQUENCE & BEGIN PLAYING
  for (let i = 0; i < 5; i++) {
    let randomNumber = random(["0", "1", "2", "3", "4"]);
    mSequence.push(randomNumber);
  }

  print(mSequence);
  place0();
}

function checkAnswer() {
  //CHECK PLAYER'S SEQUENCE, ADD/RESET POINTS
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
  connectButton.position(width / 2 - connectButton.width / 2, height / 4);
  connectButton.mousePressed(connectToSerial);

  points = 0;
}

function draw() {
  background(0);
  fill(255);

  //INSTRUCTIONS
  textSize(20);
  textAlign(LEFT, TOP);
  text("Instructions:", 50, 50);
  text("1. Press Connect to Serial to begin", 50, 70);
  text("2. Press New Sound Sequence for a sound pattern", 50, 90);
  text("3. Recreate the sound pattern with buttons on Arduino", 50, 110);
  text("4. Press Restart to reset points and sound patterns", 50, 130);
  text("Points reset if you fail to match the sound pattern", 50, 150);
  text("Use Chrome for game to run correctly", 50, 170);

  //POINT COUNTER
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Points:" + " " + points, width / 2, height / 2);

  //PLAY SOUNDS WHEN BUTTONS ARE PRESSED
  //SEND NUMBER INTO USER ANSWER ARRAY
  if (mSerial.opened() && mSerial.availableBytes() > 0) {
    mLine = mSerial.readUntil("\n");

    buttonVal = int(mLine);
    print(buttonVal);

    if (buttonVal == 0) {
      sound0.play();
      mAnswer.push("0");
    }

    if (buttonVal == 1) {
      sound1.play();
      mAnswer.push("1");
    }

    if (buttonVal == 2) {
      sound2.play();
      mAnswer.push("2");
    }

    if (buttonVal == 3) {
      sound3.play();
      mAnswer.push("3");
    }

    if (buttonVal == 4) {
      sound4.play();
      mAnswer.push("4");
    }

    print(mAnswer);
  }

  //CHECK ANSWERS AGAINST GAME SEQUENCE
  if (mAnswer.length == 5) {
    checkAnswer();
    startGame.show();
  }
}
