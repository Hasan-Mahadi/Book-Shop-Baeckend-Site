#  📚 Book-Shop-Backend-Site  - Modern E-Commerce Bookstore Platform


![BookVerse Architecture](https://via.placeholder.com/1500x500/2563eb/ffffff?text=BookVerse+Full-Stack+Solution)

## 🌟 Project Overview

BookVerse is a full-stack e-commerce platform for book enthusiasts, featuring:
- Robust backend with Express.js and TypeScript
- MongoDB database with Mongoose ODM
- Modern frontend with React, Redux, and TailwindCSS
- Secure JWT authentication
- Complete order management system
- Payment gateway integration

## 🚀 Live Demos

**Frontend**: [https://book-shop-assignment-2.vercel.app](https://book-shop-assignment-2.vercel.app)  
**Backend API**: [http://localhost:5000](http://localhost:5000)

## 🛠️ Technology Stack

### Backend Services
| Technology | Purpose | Version |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | Runtime Environment | 18+ |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | Web Framework | 4.x |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | Type Safety | 4.9+ |
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) | Database | 6.0+ |

### Frontend Application
| Technology | Purpose | Version |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | UI Framework | 19.0.0 |
| ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) | State Management | 4.2.0 |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | CSS Framework | 3.3.0 |

## 🏗️ Project Structure

### Backend Architecture (Feature-Based Modular Pattern)


src/
├── features/
│ ├── auth/ # Authentication module
│ │ ├── auth.model.ts
│ │ ├── auth.controller.ts
│ │ ├── auth.routes.ts
│ │ └── auth.service.ts
│ ├── products/ # Product management
│ │ ├── product.model.ts
│ │ ├── product.controller.ts
│ │ ├── product.routes.ts
│ │ └── product.service.ts
│ └── orders/ # Order processing
│ ├── order.model.ts
│ ├── order.controller.ts
│ ├── order.routes.ts
│ └── order.service.ts
├── app/ # Application config
│ ├── config/ # DB configuration
│ ├── middleware/ # Custom middleware
│ └── utils/ # Utility functions
├── app.ts # Express application
└── server.ts # Server entry point

Copy

### Frontend Architecture
src/
├── features/
│ ├── auth/ # Authentication components
│ ├── products/ # Product components
│ └── orders/ # Order components
├── app/ # App configuration
│ ├── store/ # Redux store
│ └── hooks/ # Custom hooks
├── pages/ # Route components
├── shared/ # UI components
└── main.tsx # Application entry

## 🚀 Getting Started

### Backend Setup

1. **Install dependencies**
```bash
npm install express mongoose cors dotenv body-parser
npm install --save-dev typescript ts-node-dev @types/express @types/cors
Configure TypeScript

bash
Copy
npx tsc --init
Update tsconfig.json:

json
Copy
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
Environment Variables
Create .env file:

env

MONGODB_URI=mongodb://localhost:27017/bookverse
JWT_SECRET=your_jwt_secret_key
PORT=5000
Run the server



npm run dev
Frontend Setup
Install dependencies



npm install react-redux @reduxjs/toolkit react-router-dom axios
npm install --save-dev @types/react @types/react-dom
Start development server



npm run dev
📡 API Endpoints
Authentication
Endpoint	Method	Description
/api/auth/register	POST	User registration
/api/auth/login	POST	User login
/api/auth/logout	POST	User logout
Products
Endpoint	Method	Description
/api/products	GET	Get all products
/api/products/:id	GET	Get single product
/api/products	POST	Create new product (Admin)
Orders
Endpoint	Method	Description
/api/orders	POST	Create new order
/api/orders/:id	GET	Get order details
/api/orders/user/:userId	GET	Get user orders





🔒 Authentication Flow

sequenceDiagram
    User->>Frontend: Enters credentials
    Frontend->>Backend: POST /api/auth/login
    Backend->>Database: Verify user
    Backend->>Frontend: JWT Token
    Frontend->>LocalStorage: Store token
    Frontend->>Backend: API requests (with JWT)
    Backend->>Frontend: Protected data



📊 Database Schema

erDiagram
    USER ||--o{ ORDER : places
    USER {
        string _id PK
        string name
        string email
        string password
        string role
        date createdAt
        date updatedAt
    }
    
    PRODUCT ||--o{ ORDER_ITEM : included_in
    PRODUCT {
        string _id PK
        string title
        string author
        string category
        number price
        number stock
        string description
        string[] images
        date createdAt
        date updatedAt
    }
    
    ORDER ||--o{ ORDER_ITEM : contains
    ORDER {
        string _id PK
        string user FK
        string status
        number total
        string paymentMethod
        date createdAt
        date updatedAt
    }
    
    ORDER_ITEM {
        string _id PK
        string order FK
        string product FK
        number quantity
        number price
    }




🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request



📧 Contact
Project Lead: [Hasan Mahadi]
Email: hasanmahadihm99@gmail.com
GitHub: Hasan-Mahadi
