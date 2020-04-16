USE employee_trakerDB;

-- Departments
INSERT INTO department (name_) VALUES ("Culinary");
INSERT INTO department (name_) VALUES ("Rides");
INSERT INTO department (name_) VALUES ("Retail");
INSERT INTO department (name_) VALUES ("Photography");
INSERT INTO department (name_) VALUES ("Human Resources");

SELECT * FROM department;

-- Culinary roles
INSERT INTO role_ (title, salary, department_id) VALUES ("Culinary Manager",90000.00,1);
INSERT INTO role_ (title, salary, department_id) VALUES ("Culinary Supervisor",70000.00,1);
INSERT INTO role_ (title, salary, department_id) VALUES ("Lead Chef",50000.00,1);
INSERT INTO role_ (title, salary, department_id) VALUES ("Cook",35000.00,1);
INSERT INTO role_ (title, salary, department_id) VALUES ("Hostess",20000.00,1);

INSERT INTO role_ (title, salary, department_id) VALUES ("Rides Manager",90000.00,2);
INSERT INTO role_ (title, salary, department_id) VALUES ("Rides Supervisor",70000.00,2);
INSERT INTO role_ (title, salary, department_id) VALUES ("Rides Lead",50000.00,2);
INSERT INTO role_ (title, salary, department_id) VALUES ("Rides Team Member",20000.00,2);
-- Retail roles
INSERT INTO role_ (title, salary, department_id) VALUES ("Retail Manager",90000.00,3);
INSERT INTO role_ (title, salary, department_id) VALUES ("Retail Supervisor",70000.00,3);
INSERT INTO role_ (title, salary, department_id) VALUES ("Retail Lead",50000.00,3);
INSERT INTO role_ (title, salary, department_id) VALUES ("Retail Team Member",20000.00,3);
-- Photography roles
INSERT INTO role_ (title, salary, department_id) VALUES ("Photography Manager",90000.00,4);
INSERT INTO role_ (title, salary, department_id) VALUES ("Photography Supervisor",70000.00,4);
INSERT INTO role_ (title, salary, department_id) VALUES ("Photography Lead",50000.00,4);
INSERT INTO role_ (title, salary, department_id) VALUES ("Photography Team Member",20000.00,4);

SELECT * FROM role_;

-- Inserted some employees
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Kristian", "Rodriguez", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Alejandro", "Morales", 6);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Cristina", "Ibarra", 10);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Joshua", "Le", 14);

SELECT * FROM employee;