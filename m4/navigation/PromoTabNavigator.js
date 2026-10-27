import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import PromoActiveScreen from '../screens/PromoActiveScreen';
import PemasaranScreen from '../screens/PemasaranScreen';

const Tab = createBottomTabNavigator();

export default function PromoTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused }) => {
          let icon = route.name === 'PromoAktif' ? '🏷️' : '📢';
          return <Text style={{ fontSize: 18 }}>{icon}</Text>;
        },
        tabBarActiveTintColor: '#1c7ed6',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="PromoAktif" 
        component={PromoActiveScreen} 
        options={{ title: 'Promo & Voucher' }} 
      />
      <Tab.Screen 
        name="Pemasaran" 
        component={PemasaranScreen} 
        options={{ title: 'Kelola Campaign' }} 
      />
    </Tab.Navigator>
  );
}