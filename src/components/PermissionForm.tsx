import React, { useState } from 'react';
import { delegateUploadPermissions } from '../services/storachaService.tsx';
import '../styles/main.css'; // Import the CSS file

export const PermissionForm: React.FC = () => {
  const [toDid, setToDid] = useState<string>('');
  const [delegationResult, setDelegationResult] = useState<string | null>(null);

  const handlePermissionSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const delegation = await delegateUploadPermissions(toDid);  // Delegate permission to a DID
      setDelegationResult(`Delegation created! Permissions granted to DID: ${toDid}`);
    } catch (error) {
      console.error('Failed to delegate permissions', error);
    }
  };

  return (
    <div>
      <h2>Delegate Permissions</h2>
      <form onSubmit={handlePermissionSubmit}>
        <input
          type="text"
          placeholder="Enter DID"
          value={toDid}
          onChange={(e) => setToDid(e.target.value)}
        />
        <button type="submit">Delegate</button>
      </form>
      {delegationResult && <p>{delegationResult}</p>}
    </div>
  );
};
