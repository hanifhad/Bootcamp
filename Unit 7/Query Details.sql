-- 1. List the following details of each employee: employee number, last name, first name, gender, and salary.

-- STEP 1 Do a Select * to identify all the names of the columns

Select * from employees

-- We will need emp_no, emp_title, first_name, last_name, sex

-- Step 2 we need to join salaries from the salaries table, NOTE: the employee numbers for both tables must match to make sure the salaries are correct.

SELECT employees.emp_no as "Employee Number"
, employees.last_name as "Employee Last Name"
, employees.first_name as "Employe First Name"
, employees.sex as "Gender"
, salaries.salary "Salary ($)"
FROM employees
JOIN salaries
ON (employees.emp_no = salaries.emp_no);

-- The output should be a table containing the necessary details.

-- 2. List first name, last name, and hire date for employees who were hired in 1986.

SELECT first_name as "Employee First Name"
	,last_name as "Employee Last Name"
	,hire_date as "Date of Hire"
FROM employees
WHERE hire_date BETWEEN '1986-01-01'
AND '1986-12-30'
;

-- 3. List the manager of each department with the following information: 
-- department number, department name, the manager's employee number, last name, first name.


SELECT departments.dept_no as "Department Number"
	,departments.dept_name as "Department Name"
	,dept_managers.emp_no as "Department Managers"
	,employees.last_name 
	,employees.first_name 
FROM departments
JOIN dept_managers
ON departments.dept_no = dept_managers.dept_no
JOIN employees
ON dept_managers.emp_no = employees.emp_no
;

-- 4. List the department of each employee with the following information: employee number, last name, first name, and department name.

SELECT dept_emp.emp_no "Department Employee Number"
	,employees.last_name "Department Employee Last Name"
	,employees.first_name "Department Employee First Name"
	,departments.dept_name "Department Name"
FROM dept_emp 
JOIN employees
ON dept_emp.emp_no = employees.emp_no
JOIN departments
ON dept_emp.dept_no = departments.dept_no
;

-- 5. List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."

SELECT first_name as "First Name with Hercules"
,last_name as "Last Name starting with Letter B"
,sex as "Gender"
FROM employees
WHERE first_name = 'Hercules'
AND last_name LIKE 'B%'
;

--6. List all employees in the Sales department, including their employee number, last name, first name, and department name.
SELECT dept_emp.emp_no
	,employees.first_name 
	,employees.last_name 
	,departments.dept_name
FROM dept_emp
JOIN employees
ON dept_emp.emp_no = employees.emp_no
JOIN departments
ON dept_emp.dept_no = departments.dept_no
WHERE departments.dept_name = 'Sales'
;
--7. List all employees in the Sales and Development departments, 
--including their employee number, last name, first name, and department name.

SELECT dept_emp.emp_no, 
	employees.first_name, 
	employees.last_name, 
	departments.dept_name
FROM dept_emp
JOIN employees
ON employees.emp_no = dept_emp.emp_no
JOIN departments
ON dept_emp.dept_no = departments.dept_no
WHERE departments.dept_name = 'Sales' OR departments.dept_name = 'Development'
;

-- 8. In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.

SELECT last_name,
COUNT(last_name) AS "Number of people with this last name"
FROM employees
GROUP BY last_name
ORDER BY 
COUNT(last_name) DESC
;
