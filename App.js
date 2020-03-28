import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Fpce from './screens/FpceCalc';
import WarsawInfoScreen from './screens/WarsawMethodInfo';
import DisclaimerOverlay from './components/DisclaimerOverlay';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0'
  }
});

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Fpce />
    </View>
  )
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Info" component={WarsawInfoScreen} />
    </Tab.Navigator>
  );
}

function App() {
  
  return (
    <React.Fragment>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
      <DisclaimerOverlay />
    </React.Fragment>
  );
}

export default App;
