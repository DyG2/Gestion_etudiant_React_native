import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, radius, spacing } from '../theme/spacing';

const VARIANTS = {
  primary: { background: colors.primary, pressed: colors.primaryPressed },
  secondary: { background: colors.surfaceAlt, pressed: colors.surfaceHighlight },
  danger: { background: colors.danger, pressed: colors.dangerPressed },
};

// Bouton pleine largeur ; isLoading le désactive pendant un envoi
export default function AppButton({ title, onPress, variant = 'primary', disabled = false, isLoading = false }) {
  const palette = VARIANTS[variant];
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? palette.pressed : palette.background },
        isDisabled && styles.disabled,
      ]}
    >
      {isLoading ? <ActivityIndicator color={colors.text} /> : <Text style={styles.title}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    paddingHorizontal: spacing.md,
    borderRadius: radius.control,
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontSize: fontSizes.body,
    fontWeight: '600',
    color: colors.text,
  },
});
