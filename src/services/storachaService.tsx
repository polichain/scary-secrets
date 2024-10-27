import { create } from '@web3-storage/w3up-client';
import '../styles/main.css'; // Import the CSS file

let client;
let logCallback; // Callback function to send logs to the UploadForm

// Set a callback to update log messages in the UploadForm
export const setLogCallback = (callback) => {
  logCallback = callback;
};

// Utility function to log both to console and to the UI
const logMessage = (message) => {
  console.log(message);
  if (logCallback) {
    logCallback(message);
  }
};

// Initialize the client if it hasn't been created yet
export const initializeClient = async () => {
  if (!client) {
    client = await create();
  }
};

// Login user with email
export const loginUser = async (email) => {
  try {
    await initializeClient();
    await client.login(email);
    logMessage('User logged in successfully!');
  } catch (error) {
    logMessage(`Error during login: ${error}`);
  }
};

// Create a new space or use an existing one
export const createOrUseSpace = async () => {
  try {
    await initializeClient();
    
    // Check if there's an existing space
    const spaces = await client.spaces();
    let space;

    if (spaces.length === 0) {
      // If no space exists, create a new one
      space = await client.createSpace('default-space');
      await client.setCurrentSpace(space.did());
      logMessage('Space created and set as current.');
    } else {
      // Use the first available space
      space = spaces[0];
      await client.setCurrentSpace(space.did());
      logMessage('Existing space set as current.');
    }
    
    return space;
  } catch (error) {
    logMessage(`Error creating or using space: ${error}`);
  }
};

// Upload a file
export const uploadFile = async (file) => {
  try {
    await initializeClient();
    await createOrUseSpace();
    
    // Upload the file
    const cid = await client.uploadFile(file);
    logMessage(`File uploaded successfully. CID: ${cid}`);
    return cid;
  } catch (error) {
    logMessage(`Error uploading file: ${error}`);
  }
};

// Retrieve a file by its CID
export const getFile = async (cid) => {
  try {
    const response = await fetch(`https://w3s.link/ipfs/${cid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch the file.');
    }
    logMessage('File retrieved successfully.');
    return response;
  } catch (error) {
    logMessage(`Error fetching file: ${error}`);
    throw error;
  }
};

// Delegate upload permissions to another DID
export const delegateUploadPermissions = async (toDid) => {
  try {
    await initializeClient(); // Ensure the client is initialized
    const space = await createOrUseSpace(); // Use the already created space
    const delegation = await client.createDelegation(toDid, ['upload/add'], {
      with: space.did(),
    });
    logMessage('Permissions delegated successfully.');
    return delegation;
  } catch (error) {
    logMessage(`Error delegating upload permissions: ${error}`);
    throw error;
  }
};
