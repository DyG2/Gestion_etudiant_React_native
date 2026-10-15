import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';

import AppButton from '../components/AppButton';
import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import InfoRow from '../components/InfoRow';
import Loader from '../components/Loader';
import { useApiData } from '../hooks/useApiData';
import { deleteStudent, getStudentById } from '../services/students.service';
import { colors } from '../theme/colors';
import { formatDate, getFullName } from '../utils/format';

export default function StudentDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const fetchStudent = useCallback(() => getStudentById(id), [id]);
  const { data: student, error, isLoading, retry } = useApiData(fetchStudent);
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
      <ScrollView style={styles.screen} contentContainerStyle={styles.centered}>
        <ErrorMessage message={error} onRetry={retry} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.name}>{getFullName(student)}</Text>

      <Card>
        <InfoRow label="Nom" value={student.nom} />
        <InfoRow label="Prénom" value={student.prenom} />
        <InfoRow label="Email" value={student.email} />
        <InfoRow label="Filière" value={student.filiere} />
        <InfoRow label="Inscrit le" value={formatDate(student.createdAt)} />
      </Card>

      <ErrorMessage message={deleteError} />
      <AppButton title="Supprimer" variant="danger" onPress={confirmDelete} isLoading={isDeleting} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    gap: 16,
    padding: 24,
  },
  centered: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
});
