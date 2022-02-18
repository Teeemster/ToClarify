//index model
//Group Models
const User = require ('./User');
const Project = require ('./Project');
const Task = require ('./Task');
const LoggedTime = require ('./LoggedTime');
const Comment = require ('./Comment');


//Destructure And Export Models
module.exports = { User, Project, Task, LoggedTime, Comment };