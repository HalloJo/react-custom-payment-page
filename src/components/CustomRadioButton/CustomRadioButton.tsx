import "./CustomRadioButton.scss";
import { CheckoutPageContent } from "../../data/Content";
import { Method } from "../../types/types";

const CustomRadioButton = ({
  method,
  handleMethodSelection,
  selectedMethod,
}: {
  method: Method;
  handleMethodSelection: (id: string) => void;
  selectedMethod: string | null;
}) => {
  return (
    <div className="radio">
      {method.popular && (
        <span className="radio__popular">{CheckoutPageContent.popular}</span>
      )}
      <input
        type="radio"
        id={method.id}
        name="paymentMethod"
        checked={selectedMethod === method.id}
        onChange={() => handleMethodSelection(method.id)}
      />
      <label htmlFor={method.id}>
        <div className="radio__custom" />
        <span>{method.name}</span>
      </label>
    </div>
  );
};

export default CustomRadioButton;
