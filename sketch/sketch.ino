int pbutton0;
int pbutton1;
int pbutton2;
int pbutton3;
int pbutton4;

int LED0;

void setup() {
  Serial.begin(9600);
  pinMode(12, INPUT);
  pinMode(11, INPUT);
  pinMode(10, INPUT);
  pinMode(9, INPUT);
  pinMode(8, INPUT);

  pinMode(5, OUTPUT);

  pbutton0 = 0;
  pbutton1 = 0;
  pbutton2 = 0;
  pbutton3 = 0;
  pbutton4 = 0;
}

//NEED CODE TO RECEIVE THE mSequence ARRAY FROM P5
//AND THEN MAKE A FOR LOOP WHERE FOR THAT ARRAY IT LIGHTS UP THE RELEVANT LEDS

void loop() {
  int button0 = digitalRead(11);
  int button1 = digitalRead(10);
  int button2 = digitalRead(9);
  int button3 = digitalRead(8);
  int button4 = digitalRead(12);

  if (Serial.available() > 0) {
    String inString = Serial.readStringUntil('\n');
    inString.trim();

    int intVal = inString.toInt();
  }

  //add command like if intVal = 0 then led0 turns on (and make sure all other lights turn off) so its like all lights turn off then light 0 turns on

//ADD INTO THESE BUTTONS CODE TO LIGHT UP THE RELEVANT LEDS
  if (button0 == 1 && pbutton0 == 0) {
    Serial.println("0");
  }

  if (button1 == 1 && pbutton1 == 0) {
    Serial.println("1");
  }

  if (button2 == 1 && pbutton2 == 0) {
    Serial.println("2");
  }

  if (button3 == 1 && pbutton3 == 0) {
    Serial.println("3");
  }

  if (button4 == 1 && pbutton4 == 0) {
    Serial.println("4");
  }

  pbutton0 = button0;
  pbutton1 = button1;
  pbutton2 = button2;
  pbutton3 = button3;
  pbutton4 = button4;

  delay(2);
}