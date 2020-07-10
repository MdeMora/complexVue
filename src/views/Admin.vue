<template>
  <v-layout justify-center>
    <v-flex xs6>
      <v-card class="text-center">
        <v-card-text>
          <v-avatar>
            <img :src="user.photo" />
          </v-avatar>
        </v-card-text>
        <v-card-text>{{user.name}}</v-card-text>
        <v-card-text>
          <input type="file" ref="boton" class="d-none" @change="buscarImagen($event)" />
          <v-btn color="primary mr-2" @click="$refs.boton.click()">Buscar Imagen</v-btn>
          <v-btn
            color="secondary"
            :disabled="!file"
            @click="subirImagen"
            :loading="loading"
          >Subir Imagen</v-btn>
        </v-card-text>
        <v-card-text v-if="error">
          <p>{{error}}</p>
        </v-card-text>
        <v-card-text v-if="file">
          <v-img :src="urlTemporal"></v-img>
          <p>{{file.name}}</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import { firebase, storage, db } from "../firebase";
export default {
  name: "Admin",
  data() {
    return {
      file: null,
      urlTemporal: "",
      loading: false,
      error: null
    };
  },
  methods: {
    buscarImagen(event) {
      if (
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/png"
      ) {
        this.file = event.target.files[0];
        this.error = null;
      } else {
        this.error = "Archivo no valido";
        this.file = null;
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => (this.urlTemporal = e.target.result);
    },
    subirImagen() {
      this.loading = true;
      const refImagen = storage
        .ref()
        .child(this.user.email)
        .child("profilePhoto");

      refImagen
        .put(this.file)
        .then(x => refImagen.getDownloadURL())
        .then(urlDownload => (this.user.photo = urlDownload))
        .then(x =>
          db
            .collection("users")
            .doc(this.user.uid)
            .update({ photo: this.user.photo })
        )
        .then(x => (this.loading = false))
        .catch(error => console.log(error));
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style lang="scss" scoped>
</style>