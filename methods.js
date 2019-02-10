'use strict';
const mongoose = require('mongoose');
const Task = require('./models/task');
const MONGODB_URI = require('./config/keys').mongoURI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const addTask = async task => {
  const newTask = new Task(task);
  await newTask.save();
  console.info('Task Added');
};

// Find Customer
const findTask = async title => {
  const search = new RegExp(title, 'i');
  const task = await  Task.find({
    $or: [{ title: search }, { content: search }]
  });
  console.info(task);
};

const updateTask = async (_id, task) => {
  await Task.findByIdAndUpdate({ _id }, task);
  console.info('Task Updated');
};

const deleteTask = async _id => {
  await Task.findByIdAndDelete({ _id });
  console.info('Task Deleted');
};

const listTasks = async () => {
  const tasks = await Task.find();
  console.info(tasks);
};

module.exports = {
  addTask,
  findTask,
  updateTask,
  deleteTask,
  listTasks
};
