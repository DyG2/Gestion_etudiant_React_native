import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, radius, spacing } from '../theme/spacing';
import { getFullName } from '../utils/format';
import Avatar from './Avatar';
import Pill from './Pill';

// Ligne d'un étudiant dans la liste
export default function StudentCard({ student, onPress }) {
  const fullName = getFullName(student);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Avatar name={fullName} />
      <View style={styles.identity}>
        <Text style={styles.name} numberOfLines={1}>
          {fullName}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {student.email}
        </Text>
        <Pill label={student.filiere} />
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
  },
  cardPressed: {
    backgroundColor: colors.surfaceAlt,
  },
  identity: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  name: {
    fontSize: fontSizes.body,
    fontWeight: '600',
    color: colors.text,
  },
  email: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
});
