// Get an instance of the express Router and set routes
let express = require("express");
let router = express.Router();

// Importation du controlleur de fiches
var ficheController = require("./controllers/ficheController");
var categorieController = require("./controllers/categorieController");
var categorieAPI = require("./API/categorieAPI");
var ficheAPI = require("./API/ficheAPI");

//Routes API
router.get("/", (request, response) => response.redirect("/API/categorie"));
//test
router.get("/API/categorie", categorieAPI.categorieList);
router.post("/API/categorie/new", categorieAPI.categorieNew);
router.get("/API/categorie/fiche/:idcategorie", ficheAPI.ficheList);

//Routes catégories
router.get("/", (request, response) => response.redirect("/categorie"));

router.get("/categorie", categorieController.categorieList);
router.get("/categorie/add", categorieController.categorieFormAdd);
router.post("/categorie/new", categorieController.categorieNew);
router.get("/categorie/fiche/:idcategorie", ficheController.ficheList);
router.get("/categorie/update/:idcategorie", categorieController.categorieFormUpdate);
router.get("/categorie/delete/:idcategorie", categorieController.categorieRemove);

module.exports = router;

//Routes fiches
router.get("/", (request, response) => response.redirect("/fiche"));

router.post("/fiche/filter", ficheController.ficheFilter);
router.get("/fiche/add", ficheController.ficheFormAdd);
router.post("/fiche/new", ficheController.ficheNew);
router.get("/fiche/update/:idfiche", ficheController.ficheFormUpdate);
router.get("/fiche/delete/:idfiche", ficheController.ficheRemove);

module.exports = router;
