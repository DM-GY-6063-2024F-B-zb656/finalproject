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

function preload() {
  sound0 = loadSound("../assets/sound0.wav");
  sound1 = loadSound("../assets/sound1.wav");
  sound2 = loadSound("../assets/sound2.wav");
  sound3 = loadSound("../assets/sound3.wav");
  sound4 = loadSound("../assets/sound4.wav");
}

function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600);
    connectButton.hide();
  }
}

//TO DO: NEED CODE TO SEND THIS ARRAY TO ARDUINO
function createGameArray() {
  //GENERATES RANDOM NUMBERS FOR ARRAY
  for (let i = 0; i < 5; i++) {
    let randomNumber = random(['0', '1', '2', '3', '4']);
    mSequence.push(randomNumber);
  }

  print(mSequence);

  //PLAY SOUNDS
  for (let idx = 0; idx < mSequence.length; idx++) {
    if (mSequence[idx] == 0) {
      sound0.play();
    }

    if (mSequence[idx] == 1) {
      sound1.play();
    }

    if (mSequence[idx] == 2) {
      sound2.play();
    }

    if (mSequence[idx] == 3) {
      sound3.play();
    }

    if (mSequence[idx] == 4) {
      sound4.play();
    }
    //SHOULD THIS BE IN HERE OR IN DRAW?
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  mSerial = createSerial();
  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2, height / 2);
  connectButton.mousePressed(connectToSerial);

  //GENERATE RANDOM SEQUENCE
  createGameArray();
}

//so while the sounds are playing, the lights next to the respective buttons turn on
//i think a for loop? so you have the randomly generated numbers in an index, then the for loop
//plays each note for each number and sends signal to arduino to light up the LEDs
//or just have something in the code permanently that says when this sound plays then this light lights up

//and then in arduino when a button is pressed it plays the sound and adds the number to a second index
//and that index is checked to see if its the same index as the first index. if it is a point is added 
//and then no matter if its correct or not
//the indexes are cleared and the first index has new random numbers in it.
//i believe you clear an array by saying [arrayname].length = 0.


// function createUserArray() {
//   //similar to above array but its filled in by the numbers returned by arduino
//   //or should this go in the if buttonval = part where if that button is pushed
//   //that number is added to the user array
//   //and if the user array reaches over a length of 5
//   //then the answer is checked and the length is reset to 0. yeah?
// }

function draw() {
  background(0);
  
  if (mSerial.opened() && mSerial.availableBytes() > 0) {
  let mLine = mSerial.readUntil("\n"); //i think i can delete the let here
  // print(mLine);

  let buttonVal = int(mLine); //i think i can delete the let here
  print(buttonVal);

  //CAN ALL OF THIS BE MADE INTO A CLASS? LEAVE THAT TIL LAST TO SEE IF IT WORKS
  if (buttonVal == 0) {
    sound0.play();
    mAnswer.push('0'); //should it be quotes or not?
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



  //code to say if [sound] is playing send signal to arduino to turn on [LED]
  //would this go somewhere else because its sending signal rather than receiving?
  }
}

//but im unsure how to go about having the computer check that the notes played are correct


//also my week will be very busy with writing 15pg of my thesis...
//so maybe if that grows to be too much this project gets scaled down into being a piano
//with some visuals on computer screen situation?
//or just doesn't have the game aspect of checking correct/incorrect