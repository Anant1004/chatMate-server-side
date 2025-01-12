# MERN Chatting Application

A full-stack chatting application built with the MERN (MongoDB, Express, React, Node.js) stack. This app enables real-time messaging, group chats, active status indicators, and friend-based access to conversations.

## Features

- **User Authentication**: Secure user signup and login with hashed passwords.
- **Friend Requests**: Users can send and accept friend requests. Only friends can start a chat.
- **Real-Time Messaging**: Real-time one-on-one and group messaging.
- **Active Status**: Shows online/offline status for users.
- **Group Chats**: Users can create group chats with multiple friends.
- **Message Read Receipts**: Indicates whether messages are seen or read.

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token) for session management, bcrypt for password hashing
- **Cloud Storage**: Multer and Cloudinary 

## Prerequisites

- Node.js installed on your machine
- MongoDB database instance (local or cloud-based, e.g., MongoDB Atlas)

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/mern-chat-app.git
   cd mern-chat-app
   ```

2. **Backend Setup**

   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the root of the `server` directory and add the following environment variables:
     ```
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**

   - Navigate to the `client` directory:
     ```bash
     cd ../client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

## Usage

1. **Sign Up and Login**: Users can sign up with a unique username and email. After logging in, they will receive a JWT token.
2. **Add Friends**: Users can send friend requests to others. Once accepted, they can start one-on-one chats.
3. **Start a Chat**: Select a friend from the friend list to start a private chat or create a group chat with multiple friends.
4. **Send Messages**: Real-time messaging within one-on-one or group chats.
5. **Active Status and Read Receipts**: See which friends are online and track message read status.

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Login with email and password.
- `POST /api/auth/logout`: Logout the user.

### Friendships
- `POST /api/friends/request`: Send a friend request.
- `POST /api/friends/accept`: Accept a friend request.

### Messaging
- `POST /api/messages/send`: Send a message to a user or group.
- `GET /api/messages/:chatId`: Get all messages from a specific chat.

### Group Chats
- `POST /api/groups/create`: Create a new group chat.
- `POST /api/groups/add-member`: Add a member to an existing group.

### Upload profile Pic
- `POST /api/auth/updateAvatar`: Upload a new Profile Picture.


## Folder Structure

```plaintext
mern-chat-app/
├── client/         # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
├── server/         # Node.js backend
│   ├── models/     # Mongoose schemas
│   ├── routes/     # API endpoints
│   ├── controllers/# Route handlers
│   ├── middleware/ # Middleware for auth
│   ├── utils/      # Utility functions
│   ├── .env
│   └── server.js
├── README.md
└── .gitignore
```

## Security

- **Password Hashing**: Passwords are hashed using bcrypt before storing in the database.
- **JWT Authentication**: Token-based authentication for secure API access.

## Future Enhancements

- Typing indicators for real-time feedback
- Push notifications for new messages
- Enhanced user profiles
- Image and file sharing

## Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature-name'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## Copyright

- copyright claimed by Web4Script Team.
