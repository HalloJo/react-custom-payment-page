import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Payment from "./pages/Payment/Payment";
import Checkout from "./pages/Checkout/Checkout";
import Completion from "./pages/Completion/Completion";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Payment} />
        <Route path="/checkout" Component={Checkout} />
        <Route path="/completed" Component={Completion} />
      </Routes>
    </Router>
  );
};

export default App;
