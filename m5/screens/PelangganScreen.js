import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../config/supabase';

export default function PelangganScreen() {
  const [pelanggan, setPelanggan] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPelanggan = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('pelanggan').select('*');
      if (error) Alert.alert('Error', error.message);
      else setPelanggan(data || []);
      setLoading(false);
    };
    fetchPelanggan();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#007AFF" /> : (
        <FlatList
          data={pelanggan}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.name}>{item.nama}</Text>
                <Text style={styles.sub}>{item.email}</Text>
              </View>
              <Text style={styles.badge}>{item.kategori}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f4f5f7' },
  item: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontWeight: 'bold' },
  sub: { fontSize: 12, color: '#666' },
  badge: { backgroundColor: '#e7f5ff', color: '#1c7ed6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, fontSize: 12, fontWeight: 'bold' }
});