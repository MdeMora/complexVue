<template>
  <v-layout justify-center mt-4>
    <v-flex xs12 sm8 md6 xl4>
      <v-card>
        <v-card-text
          class="display-1 text-uppercase white--text"
          :class="signin? 'success' : 'accent'"
        >
          <span v-if="!signin">Ingreso</span>
          <span v-if="signin">Registro</span>
        </v-card-text>
        <v-card-text>
          <v-btn block color="error" @click="google">
            Google
            <v-icon right>fab fa-google</v-icon>
          </v-btn>

          <v-btn block color="info" @click="facebook">
            Facebook
            <v-icon right>fab fa-facebook-f</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text>
          <v-btn block @click="signin = !signin" v-if="!signin">No tienes cuenta? Registrate aqui</v-btn>
          <v-btn block @click="signin = !signin" v-if="signin">Ya tienes cuenta? Inicia sesión aqui</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { firebase, auth, db } from "../firebase";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Ingreso",
  data() {
    return {
      signin: true
    };
  },
  methods: {
    ...mapMutations(["newUser"]),
    ...mapActions(["setUser"]),
    google() {
      console.log("google");
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      this.doAuth(googleProvider);
    },
    facebook() {
      console.log("face");
      const faceProvider = new firebase.auth.FacebookAuthProvider();
      this.doAuth(faceProvider);
    },
    doAuth(provider) {
      firebase.auth().languageCode = "es";
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => result.user)
        .then(user => this.setUser(user))
        .catch(error => console.log(error));
    }
  }
};
</script>