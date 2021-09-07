
const petModel = (sequelize, DataTypes) => {
    const model = sequelize.define('pet', {
      pet_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true
      },
      pet_age: {
        type: DataTypes.STRING,
     
      },
     pet_type:{
        type: DataTypes.INTEGER,
      },
   
      user_id:{
        type: DataTypes.INTEGER,
      }
     
           
            
   
    });
  
    
  
    return model;
  }
  
  module.exports =petModel;