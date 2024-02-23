const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../models");
const Userlist = db.userlist;
exports.Register = async (req, res) => {
  // Create a Userlist
  const hashedPassword = await bcrypt.hash(req.body.Password, 10);
  const userlist = {
    Name: req.body.Name,
    Email: req.body.Email,
    Birthday: req.body.Birthday,
    Password: hashedPassword,
    Job: req.body.Job,
    Gender: req.body.Gender,
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
};
exports.signin = async (req, res) => {
  try {
    const user = await Userlist.findOne({
      where: { Email: req.body.Email },
    });
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!isPasswordValid) {
      return res.status(400).send({ error: "Invalid password" });
    }
    const token = jwt.sign(
      {
        email: user.Email,
        birthday: user.Birthday,
        job: user.Job,
        name: user.Name,
      },
      "secret"
    );
    console.log("token", token);
    res.send({ token });
  } catch (err) {}
};
exports.authUpdate = async (req, res) => {
  const id = req.body.id;
  const { Name, Email } = req.body;

  try {
    const user = await Userlist.update(
      { Name, Email },
      {
        where: {
          id: id,
        },
      }
    );
    // const tablelist = await Userlist.findAll({});
    // console.log(tablelist)
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.authDelete = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await Userlist.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
