const db = require("../models");
const Customerlist = db.customer;
exports.Register = () => {};
exports.getAllList = async (req, res) => {
  console.log(req.body);
  const customerlist = await Customerlist.findAll({
    where: {
      State: "request",
    },
  });
  res.send(customerlist);
};
exports.getAcceptList = async (req, res) => {
  console.log("2322322323");
  console.log(req.body);
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
  // console.log("washed",customerlist)
  res.send(customerlist);
}
exports.setSelectWashed = async (req,res) => {
  console.log("1221212121",req.body)
  try {
    const user = await Customerlist.update(
      { State: "washed" },
      {
        where: {
          CarNumber: req.body.id,
        },
      }
    );
    const customerlist = await Customerlist.findAll({
      where: {
        State: "request",
      },
    });
    // console.log(customerlist);
    res.status(200).json(customerlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}