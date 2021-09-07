require('dotenv').config()
const POSTGRES_URI=`${process.env.DATABASE_URL}`

const { Sequelize, DataTypes } = require('sequelize');
var sequelize = new Sequelize(POSTGRES_URI, {});

//import user.js
const users = require('./user');
// const admin =require('./admin')
const product=require('./products')
const book=require('./Booking')
const pet=require('./pet')
const  userModel= users(sequelize, DataTypes);
// const AdminModel = admin(sequelize, DataTypes);
const productModel=product(sequelize, DataTypes)
const BookModel=book(sequelize, DataTypes)
const petModel=pet(sequelize, DataTypes)


// create our relations between products and user

userModel.hasMany(productModel, { sourceKey: 'id', foreignKey: 'user_id' });
productModel.belongsTo(userModel, { foreignKey: 'user_id', targetKey: 'id' });

// AdminModel.hasMany(userModel, { sourceKey: 'id', foreignKey: 'admin_id' });
// userModel.belongsTo(AdminModel, { foreignKey: 'admin_id', targetKey: 'id' });

// create our relations between book and user

userModel.hasMany(BookModel, { sourceKey: 'id', foreignKey: 'user_id' });
BookModel.belongsTo(userModel, { foreignKey: 'user_id', targetKey: 'id' });

// create our relations between pet and user

userModel.hasMany(petModel, { sourceKey: 'id', foreignKey: 'user_id' });
petModel.belongsTo(userModel, { foreignKey: 'user_id', targetKey: 'id' });



module.exports = {
    db: sequelize,
    users: users,
    product:product,
    book:book,
    pet:pet



    

    

}