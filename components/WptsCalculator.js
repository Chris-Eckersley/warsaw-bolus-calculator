import React, { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, SafeAreaView, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { Input, Card, ListItem, Button } from 'react-native-elements';

export default function WptsCalculator(props) {
  const [fatGrams, setFatGrams] = useState();
  const handleFatGramChange = text => {
    setFatGrams(text);
  }

  const [proteinGrams, setProteinGrams] = useState();
  const handleProteinGramChange = text => {
    setProteinGrams(text);
  }

  const [carbGrams, setCarbGrams] = useState();
  const handleCarbGramChange = text => {
    setCarbGrams(text);
  };

  const [insulinRatio, setInsulinRatio] = useState();
  const handleIrChange = text => {
    setInsulinRatio(text);
  };

  const initResults = {
    fpu: 0,
    cu: 0,
    totalInsulinDose: 0,
    normalBolus: 0,
    squareWaveBolus: 0,
    squareWaveDuration: 0,
  };

  const [calcResults, setCalcResults] = useState(initResults)
  const handleCalcWpts = () => {
    
    const fpu = ((proteinGrams * 4.0) + (fatGrams * 9)) / 100;
    const cu = carbGrams / 10;
    const cuPercent = 100 * (cu / (cu + fpu));
    const calcNormBolus = function (cu, cu_percent, ir) {
      if (cu_percent < 20) {
        return 0;
      } else if (cu_percent >= 20 && cu_percent <= 80) {
        return cu * ir;
      } else if (cu_percent > 80) {
        return cu * ir;
      }
    }

    const squareWaveBolusCalc = function (cu_percent, fpu, ir) {
      if (fpu < 1) {
        return 0;
      } else if (cu_percent < 20) {
        return fpu * ir;
      } else if (cu_percent >= 20 && cu_percent <= 80) {
        // For some reason extra correction is needed when 
        return fpu * ir; // # * (1 + correction)
      }
    }

    const calcSquareWaveTime = function (fpu, cu_percent) {
      if (fpu < 1) {
        return 0;
      } else if (cu_percent > 80) {
        return 0;
      } else if (fpu >= 1 && fpu < 2) {
        return 3;
      } else if (cu_percent >= 2 && cu_percent < 3) {
        return 4;
      } else if (cu_percent >= 3 && cu_percent < 4) {
        return 5;
      } else if (cu_percent >= 4) {
        return 8;
      }
    }

    function functioncalcCdi(cu, fpu, ir) {
      return (cu + fpu) * ir;
    }

    setCalcResults({
      fpu,
      cu,
      totalInsulinDose: functioncalcCdi(cu, fpu, insulinRatio),
      normalBolus: calcNormBolus(cu, cuPercent, insulinRatio),
      squareWaveBolus: squareWaveBolusCalc(cuPercent, fpu, insulinRatio),
      squareWaveDuration: calcSquareWaveTime(fpu, cuPercent)
    });
  }

  const handleCalcReset = () => {
    setFatGrams();
    setProteinGrams();
    setCarbGrams();
    setCalcResults(initResults)
    setInsulinRatio();
  }




  return (
    <SafeAreaView>
      <ScrollView>
        <Card title="Warsaw Insulin Pump Calculator">
          <Input
            label='Insulin Ratio'
            keyboardType='numeric'
            value={insulinRatio}
            onChangeText={handleIrChange}
          />
          <Input
            label='Fat grams'
            onChangeText={handleFatGramChange}
            keyboardType='numeric'
            value={fatGrams}
          />
          <Input
            label='Protein grams'
            onChangeText={handleProteinGramChange}
            keyboardType='numeric'
            value={proteinGrams}
          />
          <Input
            label='Carbohydrate grams'
            onChangeText={handleCarbGramChange}
            keyboardType='numeric'
            value={carbGrams}
          />
          <Button
            title="Calculate bolus"
            type="outline"
            onPress={handleCalcWpts}
          />
          <Button
            title="Reset"
            type="outline"
            onPress={handleCalcReset}
          />
        </Card>
        <Card title="Results">
          <ListItem
            title='Total insulin dose (CDI):'
            subtitle={calcResults.totalInsulinDose + ' units'}
            bottomDivider
          />
          <ListItem
            title='Normal Bolus dose:'
            subtitle={calcResults.normalBolus + ' units'}
            bottomDivider
          />
          <ListItem
            title='Square Wave Bolus dose:'
            subtitle={calcResults.squareWaveBolus + ' units'}
            bottomDivider
          />
          <ListItem
            title='Square Wave Bolus Duration:'
            subtitle={calcResults.squareWaveDuration + ' hours'}
            bottomDivider
          />
          <ListItem
            title='FPU:'
            subtitle={calcResults.fpu.toString()}
            bottomDivider
          />
          <ListItem
            title='CU:'
            subtitle={calcResults.cu.toString()}
            bottomDivider
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});