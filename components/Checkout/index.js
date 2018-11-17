import React, { useState } from 'react';
import uuid from 'uuid/v4';
import StripeCheckout from 'react-stripe-checkout';
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { collections, timezones } from '../../constants';

const amount = 300; // £3.00
const currency = 'GBP';
const timezoneOptions = timezones.map(tz => ({
  value: tz.name,
  label: `${tz.label} (${tz.name})`,
}));
const collectionOptions = Object.entries(collections).map(
  ([_, collection]) => ({
    value: collection.id,
    label: collection.name,
  }),
);

const customStyles = {
  container: provided => ({
    ...provided,
    color: '#576366',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize: '14px',
    marginBottom: '20px',
  }),
  valueContainer: provided => ({
    ...provided,
    padding: '5px 15px',
  }),
  control: provided => ({
    ...provided,
    border: 'none',
  }),
  menu: provided => ({
    ...provided,
    margin: '3px 0 0',
  }),
  indicatorSeparator: () => ({}),
};

/**
 * onToken make the request to our Stripe lambda endpoint
 * and create the purchase
 */
const onToken = metadata => token => {
  fetch(`${process.env.LAMBDA_ENDPOINT}/purchase`, {
    method: 'POST',
    body: JSON.stringify({
      amount,
      currency,
      idempotency_key: uuid(),
      token,
      metadata,
    }),
  })
    .then(response => {
      response.json().then(data => {
        console.log('response data', data);
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const Checkout = ({ currentCollection, setCollection }) => {
  const [formValues, setFormValue] = useState({
    recipientFirstName: '',
    recipientPhoneNumber: '',
    recipientTimezone: '',
    customerName: '',
    customerEmail: '',
  });

  const updateState = e =>
    setFormValue({ ...formValues, [e.target.id]: e.target.value });

  return (
    <div className="wrapper">
      <h2>Make Someone Happy, Gift a Collection</h2>
      <form
        className="wrapper wrapper--small"
        onSubmit={e => e.preventDefault()}
      >
        <label htmlFor="collectionId">Collection</label>
        <Select
          id="collectionId"
          onChange={({ value }) => setCollection(value)}
          options={collectionOptions}
          styles={customStyles}
          value={{
            value: currentCollection,
            label: collections[currentCollection].name,
          }}
        />
        <label htmlFor="recipientFirstName">Recipient's First Name</label>
        <input
          className="input"
          id="recipientFirstName"
          onChange={updateState}
          value={formValues.recipientFirstName}
          type="text"
        />
        <label htmlFor="recipientPhoneNumber">Recipient's Phone Number</label>
        <PhoneInput
          className="sms-phone-input"
          id="recipientPhoneNumber"
          onChange={recipientPhoneNumber =>
            setFormValue({ ...formValues, recipientPhoneNumber })
          }
          value={formValues.recipientPhoneNumber}
        />
        <label htmlFor="recipientTimezone">Recipient's Timezone</label>
        <Select
          id="recipientTimezone"
          onChange={recipientTimezone => {
            setFormValue({ ...formValues, recipientTimezone });
          }}
          options={timezoneOptions}
          styles={customStyles}
          value={formValues.recipientTimezone}
        />
        <label htmlFor="customerName">Your Name</label>
        <input
          className="input"
          id="customerName"
          onChange={updateState}
          value={formValues.customerName}
          type="tel"
        />
        <label htmlFor="customerEmail">Your Email Address</label>
        <input
          className="input"
          id="customerEmail"
          onChange={updateState}
          value={formValues.customerEmail}
          type="email"
        />
        <StripeCheckout
          amount={amount}
          currency={currency}
          description="Weekly thoughtful messages via SMS"
          email={formValues.customerEmail}
          image="https://s3.eu-west-2.amazonaws.com/remoteone/stripe-icon.png"
          label="Buy Gift"
          locale="auto"
          name="ThoughtfulSMS"
          stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
          token={onToken({
            ...formValues,
            recipientTimezone: formValues.recipientTimezone.value,
            collectionId: currentCollection.id,
          })}
        />
        <p>Total: £3.00</p>
      </form>
      <style jsx>{`
        h2 {
          font-size: 30px;
          margin: 0 0 30px;
          text-align: center;
        }

        form {
          background: rgba(232, 235, 237, 0.8);
          box-shadow: 0px 1px 1px 0px rgba(80, 80, 80, 0.8);
          margin-bottom: 40px;
          padding: 20px;
          position: relative;
        }

        form::before {
          background: #1495df;
          content: '';
          display: block;
          height: 3px;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        label {
          display: inline-block;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          font-size: 14px;
          margin: 0 0 4px;
        }
        .select-wrapper {
          position: relative;
        }

        .select-wrapper::after {
          border-color: #576366 transparent transparent transparent;
          border-style: solid;
          border-width: 7px 7px 0;
          content: '';
          display: block;
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          height: 0;
          width: 0;
        }

        p {
          display: inline-block;
          margin-left: 14px;
          font-size: 16px;
          float: right;
          position: relative;
          top: 8px;
        }
      `}</style>
      <style global jsx>{`
        .sms-phone-input input,
        .input,
        .select {
          appearance: none;
          background: #ffffff;
          border-radius: 5px;
          border: none;
          color: #576366;
          display: block;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          font-size: 14px;
          height: 35px;
          margin-bottom: 20px;
          padding: 5px 15px;
          width: 100%;
        }

        .sms-phone-input {
          margin-bottom: 20px;
        }

        .sms-phone-input input {
          margin-bottom: 0;
        }

        .sms-phone-input .react-phone-number-input__icon {
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
