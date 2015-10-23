const inquirer = require('inquirer');

inquirer.prompt([
  {
  type: "input",
  name: "appName",
  message: "What is your apps name"
  },
],
(err, result) => {
  console.log(err);
  console.log(result);
});
