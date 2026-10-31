import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert, 
  Platform,
  Linking,
  ActivityIndicator,
  Modal
} from 'react-native';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase
const SUPABASE_URL = 'https://kode_masing_masing.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kode_masing_masing';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false }
});

const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

const formatRupiah = (val) => {
  return 'Rp ' + Number(val || 0).toLocaleString('id-ID');
};

// ==========================================
// 1. KOMPONEN: FORM PENGADUAN
// ==========================================
function HalamanPengaduan({ onBack }) {
  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [isiPengaduan, setIsiPengaduan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nama || !telepon || !isiPengaduan) {
      showAlert('Perhatian', 'Mohon lengkapi semua kolom.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('pengaduan').insert([
        {
          nama,
          telepon,
          isi_pengaduan: isiPengaduan,
          status: 'Menunggu',
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      showAlert('Berhasil', 'Pengaduan berhasil dikirim dengan status: Menunggu.');
      onBack();
    } catch (err) {
      showAlert('Error', `Gagal mengirim pengaduan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Kembali ke Beranda</Text>
      </TouchableOpacity>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>📝 Pengaduan Online</Text>
        <Text style={styles.formSubtitle}>Sampaikan aspirasi dan keluhan warga secara langsung.</Text>

        <Text style={styles.inputLabel}>Nama Lengkap</Text>
        <TextInput style={styles.textInput} placeholder="Nama Anda" value={nama} onChangeText={setNama} />

        <Text style={styles.inputLabel}>Nomor Telepon / WhatsApp</Text>
        <TextInput style={styles.textInput} placeholder="081234567890" keyboardType="phone-pad" value={telepon} onChangeText={setTelepon} />

        <Text style={styles.inputLabel}>Detail Aspirasi / Keluhan</Text>
        <TextInput style={[styles.textInput, styles.textArea]} placeholder="Tuliskan keluhan secara rinci..." multiline numberOfLines={4} value={isiPengaduan} onChangeText={setIsiPengaduan} />

        <TouchableOpacity style={[styles.primaryButton, loading && styles.disabledButton]} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.primaryButtonText}>Kirim Pengaduan</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ==========================================
// 2. KOMPONEN: FORM DOKUMEN
// ==========================================
function HalamanDokumen({ onBack }) {
  const [nama, setNama] = useState('');
  const [nik, setNik] = useState('');
  const [jenisSurat, setJenisSurat] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nama || !nik || !jenisSurat) {
      showAlert('Perhatian', 'Mohon isi minimal Nama, NIK, dan Jenis Dokumen.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('dokumen').insert([
        {
          nama,
          nik,
          jenis_surat: jenisSurat,
          keterangan,
          status: 'Menunggu',
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      showAlert('Berhasil', 'Permohonan dokumen diajukan dengan status: Menunggu.');
      onBack();
    } catch (err) {
      showAlert('Error', `Gagal mengajukan permohonan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Kembali ke Beranda</Text>
      </TouchableOpacity>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>📄 Permohonan Surat & Dokumen</Text>
        <Text style={styles.formSubtitle}>Pengurusan administrasi kependudukan dan surat pengantar.</Text>

        <Text style={styles.inputLabel}>Nama Lengkap Sesuai KTP</Text>
        <TextInput style={styles.textInput} placeholder="Nama lengkap" value={nama} onChangeText={setNama} />

        <Text style={styles.inputLabel}>Nomor Induk Kependudukan (NIK)</Text>
        <TextInput style={styles.textInput} placeholder="16 Digit NIK" keyboardType="numeric" value={nik} onChangeText={setNik} />

        <Text style={styles.inputLabel}>Jenis Dokumen / Surat</Text>
        <TextInput style={styles.textInput} placeholder="Contoh: Domisili, SKCK, Usaha" value={jenisSurat} onChangeText={setJenisSurat} />

        <Text style={styles.inputLabel}>Keterangan Tambahan / Keperluan</Text>
        <TextInput style={[styles.textInput, styles.textArea]} placeholder="Keperluan permohonan..." multiline numberOfLines={3} value={keterangan} onChangeText={setKeterangan} />

        <TouchableOpacity style={[styles.primaryButton, loading && styles.disabledButton]} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.primaryButtonText}>Ajukan Permohonan</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ==========================================
// 3. KOMPONEN: KATALOG MERCHANDISE (PUBLIK)
// ==========================================
function HalamanMerchandise({ onBack }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMerchandise = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('merchandise').select('*').order('id', { ascending: false });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMerchandise();
  }, []);

  const handleBeli = (item) => {
    const nomorWA = '6281234567890';
    const text = encodeURIComponent(`Halo Admin, saya berminat memesan merchandise resmi:\n- Produk: *${item.nama_produk}*\n- Harga: *${formatRupiah(item.harga)}*\nMohon informasi ketersediaan stok & pengiriman.`);
    const url = `https://wa.me/${nomorWA}?text=${text}`;
    Linking.openURL(url).catch(() => showAlert('Gagal', 'Tidak dapat membuka tautan WhatsApp.'));
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Kembali ke Beranda</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>🛍️ Official Merchandise</Text>
        <Text style={styles.subtitle}>Dukung kemandirian layanan publik melalui cinderamata resmi.</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 40 }} />
      ) : items.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada katalog produk yang tersedia.</Text>
      ) : (
        <View style={styles.productGrid}>
          {items.map((prod) => (
            <View key={prod.id} style={styles.productCard}>
              <Image 
                source={{ uri: prod.gambar_url || 'https://via.placeholder.com/300x200?text=Produk' }} 
                style={styles.productImage} 
              />
              <View style={styles.productBody}>
                <Text style={styles.productName}>{prod.nama_produk}</Text>
                <Text style={styles.productPrice}>{formatRupiah(prod.harga)}</Text>
                <Text style={styles.productDesc}>{prod.deskripsi || 'Merchandise resmi portal pelayanan publik.'}</Text>
                <TouchableOpacity style={styles.buyButton} onPress={() => handleBeli(prod)}>
                  <Text style={styles.buyButtonText}>🛒 Pesan via WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

// ==========================================
// 4. KOMPONEN: LOGIN ADMIN
// ==========================================
function HalamanLoginAdmin({ onLoginSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'admin@mail.com' && password === '123456') {
      showAlert('Login Berhasil', 'Selamat datang di Panel Admin.');
      onLoginSuccess();
    } else {
      showAlert('Login Gagal', 'Email atau password salah.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Kembali ke Beranda</Text>
      </TouchableOpacity>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>🔐 Login Administrator</Text>
        <Text style={styles.formSubtitle}>Masuk untuk mengelola laporan dan etalase merchandise.</Text>

        <Text style={styles.inputLabel}>Email Admin</Text>
        <TextInput style={styles.textInput} placeholder="ro2santi@gmail.com" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput style={styles.textInput} placeholder="Masukkan password" secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.adminLoginButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Masuk ke Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ==========================================
// 5. KOMPONEN: DASHBOARD ADMIN LENGKAP
// ==========================================
function HalamanDashboardAdmin({ onLogout }) {
  const [tab, setTab] = useState('pengaduan'); // 'pengaduan' | 'dokumen' | 'merchandise'
  const [dataPengaduan, setDataPengaduan] = useState([]);
  const [dataDokumen, setDataDokumen] = useState([]);
  const [dataMerchandise, setDataMerchandise] = useState([]);
  const [loading, setLoading] = useState(false);

  // State Modal Detail Layanan
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // State Form Tambah Merchandise
  const [showAddMerch, setShowAddMerch] = useState(false);
  const [namaProduk, setNamaProduk] = useState('');
  const [hargaProduk, setHargaProduk] = useState('');
  const [deskripsiProduk, setDeskripsiProduk] = useState('');
  const [gambarUrl, setGambarUrl] = useState('');
  const [savingMerch, setSavingMerch] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [resP, resD, resM] = await Promise.all([
      supabase.from('pengaduan').select('*').order('id', { ascending: false }),
      supabase.from('dokumen').select('*').order('id', { ascending: false }),
      supabase.from('merchandise').select('*').order('id', { ascending: false })
    ]);
    if (!resP.error) setDataPengaduan(resP.data || []);
    if (!resD.error) setDataDokumen(resD.data || []);
    if (!resM.error) setDataMerchandise(resM.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedItem) return;
    const table = tab === 'pengaduan' ? 'pengaduan' : 'dokumen';
    const { error } = await supabase.from(table).update({ status: newStatus }).eq('id', selectedItem.id);
    if (!error) {
      showAlert('Sukses', `Status diperbarui menjadi: ${newStatus}`);
      setSelectedItem({ ...selectedItem, status: newStatus });
      fetchData();
      setModalVisible(false);
    }
  };

  const handleDelete = async (table, id) => {
    const konfirmasi = Platform.OS === 'web' ? window.confirm('Yakin ingin menghapus item ini?') : true;
    if (!konfirmasi) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) {
      showAlert('Berhasil', 'Data berhasil dihapus.');
      if (modalVisible) setModalVisible(false);
      fetchData();
    }
  };

  const handleAddMerchandise = async () => {
    if (!namaProduk || !hargaProduk) {
      showAlert('Perhatian', 'Nama produk dan harga wajib diisi.');
      return;
    }
    setSavingMerch(true);
    const { error } = await supabase.from('merchandise').insert([
      {
        nama_produk: namaProduk,
        harga: Number(hargaProduk),
        deskripsi: deskripsiProduk,
        gambar_url: gambarUrl || 'https://via.placeholder.com/300x200?text=Produk',
        created_at: new Date().toISOString()
      }
    ]);
    setSavingMerch(false);
    if (error) {
      showAlert('Gagal', `Tidak dapat menambah produk: ${error.message}`);
    } else {
      showAlert('Berhasil', 'Produk merchandise baru berhasil ditambahkan.');
      setNamaProduk('');
      setHargaProduk('');
      setDeskripsiProduk('');
      setGambarUrl('');
      setShowAddMerch(false);
      fetchData();
    }
  };

  // Statistik Ringkas
  const allServices = [...dataPengaduan, ...dataDokumen];
  const countBaru = allServices.filter(d => (d.status || 'Menunggu') === 'Menunggu').length;
  const countSelesai = allServices.filter(d => d.status === 'Selesai').length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.adminHeader}>
        <View>
          <Text style={styles.adminHeaderTitle}>Dashboard Manajemen Admin</Text>
          <Text style={styles.adminHeaderSubtitle}>ro2santi@gmail.com</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Keluar</Text>
        </TouchableOpacity>
      </View>

      {/* Statistik Ringkasan */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { borderLeftColor: '#EF4444' }]}>
          <Text style={styles.statLabel}>Layanan Baru</Text>
          <Text style={[styles.statValue, { color: '#DC2626' }]}>{countBaru}</Text>
          <Text style={styles.statSub}>Menunggu Verifikasi</Text>
        </View>
        <View style={[styles.statBox, { borderLeftColor: '#10B981' }]}>
          <Text style={styles.statLabel}>Selesai</Text>
          <Text style={[styles.statValue, { color: '#059669' }]}>{countSelesai}</Text>
          <Text style={styles.statSub}>Telah Dituntaskan</Text>
        </View>
        <View style={[styles.statBox, { borderLeftColor: '#8B5CF6' }]}>
          <Text style={styles.statLabel}>Merchandise</Text>
          <Text style={[styles.statValue, { color: '#7C3AED' }]}>{dataMerchandise.length}</Text>
          <Text style={styles.statSub}>Item di Etalase</Text>
        </View>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, tab === 'pengaduan' && styles.tabButtonActive]}
          onPress={() => setTab('pengaduan')}>
          <Text style={[styles.tabButtonText, tab === 'pengaduan' && styles.tabButtonTextActive]}>
            📝 Aduan ({dataPengaduan.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, tab === 'dokumen' && styles.tabButtonActive]}
          onPress={() => setTab('dokumen')}>
          <Text style={[styles.tabButtonText, tab === 'dokumen' && styles.tabButtonTextActive]}>
            📄 Surat ({dataDokumen.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, tab === 'merchandise' && styles.tabButtonActive]}
          onPress={() => setTab('merchandise')}>
          <Text style={[styles.tabButtonText, tab === 'merchandise' && styles.tabButtonTextActive]}>
            🛍️ Toko ({dataMerchandise.length})
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />
      ) : tab === 'merchandise' ? (
        // MANAJEMEN MERCHANDISE
        <View>
          <TouchableOpacity 
            style={styles.addMerchToggle} 
            onPress={() => setShowAddMerch(!showAddMerch)}>
            <Text style={styles.addMerchToggleText}>
              {showAddMerch ? '✕ Tutup Form Tambah' : '➕ Tambah Produk Merchandise Baru'}
            </Text>
          </TouchableOpacity>

          {showAddMerch && (
            <View style={styles.merchFormCard}>
              <Text style={styles.formTitle}>Tambah Merchandise</Text>
              <Text style={styles.inputLabel}>Nama Produk</Text>
              <TextInput style={styles.textInput} placeholder="Misal: Payung Lipat Instansi" value={namaProduk} onChangeText={setNamaProduk} />

              <Text style={styles.inputLabel}>Harga (Rp)</Text>
              <TextInput style={styles.textInput} placeholder="Misal: 75000" keyboardType="numeric" value={hargaProduk} onChangeText={setHargaProduk} />

              <Text style={styles.inputLabel}>Link URL Gambar (Opsional)</Text>
              <TextInput style={styles.textInput} placeholder="https://..." value={gambarUrl} onChangeText={setGambarUrl} />

              <Text style={styles.inputLabel}>Deskripsi Singkat</Text>
              <TextInput style={[styles.textInput, styles.textArea]} placeholder="Spesifikasi / bahan produk..." multiline numberOfLines={2} value={deskripsiProduk} onChangeText={setDeskripsiProduk} />

              <TouchableOpacity style={styles.primaryButton} onPress={handleAddMerchandise} disabled={savingMerch}>
                {savingMerch ? <ActivityIndicator color="#FFF" /> : <Text style={styles.primaryButtonText}>Simpan ke Etalase</Text>}
              </TouchableOpacity>
            </View>
          )}

          {dataMerchandise.length === 0 ? (
            <Text style={styles.emptyText}>Belum ada merchandise yang didaftarkan.</Text>
          ) : (
            dataMerchandise.map((m) => (
              <View key={m.id} style={styles.adminMerchRow}>
                <Image source={{ uri: m.gambar_url || 'https://via.placeholder.com/80' }} style={styles.adminMerchThumb} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.itemTitle}>{m.nama_produk}</Text>
                  <Text style={styles.adminMerchPrice}>{formatRupiah(m.harga)}</Text>
                  <Text numberOfLines={1} style={styles.itemDesc}>{m.deskripsi}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete('merchandise', m.id)}>
                  <Text style={styles.deleteText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      ) : (
        // MANAJEMEN PENGADUAN & DOKUMEN
        <View>
          <Text style={styles.helperText}>💡 Klik baris kartu untuk melihat rincian & memperbarui status layanan.</Text>
          {(tab === 'pengaduan' ? dataPengaduan : dataDokumen).map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.itemCard} 
              onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{item.nama}</Text>
                <View style={[styles.badgeContainer, item.status === 'Selesai' ? styles.badgeSuccess : item.status === 'Diproses' ? styles.badgeWarning : styles.badgeDanger]}>
                  <Text style={styles.badgeText}>{item.status || 'Menunggu'}</Text>
                </View>
              </View>
              <Text style={styles.itemMeta}>{tab === 'pengaduan' ? `📞 ${item.telepon}` : `🆔 NIK: ${item.nik} | 📋 ${item.jenis_surat}`}</Text>
              <Text numberOfLines={2} style={styles.itemDesc}>{item.isi_pengaduan || item.keterangan || '-'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* MODAL DETAIL LAYANAN */}
      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detail Layanan</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedItem && (
              <ScrollView style={{ maxHeight: 380 }}>
                <Text style={styles.detailLabel}>Nama Pemohon / Pelapor:</Text>
                <Text style={styles.detailValue}>{selectedItem.nama}</Text>

                {tab === 'pengaduan' ? (
                  <>
                    <Text style={styles.detailLabel}>Nomor Kontak:</Text>
                    <Text style={styles.detailValue}>{selectedItem.telepon}</Text>
                    <Text style={styles.detailLabel}>Detail Aspirasi:</Text>
                    <Text style={styles.detailBox}>{selectedItem.isi_pengaduan}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.detailLabel}>NIK:</Text>
                    <Text style={styles.detailValue}>{selectedItem.nik}</Text>
                    <Text style={styles.detailLabel}>Jenis Surat:</Text>
                    <Text style={styles.detailValue}>{selectedItem.jenis_surat}</Text>
                    <Text style={styles.detailLabel}>Keperluan:</Text>
                    <Text style={styles.detailBox}>{selectedItem.keterangan || '-'}</Text>
                  </>
                )}

                <Text style={[styles.detailLabel, { marginTop: 12 }]}>Perbarui Status:</Text>
                <View style={styles.statusActionGroup}>
                  <TouchableOpacity style={[styles.statusBtn, { backgroundColor: '#EF4444' }]} onPress={() => handleUpdateStatus('Menunggu')}>
                    <Text style={styles.statusBtnText}>Menunggu</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.statusBtn, { backgroundColor: '#F59E0B' }]} onPress={() => handleUpdateStatus('Diproses')}>
                    <Text style={styles.statusBtnText}>Diproses</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.statusBtn, { backgroundColor: '#10B981' }]} onPress={() => handleUpdateStatus('Selesai')}>
                    <Text style={styles.statusBtnText}>Selesai</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.deleteModalButton} onPress={() => handleDelete(tab === 'pengaduan' ? 'pengaduan' : 'dokumen', selectedItem.id)}>
                  <Text style={styles.deleteModalText}>🗑️ Hapus Laporan</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// ==========================================
// 6. KOMPONEN UTAMA (BERANDA)
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleCallCenterWA = () => {
    const nomorWA = '6281234567890';
    const pesan = encodeURIComponent('Halo Call Center, saya memerlukan bantuan darurat.');
    const url = `https://wa.me/${nomorWA}?text=${pesan}`;
    Linking.openURL(url).catch(() => showAlert('Gagal', 'Tidak dapat membuka WhatsApp.'));
  };

  if (currentPage === 'pengaduan') return <HalamanPengaduan onBack={() => setCurrentPage('home')} />;
  if (currentPage === 'dokumen') return <HalamanDokumen onBack={() => setCurrentPage('home')} />;
  if (currentPage === 'merchandise') return <HalamanMerchandise onBack={() => setCurrentPage('home')} />;
  if (currentPage === 'login_admin') return <HalamanLoginAdmin onLoginSuccess={() => setCurrentPage('dashboard_admin')} onBack={() => setCurrentPage('home')} />;
  if (currentPage === 'dashboard_admin') return <HalamanDashboardAdmin onLogout={() => setCurrentPage('home')} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.logo} />
        <Text style={styles.title}>Portal Layanan Publik Digital</Text>
        <Text style={styles.subtitle}>Melayani dengan Cepat, Transparan, dan Terintegrasi</Text>
      </View>

      <View style={styles.announcementCard}>
        <Text style={styles.announcementTitle}>📢 Pengumuman Jam Pelayanan</Text>
        <Text style={styles.announcementBody}>
          Pelayanan tatap muka dan online dibuka setiap hari Kerja (Senin - Jumat) pukul 08.00 - 15.00 WIB.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Layanan Utama Masyarakat</Text>
      
      <View style={styles.serviceContainer}>
        {/* Tombol Pengaduan */}
        <TouchableOpacity style={styles.serviceCard} onPress={() => setCurrentPage('pengaduan')}>
          <Text style={styles.serviceIcon}>📝</Text>
          <Text style={styles.serviceName}>Pengaduan Online</Text>
          <Text style={styles.serviceDesc}>Sampaikan aspirasi dan keluhan warga secara langsung.</Text>
        </TouchableOpacity>

        {/* Tombol Dokumen */}
        <TouchableOpacity style={styles.serviceCard} onPress={() => setCurrentPage('dokumen')}>
          <Text style={styles.serviceIcon}>📄</Text>
          <Text style={styles.serviceName}>Layanan Dokumen</Text>
          <Text style={styles.serviceDesc}>Pengurusan surat keterangan, domisili, dan kelengkapan berkas.</Text>
        </TouchableOpacity>

        {/* Tombol Merchandise Baru */}
        <TouchableOpacity style={[styles.serviceCard, { borderColor: '#C7D2FE' }]} onPress={() => setCurrentPage('merchandise')}>
          <Text style={styles.serviceIcon}>🛍️</Text>
          <Text style={styles.serviceName}>Katalog Merchandise Resmi</Text>
          <Text style={styles.serviceDesc}>Cinderamata & atribut kedinasan resmi yang dapat dibeli umum.</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.emergencyButton} onPress={handleCallCenterWA}>
        <Text style={styles.emergencyButtonText}>🚨 WhatsApp Call Center Darurat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.adminAccessButton} onPress={() => setCurrentPage('login_admin')}>
        <Text style={styles.adminAccessText}>🔒 Masuk Sebagai Administrator</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Dinas Layanan Publik & Informatika</Text>
      </View>
    </ScrollView>
  );
}

// ==========================================
// STYLESHEET
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 4,
  },
  announcementCard: {
    backgroundColor: '#EFF6FF',
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 4,
  },
  announcementBody: {
    fontSize: 13,
    color: '#1E3A8A',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  serviceContainer: {
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  serviceIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  serviceDesc: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  emergencyButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  adminAccessButton: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  adminAccessText: {
    color: '#F9FAFB',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  backButton: {
    marginVertical: 14,
  },
  backButtonText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 8,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  adminLoginButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // Merchandise Publik
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '48%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#E5E7EB',
  },
  productBody: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
    marginVertical: 4,
  },
  productDesc: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 10,
    height: 32,
  },
  buyButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // Dashboard Admin
  adminHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    padding: 16,
    borderRadius: 10,
    marginVertical: 14,
  },
  adminHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  adminHeaderSubtitle: {
    color: '#93C5FD',
    fontSize: 12,
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  statSub: {
    fontSize: 9,
    color: '#9CA3AF',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 6,
  },
  tabButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#2563EB',
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemMeta: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: 12,
    color: '#374151',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 20,
    fontSize: 13,
  },
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  badgeDanger: { backgroundColor: '#EF4444' },
  badgeWarning: { backgroundColor: '#F59E0B' },
  badgeSuccess: { backgroundColor: '#10B981' },

  // Admin Merchandise Tab
  addMerchToggle: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  addMerchToggleText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  merchFormCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  adminMerchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  adminMerchThumb: {
    width: 55,
    height: 55,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  adminMerchPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#059669',
  },
  deleteText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },

  // Modal Detail
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    width: '100%',
    maxWidth: 480,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 6,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeBtn: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 6,
  },
  detailValue: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
  },
  detailBox: {
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
    fontSize: 12,
    color: '#374151',
  },
  statusActionGroup: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 10,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 6,
    alignItems: 'center',
  },
  statusBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  deleteModalButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
  },
  deleteModalText: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 12,
  },
});