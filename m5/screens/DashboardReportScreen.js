import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { supabase } from '../config/supabase';

export default function DashboardReportScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [metrics, setMetrics] = useState({ totalPendapatan: 0, totalTransaksi: 0, avgTrx: 0 });

  const fetchLaporan = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('transaksi').select('*');
      if (error) throw error;
      if (data) {
        const total = data.reduce((acc, curr) => acc + curr.total_harga, 0);
        const count = data.length;
        setMetrics({ totalPendapatan: total, totalTransaksi: count, avgTrx: count > 0 ? total / count : 0 });
      }
    } catch (err) {
      Alert.alert('Gagal Load API', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchLaporan(); }, []);

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchLaporan(); }} />}>
      <Text style={styles.title}>Laporan Bisnis Real-time</Text>
      {loading && !refreshing ? <ActivityIndicator size="large" color="#1c7ed6" /> : (
        <View>
          <View style={styles.cardPrimary}>
            <Text style={{ color: '#d0ebff' }}>Total Pendapatan</Text>
            <Text style={styles.valPrimary}>Rp {metrics.totalPendapatan.toLocaleString('id-ID')}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.cardHalf}>
              <Text>Total Transaksi</Text>
              <Text style={styles.val}>{metrics.totalTransaksi} Trx</Text>
            </View>
            <View style={styles.cardHalf}>
              <Text>Rata-rata / Trx</Text>
              <Text style={styles.val}>Rp {Math.round(metrics.avgTrx).toLocaleString('id-ID')}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.btnDetail} onPress={() => navigation.navigate('DetailTransaksi')}>
            <Text style={styles.btnText}>Lihat Riwayat Transaksi Lengkap ➔</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f8f9fa' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  cardPrimary: { backgroundColor: '#1c7ed6', padding: 16, borderRadius: 8, marginBottom: 12 },
  valPrimary: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  cardHalf: { width: '48%', backgroundColor: '#fff', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  val: { fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  btnDetail: { backgroundColor: '#2b8a3e', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});