# School Management API

A RESTful API for managing schools, built with Node.js, Express, and MySQL. This project enables users to add schools and retrieve a list of schools sorted by proximity to a given location. Data validation is handled robustly with [Zod](https://github.com/colinhacks/zod).

## Features

- **Add School**: Create and store new school records.
- **List Schools**: Retrieve all schools, sorted by distance from a provided latitude/longitude.
- **Validation**: All input data is validated using Zod schemas.
- **Error Handling**: Consistent error responses and global error handler.
- **Modular Structure**: Organized routes, middleware, and configuration.

## Tech Stack

- **Node.js**
- **Express**
- **MySQL**
- **Zod** (schema validation)
- **CORS** (Cross-Origin Resource Sharing)

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MySQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshitpandey-26/School_Management_API.git
   cd School_Management_API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your database credentials.
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` as needed.

4. **Set up the database:**
   - Create a MySQL database and update your `.env` file with the correct credentials.
   - Run the provided SQL in the `database` folder (if present) or create the `schools` table as described below.

   ```sql
   CREATE TABLE schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     address VARCHAR(255) NOT NULL,
     latitude FLOAT NOT NULL,
     longitude FLOAT NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Start the server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

## API Endpoints

### Root

- **GET `/api/v1/school/`**
  - Welcome endpoint. Lists available routes.

### Add School

- **POST `/api/v1/school/addSchool`**
- **Body:** (JSON)
  ```json
  {
    "name": "Example School",
    "address": "123 Main St, City",
    "latitude": 28.7041,
    "longitude": 77.1025
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "School added successfully",
    "data": { ... }
  }
  ```

### List Schools

- **GET `/api/v1/school/listSchools?latitude=28.7041&longitude=77.1025`**
- **Query Parameters:**
  - `latitude` (required): Latitude of user location
  - `longitude` (required): Longitude of user location
- **Response:**
  ```json
  {
    "success": true,
    "message": "Found 2 schools, sorted by proximity",
    "user_location": {
      "latitude": 28.7041,
      "longitude": 77.1025
    },
    "data": [
      {
        "id": 1,
        "name": "Example School",
        "address": "123 Main St, City",
        "latitude": 28.7041,
        "longitude": 77.1025,
        "distance": 0,
        "created_at": "2024-06-01T08:00:00.000Z"
      }
      // ...more schools
    ]
  }
  ```

## Project Structure

```
School_Management_API/
├── ZodSchema/           # Zod schema definitions
├── config/              # Configuration files
├── database/            # Database scripts and migrations
├── middlewares/         # Custom middleware (validation, error handling)
├── routes/              # Express route handlers
├── index.js             # Entry point of the application
├── package.json
├── .env.example
└── ...
```

## Environment Variables

Copy `.env.example` to `.env` and fill with:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `PORT` (optional, defaults to 3000)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**View the full project and source code on [GitHub](https://github.com/harshitpandey-26/School_Management_API).**

*Note: This README was auto-generated. Please update with further project details and API documentation as needed.*
