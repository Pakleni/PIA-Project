import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import 'regenerator-runtime/runtime.js'; //Regenerator Runtime Error

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
