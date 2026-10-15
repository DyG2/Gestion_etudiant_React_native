import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, radius, spacing } from '../theme/spacing';

// Rangée de puces à sélection unique, défilable horizontalement
export default function SegmentedChips({ options, selected, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            style={({ pressed }) => [styles.chip, (isSelected || pressed) && styles.chipSelected]}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>{option}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.xs / 2,
    padding: spacing.xs / 2,
    borderRadius: radius.control,
    backgroundColor: colors.surfaceAlt,
  },
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2 + 2,
    borderRadius: radius.control - 4,
  },
  chipSelected: {
    backgroundColor: colors.surfaceHighlight,
  },
  label: {
    fontSize: fontSizes.caption,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  labelSelected: {
    color: colors.text,
  },
});
