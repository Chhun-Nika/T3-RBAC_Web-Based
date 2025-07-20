# T3-RBAC_Web-Based

## Introduction
This web-based RBAC (Role-Based Access Control) system allows only administrators to log in and manage user access through role and privilege assignments. It ensures both application-level control and real MySQL user management.
<br><br>
## Project Structure

Here’s what you’ll find in this repository:
- `client/` — Frontend built with React.js
- `server/` — Backend using Node.js, Express, Sequelize
<br><br>
## Getting Started

Follow these steps to set up and run the web-based RBAC system.

### 1. Clone the Repository

```bash
git clone https://github.com/Chhun-Nika/T3-RBAC_Web-Based
cd T3-RBAC_Web-Based
```

### 2. Set up Environment Variables

```bash
cp .env.example .env
```
Example of .env format 

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hms_db
DB_PORT=3306

JWT_SECRET=your_jwt_secret
```

### 3. Install Dependencies

Backend Setup
```bash
cd server
npm install
```

Frontend Setup
```bash
cd ../client
npm install
```

### 4. Run the Application
Start Backend
```bash
cd ../server
npm run dev
```

Start Frontend
```bash
cd ../client
npm start
```
## Additional Notes 
pythonScript and sql script is available in [Repo: T3-Database_Project](https://github.com/Chhun-Nika/T3-Database_Project)
- Ensure MySQL is installed and running
- Use the scripts in `MySQL_script/` to set up your database schema and initial roles
- Use `pythonScript/` to insert sample records
- The app uses Sequelize ORM and JWT-based authentication


