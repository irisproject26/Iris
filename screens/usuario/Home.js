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
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../../components/Menu";

const { width } = Dimensions.get("window");

const Home = ({ navigation, route }) => {
  
  // Pegando o userId que veio do login com segurança
  const userId = route?.params?.userId;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDE59" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.yellowHeader}>
          <View style={styles.topIcons}>
            {/* BOTÃO DE SAIR */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.logoutIcon}>←</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bellBadge}
              onPress={() => navigation.navigate("Notification")}
            >
              <Image
                source={require("../../assets/bell1.png")}
                style={styles.bellImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.subtitle}>We're happy to see you again.</Text>
          </View>
        </View>

        <View style={styles.whiteBody}>
          <Text style={styles.sectionTitle}>Explore the functionalities</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => navigation.navigate("Information")}
            >
              <Text style={styles.outlineIcon}>ⓘ</Text>
              <Text style={styles.outlineText}>Information</Text>
            </TouchableOpacity>

            {/* BOTÃO DE DENÚNCIA CORRIGIDO: Agora passa o userId */}
            <TouchableOpacity
              style={styles.outlineButton}
              onPress={() => 
                navigation.navigate("Denuncia", { 
                  userId: userId 
                })
              }
            >
              <Image
                source={require("../../assets/reportImg.png")}
                style={styles.reportButtonImage}
                resizeMode="contain"
              />
              <Text style={styles.outlineText}>Report</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.visitCard}>
            <View style={styles.visitLeft}>
              <Image
                source={require("../../assets/cal.png")}
                style={styles.calendarImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.visitRight}>
              <Text style={styles.cardTitle}>Visit</Text>
              <Text style={styles.description}>
                Schedule your visit with us! Pick a date and tell us the reason
                of your visit. We're always here for you.
              </Text>
              
              <TouchableOpacity
                style={styles.orangeButton} 
                onPress={() =>
                  navigation.navigate("MarcarVisita", {
                    userId: userId,
                  })
                }
              >
                <Text style={styles.buttonText}>Schedule</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Campaigns</Text>
          <View style={styles.campaignBanner}>
            <Image
              source={require("../../assets/campanha.png")}
              style={styles.campaignImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.irisContainer}>
            <View style={styles.irisInfo}>
              <Text style={styles.cardTitle}>IRIS</Text>
              <Text style={styles.description}>
                Get to know better about IRIS (Imaging-based Risk Identification
                System) and learn more about its goal.
              </Text>
              <TouchableOpacity
                style={styles.orangeButton}
                onPress={() => navigation.navigate("Sobre")}
              >
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

      <Menu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  yellowHeader: {
    backgroundColor: "#FFDE59",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  bellBadge: {
    backgroundColor: "#FFBD59",
    padding: 8,
    borderRadius: 20,
  },
  bellImage: { width: 24, height: 24 },
  welcomeSection: { marginBottom: 10 },
  welcomeText: { fontSize: 26, fontWeight: "900", color: "#E67E22" },
  subtitle: { fontSize: 16, color: "#A67C00", fontWeight: "500" },

  whiteBody: {
    backgroundColor: "#FFF",
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF7A21",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  outlineButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 15,
    paddingVertical: 12,
    width: "48%",
    justifyContent: "center",
  },
  outlineIcon: { marginRight: 8, fontSize: 18, color: "#666" },
  reportButtonImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  outlineText: { color: "#444", fontWeight: "500" },
  visitCard: { flexDirection: "row", marginBottom: 35, alignItems: "center" },
  visitLeft: { flex: 1, justifyContent: "center", alignItems: "center" },
  visitRight: { flex: 2, paddingLeft: 10 },
  calendarImage: { width: 90, height: 90 },
  campaignBanner: {
    width: "100%",
    backgroundColor: "#FFF5E6",
    borderRadius: 25,
    marginBottom: 30,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#FFE0B5",
  },
  campaignImage: { width: "100%", height: 200, borderRadius: 20 },
  irisContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 30,
  },
  irisInfo: { flex: 1.3, paddingBottom: 10 },
  irisImageContainer: { flex: 0.7, alignItems: "flex-end" },
  girlImage: { width: 130, height: 160, marginBottom: -10 },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF7A21",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 15,
  },
  orangeButton: {
    backgroundColor: "#FF7A21",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    alignSelf: "flex-start",
    elevation: 2,
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  logoutButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 8,
    borderRadius: 12,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutIcon: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E67E22",
  },
});

export default Home;