import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import MenuAgente from '../../components/MenuAgente';

export default function Perfil({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            {/* BOTÃO DE LOGOUT / VOLTAR */}
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
              <TextInput style={styles.input} placeholder="Your name" placeholderTextColor="#A1A1A1" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Your e-mail" 
                placeholderTextColor="#A1A1A1"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput style={styles.input} secureTextEntry placeholder="••••••" placeholderTextColor="#333" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone number</Text>
              <View style={styles.phoneRow}>
                <TouchableOpacity style={styles.countryPicker}>
                  <Text style={styles.countryText}>+55 </Text>
                  <Feather name="chevron-down" size={14} color="#666" />
                </TouchableOpacity>
                <TextInput 
                  style={styles.phoneInput} 
                  placeholder="(11) 99999-9999" 
                  keyboardType="phone-pad"
                />
              </View>
            </View>
            
            <TouchableOpacity style={styles.saveButton}>
              <Text style={{ fontWeight: '700', fontSize: 16 }}>Save Changes</Text>
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