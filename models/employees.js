module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employees",
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
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "employees",
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
