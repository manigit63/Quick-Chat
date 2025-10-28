# Quick-Chat


About
This project is a Full Stack Real-Time Chat Application built using the MERN Stack (MongoDB, Express, React, Node.js) with Socket.io for real-time communication. It features instant messaging, online/offline status, image sharing, profile management, and secure authentication — all deployed on Vercel for frontend and backend.

🚀 Core Features

💬 Real-Time Messaging with Socket.io (no page reloads)

🧑‍💻 User Authentication (Signup/Login with JWT + bcrypt)

🟢 Online/Offline User Status tracking

🖼️ Image Uploads via Cloudinary (for profile & chat media)

🔍 User Search and unseen message count

📱 Responsive UI built with React + Tailwind CSS

⚙️ State Management using React Context API

☁️ Backend API with Express & MongoDB Atlas

🔐 Protected Routes and environment variable management

🚀 Deployment on Vercel with environment-based configs

🏗️ Tech Stack

Frontend: React (Vite) + Tailwind CSS + Axios + Socket.io Client + React Hot Toast
Backend: Node.js + Express + MongoDB + Mongoose + JWT + Bcrypt + Cloudinary + Socket.io
Database: MongoDB Atlas
Hosting: Vercel (Client + Server)

🧩 Architecture Highlights

Modular frontend structure with components/, pages/, and context/ folders.

Backend API routes for users & messages with proper authentication middleware.

Cloudinary integration for image uploads and secure URL storage.

Socket.io server manages user connections, message delivery, and online status.

React Contexts for global state:

OContext → authentication & socket connection

ChatContext → users, messages, unseen counts, socket updates


🧠 Key Learnings

Implementing real-time features using Socket.io.

Structuring MERN apps for frontend-backend separation.

Managing authentication tokens and protected routes.

Handling media uploads and environment configurations.

Deploying full-stack applications on Vercel.

🧾 Summary

This project provides a complete end-to-end real-time chat experience using modern MERN stack technologies.
It focuses on clean UI, modular structure, secure authentication, and scalable real-time architecture — ideal for beginners exploring full-stack development.