
# Scary Secrets Vault 🎃👻

**Scary Secrets Vault** is a decentralized web application built to let users share their spooky stories and Halloween-themed files in a secure, decentralized way. The platform leverages **Storacha Network** to store files in decentralized DID spaces and **IPFS** to provide Content Identifiers (CIDs) that allow public sharing of these scary stories and files. Users can upload, explore, and view content related to Halloween, with a fully decentralized backend powered by Web3 technologies.

## 📌 **Purpose**
The main goal of Scary Secrets Vault is to create a themed platform for users to share spooky stories, Halloween art, and other scary content securely. By connecting to decentralized networks like **Storacha**, the project ensures that all files are stored in secure, permissioned DID spaces, which offers data sovereignty and privacy, while also making use of IPFS for decentralized public access.

This project was created for a **Halloween Hackathon** and integrates the **Storacha Network**, fulfilling the requirement to utilize Storacha's decentralized storage technology.

## 🔧 **Technologies Used**

### Frontend
- **React**: A JavaScript library for building user interfaces. The app leverages **React** for its component-based architecture, making it scalable and easy to manage.
- **TypeScript**: Provides static typing to improve code quality, catch errors early, and offer better development experience.
- **React Router**: Handles routing in the app, allowing seamless navigation between the pages (e.g., landing page, upload form, and secret exploration).
- **CSS Styling**: Custom CSS ensures a spooky, user-friendly UI with Halloween-themed colors and elements. The design is responsive and works well on both desktop and mobile.

### Web3 & Decentralized Storage
- **Storacha Network**: The core decentralized storage platform we’re using. It handles the secure storage of files in **DID (Decentralized Identifier)** spaces, allowing users to store their content in personal spaces that are cryptographically secure.
- **IPFS (InterPlanetary File System)**: Files uploaded are accessible via unique Content Identifiers (CIDs). The app provides functionality to upload files and share them publicly through IPFS.
- **Web3-Storage/W3UP Client**: A package used to interface with Storacha and IPFS. This allows us to upload files, manage DID spaces, and create delegations for other users.

### Authentication & Permissions
- **Email-Based Authentication**: Users log in using their email addresses. Upon login, they are sent an email to validate their session. Storacha then uses **UCAN (User Controlled Authorization Networks)** to handle permissions securely for accessing and uploading content to DID spaces.
- **DID (Decentralized Identifier) Management**: Users can either create a new DID space to store their files or select from existing DID spaces they have access to. DID spaces provide a secure way to store files while managing access controls.

## 🖥️ **Features**

### 1. **Login & Authentication**
   - Users authenticate using their email address. Upon successful login, users receive an email confirmation to validate their session.
   - The app uses **Storacha**'s built-in login system for decentralized authentication.
   
### 2. **Uploading Scary Content**
   - Users can upload text, images, and other files (related to Halloween themes) into their **DID space** or **IPFS**.
   - Before uploading, users must either create a new **DID space** or select an existing space from their account.
   - Files are uploaded to the Storacha-backed storage with a **CID** (Content Identifier) that allows the file to be publicly accessible.

### 3. **Exploring Stories**
   - Users can explore scary stories and other files uploaded by others by entering the corresponding **CID** in the explorer.
   - The app fetches the file from IPFS and displays its content.

### 4. **DID Space Management**
   - Users can create or select a DID space for managing their scary stories. All uploaded files are securely stored in their respective DID spaces.
   - Delegation of DID spaces is possible, allowing other users to upload or access files in a shared space.

### 5. **Content Sharing**
   - Files uploaded are accessible by anyone with the corresponding **CID**, which makes it easy to share scary stories and other content with the world.
   - Users can explore content that others have uploaded by entering the correct **CID** for any story.

## 🛠️ **How It Works**

1. **User Authentication**: 
   - Users enter their email address and receive a verification email to log in.
   - Once logged in, they can manage their DID spaces or upload files.

2. **Uploading Files**: 
   - The user selects or creates a DID space.
   - Files are uploaded to Storacha, which generates a CID for the content.
   - The CID is stored in the user's account and can be used to share or access the content.

3. **Fetching Files**: 
   - Users can fetch content by entering the CID in the exploration page.
   - The app retrieves the content from IPFS and displays it to the user.

## 🚀 **Running the Project Locally**

### Prerequisites
- Node.js and npm/yarn installed on your machine.
- A Storacha Network account.

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/polichain/scary-secrets.git
   cd scary-secrets
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Start the development server**:

   ```bash
   yarn start
   ```

4. **Visit the application** at `http://localhost:3000`.

## 📝 **How to Contribute**

We welcome contributions! If you find a bug or want to propose a new feature, feel free to open an issue or create a pull request.

To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

## 💡 **Future Enhancements**

- **Story Categorization**: Add categories like “Short Scares” or “Urban Legends.”
- **User Profiles**: Allow users to manage their uploaded content, view their history, and interact with others.
- **Dark Mode Toggle**: Implement a theme switcher to allow users to switch between dark and light modes.

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
