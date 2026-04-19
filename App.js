import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Load from './screens/Load'; 
import Login from './screens/Login'; 
import Cadastro from './screens/Cadastro'; 
import Home from './screens/usuario/Home'; 
import Mapa from './screens/usuario/Mapa'; 
import Perfil from './screens/usuario/Perfil';
import Denuncia from './screens/usuario/Denuncia'; 
import Information from './screens/usuario/Information'; 
import MarcarVisita from './screens/usuario/MarcarVisita'; 
import Sobre from './screens/usuario/Sobre'; 
import Notification from './screens/usuario/Notification';
import VisitaAgente from './screens/agente/VisitaAgente';
import HomeAgente from './screens/agente/HomeAgente';
import InformationAgente from './screens/agente/InformationAgente';
import AlertasAgente from './screens/agente/AlertasAgente';
import MapaAgente from './screens/agente/MapaAgente';
import PerfilAgente from './screens/agente/PerfilAgente';
import YesNoAgente from './screens/agente/YesNoAgente';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Load"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Load" component={Load} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Denuncia" component={Denuncia} />
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="MarcarVisita" component={MarcarVisita} />
        <Stack.Screen name="Sobre" component={Sobre} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="VisitaAgente" component={VisitaAgente} />
        <Stack.Screen name="HomeAgente" component={HomeAgente} />
        <Stack.Screen name="InformationAgente" component={InformationAgente} />
        <Stack.Screen name="AlertasAgente" component={AlertasAgente} />
        <Stack.Screen name="MapaAgente" component={MapaAgente} />
        <Stack.Screen name="PerfilAgente" component={PerfilAgente} />
        <Stack.Screen name="YesNoAgente" component={YesNoAgente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}