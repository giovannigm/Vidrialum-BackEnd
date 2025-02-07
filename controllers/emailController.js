const nodemailer = require("nodemailer");
const config = require("../config/config");

exports.sendEmail = (req, res) => {
  const { user_name, user_email, message } = req.body;
  console.log("Datos recibidos:", req.body);

  const transporter = nodemailer.createTransport({
    service: config.emailService,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: config.emailUser,
    subject: "PAGINA WEB VIDRIALUM",
    text: `Nombre: ${user_name}\nCorreo: ${user_email}\nDescripción: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error al enviar el correo electrónico");
    } else {
      console.log("Correo electrónico enviado:", info.response);
      res.status(200).send("Correo electrónico enviado con éxito");
    }
  });
};
