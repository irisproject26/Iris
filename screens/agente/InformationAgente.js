import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity,  
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';

const MonitoringScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#FF8C00" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Information</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>National Monitoring Map</Text>
          
          <View style={styles.mapContainer}>
            <Image 
              source={require('../../assets/nationalmap.png')} 
              style={styles.mapImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendCol}>
              <Text style={styles.legendTitle}>Sensor Distribution</Text>
              <Text style={styles.legendSubtitle}>Indicated by the orange dots</Text>
            </View>
            <View style={styles.legendCol}>
              <Text style={styles.legendTitle}>Region on Alert</Text>
              <View style={styles.statusItem}>
                <Text style={styles.statusText}>High alert</Text>
                <View style={[styles.statusBox, { backgroundColor: '#FF4C4C' }]} />
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.statusText}>Medium alert</Text>
                <View style={[styles.statusBox, { backgroundColor: '#4CAF50' }]} />
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.statusText}>Low alert</Text>
                <View style={[styles.statusBox, { backgroundColor: '#FFD700' }]} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>News Section</Text>
          <View style={styles.newsInnerCard}>
            <Text style={styles.newsHeadline}>"Dia D" de Vacinação Contra a Dengue.</Text>
            <Text style={styles.newsDescription}>
              O Ministério da Saúde inicia a mobilização nacional para aplicação da vacina Qdenga em municípios prioritários. Verifique no mapa do IRIS as unidades de saúde mais próximas de você.
            </Text>
            <TouchableOpacity style={styles.plusButton}>
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: '#FFD95A', marginBottom: 40 }]}>
            <Text style={[styles.cardTitle, { color: '#FF8C00' }]}>One Health</Text>
            <View style={styles.zoonosisCard}>
               <Text style={styles.zoonosisTitle}>Zoonosis surveillance</Text>
               <Text style={styles.zoonosisContent}>
                 Expansão da IA para detecção de roedores em bueiros monitorados no Sudeste. 
                 Risco de Leptospirose reduzido em 15% nas áreas com alertas preventivos de descarte irregular.
               </Text>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD95A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    paddingTop: 50, 
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginLeft: 15,
  },
  content: {
    padding: 15,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 15,
  },
  mapContainer: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  legendCol: {
    flex: 1,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 4,
  },
  legendSubtitle: {
    fontSize: 11,
    color: '#666',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  statusText: {
    fontSize: 11,
    color: '#444',
  },
  statusBox: {
    width: 25,
    height: 12,
    borderRadius: 4,
    marginLeft: 5,
  },
  newsInnerCard: {
    borderWidth: 1,
    borderColor: '#FF8C00',
    borderRadius: 15,
    padding: 15,
    position: 'relative',
  },
  newsHeadline: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 12,
    color: '#444',
    lineHeight: 18,
  },
  plusButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FF8C00',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  zoonosisCard: {
    backgroundColor: '#FFE58F',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  zoonosisTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 5,
  },
  zoonosisContent: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
  },
});

export default MonitoringScreen;