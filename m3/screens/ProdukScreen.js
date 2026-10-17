import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../config/supabase';

export default function ProdukScreen() {
  const [produk, setProduk] = useState([]);
  const [namaProduk, setNamaProduk] = useState('');
  const [hargaProduk, setHargaProduk] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProduk = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('produk').select('*').order('id', { ascending: false });
    if (error) Alert.alert('Error', error.message);
    else setProduk(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const handleTambahProduk = async () => {
    if (!namaProduk || !hargaProduk) {
      Alert.alert('Peringatan', 'Isi nama dan harga produk!');
      return;
    }
    const { error } = await supabase.from('produk').insert([{ nama: namaProduk, harga: parseInt(hargaProduk) }]);
    if (error) {
      Alert.alert('Gagal', error.message);
    } else {
      Alert.alert('Sukses', 'Produk berhasil ditambahkan!');
      setNamaProduk('');
      setHargaProduk('');
      fetchProduk();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Tambah Produk Baru</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nama Produk" 
          value={namaProduk} 
          onChangeText={setNamaProduk} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Harga (Rp)" 
          keyboardType="numeric" 
          value={hargaProduk} 
          onChangeText={setHargaProduk} 
        />
        <TouchableOpacity style={styles.btnSuccess} onPress={handleTambahProduk}>
          <Text style={styles.btnText}>Simpan Produk</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={produk}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.itemTitle}>{item.nama}</Text>
              <Text style={styles.itemSub}>Rp {item.harga?.toLocaleString('id-ID')}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f4f5f7' },
  formCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#e1e4e8' },
  formTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  btnSuccess: { backgroundColor: '#28a745', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  listItem: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { fontSize: 15, fontWeight: 'bold' },
  itemSub: { fontSize: 13, color: '#666' }
});