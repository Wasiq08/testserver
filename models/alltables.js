//require and set all the tables

var allTables = {
    "sessions": require('./sessions'),
    "users": require('./users')
};

exports.allTables = allTables;
