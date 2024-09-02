const mongoose = require('mongoose');
const validator = require('validator');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discipline: { type: String, required: true, default: '' },
  emailTeacher: { type: String, required: false, default: '' },
  description: {type: String, required: true, default: ''},
  dateLimit: { type: String, required: true, default: '' },
  createdIn: { type: Date, default: Date.now },
});

const TaskModel = mongoose.model('Task', TaskSchema);

function Task(body) {
  this.body = body;
  this.errors = [];
  this.task = null
}

Task.prototype.register = async function() {
  this.validation();

  if(this.errors.length > 0) return;
  this.task = await TaskModel.create(this.body);
};

Task.prototype.validation = function() {
  this.cleanUp();

  if(this.body.emailTeacher && !validator.isEmail(this.body.emailTeacher)) this.errors.push('Email inválido.');
  if(!this.body.name) this.errors.push('Indicar o nome é um campo obrigatório');
  if(!this.body.discipline) this.errors.push('Informe a disciplina da tarefa');
  if(!this.body.description) this.errors.push('Para que cadastre uma tarefa é necessário que sua descrição seja enviado');
  if(!this.body.dateLimit) this.errors.push('Informe a data de entrega');
};

Task.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    name: this.body.name,
    discipline: this.body.discipline,
    emailTeacher: this.body.emailTeacher,
    description: this.body.description,
    dateLimit: this.body.dateLimit,
  };
};

Task.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.validation();
  if(this.errors.length > 0) return;
  this.task =await TaskModel.findByIdAndUpdate(id, this.body, { new: true });
}

//estatic methods
Task.searchById = async function(id) {
  if(typeof id !== 'string') return;
  const task = await TaskModel.findById(id);
  return task;
};

Task.searchTask = async function() {
  const tasks = await TaskModel.find()
    .sort({ createdIn: -1});
  return tasks;
};

Task.delete = async function(id) {
  if(typeof id !== 'string') return;
  const task = await TaskModel.findOneAndDelete({_id: id});
  return task;
};

module.exports = Task;
