const POSTGRES_URI = 'postgres://postgres@localhost:5432/mid_project';
const { Sequelize, DataTypes } = require('sequelize');
var sequelize = new Sequelize(POSTGRES_URI, {});





module.exports = {
    db: sequelize,
    

}