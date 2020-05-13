<template>
  <div>
    <h1>ECOTIPS</h1>
    <p class="title">Ajouter une catégorie</p>
    <div class="col-md-4 col-3 my-1" v-for="(cat) in categories" :key="cat.idcategorie">
      <div class="card h-100 mb-4">
        <div class="card-inner">
          <div class="header">
            <h2>
              <a>{{cat.name}}</a>
            </h2>
          </div>
          <div class="content"></div>
        </div>
      </div>
    </div>
    <!-- <router-link :to="{name: 'Fiche'}">Aller sur Fiche</router-link> -->
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      categories: []
    };
  },
  created: function() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      let uri = "http://localhost:8000/API/categorie";
      axios.get(uri).then(response => {
        this.categories = response.data.Categorie;
        console.log(this.categories);
      });
    }
  }
};
</script>
