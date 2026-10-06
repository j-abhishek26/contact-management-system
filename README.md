# Contact Management System

A simple web app to manage contacts using Node.js, Express, MongoDB, and Mongoose.

## Setup

1. Clone the repo and install dependencies:
```bash
git clone https://github.com/YOUR_USERNAME/contact-management-system.git
cd contact-management-system
npm install
```

2. Create a `.env` file in the root folder:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/contact_management
```
Replace `MONGO_URI` with your MongoDB Atlas connection string if needed.

3. Start the server:
```bash
npm run dev
```

4. Open `http://localhost:5000` in your browser to use the UI.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /contacts | Add a new contact |
| GET | /contacts | Get all contacts |
| GET | /contacts/:id | Get a contact by contactId |
| PUT | /contacts/:id | Update a contact by contactId |
| DELETE | /contacts/:id | Delete a contact by contactId |

## Example Requests and Responses

### POST /contacts — Add a new contact

**Request:**
```json
{
  "name": "Abhishek Sharma",
  "phone": "9876543210",
  "email": "abhishek@example.com"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Contact created successfully.",
  "data": {
    "contactId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Abhishek Sharma",
    "phone": "9876543210",
    "email": "abhishek@example.com",
    "createdAt": "2026-10-06T10:00:00.000Z",
    "updatedAt": "2026-10-06T10:00:00.000Z"
  }
}
```

### GET /contacts — Get all contacts

**Response (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "contactId": "a1b2c3d4-...",
      "name": "Abhishek Sharma",
      "phone": "9876543210",
      "email": "abhishek@example.com"
    }
  ]
}
```

### GET /contacts/:id — Get one contact

**Response (200):**
```json
{
  "success": true,
  "data": {
    "contactId": "a1b2c3d4-...",
    "name": "Abhishek Sharma",
    "phone": "9876543210",
    "email": "abhishek@example.com"
  }
}
```

### PUT /contacts/:id — Update a contact

**Request:**
```json
{
  "phone": "1234567890"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Contact updated successfully.",
  "data": {
    "contactId": "a1b2c3d4-...",
    "name": "Abhishek Sharma",
    "phone": "1234567890",
    "email": "abhishek@example.com"
  }
}
```

### DELETE /contacts/:id — Delete a contact

**Response (200):**
```json
{
  "success": true,
  "message": "Contact deleted successfully."
}
```

### Validation Errors (400)

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": ["Phone must be exactly 10 digits."]
}
```

## Tech Used

- Node.js, Express.js
- MongoDB, Mongoose
- dotenv, nodemon, uuid
- HTML, CSS, JavaScript (frontend)
