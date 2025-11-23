# Code Generation Copilot

An enterprise-grade AI code generation platform powered by cutting-edge technology. Built with React, Express.js, and PostgreSQL, this application transforms natural language descriptions into production-ready code snippets across multiple programming languages with elegant syntax highlighting and comprehensive history management.

## 🚀 Live Demo

⚠️ **Important:** The backend service may require initialization time on first access (30-60 seconds) due to serverless architecture. Subsequent requests will be significantly faster.


## 📚 API Documentation

**Interactive Swagger Documentation:** [![API Documentation](./Code-Copilot-main/docs/screenshots/api-docs.png)](http://localhost:5000/api-docs)

Explore comprehensive API documentation with live testing capabilities at the `/api-docs` endpoint once your development server is running.

🔗 **Ensure the backend server is active at** `http://localhost:5000`

## 🛠️ Technology Stack

### Frontend Architecture
- **React 18** - Modern UI framework with Hooks
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Prism.js** - Professional code syntax highlighting
- **Axios** - HTTP client for API communication
- **React Icons** - Scalable vector icons

### Backend Infrastructure
- **Node.js** - JavaScript runtime environment
- **Express.js** - Robust web application framework
- **Sequelize ORM** - Database abstraction layer
- **PostgreSQL** - Primary relational database
- **Google Gemini API** - AI-powered code generation
- **Express Validator** - Request validation middleware
- **Swagger UI** - Auto-generated API documentation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Code-Copilot/
├── backend/
│   ├── src/
│   │   ├── config/           
│   │   ├── controllers/      
│   │   ├── middleware/       
│   │   ├── migrations/       
│   │   ├── models/           
│   │   ├── routes/           
│   │   └── services/         
│   ├── server.js             
│   ├── package.json          
│   └── .env                  
├── frontend/
│   ├── src/
│   │   ├── components/       
│   │   │   ├── CodeDisplay.jsx
│   │   │   ├── CodeGenerator.jsx
│   │   │   ├── HistoryList.jsx
│   │   │   └── Pagination.jsx
│   │   ├── services/         
│   │   ├── App.jsx           
│   │   └── main.jsx          
│   ├── package.json          
│   └── vite.config.js        
├── README.md                 
├── API_DOCUMENTATION.md      
├── DEPLOYMENT.md             
└── SETUP.md                  
```

## 🗄️ Database Architecture

The application leverages PostgreSQL with Sequelize ORM for robust data persistence. The normalized schema consists of three primary entities:

**Database Schema Diagram:** Complete database schema showing relationships between entities

![Database Schema Diagram](./Code-Copilot-main/docs/screenshots/db-schema-diagram.png)
### Core Entities

#### **users** - User authentication and profiles
- `id` (Primary Key, Auto-increment)
- `username` (Unique, Not Null)
- `email` (Unique, Not Null)
- `created_at` (Timestamp)

#### **languages** - Programming language reference
- `id` (Primary Key, Auto-increment)
- `name` (Unique, e.g., "Python", "JavaScript")
- `extension` (e.g., ".py", ".js")
- `created_at` (Timestamp)

#### **generations** - Code generation records
- `id` (Primary Key, Auto-increment)
- `prompt` (Text, Not Null)
- `language_id` (Foreign Key → languages.id)
- `user_id` (Foreign Key → users.id, Nullable)
- `code` (Text, Not Null)
- `created_at` (Timestamp, Indexed)

### Key Relationships

- **Users** can have multiple **Generations**
- **Languages** are used in multiple **Generations**
- **Generations** belong to one **Language** and optionally one **User**

### Database Design Philosophy

**Third Normal Form (3NF) Compliance:**
- Programming languages maintained in a dedicated reference table
- Generation records link to languages through foreign key relationships
- Eliminates data redundancy and maintains referential integrity

**Referential Integrity Constraints:**
- `language_id` → CASCADE on delete (automatically removes dependent generations)
- `user_id` → SET NULL on delete (retains generations as anonymous records)

**Performance Optimization with Indexes:**
- `created_at` indexed in descending order for efficient pagination
- `language_id` indexed for optimized JOIN operations
- Clustered primary key indexes for constant-time lookups

## ⚡ Performance Analysis

### Query Complexity for Pagination

**Sample Query:** `SELECT * FROM generations ORDER BY created_at DESC LIMIT 10 OFFSET 20`

- **Unindexed Table:** O(n log n) complexity where n represents total row count (requires full table sort)
- **Indexed on `created_at`:** O(log n + k) where k equals page size
  - B-tree index traversal: O(log n)
  - Row retrieval: O(k)
  - Note: OFFSET-based pagination degrades linearly: O(offset + k)

**Performance Strategy:**
- Implemented descending index on `created_at` timestamp
- For datasets exceeding 1M rows, cursor-based pagination recommended (utilizing `WHERE created_at < cursor_timestamp` approach)

### Schema Performance Characteristics

**Optimization Benefits:**
- **JOIN Efficiency:** Normalized structure with strategic indexes enables high-performance joins
- **Storage Optimization:** Reference table architecture reduces string duplication by approximately 90%
- **Memory Utilization:** Compact languages table remains cache-resident
- **Schema Flexibility:** Language attributes can be extended independently of generation data

**Performance Considerations:**
- Each retrieval operation performs a JOIN with the languages reference table (optimized by query planner)
- Large OFFSET values in pagination queries show linear performance degradation (recommend cursor-based approach beyond 10K records)

### Index Strategy

1. **`generations.created_at` (Descending):** 
   - Accelerates ORDER BY operations in chronological queries
   - Essential for maintaining pagination performance
   
2. **`generations.language_id`:**
   - Enhances JOIN performance with languages reference table
   - Supports efficient language-based filtering
   
3. **`languages.name` (UNIQUE constraint):**
   - Guarantees data uniqueness at database level
   - Optimizes language name lookups

4. **Clustered Primary Keys:**
   - Automatically created on all `id` columns
   - Provides constant-time O(1) record access

**Optimal Index Usage Patterns:**
- Columns appearing in WHERE predicates
- Columns referenced in ORDER BY clauses
- Foreign key columns involved in JOIN operations
- High-frequency query columns

**Index Trade-off Considerations:**
- Read operations benefit while write operations incur overhead
- Each index consumes additional disk space
- Excessive indexing may hinder query optimizer efficiency

## 🚀 Development Environment Setup

### System Requirements

Verify these dependencies are installed on your development machine:

- **Node.js** (v18.0.0 or later)
- **npm** or **yarn** package manager
- **PostgreSQL** 14+ (Primary database)

### Step 1: Repository Setup

```bash
git clone https://github.com/0912shivam/code-copilot.git
cd code-copilot
```

### Step 2: Backend Configuration

**Navigate to the backend directory:**

```bash
cd backend
```

**Install required packages:**

```bash
npm install
```

**Initialize environment configuration:**

```bash
cp .env.example .env
```

**Configure your `.env` file with these variables:**

```env
# Application Server Settings
PORT=5000
NODE_ENV=development

# PostgreSQL Database Connection
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/code_copilot

# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Cross-Origin Resource Sharing
CORS_ORIGIN=http://localhost:5173
```

**Initialize PostgreSQL database:**

```sql
CREATE DATABASE code_copilot
    WITH ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8';
```

**Execute database migrations:**

```bash
node run-db-setup.js
```

**Launch the development server:**

```bash
npm run dev
```

Your backend API server will be accessible at `http://localhost:5000`

### Step 3: Frontend Configuration

**Launch a new terminal and navigate to the frontend:**

```bash
cd ../frontend
```

**Install project dependencies:**

```bash
npm install
```

**Create environment configuration:**

```bash
cp .env.example .env
```

**Set environment variables in `.env`:**

```env
VITE_API_URL=http://localhost:5000
```

**Start the Vite development server:**

```bash
npm run dev
```

Your frontend application will be live at `http://localhost:5173`

### Step 4: Installation Verification

1. Navigate to the application: `http://localhost:5173`
2. Verify backend status: `http://localhost:5000/api/health`
3. Access interactive API docs: `http://localhost:5000/api-docs`


## ✨ Core Capabilities

### User-Facing Features

- **AI-Powered Code Synthesis** - Transform natural language queries into executable code
- **10+ Language Support** - Python, JavaScript, TypeScript, C++, Java, Go, Rust, C#, PHP, Ruby
- **Professional Code Rendering** - Syntax highlighting powered by Prism.js
- **Instant Clipboard Integration** - Single-click code copying functionality
- **Comprehensive History Tracking** - Browse and manage previous generations with pagination
- **Adaptive UI Design** - Seamless experience across desktop, tablet, and mobile platforms
- **Live Status Updates** - Interactive loading indicators and intelligent error messages

### Technical Architecture

- **RESTful API Design** - Comprehensive endpoint documentation via Swagger UI
- **Secure Authentication** - JWT-based user verification (configurable)
- **Normalized Data Model** - Third Normal Form (3NF) database architecture
- **Request Validation** - Robust input validation using Express Validator
- **Centralized Error Management** - Global exception handling middleware
- **Optimized Pagination** - Efficient data retrieval with complete metadata
- **Advanced AI Integration** - Google Gemini API for intelligent code generation

### Programming Language Coverage

**Python** • **JavaScript** • **TypeScript** • **C++** • **Java** • **Go** • **Rust** • **C#** • **PHP** • **Ruby**



## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

**Developed by Shivam Sharma**

- GitHub Profile: [@0912shivam](https://github.com/0912shivam)
- Repository: [code-copilot](https://github.com/0912shivam/code-copilot)

---

**Last Updated:** November 2025

**Support:** For issues or questions, please open a GitHub issue or reach out to the project maintainer.
