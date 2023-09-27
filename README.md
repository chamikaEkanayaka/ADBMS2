# Inventory Management API

This is a Node.js API for managing inventory. It allows you to perform operations like inserting new products, retrieving product information, updating product details, and deleting products in a MySQL database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

To run this API locally or on your server, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/inventory-management-api.git

2. Clone the repository:

   ```bash
   cd inventory-management-api

3. Clone the repository:

   ```bash
   npm install

4. Configure the MySQL database:
- Make sure you have MySQL installed and running.
- Modify the database connection settings in the code (in the connection variable) to match your MySQL setup.


5. Start the API:

   ```bash
   npm start

The API should now be running and accessible at http://localhost:yourport.

## Usage

To use this API, you can make HTTP requests to the provided endpoints. Below are the available endpoints and their functionalities.

## Endpoints

- POST /: Inserts a new product into the inventory.
- GET /: Retrieves all products in the inventory.
- GET /:productId: Retrieves product details by its ID.
- GET /check/:productId: Checks if a product is available by its ID and returns the remaining quantity.
- PATCH /:productId: Updates product details by its ID.
- PATCH /quantity/:productId: Updates the quantity of a product by its ID.
- DELETE /:productId: Deletes a product from the inventory by its ID.


#### Request and response formats
The API expects all requests to be in JSON format. The responses will also be in JSON format.

**Example request & response:**

Request:

    {
        "product_id": 1,
        "product_name": "Product Name",
        "category": "Category",
        "quantity": 10,
        "unit_price": 20.0,
        "supplier_id": 1,
        "purchase_date": "2023-09-27",
        "expiration_date": "2023-12-31",
        "location": "Warehouse A"
      }

Response:

      {
        "product_id": 1,
        "product_name": "Product Name",
        "category": "Category",
        "quantity": 10,
        "unit_price": 20.0,
        "supplier_id": 1,
        "purchase_date": "2023-09-27",
        "expiration_date": "2023-12-31",
        "location": "Warehouse A"
      }
   
## Dependencies

- Express.js: A fast and minimalist web framework for Node.js.
- mysql2: MySQL client for Node.js.
- Other dependencies as specified in the package.json file.


## License

This project is licensed under the MIT License.
