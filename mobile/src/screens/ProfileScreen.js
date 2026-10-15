import { ScrollView, StyleSheet } from 'react-native';

import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import InfoRow from '../components/InfoRow';
import Loader from '../components/Loader';
import { useApiData } from '../hooks/useApiData';
import { getCurrentUser } from '../services/auth.service';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  const { data: profile, error, isLoading, retry } = useApiData(getCurrentUser);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {error ? (
        <ErrorMessage message={error} onRetry={retry} />
      ) : (
        <Card>
          <InfoRow label="Nom" value={profile.nom} />
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Identifiant" value={String(profile.id)} />
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
  },
});
