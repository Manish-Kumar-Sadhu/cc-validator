const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
// const allowedOrigins = ['http://localhost:3000'];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from the Express server!");
});

// API route to validate credit card number
app.post("/validate-credit-card", (req, res) => {
  let { cardNumber } = req.body;

  // Check if the credit card number is present and contains only digits
  console.log("Received cardNumber:", cardNumber);
  if (typeof cardNumber === "number") {
    cardNumber = cardNumber.toString();
  }

  
  /**
   * Notes:
   * Visa: Visa credit card numbers typically have 16 digits.
   * Mastercard: Mastercard credit card numbers also have 16 digits.
   * American Express (Amex): American Express credit card numbers have 15 digits.
   * Discover: Discover credit card numbers have 16 digits.
   * Diners Club: Diners Club credit card numbers can have either 14 digits or 16 digits.
   * JCB: JCB credit card numbers can have either 15 digits or 16 digits.
   *  
   * */
  // Check if the length of the credit card number is greater than or equal to 14
  console.log("Card number length:", cardNumber.length);
  if (cardNumber.length < 14) {
    console.log("Invalid credit card number length:", cardNumber);
    return res.status(400).json({ error: "Invalid credit card number length" });
  }

  // Check if the credit card number is present and contains only digits
  if (!cardNumber || !/^\d+$/.test(cardNumber)) {
    console.log("Invalid credit card number format:", cardNumber);
    return res.status(400).json({ error: "Invalid credit card number format" });
  }

  // Validate the credit card number using the Luhn algorithm
  if (!luhnAlgorithmValidation(cardNumber)) {
    console.log("Invalid credit card number:", cardNumber);
    return res.status(400).json({ error: "Invalid credit card number" });
  }

  // If all validations pass, respond with a success message
  console.log("Credit card number is valid:", cardNumber);
  return res.json({ message: "Credit card number is valid" });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Luhn algorithm implementation
function luhnAlgorithmValidation(cardNumber) {
  // Remove any non-digit characters from the card number
  const sanitizedCardNumber = cardNumber.replace(/\D/g, "");

  let sum = 0;
  let isEven = false;

  // Starting from the rightmost digit, double every second digit
  for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedCardNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  // If the sum is divisible by 10, the card number is valid
  return sum % 10 === 0;
}
