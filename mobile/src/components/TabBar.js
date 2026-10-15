import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useKeyboardVisible } from '../hooks/useKeyboardVisible';
import { colors } from '../theme/colors';
import { fontSizes, radius, spacing } from '../theme/spacing';

function TabBarItem({ label, renderIcon, isFocused, onPress }) {
  const color = isFocused ? colors.text : colors.textSecondary;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
      style={styles.item}
    >
      {({ pressed }) => (
        <View style={[styles.pill, isFocused && styles.pillFocused, pressed && styles.pillPressed]}>
          {renderIcon({ focused: isFocused, color, size: 22 })}
          {isFocused ? <Text style={styles.label}>{label}</Text> : null}
        </View>
      )}
    </Pressable>
  );
}

// Barre d'onglets flottante : l'onglet actif s'affiche dans une pastille avec son libellé
export default function TabBar({ state, descriptors, navigation, insets }) {
  const isKeyboardVisible = useKeyboardVisible();

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + spacing.xs }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const handlePress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TabBarItem
              key={route.key}
              label={options.tabBarLabel ?? options.title}
              renderIcon={options.tabBarIcon}
              isFocused={isFocused}
              onPress={handlePress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xs,
    backgroundColor: colors.background,
  },
  bar: {
    flexDirection: 'row',
    padding: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.tabBar,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
  },
  pillFocused: {
    backgroundColor: colors.primary,
  },
  pillPressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: fontSizes.caption,
    fontWeight: '600',
    color: colors.text,
  },
});
