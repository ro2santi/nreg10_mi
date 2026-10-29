import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import KatalogScreen from '../screens/KatalogScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PromoActiveScreen from '../screens/PromoActiveScreen';
import PemasaranScreen from '../screens/PemasaranScreen';
import DashboardReportScreen from '../screens/DashboardReportScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator({ route }) {
  const { userEmail } = route.params || { userEmail: 'Pelanggan' };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused }) => {
          let icons = { Katalog: '🛒', Dashboard: '⚙️', Promo: '🏷️', Pemasaran: '📢', Laporan: '📊' };
          return <Text style={{ fontSize: 18 }}>{icons[route.name]}</Text>;
        },
        tabBarActiveTintColor: '#1c7ed6',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Katalog" component={KatalogScreen} options={{ title: 'Katalog Produk' }} />
      <Tab.Screen name="Promo" component={PromoActiveScreen} options={{ title: 'Promo' }} />
      <Tab.Screen name="Pemasaran" component={PemasaranScreen} options={{ title: 'Campaign' }} />
      <Tab.Screen name="Laporan" component={DashboardReportScreen} options={{ title: 'Laporan' }} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} initialParams={{ userEmail }} options={{ title: 'Admin' }} />
    </Tab.Navigator>
  );
}