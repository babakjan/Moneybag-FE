<template>
  <div class="container">
    <h2 v-if="!totalAnalyticLoading" class="main">Spending</h2>
    <div v-if="!totalAnalyticLoading" class="rows">
      <!--total balance-->
      <div class="row">
        <h3>Total balance:</h3>
        <span>
          <span class="value">
            {{ totalAnalytic.balance.toFixed(2) }}
          </span>
          {{ totalAnalytic.currency }}
        </span>
      </div>

      <!--incomes-->
      <div class="row">
        <h3>Total Incomes:</h3>
        <span>
          <span class="value green--text">
            {{ totalAnalytic.incomes.toFixed(2) }}
          </span>
          {{ totalAnalytic.currency }}
        </span>
      </div>

      <!--expenses-->
      <div class="row">
        <h3>Total Expenses:</h3>
        <span>
          <span class="value red--text">
            {{ totalAnalytic.expenses.toFixed(2) }}
          </span>
          {{ totalAnalytic.currency }}
        </span>
      </div>

      <!--cash flow-->
      <div class="row">
        <h3>Total Cash Flow:</h3>
        <span>
          <span
            class="value"
            :class="totalAnalytic.cashFlow < 0 ? 'red--text' : 'green--text'"
            >{{ totalAnalytic.cashFlow.toFixed(2) }}</span
          >
          {{ totalAnalytic.currency }}
        </span>
      </div>
    </div>
    <v-skeleton-loader v-else type="image" class="skeleton" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import userApi, { TotalAnalytic } from "@/api/userApi";
import { Action } from "vuex-class";
import errorMessage from "@/services/errorMessage";
import getDateIntervalApiParameters from "@/utils/dateIntervalApiParameters";

@Component
export default class TotalAnalyticComponent extends Vue {
  @Prop({ default: () => [] }) dateInterval!: string[];

  totalAnalyticLoading = false;
  totalAnalytic = null as null | TotalAnalytic;

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    this.getTotalAnalytic();
  }

  //get data from api
  getTotalAnalytic() {
    this.totalAnalyticLoading = true;
    userApi
      .getTotalAnalytic(getDateIntervalApiParameters(this.dateInterval))
      .then((response) => (this.totalAnalytic = response.data))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.totalAnalyticLoading = false));
  }

  //when date interval changes, reload data
  @Watch("dateInterval")
  onDateIntervalChange(): void {
    if (this.dateInterval.length === 2) {
      this.getTotalAnalytic();
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.rows {
  padding: 0 2rem 2rem 2rem;
}

.row {
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
}

.skeleton {
  width: 100%;
  height: 100%;
}

h2 {
  text-align: center;
  padding: 1rem 0;
}

h3 {
  display: inline;
  font-weight: normal;
  font-size: 1rem;
  margin-right: 0.5rem;
}

.value {
  font-weight: 500;
  font-size: 1.25rem;
}

@media only screen and (max-width: 550px) {
  .row {
    flex-direction: column;
    align-items: start;
  }

  h2 {
    text-align: start;
    padding-left: 1rem;
  }
}
</style>
