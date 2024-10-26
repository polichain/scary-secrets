import React from 'react';
import { UploadForm } from './components/UploadForm.tsx';
import { SecretViewer } from './components/SecretViewer.tsx';
import { PermissionForm } from './components/PermissionForm.tsx';

const App: React.FC = () => {
  return (
    <div>
      <h1>Scary Secrets Vault</h1>
      <UploadForm />
      <SecretViewer />
      <PermissionForm />
    </div>
  );
};

export default App;
