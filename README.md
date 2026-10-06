# 📇 Contact Management System

A full-stack web application for managing personal and professional contacts, built with **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and a clean **vanilla HTML/CSS/JS** frontend.

---

## 📌 What Does This Project Do?

This project lets you **Create, Read, Update, and Delete (CRUD)** contact records through:

1. **A web UI** — open `http://localhost:5000` in your browser and use the app directly.
2. **REST API** — send HTTP requests via Postman or Thunder Client (great for testing).

Each contact stores a **name**, **phone number** (10 digits), and **email** (unique).

---

## 🛠️ Tech Stack

| What            | Why                                                        |
| --------------- | ---------------------------------------------------------- |
| **Node.js**     | JavaScript runtime — runs the server code                  |
| **Express.js**  | Web framework — handles routes and HTTP requests           |
| **MongoDB**     | NoSQL database — stores contact records                    |
| **Mongoose**    | ODM library — defines schemas and talks to MongoDB         |
| **dotenv**      | Loads secret config from a `.env` file                     |
| **nodemon**     | Auto-restarts the server when you edit code (dev only)     |
| **uuid**        | Generates unique IDs for each contact                      |
| **HTML/CSS/JS** | The frontend UI — no frameworks, just clean vanilla code   |

---

## 📂 Project Structure

```
Contact Management System/
│
├── config/
│   └── db.js                     ← Connects to MongoDB
│
├── controllers/
│   └── contactController.js      ← Business logic for all CRUD operations
│
├── models/
│   └── Contact.js                ← Mongoose schema (fields + validation rules)
│
├── public/                       ← Frontend (served by Express)
│   ├── index.html                ← Main HTML page
│   ├── css/
│   │   └── style.css             ← All styles
│   └── js/
│       └── app.js                ← Frontend logic (fetch API, modals, etc.)
│
├── routes/
│   └── contactRoutes.js          ← Maps URLs to controller functions
│
├── .env                          ← Your secret config — NOT pushed to GitHub
├── .env.example                  ← Template showing what .env should look like
├── .gitignore                    ← Tells Git to ignore node_modules/ and .env
├── package.json                  ← Project metadata + dependencies + scripts
├── server.js                     ← Entry point — starts Express & serves the UI
└── README.md                     ← This file
```

---

## 🧩 Contact Schema

| Field         | Type   | Rules                                                  |
| ------------- | ------ | ------------------------------------------------------ |
| `contactId`   | String | Auto-generated UUID, unique                            |
| `name`        | String | **Required**                                           |
| `phone`       | String | **Required**, must be exactly **10 digits**            |
| `email`       | String | **Required**, must be a **valid email**, must be **unique** |
| `createdAt`   | Date   | Auto-generated timestamp                               |
| `updatedAt`   | Date   | Auto-updated timestamp                                 |

---

# 🚀 Complete Setup Guide (Step by Step)

> **Follow every step in order.** Each step tells you exactly what to do, what command to run, and what you should see.

---

## Step 1 — Install Prerequisites

You need **two things** installed before starting.

### 1a. Install Node.js

1. Go to 👉 [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the big green button).
3. Run the installer → click **Next** through everything (keep defaults).
4. **Verify it worked** — open your terminal (Command Prompt / PowerShell) and run:

```bash
node --version
```

✅ **You should see** something like `v20.x.x` or higher. Any version **14+** is fine.

```bash
npm --version
```

✅ **You should see** something like `10.x.x`.

---

### 1b. Install MongoDB

Pick **ONE** of these two options:

#### Option A: MongoDB Locally (on your computer)

1. Download from 👉 [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install it. On Windows, **check** "Install MongoDB as a Service" so it runs automatically.
3. Verify it's running:

```bash
mongosh
```

✅ You should see a prompt like `test>`. Type `exit` to close it.

> 💡 If `mongosh` is not found, install MongoDB Shell separately from [here](https://www.mongodb.com/try/download/shell).

#### Option B: MongoDB Atlas (Free Cloud — No Install)

1. Go to 👉 [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a **free account** → Create a **free cluster** (M0 Sandbox).
3. Under **Network Access** → click **Add IP Address** → click **Allow Access from Anywhere**.
4. Under **Database Access** → create a database user with a username and password.
5. Click **Connect** → **Connect your application** → copy the connection string:
   ```
   mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/contact_management
   ```
6. Replace `yourUsername` and `yourPassword` with your actual credentials.
7. You'll paste this in Step 3 below.

---

## Step 2 — Install Project Dependencies

1. Open your terminal (Command Prompt, PowerShell, or VS Code terminal).
2. Navigate to the project folder:

```bash
cd "C:\Users\abhis\Downloads\Contact Management System"
```

> ⚠️ Use quotes because the folder name has spaces.

3. Install all packages:

```bash
npm install
```

✅ **You should see:**
```
added 88 packages, and audited 89 packages in 10s
found 0 vulnerabilities
```

> 💡 This downloads Express, Mongoose, and all other libraries into a `node_modules/` folder.

---

## Step 3 — Configure the Environment File

1. Open the file `.env` in any text editor (VS Code, Notepad, etc.).
2. You'll see:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/contact_management
```

3. **Using MongoDB locally?** → Leave it as-is. Done! ✅
4. **Using MongoDB Atlas?** → Replace the second line with your Atlas connection string:

```
PORT=5000
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/contact_management
```

> ⚠️ No spaces around the `=` sign. No quotes around the value.

---

## Step 4 — Start the Server

Make sure you're in the project folder, then run:

```bash
npm run dev
```

✅ **You should see exactly this:**
```
Server running on http://localhost:5000
MongoDB Connected: localhost
```

> 💡 `npm run dev` uses **nodemon** — the server restarts automatically when you edit code. Press `Ctrl + C` to stop it.

---

### ❌ Troubleshooting

| Problem | Fix |
|---------|-----|
| `MongoServerError: connect ECONNREFUSED` | MongoDB is not running. Start the MongoDB service, or double-check your Atlas URI. |
| `Error: Cannot find module 'express'` | You skipped `npm install`. Go back to Step 2. |
| `EADDRINUSE: port 5000` | Port 5000 is taken. Change `PORT=5001` in `.env`, save, and restart. |
| `MongooseServerSelectionError` (Atlas) | Wrong username/password in URI, or your IP isn't whitelisted in Atlas → Network Access → Add Current IP. |

---

## Step 5 — Open the App in Your Browser

1. Open your web browser (Chrome, Edge, Firefox — any).
2. Go to:

```
http://localhost:5000
```

✅ **You should see the Contact Manager UI** with:
- A purple header saying **"📇 Contact Manager"**
- A search bar and an **"+ Add Contact"** button
- An empty state message: **"No contacts yet"**

---

## Step 6 — Use the App (Try It Out!)

### ➕ Add a Contact

1. Click the **"+ Add Contact"** button.
2. A form pops up. Fill in:
   - **Name:** `Abhishek Sharma`
   - **Phone:** `9876543210`
   - **Email:** `abhishek@example.com`
3. Click **"Save Contact"**.
4. ✅ A green toast says **"Contact created successfully!"** and the contact card appears.

### ➕ Add a Second Contact

1. Click **"+ Add Contact"** again.
2. Fill in:
   - **Name:** `Riya Patel`
   - **Phone:** `8765432109`
   - **Email:** `riya@example.com`
3. Click **"Save Contact"**.
4. ✅ Now you see **2 contact cards**.

### 🔍 Search

1. Type `riya` in the search bar.
2. ✅ Only Riya's card is shown. Clear the search to see all contacts again.

### ✏️ Edit a Contact

1. On any contact card, click the **✏️ (pencil)** button.
2. Change the phone number to `1111111111`.
3. Click **"Update Contact"**.
4. ✅ The card updates instantly.

### 🗑️ Delete a Contact

1. On any contact card, click the **🗑️ (trash)** button.
2. A confirmation popup appears: **"Are you sure?"**
3. Click **"Delete"**.
4. ✅ The contact is removed.

### ❌ Try Invalid Data (Test Validation)

1. Click **"+ Add Contact"**.
2. Leave all fields empty and click **"Save Contact"**.
3. ✅ You see red error messages under each field.
4. Enter a 5-digit phone number → ✅ Error: **"Phone must be exactly 10 digits."**
5. Enter `not-an-email` as email → ✅ Error: **"Enter a valid email address."**
6. Try adding a contact with the **same email** as an existing one → ✅ Error: **"A contact with this email already exists."**

---

## Step 7 — (Optional) Test the API with Postman

The API works independently from the UI. You can test it with **Postman** or **Thunder Client**.

### Install Postman

1. Download from 👉 [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. Install and open it (you can skip sign-in).

### API Endpoints

| Method     | URL                                    | Body (JSON)                                                       | What It Does           |
| ---------- | -------------------------------------- | ----------------------------------------------------------------- | ---------------------- |
| **POST**   | `http://localhost:5000/contacts`       | `{"name": "...", "phone": "...", "email": "..."}`                 | Creates a new contact  |
| **GET**    | `http://localhost:5000/contacts`       | _none_                                                            | Lists all contacts     |
| **GET**    | `http://localhost:5000/contacts/:id`   | _none_                                                            | Gets one contact       |
| **PUT**    | `http://localhost:5000/contacts/:id`   | `{"name": "..."}` (only the fields you want to change)            | Updates a contact      |
| **DELETE** | `http://localhost:5000/contacts/:id`   | _none_                                                            | Deletes a contact      |

> `:id` = the `contactId` (UUID) from the response when you created the contact.

### Example: Create a Contact in Postman

1. Create a new request → method: **POST** → URL: `http://localhost:5000/contacts`
2. Click **Body** → **raw** → change dropdown to **JSON**
3. Paste:
   ```json
   {
     "name": "Test User",
     "phone": "5555555555",
     "email": "test@example.com"
   }
   ```
4. Click **Send**.
5. ✅ You should get a `201 Created` response with the contact data.

### Example Responses

**✅ Success (201 Created):**
```json
{
  "success": true,
  "message": "Contact created successfully.",
  "data": {
    "contactId": "a1b2c3d4-e5f6-...",
    "name": "Test User",
    "phone": "5555555555",
    "email": "test@example.com",
    "createdAt": "2026-10-06T...",
    "updatedAt": "2026-10-06T..."
  }
}
```

**❌ Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "Name is required",
    "12345 is not a valid phone number! Must be exactly 10 digits."
  ]
}
```

**❌ Duplicate Email (409):**
```json
{
  "success": false,
  "message": "A contact with this email already exists."
}
```

**❌ Not Found (404):**
```json
{
  "success": false,
  "message": "Contact not found."
}
```

---

## Step 8 — Push to GitHub

### 8a. Create a GitHub Repository

1. Go to 👉 [https://github.com](https://github.com) and log in.
2. Click the **`+`** icon (top-right) → **New repository**.
3. Fill in:
   - **Repository name:** `contact-management-system`
   - **Description:** `Contact Management System using Node.js, Express, MongoDB, and Mongoose`
   - **Visibility:** Public
   - ⚠️ Do **NOT** check "Add a README" (we already have one).
4. Click **Create repository**.

### 8b. Push Your Code

Open the terminal in your project folder and run these commands **one by one**:

```bash
git init
```
> ✅ Initializes an empty Git repository.

```bash
git add .
```
> ✅ Stages all files (`.gitignore` will exclude `node_modules/` and `.env`).

```bash
git commit -m "Initial commit: Contact Management System with UI and CRUD APIs"
```
> ✅ Creates your first commit.

```bash
git branch -M main
```
> ✅ Renames the branch to `main`.

```bash
git remote add origin https://github.com/YOUR_USERNAME/contact-management-system.git
```
> ⚠️ Replace `YOUR_USERNAME` with your actual GitHub username.

```bash
git push -u origin main
```
> ✅ Pushes everything to GitHub. You may be prompted to log in.

5. **Refresh your GitHub repo page** — you should see all your files and this README! 🎉

---

## ⚠️ Validation Rules Summary

| Field   | Rule                            | Error                                                |
| ------- | ------------------------------- | ---------------------------------------------------- |
| `name`  | Required                        | `"Name is required"`                                 |
| `phone` | Required, exactly 10 digits     | `"Must be exactly 10 digits"`                        |
| `email` | Required, valid format, unique  | `"Not a valid email"` / `"Email already exists"`     |

---

## ✅ Features

- [x] Clean, minimal, responsive web UI
- [x] Add, view, edit, and delete contacts from the browser
- [x] Real-time search/filter by name, phone, or email
- [x] Client-side + server-side validation
- [x] Toast notifications for success/error feedback
- [x] Delete confirmation modal
- [x] Auto-generated avatar initials
- [x] Contact cards with hover effects
- [x] Mobile-friendly responsive design
- [x] REST API (also works with Postman)
- [x] Proper error handling (400, 404, 409, 500)
- [x] Environment-based config via `.env`

---

## 📦 Deliverables Checklist

- [x] Node.js + Express.js project with Mongoose integration
- [x] MongoDB database named `contact_management`
- [x] ContactSchema with `contactId`, `name`, `phone`, `email`
- [x] Validation rules (10-digit phone, valid email, required fields)
- [x] POST `/contacts` — Add new contact
- [x] GET `/contacts` — Fetch all contacts
- [x] GET `/contacts/:id` — Fetch contact by ID
- [x] PUT `/contacts/:id` — Update contact
- [x] DELETE `/contacts/:id` — Delete contact
- [x] Proper error handling and validation error messages
- [x] Web UI for all CRUD operations
- [x] README.md with setup instructions, API docs, and examples
- [x] `.gitignore` excludes `node_modules/` and `.env`
- [x] GitHub-ready

---

## 📄 License

MIT
