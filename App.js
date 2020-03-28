import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Card, ListItem } from 'react-native-elements';
import { Header } from 'react-native-elements';

import Fpce from './components/FpceCalc';
import DisclaimerOverlay from './components/DisclaimerOverlay';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0'
  }
});

export default function App() {
  return (
      <React.Fragment>
        <Header
          placement='left'
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'LOW CARB BOLUS CALCULATOR', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          >
        </Header>
        <View style={styles.container}>
          <Fpce />
        </View>
        <DisclaimerOverlay />
      </React.Fragment>
  );
}