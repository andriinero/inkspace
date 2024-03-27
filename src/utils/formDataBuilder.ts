/* eslint-disable @typescript-eslint/no-explicit-any */
export const formDataBuilder = (formBody: any): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(formBody)) {
    formData.append(key, value as Blob);
  }

  return formData;
};
