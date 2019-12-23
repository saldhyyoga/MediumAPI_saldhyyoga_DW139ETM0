const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.users;

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    where: { email, password }
  }).then(user => {
    if (user) {
      const token = jwt.sign({ user }, "thisismysecretkey");
      res.send({
        email: user.email,
        token
      });
    } else {
      res.status(401).send({
        error: true,
        message: "wrong email or password"
      });
    }
  });
};

exports.register = (req, res) => {
  User.create(req.body).then(user => {
    const token = jwt.sign({ id: user.id }, "thisismysecretkey");
    res.send({
      email: user.email,
      token
    });
  });
};
// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   User.findOne({
//     attributes: {
//       exclude: ["createdAt", "updatedAt", "password", "bio"]
//     },
//     where: {
//       email,
//       password
//     }
//   }).then(user => {
//     if (user) {
//       if (user.is_active != 1) {
//         res.send({
//           is_success: 0,
//           status: 200,
//           message: "Your account isn't activated!",
//           data: {}
//         });
//       } else {
//         const token = jwt.sign({ userId: user.id }, "siunix");
//         res.send({
//           message: "Success",
//           data: {
//             email,
//             token
//           }
//         });
//       }
//     } else {
//       res.send({
//         is_success: 0,
//         status: 200,
//         message: "Wrong email and password!",
//         data: {}
//       });
//     }
//   });
// };

// exports.register = (req, res) => {
//   const { fullname, username, email, password } = req.body;

//   User.findAll({
//     where: {
//       username
//     }
//   }).then(user => {
//     if (user.length > 0) {
//       res.send({
//         message: "Username has been taken!",
//         data: {}
//       });
//     } else {
//       User.findAll({
//         where: {
//           email
//         }
//       }).then(user => {
//         if (user.length > 0) {
//           res.send({
//             message: "Email has been registered!",
//             data: {}
//           });
//         } else {
//           try {
//             User.create({
//               fullname: fullname,
//               username: username,
//               email: email,
//               password: password,
//               is_active: 1
//             }).then(user => {
//               const token = jwt.sign({ userId: user.id }, "saldhyyoga");
//               res.send({
//                 data: {
//                   email,
//                   username,
//                   token
//                 }
//               });
//             });
//           } catch (error) {
//             res.send({
//               is_success: 0,
//               status: 500,
//               message: "Failed! : " + error,
//               data: {}
//             });
//           }
//         }
//       });
//     }
//   });
// };
