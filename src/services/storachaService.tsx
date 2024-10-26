import { create } from '@web3-storage/w3up-client';

let client: any;  // Storacha client instance

// Initialize the Storacha client
export async function initStoracha(): Promise<void> {
  try {
    client = await create();
    console.log('Storacha client initialized');
  } catch (error) {
    console.error('Failed to initialize Storacha client:', error);
  }
}

// Login to Storacha using email (required step before creating spaces or uploading files)
export async function login(email: string): Promise<boolean> {
  try {
    if (!email || !email.includes('@')) {
      throw new Error("Invalid email format. Please enter a valid email.");
    }

    await client.login(email);  // Sends email confirmation to login
    console.log('Login successful, check your email to validate login');
    
    // If login is successful, the user likely has an account
    return true;
  } catch (error) {
    console.error('Failed to login:', error);
    return false;
  }
}

// Create a new DID space for storing scary secrets
export async function createDID(email: string): Promise<boolean> {
  try {
    if (!client) throw new Error('Client not initialized. Please call initStoracha first.');

    const space = await client.createSpace(email);  // Create space with email as identifier
    await client.setCurrentSpace(space.did());  // Set the current space
    console.log(`DID created: ${space.did()}`);
    
    return true;
  } catch (error) {
    console.error('Failed to create DID:', error);
    return false;
  }
}

// Upload a file to Storacha
export async function uploadFile(file: File): Promise<string | void> {
  try {
    if (!client) throw new Error('Client not initialized. Please call initStoracha first.');

    const currentSpace = await client.getCurrentSpace();  // Ensure space is set
    if (!currentSpace) {
      throw new Error('No current space set. Use createDID() or setCurrentSpace().');
    }

    const cid = await client.uploadFile(file);  // Upload file and return its CID
    console.log(`File uploaded! CID: ${cid}`);
    return cid;  // CID (Content Identifier) used to access the file via IPFS
  } catch (error) {
    console.error('Failed to upload file:', error);
  }
}

// Retrieve the file by CID, handle images correctly
export async function getFile(cid: string): Promise<string | void> {
  try {
    const url = `https://w3s.link/ipfs/${cid}`;  // URL for IPFS retrieval
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`Failed to fetch file, status code: ${response.status}`);
    }

    // Check the content type to handle images
    if (response.headers.get('content-type')?.startsWith('image')) {
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;  // Use this URL to display the image
    }

    return await response.text();  // Return text if not an image
  } catch (error) {
    console.error('Failed to fetch file:', error);
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
