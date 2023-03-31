const express = require('express')
const router = express.Router()
const { reportRequest } = require('../middlewares/logger')
const {getAllSucculent, createProduct, deleteSucculentById, updateSucuById} = require('../controllers/inventoryController')

router.get("/inventory",reportRequest, getAllSucculent);
router.post("/inventory",reportRequest, createProduct);
router.put("/inventory/:id",reportRequest, updateSucuById);
router.delete("/inventory/:id",reportRequest, deleteSucculentById);


module.exports = router;

