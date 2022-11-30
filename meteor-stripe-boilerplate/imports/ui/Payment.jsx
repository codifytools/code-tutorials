import React, { useState } from 'react';
import { Elements, useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(Meteor.settings.public.stripe_publishable_key);

export function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

function CheckoutForm() {
  const [form, setForm] = useState({ email: 'juanpmd@hotmail.com', error: '', loading: false });

  const stripe = useStripe();
  const elements = useElements();

  const handleEmailChange = (event) => {
    setForm({ ...form, email: event.target.value })
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setForm({ ...form, loading: true });

    Meteor.call('payment.intent', (error, response) => {
      if (error) return setForm({ ...form, loading: false, error: error.reason });
      return completePayment(response);
    });
  };

  const completePayment = async (intent) => {
    const payload = await stripe.confirmCardPayment(intent, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: { email: form.email }
      }
    });

    if (payload.error) return setForm({ ...form, loading: false, error: payload.error.message });
    return setForm({ ...form, loading: false });
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
};