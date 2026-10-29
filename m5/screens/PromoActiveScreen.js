import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { PromoContext } from '../context/PromoContext';

export default function PromoActiveScreen() {
  const { promos, loading, fetchPromos } = useContext(PromoContext);
  const activePromos = promos.filter((p) => p.status === true);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={fetchPromos} style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
        <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>🔄 Refresh Promo</Text>
      </TouchableOpacity>

      {loading ? <ActivityIndicator size="large" color="#007AFF" /> : (
        <FlatList
          data={activePromos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.code}>{item.kode}</Text>
              <Text style={styles.desc}>{item.deskripsi}</Text>
              <Text style={styles.discount}>Diskon: {item.diskon}%</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f8f9fa' },
  card: { backgroundColor: '#e7f5ff', padding: 14, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#a5d8ff' },
  code: { fontWeight: 'bold', color: '#1c7ed6', fontSize: 16 },
  desc: { marginTop: 4, color: '#333' },
  discount: { fontSize: 12, color: '#1c7ed6', fontWeight: 'bold', marginTop: 6 }
});