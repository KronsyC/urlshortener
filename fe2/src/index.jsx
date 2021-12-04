import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom"
import Home from './Home';
import Dash from './Dash';
import  { Navbar, Navbarlink } from "./components/navbar"
import Footer from "./components/footer"
import "./styles/globals.scss"

ReactDOM.render(
  <React.StrictMode>
  <Router>
    <Navbar>
      <Navbarlink title="Home" path="/" />
      <Navbarlink title="Dashboard" path="/dash" />
      <Navbarlink title="Github" path="https://github.com/KronsyC/Teenie" />
    </Navbar>

    <Switch>
      <Route path="/" element={< Home />} />
      <Route path="/dash" element={< Dash />} />
    </Switch>
    < Footer />
  </Router>

  </React.StrictMode>,
  document.getElementById('root')
);
