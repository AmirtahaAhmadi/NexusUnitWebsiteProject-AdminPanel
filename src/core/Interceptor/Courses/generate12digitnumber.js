export const generate12DigitNumber = () => {
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
};
