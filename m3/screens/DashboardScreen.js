import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function DashboardScreen({ route, navigation }) {
  const { userEmail } = route.params || { userEmail: 'Admin' };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Halo, {userEmail}</Text>
        <Text style={styles.subText}>Pilih menu pengelolaan bisnis di bawah ini:</Text>
      </View>

      <TouchableOpacity 
        style={styles.menuCard} 
        onPress={() => navigation.navigate('ManajemenProduk')}
      >
        <Text style={styles.menuTitle}>📦 Manajemen Produk</Text>
        <Text style={styles.menuSub}>Kelola item & tambah daftar produk Supabase</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuCard} 
        onPress={() => navigation.navigate('ManajemenPelanggan')}
      >
        <Text style={styles.menuTitle}>👥 Manajemen Pelanggan</Text>
        <Text style={styles.menuSub}>Kelola data pelanggan & membership</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.btnDanger} 
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.btnText}>Keluar / Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f4f5f7' },
  header: { marginBottom: 20 },
  welcomeText: { fontSize: 20, fontWeight: 'bold' },
  subText: { color: '#666', marginTop: 4 },
  menuCard: { backgroundColor: '#fff', padding: 18, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#e1e4e8' },
  menuTitle: { fontSize: 16, fontWeight: 'bold' },
  menuSub: { fontSize: 12, color: '#666', marginTop: 4 },
  btnDanger: { backgroundColor: '#dc3545', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});