import React from 'react';
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

const Sobre = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={28} color="#FF8C00" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>IRIS</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.yellowBackground}>
          <Image 
            source={require('../../assets/menina.png')} 
            style={styles.avatarImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.whiteCard}>
          
          <Text style={styles.mainTitle}>IRIS</Text>
          <Text style={styles.subTitle}>Imaging-based Risk Identification System</Text>
          
          <Text style={styles.description}>
            An intelligent monitoring system designed to assist both Brazilians and health agents in 
            combating these endemic diseases. The solution will utilize... 
            <Text style={styles.readMore}> Read More</Text>
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Users</Text>
              <Text style={styles.statValue}>+10000</Text>
            </View>
            <View style={[styles.statBox, styles.statBorder]}>
              <Text style={styles.statLabel}>Cameras in Brazil</Text>
              <Text style={styles.statValue}>+100</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Rate</Text>
              <View style={styles.rateRow}>
                 <Ionicons name="star" size={14} color="#FFD700" />
                 <Text style={styles.statValue}> 4.5</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Problem</Text>
          <Text style={styles.description}>
            Um sistema inteligente de monitoramento que tem como objetivo auxiliar tanto os brasileiros 
            quanto os agentes de saúde no combate à essas endemias. A solução utilizará... 
            <Text style={styles.readMore}> Read More</Text>
          </Text>

          <View style={styles.imageContainer}>
            <Image 
              source={require('../../assets/lixo.png')} 
              style={styles.trashImage}
            />
            <View style={styles.dimensionBadge}>
              <Text style={styles.dimensionText}>265 × 159</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Solution</Text>
          <Text style={styles.description}>
            Um sistema inteligente de monitoramento que tem como objetivo auxiliar tanto os brasileiros 
            quanto os agentes de saúde no combate à essas endemias. A solução utilizará... 
            <Text style={styles.readMore}> Read More</Text>
          </Text>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginLeft: 15,
  },
  scrollView: {
    flex: 1,
  },
  yellowBackground: {
    backgroundColor: '#FFD95A',
    height: 220,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  avatarImage: {
    width: '100%',
    height: 250,
    marginBottom: -20, 
  },
  whiteCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  subTitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginTop: 25,
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: '#444',
    lineHeight: 20,
    textAlign: 'justify',
  },
  readMore: {
    color: '#FF8C00',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingVertical: 10,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#EEE',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  trashImage: {
    width: '100%',
    height: 160,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#00A3FF',
  },
  dimensionBadge: {
    backgroundColor: '#00A3FF',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: -15,
  },
  dimensionText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Sobre;