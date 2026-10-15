import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '../components/TabBar';
import TabBarIcon from '../components/TabBarIcon';
import AddStudentScreen from '../screens/AddStudentScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StudentListScreen from '../screens/StudentListScreen';
import { headerOptions } from '../theme/navigationTheme';

const Tab = createBottomTabNavigator();

// Fabrique l'option tabBarIcon à partir du nom Ionicons (version pleine)
const tabIcon = (name) => ({ color, focused }) => (
  <TabBarIcon name={name} color={color} focused={focused} />
);

const renderTabBar = (props) => <TabBar {...props} />;

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={headerOptions} tabBar={renderTabBar}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Accueil', headerShown: false, tabBarIcon: tabIcon('home') }}
      />
      <Tab.Screen
        name="StudentList"
        component={StudentListScreen}
        options={{ title: 'Étudiants', tabBarIcon: tabIcon('people') }}
      />
      <Tab.Screen
        name="AddStudent"
        component={AddStudentScreen}
        options={{ title: 'Nouvel étudiant', tabBarLabel: 'Ajouter', tabBarIcon: tabIcon('add-circle') }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Mon profil', tabBarLabel: 'Profil', tabBarIcon: tabIcon('person') }}
      />
    </Tab.Navigator>
  );
}
