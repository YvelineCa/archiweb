let Categorie = require('../models/categorieModel.js'); //Cette première ligne de code défini "Categorie" par le modèle
let connection = require('../db.js'); //Une connexion avec la DB est requise, afin d'y accèder et de récuperer des infos et/ou d'y importer des infos
let categorieList = [];

//Liste des catégories
exports.categorieList = function (request, response) {    // déclarer le nom de la fonction et la fonction en elle même
    connection.query("Select * from categorie", function (error, resultSQL) { // "connection.query" veut dire qu'il y a une selection de 
        if (error) { // Si il y a une erreur
            response.status(400).send(error);        //Alors il y a une page erreur qui s'affiche
        }
        else { //Si il n'y a pas d'erreur
            response.status(200); // alors il y a une réponse au status 200
            categorieList = resultSQL; // La catégorieList est un resultat SQL
            console.log(categorieList);
            response.render('categorieList.ejs', { categories: categorieList }); // C'est la réponse à la demande
        }
    });
}

//Ajouter ou modifier une catégorie dans la liste
exports.categorieNew = function (request, response) {
    let idcategorie = request.body.idcategorie; // une demande au body pour idcategorie
    let name = request.body.name;
    if (idcategorie == -1) {
        let categorie = new Categorie(name);
        console.log(categorie);
        connection.query("INSERT INTO categorie set?", categorie, function (error, resultsSQL) {
            if (error) {
                response.status(400).send(error);
            }
            else {
                response.status(201).redirect('/categorie');
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
                response.status(202).redirect('/categorie');
            }
        });
    }
    console.log(categorieList);
}


// Récupération du formulaire pour le modifier
exports.categorieFormAdd = function (request, response) {
    response.render('categorieAdd.ejs', { idcategorie: '-1', name: "", update: false });
}


// Envoie du formulaire de la catégorie modifié
exports.categorieFormUpdate = async function (request, response) {
    let idcategorie = request.params.idcategorie;
    let name = request.params.name;
    await connection.query("Select * from categorie WHERE idcategorie = ?", idcategorie, function (error, resultSQL) {
        if (error) {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            categories = resultSQL;
            console.log(categories)
            response.render('categorieAdd.ejs', { idcategorie: categories.idcategorie, cat: categories, name: categories.name, update: true });
        }
    });
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
                    response.status(202).redirect('/categorie');
                }
            });
        }
    });

};