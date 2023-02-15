<template>
  <section>
    <div class="heading-container">
      <!--heading-->
      <h1 class="main">Dashboard</h1>

      <!--add account-->
      <v-btn color="secondary" @click="$router.push('/accounts/create')">
        <v-icon left>mdi-plus</v-icon>
        <span>Add account</span>
      </v-btn>
    </div>

    <!--cards-->
    <div>
      <div v-if="accounts.length > 0" class="accounts">
        <!--accounts-->
        <div v-if="!accountsLoading">
          <AccountCard
            v-for="account in accounts"
            :key="account.id"
            :account="account"
          />
        </div>

        <!--skeletons-->
        <div v-else>
          <v-skeleton-loader
            v-for="i in 3"
            :key="'loader' + i"
            type="image"
            class="skeleton"
          />
        </div>
      </div>

      <!--no accounts-->
      <div v-else class="no-accounts">
        You haven't created any accounts yet!
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountApi, { Account } from "@/api/accountApi";
import errorMessage from "@/services/errorMessage";
import { Action } from "vuex-class";
import AccountCard from "@/components/dahboard/AccountCard.component.vue";

@Component({
  components: { AccountCard },
})
export default class AccountsSection extends Vue {
  accounts = [] as Account[];
  accountsLoading = false;

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    this.accountsLoading = true;
    AccountApi.getUserAccountsWithIncomesAndExpenses()
      .then((response) => (this.accounts = response.data))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.accountsLoading = false));
  }
}
</script>

<style scoped>
.heading-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.accounts > div {
  display: flex;
  justify-content: flex-start;
  align-items: end;
  gap: 2rem;
  flex-wrap: wrap;
}

.skeleton {
  width: 20rem;
  height: 11.25rem;
}

.no-accounts {
  font-size: 1.75rem;
}

@media only screen and (max-width: 750px) {
  .accounts > div {
    flex-direction: column;
    align-items: center;
  }
}

@media only screen and (max-width: 440px) {
  .heading-container {
    flex-direction: column;
    align-items: start;
  }

  .heading-container h1 {
    margin-bottom: 1rem;
  }
}
</style>
