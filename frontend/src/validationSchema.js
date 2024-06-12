import * as yup from 'yup';

export const getNameSchema = (names, t) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(t('errors.required'))
    .min(3, t('errors.minMax'))
    .max(20, t('errors.minMax'))
    .notOneOf(names, t('errors.uniq')),
});

export const getSignUpSchema = (t) => yup.object().shape({
  username: yup
    .string()
    .trim()
    .required(t('errors.required'))
    .min(3, t('errors.minMax'))
    .max(20, t('errors.minMax')),
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
