<template>
  <v-container fluid>
    <!-- Alert de Video Guardado -->
    <v-alert
      type="success"
      transition="scale-transition"
      border="left"
      text
      v-model="alert"
      >Video Guardado Correctamente</v-alert
    >
    <v-row>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col align-self="center" cols="7">
              <v-container>

                <!--Input para el nombre del video -->
                <v-row>
                  <v-text-field
                    color="indigo"
                    v-model="form.name"
                    :error-messages="error.name"
                    prepend-icon="mdi-tag-text"
                    label="Nombre del Video"
                  ></v-text-field>
                </v-row>

                <!-- Select para la Categoria -->
                <v-row>
                  <v-col>
                    <v-select
                      label="Categoria"
                      prepend-icon="mdi-view-grid"
                      :error-messages="error.category"
                      :items="categorias"
                      @change="changeCategory"
                      v-model="form.category"
                    ></v-select>
                  </v-col>

                  <!-- Select para la Subcategoria -->
                  <v-col>
                    <v-select
                      label="Subcategoria"
                      prepend-icon="mdi-widgets"
                      no-data-text="Seleccione una Categoria"
                      :error-messages="error.subcategory"
                      :items="subcategory"
                      v-model="form.subcategory"
                    ></v-select>
                  </v-col>
                </v-row>

                <!-- Select para la plataforma -->
                <v-row>
                  <v-col>
                    <v-select
                      label="Plataforma de Desarrollo"
                      :items="plataform"
                      no-data-text="Seleccione una Categoria"
                      :error-messages="error.plataform"
                      v-model="form.plataform"
                      prepend-icon="mdi-code-tags"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col cols="1">
              <v-divider vertical></v-divider>
            </v-col>


            <v-col cols="4">
              <v-container>
                <!-- Mostrar la Miniatura -->
                <v-img :src="form.photoUrl"></v-img>

                <!-- Input para seleccionar el archivo de la miniatura -->
                <v-file-input
                  accept="image/*"
                  prepend-icon="mdi-file-image"
                  label="Miniatura"
                  v-model="form.photo"
                  @change="photoChange"
                  :error-messages="error.photo"
                ></v-file-input>

                <!-- Input para el link de youtube -->
                <v-text-field
                  color="indigo"
                  v-model="form.link"
                  :error-messages="error.link"
                  :rules="[rules.youtube]"
                  prepend-icon="mdi-link"
                  label="Link de Youtube"
                ></v-text-field>
              </v-container>
            </v-col>
          </v-row>

          <!-- Boton para Agregar el video -->
          <v-row justify="center">
            <v-btn
              dark
              color="indigo"
              :loading="loading"
              @click="verifyAndSave"
            >
              Agregar video
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-row>

    <v-row style="height: 50px;">
    </v-row>

    <!-- Mostar Tabla de regsitros -->
    <v-row>
      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      alert: false,
      loading: false,
      valid: true,
      form: {
        name: "",
        category: "",
        subcategory: "",
        plataform: "",
        photo: null,
        photoUrl: "https://firebasestorage.googleapis.com/v0/b/react-login-7ff2a.appspot.com/o/gui-2311260_640.png?alt=media&token=01577ef5-f63e-4d65-9674-807983604f2e",
        photoRef: "",
        link: "",
      },
      error: {
        name: "",
        category: "",
        subcategory: "",
        plataform: "",
        photo: "",
        link: "",
      },
      categorias: ["Web", "Movil", "Escritorio"],
      rules: {
        youtube: (value) => {
          if (value) {
            const pattern = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
            return pattern.test(value) || "Ingrese un link de Youtube valido";
          } else {
            return true;
          }
        },
      },
    };
  },
  methods: {
    cleanError() {
      this.error.name = "";
      this.error.category = "";
      this.error.subcategory = "";
      this.error.plataform = "";
      this.error.photo = "";
      this.error.link = "";
    },

    cleanForm() {
      this.form.name = "";
      this.form.category = "";
      this.form.subcategory = "";
      this.form.plataform = "";
      this.form.photo = null;
      this.form.photoUrl = "https://firebasestorage.googleapis.com/v0/b/react-login-7ff2a.appspot.com/o/gui-2311260_640.png?alt=media&token=01577ef5-f63e-4d65-9674-807983604f2e";
      this.form.photoRef = "";
      this.form.link = "";
    },

    photoChange() {
      if (this.form.photo) {
        this.form.photoUrl = URL.createObjectURL(this.form.photo);
      } else {
        this.form.photoUrl = "https://firebasestorage.googleapis.com/v0/b/react-login-7ff2a.appspot.com/o/gui-2311260_640.png?alt=media&token=01577ef5-f63e-4d65-9674-807983604f2e";
      }
    },

    changeCategory() {
      this.form.subcategory = "";
      this.form.plataform = "";
    },

    verifyAndSave() {
      this.alert = false;
      this.cleanError();
      if (this.valid) {
        if (this.form.name) {
          if (this.form.category) {
            if (this.form.subcategory) {
              if (this.form.plataform) {
                if (this.form.photo) {
                  if (this.form.link) {
                    this.loading = true;
                    this.saveVideo();
                  } else {
                    this.error.link = "Debe Colocar el Link del Video";
                  }
                } else {
                  this.error.photo = "Debe Establecer una Foto";
                }
              } else {
                this.error.plataform = "Debe Seleccionar Una Plataforma";
              }
            } else {
              this.error.subcategory = "Debe Seleccionar una subcategoria";
            }
          } else {
            this.error.category = "Debe Seleccionar una Categoria";
          }
        } else {
          this.error.name = "Debe Ingresar Un Nombre para el video";
        }
      }
    },

    saveVideo() {
      var user = firebase.auth().currentUser;
      var ruta = "users/" + user.uid + "/videos/" + this.form.photo.name;
      var storage = firebase.storage().ref();
      storage
        .child(ruta)
        .put(this.form.photo)
        .then((snapshot) => {
          storage
            .child(ruta)
            .getDownloadURL()
            .then((url) => {
              this.form.photoUrl = url;
              this.form.photoRef = ruta;
              this.saveData();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    saveData() {
      var user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("users/" + user.uid + "/videos")
        .doc()
        .set({
          name: this.form.name,
          category: this.form.category,
          subcategory: this.form.subcategory,
          plataform: this.form.plataform,
          photoUrl: this.form.photoUrl,
          photoRef: this.form.photoRef,
          link: this.form.link,
        })
        .then(() => {
          this.alert = true;
          this.loading = false;
          this.cleanForm();
        })
        .catch(function (error) {
          console.error("Error: ", error);
        });
    },
  },
  computed: {
    subcategory() {
      switch (this.form.category) {
        case "Web":
          return ["Website", "Webapp"];

        case "Movil":
          return ["Juego", "App"];

        case "Escritorio":
          return ["Sistema de informacion", "Simulador"];

        default:
          break;
      }
    },

    plataform() {
      switch (this.form.category) {
        case "Web":
          return [
            { header: "Base" },
            { text: "HTML, Css, Js" },
            { text: "PHP" },
            { divider: true },
            { header: "Framework" },
            { text: "Vue" },
            { text: "React" },
            { text: "Django" },
          ];

        case "Movil":
          return [
            { header: "Android" },
            { text: "Kotlin" },
            { text: "Java" },
            { divider: true },
            { header: "iOS" },
            { text: "Swift" },
            { text: "Objective-C" },
          ];

        case "Escritorio":
          return ["Python", "Java", "Visual Basic", "C++"];

        default:
          break;
      }
    },
  },
};
</script>

