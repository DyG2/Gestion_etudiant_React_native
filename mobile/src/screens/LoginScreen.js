import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import FormInput from '../components/FormInput';
import FormLayout from '../components/FormLayout';
import GlowScreen from '../components/GlowScreen';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { colors } from '../theme/colors';
import { fontSizes, radius, spacing } from '../theme/spacing';
import { validateLogin } from '../utils/validation';

const INITIAL_VALUES = { email: '', password: '' };

function Brand() {
  return (
    <View style={styles.brand}>
      <View style={styles.logoRing}>
        <View style={styles.logo}>
          <Ionicons name="school" size={36} color={colors.text} />
        </View>
      </View>
      <Text style={styles.title}>Etu-tsika</Text>
      <Text style={styles.subtitle}>Gérez vos étudiants simplement, où que vous soyez.</Text>
    </View>
  );
}

export default function LoginScreen() {
  const { login } = useAuth();
  const { values, errors, setField, validateForm } = useForm(INITIAL_VALUES, validateLogin);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // En cas de succès, le navigateur bascule seul vers l'application
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setApiError('');
    setIsSubmitting(true);
    try {
      await login(values.email.trim(), values.password);
    } catch (error) {
      setApiError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <GlowScreen>
      <FormLayout centered transparent>
        <Brand />

        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>Connexion</Text>
          <Text style={styles.formHint}>Saisissez vos identifiants pour continuer.</Text>

          <ErrorMessage message={apiError} />

          <FormInput
            label="Email"
            icon="mail-outline"
            value={values.email}
            onChangeText={(text) => setField('email', text)}
            error={errors.email}
            placeholder="exemple@domaine.mg"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <FormInput
            label="Mot de passe"
            icon="lock-closed-outline"
            value={values.password}
            onChangeText={(text) => setField('password', text)}
            error={errors.password}
            placeholder="Votre mot de passe"
            secureTextEntry
            onSubmitEditing={handleSubmit}
          />

          <AppButton title="Se connecter" onPress={handleSubmit} isLoading={isSubmitting} />
        </Card>

        <View style={styles.footer}>
          <Ionicons name="shield-checkmark-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.footerText}>Connexion sécurisée</Text>
        </View>
      </FormLayout>
    </GlowScreen>
  );
}

const styles = StyleSheet.create({
  brand: {
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  logoRing: {
    padding: spacing.xs,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.primaryRing,
    borderRadius: radius.card + spacing.xs,
    backgroundColor: colors.primaryGlow,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: radius.card,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formCard: {
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  formTitle: {
    fontSize: fontSizes.sectionTitle,
    fontWeight: '700',
    color: colors.text,
  },
  formHint: {
    marginTop: spacing.xs / 2,
    marginBottom: spacing.md,
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs / 2,
    marginTop: spacing.lg,
  },
  footerText: {
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
  },
});
