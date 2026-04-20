import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, TextInput, TouchableOpacity, 
  ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../services/api'; // Certifique-se que o caminho da sua API está correto
import MenuAgente from '../../components/MenuAgente';

export default function PerfilAgente({ navigation, route }) {
  // Captura o ID do agente vindo da navegação
  const userId = route.params?.userId;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Carrega os dados atuais do agente ao abrir a tela
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const response = await api.get(`/api/Users/${userId}`);
        if (response.status === 200) {
          setNome(response.data.nome);
          setEmail(response.data.email);
          // A senha geralmente não é retornada por segurança, deixamos em branco para alteração
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
      }
    };

    fetchUserData();
  }, [userId]);

  // 2. Função para salvar as alterações (PUT)
  const handleUpdate = async () => {
    if (!nome || !email) {
      Alert.alert("Aviso", "Nome e E-mail são obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      // Conforme o seu Swagger, o Role do agente deve ser mantido como 1
      const payload = {
        id: userId,
        nome: nome,
        email: email,
        senha: senha, // Se estiver vazio, a API deve tratar ou você deve validar
        role: 1 
      };

      const response = await api.put(`/api/Users/${userId}`, payload);

      if (response.status === 200 || response.status === 204) {
        Alert.alert("Success", "Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating:", error);
      Alert.alert("Error", "Failed to update profile. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Feather name="log-out" size={24} color="#FF7020" />
            </TouchableOpacity>

            <View style={styles.profileContainer}>
              <View style={styles.avatarPlaceholder}>
                <Feather name="user" size={80} color="#FFF" style={{ alignSelf: 'center', marginTop: 20 }} />
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
                placeholderTextColor="#333" 
              />
            </View>

            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleUpdate}
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

      <MenuAgente />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 120, 
  },
  header: {
    backgroundColor: '#FDD835',
    height: 200,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    left: 25,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileContainer: {
    marginTop: 60,
    marginBottom: -100, 
    zIndex: 10,
    elevation: 10,
  },
  avatarPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#D1D1D1',
    borderWidth: 6,
    borderColor: '#FFF',
    justifyContent: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 25,
    elevation: 5,
  },
  content: {
    marginTop: 100,
    paddingHorizontal: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    backgroundColor: '#F2F2F2',
    height: 55,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#333',
  },
  phoneRow: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    height: 55,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#DDD',
    paddingRight: 10,
    marginRight: 15,
  },
  countryText: {
    color: '#666',
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: '#FDD835', 
    padding: 15, 
    borderRadius: 25, 
    alignItems: 'center',
    marginTop: 10
  }
});