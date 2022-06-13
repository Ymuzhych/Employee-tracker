SELECT
emp.id AS ID,
emp.first_name AS First,
emp.last_name AS Last,
emp.role_id AS Role,
r.salary AS Salary,
mng.last_name AS Manager,
dep.name AS Department
--JOIN
FROM employee emp
LEFT JOIN employee mng
ON emp.manager_id = mng.id

LEFT JOIN role r
ON emp.role_id = r.title

LEFT JOIN department dep
ON r.department_id - dep.id