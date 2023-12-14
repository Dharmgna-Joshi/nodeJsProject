




const User = require("../models/personalDetails");
const bcrypt = require("bcrypt");

const getLogin = (req, res) => {
  res.render("login");
};

const saveLoginDetails = async (req, res) => {
  const { username, password } = req.body;
  var foundUser = false;

  User.findOne({ username: username }, async (methodError, user) => {
    if (!user) {
      await User.create(req.body);
      res.redirect("/");
    } else {
      console.log("exist");
      res.render("login", {
        error: "User  already Exists",
      });
    }
  });
};

const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          req.session.userType = user.usertype;
          global.loggedIn = req.session.userId;
          global.userType = req.session.userType;
          res.redirect("/");
        } else {
          res.render("login", {
            error: "Invalid Password",
          });
        }
      });
    } else {
      res.render("login", {
        error: "NO User Registered/Found",
      });
    }
  });
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = { getLogin, saveLoginDetails, authenticateUser, logout };
