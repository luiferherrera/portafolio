<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height class="indigo accent-1">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" :loading="isLoading">
              <v-toolbar dark color="indigo">
                <v-toolbar-title>Crear Cuenta</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    label="Nombre de Usuario"
                    type="text"
                    v-model="form.name"
                    :error-messages="errors.name"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-email"
                    label="Correo Electronico"
                    type="email"
                    v-model="form.email"
                    :error-messages="errors.email"
                    :rules="[rules.required, rules.email]"
                    required
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-lock"
                    label="Contraseña"
                    type="password"
                    v-model="form.password"
                    :error-messages="errors.password"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-repeat"
                    label="Repetir Contraseña"
                    type="password"
                    v-model="form.password_confirmation"
                    :error-messages="errors.password_confirmation"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link to="/login" class="ml-2">
                  <v-chip color="indigo" dark>Iniciar Sesion</v-chip>
                </router-link>
                <v-spacer></v-spacer>
                <v-btn color="indigo" dark @click="doRegister"
                  >Crear Cuenta</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      isLoading: false,
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
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
    clean() {
      this.errors.name = "";
      this.errors.email = "";
      this.errors.password = "";
      this.errors.password_confirmation = "";
    },
    password_test() {
      var correcta = false;
      var numeros = "0123456789";
      if (this.form.password.length >= 6) {
        for (var i = 0; i < this.form.password.length; i++) {
          if (numeros.indexOf(this.form.password.charAt(i), 0) != -1) {
            correcta = true;
          }
        }
      }
      return correcta;
    },

    doRegister() {
      this.isLoading = "warning";
      this.clean();
      if (this.form.name) {
        if (this.form.email) {
          if (this.form.password) {
            if (this.password_test()) {
              if (this.form.password_confirmation) {
                if (this.form.password_confirmation == this.form.password) {
                  this.singUp();
                } else {
                  this.errors.password = "Las contraseñas deben iguales";
                  this.errors.password_confirmation =
                    "Las contraseñas deben ser iguales";
                }
              } else {
                this.errors.password_confirmation =
                  "Debe Repetir la Contraseña";
              }
            } else {
              this.errors.password =
                "La contraseña debe tener minino 6 caracteres y contener al menos 1 numero";
            }
          } else {
            this.errors.password = "Debe Ingresar una Contraseña";
          }
        } else {
          this.errors.email = "Debe Ingresar Un Correo Electronico";
        }
      } else {
        this.errors.name = "Debe ingresar un nombre de Usuario";
      }
      this.isLoading = false;
    },
    
    singUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((user) => {
          var user = firebase.auth().currentUser;
          user
            .updateProfile({
              displayName: this.form.name,
            })
            .then(() => {
              console.log("nombre guardado");
              this.$router.push("/dashboard");
            })
            .catch(function (error) {
              console.log(error);
            });
          firebase.firestore()
            .collection("users")
            .doc(user.uid)
            .set({
              phone: "",
              description: "",
              facebook: "",
              twitter: "",
              instagram: "",
            })
            .then(function () {
              console.log("Si se creo");
            })
            .catch(function (error) {
              console.error("Error: ", error);
            });
          this.snackbar = true;
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              this.errors.email = "Ya Existe Una Cuenta Con este Email";
              break;
            case "auth/invalid-email":
              this.errors.email = "Ingrese una Direccion de Correo Valida";
              break;
            default:
              alert(error.code + "\n\n" + error.message);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>