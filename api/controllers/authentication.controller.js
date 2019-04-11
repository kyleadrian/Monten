const User = require("../models/users");

module.exports = {
  // ES6 syntax signin: signin
  signup
};

function signup(req, res, next) {
  // Grab email and password off of req.body
  const { email } = req.body;
  const { password } = req.body;

  // Check to see that we actually HAVE an email or password
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Please provide email and password." });
  }

  // If we do, we check to see if a user currently exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // if user exists send back an error message. (Remember we use return to end the function)
    if (existingUser) {
      return res.status(422).send({ error: "User already exists." });
    }

    // Otherwise we create the user
    const user = new User({
      email,
      password
    });

    // then save to the database and send the newly create user in the response
    user.save(err => {
      if (err) {
        return next(err);
      }

      res.json(user);
    });
  });
}
