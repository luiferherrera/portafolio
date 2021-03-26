<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height class="indigo accent-1">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" :loading="isLoading">
              <v-toolbar dark color="indigo">
                <v-toolbar-title>Iniciar Sesion</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-email"
                    label="Correo Electronico"
                    type="email"
                    v-model="form.email"
                    :error-messages="errors_email"
                    :rules="[rules.required, rules.email]"
                    required
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-lock"
                    label="Contraseña"
                    type="password"
                    v-model="form.password"
                    :error-messages="errors_password"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link to="/register" class="ml-2"
                  ><v-chip color="indigo" dark
                    >Crear cuenta</v-chip
                  ></router-link>
                <v-spacer></v-spacer>
                <v-btn class="ma-2" color="indigo" dark @click="doLogin">
                  Iniciar Sesion
                </v-btn>
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
        email: "",
        password: "",
      },
      errors_email: "",
      errors_password: "",
      rules: {
        required: value => !!value || 'Required.',
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
      this.errors_email = "";
      this.errors_password = "";
    },
    doLogin() {
      this.clean();
      this.isLoading = "warning";
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((user) => {
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errors_email = "Ingrese una Direccion de Correo Valida";
              break;
            case "auth/user-not-found":
              this.errors_email =
                "No se Encontro una Cuenta con esta Direccion de Correo";
              break;
            case "auth/wrong-password":
              this.errors_password = "Contraseña Incorrecta";
              break;
            default:
              alert(error.message);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>