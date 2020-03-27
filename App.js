import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Card, ListItem } from 'react-native-elements';

import Fpce from './components/FpceCalc'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0'
  }
});

export default function App() {
  return (
    <View style={styles.container}>
      <Fpce />
    </View>
  );
}