import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { PromoProvider } from './context/PromoContext';
import PromoTabNavigator from './navigation/PromoTabNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <PromoProvider>
        <NavigationContainer>
          <PromoTabNavigator />
        </NavigationContainer>
      </PromoProvider>
    </SafeAreaProvider>
  );
}