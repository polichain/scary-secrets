import React, { useState } from 'react';
import { initStoracha, createDID, uploadFile, login } from '../services/storachaService.tsx';

export const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [spaceCreated, setSpaceCreated] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);  // Track login state
  const [loading, setLoading] = useState<boolean>(false);  // Track loading state for actions
  const [message, setMessage] = useState<string | null>(null);  // Message to the user

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (file && spaceCreated) {
      setLoading(true);
      setMessage("Uploading your secret...");

      const uploadedCid = await uploadFile(file);  // Upload file to Storacha

      if (uploadedCid) {
        setCid(uploadedCid);
        setMessage(`File uploaded successfully! CID: ${uploadedCid}`);
      } else {
        setMessage("Failed to upload the file. Please try again.");
      }
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email.includes('@')) {
      alert("Invalid email format. Please enter a valid email.");
      return;
    }

    setLoading(true);
    setMessage("Logging in...");

    await initStoracha();  // Initialize Storacha client

    const userHasAccount = await login(email);  // Check if the user has a Storacha account
    if (!userHasAccount) {
      setMessage("You don't have an account on Storacha. Please sign up at storacha.network before proceeding.");
      setLoading(false);
      return;
    }

    setMessage("Login successful. Creating DID...");
    const didCreated = await createDID(email);  // Ensure the DID is created
    if (didCreated) {
      setSpaceCreated(true);
      setIsLoggedIn(true);
      setMessage("DID created successfully. You can now upload files.");
    } else {
      setMessage('Failed to create a DID');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Submit Your Scary Secret!</h2>
      <input
        type="email"
        placeholder="Enter your email to login"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoggedIn}  // Disable input if already logged in
      />
      {!isLoggedIn && <button onClick={handleLogin} disabled={loading}>Login with Email</button>}

      {isLoggedIn && spaceCreated && (
        <>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} disabled={loading} />
            <button type="submit" disabled={loading}>Submit</button>
          </form>
          {cid && <p>Secret CID: {cid}</p>}
        </>
      )}

      {/* Show messages and loading indicator */}
      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};
