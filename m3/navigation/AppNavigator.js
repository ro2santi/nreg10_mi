import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import KatalogScreen from '../screens/KatalogScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProdukScreen from '../screens/ProdukScreen';
import PelangganScreen from '../screens/PelangganScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Modul 1: Profile' }} />
        <Stack.Screen name="Katalog" component={KatalogScreen} options={{ title: 'Modul 2: Katalog & DB' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard Utama' }} />
        <Stack.Screen name="ManajemenProduk" component={ProdukScreen} options={{ title: 'Kelola Produk' }} />
        <Stack.Screen name="ManajemenPelanggan" component={PelangganScreen} options={{ title: 'Kelola Pelanggan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}