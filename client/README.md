📸 MERN Stack Instagram Clone
A full-stack social media application built with MongoDB, Express, React, and Node.js. This project allows users to create accounts, share photos, follow other users, like posts, and comment in real-time.

🚀 Features
Authentication: User Login & Signup (JWT & Bcrypt).

Feed: Dynamic home feed showing posts from followed users.

Create Post: Upload image URLs with captions.

Interactions: Like and Unlike posts.

Comments: Real-time commenting system.

Search: Find other users by username.

Profile: View user stats (Followers, Following, Posts) and grid view.

Responsive UI: styled to resemble the real Instagram.

🛠 Prerequisites
Before running the project, ensure you have the following installed:

Node.js (v14 or higher)

MongoDB (Make sure it is running locally on port 27017 or use an Atlas URI).

VS Code (Recommended editor).

⚙️ Installation & Setup
This project is divided into two parts: Server (Backend) and Client (Frontend). You must set up both.

1. Backend Setup (Server)
Open your terminal in the root folder.

Navigate to the server folder:

Bash

cd server
Install dependencies:

Bash

npm install
Start the Backend Server:

Bash

npm run dev
You should see: Server running on port 5000 and MongoDB Connected.

2. Frontend Setup (Client)
Open a new terminal (do not close the server terminal).

Navigate to the client folder:

Bash

cd client
Install dependencies:

Bash

npm install
Start the React Application (Vite):

Bash

npm run dev
You should see: ➜ Local: http://localhost:5173/

▶️ How to Run the App
To run the full application, you need two terminals running simultaneously:

Terminal 1: Runs the Backend (cd server -> npm run dev)

Terminal 2: Runs the Frontend (cd client -> npm run dev)

Once both are green and running, open your browser and go to: http://localhost:5173

🧪 Testing the App (Workflow)
Since the database is initially empty, follow these steps to see the features in action:

Signup: Go to the Signup page and create User A (e.g., ankit).

Create Post: Log in as User A and create a post (use an image URL).

Logout: Log out of User A.

Signup User B: Create a new account User B (e.g., apurva).

Search: Use the Search bar to find "ankit".

Follow: Click "Follow" on Ankit's profile.

Feed: Go to the Home Feed. You will now see Ankit's post.

Interact: Like the post and leave a comment.

🐛 Troubleshooting
"Connection Refused" / Blank Screen:

Make sure the Server terminal is running. The Frontend needs the Backend to work.

"MongoDB Connection Error":

Ensure your local MongoDB service is running. On Windows, check Services or run mongod.

"Module Not Found":

Make sure you ran npm install inside both the server folder AND the client folder.