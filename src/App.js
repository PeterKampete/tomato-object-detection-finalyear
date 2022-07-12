import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
      </Router>
    </AuthProvider>
  );
};

export default App;
