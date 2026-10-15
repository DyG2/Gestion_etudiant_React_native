import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

// Conteneur des formulaires : le clavier ne masque jamais les champs ;
// transparent laisse voir un décor placé derrière
export default function FormLayout({ children, centered = false, transparent = false }) {
  return (
    <KeyboardAvoidingView
      style={[styles.container, transparent && styles.transparent]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[styles.content, centered && styles.centered]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  content: {
    flexGrow: 1,
    padding: spacing.screen,
  },
  centered: {
    justifyContent: 'center',
  },
});
