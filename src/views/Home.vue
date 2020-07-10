<template>
  <v-layout justify-center>
    <v-flex>
      <h1 class="text-h1 mt-5">Bienvenido!</h1>
      <br />
      <p>Gracias por probar mi aplicación {{user.name}}</p>
      <br />
      <p>
        En esta apliacion puedes cambiar
        <router-link to="/admin">tu foto</router-link>&nbsp; y
        <router-link to="/chat">chatear</router-link>!
      </p>

      <v-list dense>
        <v-subheader>Tecnologias</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-img
        style="width:400px"
        src="https://cf.ltkcdn.net/gatos/images/orig/236641-1600x1030-etapas-desarrollo-gatitos.jpg"
      ></v-img>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      items: [
        { text: "Front: Vue" },
        {
          text: "Back: Firebase"
        },
        {
          text: "Styles: Vuetify"
        },
        {
          text: "Gestión de estado: Vuex"
        }
      ]
    };
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
