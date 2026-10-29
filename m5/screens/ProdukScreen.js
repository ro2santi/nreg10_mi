import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../config/supabase';

export default function ProdukScreen() {
  const [produk, setProduk] = useState([]);
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProduk = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('produk').select('*').order('id', { ascending: false });
    if (error) Alert.alert('Error', error.message);
    else setProduk(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProduk(); }, []);

  const handleTambah = async () => {
    if (!nama || !harga) return Alert.alert('Peringatan', 'Isi nama dan harga!');
    const { error } = await supabase.from('produk').insert([{ nama, harga: parseInt(harga) }]);
    if (error) Alert.alert('Gagal', error.message);
    else {
      Alert.alert('Sukses', 'Produk ditambahkan!');
      setNama(''); setHarga(''); fetchProduk();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Nama Produk" value={nama} onChangeText={setNama} />
        <TextInput style={styles.input} placeholder="Harga (Rp)" keyboardType="numeric" value={harga} onChangeText={setHarga} />
        <TouchableOpacity style={styles.btn} onPress={handleTambah}><Text style={styles.btnText}>Simpan Produk</Text></TouchableOpacity>
      </View>
      {loading ? <ActivityIndicator size="large" color="#007AFF" /> : (
        <FlatList
          data={produk}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.nama}</Text>
              <Text style={styles.itemPrice}>Rp {item.harga?.toLocaleString('id-ID')}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f4f5f7' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 },
  input: { backgroundColor: '#f8f9fa', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  btn: { backgroundColor: '#28a745', padding: 12, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  item: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' },
  itemTitle: { fontWeight: 'bold' },
  itemPrice: { color: '#666' }
});