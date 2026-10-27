import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { PromoContext } from '../context/PromoContext';

export default function PromoActiveScreen() {
  const { promos, loading, fetchPromos } = useContext(PromoContext);

  // Filter hanya promo dengan status aktif (true)
  const activePromos = promos.filter((p) => p.status === true);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Daftar Promo Aktif</Text>
        <TouchableOpacity onPress={fetchPromos}>
          <Text style={styles.refreshText}>🔄 Refresh</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={activePromos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.promoCard}>
              <View style={styles.codeBadge}>
                <Text style={styles.codeText}>{item.kode}</Text>
              </View>
              <Text style={styles.promoDesc}>{item.deskripsi}</Text>
              <Text style={styles.promoDiscount}>Diskon: {item.diskon}%</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada promo aktif saat ini.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f8f9fa' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  refreshText: { color: '#007AFF', fontWeight: 'bold' },
  promoCard: { backgroundColor: '#e7f5ff', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#a5d8ff' },
  codeBadge: { backgroundColor: '#1c7ed6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 6 },
  codeText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  promoDesc: { fontSize: 14, color: '#333', lineHeight: 20 },
  promoDiscount: { fontSize: 12, color: '#1c7ed6', fontWeight: 'bold', marginTop: 6 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 30 }
});