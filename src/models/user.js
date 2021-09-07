require('dotenv').config();const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'goldteam';



const userModel = (sequelize, DataTypes) => {
    const model = sequelize.define('users', {
      user_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true
      },
      user_password: {
        type: DataTypes.STRING,
        required: true
      },
    
      user_phone:{
        type: DataTypes.INTEGER,
      },
      user_address:{
        type: DataTypes.STRING,
      },
      user_gender:{
        type: DataTypes.ENUM('Male','Female'),
      } ,
      user_role: {
        type: DataTypes.ENUM('user','admin','doctor'),
        required: true,
        defaultValue: 'user'
      },
      // admin_id:{
      //   type: DataTypes.INTEGER,
      // },

     
      capabilities: {
        type: DataTypes.VIRTUAL,
        get() {
          const acl = {
            admin:['update','delete','add','show'],
            user: ['show','buy'],
            doctor:['treatment']
            
          };
          return acl[this.role];
        }
      }
    });
  
    model.beforeCreate(async (user) => {
      let hashedPass = await bcrypt.hash(user.password, 10);
      user.password = hashedPass;
    });
  
    model.authenticateBasic = async function (username, password) {
      const user = await this.findOne({ where: { username } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return user;
      }
      throw new Error("Invalid User");
    };
  
    model.authenticateToken = async function (token) {
      console.log(token, "token-------------------------");
      console.log(jwt.decode(token), "decode token----------------------");
      try {
        const parsedToken = jwt.verify(token, SECRET);
        const user = this.findOne({ where: { username: parsedToken.username } });
        if (user) {
          return user;
        }
        throw new Error("User Not Found");
      } catch (e) {
        throw new Error(e.message);
      }
    };
  
    return model;
  }
  
  module.exports =userModel;