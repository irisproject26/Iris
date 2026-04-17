import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'; 

const Load = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login"); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFDE59" />
      
      <View style={styles.circleDecorator} />

      <View style={styles.content}>
        <Image
          source={require("../assets/menina.png")} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.brandName}>IRIS</Text>
          <Text style={styles.tagline}>Imaging-based Risk Identification System</Text>
        </View>

        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF7A21" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>

      <Text style={styles.footerText}>Version 1.0.0</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFDE59", 
    justifyContent: "center",
    alignItems: "center",
  },
  circleDecorator: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#FFF7D6',
    top: -100,
    right: -100,
    opacity: 0.5,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  brandName: {
    fontSize: 48,
    fontWeight: "900",
    color: "#FF7A21", 
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: "#A67C00",
    fontWeight: "500",
    marginTop: -5,
  },
  loaderContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#E67E22",
    fontWeight: "600",
    fontSize: 14,
  },
  footerText: {
    position: "absolute",
    bottom: 30,
    color: "#A67C00",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Load;