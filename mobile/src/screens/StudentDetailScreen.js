import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import InfoRow from '../components/InfoRow';
import GlowScreen from '../components/GlowScreen';
import Loader from '../components/Loader';
import Pill from '../components/Pill';
import UnderlineTabs from '../components/UnderlineTabs';
import { useApiData } from '../hooks/useApiData';
import { deleteStudent, getStudentById } from '../services/students.service';
import { colors, getAccentColor } from '../theme/colors';
import { fontSizes, spacing } from '../theme/spacing';
import { formatDate, getFullName } from '../utils/format';

const TABS = [
  { key: 'infos', label: 'Infos' },
  { key: 'activity', label: 'Activité' },
];

function StudentInfos({ student }) {
  return (
    <View>
      <InfoRow label="Nom" value={student.nom} />
      <InfoRow label="Prénom" value={student.prenom} />
      <InfoRow label="Email" value={student.email} />
      <InfoRow label="Filière" value={student.filiere} />
      <InfoRow label="Inscrit le" value={formatDate(student.createdAt)} />
    </View>
  );
}

export default function StudentDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const insets = useSafeAreaInsets();
  const fetchStudent = useCallback(() => getStudentById(id), [id]);
  const { data: student, error, isLoading, retry } = useApiData(fetchStudent);
  const [selectedTab, setSelectedTab] = useState('infos');
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleteError('');
    setIsDeleting(true);
    try {
      await deleteStudent(id);
      navigation.goBack();
    } catch (requestError) {
      setDeleteError(requestError.message);
      setIsDeleting(false);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Supprimer l’étudiant',
      `Voulez-vous vraiment supprimer ${getFullName(student)} ? Cette action est définitive.`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: handleDelete },
      ],
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={[styles.screen, styles.errorContainer]}>
        <ErrorMessage message={error} onRetry={retry} />
      </View>
    );
  }

  const fullName = getFullName(student);

  return (
    <GlowScreen subtle>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.identity}>
          <Avatar name={fullName} size={88} />
          <Text style={styles.name}>{fullName}</Text>
          <Pill label={student.filiere} dotColor={getAccentColor(student.filiere)} />
        </View>

        <UnderlineTabs tabs={TABS} selectedKey={selectedTab} onSelect={setSelectedTab} />

        {selectedTab === 'infos' ? (
          <StudentInfos student={student} />
        ) : (
          <EmptyState message="Bientôt disponible" icon="time-outline" />
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: spacing.md + insets.bottom }]}>
        <ErrorMessage message={deleteError} />
        <AppButton title="Supprimer" variant="danger" onPress={confirmDelete} isLoading={isDeleting} />
      </View>
    </GlowScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorContainer: {
    justifyContent: 'center',
    padding: spacing.screen,
  },
  content: {
    flexGrow: 1,
    gap: spacing.md,
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
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
