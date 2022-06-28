const userModel = require("../models/userModel")
const isValid= require("../validator/validator")
const jwt = require("jsonwebtoken");

const registerUser = async function (req, res) {

    try {
  
      let data = req.body;
  
  
  
      if (Object.keys(data).length > 0) {
        let {firstName, lastName, email, password}=data
        if (!isValid(firstName)) {
          return res.status(400).send({ status: false, msg: "First name is required" })
        }
        if (!isValid(lastName)) {
          return res.status(400).send({ status: false, msg: "Last name is required" })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email))) {
          return res.status(400).send({ status: false, msg: "Please provide a valid email" })
        }
  
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password))) {
          return res.status(400).send({ status: false, msg: "please provide a valid password with one uppercase letter ,one lowercase, one character and one number " })
        }
        let dupli = await userModel.findOne({ email: email })
        if (dupli) { return res.status(400).send({ status: false, msg: "Email already exists" }) }
  
        let savedData = await userModel.create(data);
    return res.status(201).send({ userDetails: savedData });
       //return res.status(302).redirect()
  
      }
  
      else { return res.status(400).send({ ERROR: "BAD REQUEST" }) }
  
    } catch (err) {
  
      return res.status(500).send({ ERROR: err.message })
  
    }
  }
  

  const loginUser = async function (req, res) {
  
    try {
  
      let body = req.body
  
      if (Object.keys(body) != 0) {
        let userMail = req.body.email;
        let passwords = req.body.password;
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(userMail))) {
  
          return res.status(400).send({ status: false, msg: "Please provide a valid email" })
        }
  
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(passwords))) {
  
          return res.status(400).send({
            status: false,
            msg: "please provide valid password with one uppercase letter ,one lowercase, one character and one number "
          })
        }
  
        let user = await authorModel.findOne({ email: userMail, password: passwords });
  
        if (!user) {
  
          return res.status(400).send({
            status: false,
            ERROR: "username or the password is not corerct",
          });
        }
  
    
    let token = jwt.sign(
        {
          authId: user.email,

        }, "secret-key", { expiresIn: "1h" }

      );
      res.status(200).setHeader("x-api-key", token);
      return res.status(201).send({ status: "LoggedIn", TOKEN: token });
    }

    else { return res.status(400).send({ ERROR: "Bad Request" }) }
}
    
    catch (err) {
  
      return res.status(500).send({ ERROR: err.message })
    }
  
  };
  
  
  module.exports.loginUser = loginUser
  
  module.exports.registerUser = registerUser
  
