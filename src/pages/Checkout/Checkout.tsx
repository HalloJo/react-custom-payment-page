import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <div>
      <Link to="/">Terug</Link>
      <h2>Selecteer een betaalwijze.</h2>
      <Link to={"/completed"}>Betalen</Link>
    </div>
  );
};

export default Checkout;
