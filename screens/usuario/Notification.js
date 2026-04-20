import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList,  
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';

const NOTIFICATIONS = [
  { id: '1', title: 'Visit Scheduled', description: 'Your visit for tomorrow at 11:30 AM has been confirmed by an agent.' },
  { id: '2', title: 'New Alert in your area', description: 'A medium alert for Dengue was issued in your neighborhood. Check the map.' },
  { id: '3', title: 'Report Update', description: 'The report you submitted on 02/25 has been reviewed by the health department.' },
  { id: '4', title: 'Vaccination Day', description: 'Dont forget! Today is the National Vaccination day. Find a center near you.' },
];

export default function Notificacoes({ navigation }) { 
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.orangeCircle} />
        
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription} numberOfLines={3}>
            {item.description}
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="trash-2" size={14} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="star" size={14} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={styles.yellowSection}>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterBox}>
            <Feather name="star" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterText}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterTab, styles.activeFilterTab]}>
            <Text style={[styles.filterText, styles.activeFilterText]}>Unread</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.whiteSheet}>
          <FlatList
            data={NOTIFICATIONS}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listPadding}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <Text style={styles.sectionTitle}>Today</Text>}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50, 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2994A',
    marginLeft: 20,
  },
  yellowSection: {
    flex: 1,
    backgroundColor: '#FDD835',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 80,
    paddingBottom: 15,
  },
  filterBox: {
    width: 45,
    height: 45,
    backgroundColor: '#EEE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  filterTab: {
    backgroundColor: '#EEE',
    paddingHorizontal: 20,
    height: 45,
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeFilterTab: {
    backgroundColor: '#FFF',
  },
  filterText: {
    color: '#999',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#F2994A',
  },
  whiteSheet: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 20,
  },
  listPadding: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#F2994A',
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 10,
  },
  card: {
    marginBottom: 25,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  orangeCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F2994A',
    marginRight: 12,
    marginTop: 6,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F2994A',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    marginLeft: 10,
    overflow: 'hidden',
  },
  actionButton: {
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
});