const mysql = require("mysql2");
const inquirer = require("inquirer");

require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "company_db",
  },

  console.log("Connected to company_db")
);

const prompt = inquirer.createPromptModule();

const start = () => {
  prompt({
    message: "Choose an option",
    type: "rawlist",
    name: "view",
    choices: [
      { name: "View Departments", value: "departmentsList" },
      { name: "View Jobs", value: "jobsList" },
      { name: "View Employees", value: "employeesList" },

      { name: "Add Department", value: "addDepartment" },
      { name: "Add Job", value: "addJob" },
      { name: "Add Employee", value: "addEmployee" },
      { name: "Update Employee Job", value: "updateJob" },

      { name: "Exit", value: "exit" },
    ],
  }).then((answer) => actions[answer.view]());
};

const actions = {
  departmentsList: () => {
    db.query("SELECT * FROM departments", (error, departments) => {
      if (error) console.error(error);
      console.table(departments);

      start();
    });
  },

  jobsList: () => {
    db.query("SELECT * FROM jobs", (error, jobs) => {
      if (error) console.error(error);
      console.table(jobs);

      start();
    });
  },

  employeesList: () => {
    const join = `
    SELECT employees.id, employees.first_name, employees.last_name, 
    jobs.title, jobs.salary, departments.name AS department, employees.manager_name
    FROM employees 
    LEFT JOIN jobs 
    ON employees.job_id = jobs.id
    LEFT JOIN departments
    ON jobs.department_id = departments.id;`;

    db.query(join, (error, employees) => {
      if (error) console.error(error);
      console.table(employees);

      start();
    });
  },

  addDepartment: () => {
    const prompt = inquirer.createPromptModule();
    prompt({
      message: "Type your new department name",
      type: "input",
      name: "new_department",
    }).then((answer) => {
      db.query(
        `INSERT INTO departments (name) VALUES ('${answer.new_department}')`,
        (error, departments) => {
          if (error) console.error(error);
          console.log(`Added ${answer.new_department} as new department`);

          start();
        }
      );
    });
  },

  addJob: () => {
    const prompt = inquirer.createPromptModule();

    const jobPrompt = [
      {
        message: "Type the title of new job",
        type: "input",
        name: "new_job",
      },
      {
        message: "Type the salary of new job",
        type: "number",
        name: "new_salary",
      },
    ];

    prompt(jobPrompt).then((answer) => {
      db.query(
        `SELECT id as value, name as name FROM departments`,
        (error, departments = []) => {
          prompt({
            message: "Choose the department for new job",
            type: "rawlist",
            name: "id",
            choices: departments,
          }).then((departmentChoice) => {
            db.query(
              `INSERT INTO jobs (title, salary, department_id) VALUES ('${answer.new_job}', ${answer.new_salary}, ${departmentChoice.id} )`,
              (error, jobs) => {
                if (error) console.error(error);
                console.log(`Added ${answer.new_job} as new job`);

                start();
              }
            );
          });
        }
      );
    });
  },

  addEmployee: () => {
    const prompt = inquirer.createPromptModule();

    const employeePrompt = [
      {
        message: "Type the first name of new employee",
        type: "input",
        name: "new_first",
      },
      {
        message: "Type the last name of new employee",
        type: "input",
        name: "new_last",
      },
    ];

    prompt(employeePrompt).then((answer) => {
      db.query(
        `SELECT id as value, title as name FROM jobs`,
        (error, jobs = []) => {
          prompt({
            message: "Choose a job for the employee",
            type: "rawlist",
            name: "id",
            choices: jobs,
          }).then((jobChoice) => {
            db.query(
              `SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employees WHERE employees.manager_id IS NULL`,
              (error, managers = []) => {
                prompt({
                  message: "Choose the employees manager",
                  type: "rawlist",
                  name: "id",
                  choices: managers,
                }).then((managerChoice) => {
                  db.promise()
                    .query("SELECT * FROM ?? WHERE ?", [
                      "employees",
                      managerChoice,
                    ])
                    .then((managerChoiceData) => {
                      const managerId = managerChoiceData[0][0].id;
                      const managerName =
                        managerChoiceData[0][0].first_name +
                        " " +
                        managerChoiceData[0][0].last_name;

                      db.query(
                        `INSERT INTO employees (first_name, last_name, job_id, manager_id, manager_name) VALUES ('${answer.new_first}', '${answer.new_last}', ${jobChoice.id}, ${managerId}, '${managerName}')`,
                        (error, employees) => {
                          if (error) console.error(error);
                          console.log(
                            `Added ${answer.new_first} ${answer.new_last} as a new employee`
                          );

                          start();
                        }
                      );
                    });
                });
              }
            );
          });
        }
      );
    });
  },

  updateJob: () => {
    const prompt = inquirer.createPromptModule();

    db.query(
      `SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employees`,
      (error, employees = []) => {
        prompt({
          message: "Choose the employee who needs their job updated",
          type: "rawlist",
          name: "id",
          choices: employees,
        }).then((employeeChoice) => {
          db.query(
            `SELECT id as value, title as name FROM jobs`,
            (error, jobs = []) => {
              prompt({
                message: "Choose a new job for the employee",
                type: "rawlist",
                name: "id",
                choices: jobs,
              }).then((newJobChoice) => {
                db.query(
                  `UPDATE employees SET job_id = ${newJobChoice.id} WHERE employees.id = ${employeeChoice.id}`,
                  (error, employees) => {
                    if (error) console.error(error);
                    console.log(`Changed employee's job`);

                    start();
                  }
                );
              });
            }
          );
        });
      }
    );
  },

  exit: () => {
    console.log("Bye");
    process.exit();
  },
};

start();
