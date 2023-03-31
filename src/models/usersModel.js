const pool = require("../db/connectionDb").pool;
const bcrypt = require("bcryptjs");

//Login - FUNCIONA// - GET

const getUser = async (email, password) => {
    const consulta = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await pool.query(consulta, values);
    const rowCount = result.rowCount;
    console.log("result.rowCount", rowCount);

    if (!rowCount)
      throw {
        code: 404,
        message: "No se encontró ningún usuario con estas credenciales",
      };
    return result.rows;
  };

//Crear usuario  - //  POST

const createUser = async (nombre, email, password, telefono, direccion) => {
  const passwordEncriptada = bcrypt.hashSync(password);
  const consulta =
    "INSERT INTO users (nombre, email, password, telefono, direccion) VALUES ($1, $2, $3 ,$4, $5) RETURNING *";
  const values = [nombre, email, passwordEncriptada,telefono, direccion];
  const result = await pool.query(consulta, values);
  const rowCount = result.rowCount;

  if (!rowCount)
    throw {
      code: 404,
      message: "No se pudo crear el usuario",
    };
  return result.rows;
};


//Borrar Usuario por id - // - DELETE

const deleteUser = async (payload) => {
    try {
        const query = {
            text: "DELETE FROM users WHERE id = $1",
            values: [payload],
        };
        const result = await pool.query(query);
        return result.rows;
    } catch (e) {
        console.log("Error al eliminar datos de la tabla users:", e.code, e.message)
        throw new Error(e);
    }
}


//consulta para encontrar un registo por id - 
const findUser = async (payload) => {
  try {
      const query = {
          text: "SELECT * FROM users WHERE id = $1",
          values: [payload],
      };
      const result = await pool.query(query);
      return result.rows;
  } catch (e) {
      console.log("Error al encontrar datos en tabla users:", e.code, e.message);
      throw new Error(e);
  }
}


//Modificar  nombre de Usuario - probar// - PUT

const updateUser = async (payload) => {
  const query = {
      text: "UPDATE users SET nombre = $1 WHERE id = $2 RETURNING *",
      values: [payload.nombre, payload.id],
  };
  try {
      const result = await pool.query(query);
      return result.rows;
  } catch (e) {
      console.log('Error al modificar los datos en tabla user:',
          e.code,
          e.message);
      throw new Error(e);
  }
}




module.exports = { getUser, createUser, deleteUser, findUser,updateUser  };
