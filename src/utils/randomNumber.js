export const randomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 10000) + 1;
  const randomNumberString = randomNumber.toString().padStart(5, "0");
  return randomNumberString;
};
