import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { PromoContext } from '../context/PromoContext';

export default function PemasaranScreen() {
  const [kode, setKode] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [diskon, setDiskon] = useState('');

  const { addPromo, loading } = useContext(PromoContext);

  const handleSubmit = async () => {
    if (!kode || !deskripsi || !diskon) {
      Alert.alert('Peringatan', 'Harap isi seluruh field form campaign!');
      return;
    }

    const success = await addPromo({
      kode: kode.toUpperCase().trim(),
      deskripsi: deskripsi.trim(),
      diskon: parseInt(diskon),
      status: true
    });

    if (success) {
      setKode('');
      setDeskripsi('');
      setDiskon('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buat Campaign Pemasaran Baru</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Kode Promo/Voucher</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: MERDEKA50"
          value={kode}
          onChangeText={setKode}
          autoCapitalize="characters"
        />

        <Text style={styles.label}>Deskripsi Promo</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Rincian syarat & ketentuan promo..."
          multiline
          value={deskripsi}
          onChangeText={setDeskripsi}
        />

        <Text style={styles.label}>Persentase Diskon (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: 15"
          keyboardType="numeric"
          value={diskon}
          onChangeText={setDiskon}
        />

        <TouchableOpacity 
          style={[styles.btnSubmit, loading && { backgroundColor: '#a5d8ff' }]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.btnText}>{loading ? 'Menyimpan...' : 'Rilis Campaign Promo'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#111' },
  formGroup: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  label: { fontSize: 13, fontWeight: 'bold', color: '#495057', marginBottom: 6 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#ced4da', marginBottom: 12 },
  btnSubmit: { backgroundColor: '#2b8a3e', padding: 14, borderRadius: 6, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 }
});