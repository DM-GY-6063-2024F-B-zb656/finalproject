int pbutton0;
int pbutton1;
int pbutton2;
int pbutton3;
int pbutton4;

int LED0 = 6;
int LED1 = 5;
int LED2 = 4;
int LED3 = 3;
int LED4 = 2;

void setup() {
  Serial.begin(9600);
  pinMode(12, INPUT);
  pinMode(11, INPUT);
  pinMode(10, INPUT);
  pinMode(9, INPUT);
  pinMode(8, INPUT);

  pinMode(6, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(2, OUTPUT);

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

    if (intVal == 0) {
      digitalWrite(LED0, HIGH);
      digitalWrite(LED1, LOW);
      digitalWrite(LED2, LOW);
      digitalWrite(LED3, LOW);
      digitalWrite(LED4, LOW);
    }

    if (intVal == 1) {
      digitalWrite(LED0, LOW);
      digitalWrite(LED1, HIGH);
      digitalWrite(LED2, LOW);
      digitalWrite(LED3, LOW);
      digitalWrite(LED4, LOW);
    }

    if (intVal == 2) {
      digitalWrite(LED0, LOW);
      digitalWrite(LED1, LOW);
      digitalWrite(LED2, HIGH);
      digitalWrite(LED3, LOW);
      digitalWrite(LED4, LOW);
    }

    if (intVal == 3) {
      digitalWrite(LED0, LOW);
      digitalWrite(LED1, LOW);
      digitalWrite(LED2, LOW);
      digitalWrite(LED3, HIGH);
      digitalWrite(LED4, LOW);
    }

    if (intVal == 4) {
      digitalWrite(LED0, LOW);
      digitalWrite(LED1, LOW);
      digitalWrite(LED2, LOW);
      digitalWrite(LED3, LOW);
      digitalWrite(LED4, HIGH);
    }

    // if (intVal == 5) {
    //   digitalWrite(LED0, LOW);
    //   digitalWrite(LED1, LOW);
    //   digitalWrite(LED2, LOW);
    //   digitalWrite(LED3, LOW);
    //   digitalWrite(LED4, LOW);
    // }
  }

//ADD INTO THESE BUTTONS CODE TO LIGHT UP THE RELEVANT LEDS
  if (button0 == 1 && pbutton0 == 0) {
    Serial.println("0");
    digitalWrite(LED0, HIGH);
  }

  if (button1 == 1 && pbutton1 == 0) {
    Serial.println("1");
    digitalWrite(LED1, HIGH);
  }

  if (button2 == 1 && pbutton2 == 0) {
    Serial.println("2");
    digitalWrite(LED2, HIGH);
  }

  if (button3 == 1 && pbutton3 == 0) {
    Serial.println("3");
    digitalWrite(LED3, HIGH);
  }

  if (button4 == 1 && pbutton4 == 0) {
    Serial.println("4");
    digitalWrite(LED4, HIGH);
  }

  pbutton0 = button0;
  pbutton1 = button1;
  pbutton2 = button2;
  pbutton3 = button3;
  pbutton4 = button4;

  delay(2);
}