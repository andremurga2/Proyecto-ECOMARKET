import { useState, useCallback } from 'react';

/**
 * useForm:
 * - initialValues: objeto con valores iniciales
 * - validate: función(values) => { field: errorMsg }
 * - onSubmit: función async(values) para manejar envío
 */
const useForm = (initialValues = {}, validate = null, onSubmit = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    const nextValue = type === 'checkbox' ? checked : type === 'file' ? files : value;
    setValues((prev) => ({ ...prev, [name]: nextValue }));
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      if (validate) {
        setErrors((prev) => ({ ...prev, ...(validate(values) || {}) }));
      }
    },
    [validate, values]
  );

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback((nextValues = initialValues) => {
    setValues(nextValues);
    setErrors({});
    setTouched({});
    setSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const validationErrors = validate ? validate(values) : {};
      setErrors(validationErrors || {});
      if (validationErrors && Object.keys(validationErrors).length) return;
      if (typeof onSubmit === 'function') {
        setSubmitting(true);
        try {
          const result = await onSubmit(values);
          setSubmitting(false);
          return result;
        } catch (err) {
          setSubmitting(false);
          throw err;
        }
      }
    },
    [validate, values, onSubmit]
  );

  return {
    values,
    setValues,
    errors,
    setErrors,
    touched,
    submitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
  };
};

export default useForm;