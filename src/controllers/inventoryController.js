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
    const queryString = req.query;
    const succulents = await getSucculent(queryString);
    const HATEOAS = await prepararHATEOAS(succulents);
    res.json(HATEOAS);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error al obtener los datos solicitados" });
  }
};

const prepararHATEOAS = (succulents) => {
  const results = succulents.map((j) => {
    return {
      name: j.nombre,
      href: `succulents/succulent/${j.id}`,
    };
  });

  const total = succulents.length;
  const HATEOAS = {
    total,
    results,
  };
  return HATEOAS;
};

//POST - CREAR PRODUCTO NUEVO
const createProduct = async (req, res) => {
  try {
    const { nombre, familia, tipo, reproduccion, distribucion, precio, url } =
      req.body;
    const newProduct = await createSucculent(
      nombre,
      familia,
      tipo,
      reproduccion,
      distribucion,
      precio,
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
    payload.nombre = foundSucu[0];
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
