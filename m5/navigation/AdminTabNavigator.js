import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import DashboardScreen from '../screens/DashboardScreen';
import PemasaranScreen from '../screens/PemasaranScreen';
import DashboardReportScreen from '../screens/DashboardReportScreen';

const Tab = createBottomTabNavigator();

export default function AdminTabNavigator({ route }) {
  const { userEmail } = route.params || { userEmail: 'Admin' };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: () => {
          let icons = { Dashboard: '⚙️', Pemasaran: '📢', Laporan: '📊' };
          return <Text style={{ fontSize: 18 }}>{icons[route.name]}</Text>;
        },
        tabBarActiveTintColor: '#1c7ed6',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        initialParams={{ userEmail }} 
        options={{ title: 'Manajemen' }} 
      />
      <Tab.Screen 
        name="Pemasaran" 
        component={PemasaranScreen} 
        options={{ title: 'Tambah Promo' }} 
      />
      <Tab.Screen 
        name="Laporan" 
        component={DashboardReportScreen} 
        options={{ title: 'Laporan' }} 
      />
    </Tab.Navigator>
  );
}