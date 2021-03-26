<template>
  <v-app id="inspire">
    <v-app-bar app :color="bg" dark absolute hide-on-scroll elevation="0">
      <v-scroll-x-transition>
        <img
          src="./../../../assets/Jl.png"
          height="130"
          class="pr-5"
          v-show="bar"
        />
      </v-scroll-x-transition>
      <v-divider vertical></v-divider>

      <v-scale-transition>
        <router-link to="/" v-show="bar">
          <v-btn class="ml-5" dark text> Inicio </v-btn>
        </router-link>
      </v-scale-transition>

      <v-scale-transition>
        <router-link to="/" v-show="bar">
          <v-btn class="ml-5" dark text> Contacto </v-btn>
        </router-link>
      </v-scale-transition>

      <v-scale-transition>
        <router-link to="/" v-show="bar">
          <v-btn class="ml-5" dark text> Portafolio </v-btn>
        </router-link>
      </v-scale-transition>
    </v-app-bar>

    <v-sheet id="scrolling-techniques-4" class="overflow-y-auto" max-height="0">
      <v-container style="height: 1000px"></v-container>
    </v-sheet>

    <v-main class="ma-0 pa-0">
      <router-view></router-view>
    </v-main>

    <v-footer color="indigo">
      <v-col cols="5" class="ml-16">
        <v-row>
          <span :style="styleT"> CONTACTO </span>
        </v-row>

        <v-row class="mt-5">
          <span :style="styleS">
            <v-icon color="indigo darken-4">mdi-phone</v-icon>
            {{ phone }} </span
          ><br />
          <p :style="styleP" class="mt-2">
            Hecho por Luis Herrera y Juan Bolivar
          </p>
        </v-row>

        <v-row class="mt-2">
          <v-btn icon color="light-blue lighten-1" :href="facebook" target="_blank">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>

          <v-btn icon class="ml-2" color="pink lighten-1" :href="instagram" target="_blank">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>

          <v-btn icon class="ml-2" color="light-blue lighten-1" :href="twitter" target="_blank">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </v-row>
      </v-col>

      <v-col cols="4">
        <v-row>
          <span :style="styleT"> PLANES WEB </span>
        </v-row>

        <v-row class="mt-5">
          <ul>
            <li v-for="plan in planes" :key="plan" :style="styleP">
              {{ plan }}
            </li>
          </ul>
        </v-row>
      </v-col>

      <v-col cols="2">
        <img src="./../../../assets/Jl.png" height="200" class="pr-5" />
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      bg: "transparent",
      bar: true,
      phone: "",
      facebook: "",
      twitter: "",
      instagram: "",
      styleT: {
        color: "white",
        "font-size": "x-large",
        "letter-spacing": "0.2em",
      },
      styleS: {
        color: "white",
        "font-weight": "bold",
        "letter-spacing": "0.5em",
      },
      styleP: {
        color: "white",
        "letter-spacing": "0.3em",
      },
      planes: ["Ecommerce", "Web Corporativa", "Promocion"],
    };
  },

  methods: {
    changeBar() {
      if (
        document.body.scrollTop > 1 ||
        document.documentElement.scrollTop > 1
      ) {
        this.bar = false;
      } else {
        this.bar = true;
      }
    },

    getData() {
      var docRef = firebase
        .firestore()
        .collection("users")
        .doc("oku1MhPtd9WvzeznFqnANT16Rdm2");
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.phone = doc.data().phone;
            this.facebook = "https://facebook.com/" + doc.data().facebook;
            this.instagram = "https://instagram.com/" + doc.data().instagram;
            this.twitter = "htpps://twitter.com/" + doc.data().twitter;
          } else {
            console.log("No se Encontro");
          }
        })
        .catch(function (error) {
          console.log("Error al obtener el documento:", error);
        });
    },
    
  },
  mounted() {
    window.onscroll = () => {
      this.changeBar();
    };
  },
  created() {
    this.getData();
  },
};
</script>
