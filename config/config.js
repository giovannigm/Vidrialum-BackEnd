require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  emailService: "Gmail",
  emailUser: process.env.VITE_USERNAME,
  emailPass: process.env.VITE_TOKEN,
  
  place: process.env.PLACE,

  //  conexion a DB (data base), y el Jwt-Secret es para el (Token)
  //   DataBaseUrl: process.env.DATABASE_URL,
  //   JwtSecret: process.env.JWT_SECRET,
  //   place: process.env.PLACE,
};

module.exports = config;
