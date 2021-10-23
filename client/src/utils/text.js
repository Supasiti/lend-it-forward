export const capitalizeFirstLetter = (text) => {
  return text[0].toUpperCase() + text.substr(1);
};

export const capitalize = (text) => {
  return text
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
};
