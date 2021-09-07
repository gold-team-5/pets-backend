
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
      admin_id:{
        type: DataTypes.INTEGER,
      },

     
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
  
    
  
    return model;
  }
  
  module.exports =userModel;