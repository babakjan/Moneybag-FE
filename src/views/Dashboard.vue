<template>
  <section class="max-width main">
    <div class="heading-container">
      <h1 class="main">Dashboard</h1>
      <v-btn color="secondary" @click="$router.push('/accounts/create')">
        <v-icon left>mdi-plus</v-icon>
        <span>Add account</span>
      </v-btn>
    </div>

    <!--accounts-->
    <div class="accounts">
      <div v-if="!accountsLoading">
        <AccountCard
          v-for="account in accounts"
          :key="account.id"
          :account="account"
        />
      </div>
      <div v-else>
        <v-skeleton-loader
          v-for="i in 3"
          :key="'loader' + i"
          type="image"
          class="skeleton"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import AccountApi, { Account } from "@/api/accountApi";
import { Component, Vue } from "vue-property-decorator";
import AccountCard from "@/components/AccountCard.component.vue";

@Component({
  components: { AccountCard },
})
export default class Dashboard extends Vue {
  accounts = [] as Account[];
  accountsLoading = false;

  created(): void {
    this.createdOrActivated();
  }
  activated(): void {
    this.createdOrActivated();
  }
  createdOrActivated(): void {
    this.accountsLoading = true;
    AccountApi.getUserAccountsWithIncomesAndExpenses()
      .then((response) => {
        this.accounts = response.data;
      })
      .finally(() => (this.accountsLoading = false));
  }
}
</script>

<style scoped>
.heading-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.accounts {
  margin: 2rem 0;
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
