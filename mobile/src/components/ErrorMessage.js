import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, radius, spacing } from '../theme/spacing';
import AppButton from './AppButton';

// Affiche une erreur, avec un bouton « Réessayer » si onRetry est fourni
export default function ErrorMessage({ message, onRetry }) {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.container} accessibilityRole="alert">
      <View style={styles.row}>
        <Ionicons name="alert-circle" size={20} color={colors.danger} />
        <Text style={styles.message}>{message}</Text>
      </View>
      {onRetry ? <AppButton title="Réessayer" variant="secondary" onPress={onRetry} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderRadius: radius.control,
    backgroundColor: colors.dangerMuted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  message: {
    flex: 1,
    fontSize: fontSizes.small,
    color: colors.danger,
  },
});
