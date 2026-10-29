import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Image source={require('../assets/snack-icon.png')} style={styles.logo} />
        <Text style={styles.title}>Kopi Digital Indonesia</Text>
        <Text style={styles.subtitle}>Solusi Kafein & Bisnis Modern</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tentang Kami</Text>
        <Text style={styles.cardText}>Menyediakan biji kopi pilihan terbaik untuk mendukung produktivitas pebisnis digital.</Text>
      </View>

      {/* Tombol Ke Katalog */}
      <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('Katalog')}>
        <Text style={styles.btnText}>Mulai Belanja di Katalog ➔</Text>
      </TouchableOpacity>

      {/* Tombol Ke Promo Publik */}
      <TouchableOpacity style={styles.btnPromo} onPress={() => navigation.navigate('PromoPublik')}>
        <Text style={styles.btnPromoText}>🏷️ Lihat Promo & Voucher Aktif</Text>
      </TouchableOpacity>

      {/* Tombol Ke Login Admin */}
      <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnSecText}>Login Area Manajemen Admin</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { padding: 20 },
  header: { alignItems: 'center', marginVertical: 15 },
  logo: { width: 80, height: 80, borderRadius: 12, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: '#666' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  cardText: { color: '#555' },
  btnPrimary: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center', marginVertical: 6 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  btnPromo: { backgroundColor: '#12b886', padding: 14, borderRadius: 8, alignItems: 'center', marginVertical: 6 },
  btnPromoText: { color: '#fff', fontWeight: 'bold' },
  btnSecondary: { backgroundColor: '#e9ecef', padding: 14, borderRadius: 8, alignItems: 'center', marginVertical: 6 },
  btnSecText: { color: '#495057', fontWeight: 'bold' },
});