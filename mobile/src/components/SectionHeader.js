import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, spacing } from '../theme/spacing';

// Titre de section avec lien d'action optionnel à droite (« Voir tout › »)
export default function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onAction} accessibilityRole="link" hitSlop={spacing.xs}>
          {({ pressed }) => (
            <Text style={[styles.action, pressed && styles.actionPressed]}>{actionLabel} ›</Text>
          )}
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontSizes.sectionTitle,
    fontWeight: '700',
    color: colors.text,
  },
  action: {
    fontSize: fontSizes.small,
    fontWeight: '500',
    color: colors.primary,
  },
  actionPressed: {
    opacity: 0.6,
  },
});
