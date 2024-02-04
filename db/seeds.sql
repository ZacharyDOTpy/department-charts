USE company_db

INSERT INTO departments (name)
VALUES ('Advirtisment'),
('Research'),
('Development'),
('Billing'),
('SocialMedia'),
('HumanResources');

INSERT INTO jobs (title, salary, department_id)
VALUES ('Advert Manager', 120000.00, 1),
('Ad Consultant', 80000.00, 1),
('Ad Admin', 65000.00, 1),
('Research Manager', 100000.00, 2),
('R&D Dev', 90000.00, 2),
('R&D Consultant', 85000.00, 2),
('Development Manager', 105000.00, 3),
('Dev Trainer', 85000.00, 3),
('Dev Admin', 80000.00, 3),
('Billing Manager', 95000.00, 4),
('Billing Admin', 75000.00, 4),
('Billing Temp', 60000.00, 4),
('Community Manager', 92000.00, 5),
('Social Media Consultant', 82500.00, 5),
('Social Media Admin', 75000.00, 5),
('HR Manager', 100000.00, 6),
('HR Consultant', 92000.00, 6),
('Dispute Specialist', 78000.00, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_name, manager_id)
VALUES ('John', 'Doe', 1, NULL, NULL),
('Stephany', 'King', 2, 'John Doe', 1),
('Nick', 'Green', 3, 'John Doe', 1),
('Lori', 'Clark', 4, NULL, NULL),
('David', 'Moore', 5, 'Lori Clark', 4),
('Frank', 'Ocean', 6, 'Lori Clark', 4),
('Micheal', 'Scott', 7, NULL, NULL),
('Jim', 'Halpert', 8, 'Micheal Scott', 7),
('Pam', 'Beasley', 9, 'Micheal Scott', 7),
('Anthony', 'Noble', 10, NULL, NULL),
('Howard', 'Jones', 11, 'Anthony Noble', 10),
('Crystal', 'Kelce', 12, 'Anthony Noble', 10),
('Connor', 'Outlaw', 13, NULL, NULL),
('Liam', 'Cuddy', 14, 'Connor Outlaw', 13),
('Tyler', 'Kelce', 15, 'Connor Outlaw', 13),
('Sarah', 'Alison', 16, NULL, NULL),
('Hannah', 'Drago', 17, 'Sarah Alison', 16),
('Ned', 'Stark', 18, 'Sarah Alison', 16);
