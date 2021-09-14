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
    user_id: {
      type: DataTypes.INTEGER,
    },

    book_date: {
      type: DataTypes.DATEONLY,
    },
    book_time: {
      type: DataTypes.TIME,
      unique: true,
    },
  });

  return model;
};

module.exports = BookModel;
