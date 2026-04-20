import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api'; // Ajuste o caminho se necessário

export default function YesNoAgente({ route, navigation }) {
  const { visita, userId } = route.params;
  const [updating, setUpdating] = useState(false);

  const handleUpdateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const response = await api.patch(`/api/Visitas/status/${visita.id}`, newStatus, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200 || response.status === 204) {
        const msg = newStatus === 1 ? "Visit successfully scheduled!" : "Visit marked as pending.";
        Alert.alert("Success", msg, [
          { text: "OK", onPress: () => navigation.navigate('VisitaAgente', { userId }) }
        ]);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Alert.alert("Error", "Error updating status:");
    } finally {
      setUpdating(false);
    }
  };

  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || 'Não informado'}</Text>
      <View style={styles.divider} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.yellowDecoration}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
        <View style={[styles.circle, { top: 20, right: 20, opacity: 0.6 }]} />
        <View style={[styles.circle, { top: 80, left: -30, width: 120, height: 120, opacity: 0.4 }]} />
        <View style={[styles.circle, { top: -20, left: 150, opacity: 0.5 }]} />
      </View>

      <View style={styles.whiteCard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Information</Text>

          {/* Dados dinâmicos vindos do banco */}
          <InfoRow label="Name" value={visita.user?.nome} />
          <InfoRow label="Type" value={visita.addressType} />
          <InfoRow label="Address" value={visita.address} />
          <InfoRow label="Date" value={visita.scheduledDate?.split('T')[0]} />
          <InfoRow label="Time" value={visita.scheduledDate ? visita.scheduledDate.split('T')[1].substring(0, 5) : null} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Reason for visit</Text>
            <Text style={styles.reasonText}>{visita.reason || 'Nenhuma descrição fornecida.'}</Text>
            <View style={styles.divider} />
          </View>

          <Text style={[styles.label, { marginTop: 10 }]}>Status</Text>

          {updating ? (
            <ActivityIndicator size="large" color="#FF751F" style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.btn, styles.btnYes]} 
                onPress={() => handleUpdateStatus(1)} // 1 = Aceita
              >
                <Text style={styles.btnText}>Accept</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.btn, styles.btnNo]}
                onPress={() => handleUpdateStatus(0)} // 0 = Pendente
              >
                <Text style={styles.btnText}>Deny</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFDE59' },
  yellowDecoration: { height: 220, overflow: 'hidden' },
  backBtn: { marginTop: 50, marginLeft: 20, zIndex: 10 },
  circle: { position: 'absolute', backgroundColor: 'white', width: 90, height: 90, borderRadius: 60 },
  whiteCard: { 
    flex: 1, 
    backgroundColor: 'white', 
    marginTop: -50, 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    padding: 30 
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FF751F', marginBottom: 30 },
  infoRow: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#FF751F', marginBottom: 4 },
  value: { fontSize: 15, color: '#333' },
  reasonText: { fontSize: 14, color: '#555', lineHeight: 20 },
  divider: { height: 1.5, backgroundColor: '#FF751F', marginTop: 10, opacity: 0.3 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, paddingBottom: 30 },
  btn: { width: '45%', height: 45, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  btnYes: { backgroundColor: '#58D32E' },
  btnNo: { backgroundColor: '#F94144' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});