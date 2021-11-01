# OTP_AUTO_READ
This is a demo project to auto read OTP in react native.
We are using this library to read message without asking any new permission -> https://github.com/faizalshap/react-native-otp-verify
This library internaly using the google SMS Retrieval API to verify message in android. 



In order to detect the message, SMS message must include a hash(11 character) that identifies your app. This hash can be obtained by using the getHash() method.
message structure should be like this and be no longer than 140 bytes -> 

1234 is your ExampleApp verfication code. ebcdfxaseza


To generate hash string using app's keystore and alias use this link https://developers.google.com/identity/sms-retriever/verify


As of now we are using this library for OTP view https://github.com/tttstudios/react-native-otp-input.
