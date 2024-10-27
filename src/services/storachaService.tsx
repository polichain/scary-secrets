import { create } from '@web3-storage/w3up-client';

let client: any;  // Storacha client

// Initialize Storacha Client
export async function initStoracha(): Promise<void> {
  try {
    client = await create();  // Create the client
    console.log('Storacha client initialized');
  } catch (error) {
    console.error('Failed to initialize Storacha client:', error);
  }
}

// Login User
export async function login(email: string): Promise<boolean> {
  if (!client) {
    await initStoracha();  // Ensure the client is initialized before login
  }

  try {
    await client.login(email);  // Call login on the initialized client
    console.log('Login successful, check your email to validate login.');
    return true;
  } catch (error) {
    console.error('Failed to login:', error);
    return false;
  }
}


// Set an existing DID as the current working space
export async function setCurrentDID(did: string): Promise<void> {
  try {
    await client.setCurrentSpace(did);
    console.log(`Successfully set current DID: ${did}`);
  } catch (error) {
    console.error('Failed to set current DID:', error);
    throw error;
  }
}

// Upload a file to the current DID space
export async function uploadFile(file: File): Promise<string | void> {
  try {
    const currentSpace = client.getCurrentSpace();
    if (!currentSpace) {
      throw new Error('No current space set. Use createSpace() or setCurrentSpace() first.');
    }

    const cid = await client.uploadFile(file);
    console.log(`File uploaded successfully! CID: ${cid}`);
    return cid;
  } catch (error) {
    console.error('Failed to upload file:', error);
    throw error;
  }
}

// UCAN Delegation (for permissions)
export async function delegatePermissions(toDid: string): Promise<void> {
  try {
    const abilities = ['space/blob/add', 'upload/add'];
    const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24);  // Valid for 24 hours

    const delegation = await client.createDelegation(toDid, abilities, { expiration });
    console.log('Delegation created:', delegation);
  } catch (error) {
    console.error('Failed to delegate permissions using UCAN:', error);
  }
}

// Retrieve the file by CID, handle images correctly
export async function getFile(cid: string): Promise<Response | void> {
  try {
    const url = `https://w3s.link/ipfs/${cid}`;  // Replace with actual IPFS URL or Storacha integration
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }

    return response;  // Return Response object
  } catch (error) {
    console.error('Failed to fetch file:', error);
    return;  // Return void in case of error
  }
}

// Delegate permissions to another DID (Decentralized Identifier)
export async function delegateUploadPermissions(toDid: string): Promise<any> {
  try {
    if (!client) throw new Error('Client not initialized. Please call initStoracha first.');

    const currentSpace = await client.getCurrentSpace();
    if (!currentSpace) {
      throw new Error('No current space set. Use createDID() or setCurrentSpace().');
    }

    const abilities = ['space/blob/add', 'upload/add'];  // Define the permissions
    const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24);  // 24 hours

    const delegation = await client.createDelegation(toDid, abilities, { expiration });
    return delegation;
  } catch (error) {
    console.error('Failed to delegate upload permissions:', error);
  }
}
