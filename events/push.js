const EventEmitter = require('events');

class Push extends EventEmitter {}

const push = new Push();

push.on('msg', data => {
  console.log("message recived",data)
})
push.on('fileupload', data => {
  console.log("message recived",data)
})
module.exports=push;
