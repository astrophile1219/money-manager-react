export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "";

  const numStr = num.toString();
  const parts = numStr.split(".");

  let integerPart = parts[0];
  const fractionalPart = parts[1];

  const lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);

  if (otherNumbers !== "") {
    const formattedOtherNumbers = otherNumbers.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    integerPart = formattedOtherNumbers + "," + lastThree;
  } else {
    integerPart = lastThree;
  }

  return fractionalPart
    ? `${integerPart}.${fractionalPart}`
    : integerPart;
};
