const db = require("../models");
const bcrypt = require("bcrypt");
const Customerlist = db.customer;
const Userlist = db.userlist;
exports.Register = async (req,res) => {
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userlist = {
      Name: req.body.name,
      // Email: req.body.email,
      Password: hashedPassword,
      Job: "driver",
      PhoneNumber: req.body.number,
    };
    // Save Tutorial in the database
    Userlist.create(userlist)
      .then((data) => {
        // console.log(data.dataValues)
  
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the userlist.",
        });
      });
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

exports.getDriver = async (req,res) => {
  const driver = await Userlist.findAll({
    where: {
      Job: "driver",
    },
  });
  res.send(driver);
}
