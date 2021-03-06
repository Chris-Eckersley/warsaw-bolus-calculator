import React, { useState} from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Input, Card, ListItem, Button } from 'react-native-elements';

export default function BolusCalculator(props) {
  const initialResultState = {
    totalInsulinDose: 0,
    normalBolus: 0,
    fpu: 0,
    fpuCarbEquivalent: 0,
    squareWaveBolus: 0,
    squareWaveDuration: 0
  };

  const [insulinToCarbRatio, setInsulinToCarbRatio] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [results, setResults] = useState(initialResultState);

  const handleReset = () => {
    setResults(initialResultState);
    setCarbs('');
    setFat('');
    setProtein('');
  };

  const handleCalculateBolus = () => {
    const fpu = (fat * 9 + protein * 4) / 100; // Fat & protien calories devided into 100 calorie units
    const normalBolus = carbs / insulinToCarbRatio;
    const fpuCarbEquivalent = (fpu * 8); // 1 FPU is equal to 8 carbs
    const squareWaveBolus = fpuCarbEquivalent / insulinToCarbRatio;
    const cu = carbs / 10; // carb units for formula
    const carbUnitPercent = cu / (cu + fpu);
    const totalInsulinDose = squareWaveBolus + normalBolus;


    setResults({
      fpu: Math.round(fpu * 10) / 10,
      totalInsulinDose: Math.round(totalInsulinDose * 10) / 10,
      normalBolus: Math.round(normalBolus * 10) / 10,
      squareWaveBolus: Math.round(squareWaveBolus * 10) / 10,
      fpuCarbEquivalent: Math.round(fpuCarbEquivalent * 10) / 10,
      squareWaveDuration: squareWaveDuration(fpu, carbUnitPercent)
    })

    function squareWaveDuration(fpu, cu_perc) {
      if (fpu < 1) {
        return 0;
      } else if (cu_perc > 0.8) {
        return 0;
      } else if (fpu >= 1 && fpu < 2) {
        return 3;
      } else if (fpu >= 2 && fpu < 3) {
        return 4;
      } else if (fpu >= 3 && fpu < 4) {
        return 5;
      } else if (fpu >= 4) {
        return 8;
      }
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Card
          title='Warsaw bolus calculator'
        >
          <Input
            label='Insulin to carb ratio'
            keyboardType='numeric'
            value={insulinToCarbRatio}
            onChangeText={text => setInsulinToCarbRatio(text)}
          />
          <Input
            label='Carbs'
            keyboardType='numeric'
            value={carbs}
            onChangeText={text => setCarbs(text)}
          />
          <Input
            label='Fat'
            keyboardType='numeric'
            value={fat}
            onChangeText={text => setFat(text)}
          />
          <Input
            label='Protein'
            keyboardType='numeric'
            value={protein}
            onChangeText={text => setProtein(text)}
          />
          <Button
            title="Calculate bolus"
            type="outline"
            onPress={handleCalculateBolus}
          />
          <Button
            title="Reset"
            type="outline"
            onPress={handleReset}
          />
        </Card>
        <Card title="Results">
          <ListItem
            title='Normal bolus'
            subtitle={results.normalBolus.toString() + ' units'}
            bottomDivider
          />
          <ListItem
            title='Square wave bolus'
            subtitle={results.squareWaveBolus.toString() + ' units'}
            bottomDivider
          />
          <ListItem
            title='Square wave bolus duration'
            subtitle={results.squareWaveDuration.toString() + ' hours'}
            bottomDivider
          />
          <ListItem
            title='Total insulin dose'
            subtitle={results.totalInsulinDose.toString() + ' units'}
            bottomDivider
          />
          <ListItem
            title='FPU carb equivalent'
            subtitle={results.fpuCarbEquivalent.toString() + ' grams'}
            bottomDivider
          />
          <ListItem
            title='FPU'
            subtitle={results.fpu.toString() + ' FPUs'}
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
    marginTop: Constants.statusBarHeight
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});