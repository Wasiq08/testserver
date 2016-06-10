var responseTime = require('response-time');
var push = require('./controllers/PushNotification');

module.exports = function(api){
    api.get('/test', function (req, res) {
        res.send('Hello World!');

    })
    api.post('/chat/notifications/', push.notification);


};






