export const identifyCreditCardProvider = (creditCardNumber) => {
  // Remove any non-digit characters from the input
  const cleanedNumber = creditCardNumber.trim().replace(/\D/g, "");

  // Check the length and the first digit to identify the provider
  if (cleanedNumber.length === 15 && cleanedNumber.startsWith("3")) {
    return { Name: "American Express", Icon: "AMEX" };
  } else if (
    (cleanedNumber.length === 16 || cleanedNumber.length === 14) &&
    cleanedNumber.startsWith("6")
  ) {
    return { Name: "Discover", Icon: "DISCOVER" };
  } else if (cleanedNumber.length === 16 && cleanedNumber.startsWith("4")) {
    return { Name: "Visa", Icon: "VISA" };
  } else if (cleanedNumber.length === 16 && cleanedNumber.startsWith("5")) {
    return { Name: "Mastercard", Icon: "MASTER" };
  } else {
    return "Unknown provider";
  }
};
