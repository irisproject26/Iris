import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuAgente from "../../components/MenuAgente";

const { width } = Dimensions.get("window");

const HomeAgente = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDE59" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.yellowHeader}>
          <View style={styles.topIcons}>
            <View /> 
            <TouchableOpacity style={styles.bellBadge} onPress={() => navigation.navigate('Notification')}>
              <Image
                source={require("../../assets/bell1.png")}
                style={styles.bellImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>
              Welcome, <Text style={styles.username}>Agent!</Text>
            </Text>
            <Text style={styles.subtitle}>We're happy to see you again.</Text>
          </View>
        </View>

        <View style={styles.whiteBody}>
          <Text style={styles.sectionTitle}>Explore the functionalities</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.outlineButton} onPress={() => navigation.navigate('InformationAgente')}>
              <Text style={styles.outlineIcon}>ⓘ</Text>
              <Text style={styles.outlineText}>Information</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => navigation.navigate('Denuncia')}
            >
              <Image
                source={require("../../assets/reportImg.png")}
                style={styles.reportButtonImage}
                resizeMode="contain"
              />
              <Text style={styles.outlineText}>Report</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.visitHeaderRow}>
            <Text style={styles.sectionTitle}>Visit Requests</Text>
          </View>
          
          <Text style={styles.visitInstruction}>
            See the requests of the users. You can confirm or deny.
          </Text>
          <Text style={styles.visitDate}>02/28/2025</Text>

          <View style={styles.requestsContainer}>
            <View style={styles.requestItem}>
              <View>
                <Text style={styles.requestType}>School</Text>
                <Text style={styles.requestAddress}>Avenida Paulista, 28 - SP, Brazil</Text>
              </View>
              <View style={styles.statusContainer}>
                <Text style={styles.newBadge}>new</Text>
                <View style={styles.orangeDot} />
              </View>
            </View>

            <View style={styles.requestItem}>
              <View>
                <Text style={styles.requestType}>Company</Text>
                <Text style={styles.requestAddress}>Avenida Paulista, 45 - SP, Brazil</Text>
              </View>
              <View style={styles.statusContainer}>
                <View style={styles.orangeDot} />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.seeVisitsButton} onPress={() => navigation.navigate('VisitaAgente')}>
            <Text style={styles.buttonText}>See visits</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Campaigns</Text>
          <View style={styles.campaignBanner}>
            <Image
              source={require("../../assets/campanha.png")}
              style={styles.campaignImage}
              resizeMode="stretch"
            />
          </View>
          
          <View style={styles.paginationDots}>
             <View style={[styles.dot, styles.activeDot]} />
             <View style={styles.dot} />
             <View style={styles.dot} />
          </View>
          {/* 
          <TouchableOpacity style={styles.addCampaignButton}>
            <Text style={styles.addCampaignText}>Add more Campaigns</Text>
          </TouchableOpacity> */}

          <View style={styles.irisContainer}>
            <View style={styles.irisInfo}>
              <Text style={styles.cardTitle}>IRIS</Text>
              <Text style={styles.description}>
                Get to know better about IRIS (Imaging-based Risk Identification
                System) and learn more about its goal.
              </Text>
              <TouchableOpacity style={styles.orangeButton} onPress={() => navigation.navigate('Sobre')}>
                <Text style={styles.buttonText}>Learn more</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.irisImageContainer}>
              <Image
                source={require("../../assets/menina.png")}
                style={styles.girlImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <MenuAgente />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100
  },
  yellowHeader: {
    backgroundColor: '#FFDE59',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bellBadge: {
    backgroundColor: '#FFBD59',
    padding: 10,
    borderRadius: 25,
  },
  bellImage: { width: 24, height: 24 },
  welcomeSection: { marginBottom: 10 },
  welcomeText: { fontSize: 28, fontWeight: '900', color: '#E67E22' },
  username: { color: '#E67E22' },
  subtitle: { fontSize: 18, color: '#A67C00', fontWeight: '500' },

  whiteBody: {
    backgroundColor: '#FFF',
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF7A21',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    paddingVertical: 12,
    width: '48%',
    justifyContent: 'center',
  },
  outlineIcon: { marginRight: 8, fontSize: 18, color: '#666' },
  reportButtonImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  outlineText: { color: '#444', fontWeight: '600' },
  
  visitInstruction: { fontSize: 14, color: '#666', marginBottom: 5 },
  visitDate: { fontSize: 12, color: '#999', textAlign: 'right', marginBottom: 10 },
  
  requestsContainer: {
    borderWidth: 1,
    borderColor: '#FF7A21',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE0B5',
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  requestType: { fontSize: 16, fontWeight: 'bold', color: '#FF7A21' },
  requestAddress: { fontSize: 10, color: '#666' },
  statusContainer: { alignItems: 'center' },
  newBadge: { color: '#FF7A21', fontSize: 10, fontWeight: 'bold' },
  orangeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF7A21', marginTop: 4 },
  
  seeVisitsButton: {
    backgroundColor: '#FF7A21',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 40,
  },

  campaignBanner: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  campaignImage: { width: '100%', height: 180 },
  paginationDots: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#DDD', marginHorizontal: 3 },
  activeDot: { backgroundColor: '#999' },
  
  addCampaignButton: {
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#FF7A21',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 30,
  },
  addCampaignText: { color: '#FF7A21', fontWeight: 'bold' },

  irisContainer: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 10, marginBottom: 30 },
  irisInfo: { flex: 1.3, paddingBottom: 10 },
  irisImageContainer: { flex: 0.7, alignItems: 'flex-end' },
  girlImage: { width: 130, height: 180, marginBottom: -10 },
  cardTitle: { fontSize: 24, fontWeight: 'bold', color: '#FF7A21', marginBottom: 8 },
  description: { fontSize: 14, color: '#444', lineHeight: 20, marginBottom: 15 },
  orangeButton: {
    backgroundColor: '#FF7A21',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
});

export default HomeAgente;