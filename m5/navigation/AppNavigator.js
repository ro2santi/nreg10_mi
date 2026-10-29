import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import KatalogScreen from '../screens/KatalogScreen';
import PromoActiveScreen from '../screens/PromoActiveScreen'; // Halaman Promo Publik
import LoginScreen from '../screens/LoginScreen';
import AdminTabNavigator from './AdminTabNavigator';
import ProdukScreen from '../screens/ProdukScreen';
import PelangganScreen from '../screens/PelangganScreen';
import DetailTransaksiScreen from '../screens/DetailTransaksiScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        {/* ================= LAYAR PUBLIK ================= */}
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Landing Page' }} 
        />
        <Stack.Screen 
          name="Katalog" 
          component={KatalogScreen} 
          options={{ title: 'Katalog & Belanja' }} 
        />
        <Stack.Screen 
          name="PromoPublik" 
          component={PromoActiveScreen} 
          options={{ title: 'Daftar Promo & Voucher' }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login Admin' }} 
        />

        {/* ================= AREA KHUSUS ADMIN ================= */}
        <Stack.Screen 
          name="AdminTabs" 
          component={AdminTabNavigator} 
          options={{ headerShown: false }} 
        />

        {/* SUB-LAYAR ADMIN */}
        <Stack.Screen 
          name="ManajemenProduk" 
          component={ProdukScreen} 
          options={{ title: 'Kelola Stok Produk' }} 
        />
        <Stack.Screen 
          name="ManajemenPelanggan" 
          component={PelangganScreen} 
          options={{ title: 'Kelola Pelanggan' }} 
        />
        <Stack.Screen 
          name="DetailTransaksi" 
          component={DetailTransaksiScreen} 
          options={{ title: 'Riwayat Transaksi API' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}