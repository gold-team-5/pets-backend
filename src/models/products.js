
const productModel = (sequelize, DataTypes) => {
    const model = sequelize.define('product', {
      product_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true
      },
      product_type: {
        type: DataTypes.STRING,
     
      },
     product_price:{
        type: DataTypes.INTEGER,
      },
    //   admin_id:{
    //     type: DataTypes.INTEGER,
    //   },
      user_id:{
        type: DataTypes.INTEGER,
      }
     
           
            
   
    });
  
    
  
    return model;
  }
  
  module.exports =productModel;