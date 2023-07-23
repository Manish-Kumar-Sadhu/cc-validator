import { useState } from "react";
import { Form, Button, Modal } from "rsuite";
import "./App.css";
import "rsuite/dist/rsuite.min.css";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";

function App() {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [formattedCardNumber, setFormattedCardNumber] = useState("");
  const [isValidCard, setIsValidCard] = useState(false);
  const [modalErrorMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Function to validate the credit card number
  async function validateCreditCard(cardNumber) {
    try {
      const response = await fetch(
        "http://localhost:8080/validate-credit-card",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cardNumber: cardNumber }),
        }
      );
      setCreditCardNumber("");

      if (response.ok) {
        setShowModal(true);
        setIsValidCard(true);
      } else {
        setShowModal(true);
        setIsValidCard(false);
      }

      setShowModal(true);
    } catch (error) {
      setModalMessage("Error validating credit card.");
      setShowModal(true);
    }
  }

  const handleCardNumberChange = (value) => {
    // Remove any non-digit characters from the input
    const inputText = value.replace(/\D/g, "");

    // Add spaces after every four digits
    const formattedNumber = inputText.replace(/(\d{4})(?=\d)/g, "$1 ");

    setCreditCardNumber(formattedNumber);
    setFormattedCardNumber(formattedNumber);
  };

  // Function to handle form submission
  async function handleSubmit() {
    await validateCreditCard(creditCardNumber.replace(/\s/g, ""));
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div style={{ maxWidth: 400, padding: 20 }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.ControlLabel style={{ fontWeight: "bold" }}>
              Enter Credit Card Number:
            </Form.ControlLabel>
            <Form.Control
              className="credit-card-input"
              name="cardNumber"
              type="text"
              value={creditCardNumber}
              onChange={handleCardNumberChange}
            />
          </Form.Group>
          <Form.Group>
            <Button
              type="submit"
              appearance="primary"
              disabled={creditCardNumber.length === 0}
            >
              Validate
            </Button>
          </Form.Group>
        </Form>

        <Modal
          open={showModal}
          onClose={handleCloseModal}
          onHide={handleCloseModal}
        >
          <Modal.Header>
            <Modal.Title>Validation Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalErrorMessage ? (
              <p>{modalErrorMessage}</p>
            ) : (
              <p>
                Cerdit Card : <b>{formattedCardNumber}</b> is  {" "}
                <b>
                  {isValidCard ? (
                    <>
                       Valid <CheckOutlineIcon color="#6cc5b4" />
                    </>
                  ) : (
                    <>
                      Invalid <CloseOutlineIcon color="#FF0000" />
                    </>
                  )}{" "}
                </b>
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseModal} appearance="primary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
