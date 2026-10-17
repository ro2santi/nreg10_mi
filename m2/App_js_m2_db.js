import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  Modal,
  ScrollView
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client
const SUPABASE_URL = 'https://kode_uri_api_masing2.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kode_api_key_masing2';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [produkList, setProdukList] = useState([]);
  const [keranjang, setKeranjang] = useState([]); // State Keranjang Belanja
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch Data Produk dari Supabase DB
  const fetchProduk = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('produk')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        Alert.alert('Error Supabase', error.message);
      } else {
        setProdukList(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  // Filter Produk berdasarkan Pencarian Teks
  const filteredData = produkList.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  // --- LOGIKA KERANJANG BELANJA ---

  // 1. Tambah Produk ke Keranjang
  const tambahKeKeranjang = (produk) => {
    setKeranjang((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === produk.id);
      if (index > -1) {
        // Jika produk sudah ada, tambah jumlah qty
        const updated = [...prevCart];
        updated[index].qty += 1;
        return updated;
      } else {
        // Jika produk baru, masukkan ke keranjang
        return [...prevCart, { ...produk, qty: 1 }];
      }
    });
  };

  // 2. Kurangi Quantity Produk
  const kurangiQty = (produkId) => {
    setKeranjang((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === produkId) {
            return { ...item, qty: item.qty - 1 };
          }
          return item;
        })
        .filter((item) => item.qty > 0); // Hapus jika qty = 0
    });
  };

  // 3. Tambah Quantity Produk
  const tambahQty = (produkId) => {
    setKeranjang((prevCart) =>
      prevCart.map((item) =>
        item.id === produkId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // 4. Hapus Item Produk dari Keranjang
  const hapusItem = (produkId) => {
    setKeranjang((prevCart) => prevCart.filter((item) => item.id !== produkId));
  };

  // 5. Hitung Total Quantity & Total Harga
  const totalItem = keranjang.reduce((acc, item) => acc + item.qty, 0);
  const totalHarga = keranjang.reduce((acc, item) => acc + item.harga * item.qty, 0);

  // 6. Simpan Transaksi ke Supabase DB
  const handleCheckout = async () => {
    if (keranjang.length === 0) return;

    try {
      setLoading(true);
      // Insert ke tabel transaksi
      const { data: trxData, error: trxError } = await supabase
        .from('transaksi')
        .insert([{ total_harga: totalHarga }])
        .select()
        .single();

      if (trxError) throw trxError;

      // Insert detail transaksi
      const detailPayload = keranjang.map((item) => ({
        transaksi_id: trxData.id,
        produk_id: item.id,
        jumlah: item.qty,
        subtotal: item.harga * item.qty,
      }));

      const { error: detailError } = await supabase
        .from('detail_transaksi')
        .insert(detailPayload);

      if (detailError) throw detailError;

      Alert.alert('Transaksi Berhasil!', `No. Transaksi: #${trxData.id}\nTotal: Rp ${totalHarga.toLocaleString('id-ID')}`);
      setKeranjang([]);
      setModalVisible(false);
    } catch (err) {
      Alert.alert('Gagal Checkout', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Katalog Produk (Supabase DB)</Text>

        {/* Input Search */}
        <TextInput
          style={styles.searchInput}
          placeholder="Cari produk..."
          value={search}
          onChangeText={setSearch}
        />

        {/* List Produk */}
        {loading ? (
          <ActivityIndicator size="large" color="#228be6" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <View>
                  <Text style={styles.productName}>{item.nama}</Text>
                  <Text style={styles.productPrice}>Rp {item.harga.toLocaleString('id-ID')}</Text>
                </View>
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => tambahKeKeranjang(item)}
                >
                  <Text style={styles.buyButtonText}>+ Tambah</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* Floating Bar Keranjang */}
        <View style={styles.cartBar}>
          <View>
            <Text style={styles.cartBarText}>{totalItem} Item | Rp {totalHarga.toLocaleString('id-ID')}</Text>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.cartButtonText}>🛒 Lihat Keranjang</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Ringkasan Keranjang Belanja */}
        <Modal visible={modalVisible} animationType="slide" transparent={false}>
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Rincian Keranjang Belanja</Text>

            {keranjang.length === 0 ? (
              <View style={styles.emptyCart}>
                <Text style={styles.emptyText}>Keranjang Anda masih kosong.</Text>
              </View>
            ) : (
              <ScrollView style={{ flex: 1 }}>
                {keranjang.map((item) => (
                  <View key={item.id} style={styles.cartItemCard}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cartItemName}>{item.nama}</Text>
                      <Text style={styles.cartItemPrice}>
                        Rp {item.harga.toLocaleString('id-ID')} x {item.qty} = Rp {(item.harga * item.qty).toLocaleString('id-ID')}
                      </Text>
                    </View>

                    {/* Tombol Kurang, Tambah, dan Hapus */}
                    <View style={styles.qtyControl}>
                      <TouchableOpacity style={styles.btnQty} onPress={() => kurangiQty(item.id)}>
                        <Text style={styles.btnQtyText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.qty}</Text>
                      <TouchableOpacity style={styles.btnQty} onPress={() => tambahQty(item.id)}>
                        <Text style={styles.btnQtyText}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnHapus} onPress={() => hapusItem(item.id)}>
                        <Text style={styles.btnHapusText}>🗑️</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}

            {/* Total dan Action Modal */}
            <View style={styles.modalFooter}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Bayar:</Text>
                <Text style={styles.totalValue}>Rp {totalHarga.toLocaleString('id-ID')}</Text>
              </View>

              <TouchableOpacity
                style={[styles.checkoutButton, keranjang.length === 0 && { backgroundColor: '#ccc' }]}
                disabled={keranjang.length === 0}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutText}>Checkout & Simpan Transaksi</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeText}>Kembali ke Katalog</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f8f9fa' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  searchInput: { backgroundColor: '#fff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  productCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, borderWidth: 1, borderColor: '#eee' },
  productName: { fontSize: 14, fontWeight: '600' },
  productPrice: { color: '#666', marginTop: 2, fontSize: 13 },
  buyButton: { backgroundColor: '#228be6', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  buyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  cartBar: { backgroundColor: '#1864ab', padding: 12, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  cartBarText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  cartButton: { backgroundColor: '#fff', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  cartButtonText: { color: '#1864ab', fontWeight: 'bold', fontSize: 13 },
  modalContainer: { flex: 1, padding: 20, backgroundColor: '#fff' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  emptyCart: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 14 },
  cartItemCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
  cartItemName: { fontSize: 14, fontWeight: 'bold' },
  cartItemPrice: { color: '#666', fontSize: 12, marginTop: 2 },
  qtyControl: { flexDirection: 'row', alignItems: 'center' },
  btnQty: { backgroundColor: '#e9ecef', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  btnQtyText: { fontWeight: 'bold', fontSize: 16 },
  qtyText: { marginHorizontal: 8, fontWeight: 'bold' },
  btnHapus: { marginLeft: 10, padding: 4 },
  btnHapusText: { fontSize: 16 },
  modalFooter: { borderTopWidth: 1, borderColor: '#eee', paddingTop: 15, marginTop: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalLabel: { fontSize: 16, fontWeight: 'bold' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#2b8a3e' },
  checkoutButton: { backgroundColor: '#2b8a3e', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  closeButton: { padding: 12, alignItems: 'center' },
  closeText: { color: '#e03131', fontWeight: 'bold' },
});