<template>
  <div class="max-width">
    <v-card class="form" justify="center">
      <v-form ref="form" @submit.prevent="submit">
        <v-card-text>
          <h1 class="formHeading">Sign-up</h1>

          <!--first name-->
          <v-text-field
            v-model="registerForm.firstName"
            :rules="rules.requiredAndMaxLength"
            :counter="maxLength"
            label="First Name"
            placeholder="John"
            prepend-icon="mdi-account-outline"
            required
          />

          <!--last name-->
          <v-text-field
            v-model="registerForm.lastName"
            :rules="rules.requiredAndMaxLength"
            :counter="maxLength"
            label="Last Name"
            placeholder="Doe"
            prepend-icon="mdi-account-outline"
            required
          />

          <!--email-->
          <v-text-field
            v-model="registerForm.email"
            :rules="[...rules.requiredAndMaxLength, rules.email]"
            :counter="maxLength"
            label="Email"
            placeholder="johndoe@gmail.com"
            prepend-icon="mdi-email-outline"
            required
          />

          <!--password-->
          <v-text-field
            v-model="registerForm.password"
            :rules="[...rules.requiredAndMaxLength, rules.password]"
            :counter="maxLength"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock-outline"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            hint="At least 8 characters"
            required
            @click:append="showPassword = !showPassword"
          />

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

  formLoading = false;
  maxLength = 40;
  maxLengthFieldErrorMsg =
    "Must be less than " + this.maxLength + " characters";
  fieldRequiredErrorMsg = "This field is required.";
  showPassword = false;
  emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //input validation rules
  rules = {
    requiredAndMaxLength: [
      (value: string): boolean | string =>
        !!value || this.fieldRequiredErrorMsg,
      (value: string): boolean | string =>
        (!!value && value.length <= this.maxLength) ||
        this.maxLengthFieldErrorMsg,
    ],
    email: (value: string): boolean | string =>
      this.emailPattern.test(value) || "E-mail is not valid",
    password: (value: string): boolean | string =>
      (!!value && value.length >= 8) || "Password length must be at least 8",
  };

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  @Mutation("user/setTokenAndUser") setTokenAndUser!: ({
    token,
    user,
  }: {
    token: string;
    user: User;
  }) => void;

  //submit registration form to api
  submit(): void {
    this.formLoading = true;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!this.$refs["form"].validate()) {
      this.formLoading = false;
      return;
    }
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
