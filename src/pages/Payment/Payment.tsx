import React from "react";
import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div>
      <h1>Pay up!</h1>
      <Link to={"/checkout"}>Nu betalen</Link>
    </div>
  );
};

export default Payment;
