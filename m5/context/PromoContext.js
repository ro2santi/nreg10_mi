import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../config/supabase';

export const PromoContext = createContext();

export const PromoProvider = ({ children }) => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('promo').select('*').order('id', { ascending: false });
      if (error) throw error;
      setPromos(data || []);
    } catch (err) {
      Alert.alert('Error Promo', err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPromo = async (newPromo) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('promo').insert([newPromo]).select().single();
      if (error) throw error;
      setPromos((prev) => [data, ...prev]);
      Alert.alert('Sukses', `Promo ${data.kode} berhasil ditambahkan!`);
      return true;
    } catch (err) {
      Alert.alert('Gagal Tambah Promo', err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  return (
    <PromoContext.Provider value={{ promos, loading, fetchPromos, addPromo }}>
      {children}
    </PromoContext.Provider>
  );
};