const pool = require("../db/connectionDb").pool;

//INVENTARIO//

//GET 

const getSucculent = async () => {
  SQLquery = {
    text: "SELECT * FROM inventory",
  };
  try {
    const result = await pool.query(SQLquery);
    return result.rows;
  } catch (e) {
    console.log("error al obtener  datos de la tabla inventory", e.code, e.message);
    throw newError(e);
  }
};

//Crear un producto 

const createSucculent = async (
  name,
  familia,
  tipo,
  reproduccion,
  distribucion,
  price,
  url
) => {
  const consulta =
    "INSERT INTO inventory (name, familia, tipo, reproduccion, distribucion, price, imagen) VALUES ($1, $2, $3 ,$4, $5, $6, $7) RETURNING *";
  const values = [
    name,
    familia,
    tipo,
    reproduccion,
    distribucion,
    price,
    url,
  ];
  const result = await pool.query(consulta, values);
  const rowCount = result.rowCount;

  if (!rowCount)
    throw {
      code: 404,
      message: "No se pudo crear el producto",
    };
  return result.rows;
};

//Borrar producto por id 
const deleteSucculent = async (payload) => {
  try {
    const query = {
      text: "DELETE FROM inventory WHERE id = $1",
      values: [payload],
    };
    const result = await pool.query(query);
    return result.rows;
  } catch (e) {
    console.log(
      "Error al eliminar datos de la tabla inventory:",
      e.code,
      e.message
    );
    throw new Error(e);
  }
};

//Modificar Usuario 

const updateSucu = async (payload) => {
  const query = {
    text: "UPDATE inventory SET likes = $1 WHERE id = $2 RETURNING *",
    values: [payload.name, payload.id],
  };
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (e) {
    console.log(
      "Error al modificar los datos en tabla inventory:",
      e.code,
      e.message
    );
    throw new Error(e);
  }
};

//consulta para encontrar un registo por id - 
const findSucu = async (payload) => {
  try {
    const query = {
      text: "SELECT * FROM inventory WHERE id = $1",
      values: [payload],
    };
    const result = await pool.query(query);
    return result.rows;
  } catch (e) {
    console.log(
      "Error al encontrar datos en tabla inventory:",
      e.code,
      e.message
    );
    throw new Error(e);
  }
};

module.exports = {
  getSucculent,
  createSucculent,
  deleteSucculent,
  findSucu,
  updateSucu,
};
