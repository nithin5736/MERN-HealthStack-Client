import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { paymentRoute } from "../../utils/APIRoutes";
import { stripeKey } from "../../utils/secretkeys";

const StripeCheckoutButton = ({ total, totalCount }) => {
  const deliver = 40;
  const USER_KEY = "current user";
  const [priceForStripe, setPriceForStripe] = useState(
    total -
      0.1 * total +
      totalCount +
      parseInt(`${totalCount > 0 ? deliver : 0}`)
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(USER_KEY)));

  const onToken = () => {
    if (!user) {
      alert("Please Login to do Stripe Payment");
      return;
    }
    axios
      .post(paymentRoute, {
        amount: priceForStripe,
        username: user.username,
      })
      .then((res) => {
        alert("payment successful");
        return;
      });
      window.location.reload();
  };

  return (
    <StripeCheckout
      label="ORDER NOW"
      name="HealthStack"
      billingAddress
      shippingAddress
      image="https://thumbs.dreamstime.com/z/cross-plus-medical-logo-icon-design-template-elements-cross-plus-medical-logo-icon-100597830.jpg"
      description={total-0.1 * total+totalCount +parseInt(`${totalCount > 0 ? deliver : 0}`)}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={stripeKey}
    />
  );
};

export default StripeCheckoutButton;
