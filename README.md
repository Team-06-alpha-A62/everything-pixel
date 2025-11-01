## Table of Contents

- [Overview](#everything-pixel)
- [Key Features](#key-features)
- [Setup Instructions](#setup-instructions)

<!-- End of Section -->

## Everything Pixel

A forum single-page application about pixel art, done with React, Firebase and SCSS.

### [Live demo](https://everything-pixel.web.app)

<!-- End of Section -->

## Key Features

- **User Authentication**  
  Secure user authentication powered by Firebase, allowing users to easily sign up and sign in to the platform.

- **Post Creation & Interaction**  
  Users can create posts and engage with content by upvoting, downvoting, commenting, and reporting posts for moderation.  
  ![Creating New Post](https://nikola-nenovski.com/everything-pixel/everything-pixel-new.png)  
  ![Viewing Post Details](https://nikola-nenovski.com/everything-pixel/everything-pixel-post.png)  

- **Search & Filter Posts**  
  Efficiently search for posts and filter results based on various criteria to quickly find relevant discussions.  
  ![Viewing Post Details](https://nikola-nenovski.com/everything-pixel/everything-pixel-dashboard.png)

- **User Dashboards**  
  Each user has a personal dashboard to view their followers, manage their profile, and see real-time notifications about interactions.  
  ![Viewing Post Details](https://nikola-nenovski.com/everything-pixel/everything-pixel-profile.png)  

- **Following System**  
  Users can follow others to stay updated with their activities and posts, fostering community engagement.
  ![Viewing Post Details](https://nikola-nenovski.com/everything-pixel/follow.gif)  

- **Admin Controls**  
  Admin users have special permissions to ban or unban users, with changes reflected in real-time across the platform.
  ![Viewing Post Details](https://nikola-nenovski.com/everything-pixel/everything-pixel-user-details.png)  
  ![Viewing Post Details](https://nikola-nenovski.com/everything-pixel/everything-pixel-users.png)  
  
- **Real-Time Notifications**  
  Stay informed with instant notifications for replies, upvotes, and other interactions to enhance user engagement.
  ![Viewing Post Details](https://nikola-nenovski.com/everything-pixel/notifications.png)  

- **User Profile Management**  
  Users can easily update their profiles, including personal information and preferences, to customize their experience.
  ![Viewing Post Details](https://nikola-nenovski.com/everything-pixel/everything-pixel-profile.png)


<!-- End of Section -->

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
