import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header Profile Instansi */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Portal Layanan Publik Digital</Text>
        <Text style={styles.subtitle}>Melayani dengan Cepat, Transparan, dan Terintegrasi</Text>
      </View>

      {/* Kartu Informasi / Pengumuman */}
      <View style={styles.announcementCard}>
        <Text style={styles.announcementTitle}>📢 Pengumuman Jam Pelayanan</Text>
        <Text style={styles.announcementBody}>
          Pelayanan tatap muka dan online dibuka setiap hari Kerja (Senin - Jumat) pukul 08.00 - 15.00 WIB.
        </Text>
      </View>

      {/* Daftar Layanan Utama */}
      <Text style={styles.sectionTitle}>Layanan Utama Masyarakat</Text>
      
      <View style={styles.serviceContainer}>
        {/* Layanan 1 */}
        <TouchableOpacity 
          style={styles.serviceCard} 
          onPress={() => handlePressLayanan('Pengaduan Masyarakat')}>
          <Text style={styles.serviceIcon}>📝</Text>
          <Text style={styles.serviceName}>Pengaduan Online</Text>
          <Text style={styles.serviceDesc}>Sampaikan aspirasi dan keluhan warga secara langsung.</Text>
        </TouchableOpacity>

        {/* Layanan 2 */}
        <TouchableOpacity 
          style={styles.serviceCard} 
          onPress={() => handlePressLayanan('Permohonan Surat & Dokumen')}>
          <Text style={styles.serviceIcon}>📄</Text>
          <Text style={styles.serviceName}>Layanan Dokumen</Text>
          <Text style={styles.serviceDesc}>Pengurusan surat keterangan, domisili, dan kelengkapan administrasi.</Text>
        </TouchableOpacity>
      </View>

      {/* Tombol Kontak Darurat / Call to Action */}
      <TouchableOpacity 
        style={styles.emergencyButton} 
        onPress={() => Alert.alert('Darurat', 'Menghubungi Call Center Bantuan 112...')}>
        <Text style={styles.emergencyButtonText}>🚨 Call Center Bantuan Darurat</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Dinas Layanan Publik & Informatika</Text>
      </View>

      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Katalog')}
      >
        <Text style={styles.primaryButtonText}>Lihat Katalog & Belanja (M2) ➔</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.secondaryButtonText}>Masuk Area Manajemen (M3)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 20, paddingBottom: 40 },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 4,
  },
  announcementCard: {
    backgroundColor: '#EFF6FF',
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 4,
  },
  announcementBody: {
    fontSize: 13,
    color: '#1E3A8A',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  serviceContainer: {
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  serviceIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  serviceDesc: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  primaryButton: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center', marginVertical: 6 },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  secondaryButton: { backgroundColor: '#e9ecef', padding: 14, borderRadius: 8, alignItems: 'center', marginVertical: 6 },
  secondaryButtonText: { color: '#495057', fontWeight: 'bold', fontSize: 15 },
});