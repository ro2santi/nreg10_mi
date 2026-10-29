import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { PromoContext } from '../context/PromoContext';

export default function PemasaranScreen() {
  const [kode, setKode] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [diskon, setDiskon] = useState('');
  const { addPromo, loading } = useContext(PromoContext);

  const handleSubmit = async () => {
    if (!kode || !deskripsi || !diskon) return Alert.alert('Peringatan', 'Lengkapi form promo!');
    const ok = await addPromo({ kode: kode.toUpperCase().trim(), deskripsi, diskon: parseInt(diskon), status: true });
    if (ok) { setKode(''); setDeskripsi(''); setDiskon(''); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buat Campaign Promo Baru</Text>
      <TextInput style={styles.input} placeholder="Kode Promo (mis. DISKONSATU)" value={kode} onChangeText={setKode} />
      <TextInput style={styles.input} placeholder="Deskripsi Promo" value={deskripsi} onChangeText={setDeskripsi} />
      <TextInput style={styles.input} placeholder="Persentase Diskon (%)" keyboardType="numeric" value={diskon} onChangeText={setDiskon} />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.btnText}>{loading ? 'Memproses...' : 'Rilis Promo'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { backgroundColor: '#f8f9fa', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  btn: { backgroundColor: '#2b8a3e', padding: 14, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});