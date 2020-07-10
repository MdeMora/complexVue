<template>
  <v-app>
    <Navbar v-if="user" />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    Navbar
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
