import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

// Ligne « libellé : valeur » des écrans de détail
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
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    marginBottom: 2,
    fontSize: 13,
    color: colors.textMuted,
  },
  value: {
    fontSize: 16,
    color: colors.text,
  },
});
