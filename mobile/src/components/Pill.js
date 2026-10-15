import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, radius, spacing } from '../theme/spacing';

// Pastille arrondie, précédée d'un point coloré si dotColor est fourni
export default function Pill({ label, dotColor }) {
  return (
    <View style={styles.pill}>
      {dotColor ? <View style={[styles.dot, { backgroundColor: dotColor }]} /> : null}
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs / 2,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs / 2,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
  },
  label: {
    flexShrink: 1,
    fontSize: fontSizes.caption,
    fontWeight: '500',
    color: colors.text,
  },
});
