import * as Yup from 'yup';

export const validatePassword = Yup.string()
  .required()
  .matches(/^[a-zA-Z]/, 'Must start with letter')
  .matches(/(?=.*[a-z])/, 'Lowercase letter required')
  .matches(/(?=.*[A-Z])/, 'Uppercase letter required')
  .matches(/(?=.*\d)/, 'Number required')
  .matches(/(?=.*[ !"#$%&'()*+,-.\\/:;<=>?@[\]^_`{|}~])/, 'Special character')
  .min(8, 'At least 8 characters')
  .max(12, 'No more than 12 characters');
