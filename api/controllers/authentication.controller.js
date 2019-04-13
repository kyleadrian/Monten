const jwt = require("jwt-simple");
const config = require("../config");
const User = require("../models/users");

module.exports = {
  // ES6 syntax signin: signin
  signup,
  signin
};

// Create and token to send to the user for identification on succesful account creation
const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

// Sign In
function signin(req, res, next) {
  const { email } = req.body;

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (!existingUser) {
      return res.status(422).send({ error: "No user found" });
    }
    return res.send({
      token: tokenForUser(req.user),
      name: existingUser.firstName
    });
  });
}

// Sign Up
function signup(req, res, next) {
  // Grab email and password off of req.body
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  // Check to see that we actually HAVE an email or password
  if (!email || !password || !firstName || !lastName) {
    return res.status(422).send({ error: "Please provide all info" });
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
      firstName,
      lastName,
      email,
      password
    });

    // then save to the database and send the newly create user in the response
    user.save(err => {
      if (err) {
        return next(err);
      }

      res.json({ token: tokenForUser(user), name: user.firstName });
    });
  });
}
