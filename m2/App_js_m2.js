import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';

const DATA_PRODUK = [
  { id: '1', nama: 'Espresso', harga: 18000 },
  { id: '2', nama: 'Kopi Susu Gula Aren', harga: 22000 },
  { id: '3', nama: 'Americano', harga: 20000 },
  { id: '4', nama: 'Matcha Latte', harga: 25000 },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [keranjang, setKeranjang] = useState(0);

  // Filter Produk berdasarkan Input Teks
  const filteredData = DATA_PRODUK.filter(item =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const tambahKeranjang = (nama) => {
    setKeranjang(keranjang + 1);
    Alert.alert('Sukses', `${nama} berhasil ditambahkan ke keranjang!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Katalog Produk</Text>
      
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari produk..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <Text style={styles.cartInfo}>Total di Keranjang: {keranjang} item</Text>

      {/* List Produk */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View>
              <Text style={styles.productName}>{item.nama}</Text>
              <Text style={styles.productPrice}>Rp {item.harga.toLocaleString('id-ID')}</Text>
            </View>
            <TouchableOpacity 
              style={styles.buyButton}
              onPress={() => tambahKeranjang(item.nama)}
            >
              <Text style={styles.buyButtonText}>+ Beli</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  searchInput: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  cartInfo: { fontSize: 14, color: '#2b8a3e', fontWeight: 'bold', marginBottom: 15 },
  productCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  productName: { fontSize: 16, fontWeight: '600' },
  productPrice: { color: '#666', marginTop: 4 },
  buyButton: { backgroundColor: '#228be6', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 6 },
  buyButtonText: { color: '#fff', fontWeight: 'bold' }
});