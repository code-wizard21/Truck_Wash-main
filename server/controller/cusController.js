const db = require("../models");
const Customerlist = db.customer;

exports.Register = (req, res) => {
  console.log(req.body);
  const userlist = {
    CustomerName: req.body.name,
    CarNumber: req.body.cardNum,
    Detail: req.body.detail,
    Date: req.body.date,
    State: "request",
  };
  // Save Tutorial in the database
  Customerlist.create(userlist)
    .then(async (data) => {
      const customer = await Customerlist.findAll({
        where: {
          CustomerName: req.body.name,
        },
      });
      res.send(customer);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the userlist.",
      });
    });
};

exports.findAllCustom = async (req, res) => {
  console.log(req.body);
  const customerlist = await Customerlist.findAll({
    where: {
      CustomerName: req.body.name,
      State: "request",
    },
  });

  res.send(customerlist);
};
exports.deleteItemCustom = async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  try {
    const user = await Customerlist.destroy({
      where: {
        id: id,
      },
    });
    const customerlist = await Customerlist.findAll({
      where: {
        CustomerName: req.body.name,
      },
    });
    res.status(200).json(customerlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.acceptedItemCustom = async (req, res) => {
  // console.log(req.body)
  try {
    const user = await Customerlist.update(
      { State: "accepted" },
      {
        where: {
          CarNumber: req.body.carnumber,
        },
      }
    );
    const customerlist = await Customerlist.findAll({
      where: {
        State: "request",
      },
    });
    console.log(customerlist);
    res.status(200).json(customerlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.findAcceptCustom = async (req, res) => {
  const customerlist = await Customerlist.findAll({
    where: {
      CustomerName: req.body.name,
      State: "accepted",
    },
  });

  res.send(customerlist);
};
