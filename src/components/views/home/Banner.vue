<template>
  <v-main class="ma-0 pa-0">
    <v-parallax
      dark
      height="850"
      src="https://firebasestorage.googleapis.com/v0/b/react-login-7ff2a.appspot.com/o/fondoLargo.jpg?alt=media&token=b0cbb888-b195-4b68-8045-086e1d30cfe9"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">JL Technology</h1>
          <h4 class="subheading">Portafolio Virutal</h4>
        </v-col>
      </v-row>
    </v-parallax>

    <v-container>
      <v-row style="height: 200px" align="center" justify="center">
        <v-col>
          <h3 :style="styleT" style="color: #3f51b5">
            Luis Herrera y Juan Bolivar
          </h3>
        </v-col>
        <v-col>
          <p :style="styleP" style="color: #283593" class="font-weight-medium">
            {{ description }}
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="pa-0">
      <v-row no-gutters class="fill-height" align="center">
        <template v-for="(item, i) in hovers">
          <v-col :key="i" cols="12" md="4" class="p-0">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 20 : 2"
                :class="{ 'on-hover': hover }"
                :color="item.color"
                height="300"
                class="pt-5"
                tile
              >
                <v-card-title>
                  <v-spacer></v-spacer>
                  <v-scale-transition>
                    <v-icon
                      v-if="hover"
                      style="font-size: 3rem"
                      color="white"
                      >{{ item.icon }}</v-icon
                    >
                  </v-scale-transition>
                  <v-spacer></v-spacer>
                </v-card-title>

                <v-card-title
                  style="color: white"
                  :style="[item.styleT ? styleT : styleS]"
                >
                  <v-spacer></v-spacer>
                  {{ item.title }}
                  <v-spacer></v-spacer>
                </v-card-title>

                <v-card-text
                  class="text-center"
                  style="color: white"
                  :style="styleP"
                >
                  {{ item.text }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-scale-transition>
                    <v-dialog width="500" v-model="dialog">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          dark
                          v-bind="attrs"
                          v-on="on"
                          v-show="hover ? item.btn : false"
                          color="indigo"
                          rounded
                          text
                          style="background-color: white"
                          elevation="2"
                        >
                          Contactanos
                        </v-btn>
                      </template>

                      <v-card>
                        <v-toolbar dark color="indigo lighten-2" elevation="1">
                          <v-spacer></v-spacer>
                          <v-toolbar-title> Contactanos </v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row style="height: 20px"></v-row>
                            <v-row>
                              <v-text-field
                                color="indigo"
                                prepend-inner-icon="mdi-account"
                                label="Nombre"
                                type="email"
                                v-model="form.name"
                                solo
                                :error-messages="error.name"
                              ></v-text-field>
                            </v-row>

                            <v-row>
                              <v-col>
                                <v-text-field
                                  color="indigo"
                                  prepend-inner-icon="mdi-email"
                                  label="Correo"
                                  type="text"
                                  v-model="form.email"
                                  solo
                                  :rules="[rules.email]"
                                  :error-messages="error.email"
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <v-text-field
                                  color="indigo"
                                  prepend-inner-icon="mdi-phone"
                                  label="Telefono"
                                  type="text"
                                  v-model="form.phone"
                                  solo
                                  :rules="[rules.phone]"
                                  :error-messages="error.phone"
                                ></v-text-field>
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col>
                                <v-textarea
                                  color="indigo"
                                  label="Mensaje"
                                  type="text"
                                  v-model="form.message"
                                  auto-grow
                                  outlined
                                  :error-messages="error.message"
                                >
                                </v-textarea>
                              </v-col>
                            </v-row>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                dark
                                rounded
                                text
                                style="background-color: #7986cb"
                                elevation="2"
                                @click="click"
                                :loading="loading"
                              >
                                Enviar Mensaje
                              </v-btn>
                              <v-spacer></v-spacer>
                            </v-card-actions>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-scale-transition>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>

    <v-container>
      <v-row
        style="height: 150px"
        class="fill-height"
        align="center"
        justify="center"
      >
        <v-col class="text-center">
          <span :style="styleS" style="color: #3f51b5"
            >Portafolio de Trabajos</span
          >
          <p :style="styleP" style="color: #283593">
            Estos son Algunos de Nuestros Trabajos
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="pa-0">
      <v-row no-gutters class="fill-height" align="center">
        <template v-for="(item, i) in videos">
          <v-col :key="i" cols="12" md="4" class="p-0">
            # Hover
            <v-hover v-slot="{ hover }">
              # Contenerdor
              <v-card :class="{ 'on-hover': hover }" tile>
                <v-menu absolute offset-y transition="scale-transition">
                  # Activador
                  <template v-slot:activator="{ on, attrs }">
                    <v-img
                      v-bind="attrs"
                      v-on="on"
                      height="250"
                      :src="item.photoUrl"
                      :lazy-src="item.photoUrl"
                      class="justify-center"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey"
                          ></v-progress-circular>
                        </v-row>
                      </template>

                      <v-expand-transition>
                        <div
                          v-if="hover"
                          :style="mask"
                          class="d-flex white--text text-center text-md"
                        >
                          {{ item.name }}
                        </div>
                      </v-expand-transition>
                    </v-img>
                  </template>

                  # Contenedor Info
                  <v-card
                    min-width="375"
                    max-width="600"
                    color="indigo lighten-3"
                  >
                    <v-card-title
                      class="white--text indigo lighten-1 headline text-center"
                      >{{ item.name }}</v-card-title
                    >

                    <v-card-text>
                      <v-row justify="center" align="center">
                        <v-col cols="6" sm="6">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title class="title white--text">
                                Categoria:
                              </v-list-item-title>
                              <v-list-item-subtitle
                                class="subtitle-1 white--text"
                              >
                                {{ item.category }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title class="title white--text">
                                Subcategoria:
                              </v-list-item-title>
                              <v-list-item-subtitle
                                class="subtitle-1 white--text"
                              >
                                {{ item.subcategory }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title class="title white--text">
                                Plataforma:
                              </v-list-item-title>
                              <v-list-item-subtitle
                                class="subtitle-1 white--text"
                              >
                                {{ item.plataform }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                        <v-col cols="6" sm="6" class="text-center">
                          <v-btn
                            fab
                            color="red"
                            dark
                            x-large
                            :href="item.link"
                            target="_blank"
                          >
                            <v-icon>mdi-youtube</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>

    <v-snackbar
      v-model="snackbar"
      timeout="3000"
      bottom
      color="success"
      rounded="pill"
    >
      <span :style="styleP"
        ><v-icon>mdi-send-check</v-icon> Mensaje Enviado</span
      >

      <template v-slot:action="{ attrs }">
        <v-btn color="indigo" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      a: false,
      dialog: false,
      valid: false,
      snackbar: false,
      loading: false,
      menu: false,
      description: "",
      videos: [],
      rules: {
        email: (value) => {
          if (value) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return (
              pattern.test(value) || "Ingrese una Direccion de Correo Valida."
            );
          } else return true;
        },
        phone: (value) => {
          if (value) {
            const pattern = /([0-9]{3})-([0-9]{7})/;
            return (
              pattern.test(value) ||
              "Ingrese un numero de telefono valido - 123-4567890"
            );
          } else {
            return true;
          }
        },
      },
      form: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
      error: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
      hovers: [
        {
          color: "indigo lighten-3",
          icon: "mdi-code-tags",
          styleT: false,
          title: "Que Hacemos",
          text:
            "En JL Tecnology, trabajamos para darle vida a sus ideas. Nuestro equipo de trabajo aportará todo su experiencia para que su proyecto sea un caso de exito",
          btn: false,
        },
        {
          color: "indigo lighten-2",
          icon: "mdi-message-text-outline",
          styleT: true,
          title: "Contactanos",
          text:
            "Ponte en Contacto con nosotros ahora mismo, Envia un Mensaje y te respoderemos lo antes posible",
          btn: true,
        },
        {
          color: "indigo lighten-1",
          icon: "mdi-widgets-outline",
          styleT: false,
          title: "Servicios",
          text:
            "Diseño gráfico, imágen corporativa, logotipos, redes sociales, hosting y dominios, redes sociales",
          btn: false,
        },
      ],
      styleT: {
        "font-size": "2rem",
        "letter-spacing": "0.2em",
      },
      styleS: {
        "font-size": "1.7rem",
        "font-weight": "bold",
        "letter-spacing": "0.2em",
      },
      styleP: {
        "letter-spacing": "0.1em",
      },
      mask: {
        width: "100%",
        "background-color": "#3F51B590",
        "font-size": "2rem",
        "font-weight": "bold",
        "align-items": "center",
        "justify-content": "center",
        position: "absolute",
        bottom: 0,
      },
    };
  },

  methods: {
    getDescription() {
      var docRef = firebase
        .firestore()
        .collection("users")
        .doc("oku1MhPtd9WvzeznFqnANT16Rdm2");
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.description = doc.data().description;
          } else {
            console.log("No se Encontro");
          }
        })
        .catch(function (error) {
          console.log("Error al obtener el documento:", error);
        });
    },

    getVideos() {
      firebase
        .firestore()
        .collection("users/oku1MhPtd9WvzeznFqnANT16Rdm2/videos")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.videos.push(doc.data());
          });
        })
        .catch((error) => {
          console.log("Error al obtener datos:", error);
        });
    },

    cleanEror() {
      this.error.name = "";
      this.error.email = "";
      this.error.phone = "";
      this.error.message = "";
    },

    cleanform() {
      this.form.name = "";
      this.form.email = "";
      this.form.phone = "";
      this.form.message = "";
    },

    click() {
      this.snackbar = false;
      this.cleanEror();
      if (this.valid) {
        if (this.form.name) {
          if (this.form.email) {
            if (this.form.phone) {
              if (this.form.message) {
                this.loading = true;
                this.send();
              } else {
                this.error.message = "Debe Escribir Un Mensaje";
              }
            } else {
              this.error.phone = "Debe Ingresar un Numero de Telefono";
            }
          } else {
            this.error.email = "Debe Ingresar Un Email";
          }
        } else {
          this.error.name = "Debe Ingresar Un Nombre";
        }
      }
    },

    send() {
      firebase
        .firestore()
        .collection("/users/oku1MhPtd9WvzeznFqnANT16Rdm2/messages")
        .doc()
        .set({
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          message: this.form.message,
          read: false,
        })
        .then(() => {
          this.dialog = false;
          this.snackbar = true;
          this.loading = false;
          this.cleanform();
        })
        .catch(function (error) {
          console.error("Error: ", error);
        });
    },
  },
  created() {
    this.getDescription();
    this.getVideos();
  },
};
</script>
