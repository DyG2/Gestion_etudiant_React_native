import { StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';
import GlowBackground from './GlowBackground';

// Conteneur d'écran avec fond sombre et halos animés ; subtle atténue le décor
export default function GlowScreen({ children, subtle = false }) {
  return (
    <View style={styles.screen}>
      <GlowBackground subtle={subtle} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
