"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Objectives", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.DOUBLE,
      },
      installments_quantity: {
        type: Sequelize.INTEGER,
      },
      adquired_value: {
        type: Sequelize.DOUBLE,
      },
      due_date: {
        type: Sequelize.DATEONLY,
      },
      //coluna que possui a FK de USERS
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Objectives");
  },
};
