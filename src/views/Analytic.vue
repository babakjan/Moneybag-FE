<template>
  <section class="max-width main">
    <h1 class="main mb-8">Analytic</h1>

    <!--interval picker-->
    <AnalyticIntervalPicker v-model="dateInterval" />

    <div class="row">
      <!--spending-->
      <v-card class="card">
        <TotalAnalyticComponent :date-interval="dateInterval" />
      </v-card>

      <!--pi chart-->
      <v-card class="card">
        <CategoryAnalyticPiChart :date-interval="dateInterval" />
      </v-card>
    </div>

    <!--balance evolution-->
    <div class="row">
      <v-card class="full-width">
        <BalanceEvolution :date-interval="dateInterval" />
      </v-card>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CategoryAnalyticPiChart from "@/components/analytic/CategoryAnalyticPiChart.component.vue";
import TotalAnalyticComponent from "@/components/analytic/TotalAnalytic.component.vue";
import AnalyticIntervalPicker from "@/components/analytic/AnalyticIntervalPicker.component.vue";
import BalanceEvolution from "@/components/analytic/BalanceEvolution.component.vue";
import { formatYYYYMMDD } from "@/utils/formatDate";

@Component({
  components: {
    CategoryAnalyticPiChart,
    TotalAnalyticComponent,
    AnalyticIntervalPicker,
    BalanceEvolution,
  },
})
export default class Analytic extends Vue {
  dateInterval = ["", ""];

  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    this.initDateInterval();
  }

  //initialize date interval to this month
  initDateInterval(): void {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    //this month
    this.dateInterval = [
      formatYYYYMMDD(new Date(thisYear, thisMonth, 1)),
      formatYYYYMMDD(new Date(thisYear, thisMonth + 1, 0)),
    ];
  }
}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
  width: 100%;
}

.card {
  width: 50%;
  height: 400px;
}

.full-width {
  width: 100%;
}

@media only screen and (max-width: 1200px) {
  .row {
    flex-direction: column;
  }

  .card {
    width: 100%;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    height: auto;
  }
}
</style>
