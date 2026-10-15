import { useState } from 'react';

import AppButton from '../components/AppButton';
import ErrorMessage from '../components/ErrorMessage';
import FormInput from '../components/FormInput';
import FormLayout from '../components/FormLayout';
import { useForm } from '../hooks/useForm';
import { createStudent } from '../services/students.service';
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
  const { values, errors, setField, validateForm } = useForm(INITIAL_VALUES, validateStudent);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setApiError('');
    setIsSubmitting(true);
    try {
      await createStudent(toStudentPayload(values));
      navigation.popTo('StudentList');
    } catch (error) {
      setApiError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout>
      <ErrorMessage message={apiError} />

      <FormInput
        label="Nom"
        value={values.nom}
        onChangeText={(text) => setField('nom', text)}
        error={errors.nom}
        placeholder="Rakoto"
        autoCapitalize="words"
      />
      <FormInput
        label="Prénom"
        value={values.prenom}
        onChangeText={(text) => setField('prenom', text)}
        error={errors.prenom}
        placeholder="Jean"
        autoCapitalize="words"
      />
      <FormInput
        label="Email"
        value={values.email}
        onChangeText={(text) => setField('email', text)}
        error={errors.email}
        placeholder="jean.rakoto@etu.mg"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <FormInput
        label="Filière"
        value={values.filiere}
        onChangeText={(text) => setField('filiere', text)}
        error={errors.filiere}
        placeholder="Informatique"
        onSubmitEditing={handleSubmit}
      />

      <AppButton title="Enregistrer" onPress={handleSubmit} isLoading={isSubmitting} />
    </FormLayout>
  );
}
