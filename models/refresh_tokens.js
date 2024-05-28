module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "refresh_tokens",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      _user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "admin",
          key: "id"
        }
      },
      refreshToken: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "refresh_tokens",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }]
        },
        {
          name: "_user",
          using: "BTREE",
          fields: [{ name: "_user" }]
        }
      ]
    }
  );
};
