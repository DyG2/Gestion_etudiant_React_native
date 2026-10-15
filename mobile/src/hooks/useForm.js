import { useCallback, useState } from 'react';

import { hasErrors } from '../utils/validation';

// État d'un formulaire : valeurs, erreurs par champ et validation
export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const setField = useCallback((field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }, []);

  const validateForm = () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    return !hasErrors(nextErrors);
  };

  return { values, errors, setField, validateForm };
}
