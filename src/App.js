import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Index";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/transacoes/:id" exact component={Transactions} />
      </div>
    </Router>
  );
}

export default App;
