const {
  getSucculent,
  createSucculent,
  deleteSucculent,
  findSucu,
  updateSucu,
} = require("../models/inventoryModel");
const { showError } = require("../helpers/showError");

//GET//

const getAllSucculent = async (req, res) => {
  
  try {
      const posts = await getSucculent();
      res.json(posts);
  } catch (e) {
      console.log();
      res
          .status(500)
          .json({ message: 'Error al obtener los datos' });
        }
      }


//POST - CREAR PRODUCTO NUEVO
const createProduct = async (req, res) => {
  try {
    const { name, familia, tipo, reproduccion, distribucion, price, url } =
      req.body;
    const newProduct = await createSucculent(
      name,
      familia,
      tipo,
      reproduccion,
      distribucion,
      price,
      url
    );
    res.status(201).json(newProduct);
  } catch (e) {
    showError(res, e);
  }
};

//Actualizar Producto para poder interactuar (PUT)
const updateSucuById = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  payload.id = id;
  try {
    const foundSucu = await findSucu(id);
    payload.name = foundSucu[0];
    if (foundSucu.length === 0) {
      console.log("Producto no encontrado");
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    const updateS = await updateSucu(payload);
    res.json(updateS);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error al actualizar el Producto" });
  }
};

//Eliminar producto (DELETE)
const deleteSucculentById = async (req, res) => {
  const { id } = req.params;
  try {
    const foundSucu = await findSucu(id);
    if (foundSucu.length === 0) {
      console.log("Producto no encontrado");
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await deleteSucculent(id);
    console.log("Producto eliminado con exito!");
    res.json({ message: "Producto eliminado con exito" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error al eliminar el Producto" });
  }
};

module.exports = {
  getAllSucculent,
  createProduct,
  deleteSucculentById,
  updateSucuById,
};
