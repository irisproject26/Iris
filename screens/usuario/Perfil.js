import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../../components/Menu";
import api from "../../services/api";

export default function Perfil({ route }) {
  // Pega o userId vindo da navegação
  const userId = route?.params?.userId;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Busca os dados do usuário ao abrir a tela
  useEffect(() => {
    async function loadUserData() {
      if (!userId) {
        Alert.alert("Erro", "Usuário não identificado.");
        setFetching(false);
        return;
      }

      try {
        const response = await api.get(`/api/Users/${userId}`);
        if (response.status === 200) {
          setNome(response.data.nome);
          setEmail(response.data.email);
          // Não carregamos a senha por segurança, o usuário digita uma nova se quiser
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "We were unable to load the profile data.");
      } finally {
        setFetching(false);
      }
    }

    loadUserData();
  }, [userId]);

  const handleSaveChanges = async () => {
    if (!nome || !email) {
      Alert.alert("Error", "Name and email are required.");
      return;
    }

    try {
      setLoading(true);
      // Conforme seu Swagger: PUT /api/Users/{id}
      const response = await api.put(`/api/Users/${userId}`, {
        id: userId,
        nome: nome,
        email: email,
        senha: senha, // Envia a senha atual ou a nova digitada
        role: 0 // Valor padrão conforme seu print do Swagger
      });

      if (response.status === 200 || response.status === 204) {
        Alert.alert("Success", "Profile updated successfully!");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to update profile. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FDD835" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.profileContainer}>
              <View style={styles.avatarPlaceholder}>
                <Feather
                  name="user"
                  size={80}
                  color="#FFF"
                  style={{ alignSelf: "center", marginTop: 20 }}
                />
              </View>
              <TouchableOpacity style={styles.cameraIcon}>
                <Feather name="camera" size={18} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Your name"
                placeholderTextColor="#A1A1A1"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Your e-mail"
                placeholderTextColor="#A1A1A1"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>New Password (Optional)</Text>
              <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                placeholder="••••••"
                placeholderTextColor="#A1A1A1"
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveChanges}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Menu />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    backgroundColor: "#FDD835",
    height: 200,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  profileContainer: {
    marginBottom: -60,
    zIndex: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  avatarPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#D1D1D1",
    borderWidth: 6,
    borderColor: "#FFF",
    justifyContent: "center",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  content: {
    marginTop: 80,
    paddingHorizontal: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000",
  },
  input: {
    backgroundColor: "#F2F2F2",
    height: 55,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 15,
    color: "#333",
  },
  phoneRow: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    height: 55,
    borderRadius: 25,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#DDD",
    paddingRight: 10,
    marginRight: 15,
  },
  countryText: {
    color: "#666",
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: "#FF6B00", // Laranja combinando com o Menu
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    // Sombra para dar elevação
    elevation: 8,
    shadowColor: "#FF6B00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    // Borda leve para definir o formato
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "800", // Bem negrito estilo Retro
    fontSize: 18,
    letterSpacing: 1, // Espaçamento moderno entre letras
    textTransform: "uppercase", // Estilo de botão de ação
  },
});
