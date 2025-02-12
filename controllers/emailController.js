const nodemailer = require("nodemailer");
const config = require("../config/config");
const multer = require("multer");

// Configurar Multer correctamente
const upload = multer({ storage: multer.memoryStorage() });

exports.sendEmail = (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(500).send("Error al subir el archivo");
    }

    const { nombre, email, message } = req.body;
    console.log("Datos recibidos:", req.body);
    console.log("Archivo recibido:", req.file);

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      service: config.emailService,
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    });

    // Configurar opciones del correo
    const mailOptions = {
      from: config.emailUser,
      to: config.emailUser,
      subject: "PAGINA WEB VIDRIALUM - Nuevo Mensaje",
      text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje: ${message}`,
      attachments: req.file
        ? [
            {
              filename: req.file.originalname,
              content: req.file.buffer,
            },
          ]
        : [],
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error al enviar el correo electrónico");
      } else {
        console.log("Correo electrónico enviado:", info.response);
        res.status(200).send("Correo enviado con éxito");
      }
    });
  });
};
