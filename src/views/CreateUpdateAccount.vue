<template>
  <section class="max-width main">
    <!--dialog for deleting account-->
    <ConfirmationDialog
      :show.sync="showDeleteDialog"
      :label="`Really delete '${account.name}'`"
      @confirm="deleteAccount"
    />

    <h1 class="main">
      {{ update ? `Edit "${account.name}"` : "Create Account" }}
    </h1>

    <v-form class="mt-8" ref="form" @submit.prevent="submit">
      <!--1st row-->
      <div class="row">
        <!--name-->
        <v-text-field
          v-model="account.name"
          :rules="rules.requiredAndMaxLength"
          :counter="maxLength"
          :loading="accountLoading"
          label="Name"
          placeholder="Savings"
          prepend-icon="mdi-wallet-outline"
          class="input"
          required
        />
      </div>

      <!--2nd row-->
      <div class="row">
        <!--balance-->
        <v-text-field
          v-model="account.balance"
          :rules="rules.balance"
          :loading="accountLoading"
          label="Balance"
          placeholder="CZK"
          prepend-icon="mdi-cash"
          class="input"
          type="number"
          required
        />

        <!--currency-->
        <v-text-field
          v-model="account.currency"
          :rules="rules.requiredAndMaxLength"
          :counter="maxLength"
          :loading="accountLoading"
          label="Currency"
          placeholder="CZK"
          prepend-icon="mdi-currency-eur"
          class="input"
          required
        />
      </div>

      <!--3rd row-->
      <div class="row">
        <!--color-->
        <ColorSelect
          v-model="account.color"
          :loading="accountLoading"
          class="input"
        />

        <!--icon-->
        <IconSelect
          v-model="account.icon"
          :loading="accountLoading"
          class="input"
        />
      </div>

      <!--4th row-->
      <div class="row last-row">
        <!--include in statistic-->
        <v-checkbox
          v-model="account.includeInStatistic"
          label="Include in statistic"
          class="input"
        />

        <!--buttons-->
        <div>
          <!--delete-->
          <v-btn
            v-if="update"
            :loading="deleteLoading"
            color="red"
            class="white--text ml-4"
            @click="showDeleteDialog = true"
          >
            <v-icon left>mdi-trash-can-outline</v-icon>
            Delete
          </v-btn>

          <!--submit-->
          <v-btn
            color="secondary"
            :loading="submitLoading"
            type="submit"
            class="mx-4"
          >
            <v-icon left>{{ update ? "mdi-update" : "mdi-plus" }}</v-icon>
            {{ update ? "Update" : "Create" }}
          </v-btn>
        </div>
      </div>
    </v-form>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import accountApi, { CreateUpdateAccountRequest } from "@/api/accountApi";
import errorMessage from "@/services/errorMessage";
import ConfirmationDialog from "@/components/ConfirmationDialog.component.vue";
import ColorSelect from "@/components/ColorSelect.component.vue";
import IconSelect from "@/components/IconSelect.component.vue";
import { Action } from "vuex-class";

@Component({
  components: {
    ConfirmationDialog,
    ColorSelect,
    IconSelect,
  },
})
export default class CreateUpdateAccount extends Vue {
  @Prop({ default: false }) update!: boolean;

  accountId = null as null | string; //used when updating existing account
  submitLoading = false;
  accountLoading = false;
  deleteLoading = false;
  maxLength = 40; //max length of inputs
  maxLengthFieldErrorMsg =
    "Must be less than " + this.maxLength + " characters";
  fieldRequiredErrorMsg = "This field is required.";
  showDeleteDialog = false;

  account = {
    id: null,
    name: "",
    balance: 0,
    currency: "CZK",
    color: "#6290ff", //blue
    icon: "mdi-piggy-bank-outline",
    includeInStatistic: true,
  } as CreateUpdateAccountRequest;

  //input validation rules
  rules = {
    requiredAndMaxLength: [
      (value: string): boolean | string =>
        !!value || this.fieldRequiredErrorMsg,
      (value: string): boolean | string =>
        (!!value && value.length <= this.maxLength) ||
        this.maxLengthFieldErrorMsg,
    ],
    balance: [
      (value: number): boolean | string =>
        !!value || value === 0 || this.fieldRequiredErrorMsg,
    ],
  };

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    if (!this.update) {
      return;
    }
    this.accountId = this.$route.params.accountId;
    this.getAccount();
  }

  //submit form
  submit(): void {
    this.submitLoading = true;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!this.$refs["form"]?.validate()) {
      this.submitLoading = false;
      return;
    }
    if (this.update) {
      this.updateAccount();
    } else {
      this.createAccount();
    }
  }

  //get account from api
  getAccount(): void {
    this.accountLoading = true;
    if (!this.accountId) {
      this.showSnack("Can't load account, id is null");
      this.accountLoading = false;
      return;
    }
    accountApi
      .getById(this.accountId)
      .then((response) => {
        this.account = response.data;
      })
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.accountLoading = false));
  }

  //create account on api
  createAccount(): void {
    this.submitLoading = true;
    accountApi
      .createAccount(this.account)
      .then(() => this.$router.push("/dashboard"))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.submitLoading = false));
  }

  //update account on api
  updateAccount(): void {
    this.submitLoading = true;
    if (!this.accountId) {
      this.showSnack("Can't load account, id is null");
      this.submitLoading = false;
      return;
    }
    accountApi
      .updateAccount(this.accountId, this.account)
      .then(() => this.$router.push("/dashboard"))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.submitLoading = false));
  }

  //delete account from api
  deleteAccount(): void {
    this.deleteLoading = true;
    if (!this.accountId) {
      this.showSnack("Can't load account, id is null");
      this.deleteLoading = false;
      return;
    }
    accountApi
      .deleteAccount(this.accountId)
      .then(() => this.$router.push("/dashboard"))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.deleteLoading = false));
  }
}
</script>

<style scoped>
.row {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
}

.row .input {
  width: calc(50% - 1rem);
  padding: 0.5rem 1rem;
}

@media only screen and (max-width: 750px) {
  .row {
    flex-direction: column;
    align-items: start;
    gap: 0;
  }

  .row .input {
    width: 100%;
  }
}
</style>
