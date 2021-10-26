const UserModel = require ("./user");
const ConcertModel = require("./concert")
const db = require("../db")
const CommentModel = require("./comment")

UserModel.hasMany(ConcertModel);
UserModel.hasMany(CommentModel);

ConcertModel.belongsTo(UserModel);
ConcertModel.hasMany(CommentModel);

CommentModel.belongsTo(ConcertModel);

module.exports = {
    dbConnect: db,
    models: {UserModel, ConcertModel, CommentModel}
};