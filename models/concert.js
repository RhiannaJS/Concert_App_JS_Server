const { DataTypes } = require("sequelize");
const db = require("../db");

const Concert = db.define("concert", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    bandName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    openingAct: {
        type: DataTypes.STRING,
    },
    dateAttended: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
});

module.exports = Concert;