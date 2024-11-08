import React, { useState } from 'react';
import { Elements, CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(Meteor.settings.public.stripe_publishable_key);

export function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

function PaymentForm() {
  const [form, setForm] = useState({ email: 'user1@example.com', error: '', loading: false });

  const stripe = useStripe();
  const elements = useElements();

  const handleEmailChange = (event) => {
    setForm({ ...form, email: event.target.value })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setForm({ ...form, loading: true });

    try {
      const intent = await Meteor.callAsync('payment.intent');

      const payload = await stripe.confirmCardPayment(intent, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { email: form.email },
        }
      });

      if (payload.error) return setForm({ ...form, error: payload.error.message, loading: false });
      return setForm({ ...form, loading: false });
    } catch (error) {
      if (error) return setForm({ ...form, error: error.reason, loading: false });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardNumberElement />
      <CardCvcElement />
      <CardExpiryElement />
      <input type="email" name="email" value={form.email} onChange={handleEmailChange} />

      <button disabled={form.loading}>Submit</button>
      {form.error && <p>Error: {form.error}</p>}
    </form>
  );
}
