export default (str: string) => {
  if (!str) return '';

  const capitalizedString =
    str.substring(0, 1).toUpperCase() + str.substring(1, str.length);

  return capitalizedString;
};
