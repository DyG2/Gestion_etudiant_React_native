import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import GlowScreen from '../components/GlowScreen';
import Loader from '../components/Loader';
import SectionHeader from '../components/SectionHeader';
import SegmentedChips from '../components/SegmentedChips';
import StatusPill from '../components/StatusPill';
import StudentTile from '../components/StudentTile';
import TopBar from '../components/TopBar';
import { useAuth } from '../context/AuthContext';
import { useApiData } from '../hooks/useApiData';
import { getStudents } from '../services/students.service';
import { colors } from '../theme/colors';
import { fontSizes, spacing } from '../theme/spacing';
import { ALL_FILIERES, filterByFiliere, getFilieres, getRecentStudents } from '../utils/students';

const RECENT_STUDENTS_LIMIT = 6;

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const { data: students, error, isLoading, retry } = useApiData(getStudents);
  const [selectedFiliere, setSelectedFiliere] = useState(ALL_FILIERES);

  const filieres = useMemo(() => (students ? getFilieres(students) : []), [students]);
  const recentStudents = useMemo(
    () => (students ? getRecentStudents(students, RECENT_STUDENTS_LIMIT) : []),
    [students],
  );

  if (isLoading) {
    return <Loader />;
  }

  // Une filière disparue après rechargement revient au filtre « Toutes »
  const activeFiliere = filieres.includes(selectedFiliere) ? selectedFiliere : ALL_FILIERES;
  const filteredCount = students ? filterByFiliere(students, activeFiliere).length : 0;
  const openStudent = (id) => navigation.navigate('StudentDetail', { id });

  return (
    <GlowScreen subtle>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.md }]}
      >
        <TopBar overline="Bonjour," title={user?.nom ?? ''} right={<StatusPill />} />

        {error ? (
          <ErrorMessage message={error} onRetry={retry} />
        ) : (
          <>
            <Card style={styles.statCard}>
              <Text style={styles.statValue}>{filteredCount}</Text>
              <Text style={styles.statLabel}>
                {activeFiliere === ALL_FILIERES ? 'Étudiants inscrits' : `Étudiants en ${activeFiliere}`}
              </Text>
              <SegmentedChips
                options={[ALL_FILIERES, ...filieres]}
                selected={activeFiliere}
                onSelect={setSelectedFiliere}
              />
            </Card>

            <SectionHeader
              title="Derniers étudiants"
              actionLabel="Voir tout"
              onAction={() => navigation.navigate('StudentList')}
            />
            <FlatList
              horizontal
              data={recentStudents}
              keyExtractor={(student) => String(student.id)}
              renderItem={({ item }) => <StudentTile student={item} onPress={() => openStudent(item.id)} />}
              contentContainerStyle={styles.tiles}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={<EmptyState message="Aucun étudiant pour le moment." />}
            />
          </>
        )}
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
  statCard: {
    gap: spacing.xs,
  },
  statValue: {
    fontSize: fontSizes.stat,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    marginBottom: spacing.xs,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  tiles: {
    flexGrow: 1,
    gap: spacing.sm,
  },
});
