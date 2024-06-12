import * as yup from 'yup';

const stringValidation = (t, min = 3, max = 20) => yup
  .string()
  .trim()
  .required(t('errors.required'))
  .min(min, t('errors.minMax'))
  .max(max, t('errors.minMax'));

export const getNameSchema = (names, t) => yup.object().shape({
  name: stringValidation(t)
    .notOneOf(names, t('errors.uniq')),
});

export const getSignUpSchema = (t) => yup.object().shape({
  username: stringValidation(t),
  password: yup
    .string()
    .min(6, t('errors.minSymbols'))
    .required(t('errors.required')),
  confirmPassword: yup
    .string()
    .label('confirmPassword')
    .required(t('errors.required'))
    .oneOf([yup.ref('password'), null], t('errors.matchPassword')),
});
