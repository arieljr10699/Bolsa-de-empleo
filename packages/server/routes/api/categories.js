const express = require("express");
const jwtAuth = require("../../middlewares/jwtAuth");
const adminAuth = require("../../middlewares/adminAuth");
const category_controller = require("../controllers/categControl");
const router = express.Router();

//Ruta GET Categories
router.get("/", jwtAuth, (req, res) => {
    category_controller.findCategories(req,res);
});

//Ruta POST Category
router.post("/", [jwtAuth, adminAuth], (req, res) => {
    category_controller.postCategory(req,res);
});

//Ruta DELETE Categories
//Se envia la categoria en su forma string como parametro para la eliminacion
router.delete("/:tipo", [jwtAuth, adminAuth], (req, res) => {
    category_controller.deleteCategory(req,res,req.params.tipo);
});


//Ruta PUT Categories
//Se envia la categoria en su forma string como parametro para la eliminacion
router.put("/:tipo", [jwtAuth, adminAuth], (req, res) => {
    category_controller.editCategory(req, res, req.params.tipo);
    
});


module.exports = router;