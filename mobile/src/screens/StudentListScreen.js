import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import GlowScreen from '../components/GlowScreen';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import StudentCard from '../components/StudentCard';
import { useApiData } from '../hooks/useApiData';
import { getStudents } from '../services/students.service';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { filterByName } from '../utils/students';

export default function StudentListScreen({ navigation }) {
  const { data: students, error, isLoading, isRefreshing, retry, refresh } = useApiData(getStudents);
  const [query, setQuery] = useState('');

  const visibleStudents = useMemo(() => (students ? filterByName(students, query) : []), [students, query]);

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

  const emptyMessage = query.trim()
    ? `Aucun étudiant ne correspond à « ${query.trim()} ».`
    : 'Aucun étudiant enregistré pour le moment.';

  return (
    <GlowScreen subtle>
      <View style={styles.searchContainer}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Rechercher par nom" />
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        data={visibleStudents}
        keyExtractor={(student) => String(student.id)}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onPress={() => navigation.navigate('StudentDetail', { id: item.id })}
          />
        )}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={<EmptyState message={emptyMessage} />}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
            progressBackgroundColor={colors.surface}
          />
        }
      />
    </GlowScreen>
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
  errorContainer: {
    justifyContent: 'center',
    padding: spacing.screen,
  },
  searchContainer: {
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.xs,
  },
  list: {
    flexGrow: 1,
    padding: spacing.screen,
  },
  separator: {
    height: spacing.sm,
  },
});
