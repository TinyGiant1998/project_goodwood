import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Footer from "./components/pages/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        {" "}
        {/* Use Switch instead of Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
