<template>
  <section class="max-width main">
    <Snackbar :text="snackbarText" :show.sync="showSnackbar" />
    <ConfirmationDialog
      :show.sync="showDialog"
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
          class="input"
          v-model="account.name"
          prepend-icon="mdi-wallet-outline"
          :rules="rules.name"
          label="Name"
          placeholder="Savings"
          :counter="maxLength"
          :loading="accountLoading"
          required
        ></v-text-field>
      </div>

      <!--2nd row-->
      <div class="row">
        <!--balance-->
        <v-text-field
          class="input"
          v-model="account.balance"
          prepend-icon="mdi-cash"
          :loading="accountLoading"
          label="Balance"
          placeholder="CZK"
          type="number"
          required
        ></v-text-field>

        <!--currency-->
        <v-text-field
          class="input"
          v-model="account.currency"
          prepend-icon="mdi-currency-eur"
          :rules="rules.currency"
          label="Currency"
          placeholder="CZK"
          :counter="maxLength"
          :loading="accountLoading"
          required
        ></v-text-field>
      </div>

      <div class="row">
        <!--color-->
        <v-autocomplete
          v-model="account.color"
          prepend-icon="mdi-palette"
          :items="colors"
          label="Color"
          :loading="accountLoading"
          class="input"
        >
          <!--selected item-->
          <template #selection="{ item }">
            <div
              :style="'background-color: ' + item.value + ';'"
              class="color-example"
            />
            {{ item.text }}
          </template>

          <!--list of items to chose from-->
          <template #item="{ item, attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <div
                :style="'background-color: ' + item.value + ';'"
                class="color-example"
              />
              {{ item.text }}
            </v-list-item>
          </template>
        </v-autocomplete>

        <!--icon-->
        <v-autocomplete
          v-model="account.icon"
          prepend-icon="mdi-vector-arrange-above"
          :items="icons"
          label="Icon"
          :loading="accountLoading"
          class="input"
        >
          <!--selected item-->
          <template #selection="{ item }">
            <v-icon left>{{ item.value }}</v-icon
            >{{ item.text }}
          </template>

          <!--list of items to chose from-->
          <template #item="{ item, attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-icon left>{{ item.value }}</v-icon
              >{{ item.text }}
            </v-list-item>
          </template>
        </v-autocomplete>
      </div>

      <!--4th row-->
      <div class="row last-row">
        <!--include in statistic-->
        <v-checkbox
          v-model="account.includeInStatistic"
          label="Include in statistic"
          class="input"
        ></v-checkbox>

        <!--buttons-->
        <div>
          <v-btn
            v-if="update"
            :loading="deleteLoading"
            color="red"
            class="white--text ml-4"
            @click="showDialog = true"
          >
            <v-icon left>mdi-trash-can-outline</v-icon>
            Delete
          </v-btn>

          <!--submit-->
          <v-btn
            color="secondary"
            type="submit"
            class="mx-4"
            :loading="submitLoading"
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
import Snackbar from "@/components/Snackbar.component.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.component.vue";

@Component({
  components: {
    Snackbar,
    ConfirmationDialog,
  },
})
export default class CreateUpdateAccount extends Vue {
  @Prop() update: boolean | undefined;

  accountId = null as null | string;
  submitLoading = false;
  accountLoading = false;
  deleteLoading = false;
  maxLength = 40;
  maxLengthFieldErrorMsg = "Must be less than " + this.maxLength + "characters";
  showSnackbar = false;
  showDialog = false;
  snackbarText = "";
  colors = [
    {
      text: "Green",
      value: "#388E3C",
    },
    {
      text: "Orange",
      value: "#FFAB00",
    },
    {
      text: "Purple",
      value: "#6200EA",
    },
    {
      text: "Blue",
      value: "#6290ff",
    },
    {
      text: "Red",
      value: "#F44336",
    },
  ];
  icons = [
    {
      text: "Piggy",
      value: "mdi-piggy-bank-outline",
    },
    {
      text: "Money",
      value: "mdi-cash",
    },
    {
      text: "Bitcoin",
      value: "mdi-bitcoin",
    },
    {
      text: "Lite-coin",
      value: "mdi-litecoin",
    },
    {
      text: "Coin",
      value: "mdi-hand-coin",
    },
  ];
  rules = {
    name: [
      (): boolean | string => !!this.account.name || "Name is required.",
      (): boolean | string =>
        !!this.account.name ||
        this.account.name.length <= this.maxLength ||
        this.maxLengthFieldErrorMsg,
    ],
    currency: [
      (): boolean | string =>
        !!this.account.currency || "Currency is required.",
      (): boolean | string =>
        !!this.account.currency ||
        this.account.currency.length <= this.maxLength ||
        this.maxLengthFieldErrorMsg,
    ],
  };
  account = {
    id: null,
    name: "",
    balance: 0,
    currency: "CZK",
    color: this.colors[0].value,
    icon: this.icons[0].value,
    includeInStatistic: true,
  } as CreateUpdateAccountRequest;

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

  submit(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!this.$refs["form"]?.validate()) {
      return;
    }
    if (this.update) {
      this.updateAccount();
    } else {
      this.createAccount();
    }
  }

  getAccount(): void {
    if (!this.accountId) {
      this.snackbarText = "Can't load account, id is null";
      this.showSnackbar = true;
      return;
    }

    this.accountLoading = true;
    accountApi
      .getById(this.accountId)
      .then((response) => {
        this.account.name = response.data.name; //without this input takes name as empty
        this.account = response.data;
      })
      .catch((error) => {
        this.snackbarText = errorMessage.get(error);
        this.showSnackbar = true;
      })
      .finally(() => (this.accountLoading = false));
  }

  createAccount(): void {
    this.submitLoading = true;
    accountApi
      .createAccount(this.account)
      .then(() => {
        this.$router.push("/dashboard");
      })
      .catch((error) => {
        this.snackbarText = errorMessage.get(error);
        this.showSnackbar = true;
      })
      .finally(() => (this.submitLoading = false));
  }

  updateAccount(): void {
    if (!this.accountId) {
      this.snackbarText = "Can't load account, id is null";
      this.showSnackbar = true;
      return;
    }

    this.submitLoading = true;
    accountApi
      .updateAccount(this.accountId, this.account)
      .then(() => this.$router.push("/dashboard"))
      .catch((error) => {
        this.snackbarText = errorMessage.get(error);
        this.showSnackbar = true;
      })
      .finally(() => (this.submitLoading = false));
  }

  deleteAccount(): void {
    if (!this.accountId) {
      this.snackbarText = "Can't load account, id is null";
      this.showSnackbar = true;
      return;
    }

    this.deleteLoading = true;
    accountApi
      .deleteAccount(this.accountId)
      .then(() => this.$router.push("/dashboard"))
      .catch((error) => {
        this.snackbarText = errorMessage.get(error);
        this.showSnackbar = true;
      })
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

.color-example {
  height: 1rem;
  min-width: 1rem;
  display: inline-block;
  margin: 0 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e0e0e0;
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
