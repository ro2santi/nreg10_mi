import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PromoProvider } from './context/PromoContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <PromoProvider>
        <AppNavigator />
      </PromoProvider>
    </SafeAreaProvider>
  );
}