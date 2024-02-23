const db = require("../models");
const Customerlist = db.customer;
exports.Register = () => {
    
}
exports.getAllAccepted = async (req,res) => {
    const customerlist = await Customerlist.findAll({
        where: {
          State: "accepted",
        },
      });

  res.send(customerlist);
};
exports.getAllWashed = async (req,res) => {
  const customerlist = await Customerlist.findAll({
    where: {
      State: "washed",
    },
  });

res.send(customerlist);
}
