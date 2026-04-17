import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {SafeAreaView } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.headerBackground}>
        <View style={styles.circleDecoration} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Sign in to continue.</Text>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#C7C7CD"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="•••••"
            placeholderTextColor="#C7C7CD"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={styles.loginButton} 
          activeOpacity={0.7}
          onPress={() => navigation.replace('Home')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text
              style={[styles.footerText, { fontWeight: "bold", marginTop: 8 }]}
            >
              Signup |
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerBackground: {
    height: "30%", 
    backgroundColor: "#FFDE59",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    overflow: "hidden",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: "center", 
    alignItems: "center", 
  },
  headerTextWrapper: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FF7020",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#AAA",
    marginBottom: 8,
    marginLeft: 5,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#F5F5F5",
    height: 55,
    borderRadius: 18,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#FFDE59",
    width: "100%",
    height: 55,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  loginButtonText: {
    color: "#FF7020",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerLinks: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
});

export default Login;