import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../theme/colors';
import { fontSizes, radius, spacing } from '../theme/spacing';

// Champ de saisie avec libellé, icône optionnelle et message d'erreur ;
// un champ secureTextEntry reçoit un bouton pour afficher le texte
export default function FormInput({ label, error, icon, secureTextEntry = false, ...inputProps }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTextHidden, setIsTextHidden] = useState(secureTextEntry);
  const iconColor = isFocused ? colors.primary : colors.textSecondary;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.field, isFocused && styles.fieldFocused, error && styles.fieldError]}>
        {icon ? <Ionicons name={icon} size={20} color={iconColor} /> : null}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
          selectionColor={colors.primary}
          keyboardAppearance="dark"
          accessibilityLabel={label}
          secureTextEntry={isTextHidden}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...inputProps}
        />
        {secureTextEntry ? (
          <Pressable
            onPress={() => setIsTextHidden((hidden) => !hidden)}
            accessibilityRole="button"
            accessibilityLabel={isTextHidden ? 'Afficher le mot de passe' : 'Masquer le mot de passe'}
            hitSlop={spacing.xs}
          >
            <Ionicons name={isTextHidden ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.control,
    backgroundColor: colors.surface,
  },
  fieldFocused: {
    borderColor: colors.primary,
  },
  fieldError: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: fontSizes.body,
    color: colors.text,
  },
  error: {
    marginTop: spacing.xs / 2,
    fontSize: fontSizes.caption,
    color: colors.danger,
  },
});
