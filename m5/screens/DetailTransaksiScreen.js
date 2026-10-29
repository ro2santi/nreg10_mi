import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../config/supabase';

export default function DetailTransaksiScreen() {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('transaksi').select('*').order('id', { ascending: false });
        if (error) throw error;
        setTransaksi(data || []);
      } catch (err) { Alert.alert('Error', err.message); }
      finally { setLoading(false); }
    };
    fetchDetail();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#1c7ed6" /> : (
        <FlatList
          data={transaksi}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.title}>Transaksi #{item.id}</Text>
                <Text style={styles.sub}>{new Date(item.created_at).toLocaleString('id-ID')}</Text>
              </View>
              <Text style={styles.amount}>Rp {item.total_harga.toLocaleString('id-ID')}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f8f9fa' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, borderWidth: 1, borderColor: '#eee' },
  title: { fontWeight: 'bold' },
  sub: { fontSize: 11, color: '#888' },
  amount: { fontWeight: 'bold', color: '#2b8a3e' }
});