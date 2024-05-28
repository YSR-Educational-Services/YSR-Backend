module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "admin",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      adminType: {
        type: DataTypes.ENUM("superAdmin", "subAdmin", "employeeAsAdmin")
      }
    },
    {
      sequelize,
      tableName: "admin",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }]
        }
      ]
    }
  );
};
