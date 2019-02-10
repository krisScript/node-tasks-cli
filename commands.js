#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const {
  addTask,
  findTask,
  updateTask,
  deleteTask,
  listTasks
} = require('./methods');

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Task title'
  },
  {
    type: 'input',
    name: 'content',
    message: 'Task Content'
  }
];

program.version('1.0.0').description('Tasks system');

program
  .command('add')
  .alias('a')
  .description('Add a task')
  .action(() => {
    prompt(questions).then(answers => addTask(answers));
  });

program
  .command('find <title>')
  .alias('f')
  .description('Find a task')
  .action(title => findTask(title));

program
  .command('update <_id>')
  .alias('u')
  .description('Update a task')
  .action(_id => {
    prompt(questions).then(answers => updateTask(_id, answers));
  });

program
  .command('delete <_id>')
  .alias('d')
  .description('Delete a task')
  .action(_id => deleteTask(_id));

program
  .command('list')
  .alias('l')
  .description('List all tasks')
  .action(() => listTasks());

program.parse(process.argv);
