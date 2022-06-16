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

const imageWidthAndHeight = (provideFile: Blob) => {
  return new Promise<{
    width: number;
    height: number;
  }>((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(provideFile);
    reader.onload = async function () {
      const img = new Image();
      img.src = reader.result as string;
      await img.decode();
      img.onload = function () {
        resolve({
          width: img.width,
          height: img.height
        });
      };
    };
  });
};

export const imageDimensionCheck = (
  minWidth: number,
  minHeight: number,
  maxWidth: number,
  maxHeight: number
) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  return async (value: any): Promise<boolean> => {
    if (!value) {
      return true;
    }

    const imgDimensions = await imageWidthAndHeight(value);

    if (
      imgDimensions.width < minWidth ||
      imgDimensions.width > maxWidth ||
      imgDimensions.height < minHeight ||
      imgDimensions.height > maxHeight
    ) {
      return false;
    }
    return true;
  };
};
