const {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  findUser,
} = require("../models/usersModel");
const { showError } = require("../helpers/showError");

//TRAER EL USUARIO
// const getProfiles = async (req, res) => {
//   try {
//     const email = req.user["email"];
//     const resp = await getUser(email);
//     res.json(resp);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener los datos" });
//   }
// };

const getProfiles = async (req, res) => {
  
  try {
      const users = await getUser();
      res.json(users);
  } catch (e) {
      console.log();
      res
          .status(500)
          .json({ message: 'Error al obtener los datos' });
        }
      }


//CREAR NUEVO USUARIO
const userRegiter = async (req, res) => {
  try {
    const { nombre, email, password, telefono, direccion } = req.body;
    const newUser = await createUser(
      nombre,
      email,
      password,
      telefono,
      direccion
    );
    res.status(201).json(newUser);
  } catch (e) {
    showError(res, e);
  }
};

//Eliminar usuario (DELETE)
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const foundUser = await findUser(id);
    if (foundUser.length === 0) {
      console.log("User no encontrado");
      return res.status(404).json({ message: "User no encontrado" });
    }
    await deleteUser(id);
    console.log("User eliminado con exito!");
    res.json({ message: "User eliminado con exito" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error al eliminar el user" });
  }
};

//Actualizar usuario (PUT)
const updateUsertById = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  payload.id = id;
  try {
    const foundUsers = await findUser(id);
    [payload.name, payload.id] = foundUsers[0];
    if (foundUsers.length === 0) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const updateU = await updateUser(payload);
    res.json(updateU);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error al actualizar el usuario" });
  }
};

module.exports = { userRegiter, getProfiles, deleteUserById, updateUsertById };
