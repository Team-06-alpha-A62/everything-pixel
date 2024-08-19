# Everything Pixel

## Setup Instructions

### Step 1: Configure the Environment Variables

1. Navigate to the `/template` folder of the project.
2. Create a `.env.local` file in the `/template` folder if it doesn't already exist.
3. Open the `.env.local` file and add the following environment variables:

   ```plaintext
   VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
   VITE_FIREBASE_DATABASE_URL=YOUR_FIREBASE_DATABASE_URL
   ```

   **Explanation:**

   - **VITE_FIREBASE_API_KEY**: This is the API key for your Firebase project. Replace `YOUR_FIREBASE_API_KEY` with the actual API key provided by Firebase.
   - **VITE_FIREBASE_AUTH_DOMAIN**: This is the authentication domain for your Firebase project. Replace `YOUR_FIREBASE_AUTH_DOMAIN` with the domain provided by Firebase.
   - **VITE_FIREBASE_PROJECT_ID**: This is the unique identifier for your Firebase project. Replace `YOUR_FIREBASE_PROJECT_ID` with your project's ID.
   - **VITE_FIREBASE_STORAGE_BUCKET**: This is the storage bucket URL for your Firebase project. Replace `YOUR_FIREBASE_STORAGE_BUCKET` with your storage bucket URL.
   - **VITE_FIREBASE_MESSAGING_SENDER_ID**: This is the messaging sender ID for Firebase Cloud Messaging. Replace `YOUR_FIREBASE_MESSAGING_SENDER_ID` with the provided ID.
   - **VITE_FIREBASE_APP_ID**: This is the app ID for your Firebase project. Replace `YOUR_FIREBASE_APP_ID` with your app's ID.
   - **VITE_FIREBASE_DATABASE_URL**: This is the database URL for your Firebase Realtime Database. Replace `YOUR_FIREBASE_DATABASE_URL` with your database's URL.

   **Important:** Keep this file secure and avoid sharing it publicly as it contains sensitive information.

### Step 2: Install Dependencies

1. Open a terminal and navigate to the `/template` folder of the project.
2. Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

   This will install all the required packages for the project as specified in the `package.json` file.

### Step 3: Run the Application

1. After installing the dependencies, remain in the `/template` folder.
2. Run the following command to start the development server:

   ```bash
   npm run dev
   ```

   This will start the application in development mode. The server will usually be accessible at `http://localhost:3000` (or the port specified in your configuration).

3. Open your web browser and navigate to the address displayed in your terminal to see the running application.
