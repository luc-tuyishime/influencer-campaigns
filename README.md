## Influencer Campaign Platform Backend

A NestJS-based backend for managing influencer campaigns, submissions, and user authentication.

### 🚀 Live API

* Production API Base URL: https://influencer-campaigns-production.up.railway.app/

### Features

* JWT Authentication
* Role-based access control (Influencer/Brand)
* Campaign management
* Content submission handling
* MongoDB integration
* TypeScript support
* Input validation
* Error handling

### API ENDPOINTS

Authentication

Register New User
```
POST /api/auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "INFLUENCER"  // or "BRAND"
}

```

Login
```
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

Campaigns
Get all Campaigns

```
GET /api/campaigns
Authorization: Bearer {jwt_token}

```

GET Campaigns details
```
GET /api/campaigns/{campaignId}
Authorization: Bearer {jwt_token}

```

Submit Campaigns Content
```
POST /api/campaigns/submit
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
    "campaignId": "campaign_id_here",
    "contentUrl": "https://tiktok.com/video/12345",
    "platform": "TIKTOK",  // or "INSTAGRAM" or "YOUTUBE"
    "description": "Optional description"
}
```

## 💻 Local Development Setup

### Prerequisites

* Node.js (v16 or higher)
* MongoDB (v4.4 or higher)
* npm or yarn package manager

### Installation

1. Clone the repository
```
git clone `https://github.com/luc-tuyishime/influencer-campaigns.git`
cd influencer-campaigns
```
2. Install dependencies
```
npm install
```
3.Create a `.env` file in the root directory
```
PORT=3001
MONGO_URL=
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1d
```

### Running the Application

1. Start MongoDB
```
Ensure your local MongoDB instance is running
```
2. Seed the database with the test data
```
npm run seed
```
3. Start the development server
```
npm run start:dev
```
The API will be available at http://localhost:3001/api



### Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Input validation using class-validator
* MongoDB injection protection
* CORS configuration
