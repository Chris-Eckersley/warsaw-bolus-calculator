import React from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView, Linking } from 'react-native';
import { Card } from 'react-native-elements';
import Constants from 'expo-constants';

export default function WarsawInfo({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <Card>
          <Text style={{color: 'red'}}>
            CONSULT WITH YOUR HEALTH CARE PROVIDER BEFORE MAKING NEW TREATMENT DESCISIONS!!! To reduce risk of low blood glucose levels work with your health care provider to determine a safe insulin dose.
            {'\n'}
          </Text>
          <Text>
            The Warsaw Pump Therapy School has created an algorithm for estimating the insulin dose and duration needed to cover the effects of protien and fat on blood glucose levels. This is limited to pump users.
            {'\n'}
            {'\n'}
            Basic formula:
            {'\n'}
            FPU = ([fat_grams * 9_calories] + [protien_grams * 4_calories])/100_calories
            {'\n'}
            {'\n'}
            1 FPU is equal to 8 grams of carbs spread out over time T.
            {'\n'}
            {'\n'}
            Notes:
            {'\n'}
            1) Insulin for fat and protien should NOT be given as a normal bolus. It should be part of the square wave bolus (extended bolus) in most pumps. Consult your insulin pump representitive or health provider for info.
            {'\n'}
            {'\n'}
            2) The square wave bolus duration is calculated based on FPUs (Fat Protien Units) and FPU ratio to total carbohydrates.
            {'\n'}
            {'\n'}
            3) In artificial pancreases (APs), like Loop, carbs can be entered seperate from FPU Carb Equivalents. This allows for a reasonable absorption time for faster carbs and a slower absorption time for fats and protiens. Protien and Fat may not start to effect BGs for 1 hour. In Loop AP, you can set the absoption entry time for 1 hour in the future. 
            {'\n'} 
          </Text>
          <Text>
            For detailed information on how the Warsaw Method algorithm works refer to the research paper at:
          </Text>
          <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2901033/#!po=45.3488')}>
              NCBI Bolus Calculator with Nutrition Database Software, a New Concept of Prandial Insulin Programming for Pump Users
              {'\n'}
          </Text>
          <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL('https://journals.sagepub.com/doi/pdf/10.1177/193229681000400310')}>
            journals.sagepub.com
          </Text>
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