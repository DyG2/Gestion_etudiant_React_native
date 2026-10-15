import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, spacing } from '../theme/spacing';

// Message affiché lorsqu'il n'y a aucune donnée à présenter
export default function EmptyState({ message, icon = 'people-outline' }) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={40} color={colors.textSecondary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  message: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
