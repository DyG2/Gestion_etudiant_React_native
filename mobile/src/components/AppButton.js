import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../theme/colors';

const VARIANTS = {
  primary: { background: colors.primary, pressed: colors.primaryPressed, text: colors.textOnPrimary },
  secondary: { background: colors.surface, pressed: colors.surfacePressed, text: colors.primary },
  danger: { background: colors.danger, pressed: colors.dangerPressed, text: colors.textOnPrimary },
};

// Bouton principal de l'application ; isLoading le désactive pendant un envoi
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
        variant === 'secondary' && styles.outlined,
        isDisabled && styles.disabled,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={palette.text} />
      ) : (
        <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
