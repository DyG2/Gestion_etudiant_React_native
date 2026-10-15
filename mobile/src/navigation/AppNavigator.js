import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';
import { headerOptions, navigationTheme } from '../theme/navigationTheme';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

const screenOptions = {
  ...headerOptions,
  headerBackButtonDisplayMode: 'minimal',
};

// Fondu lors du passage connexion ⇄ application
const authTransitionOptions = { headerShown: false, animation: 'fade' };

// Les écrans disponibles dépendent de la présence d'un token
export default function AppNavigator() {
  const { token, isRestoring } = useAuth();

  if (isRestoring) {
    return <Loader />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={screenOptions}>
        {token ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} options={authTransitionOptions} />
            <Stack.Screen
              name="StudentDetail"
              component={StudentDetailScreen}
              options={{ title: 'Détail de l’étudiant' }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ ...authTransitionOptions, title: 'Connexion' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
