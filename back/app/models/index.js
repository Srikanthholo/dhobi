const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbConfig = require("../config/db.config.js");


const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.user = require("./user.model");
db.role = require("./role.model");
 
db.tutorials = require("./tutorial.model.js")(mongoose);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

 