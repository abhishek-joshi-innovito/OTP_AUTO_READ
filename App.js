import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Keyboard} from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const App = () => {

  const [otpCode, setOtpCode] = useState();
  const otpView = useRef();
  useEffect(() => {
    RNOtpVerify.getHash()
      .then(hash => {
        console.log(hash);
      })
      .catch(error => {
        console.log(error);
      });

    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(otpHandler))
      .catch(p => console.log(p));

    setTimeout(() => {
      otpView?.current?.focusField(0);
    }, 500);

    return () => {
      RNOtpVerify.removeListener();
    };
  }, []);

  const otpHandler = message => {
    if(message){
      const otp = /(\d{4})/g.exec(message)[1];
      console.log('message ', message, otp);
      setOtpCode(otp);
      Keyboard.dismiss();
    }
  
    
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>AutoFill Demo</Text>
      <OTPInputView
        ref={input => (otpView.current = input)}
        style={{width: '60%', height: 200}}
        pinCount={4}
        code={otpCode} 
        //onCodeChanged = {code => { setOtpCode({code})}}
        autoFocusOnLoad={false}
        keyboardAppearance={'default'}
        keyboardType={'number-pad'}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color:'blue'
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
    color:'blue'
  },
});

export default App;
