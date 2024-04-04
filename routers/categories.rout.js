const { Router } = require('express');
const router = Router();

const categoriesControllerr = require("../controllers/categories.controller");

router.get("/", ategoriesControllerr.GetAllCategories());
module.exports = router;