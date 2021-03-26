<template>
  <v-container fluid>
    <v-dialog v-model="dialog" persistent width="550">
      <v-card>
        <v-toolbar dark color="success">
          <v-toolbar-title>Informacion Guardada Corectamente</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="indigo" @click="goDashboard"> Aceptar </v-btn>
        </v-toolbar>
      </v-card>
    </v-dialog>

    <v-form v-model="valid.form">
      <v-row>
        <v-container>
          <v-row justify="center">
            <v-avatar size="150">
              <img :src="form.photoLink" />
            </v-avatar>
          </v-row>

          <v-row justify="center">
            <v-col cols="3">
              <v-file-input
                accept="image/*"
                prepend-icon="mdi-file-image"
                label="Cambiar foto"
                v-model="form.photo"
              >
              </v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-row>

      <v-row justify="center">
        <v-col cols="4">
          <v-dialog width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="indigo" dark v-bind="attrs" v-on="on">
                Cambiar Correo Electronico
              </v-btn>
            </template>

            <v-card>
              <v-toolbar dark color="indigo">
                <v-toolbar-title>Cambiar Correo Electronico</v-toolbar-title>
              </v-toolbar>
              <v-alert
                :value="alert.email"
                type="success"
                dark
                border="top"
                icon="mdi-check-bold"
                transition="scale-transition"
              >
                Correo Electronico Actualizado
              </v-alert>

              <v-card-text>
                <v-form v-model="valid.email">
                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-email"
                    label="Nuevo Correo Electronico"
                    type="email"
                    v-model="form.email"
                    :error-messages="errors.email"
                    :rules="[rules.required, rules.email]"
                    required
                  ></v-text-field>

                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-lock"
                    label="Contraseña"
                    type="password"
                    v-model="form.password"
                    :error-messages="errors.password"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="!valid.email"
                      class="ma-2"
                      color="indigo"
                      :dark="valid.email"
                      @click="updateEmail"
                    >
                      Cambiar Correo Electronico
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>

        <v-col cols="4">
          <v-dialog width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="indigo" dark v-bind="attrs" v-on="on">
                Cambiar Contraseña
              </v-btn>
            </template>

            <v-card>
              <v-toolbar dark color="indigo">
                <v-toolbar-title>Cambiar Contraseña</v-toolbar-title>
              </v-toolbar>

              <v-alert
                :value="alert.password"
                type="success"
                dark
                border="top"
                icon="mdi-check-bold"
                transition="scale-transition"
              >
                Contraseña Actualizada
              </v-alert>

              <v-card-text>
                <v-form v-model="valid.password">
                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-lock"
                    label="Contraseña Actual"
                    type="password"
                    v-model="form.password"
                    :error-messages="errors.password"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>

                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-lock-question"
                    label="Nueva Contraseña"
                    type="password"
                    v-model="form.new_password"
                    :error-messages="errors.password"
                    :rules="[
                      rules.required,
                      rules.password_size,
                      rules.password_format,
                    ]"
                    required
                  ></v-text-field>

                  <v-text-field
                    color="indigo"
                    prepend-icon="mdi-repeat"
                    label="Repetir Nueva Contraseña"
                    type="password"
                    v-model="form.password_confirmation"
                    :error-messages="errors.password_confirmation"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      :disabled="!valid.password"
                      class="ma-2"
                      color="indigo"
                      :dark="valid.password"
                      @click="updatePassword"
                    >
                      Cambiar Contraseña
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <v-row justify="center" style="height: 100px">
        <v-col cols="9" align-self="center">
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="4">
          <v-text-field
            color="indigo"
            v-model="form.name"
            :rules="[rules.required]"
            prepend-icon="mdi-account"
            label="Nombre de Usuario"
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-text-field
            color="indigo"
            v-model="form.phone"
            prepend-icon="mdi-phone"
            :rules="[rules.phone]"
            label="Teléfono"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="7">
          <v-textarea
            color="indigo"
            auto-grow
            v-model="form.description"
            label="Presentación"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="3">
          <v-text-field
            v-model="form.facebook"
            color="blue darken-3"
            prepend-icon="mdi-facebook"
            prefix="Facebook.com/"
            label="Facebook"
            :rules="[rules.facebook]"
          ></v-text-field>
        </v-col>

        <v-col cols="1"></v-col>

        <v-col cols="2">
          <v-text-field
            v-model="form.instagram"
            label="Instagram"
            prefix="@"
            color="pink lighten-1"
            prepend-icon="mdi-instagram"
            :rules="[rules.instagram]"
          ></v-text-field>
        </v-col>

        <v-col cols="1"></v-col>
        <v-col cols="2">
          <v-text-field
            v-model="form.twitter"
            color="light-blue lighten-1"
            prefix="@"
            prepend-icon="mdi-twitter"
            label="Twitter"
            :rules="[rules.twitter]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn
        :disabled="!valid.form"
        :dark="valid.form"
        color="indigo"
        @click="updateInfo"
        :loading="loading"
      >
        Actualizar Perfil
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      alert: {
        email: false,
        password: false,
      },
      valid: {
        form: true,
        email: true,
        password: true,
      },
      form: {
        photo: null,
        photoLink: "",
        email: "",
        password: "",
        new_password: "",
        password_confirmation: "",
        name: "",
        phone: null,
        description: "",
        facebook: "",
        instagram: "",
        twitter: "",
      },
      errors: {
        photo: "",
        email: "",
        password: "",
        new_password: "",
        password_confirmation: "",
      },
      rules: {
        required: (value) => !!value || "Debe llenar este campo",
        password_size: (value) =>
          (value && value.length >= 6) ||
          "La contraseña debe tener al menos 6 caracteres",
        password_format: (value) =>
          /(?=.*\d)/.test(value) ||
          "La contraseña debe contener al menos un numero",
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
        facebook: (value) => {
          if (value) {
            const pattern = /^[a-z\d.]{5,}$/;
            return (
              pattern.test(value) || "Ingrese un Usuario de Facebook valido"
            );
          } else {
            return true;
          }
        },
        instagram: (value) => {
          if (value) {
            const pattern = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
            return (
              pattern.test(value) || "Ingrese un Usuario de Instagram valido"
            );
          } else {
            return true;
          }
        },
        twitter: (value) => {
          if (value) {
            const pattern = /^[A-Za-z0-9_]{1,15}$/;
            return (
              pattern.test(value) || "Ingrese un Usuario de Twitter valido"
            );
          } else {
            return true;
          }
        },
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return (
            pattern.test(value) || "Ingrese una Direccion de Correo Valida."
          );
        },
      },
    };
  },

  methods: {
    goDashboard() {
      this.$router.push("/dashboard");
    },
    
    getData() {
      var user = firebase.auth().currentUser;
      if (user) {
        this.form.name = user.displayName;
        this.form.photoLink = user.photoURL;

        var docRef = firebase.firestore().collection("users").doc(user.uid);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.form.phone = doc.data().phone;
              this.form.description = doc.data().description;
              this.form.facebook = doc.data().facebook;
              this.form.instagram = doc.data().instagram;
              this.form.twitter = doc.data().twitter;
            } else {
              console.log("No se Encontro");
            }
          })
          .catch(function (error) {
            console.log("Error al obtener el documento:", error);
          });
      }
    },

    password_test() {
      var correcta = false;
      var numeros = "0123456789";
      if (this.form.new_password.length >= 6) {
        for (var i = 0; i < this.form.new_password.length; i++) {
          if (numeros.indexOf(this.form.new_password.charAt(i), 0) != -1) {
            correcta = true;
          }
        }
      }
      return correcta;
    },

    updateInfo() {
      this.savePhoto();
      this.loading=true
      var user = firebase.auth().currentUser;
      console.log;
      user
        .updateProfile({
          displayName: this.form.name,
        })
        .then(() => {
          console.log("guardado");
        })
        .catch(function (error) {
          console.log(error);
        });

      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          phone: this.form.phone,
          description: this.form.description,
          facebook: this.form.facebook,
          twitter: this.form.twitter,
          instagram: this.form.instagram,
        })
        .then(() => {
          console.log("Si se actualizo");
          this.dialog = true;
          this.loading =false;
        })
        .catch(function (error) {
          console.error("Error: ", error);
        });
    },

    updateEmail() {
      var user = firebase.auth().currentUser;
      var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.form.password
      );

      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          this.saveEmail();
          console.log("Reautenticado");
        })
        .catch((error) => {
          if (error.code == "auth/wrong-password") {
            this.errors.password = "Contraseña incorrecta";
          } else {
            console.lo(error);
          }
        });
    },

    saveEmail() {
      var user = firebase.auth().currentUser;
      user
        .updateEmail(this.form.email)
        .then(() => {
          this.alert.email = !this.alert.email;
          this.form.password = "";
        })
        .catch((error) => {
          if (error.code == "auth/email-already-in-use") {
            this.errors.email =
              "Ya existe una cuenta con esa direccion de correo";
          } else {
            console.log(error);
          }
        });
    },

    updatePassword() {
      if (this.form.password) {
        if (this.form.new_password) {
          if (this.password_test()) {
            if (this.form.password_confirmation) {
              if (this.form.password_confirmation == this.form.new_password) {
                this.re_auth();
              } else {
                this.errors.new_password = "Las contraseñas deben iguales";
                this.errors.password_confirmation =
                  "Las contraseñas deben ser iguales";
              }
            } else {
              this.errors.password_confirmation = "Debe Repetir la Contraseña";
            }
          } else {
            this.errors.new_password =
              "La contraseña debe tener minino 6 caracteres y contener al menos 1 numero";
          }
        } else {
          this.errors.new_password = "Debe Ingresar una Contraseña ";
        }
      } else {
        this.errors.password = "Debe Ingresar su Contraseña Actual";
      }
    },

    savePhoto() {
      console.log("empieza a subir");
      if (this.form.photo) {
        var user = firebase.auth().currentUser;
        var ruta = "users/" + user.uid + "/photo.jpg";
        var storage = firebase.storage().ref();

        storage
          .child(ruta)
          .put(this.form.photo)
          .then((snapshot) => {
            console.log("Arcchivo Subido");
            storage
              .child(ruta)
              .getDownloadURL()
              .then((url) => {
                user
                  .updateProfile({
                    photoURL: url,
                  })
                  .then(() => {
                    console.log("guardado");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    re_auth() {
      var user = firebase.auth().currentUser;
      var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.form.password
      );

      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          this.savePassword();
          console.log("Reautenticado");
        })
        .catch((error) => {
          if (error.code == "auth/wrong-password") {
            this.errors.password = "Contraseña incorrecta";
          } else {
            console.lo(error);
          }
        });
    },

    savePassword() {
      var user = firebase.auth().currentUser;
      user
        .updatePassword(this.form.new_password)
        .then(() => {
          this.alert.password = !this.alert.password;
          this.form.password = "";
          this.form.new_password = "";
          this.form.password_confirmation = "";
        })
        .catch((error) => {
          if (error.code == "auth/email-already-in-use") {
            this.errors.password =
              "Ya existe una cuenta con esa direccion de correo";
          } else {
            console.log(error);
          }
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>