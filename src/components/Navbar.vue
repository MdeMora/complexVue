<template>
  <nav>
    <v-app-bar app>
      <v-icon @click="drawer = !drawer">fas fa-bars</v-icon>

      <div class="d-flex align-center ml-5">
        <router-link :to="{name:'Home'}" class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <span>MdeMora-Vue</span>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="closeSession">
        <span class="mr-2">Cerrar Sesion</span>
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer temporary v-model="drawer" app class="indigo">
      <v-layout column align-center mt-5>
        <v-flex>
          <v-avatar>
            <img :src="user.photo" />
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="white--text">{{user.name}}</p>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="(item,idx) in items" :key="idx" :to="item.to">
          <v-list-item-action>
            <v-icon class="white--text">{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-title class="white--text">{{item.title}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "fas fa-compass", to: { name: "Home" } },
        {
          title: "Ingreso",
          icon: "fas fa-sign-in-alt",
          to: { name: "Ingreso" }
        },
        { title: "Admin", icon: "fas fa-user-cog", to: { name: "Admin" } },
        { title: "Chat", icon: "fas fa-comments", to: { name: "Chat" } }
      ]
    };
  },
  methods: {
    ...mapActions(["closeSession"])
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