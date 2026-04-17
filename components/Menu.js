import React, { useState } from 'react'; 
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; // Para saber em que tela estamos

export default function Menu() {
  const navigation = useNavigation();
  const route = useRoute();

  // O activeTab agora se baseia no nome da rota atual do sistema
  const renderNavItem = (tabName, screenName, IconComponent, iconName, isLibIonicons = false) => {
    // Verifica se a tela atual é esta para deixar o ícone laranja
    const isActive = route.name === screenName;

    return (
      <View style={styles.itemWrapper}>
        {isActive && <View style={styles.activeDot} />}
        
        <TouchableOpacity
          onPress={() => navigation.navigate(screenName)} // 2. Agora ele navega de verdade!
          activeOpacity={0.8}
          style={[
            styles.navItem,
            isActive ? styles.activeButtonCircle : null,
            isActive ? { backgroundColor: '#FF6B00' } : null
          ]}
        >
          {isLibIonicons ? (
            <Ionicons name={iconName} size={isActive ? 30 : 24} color={isActive ? "white" : "#888"} />
          ) : (
            <Feather name={iconName} size={isActive ? 26 : 24} color={isActive ? "white" : "#888"} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.navBarContainer}>
      <View style={styles.navBar}>
        {/* Nomes das telas devem ser iguais aos do App.js */}
        {renderNavItem('home', 'Home', Feather, 'home')}
        {renderNavItem('search', 'Mapa', Ionicons, 'search', true)}
        {renderNavItem('profile', 'Perfil', Feather, 'user')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    height: 90, 
    backgroundColor: 'transparent', // Mudei para transparent para não cobrir o fundo arredondado
    justifyContent: 'center',
    zIndex: 999,
  },
  navBar: {
    width: '92%',
    height: 58,
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FF6B00',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  activeButtonCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginTop: -40, 
    borderWidth: 5,
    borderColor: 'white', 
    elevation: 8,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF6B00',
    position: 'absolute',
    top: -48, 
  }
});