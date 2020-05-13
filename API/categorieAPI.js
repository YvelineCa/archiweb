let Categorie = require("../models/categorieModel.js");
let connection = require("../db.js");

//Liste des catégories
exports.categorieList = function (request, response) {
  connection.query("Select * from categorie", function (error, resultSQL) {
    if (error) {
      response.status(400).send(error);
    } else {
      response.status(200);
      response.json({ Categorie: resultSQL });
    }
  });
};


//Ajouter ou modifier une catégorie dans la liste
exports.categorieNew = function (request, response) {
  let idcategorie = request.body.idcategorie;
  let name = request.body.name;
  if (idcategorie == -1) {
    let categorie = new Categorie(name);
    console.log(categorie);
    connection.query("INSERT INTO categorie set?", categorie, function (error, resultsSQL) {
      if (error) {
        response.status(400).send(error);
      }
      else {
        response.json({ success: true });
      }
    });
  }
  else if (idcategorie >= 0) {
    let categorie = new Categorie(name);
    console.log(categorie);
    connection.query("UPDATE categorie SET ? WHERE idcategorie = ?", [categorie, request.body.idcategorie], function (error, resultSQL) {
      if (error) {
        response.status(400).send(error);
      }
      else {
        response.json({ success: true });
      }
    });
  }
  console.log(categorieList);
}


//Suppression de la catégories
exports.categorieRemove = function (request, response) {
  let sql = "DELETE FROM `fiche` WHERE `idcategorie` = ?";
  connection.query(sql, [request.params.idcategorie], (error, resultSQL) => {
    if (error) {
      response.status(400).send(error);
    }
    else {
      let sql = "DELETE FROM `categorie` WHERE `categorie`.`idcategorie` = ?";
      connection.query(sql, [request.params.idcategorie], (error, resultSQL) => {
        if (error) {
          response.status(400).send(error);
        }
        else {
          response.json({ Categorie: resultSQL });
        }
      });
    }
  });

};
