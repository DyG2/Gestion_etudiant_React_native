import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';
import FormInput from '../components/FormInput';
import FormLayout from '../components/FormLayout';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { colors } from '../theme/colors';
import { validateLogin } from '../utils/validation';

const INITIAL_VALUES = { email: '', password: '' };

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
    <FormLayout>
      <Text style={styles.title}>Gestion des étudiants</Text>
      <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

      <ErrorMessage message={apiError} />

      <FormInput
        label="Email"
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
        value={values.password}
        onChangeText={(text) => setField('password', text)}
        error={errors.password}
        placeholder="Votre mot de passe"
        secureTextEntry
        onSubmitEditing={handleSubmit}
      />

      <AppButton title="Se connecter" onPress={handleSubmit} isLoading={isSubmitting} />
    </FormLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 32,
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
