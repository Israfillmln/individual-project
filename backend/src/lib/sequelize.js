const { Sequelize } = require('sequelize');
const mysqlConfig = require('../config/database');

const sequelize = new Sequelize({
  username: mysqlConfig.MYSQL_USERNAME,
  password: mysqlConfig.MYSQL_PASSWORD,
  database: mysqlConfig.MYSQL_DB_NAME,
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

// Modals
const User = require('../models/user')(sequelize);
const Post = require('../models/post')(sequelize);
const Comment = require('../models/comment')(sequelize);
const Like = require('../models/like')(sequelize);
const VerificationToken = require('../models/verificationEmail')(sequelize);
const ForgotPasswordToken = require('../models/forgotPassword')(sequelize);

// Associations

// 1:M
Post.belongsTo(User);
User.hasMany(Post);

//M:N
Post.belongsToMany(User, { through: Like, as: 'user_likes' });
User.belongsToMany(Post, { through: Like, as: 'user_likes' });
Post.hasMany(Comment);
User.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Post);
Post.hasMany(Like);
User.hasMany(Like);
Like.belongsTo(User);
Like.belongsTo(Post);

VerificationToken.belongsTo(User);
User.hasMany(VerificationToken);

ForgotPasswordToken.belongsTo(User);
User.hasMany(ForgotPasswordToken);

module.exports = {
  sequelize,
  User,
  Post,
  Comment,
  Like,
  VerificationToken,
  ForgotPasswordToken,
};
