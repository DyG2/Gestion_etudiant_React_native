import { FlatList, StyleSheet, View } from 'react-native';

import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import StudentCard from '../components/StudentCard';
import { useApiData } from '../hooks/useApiData';
import { getStudents } from '../services/students.service';
import { colors } from '../theme/colors';

export default function StudentListScreen({ navigation }) {
  const { data: students, error, isLoading, isRefreshing, retry, refresh } = useApiData(getStudents);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <ErrorMessage message={error} onRetry={retry} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={students}
      keyExtractor={(student) => String(student.id)}
      renderItem={({ item }) => (
        <StudentCard
          student={item}
          onPress={() => navigation.navigate('StudentDetail', { id: item.id })}
        />
      )}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={<EmptyState message="Aucun étudiant enregistré pour le moment." />}
      refreshing={isRefreshing}
      onRefresh={refresh}
    />
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  separator: {
    height: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
});
