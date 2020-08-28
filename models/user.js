'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    incrementSignInCount() {
      this.increment('signInCount');
    }
  };
  user.init({
    email: DataTypes.STRING,
    passwordDigest: DataTypes.STRING,
    signInCount: DataTypes.INTEGER,
    emailVerified: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};