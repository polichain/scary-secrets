import React, { useState } from 'react';
import { getFile } from '../services/storachaService.tsx';

export const SecretViewer: React.FC = () => {
  const [cid, setCid] = useState<string>('');
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!cid) {
      alert("Please provide a valid CID.");
      return;
    }

    setLoading(true);
    setMessage("Fetching the secret...");

    try {
      const result = await getFile(cid);  // Fetch the file (could be text or image)
      if (result) {
        if (result.startsWith('blob:')) {
          setImageUrl(result);  // If it's an image, set the image URL
          setMessage("Image fetched successfully.");
        } else {
          setFileContent(result);  // Otherwise, display the file content as text
          setMessage("Text fetched successfully.");
        }
      } else {
        setMessage("No response for this CID.");
      }
    } catch (error) {
      console.error('Error fetching secret:', error);
      setMessage("Failed to fetch the secret. Please check the CID and try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>View Secret</h2>
      <input
        type="text"
        placeholder="Enter the CID of the secret"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleFetch} disabled={loading}>Fetch Secret</button>

      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      {imageUrl && <img src={imageUrl} alt="Secret Image" />}
      {fileContent && <p>Secret Content: {fileContent}</p>}
    </div>
  );
};
