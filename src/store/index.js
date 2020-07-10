import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '@/firebase.js'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    newUser(state, payload) {

      payload === null ? state.user = '' : state.user = payload
    }
  },
  actions: {
    setUser({ commit }, payload) {

      db.collection('users').doc(payload.uid).get()
        .then(doc => {
          if (doc.exists) {
            commit('newUser', doc.data())
          } else {
            db.collection("users")
              .doc(payload.uid)
              .set({
                name: payload.displayName,
                email: payload.email,
                uid: payload.uid,
                photo: payload.photoURL
              })
              .then(x => commit('newUser', { name: payload.displayName, email: payload.email, uid: payload.uid, photo: payload.photoURL }))

          }
        })
        .then(x => router.push({ name: 'Home' }))
    },
    closeSession({ commit }) {
      auth.signOut()
      commit('newUser', null)
      router.push({ name: 'Ingreso' })

    }
  },
  modules: {
  }
})
