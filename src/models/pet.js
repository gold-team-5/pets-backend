const petModel = (sequelize, DataTypes) => {
  const model = sequelize.define("pet", {
    pet_name: {
      type: DataTypes.STRING,
      required: true,
    },
    pet_age: {
      type: DataTypes.STRING,
    },
    
   pet_userID:{
    type: DataTypes.STRING,
   },
    pet_img: {
      type: DataTypes.STRING,
    },
    pet_type: {
      type: DataTypes.STRING,
    },
    pet_desc: {
      type: DataTypes.STRING,
    },
    pet_states: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    }
   
  });

  return model;
};

module.exports = petModel;
