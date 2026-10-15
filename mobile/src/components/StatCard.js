import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, radius, spacing } from '../theme/spacing';
import Card from './Card';

// Carte statistique : icône dans un cercle coloré, valeur et libellé
export default function StatCard({ icon, iconColor, value, label }) {
  return (
    <Card style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>
        <Ionicons name={icon} size={20} color={colors.text} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
  },
  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: radius.pill,
  },
  texts: {
    flex: 1,
  },
  value: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    color: colors.text,
  },
  label: {
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
  },
});
