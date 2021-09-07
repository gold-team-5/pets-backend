
const BookModel = (sequelize, DataTypes) => {
    const model = sequelize.define('book', {
      book_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true
      },
     book_desc: {
        type: DataTypes.STRING,
     
      },
     user_id:{
        type: DataTypes.INTEGER,
      },
   
      book_date:{
        type: DataTypes.DATE,
      }
     
           
            
   
    });
  
    
  
    return model;
  }
  
  module.exports =BookModel;