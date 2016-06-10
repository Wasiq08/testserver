var Sequelize = require('sequelize');

var host = 'localhost';
var database = 'linkagoal_db_new';
var username = 'root';
var password = '';

//Create connection
var sequelizeConnection = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    dialectOptions: {
        multipleStatements: true
    },
    //logging: false,
    pool: {
        max: 15,
        min: 0,
        idle: 10000
    }
});

exports.sequelizeConn = function connectSequelize() {
    return sequelizeConnection;
};

var sequelizeConnect = this.sequelizeConn();

sequelizeConnect.sync(
    {
        force: false
    }
);
