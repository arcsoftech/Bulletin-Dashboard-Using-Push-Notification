const events = require('events');
const eventEmitter = new events.EventEmitter();

//Create an event handler:
const notifyHandler = function () {
  console.log('I hear a scream!');
}

//Assign the event handler to an event:
eventEmitter.on('notify', notifyHandler);

module.exports=eventEmitter;