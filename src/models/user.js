require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "goldteam";

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define("users", {
    user_name: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    user_password: {
      type: DataTypes.STRING,
      required: true,
    },

    user_phone: {
      type: DataTypes.INTEGER,
    },
    user_address: {
      type: DataTypes.STRING,
    },
    user_gender: {
      type: DataTypes.ENUM("Male", "Female"),
    },
    user_role: {
      type: DataTypes.ENUM("user", "admin", "doctor"),
      required: true,
      defaultValue: "user",
    },
    //
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          admin: ["update", "delete", "add", "show","delAppointment"],
          user: ["show","delAppointment"],
          doctor: ["show"],
        };

        return acl[this.user_role];
      },
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign(
          {
            user_name: this.user_name,
            capabilities: this.capabilities, // this is the perfarable way in order to check the permissions
          },
          SECRET
        );
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.user_password, 10);
    user.user_password = hashedPass;
  });

  model.authenticateBasic = async function (user_name, user_password) {
    const user = await this.findOne({ where: { user_name } });
    const valid = await bcrypt.compare(user_password, user.user_password);
    if (valid) {
      return user;
    }
    throw new Error("Invalid User");
  };

  model.authenticateBearer = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({
        where: { user_name: parsedToken.user_name },
      });
      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userModel;
