const productModel = (sequelize, DataTypes) => {
  const model = sequelize.define("product", {
    product_name: {
      type: DataTypes.STRING,
      required: true,
    },
    product_img: {
      type: DataTypes.STRING,
    },
    product_desc: {
      type: DataTypes.STRING,
    },
    product_type: {
      type: DataTypes.STRING,
    },
    product_price: {
      type: DataTypes.STRING,
    },

    user_id: {
      type: DataTypes.INTEGER,
    },
    product_userID: {
      type: DataTypes.INTEGER,
    },
  });

  return model;
};

module.exports = productModel;
