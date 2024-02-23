module.exports = (sequelize, Sequelize) => {
  const Userlist = sequelize.define("userlist", {
    Name: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    },
    Birthday: {
      type: Sequelize.STRING,
    },
    Gender: {
      type: Sequelize.STRING,
    },
    Job: {
      type: Sequelize.STRING,
    },
    Password: {
      type: Sequelize.STRING,
    },
  });

  return Userlist;
};
