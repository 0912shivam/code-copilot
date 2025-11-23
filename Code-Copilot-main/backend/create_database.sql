-- PostgreSQL Database Creation Script
-- Run this as a PostgreSQL superuser (postgres)

-- Create the database
CREATE DATABASE code_copilot
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE code_copilot IS 'Code Generation Copilot Database';

-- Show success message
SELECT 'Database code_copilot created successfully!' AS message;
