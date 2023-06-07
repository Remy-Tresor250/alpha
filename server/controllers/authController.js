const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utils/hashPassword");
const bcrypt = require("bcrypt")
const _ = require("lodash");

module.exports.login = async (req, res) => {
  try {
    const { email, password } = _.pick(req.body, ["email", "password"]);

    const user = await User.findOne({email: email});
    if (user) {
      const passwd = await bcrypt.compare(password, user.password);
      if (passwd) {
        const token = jwt.sign(user._id, process.env.JWT_PRIVATE_KEY);
        return res.status(200).json({ user, token });
      }
      return res.status(400).json({ error: "Incorrect email or password" });
    }
    return res.status(400).json({ error: "Incorrect email or password" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports.register = async (req, res) => {
  try {
    const { names, email, password } = _.pick(req.body, [
      "names",
      "email",
      "password",
    ]);

    const hashedPasswd = await hashPassword(password)

    const user = new User({
      names,
      email,
      password: hashedPasswd,
    });

    await user.save()

    return res.status(201).json(user)
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
