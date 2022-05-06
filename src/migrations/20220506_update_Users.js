const sequelize = require("sequelize");

module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn("Users", "deleteAt", {
      allowNull: true,
      type: sequelize.DATE,
    });
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn("Users","deleteAt");
  },
};
