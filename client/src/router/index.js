/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import Fiche from "@/components/Fiche";
import Categorie from "@/components/categorie";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Categorie",
      component: Categorie
    },
    {
      path: "/fiche",
      name: "Fiche",
      component: Fiche
    }
  ]
});

/* eslint-disable */
