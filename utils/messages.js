const moment = require('moment');
//they say use other libraries instead of moment but 
//I saw couple of tutorials using it 

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;