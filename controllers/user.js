const User = require("../models/user");

function stringValidator(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      stringValidator(name) ||
      stringValidator(email) ||
      stringValidator(password)
    ) {
      return res
        .status(400)
        .json({ err: "Bad Parameters . Something is missing" });
    }
    await User.create({ name, email, password })
    res.status(201).json({ message:'successfull' });
  } catch (error) {
    res.status(500).json({ error:'something went wrong' });
  }
};