import React, { FC, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

import { Bounce, toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { SpinnerDotted } from "spinners-react";
import styles from "./CheckOutForm.module.css";
import Footer from "../../components/Footer/Footer";

interface CheckoutFormProps {
  amount: number;
  order?: { id: string };
  success?: boolean;
}

const checkoutFormOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: true,
};

const CheckoutForm: FC<CheckoutFormProps> = ({
  order,
  success,
  amount,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  let price = order?.Tour?.price * order?.Tour?.reservedQuantity;
  // console.log(price);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (!error && paymentMethod) {
        const { id } = paymentMethod;
        try {
          const response = await axios.post(`http://localhost:3000/payment`, {
            id,
            amount,
          });

          if (response.status === 200) {
            toast.success("Оплата прошла успешно!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Zoom,
            });
            const res = await axios.put(
              `http://localhost:3000/orders/${order.id}`
            );
            setTimeout(() => {
              navigate("/");
            }, 3000);
          } else if (response.status === 400) {
            toast.error("Оплата не удалась!");
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        } catch (error: any) {
          console.log(error.response ? error.response.data : error.message);
        }
      }
    }
  }; // нужна ли она?

  return (
    <>
      <div className={styles.spinner}>{isLoading && <SpinnerDotted />}</div>

      <form
        className={`${styles.sber_checkout_form} ${
          isLoading ? styles.shadow : ""
        }`}
        onSubmit={(event) => handleSubmit(event)}
      >
        <CardElement options={checkoutFormOptions} />
        <input
          type="text"
          placeholder="Имя владельца карты"
          className={styles.sber_input}
        />
        <div className={styles.price}>сумма к оплате: {price}₽</div>

        <button type="submit" className={styles.sber_btn}>
          Оплатить
        </button>
      </form>

      <ToastContainer />
      {/* <Footer /> */}
    </>
  );
};

export default CheckoutForm;
