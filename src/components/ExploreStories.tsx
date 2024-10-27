import React, { useState } from 'react';
import { getFile } from '../services/storachaService.tsx';

export const ExploreStories: React.FC = () => {
  const [cid, setCid] = useState<string>('');
  const [storyContent, setStoryContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);  // Error handling

  const handleFetchStory = async () => {
    try {
      const response = await getFile(cid);
      
      if (response) {  // Ensure response is not undefined (i.e., a valid Response object)
        const content = await response.text();
        setStoryContent(content);
        setError(null);  // Clear any previous errors
      } else {
        setError('No content available for this CID.');
      }
    } catch (error) {
      console.error('Failed to fetch the story:', error);
      setError('Failed to fetch the story. Please try again.');
    }
  };

  return (
    <div>
      <h2>Explore Scary Stories</h2>
      <input
        type="text"
        placeholder="Enter CID of the story"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
      />
      <button onClick={handleFetchStory}>Fetch Story</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {storyContent && <p>{storyContent}</p>}
    </div>
  );
};
