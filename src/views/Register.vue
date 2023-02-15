<template>
  <div class="max-width">
    <v-card class="form" justify="center">
      <v-form ref="form" v-model="formValid" @submit.prevent="submit">
        <v-card-text>
          <h1 class="formHeading">Sign-up</h1>

          <!--first name-->
          <v-text-field
            v-model="registerForm.firstName"
            :rules="rules.firstName"
            :counter="maxLength"
            label="First Name"
            placeholder="John"
            prepend-icon="mdi-account-outline"
            required
          ></v-text-field>

          <!--last name-->
          <v-text-field
            v-model="registerForm.lastName"
            :rules="rules.lastName"
            :counter="maxLength"
            label="Last Name"
            placeholder="Doe"
            prepend-icon="mdi-account-outline"
            required
          ></v-text-field>

          <!--email-->
          <v-text-field
            v-model="registerForm.email"
            :rules="rules.email"
            :counter="maxLength"
            label="Email"
            placeholder="johndoe@gmail.com"
            prepend-icon="mdi-email-outline"
            required
          ></v-text-field>

          <!--password-->
          <v-text-field
            v-model="registerForm.password"
            :rules="rules.password"
            :counter="maxLength"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock-outline"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            hint="At least 8 characters"
            required
            @click:append="showPassword = !showPassword"
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
import errorMessage from "@/services/errorMessage";
import { Action, Mutation } from "vuex-class";
import { User } from "@/store/modules/user";

@Component
export default class Register extends Vue {
  registerForm: RegisterRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  formValid = false;
  formLoading = false;
  maxLength = 40;
  maxLengthFieldErrorMsg = "Must be less than " + this.maxLength + "characters";
  fieldRequiredErrorMsg = "This field is required.";
  showPassword = false;
  emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  rules = {
    firstName: [
      (): boolean | string =>
        !!this.registerForm.firstName || this.fieldRequiredErrorMsg,
      (): boolean | string =>
        !!this.registerForm.firstName ||
        this.registerForm.firstName.length <= this.maxLength ||
        this.maxLengthFieldErrorMsg,
    ],
    lastName: [
      (): boolean | string =>
        !!this.registerForm.lastName || this.fieldRequiredErrorMsg,
      (): boolean | string =>
        !!this.registerForm.lastName ||
        this.registerForm.lastName.length <= this.maxLength ||
        this.maxLengthFieldErrorMsg,
    ],
    email: [
      (): boolean | string =>
        !!this.registerForm.email || this.fieldRequiredErrorMsg,
      (): boolean | string =>
        this.emailPattern.test(this.registerForm.email) ||
        "E-mail is not valid",
      (): boolean | string =>
        (!!this.registerForm.email &&
          this.registerForm.email.length <= this.maxLength) ||
        this.maxLengthFieldErrorMsg,
    ],
    password: [
      (): boolean | string =>
        !!this.registerForm.password || this.fieldRequiredErrorMsg,
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

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  @Mutation("user/setTokenAndUser") setTokenAndUser!: ({
    token,
    user,
  }: {
    token: string;
    user: User;
  }) => void;

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
