<template>
  <div class="max-width">
    <v-card class="form" justify="center">
      <v-form ref="form" v-model="formValid" @submit.prevent="submit">
        <v-card-text>
          <h1 class="formHeading">Sign-in</h1>

          <!--email-->
          <v-text-field
            v-model="authenticateForm.email"
            :rules="rules.email"
            label="Email"
            placeholder="johndoe@gmail.com"
            prepend-icon="mdi-email-outline"
            required
          ></v-text-field>

          <!--password-->
          <v-text-field
            v-model="authenticateForm.password"
            :rules="rules.password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock-outline"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>

          <!--register-->
          <span>Don't have an account? </span>
          <router-link to="/register">Register</router-link>
        </v-card-text>

        <!--submit-->
        <v-card-actions>
          <v-btn color="primary px-4" type="submit" :loading="formLoading">
            Sign-in
            <v-icon right>mdi-lock-open-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AuthenticationRequest } from "@/api/authenticationApi";
import authenticationApi from "@/api/authenticationApi";
import errorMessage from "@/services/errorMessage";
import { Mutation, Action } from "vuex-class";
import { User } from "@/store/modules/user";

@Component
export default class LogIn extends Vue {
  authenticateForm: AuthenticationRequest = {
    email: "honza@gmail.com",
    password: "12345678",
  };

  formValid = false;
  formLoading = false;
  showPassword = false;
  emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  rules = {
    email: [
      (): boolean | string =>
        !!this.authenticateForm.email || "Email is required.",
      (): boolean | string =>
        this.emailPattern.test(this.authenticateForm.email) ||
        "E-mail must be valid",
    ],
    password: [
      (): boolean | string =>
        !!this.authenticateForm.password || "Password is required.",
    ],
  };

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  @Mutation("user/setTokenAndUser") setTokenAndUser!: ({
    token,
    user,
  }: {
    token: string;
    user: User;
  }) => void;

  //submit login form
  submit(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (this.$refs["form"].validate()) {
      this.formLoading = true;
      authenticationApi
        .authenticate(this.authenticateForm)
        .then((response) => {
          this.setTokenAndUser({
            token: response.data.token,
            user: response.data.user,
          });
          this.$router.push("/dashboard");
        })
        .catch((error) => this.showSnack(errorMessage.get(error)))
        .finally(() => (this.formLoading = false));
    }
  }
}
</script>

<style scoped>
.form {
  max-width: 40rem;
  padding: 1.5rem;
  margin: 4rem auto;
}

.formHeading {
  font-weight: normal;
  margin-bottom: 1rem;
}

@media only screen and (max-width: 500px) {
  .form {
    padding: 1rem;
  }
}
</style>
