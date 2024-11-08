import { Meteor } from 'meteor/meteor';

const stripe = require('stripe')(Meteor.settings.stripe_secret_key);

Meteor.methods({
  'payment.intent': async function () {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // amount in cents
      currency: 'usd',
    });

    return paymentIntent.client_secret;
  },
});
