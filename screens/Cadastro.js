import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert, 
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import api from "../services/api"; 

const Cadastro = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(""); 
  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Atenção", "Preencha nome, e-mail e senha.");
      return;
    }

    try {
      const userData = {
        nome: name,
        email: email,
        senha: password,
        role: 0 
      };

      const response = await api.post("/api/Users", userData);

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Success!", "Your account has been successfully created!", [
          { text: "Start", onPress: () => navigation.replace("Home") }
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      let msg = "We were unable to connect to the server.";
      if (error.response) {
        msg = `Error: ${error.response.data.message || "Invalid data"}`;
      }
      Alert.alert("Error", msg);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.headerBackground}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.title}>Create new Account</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.subtitle}>
              Already Registered? Log in here.
            </Text>
          </TouchableOpacity>
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
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="#C7C7CD"
            keyboardType="email-address"
            autoCapitalize="none" // Evita que o celular coloque letra maiúscula no e-mail
            value={email}
            onChangeText={setEmail}
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
          style={styles.signUpButton} 
          activeOpacity={0.7}
          onPress={handleSignUp} // CHAMA A FUNÇÃO DE INTEGRAÇÃO
        >
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
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
    height: "25%",
    backgroundColor: "#FFDE59", 
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  backButton: {
    marginTop: 20,
    marginLeft: 25,
  },
  backArrow: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#000",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: "center", 
    alignItems: "center",
  },
  headerTextWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF7020",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: "#FF7020",
    fontWeight: "500",
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    backgroundColor: "#F2F2F2",
    height: 48,
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 15,
    color: "#333",
  },
  signUpButton: {
    backgroundColor: "#FFDE59",
    width: "100%",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  signUpButtonText: {
    color: "#FF7020",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Cadastro;