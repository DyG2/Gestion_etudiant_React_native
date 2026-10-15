import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, spacing } from '../theme/spacing';

// Onglets texte avec soulignement de l'onglet actif ; tabs = [{ key, label }]
export default function UnderlineTabs({ tabs, selectedKey, onSelect }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isSelected = tab.key === selectedKey;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onSelect(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            style={[styles.tab, isSelected && styles.tabSelected]}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabSelected: {
    borderBottomColor: colors.primary,
  },
  label: {
    fontSize: fontSizes.small,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  labelSelected: {
    color: colors.text,
  },
});
