<template>
  <v-app id="inspire">
    <v-navigation-drawer app permanent :mini-variant.sync="drawer">
      <v-list dense light>
        <v-list-item link to="/dashboard">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Perfil Administrador</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/web">
          <v-list-item-action>
            <v-icon>mdi-web</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Componentes Web</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/videos">
          <v-list-item-action>
            <v-icon>mdi-video-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Galeria de Videos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/message">
          <v-list-item-action>
            <v-badge
              :content="messages"
              :value="messages"
              color="indigo"
              overlap
              ><v-icon>mdi-message-text</v-icon></v-badge
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mensajes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>
      <router-link to="/account" class="ml-2">
        <v-btn class="ma-2" color="primary" rounded small>
          {{ currentUser.displayName }}
        </v-btn>
      </router-link>

      <v-btn color="red" x-small dark fab @click="logout"
        ><v-icon>mdi-logout</v-icon></v-btn
      >
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <router-view class="main-view" name="MainView"></router-view>
          </v-col>
        </v-row>
      </v-container>

      <v-footer color="indigo">
        <span class="white--text">Hecho por Luis Herrera y Juan Bolivar</span>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      messages: 0,
      drawer: true,
      currentUser: {},
    };
  },
  methods: {
    getUser() {
      var user = firebase.auth().currentUser;
      if (user) {
        this.currentUser = user;
      } else {
      }
    },

    getMessages() {
      var user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("users/" + user.uid + "/messages")
        .where("read","==",false)
        .onSnapshot((querySnapshot) => {
          this.messages = 0;
          querySnapshot.forEach((doc) => {
            this.messages++;
          });
        });
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/login");
        })
        .catch((error) => {});
    },
  },
  created() {
    this.getUser();
    this.getMessages();
  },
};
</script>