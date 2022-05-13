import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import reportWebVitals from './reportWebVitals';

import './style/style.css';


ReactDOM.hydrateRoot(
  document.getElementById('root'), 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
