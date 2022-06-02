export const getBaseUrl = (): string => {
  if (process.env.API_URL) {
    return process.env.API_URL;
  } else {
    throw new Error('No API_URL set');
  }
};
