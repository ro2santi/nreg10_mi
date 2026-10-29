import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function DashboardScreen({ route, navigation }) {
  const { userEmail } = route.params || { userEmail: 'Admin' };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Halo, {userEmail}</Text>
      <Text style={styles.sub}>Pilih menu manajemen bisnis:</Text>

      <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('ManajemenProduk')}>
        <Text style={styles.menuTitle}>📦 Manajemen Produk</Text>
        <Text style={styles.menuSub}>Kelola stok & tambah produk Supabase</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('ManajemenPelanggan')}>
        <Text style={styles.menuTitle}>👥 Manajemen Pelanggan</Text>
        <Text style={styles.menuSub}>Lihat data pelanggan terdaftar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.btnDanger} 
        onPress={() => navigation.replace('Profile')}
      >
        <Text style={styles.btnText}>Logout / Keluar Admin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f4f5f7' },
  welcome: { fontSize: 20, fontWeight: 'bold' },
  sub: { color: '#666', marginBottom: 20, marginTop: 4 },
  menuCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  menuTitle: { fontSize: 16, fontWeight: 'bold' },
  menuSub: { fontSize: 12, color: '#666', marginTop: 2 },
  btnDanger: { backgroundColor: '#dc3545', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});