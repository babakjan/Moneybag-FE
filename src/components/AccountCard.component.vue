<template>
  <v-card
    v-if="account"
    class="card"
    :style="'border-left: 4px solid' + account.color"
  >
    <!--heading w icon-->
    <div class="d-flex align-center">
      <v-icon>{{ account.icon }}</v-icon>
      <span class="name">{{ account.name }}</span>
      <v-spacer />
      <v-icon>mdi-dots-horizontal</v-icon>
    </div>

    <!--balance-->
    <div>
      <span class="balance">{{ account.balance.toFixed(2) }}</span>
      <span class="currency">{{ account.currency }}</span>
    </div>

    <!--month incomes-->
    <div class="stats">
      <span>{{ currentMonth }}</span>
      <span class="green--text">+ {{ account.incomes.toFixed(2) }}</span>
    </div>

    <!--mont expenses-->
    <div class="stats">
      <span>{{ currentMonth }}</span>
      <span class="red--text">-{{ account.expenses.toFixed(2) }}</span>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Account } from "@/api/accountApi";

@Component
export default class AccountCard extends Vue {
  @Prop() account: Account | undefined;

  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  currentMonth = this.months[new Date().getMonth()];
}
</script>

<style scoped>
.card {
  width: 20rem;
  padding: 1.5rem;
}

.name {
  font-size: 1.25rem;
  margin: 0 0.5rem;
}

.balance {
  font-size: 2rem;
}

.currency {
  font-size: 1.5rem;
  margin-left: 1rem;
}

.stats {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
}

@media only screen and (max-width: 750px) {
  .card {
    width: 100%;
  }
}
</style>
