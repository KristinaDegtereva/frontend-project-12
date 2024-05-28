import * as yup from 'yup';

const getSchema = (names, t) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(t('errors.required'))
    .min(3, t('errors.minMax'))
    .max(20, t('errors.minMax'))
    .notOneOf(names, t('errors.uniq')),
});

export default getSchema;
