import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { useApiData } from '../hooks/useApiData';
import { getStudents } from '../services/students.service';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { data: students, error, isLoading, retry } = useApiData(getStudents);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Bonjour, {user?.nom}</Text>

      {error ? (
        <ErrorMessage message={error} onRetry={retry} />
      ) : (
        <Card>
          <Text style={styles.count}>{students.length}</Text>
          <Text style={styles.countLabel}>
            {students.length > 1 ? 'étudiants inscrits' : 'étudiant inscrit'}
          </Text>
        </Card>
      )}

      <View style={styles.actions}>
        <AppButton title="Liste des étudiants" onPress={() => navigation.navigate('StudentList')} />
        <AppButton title="Ajouter un étudiant" onPress={() => navigation.navigate('AddStudent')} />
        <AppButton title="Mon profil" variant="secondary" onPress={() => navigation.navigate('Profile')} />
        <AppButton title="Se déconnecter" variant="danger" onPress={logout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    gap: 24,
    padding: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  count: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
  },
  countLabel: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
  },
  actions: {
    gap: 12,
  },
});
