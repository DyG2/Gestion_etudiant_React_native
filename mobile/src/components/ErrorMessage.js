import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import AppButton from './AppButton';

// Affiche une erreur, avec un bouton « Réessayer » si onRetry est fourni
export default function ErrorMessage({ message, onRetry }) {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.message}>{message}</Text>
      {onRetry ? <AppButton title="Réessayer" variant="secondary" onPress={onRetry} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: colors.dangerLight,
  },
  message: {
    fontSize: 14,
    color: colors.danger,
    textAlign: 'center',
  },
});
