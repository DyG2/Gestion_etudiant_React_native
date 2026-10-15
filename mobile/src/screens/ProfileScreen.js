import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import Avatar from '../components/Avatar';
import ErrorMessage from '../components/ErrorMessage';
import GlowScreen from '../components/GlowScreen';
import Loader from '../components/Loader';
import StatCard from '../components/StatCard';
import StatusPill from '../components/StatusPill';
import { useAuth } from '../context/AuthContext';
import { useApiData } from '../hooks/useApiData';
import { getCurrentUser } from '../services/auth.service';
import { getStudents } from '../services/students.service';
import { colors } from '../theme/colors';
import { fontSizes, spacing } from '../theme/spacing';
import { getFilieres } from '../utils/students';

// Profil de l'utilisateur et statistiques affichées sous son identité
async function fetchProfileData() {
  const [user, students] = await Promise.all([getCurrentUser(), getStudents()]);
  return { user, studentCount: students.length, filiereCount: getFilieres(students).length };
}

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { data, error, isLoading, retry } = useApiData(fetchProfileData);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <GlowScreen subtle>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        {error ? (
          <ErrorMessage message={error} onRetry={retry} />
        ) : (
          <>
            <View style={styles.identity}>
              <Avatar name={data.user.nom} size={88} />
              <Text style={styles.name}>{data.user.nom}</Text>
              <Text style={styles.email}>{data.user.email}</Text>
              <StatusPill />
            </View>

            <View style={styles.stats}>
              <StatCard icon="people" iconColor={colors.success} value={data.studentCount} label="Étudiants" />
              <StatCard icon="school" iconColor={colors.purple} value={data.filiereCount} label="Filières" />
            </View>
          </>
        )}

        <AppButton title="Se déconnecter" variant="secondary" onPress={logout} />
      </ScrollView>
    </GlowScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    gap: spacing.lg,
    padding: spacing.screen,
  },
  identity: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  name: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    color: colors.text,
  },
  email: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
