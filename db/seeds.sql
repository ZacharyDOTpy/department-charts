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
('Research Manager', 100000.00, 2),
('R&D Dev', 90000.00, 2),
('Development Manager', 105000.00, 3),
('Dev Trainer', 85000.00, 3),
('Billing Manager', 95000.00, 4),
('Billing Admin', 75000.00, 4),
('Community Manager', 92000.00, 5),
('Social Media Consultant', 82500.00, 5),
('HR Manager', 100000.00, 6),
('Dispute Specialist', 78000.00, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_name, manager_id)
VALUES