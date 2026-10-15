import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

// Message affiché lorsqu'il n'y a aucune donnée à présenter
export default function EmptyState({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
