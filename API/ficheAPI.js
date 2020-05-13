let Fiche = require("../models/ficheModel.js");
let connection = require("../db.js");
let idCurrentCat = "";

//Liste des fiches
exports.ficheList = function (request, response) {
  let idcategorie = request.params.idcategorie;
  idCurrentCat = request.params.idcategorie;
  connection.query(
    "SELECT * from fiche WHERE idcategorie = ?",
    idcategorie,
    function (error, resultSQL) {
      if (error) {
        response.status(400).send(error);
      } else {
        response.status(200);
        response.json({ Fiche: resultSQL });
      }
    }
  );
};
