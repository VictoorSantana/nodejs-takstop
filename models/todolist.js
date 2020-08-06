const Sequelize = require('sequelize');
const db = require('../database/connection');


const model = db.define('tb_todolist', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    about: {
        type: Sequelize.STRING,
        allowNull: false
    },
    guest_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
  }, {
    timestamps: false
});

module.exports = model;