const jwt = require("jsonwebtoken");
require('dotenv').config();

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }                                            
};

const createToken=(req,res,next)=>{
   req.body.token = jwt.sign(req.body.email,process.env.TOKEN_KEY);
   console.log(req.body);
  return next();
}

module.exports = {verifyToken,createToken};