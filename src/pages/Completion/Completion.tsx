import { Link } from "react-router-dom";
import "./Completion.scss";
import { CompletionPageContent } from "../../data/Content";
import expertsLogo from "../../assets/logo.svg";

const Completion = () => {
  return (
    <div className="completion">
      <div className="completion__modal">
        <img
          src={expertsLogo}
          alt="Experts logo"
          className="completion__logo"
        />
        <h2 className="completion__title">{CompletionPageContent.title}</h2>
        <p className="completion__subTitle">{CompletionPageContent.subTitle}</p>
        <Link to={"/"}>{CompletionPageContent.callToAction}</Link>
      </div>
    </div>
  );
};

export default Completion;
