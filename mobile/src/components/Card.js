import { StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';

// Bloc blanc arrondi servant de fond aux contenus
export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
});
