module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "icetColleges",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      clgCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      clgName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      university: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "icetColleges",
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
