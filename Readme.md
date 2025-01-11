# KoinX Assignment

## Overview

This project fetches cryptocurrency data from the CoinGecko API and stores it in a MongoDB database. It includes scheduled tasks to update prices at regular interval of 2 hours and provides endpoints to fetch the latest prices and calculate standard deviation.

---

## How to Start the Server

1. Clone the repository:
   ```bash
   git clone https://github.com/Aditya8840/Crypto
   ```

2. Navigate to the project directory:
   ```bash
   cd Crypto
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## Technologies Used

- **[Axios](https://www.npmjs.com/package/axios)**: For making API calls to the CoinGecko API.
- **[Cron](https://www.npmjs.com/package/cron)**: For scheduling tasks, such as fetching and updating cryptocurrency prices at regular interval of 2 hours.
- **[Winston](https://www.npmjs.com/package/winston)**: For efficient and customizable logging.
- **[Mongoose](https://mongoosejs.com/)**: As an ORM (Object Relational Mapper) to interact with MongoDB.
- **[Glob](https://www.npmjs.com/package/glob)**: For dynamically loading all JavaScript files in specific directories, enabling modular design and reducing manual imports.

---

## Endpoints

### 1. Get Latest Prices

**Request**:  
```http
GET /api/stats?coin=bitcoin
```

**Response**:  
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "price": 95387.74265127412,
    "marketCap": 1889217818626.9343,
    "24hChange": 2.730761761674287
  }
}
```

---

### 2. Get Standard Deviation of Last 100 Prices

**Request**:  
```http
GET /api/deviation?coin=bitcoin
```

**Response**:  
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "deviation": 244.12672027653105
  }
}
```

---

## Notes
- Ensure to create a `.env` file in the project root directory with your MongoDB URL and CoinGecko API key.  
- You can take reference from the provided `.env.example` file for the required format and variables.


---