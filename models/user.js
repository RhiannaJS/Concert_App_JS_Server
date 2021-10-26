const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    email: {
        require: true,
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        require: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"],
        allownull: false,
        defaultValue: "user"
    },
});


module.exports = User;