import React, { useState, useEffect } from 'react';
import { Overlay, Text, Card, Button } from 'react-native-elements';
import { AsyncStorage } from 'react-native';

export default function DisclaimerOverlay() {
  const [termsAccepted, setTermsAccepted] = useState(true);

  const getStorage = async () => {
    const state = await AsyncStorage.getItem('TERMS_ACCEPTED');
    if (state == 'true') {
      setTermsAccepted(true);
    } else {
      setTermsAccepted(false)
    }
  };

  useEffect(() => {
    getStorage();
  });

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    AsyncStorage.setItem('TERMS_ACCEPTED', 'true');
  };

  if (termsAccepted !== true) {
    return (
      <Overlay isVisible={true}>
        <Card title='Disclaimer'>
          <Text>Warning - Consult your healthcare provider and diabetic educator before using this app to make treatment decissions.</Text>
          <Text>By click "Accept terms" you take all responsibility of using this app.</Text>
          <Button
          title="Accept terms"
          onPress={handleAcceptTerms}
          />
        </Card>
      </Overlay>
    );
  }
  return (
    <React.Fragment/>
  );
}

