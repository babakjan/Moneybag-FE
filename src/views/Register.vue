<template>
  <div class="max-width">
    <Snackbar :text="snackbarText" :show.sync="showSnackbar" />

    <v-card class="form" justify="center">
      <v-form ref="form" v-model="formValid" @submit.prevent="submit">
        <v-card-text>
          <h1 class="formHeading">Sign-up</h1>

          <!--first name-->
          <v-text-field
            ref="firstName"
            v-model="registerForm.firstName"
            prepend-icon="mdi-account-outline"
            :rules="rules.firstName"
            label="First Name"
            placeholder="John"
            :counter="maxLength"
            required
          ></v-text-field>

          <!--last name-->
          <v-text-field
            ref="lastName"
            v-model="registerForm.lastName"
            prepend-icon="mdi-account-outline"
            :rules="rules.lastName"
            label="Last Name"
            placeholder="Doe"
            :counter="maxLength"
            required
          ></v-text-field>

          <!--email-->
          <v-text-field
            ref="email"
            v-model="registerForm.email"
            prepend-icon="mdi-email-outline"
            :rules="rules.email"
            label="Email"
            placeholder="johndoe@gmail.com"
            :counter="maxLength"
            required
          ></v-text-field>

          <!--password-->
          <v-text-field
            ref="password"
            v-model="registerForm.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            prepend-icon="mdi-lock-outline"
            :rules="rules.password"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            hint="At least 8 characters"
            label="Password"
            :counter="maxLength"
            required
          ></v-text-field>

          <!--login-->
          <span>Already have an account? </span>
          <router-link to="/login">Sing-in</router-link>
        </v-card-text>

        <!--submit-->
        <v-card-actions>
          <v-btn color="primary px-4" type="submit" :loading="formLoading">
            Submit
            <v-icon right>mdi-send-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RegisterRequest } from "@/api/authenticationApi";
import authenticationApi from "@/api/authenticationApi";
import Snackbar from "@/components/Snackbar.component.vue";
import errorMessage from "@/services/errorMessage";
import { Mutation } from "vuex-class";
import { User } from "@/store/modules/user";

@Component({
  components: {
    Snackbar,
  },
})
export default class Register extends Vue {
  registerForm: RegisterRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  formValid = false;
  formLoading = false;
  showSnackbar = false;
  snackbarText = "";

  maxLength = 40;
  maxLengthFieldErrorMsg = "Must be less than " + this.maxLength + "characters";
  showPassword = false;
  emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  rules = {
    firstName: [
      (): boolean | string =>
        !!this.registerForm.firstName || "First name is required.",
      (): boolean | string =>
        !!this.registerForm.firstName ||
        this.registerForm.firstName.length <= this.maxLength ||
        this.maxLengthFieldErrorMsg,
    ],
    lastName: [
      (): boolean | string =>
        !!this.registerForm.lastName || "Last name is required.",
      (): boolean | string =>
        !!this.registerForm.lastName ||
        this.registerForm.lastName.length <= this.maxLength ||
        this.maxLengthFieldErrorMsg,
    ],
    email: [
      (): boolean | string => !!this.registerForm.email || "Email is required.",
      (): boolean | string =>
        this.emailPattern.test(this.registerForm.email) ||
        "E-mail must be valid",
      (): boolean | string =>
        (!!this.registerForm.email &&
          this.registerForm.email.length <= this.maxLength) ||
        this.maxLengthFieldErrorMsg,
    ],
    password: [
      (): boolean | string =>
        !!this.registerForm.password || "Password is required.",
      (): boolean | string =>
        (!!this.registerForm.password &&
          this.registerForm.password.length <= this.maxLength) ||
        this.maxLengthFieldErrorMsg,
      (): boolean | string =>
        (!!this.registerForm.password &&
          this.registerForm.password.length >= 8) ||
        "Password length must be at least 8",
    ],
  };

  submit(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (this.$refs["form"].validate()) {
      this.formLoading = true;
      authenticationApi
        .register(this.registerForm)
        .then((response) => {
          this.setTokenAndUser({
            token: response.data.token,
            user: response.data.user,
          });
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.snackbarText = errorMessage.get(error);
          this.showSnackbar = true;
        })
        .finally(() => (this.formLoading = false));
    }
  }

  @Mutation setTokenAndUser!: ({
    token,
    user,
  }: {
    token: string;
    user: User;
  }) => void;
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
