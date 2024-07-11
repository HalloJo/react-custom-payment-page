import { Link } from "react-router-dom";
import "./Payment.scss";
import { PaymentPageContent, PaymentSpecification } from "../../data/Content";
import downloadIcon from "../../assets/download.svg";

const Payment = () => {
  const calculateTotal = (paymentSpecifications: PaymentSpecification[]) => {
    return paymentSpecifications.reduce((acc, item) => acc + item.amount, 0);
  };

  const totalAmount = calculateTotal(
    PaymentPageContent.table.paymentSpecifications
  );

  return (
    <div className="payment">
      <p className="payment__warning">{PaymentPageContent.warning}</p>
      <h1 className="payment__title">{PaymentPageContent.title}</h1>
      <p className="payment__subTitle">{PaymentPageContent.subTitle}</p>
      <div className="payment__table">
        <div className="payment__table_receipt">
          <p>
            {PaymentPageContent.table.receipt}
            <span className="payment__table_receiptNumber">
              {PaymentPageContent.table.receiptNumber}
            </span>
          </p>
          <div className="payment__table_callToAction">
            <a href="#">{PaymentPageContent.table.receiptCallToAction}</a>
            <img src={downloadIcon} alt="download icon" />
          </div>
        </div>
        <ul className="payment__table_list">
          {PaymentPageContent.table.paymentSpecifications.map((item) => {
            return (
              <li className="payment__table_listItem" key={item.title}>
                <div className="payment__table_listItemWrapper">
                  <p className="payment__table_listItemTitle">{item.title}</p>
                  <p className="payment__table_listItemDescription">
                    {item.description}
                  </p>
                </div>
                <p className="payment__table_listItemAmount">
                  €{item.amount}.00
                </p>
              </li>
            );
          })}
        </ul>
        <div className="payment__total">
          <p className="payment__total_title">
            {PaymentPageContent.table.total}
          </p>
          <p className="payment__total_amount">€{totalAmount}</p>
        </div>
        <Link to={"/checkout"}>{PaymentPageContent.callToAction}</Link>
      </div>
    </div>
  );
};

export default Payment;
