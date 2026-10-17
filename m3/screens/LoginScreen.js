import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert('Peringatan', 'Harap masukkan email/username!');
      return;
    }
    navigation.navigate('Dashboard', { userEmail: email });
  };

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.titleAuth}>Sistem POS & Manajemen</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Email / Username"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Masukkan Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
        <Text style={styles.btnText}>Masuk ke Sistem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  titleAuth: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#111' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  btnPrimary: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});