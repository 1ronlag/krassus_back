const { showError } = require("../helpers/showError");
const { getUser } = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const { getJwtToken } = require("../helpers/createToken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  email.toLowerCase();
  password.toLowerCase();
  try {
    const user = await getUser(email);
    console.log("login", user);

    if (user[0] === undefined) {
      res.status(404).json({
        message: "No registrado",
        code: 404,
      });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user[0].password);

      if (!isPasswordValid) {
        res.status(401).json({
          message: "Contraseña incorrecta",
          code: 401,
        });
      } else {
        const token = await getJwtToken(user[0]);
        res.status(200).json({
          message: `Bienvenido, has iniciado sesion`,
          code: 200,
          token,
        });
      }
    }
  } catch (e) {
    showError(res, e);
  }
};

module.exports = { loginUser };
