import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';        // Tailwind CSS
import './styles/globals.css'; // Custom styles (import this)
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);