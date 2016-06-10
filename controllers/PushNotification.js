//custom classes
var db = require('../config/db');
var pushWoosh = require('../lib/PushWoosh');
var classAllTables = require('../models/alltables');
var valid = require('../valid');

//instances
var sequelize = db.sequelizeConn();
var objAllTables = classAllTables.allTables;


exports.notification = function (req,res){

    //send push notifications
    var pushData = {};
    pushData.actor_user = req.body.senderId || null
    pushData.chatMessage = req.body.content || null;
    pushData.uid = req.body.receiverId || null;
    pushData.conversationId = req.body.conversationId || null;

     getTokensById(pushData.uid).then(function (usersToken) {
        pushData.token = usersToken;
        return pushData;
    }).then(function (users) {

         //Fetch UserActor Name
         var actorUser = objAllTables.users.users();
         return actorUser.findOne({
             where: { uid:  users.actor_user },
             attributes: ['uid', 'username', 'first_name', 'middle_name', 'last_name']
         }).then(function (userBasicProfile) {

             userBasicProfile = userBasicProfile['dataValues'];

             var name;
             if (!valid.isNull(userBasicProfile['first_name'])) {
                 name = userBasicProfile['first_name'];
             }
             if (!valid.isNull(userBasicProfile['middle_name'])) {
                 name += ' ' + userBasicProfile['middle_name'];
             }
             if (!valid.isNull(userBasicProfile['last_name'])) {
                 name += ' ' + userBasicProfile['last_name'];
             }

             pushData.name = name;

            return pushData;

         }).then(function(pushNotification){
             // Generate PushNotification Message
             var pushNotification_obj={};
             pushNotification_obj.details = {id: pushNotification.conversationId, state: 'chatmain.chat-convo'};
             pushNotification_obj.data = pushNotification.name + ' sent you a message "' + pushNotification.chatMessage + '"';
             pushNotification_obj.token = pushNotification.token;

             pushWoosh.sendPush(pushNotification_obj);

             return;
         });
    }).then(function(){
         res.sendStatus(200);
     });
};

function getTokensById(usersToNotify) {

    var deviceTokens = [];
    var sessionUsers = objAllTables.sessions.sessions();
    return sessionUsers.findAll({
        where: {uid: usersToNotify, status: 'ACTIVE'},
        attributes: ['device_subscription_token']
    }).then(function (usersTokens) {
        for (var i = 0; i < usersTokens.length; i++) {
            if (usersTokens[i].dataValues.device_subscription_token != null) {
                var tokens = usersTokens[i].dataValues.device_subscription_token;
                deviceTokens.push(tokens);
            }
        }
        return deviceTokens;
    });
}