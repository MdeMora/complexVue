<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text>
          <h1>Bienvenido {{user.name}}</h1>
        </v-card-text>
        <v-card-text style="height:60vh; overflow:auto" v-chat-scroll>
          <div
            :class="item.name === user.name? 'text-right': 'text-left'"
            v-for="(item,idx) in mensajes"
            :key="idx"
          >
            {{item.name}}
            <v-chip style="max-width:90vh" flex-wrap>
              <v-avatar class="mr-2">
                <img :src="item.photo" alt="photo user" />
              </v-avatar>
              {{item.mensaje}}
            </v-chip>
            <p class="caption mr-2">{{item.fecha}}</p>
          </div>
        </v-card-text>
        <v-card-text>
          <v-form @submit.prevent="enviarMensaje" v-model="valido">
            <v-text-field
              v-model="mensaje"
              label="Escribe tu mensaje aqui"
              required
              :rules="reglas"
            />
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../firebase";
import moment from "moment";
export default {
  name: "Chat",
  data() {
    return {
      mensaje: "",
      valido: false,
      reglas: [v => !!v || "Tienes que escribir un mensaje"],
      mensajes: []
    };
  },
  methods: {
    enviarMensaje() {
      if (this.valido) {
        db.collection("chats")
          .add({
            mensaje: this.mensaje,
            name: this.user.name,
            photo: this.user.photo,
            fecha: Date.now()
          })
          .then(x => (this.mensaje = ""))
          .catch(error => console.log(error));
      }
    }
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    moment.locale("es");
    let ref = db.collection("chats").orderBy("fecha", "desc");
    ref.onSnapshot(querySnapshot => {
      this.mensajes = [];

      querySnapshot.forEach(doc => {
        this.mensajes.unshift({
          mensaje: doc.data().mensaje,
          photo: doc.data().photo,
          name: doc.data().name,
          fecha: moment(doc.data().fecha).format("lll")
        });
      });

      console.log(this.mensajes);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>