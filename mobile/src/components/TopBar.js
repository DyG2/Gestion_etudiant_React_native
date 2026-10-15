import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, spacing } from '../theme/spacing';
import Avatar from './Avatar';

// Barre supérieure : avatar, sur-titre gris, titre et élément optionnel à droite
export default function TopBar({ overline, title, right }) {
  return (
    <View style={styles.container}>
      <Avatar name={title} size={44} />
      <View style={styles.texts}>
        <Text style={styles.overline}>{overline}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  texts: {
    flex: 1,
  },
  overline: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  title: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    color: colors.text,
  },
});
