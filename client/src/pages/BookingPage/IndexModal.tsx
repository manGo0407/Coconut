// IndexModal.jsx
import React from "react";
import Modal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";

const stripePromise = loadStripe(
  "pk_test_51OtTm2Kgs3YmclUkdLeDMNbn0h9OQgp80dULs4B4tOTSJOh5h43XVKmdRIBCheypvxTJAd5snTEaNDi9jOxd2ynh00ivarpGSV"
);

const IndexModal = ({ order, isOpen, onClose }) => {
  const modalStyles = {
    content: {
      width: "600px",
      height: "1000px",
      top: "100%",
      left: "50%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
    },
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Оплата"
        style={modalStyles}
      >
        {/* <button onClick={onClose}>Закрыть</button> */}
        <Elements stripe={stripePromise}>
          <Payment order={order} />
        </Elements>
      </Modal>
    </div>
  );
};

export default IndexModal;
