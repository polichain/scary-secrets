import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadForm from './components/UploadForm.tsx';
import { LandingPage } from './components/LandingPage.tsx';  // Import the LandingPage component
import { PermissionForm } from './components/PermissionForm.tsx';  // Import the LandingPage component
import { ExploreStories } from './components/ExploreStories.tsx';  // Import the LandingPage component

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Scary Secrets Vault</h1>
        <Routes>
          {/* Set LandingPage as the default route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/submit" element={<UploadForm />} />
          <Route path="/permission" element={<PermissionForm />} />
          <Route path="/explore" element={<ExploreStories />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
