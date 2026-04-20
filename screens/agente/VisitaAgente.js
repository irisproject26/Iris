import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Alert, 
  ActivityIndicator,
  StyleSheet // <--- Faltava adicionar isso aqui!
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../services/api'; 
import MenuAgente from '../../components/MenuAgente';

export default function VisitaAgente({ navigation, route }) {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const userId = route.params?.userId;

  // Função para buscar dados de ambos os endpoints simultaneamente
  const fetchVisitas = async () => {
    setLoading(true);
    try {
      // Executa as duas chamadas ao mesmo tempo
      const [resPendentes, resAceitas] = await Promise.all([
        api.get('/api/Visitas/pendentes'),
        api.get('/api/Visitas/aceitas')
      ]);

      // Combina os arrays de retorno em um só
      const todasAsVisitas = [...resPendentes.data, ...resAceitas.data];
      
      // Opcional: Ordenar por ID ou Data (ajuste conforme necessário)
      todasAsVisitas.sort((a, b) => b.id - a.id);

      setVisitas(todasAsVisitas);
    } catch (error) {
      console.error("Error retrieving visits:", error);
      Alert.alert("Error", "We were unable to load server visits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.headerArea}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeAgente', { userId: userId })}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Visits</Text>
          
          <TouchableOpacity onPress={fetchVisitas}>
             <Ionicons name="refresh" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.whiteSheet}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF751F" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={visitas}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No visits.</Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.card} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('YesNoAgente', { visita: item, userId: userId })}
              >
                <View style={styles.cardOrange}>
                  <View style={{ flex: 1 }}>
                    {/* Campos baseados no seu JSON de resposta */}
                    <Text style={styles.cardPlace}>{item.addressType || 'Residência'}</Text>
                    <Text style={styles.cardAddress}>{item.address}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={26} color="white" />
                </View>
                
                <View style={styles.cardFooter}>
                  <View style={styles.footerItem}>
                    <Ionicons name="calendar-outline" size={14} color="#666" />
                    <Text style={styles.footerText}>
                      {item.scheduledDate ? item.scheduledDate.split('T')[0] : 'Pendente'}
                    </Text>
                  </View>
                  
                  <View style={styles.footerItem}>
                    {/* Status 0 = Pendente (Laranja), Outros = Aceito (Verde) */}
                    <View 
                      style={[
                        styles.statusDot, 
                        { backgroundColor: item.status === 0 ? '#FF751F' : '#4CAF50' }
                      ]} 
                    />
                    <Text style={styles.footerText}>
                      {item.status === 0 ? "Pendente" : "Aceita"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <MenuAgente />
    </SafeAreaView>
  );
}

// O restante do seu código (styles) permanece igual

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFDE59' },
  headerArea: { paddingTop: 20, paddingHorizontal: 20, alignItems: 'center' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 25 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FF751F' },
  tabWrapper: { flexDirection: 'row', backgroundColor: '#EAEAEA', borderRadius: 12, padding: 4, width: '95%' },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: 'white' },
  tabText: { color: '#888', fontWeight: '600' },
  textActive: { color: '#FF751F' },
  whiteSheet: { flex: 1, backgroundColor: 'white', marginTop: 25, borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: 20, paddingTop: 30 },
  listTitle: { fontSize: 20, fontWeight: 'bold', color: '#FF751F', marginBottom: 20 },
  card: { marginBottom: 15, borderRadius: 15, overflow: 'hidden', elevation: 3, backgroundColor: 'white' },
  cardOrange: { backgroundColor: '#FF751F', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  cardPlace: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  cardAddress: { color: 'white', fontSize: 12, opacity: 0.9 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#F2F2F2' },
  footerItem: { flexDirection: 'row', alignItems: 'center' },
  footerText: { fontSize: 11, color: '#666', marginLeft: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4 }
});