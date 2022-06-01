const bcrypt = require("bcrypt");
const chalk = require("chalk");

const User = require("../models/User");
const createJWT = require("../utils/create-jwt");

exports.signup = async (req, res) => {
  try {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.pass, saltPassword);
    const { email, name, city, contact } = req.body;

    User.findOne({ email }).then((currentUser) => {
      if (currentUser) {
        return res.send({
          msg: "User already exists, please log in instead",
          success: false,
        });
      } else {
        new User({
          email,
          fullName: name,
          password: securePassword,
          contact,
          city,
        })
          .save()
          .then((newUser) => {
            console.log(chalk.blueBright("Password hash: ", securePassword));
            return res.status(200).send({
              data: createJWT(newUser._id),
              success: true,
              name,
            });
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(400)
              .send({ msg: "Some error required", success: false });
          });
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.login = async (req, res) => {
  try {
    const { pass, email } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.send({ msg: "Invalid username/password" });
    }

    if (await bcrypt.compare(pass, user.password)) {
      console.log(chalk.blueBright("Hash matched"));
      return res.send({
        data: createJWT(user._id),
        success: true,
      });
    }

    return res.send({
      msg: "Invalid username/password",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};
