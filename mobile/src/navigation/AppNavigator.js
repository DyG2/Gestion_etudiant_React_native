import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import AddStudentScreen from '../screens/AddStudentScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';
import StudentListScreen from '../screens/StudentListScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.textOnPrimary,
  headerBackButtonDisplayMode: 'minimal',
  contentStyle: { backgroundColor: colors.background },
};

// Les écrans disponibles dépendent de la présence d'un token
export default function AppNavigator() {
  const { token, isRestoring } = useAuth();

  if (isRestoring) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {token ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
            <Stack.Screen name="StudentList" component={StudentListScreen} options={{ title: 'Étudiants' }} />
            <Stack.Screen name="AddStudent" component={AddStudentScreen} options={{ title: 'Nouvel étudiant' }} />
            <Stack.Screen name="StudentDetail" component={StudentDetailScreen} options={{ title: 'Détail de l’étudiant' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Mon profil' }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Connexion' }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
