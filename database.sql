-- Create Worker Table
CREATE TABLE Worker (
    worker_id INTEGER PRIMARY KEY,
    worker_name TEXT NOT NULL,
    phone TEXT
);

-- Insert Sample Data
INSERT INTO Worker (worker_id, worker_name, phone)
VALUES
(1,'Ravi','9876543210'),
(2,'Priya','9876543211'),
(3,'Arun','9876543212');  