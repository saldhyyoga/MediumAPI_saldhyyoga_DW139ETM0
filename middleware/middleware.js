const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  // get header
  const authHeader = req.headers["authorization"];

  // get header and split between token and bearer,ang get index 1
  // if header false return null
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.status(401).send({ message: "Unauthorized" });
  }

  // Lalu jika terdapat header kita juga perlu memastikan apakah token yang kita dapatkan valid
  jwt.verify(token, "thisismysecretkey", (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Your Token No Longer Valid" });
    }

    userId = user.user.id;
    console.log(userId);
    next();
  });
};

// const secret = "siunix";

// exports.checkAuth = (req, res, next) => {
//   let token = req.headers["x-access-token"] || req.headers["authorization"];
//   // token = token.trim();
//   // console.log(token);
//   try {
//     if (token === "") {
//       return res.json({
//         success: false,
//         message: "Auth token is not supplied"
//       });
//     } else {
//       if (token.startsWith("Bearer ")) {
//         // Remove Bearer from string
//         token = token.slice(7, token.length);
//       }

//       if (token) {
//         jwt.verify(token, secret, (err, authData) => {
//           if (err) {
//             res.send({
//               is_success: 0,
//               message: "Failed",
//               data: {}
//             });
//           } else {
//             user_id = getIdFromObject(authData);

//             User.findAll({
//               where: {
//                 id: user_id
//               }
//             })
//               .then(data => {
//                 next();
//               })
//               .catch(error => {
//                 res.send({
//                   is_success: 0,
//                   message: "Failed",
//                   data: {}
//                 });
//               });
//           }
//         });
//       } else {
//         return res.json({
//           success: false,
//           message: "Auth token is not supplied"
//         });
//       }
//     }
//   } catch (error) {
//     res.status(500);
//     res.send({
//       is_success: 1,
//       message: "Failed : Auth token is not supplied ",
//       data: {}
//     });
//   }
// };

// function getIdFromObject(data) {
//   let authData = JSON.stringify(data);
//   authData = authData.split(",");
//   user_id = authData[0].substring(10, data.length);
//   return user_id;
// }
