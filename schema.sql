DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
   
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)

);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("John", "Smith", 1, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Phat", "Le", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("James", "Zarra", 4, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Poul", "Zavala", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Richard", "Moon", 5, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Julia", "Roberts", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Henrry", "Jamilak", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Sonia", "Rodem", 1, 1 );
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jesus", "Garcia", 1, 1);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
  
);
insert into role(title, salary, department_id) values('Manager', 120000, 1);
insert into role(title, salary, department_id) values('Engineer', 100000, 2);
insert into role(title, salary, department_id) values('Accountant', 52000, 3);
insert into role(title, salary, department_id) values('Designer', 110000, 4);
insert into role(title, salary, department_id) values('Administration', 85000, 5);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
insert into department(name)
values ('Management'),
       ('Engineering'),
       ('Accounting'),
       ('Marketing'),
       ('HR'),
       ('Web Dev');
