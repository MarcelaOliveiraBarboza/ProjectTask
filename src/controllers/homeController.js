const Task = require('../models/TaskModel');

exports.homePage = async (req, res) => {
  const tasks = await Task.searchTask();
  res.render('homePage', { tasks });
};
