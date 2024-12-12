// Using: ArduinoJson by Benoit Blanchon
// v6.21.5
#include <ArduinoJson.h>

int pbutton0;
int pbutton1;
int pbutton2;
int pbutton3;
int pbutton4;

int LED0;

void receiveData(const char* jsonText) {
    StaticJsonDocument<128> resJson;
    DeserializationError error = deserializeJson(resJson, jsonText);

    if (error) {
        Serial.println(F("deserializeJson() failed: "));
        Serial.println(error.f_str());
        return;
    }

    int s0 = resJson["data"]["s0"];
    int s1 = resJson["data"]["s1"];
    int s2 = resJson["data"]["s2"];
    int s3 = resJson["data"]["s3"];
    int s4 = resJson["data"]["s4"];

    int mSequence[5] = {s0, s1, s2, s3, s4};

    for(int i = 0; i < 4; i++) {
        Serial.println(mSequence[i]);
    }
}

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
  int button0 = digitalRead(12);
  int button1 = digitalRead(11);
  int button2 = digitalRead(10);
  int button3 = digitalRead(9);
  int button4 = digitalRead(8);

  if (Serial.available() > 0) {
    String jsonText = Serial.readStringUntil('\n');
    receiveData(jsonText.c_str());
  }

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