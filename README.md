# 📬 Newsletter Web App — MERN Stack

A full-stack **Newsletter Web Application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. Users can sign up via **Email (OTP-based)** or **Google OAuth**, and receive newsletters once verified. Admins can securely broadcast newsletters to all verified users.

---

## 🎥 Demo

[![Watch Demo](https://img.youtube.com/vi/3xExa8g6jAI/hqdefault.jpg)](https://www.youtube.com/watch?v=3xExa8g6jAI)

> Click the image or [watch the demo here](https://www.youtube.com/watch?v=3xExa8g6jAI)

---

## 🚀 Features

- 🔐 Google OAuth 2.0 Authentication  
- ✉️ Email OTP Verification (via Nodemailer & Gmail)  
- 📬 Newsletter delivery to verified users  
- 🛡️ Secure Admin login for broadcasting  
- 📦 MongoDB database integration with Mongoose  
- 🌐 Fully deployed using Netlify (Frontend) & Render (Backend)  
- 🎨 Responsive frontend UI using React and Tailwind CSS

---

## 🛠️ Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Frontend    | React, Tailwind CSS           |
| Backend     | Node.js, Express.js           |
| Auth        | Google OAuth 2.0, OTP via Email |
| Database    | MongoDB (via Mongoose)        |
| Deployment  | Netlify (frontend), Render (backend) |

---

## 🌱 Learning Outcomes

- React routing & state management  
- Tailwind-based responsive UI design  
- Email authentication & Google OAuth flows  
- Session handling and cookies with Passport.js  
- Backend architecture & MongoDB schema design  
- Deployment pipelines for full-stack apps  
- Debugging, edge case handling & production readiness

---

## ⚙️ Environment Setup

Create a `.env` file in your `server/` directory:

```env
EMAIL_USER=your_gmail
EMAIL_PASS=your_gmail_app_password
MONGODB_URI=your_mongodb_uri
ADMIN_PASS=admin_pass
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=your_frontend_url
````

---

## ▶️ Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/newsletter-app.git
cd newsletter-app

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Start backend server
npm run dev

# Start frontend server
cd ../client
npm start
```

---

## 🔐 Admin Login

Admins can log in securely using email and password (stored as env variables) to send newsletters to all verified users.

---

## 📢 Deployment

* **Frontend**: Deployed using Netlify
* **Backend**: Hosted on Render
* Redirects and environment variables configured for OAuth and CORS

---

## 📎 License

This project is open-source and available under the [MIT License](LICENSE).

---
