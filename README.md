**#Book Shop Application**

Objective:

I Develop an Express application with TypeScript, integrating MongoDB with Mongoose to manage a Book Store. Ensure data integrity using Mongoose schema validation and Others.

**Project Setup:**

1. Initialize the Project:

- Create a new directory for My project.
- Initialize an npm project: | npm init -y |.
- Install dependencies: | npm install express, mongoose, cors, dotenv, body-parser, npm install --save-dev, typescript , ts-node-dev |.
- Set up the TypeScript configuration: |npx tsc --init |.
- Update tsconfig.json to include: | "rootDir": "./src", | "outDir": "./dist", | "target": "ES6",|
- Add scripts to package.json: "scripts": {
  "build": "tsc",
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "lint": "eslint src/**/\*.ts",
  "lint:fix": "eslint src/**/\*.ts --fix",
  "format": "prettier . --write",
  "test": "echo \"Error: no test specified\" && exit 1"
  },

2. Project Structure:

- Create the following folder structure:
- Feature-Based Pattern(Modular) project/
  ├── src/
  │ ├── features/
  │ │ ├── Product/
  │ │ │ ├── ProductModel.ts
  │ │ │ ├── ProductController.ts
  │ │ │ ├── ProductRoutes.ts
  │ │ │ └── ProductService.ts
  │ │ ├── orders/
  │ │ │ ├── orderModel.ts
  │ │ │ ├── orderController.ts
  │ │ │ ├── orderRoutes.ts
  │ │ │ └── orderService.ts
  │ ├── app.ts
  │ └── server.ts

3. Implementation:

- Database Configuration: | src/app/config/index.ts |.
- Models: | src/models/Product.ts | src/models/Order.ts |.
- Controllers:Product Controller: | src/controllers/productController.ts |.
- Controllers:Order Controller: | src/controllers/orderController.ts |.
- Routes: | src/routes/productRoutes.ts | src/routes/orderRoutes.ts|.
- Testing with Postman

4. Features:

**CRUD Operations for Books**

- Add, retrieve, update, and delete books.
  **Order Management**
- Place orders and update inventory automatically.
- Calculate total revenue from orders.
  **Error Handling**
- Provides meaningful error messages with stack traces.

5. Technology Stack:

**Backend:** Node.js, Express.js, TypeScript
**Database:** MongoDB (with Mongoose)
**Validation:** Mongoose schema validation
**Error Handling:** Custom middleware

6. {timestamps: true}

7.  Endpoints: | POST, GET, GET, PUT, DELETE |.

8.  Access the API at http://localhost:5000.

9.  https://book-shop-assignment-2.vercel.app/
