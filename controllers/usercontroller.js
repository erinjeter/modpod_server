const router = require("express").Router();
const User = require("../db").import("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//USER SIGNUP
router.post("/create", function (req, res) {
  console.log(req.body.user);
  User.create({
    // email: 'user@email.com', //(hardcoded email)
    // password: 'password1234' //(hardcoded password)
    email: req.body.user.email, //dynamic email
    password: bcrypt.hashSync(req.body.user.password, 13), //dynamic password
  })
    .then(
      function createSuccess(user) {
        console.log("create success");
        // let token = jwt.sign(
        //   { id: user.id, email: user.email },
        //   "i_am_secret",
        //   { expiresIn: 60 * 60 * 24 }
        // );
        //should never use jwt to store sensitive info so remove email: user.email
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

        res.json({
          user: user,
          message: "modpod User successfully crated!",
          sessionToken: token,
        });
      }
      // res.send('This is our user/create endpoint!')
    )
    .catch((err) => res.status(500).json({ error: err }));
});

//User SIGNIN
router.post("/login", function (req, res) {
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });

              res.status(200).json({
                user: user,
                message: "modPod User successfully logged in!",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: "Login Failed" });
            }
          }
        );
      } else {
        res.status(500).json({ error: "modPod User does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
