module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    userId: {
      type: Sequelize.INTEGER
    },
    bookId: {
      type: Sequelize.INTEGER
    }
  });
  return Order;
};
