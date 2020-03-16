import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Card, ListItem } from 'react-native-elements';

import WptsCalc from './components/WptsCalculator';

export default function App() {


  return (
    <View>
      <WptsCalc />
    </View>
  );
}
