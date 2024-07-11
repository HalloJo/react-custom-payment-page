import React from "react";
import { Link } from "react-router-dom";

const Completion = () => {
  return (
    <div>
      <h2>Thank you for your payment!</h2>
      <Link to={"/"}>Terug naar het begin</Link>
    </div>
  );
};

export default Completion;
