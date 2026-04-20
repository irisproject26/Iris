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
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/api";

const Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!name || !password) {
      Alert.alert("Error", "Enter your email and password.");
      return;
    }

    try {
      // Chamada para sua API
      const response = await api.post("/api/Users/Login", {
        email: name,
        senha: password,
      });

      if (response.status === 200) {
        const { id, role } = response.data;

        if (role === 1) {
          // Agora o nome "HomeAgente" existe no App.js
          navigation.replace("HomeAgente", { userId: id });
        } else {
          navigation.replace("Home", { userId: id });
        }
      }
    } catch (error) {
      console.log(error);
      if (!error.response) {
        Alert.alert("Error ", "The server was not found.");
      } else if (error.response.status === 401) {
        Alert.alert("Error", "Invalid email or password.");
      } else {
        Alert.alert("Erro", "Internal server error.");
      }
    }
  };

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
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor="#C7C7CD"
            autoCapitalize="none"
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
          onPress={handleLogin} // <--- CHAMA A FUNÇÃO QUE VALIDA, NÃO VAI DIRETO!
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
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
  circleDecoration: {
    // Adicionado para não dar erro já que está no JSX
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    position: "absolute",
    top: -20,
    right: -20,
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
