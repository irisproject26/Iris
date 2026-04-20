import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import React, { useState } from 'react';

import MenuAgente from "../../components/MenuAgente";

const { width } = Dimensions.get("window");

const AlertasAgente = ({ navigation }) => {
  const [confirmado, setConfirmado] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDE59" />
      
      <Text style={styles.mainTitle}>IA Alert</Text>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <Image 
            source={require('../../assets/tire.png')} 
            style={styles.imageIA} 
            resizeMode="cover"
          />
          
          <View style={styles.row}>
            <View>
               <Text style={styles.urgency}>High Urgency</Text>
               <Text style={styles.label}>Location</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
               <Text style={styles.accuracy}>Accuracy - 98.4%</Text>
               <Text style={styles.dateText}>Date: 02/02/2026</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.address}>Avenida Paulista, 26 - SP, Brazil</Text>
              <Text style={styles.gpsText}>23°32'55.6"S 46°38'58.0"W</Text>
            </View>
            <TouchableOpacity style={styles.mapBtn}>
              <Text style={styles.mapText}>Map</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.descBox}>
            <Text style={styles.descTitle}>Description</Text>
            <Text style={styles.descText}>
              Tire with rainwater accumulation detected by IRIS Unit #042. GPS verified. 
              Immediate intervention required: mechanical removal and larvicide application. 
              Target is in a high-traffic zone.
            </Text>
          </View>

          <Text style={[styles.question, { marginTop: 20 }]}>The classification is correct?</Text>
          
          <View style={styles.btnGroup}>
            <TouchableOpacity 
              style={[styles.choiceBtn, confirmado === true && {backgroundColor: '#FDD835'}]}
              onPress={() => setConfirmado(true)}
            >
              <Text style={styles.btnText}>Yes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.choiceBtn, confirmado === false && {backgroundColor: '#FDD835'}]}
              onPress={() => setConfirmado(false)}
            >
              <Text style={styles.btnText}>No</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
        </View>
      </ScrollView>

      <MenuAgente />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFDE59' },
  scrollContent: { padding: 20, paddingBottom: 120 },
  mainTitle: { textAlign: 'center', fontSize: 32, fontWeight: 'bold', marginTop: 10, color: '#FF751F' },
  card: { backgroundColor: 'white', borderRadius: 30, padding: 15, elevation: 5 },
  imageIA: { width: '100%', height: 250, borderRadius: 25, borderWidth: 2, borderColor: '#FF4444' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'flex-start' },
  urgency: { color: '#FF4444', fontWeight: 'bold', fontSize: 18 },
  accuracy: { color: '#D35400', fontSize: 14, fontWeight: '500' },
  dateText: { color: '#D35400', fontSize: 14 },
  label: { fontWeight: 'bold', color: '#555', fontSize: 16, marginTop: 5 },
  locationRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  address: { color: '#666', fontSize: 14 },
  gpsText: { color: '#666', fontSize: 13 },
  mapBtn: { backgroundColor: '#FF7A21', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 12 },
  mapText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  descBox: { backgroundColor: 'white', borderWidth: 1, borderColor: '#FF7A21', borderRadius: 15, padding: 12, marginTop: 15 },
  descTitle: { fontWeight: 'bold', color: '#E67E22', textAlign: 'center', fontSize: 16, marginBottom: 5 },
  descText: { color: '#E67E22', fontSize: 13, textAlign: 'left', lineHeight: 18 },
  question: { textAlign: 'center', color: '#444', fontSize: 15, fontWeight: '500' },
  btnGroup: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 10 },
  choiceBtn: { backgroundColor: '#FFE082', paddingHorizontal: 30, paddingVertical: 8, borderRadius: 15, width: 100, alignItems: 'center' },
  btnText: { color: '#666', fontWeight: '500' },
  progressBarBg: { height: 6, backgroundColor: '#FFCC80', borderRadius: 3, marginTop: 25, width: '100%', overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#FF7A21', width: '40%' },
});

export default AlertasAgente;