const { prompt } = require('inquirer');
const { Subject } = require('rxjs');
const Change = require('../models/change');
const { changeTypes } = require('../models/constants');

const changes = [];
const questions = new Subject();

function recordChange() {
  questions.next({
    type: 'list',
    name: 'action',
    message: 'What type of change are you logging?',
    choices: changeTypes,
    askAnswered: true,
  });
}

function onAnswer({ name, answer }) {
  if (name === 'action') {
    questions.next({
      type: 'input',
      name: answer.toLowerCase(),
      message: `What have you ${answer.toLowerCase()}?`,
      askAnswered: true,
    });
  } else if (answer.trim()) {
    changes.push(new Change(name).append(answer));
    recordChange();
  } else {
    questions.complete();
  }
}

function collectChanges() {
  return new Promise((resolve, reject) => {
    prompt(questions).ui.process.subscribe(onAnswer, reject, () => resolve(changes));
    recordChange();
  });
}

function askFor(type) {
  return prompt([{
    type: 'input',
    name: type.toLowerCase(),
    message: `What have you ${type.toLowerCase()}?`,
  }]).then(({ [type.toLowerCase()]: answer }) => answer);
}

const singleChange = (type, addition = askFor(type)) => addition;

module.exports = { collectChanges, singleChange };
