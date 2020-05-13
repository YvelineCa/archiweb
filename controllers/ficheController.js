let Fiche = require('../models/ficheModel.js');
let connection = require('../db.js');
let ficheList = [];
let idCurrentCat = '';
//Liste des fiches
exports.ficheList = function (request, response) {
    let idcategorie = request.params.idcategorie;
    idCurrentCat = request.params.idcategorie;
    connection.query("Select * from fiche WHERE idcategorie = ?", idcategorie, function (error, resultSQL) {
        if (error) {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            ficheList = resultSQL;
            console.log(ficheList);
            response.render('ficheList.ejs', { fiches: ficheList });
        }
    });
}

//Ajouter ou modifier une fiche dans la liste
exports.ficheNew = function (request, response) {
    let idfiche = request.body.idfiche;
    let title = request.body.title;
    let idcategorie = idCurrentCat;
    let ingredients = request.body.ingredients;
    let process = request.body.process;
    if (idfiche == -1) {
        let fiche = new Fiche(title, idcategorie, ingredients, process);
        console.log(request.body.idcategorie);
        connection.query("INSERT INTO fiche set?", fiche, function (error, resultsSQL) {
            if (error) {
                response.status(400).send(error);
            }
            else {
                response.status(201).redirect('/categorie/fiche/' + idCurrentCat);
            }
        });
    }
    else if (idfiche >= 0) {
        let fiche = new Fiche(title, idcategorie, ingredients, process);
        console.log(fiche);
        connection.query("UPDATE fiche SET ? WHERE idfiche = ?", [fiche, request.body.idfiche], function (error, resultSQL) {
            if (error) {
                response.status(400).send(error);
            }
            else {
                response.status(202).redirect('/categorie/fiche/' + idCurrentCat);
            }
        });
    }

}


// Récupération du formulaire pour le modifier
exports.ficheFormAdd = function (request, response) {
    response.render('ficheAdd.ejs', { idfiche: '-1', title: "", idcategorie: idCurrentCat, ingredients: "", process: "", update: false });
}

// Envoie du formulaire de la fiche modifié
exports.ficheFormUpdate = async function (request, response) {
    let idfiche = request.params.idfiche;
    await connection.query("Select * from fiche WHERE idfiche = ?", idfiche, function (error, resultSQL) {
        if (error) {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            fiches = resultSQL;
            response.render('ficheAdd.ejs', { idfiche: idfiche, title: fiches[0].title, idcategorie: fiches[0].idcategorie, ingredients: fiches[0].ingredients, process: fiches[0].process, update: true });
        }
    });
}

//Suppression de la fiche
exports.ficheRemove = function (request, response) {
    let sql = "DELETE FROM `fiche` WHERE `fiche`.`idfiche` = ?";
    connection.query(sql, [request.params.idfiche], (error, resultSQL) => {
        if (error) {
            response.status(400).send(error);
        }
        else {
            response.redirect('/categorie/fiche/' + idCurrentCat);
        }
    });

};

//Filtre

exports.ficheFilter = function (req, res) {
    filtredList = ficheList.filter(list => list.title.includes(req.body.title));
    res.render('ficheList.ejs', { fiches: filtredList });
}