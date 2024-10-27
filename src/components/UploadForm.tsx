import React, { useState } from 'react';
import { login, uploadFile, setCurrentDID } from '../services/storachaService.tsx';

export const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [did, setDid] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLogin = async () => {
    const success = await login(email);
    if (success) {
      setMessage('Login successful. Please check your email to validate.');
      setLoggedIn(true);
    } else {
      setMessage('Failed to login. Please try again.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleCreateDID = async () => {
    if (!did) {
      setMessage('Please enter a DID.');
      return;
    }
    try {
      await setCurrentDID(did);
      setMessage(`Current DID set to: ${did}`);
    } catch (error) {
      setMessage(`Failed to set DID: ${error.message}`);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    if (!did) {
      setMessage('Please create or select a DID before uploading.');
      return;
    }

    try {
      await setCurrentDID(did);  // Set the current DID before uploading
      const uploadedCid = await uploadFile(file);
      setMessage(`File uploaded successfully! CID: ${uploadedCid}`);
    } catch (error) {
      setMessage(`Failed to upload file: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Share Your Scary Story</h2>
      {loggedIn ? (
        <>
          <div>
            <input
              type="text"
              placeholder="Enter your DID"
              value={did || ''}
              onChange={(e) => setDid(e.target.value)}
            />
            <button onClick={handleCreateDID}>Create/Set DID</button>
          </div>

          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload File</button>
          </form>

          {cid && <p>File uploaded successfully! CID: {cid}</p>}
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};
