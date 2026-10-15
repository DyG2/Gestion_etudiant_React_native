import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, spacing } from '../theme/spacing';

// Ligne « libellé / valeur » séparée par un trait fin
export default function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  value: {
    flexShrink: 1,
    fontSize: fontSizes.body,
    color: colors.text,
    textAlign: 'right',
  },
});
