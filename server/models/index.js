const mongoose = require ('mongoose');

const db = {};
db.mongoose = mongoose;
db.user = require ('./user');
db.quiz = require ('./quiz');
module.exports = db;
