import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  if (!email.trim()) return Alert.alert('Peringatan', 'Masukkan email!');
  
  // Masuk ke AdminTabs membawa data email
  navigation.replace('AdminTabs', {
    screen: 'Dashboard',
    params: { userEmail: email }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistem Manajemen Bisnis</Text>
      <TextInput style={styles.input} placeholder="Email / Username" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
        <Text style={styles.btnText}>Masuk ke Sistem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  btnPrimary: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});