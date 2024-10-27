import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import the Link component
import { loginUser, uploadFile, setLogCallback } from '../services/storachaService.tsx';

const UploadForm: React.FC = () => {
  const [email, setEmail] = useState('');  // State for email
  const [file, setFile] = useState<File | null>(null);  // State for file
  const [uploadMessage, setUploadMessage] = useState('');  // State for upload messages
  const [logMessages, setLogMessages] = useState<string[]>([]);  // State to track log messages

  useEffect(() => {
    // Set the log callback to display messages in the UI
    setLogCallback((message: string) => {
      setLogMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  // Function to handle login
  const handleLogin = async () => {
    await loginUser(email);
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    if (file) {
      const cid = await uploadFile(file);
      if (cid) {
        setUploadMessage(`File uploaded successfully. CID: ${cid}`);
      }
    } else {
      setUploadMessage('Please select a file.');
    }
  };

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
      setLogMessages((prevMessages) => [...prevMessages, 'File selection cleared']);
    }
  };

  return (
    <div>
      <h2>Upload Scary Files</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleLogin}>Login</button>

      <input
        type="file"
        onChange={handleFileChange} 
      />
      <button onClick={handleFileUpload}>Upload File</button>

      {/* Show upload message */}
      {uploadMessage && <p>{uploadMessage}</p>}

      {/* Show log messages to the user */}
      <div>
        <h3>Status:</h3>
        {logMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>

      {/* Return to Landing Page */}
      <Link to="/">
        <button>Return to Landing Page</button>
      </Link>
    </div>
  );
};

export default UploadForm;
