import React, { useState, useEffect, FC } from "react";
import {
  useStripe,
  PaymentRequestButtonElement,
  Elements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { PaymentRequest, loadStripe } from "@stripe/stripe-js";

const Payment: FC = ({ order }) => {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null
  );
  const [amount] = useState<number>(Math.floor(Math.random() * 100 * 100));

  useEffect(() => {
    if (stripe) {
      const pr: PaymentRequest = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Stream Stripe React test",
          amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
      });

      pr.canMakePayment()
        .then((result) => {
          if (result) {
            console.log(result);
            setPaymentRequest(pr);
          }
        })
        .catch(console.error);
    }
  }, [stripe, amount]);

  useEffect(() => {
    if (paymentRequest) {
      paymentRequest.on("paymentmethod", async (event) => {
        const {
          paymentMethod: {
            id,
            billing_details: { email, phone },
          },
        } = event;
        try {
          const { data } = await axios.post(`http://localhost:3000/payment`, {
            id,
            amount,
            email,
            phone,
          });
          //   console.log(data);
          event.complete("success");
        } catch (error: any) {
          event.complete("fail");
          console.log(error.response ? error.response.data : error.message);
        }
      });
    }
  }, [paymentRequest, amount]);

  return (
    <>
      {paymentRequest ? (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      ) : (
        <CheckoutForm order={order} amount={amount} />
      )}
    </>
  );
};

export default Payment;
