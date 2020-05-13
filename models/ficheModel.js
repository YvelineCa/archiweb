class Fiche {
    title ="";
    idcategorie ="";
    ingredients = "";
    process = "";
    constructor(title, idcategorie, ingredients, process)
    {
        this.title = title;
        this.idcategorie = idcategorie;
        this.ingredients = ingredients;
        this.process = process;
    }
    
};

module.exports = Fiche;