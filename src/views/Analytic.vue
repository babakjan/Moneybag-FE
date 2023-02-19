<template>
  <section class="max-width main">
    <h1 class="main mb-8">Analytic</h1>
    <div class="row">
      <v-card class="card"> Stats </v-card>
      <v-card class="pi-chart-container card">
        <h2 v-if="!recordsAnalyticByCategoryLoading" class="main">
          Categories
        </h2>
        <apexchart
          v-if="!recordsAnalyticByCategoryLoading"
          type="donut"
          width="500"
          :options="piChartData.options"
          :series="piChartData.series"
          class="pi-chart"
        />
        <v-skeleton-loader v-else type="image" class="pi-chart-skeleton" />
      </v-card>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import errorMessage from "@/services/errorMessage";
import categoryApi from "@/api/categoryApi";
import { CategoryAnalytic } from "@/api/categoryApi";

@Component
export default class Analytic extends Vue {
  categoryAnalytics = [] as CategoryAnalytic[];
  recordsAnalyticByCategoryLoading = false;
  piChartData = {
    options: {
      labels: [] as string[],
      colors: [] as string[],
      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: {
              width: 370,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series: [] as number[],
  };

  // totalSpending;

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    this.getPiChartData();
  }

  getPiChartData() {
    this.recordsAnalyticByCategoryLoading = true;
    categoryApi
      .getAnalytic()
      .then((response) => {
        this.categoryAnalytics = response.data;
        this.piChartData.options.labels = this.categoryAnalytics.map(
          (c: CategoryAnalytic) => c.category.name
        );
        this.piChartData.series = this.categoryAnalytics.map(
          (c: CategoryAnalytic) => c.amount
        );
        this.piChartData.options.colors = this.categoryAnalytics.map(
          (c: CategoryAnalytic) => c.category.color
        );
      })
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.recordsAnalyticByCategoryLoading = false));
  }
}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.card {
  width: 50%;
  height: 400px;
}

.pi-chart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pi-chart-container h2 {
  text-align: center;
  padding: 1rem;
}

.pi-chart {
  padding-bottom: 1rem;
}

.pi-chart-skeleton {
  width: 100%;
  height: 100%;
}

@media only screen and (max-width: 1200px) {
  .row {
    flex-direction: column;
  }

  .card {
    width: 100%;
  }
}
</style>
