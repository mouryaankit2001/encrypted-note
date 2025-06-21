# Encrypted Notes Manager

A secure web application for storing encrypted notes using the MERN stack with true end-to-end encryption.

## Features

- User authentication with JWT tokens
- **End-to-end encryption** - data is encrypted on the client before transmission
- Create, read, update, and delete encrypted notes
- AES-256 encryption for note data
- Zero-knowledge server - the server never sees unencrypted data
- Modern React frontend with Material UI

## Security Features

- Password hashing using bcrypt (for authentication)
- **Client-side AES-256 encryption** for true end-to-end security
- Encryption keys derived from user password using PBKDF2
- JWT-based authentication
- Protected API endpoints with authentication middleware

## How End-to-End Encryption Works

1. **Key Generation**: When a user logs in, an encryption key is derived from their password and email using PBKDF2
2. **Encryption Process**: 
   - Notes are encrypted on the client side before being sent to the server
   - The server only receives and stores already-encrypted data
   - Even if the database is compromised, notes remain encrypted
3. **Decryption Process**:
   - When retrieving notes, encrypted data is received from the server
   - Notes are decrypted locally in the browser using the user's encryption key
   - Unencrypted data never leaves the user's device

## Tech Stack

- **Frontend**: React, TypeScript, Material-UI, Context API
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Encryption**: crypto-js (AES-256, PBKDF2)

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Environment Variables

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/encrypted-notes
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Create a `.env` file in the client directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/encrypted-notes-manager.git
cd encrypted-notes-manager
```

2. Install server dependencies:
```
cd server
npm install
```

3. Install client dependencies:
```
cd ../client
npm install
```

### Running the Application

1. Start the server (development mode):
```
cd server
npm run dev
```

2. Start the client (in a new terminal):
```
cd client
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

### Production Build

1. Build the client:
```
cd client
npm run build
```

2. Start the server in production mode:
```
cd ../server
npm start
```