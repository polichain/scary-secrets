import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css'; // Import the CSS file


export const LandingPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Scary Secrets Vault</h1>
      <p>Share your Halloween stories, and explore other users' scary stories!</p>
      <div>
        <Link to="/upload">Upload Your Secret</Link>
        <br />
        <Link to="/explore">Explore Stories</Link>
      </div>
    </div>
  );
};
