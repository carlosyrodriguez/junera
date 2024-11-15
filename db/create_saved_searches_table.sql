CREATE TABLE saved_searches (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id NVARCHAR(255) NOT NULL,
    search_params NVARCHAR(MAX) NOT NULL, -- Ensure this stores valid JSON strings
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);