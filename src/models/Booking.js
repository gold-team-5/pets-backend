const BookModel = (sequelize, DataTypes) => {
  const model = sequelize.define("book", {
    book_doctor: {
      type: DataTypes.STRING,
      required: true,
    },
    book_states: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    //for admin
    user_id: {
      type: DataTypes.INTEGER,
    },

  
    book_time: {
      type: DataTypes.DATE,
      unique: true,
    },
    book_userid: {
      type: DataTypes.STRING,
    },
  });

  return model;
};

module.exports = BookModel;
