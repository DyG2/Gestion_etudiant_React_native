import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, getAccentColor } from '../theme/colors';
import { fontSizes, radius, spacing } from '../theme/spacing';
import { getFullName } from '../utils/format';
import Avatar from './Avatar';
import Pill from './Pill';

// Carte compacte d'un étudiant pour un défilement horizontal
export default function StudentTile({ student, onPress }) {
  const fullName = getFullName(student);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.tile, pressed && styles.tilePressed]}
    >
      <Avatar name={fullName} size={48} />
      <Text style={styles.name} numberOfLines={1}>
        {fullName}
      </Text>
      <View style={styles.pills}>
        <Pill label={student.filiere} dotColor={getAccentColor(student.filiere)} />
        <Pill label={`#${student.id}`} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 160,
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
  },
  tilePressed: {
    backgroundColor: colors.surfaceAlt,
  },
  name: {
    fontSize: fontSizes.body,
    fontWeight: '600',
    color: colors.text,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs / 2,
  },
});
