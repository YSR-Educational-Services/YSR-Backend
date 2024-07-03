module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "loginDetails",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      sloteDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      loginId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _student: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "students",
          key: "id"
        }
      }
    },
    {
      sequelize,
      tableName: "loginDetails",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }]
        },
        {
          name: "_student",
          using: "BTREE",
          fields: [{ name: "_student" }]
        }
      ]
    }
  );
};
