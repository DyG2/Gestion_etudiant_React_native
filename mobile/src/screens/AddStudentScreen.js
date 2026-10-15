import { useState } from 'react';
import { StyleSheet } from 'react-native';

import AppButton from '../components/AppButton';
import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import FormInput from '../components/FormInput';
import FormLayout from '../components/FormLayout';
import GlowScreen from '../components/GlowScreen';
import { useForm } from '../hooks/useForm';
import { createStudent } from '../services/students.service';
import { spacing } from '../theme/spacing';
import { validateStudent } from '../utils/validation';

const INITIAL_VALUES = { nom: '', prenom: '', email: '', filiere: '' };

// Supprime les espaces superflus avant l'envoi
function toStudentPayload(values) {
  return {
    nom: values.nom.trim(),
    prenom: values.prenom.trim(),
    email: values.email.trim(),
    filiere: values.filiere.trim(),
  };
}

export default function AddStudentScreen({ navigation }) {
  const { values, errors, setField, validateForm, resetForm } = useForm(INITIAL_VALUES, validateStudent);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // L'onglet reste monté : le formulaire est vidé avant de rejoindre la liste
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setApiError('');
    setIsSubmitting(true);
    try {
      await createStudent(toStudentPayload(values));
      resetForm();
      navigation.navigate('StudentList');
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlowScreen subtle>
      <FormLayout transparent>
        <ErrorMessage message={apiError} />

        <Card style={styles.form}>
          <FormInput
            label="Nom"
            icon="person-outline"
            value={values.nom}
            onChangeText={(text) => setField('nom', text)}
            error={errors.nom}
            placeholder="Rakoto"
            autoCapitalize="words"
          />
          <FormInput
            label="Prénom"
            icon="person-outline"
            value={values.prenom}
            onChangeText={(text) => setField('prenom', text)}
            error={errors.prenom}
            placeholder="Jean"
            autoCapitalize="words"
          />
          <FormInput
            label="Email"
            icon="mail-outline"
            value={values.email}
            onChangeText={(text) => setField('email', text)}
            error={errors.email}
            placeholder="jean.rakoto@etu.mg"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormInput
            label="Filière"
            icon="school-outline"
            value={values.filiere}
            onChangeText={(text) => setField('filiere', text)}
            error={errors.filiere}
            placeholder="Informatique"
            onSubmitEditing={handleSubmit}
          />
        </Card>

        <AppButton title="Enregistrer" onPress={handleSubmit} isLoading={isSubmitting} />
      </FormLayout>
    </GlowScreen>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: spacing.lg,
  },
});
