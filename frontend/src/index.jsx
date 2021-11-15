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
      <title>Teenie - Url Shortener</title>
      <meta property="og:title" content="Teenie - Url Shortener" />
      <meta property="og:description" content="A Url Shortener by KronsyC" />
      <meta property="description" content="A Url Shortener by KronsyC" />
      <meta property="og:url" content="https://teenie.herokuapp.com" />
      <meta property="og:image" content="/adachi.jpg" />
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
