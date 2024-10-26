import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './styles/main.css'; // Import your styles
import App from './App.tsx'; // Assuming App.tsx is in the src folder

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as HTMLElement); // Create root for React 18+
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
