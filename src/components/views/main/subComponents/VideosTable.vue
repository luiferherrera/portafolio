<template>
  <v-container>
    <!-- Tabla para mostrar los Registros -->
    <v-data-table :headers="headers" :items="desserts" class="elevation-1" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <!-- Input para las busquedas -->
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            outlined
            single-line
          ></v-text-field>
        </v-toolbar>
        
        <!-- Ventana Para Ver el Video de Youtube -->
        <v-dialog v-if="booleans.dialogVideo" v-model="booleans.dialogVideo" max-width="1000">
          <iframe
            width="560"
            height="556"
            :src="embedLink"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-dialog>

        <!-- Ventana para Modificar Registro -->
        <v-dialog v-model="booleans.dialog" max-width="1000">
          <v-card>
            <v-toolbar dark color="indigo">
              <v-toolbar-title> Modificar Registro </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <!-- Alert de Video Guardado Correctamente -->
              <v-alert
                type="success"
                transition="scale-transition"
                border="left"
                text
                v-model="booleans.alert"
                >Video Guardado Correctamente</v-alert
              >

              <v-form v-model="booleans.valid">
                <v-container>
                  <v-row>
                    <v-col align-self="center" cols="6">
                      <v-container>
                        <!--Input para el nombre del video -->
                        <v-row>
                          <v-text-field
                            color="indigo"
                            v-model="editedItem.name"
                            :error-messages="error.name"
                            prepend-icon="mdi-tag-text"
                            label="Nombre del Video"
                          ></v-text-field>
                        </v-row>

                        <v-row>
                          <!-- Select para la Categoria -->
                          <v-col>
                            <v-select
                              label="Categoria"
                              prepend-icon="mdi-view-grid"
                              :error-messages="error.category"
                              :items="categorias"
                              @change="changeCategory"
                              v-model="editedItem.category"
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
                              v-model="editedItem.subcategory"
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
                              v-model="editedItem.plataform"
                              prepend-icon="mdi-code-tags"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>

                    <v-col>
                      <v-divider vertical></v-divider>
                    </v-col>

                    <v-col cols="5">
                      <v-container>
                        <!-- Mostrar la Miniatura -->
                        <v-img :src="editedItem.photoUrl"></v-img>

                        <!-- Input para seleccionar el archivo de la miniatura -->
                        <v-file-input
                          accept="image/*"
                          prepend-icon="mdi-file-image"
                          label="Miniatura"
                          v-model="photo"
                          @change="photoChange"
                          :error-messages="error.photo"
                        ></v-file-input>

                        <!-- Input para el link de youtube -->
                        <v-text-field
                          color="indigo"
                          v-model="editedItem.link"
                          :error-messages="error.link"
                          :rules="[rules.youtube]"
                          prepend-icon="mdi-link"
                          label="Link de Youtube"
                        ></v-text-field>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- Boton Cerrar -->
              <v-btn plain @click="close">Cerrar</v-btn>
              <!-- Boton Guardar cambios -->
              <v-btn
                color="indigo"
                :loading="booleans.loading"
                dark
                @click="save"
                >Guardar Cambios</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Borrar Registro -->
        <v-dialog v-model="booleans.dialogDelete" max-width="325px">
          <v-card dark color="indigo">
            <v-card-title>
              <v-spacer></v-spacer>
              ¿Desea eliminar el registro?
              <v-spacer></v-spacer>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark plain @click="closeDelete">Cancelar</v-btn>
              <v-btn color="error" plain @click="deleteItemConfirm">Borrar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <!-- Ver Miniaturas en la tabla -->
      <template v-slot:[`item.photo`]="{ item }">
        <v-img
          :src="item.photoUrl"
          class="my-1"
          max-height="75"
          max-width="100"
        ></v-img>
      </template>

      <!-- Boton para ver el video -->
      <template v-slot:[`item.link`]="{ item }">
        <v-btn fab color="red" dark @click.stop="playvideo(item)"
          ><v-icon>mdi-youtube</v-icon></v-btn
        >
      </template>

      <!-- Botones de editar y borrar -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          x-small
          fab
          class="mr-2"
          color="indigo"
          dark
          @click.stop="editItem(item)"
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
        <v-btn x-small fab color="error" @click.stop="deleteItem(item)"
          ><v-icon>mdi-delete </v-icon></v-btn
        >
      </template>
    </v-data-table>

    <!-- Snackbar de registro Borrado -->
    <v-snackbar
      v-model="booleans.snackbar"
      timeout="3000"
      top
      color="red darken-1"
    >
      <v-icon>mdi-close</v-icon>
      Registro Borrado

      <template v-slot:action="{ attrs }">
        <v-btn
          color="indigo"
          text
          v-bind="attrs"
          @click="booleans.snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    search: "",
    photo: null,
    categorias: ["Web", "Movil", "Escritorio"],
    desserts: [],
    editedIndex: -1,
    editedID: "",
    booleans: {
      dialog: false,
      dialogDelete: false,
      dialogVideo: false,
      valid: true,
      alert: false,
      snackbar: false,
      loading: false,
    },
    error: {
      name: "",
      category: "",
      subcategory: "",
      plataform: "",
      link: "",
    },
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
    headers: [
      {
        text: "Miniatura",
        align: "start",
        sortable: false,
        value: "photo",
      },
      { text: "Nombre del video", value: "name" },
      { text: "Categoria", value: "category" },
      { text: "Subcategory", value: "subcategory" },
      { text: "Plataforma", value: "plataform" },
      { text: "Link", value: "link", align: "center", sortable: false },
      { text: "Acciones", value: "actions", align: "center", sortable: false },
    ],
    editedItem: {
      photoUrl: "",
      photoRef: "",
      name: "",
      category: "",
      subcategory: "",
      plataform: "",
      link: "",
    },
    defaultItem: {
      photoUrl: "",
      photoRef: "",
      name: "",
      category: "",
      subcategory: "",
      plataform: "",
      link: "",
    },
  }),

  computed: {
    subcategory() {
      switch (this.editedItem.category) {
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
      switch (this.editedItem.category) {
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

    embedLink() {
      var pos = this.editedItem.link.indexOf("youtu.be/");
      var newlink = "";
      if (pos != -1) {
        const part1 = this.editedItem.link.slice(0, pos);
        const part2 = this.editedItem.link.slice(
          pos + 9,
          this.editedItem.link.length
        );
        newlink = part1.concat("www.youtube.com/embed/", part2);
      } else {
        var replace = "watch?v=";
        newlink = this.editedItem.link.replace(replace, "embed/");
      }
      return newlink;
    },
  },

  methods: {
    initialize() {
      var user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("users/" + user.uid + "/videos")
        .onSnapshot((querySnapshot) => {
          this.desserts = [];
          querySnapshot.forEach((doc) => {
            var data = doc.data();
            data.id = doc.id;
            this.desserts.push(data);
          });
        });
    },

    cleanError() {
      this.error.name = "";
      this.error.category = "";
      this.error.subcategory = "";
      this.error.plataform = "";
      this.error.photo = "";
      this.error.link = "";
    },

    photoChange() {
      if (this.photo) {
        this.editedItem.photoUrl = URL.createObjectURL(this.photo);
      } else {
        this.editedItem.photoUrl = this.desserts[this.editedIndex].photoUrl;
      }
    },

    changeCategory() {
      this.editedItem.subcategory = "";
      this.editedItem.plataform = "";
    },

    playvideo(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.booleans.dialogVideo = true;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedID = this.desserts[this.editedIndex].id;
      this.editedItem = Object.assign({}, item);
      this.booleans.dialog = true;
    },

    save() {
      this.booleans.alert = false;
      this.cleanError();
      if (this.booleans.valid) {
        if (this.editedItem.name) {
          if (this.editedItem.category) {
            if (this.editedItem.subcategory) {
              if (this.editedItem.plataform) {
                if (this.editedItem.link) {
                  if (this.photo) {
                    this.booleans.loading = true;
                    this.deletePhotoAndSaveData();
                  } else {
                    this.booleans.loading = true;
                    this.saveData();
                  }
                } else {
                  this.error.link = "Debe Colocar el Link del Video";
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

    deletePhotoAndSaveData() {
      var storage = firebase.storage().ref();
      storage
        .child(this.editedItem.photoRef)
        .delete()
        .then(() => {
          this.savePhoto();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    savePhoto() {
      var user = firebase.auth().currentUser;
      var ruta = "users/" + user.uid + "/videos/" + this.photo.name;
      var storage = firebase.storage().ref();
      storage
        .child(ruta)
        .put(this.photo)
        .then((snapshot) => {
          storage
            .child(ruta)
            .getDownloadURL()
            .then((url) => {
              this.editedItem.photoUrl = url;
              this.editedItem.photoRef = ruta;
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
        .doc(this.desserts[this.editedIndex].id)
        .set({
          name: this.editedItem.name,
          category: this.editedItem.category,
          subcategory: this.editedItem.subcategory,
          plataform: this.editedItem.plataform,
          photoUrl: this.editedItem.photoUrl,
          photoRef: this.editedItem.photoRef,
          link: this.editedItem.link,
        })
        .then(() => {
          this.booleans.alert = true;
          this.booleans.loading = false;
        })
        .catch(function (error) {
          console.error("Error: ", error);
        });
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.booleans.dialogDelete = true;
    },

    deleteItemConfirm() {
      var user = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("users/" + user.uid + "/videos")
        .doc(this.desserts[this.editedIndex].id)
        .delete()
        .then(() => {
          this.booleans.snackbar = true;
          this.closeDelete();
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },

    close() {
      this.booleans.dialog = false;
      this.booleans.alert = false;
      this.photo = null;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.editedID = "";
      });
    },

    closeDelete() {
      this.booleans.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.editedID = "";
      });
    },
  },

  created() {
    this.initialize();
  },
};
</script>