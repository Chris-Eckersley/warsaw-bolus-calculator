import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Card, ListItem } from 'react-native-elements';

import Fpce from './components/FpceCalc'

export default function App() {
  return (
    <View>
      <Fpce />
    </View>
  );
}
