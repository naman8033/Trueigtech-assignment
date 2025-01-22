# Inventory Management System

## Project Description

The Inventory Management System is a web-based application designed to help businesses manage their inventory efficiently. 
This project provides a RESTful API that allows users to perform various operations such as adding, updating, deleting, and retrieving products.
Additionally, it supports recording sales and managing stock transactions. The API is built using Node.js and Express, and it can be easily integrated with front-end applications.

## Features

- Manage products (CRUD operations)
- Record sales and generate sales reports
- Track stock transactions (restock and sales)
- User authentication (signup and login)

## Technologies Used

- Node.js
- Express.js
- MongoDB 
- Postman (for API testing)

## Setup Instructions

To set up the Inventory Management System locally, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (or any other database)
- Git

### Clone the Repository


git clone https://github.com/naman8033/Trueigtech-assignment
cd inventory-management


### Clone the Repository
npm install

### Configure Environment Variables
PORT=3000
MONGODB_URI=mongodb://localhost:27017/inventory
JWT_SECRET=your_jwt_secret

### Start the Server
npm start

The server will start on http://localhost:3000.

### API DOCUMENTATION

Documentation link - https://documenter.getpostman.com/view/36364896/2sAYQdi9bP

# Inventory Management API

The Inventory Management API allows users to manage products, sales, and stock transactions.  
It supports operations such as creating, updating, retrieving, and deleting products, as well as recording sales and managing stock transactions.

---

## **Product**

### 1. Retrieve Products
**GET**  
`http://localhost:3000/api/products/`  

Retrieve a list of all products.  
- **Response Code:** `200 OK`  
- **Description:** Returns a list of products in JSON format.

---

### 2. Add Product
**POST**  
`http://localhost:3000/api/products/`  

- **Authorization:** Bearer Token  
- **Body (JSON):**
    ```json
    {
        "sku": "SKU0999845",
        "name": "Widget C",
        "price": 10,
        "quantity": 100
    }
    ```
- **Response Code:** `200 OK` or `201 Created`  

---

### 3. Update Product
**PUT**  
`http://localhost:3000/api/products/{productId}`  

- **Authorization:** Bearer Token  
- **Body (JSON):**
    ```json
    {
        "price": 12.99,
        "quantity": 150
    }
    ```
- **Response Code:** `200 OK`, `201 Created`, or `204 No Content`  

---

### 4. Delete Product
**DELETE**  
`http://localhost:5000/api/products/{productId}`  

- **Authorization:** Bearer Token  
- **Response Code:** `200 OK`, `202 Accepted`, or `204 No Content`  

---

## **Sales**

### 1. Record Sale
**POST**  
`http://localhost:5000/api/sales/`  

- **Body (JSON):**
    ```json
    {
        "product_id": "678cd5c22d25aa583682a1b1",
        "quantity": 30
    }
    ```
- **Response Code:** `200 OK` or `201 Created`  

---

### 2. Retrieve Sales
**GET**  
`http://localhost:5000/api/sales/`  

Retrieve a list of all sales.  
- **Response Code:** `200 OK`  

---

### 3. Sales Report by Date
**GET**  
`http://localhost:5000/api/sales/report`  

- **Query Parameters:**
    - `startDate`: e.g., `2025-01-01`  
    - `endDate`: e.g., `2025-10-31`  
- **Description:** Retrieve sales reports within the specified date range.  
- **Response Code:** `200 OK`  

---

## **Stock Transactions**

### 1. Record Stock Transaction
**POST**  
`http://localhost:3000/api/stock-transactions/`  

- **Body (JSON):**
    ```json
    {
        "product_id": "678cd4e22d25aa583682a1ae",
        "transaction_type": "restock",
        "quantity": 50
    }
    ```
- **Response Code:** `200 OK` or `201 Created`  

---

### 2. Retrieve Stock Transactions
**GET**  
`http://localhost:3000/api/stock-transactions/`  

Retrieve a list of all stock transactions.  
- **Response Code:** `200 OK`  

---

## **Authentication**

### 1. Signup
**POST**  
`http://localhost:3000/api/users/register`  

- **Body (JSON):**
    ```json
    {
        "username": "naman8033@gmail.com",
        "password": "12345678",
        "role": "Admin"
    }
    ```
- **Response Code:** `201 Created`  

---

### 2. Login
**POST**  
`http://localhost:3000/api/users/login`  

- **Body (JSON):**
    ```json
    {
        "username": "naman8033@gmail.com",
        "password": "12345678",
        "role": "Admin"
    }
    ```
- **Response Code:** `200 OK`  

---

## **Notes**
- All routes that modify data (`POST`, `PUT`, `DELETE`) require **Bearer Token Authorization**.
- Use valid product IDs or SKUs for operations involving specific products.

---






