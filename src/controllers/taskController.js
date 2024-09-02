const Task = require('../models/TaskModel');

exports.tasks = (req, res) => {
  res.render('tasks', {
    task: {}
  });
};

exports.register = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.register();
  
    if(task.errors.length > 0) {
      req.flash('errors', task.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }
  
    req.flash('success', 'Tarefa registrada na sua lista com sucesso');
    req.session.save(() => res.redirect(`/task/homePage/${task.task._id}`));
    return;
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.editHomePage = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const task = await Task.searchById(req.params.id);
  if(!task) return res.render('404');
  res.render('tasks', { task });
}

exports.edit = async function(req, res) {
  try {
    if(!req.params.id) return res.render('404');
    const task = new Task(req.body);
    await task.edit(req.params.id);
  
    if(task.errors.length > 0) {
      req.flash('errors', task.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }
  
    req.flash('success', 'Tarefa editada com sucesso');
    req.session.save(() => res.redirect(`/task/homePage/${task.task._id}`));
    return;
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
}

exports.delete = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const task = await Task.delete(req.params.id);
  if(!task) return res.render('404');

  req.flash('success', 'Tarefa apagada com sucesso');
  req.session.save(() => res.redirect('back'));
  return;
}