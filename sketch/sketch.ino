int pbutton1;
int pbutton2;

void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT);
  pinMode(5, INPUT);

  pbutton1 = 0;
  pbutton2 = 0;
}

void loop() {
  int button1 = digitalRead(2);
  int button2 = digitalRead(5);

  if (button1 == 1 && pbutton1 == 0) {
    Serial.println("1");
  }

  if (button2 == 1 && pbutton2 == 0) {
    Serial.println("2");
  }

  pbutton1 = button1;
  pbutton2 = button2;

  delay(2);
}