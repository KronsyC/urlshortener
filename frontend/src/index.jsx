import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import axios from "axios"
import Helmet from "react-helmet"
axios.get("/api/register", { withCredentials: true })
.then( res=> {
  if( !res.data ){
    axios.post("/api/register", {}, { withCredentials: true })
    .then( data => {
      console.log("Successfully Registered");
      console.log(data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Helmet>

    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
