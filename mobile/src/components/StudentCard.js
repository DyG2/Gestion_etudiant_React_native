import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { getFullName } from '../utils/format';

// Carte d'un étudiant dans la liste
export default function StudentCard({ student, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.identity}>
        <Text style={styles.name}>{getFullName(student)}</Text>
        <Text style={styles.email}>{student.email}</Text>
      </View>
      <Text style={styles.badge}>{student.filiere}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  cardPressed: {
    backgroundColor: colors.surfacePressed,
  },
  identity: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  email: {
    marginTop: 2,
    fontSize: 14,
    color: colors.textMuted,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: colors.primaryLight,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});
